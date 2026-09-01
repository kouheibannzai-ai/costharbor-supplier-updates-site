# CostHarbor Supplier Updates for WooCommerce website

Static product documentation for CostHarbor Supplier Updates for WooCommerce. The site uses plain HTML, CSS, and a small amount of dependency-free JavaScript.

## Local preview

From this directory, run:

```sh
node preview-server.mjs
```

Then open `http://127.0.0.1:8080/`.

## Before publishing

Replace the placeholder site origin in canonical, Open Graph, sitemap, and robots metadata:

```powershell
.\configure-public-url.ps1 -PublicUrl 'https://YOUR-ACCOUNT.github.io/YOUR-REPOSITORY/'
```

When the WordPress.org listing is approved, add its exact URL to `pluginDirectoryUrl` in `site-config.js`. Until then, the site deliberately shows a non-clickable review-pending control.

## GitHub Pages

1. Create an empty GitHub repository.
2. Add it as this repository's `origin` and push `codex/main`.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the intended publishing branch and `/ (root)`, then save.
6. After GitHub provides the Pages URL, run `configure-public-url.ps1` with that exact URL, commit, and push.

No build step or third-party service is required.
