import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const htmlFiles = readdirSync(root).filter((file) => extname(file) === ".html");
const errors = [];
const titles = new Set();

for (const file of htmlFiles) {
  const html = readFileSync(join(root, file), "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];

  if (!title) errors.push(`${file}: missing title`);
  if (title && titles.has(title)) errors.push(`${file}: duplicate title`);
  if (title) titles.add(title);
  if (!/<meta name="description"/i.test(html)) errors.push(`${file}: missing description`);
  if (!/<link rel="canonical"/i.test(html)) errors.push(`${file}: missing canonical`);
  if (!/<meta property="og:title"/i.test(html)) errors.push(`${file}: missing Open Graph title`);
  if (!/<main id="main"/i.test(html)) errors.push(`${file}: missing main landmark`);
  if (!/<h1[ >]/i.test(html)) errors.push(`${file}: missing h1`);
  if (!/class="skip-link"/i.test(html)) errors.push(`${file}: missing skip link`);

  for (const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/gi)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|data:)/i.test(target)) continue;
    if (!existsSync(join(root, target))) errors.push(`${file}: missing local target ${target}`);
  }
}

if (!existsSync(join(root, "robots.txt"))) errors.push("missing robots.txt");
if (!existsSync(join(root, "sitemap.xml"))) errors.push("missing sitemap.xml");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} pages: metadata, landmarks, headings, and local links passed.`);
