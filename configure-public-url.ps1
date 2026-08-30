param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^https://')]
    [string] $PublicUrl
)

$placeholder = 'https://example.invalid/supplier-price-guard-site/'
$normalized = $PublicUrl.TrimEnd('/') + '/'
$files = @(
    'index.html',
    'how-it-works.html',
    'documentation.html',
    'faq.html',
    'privacy.html',
    'changelog.html',
    'robots.txt',
    'sitemap.xml'
)

foreach ($file in $files) {
    $path = Join-Path $PSScriptRoot $file
    $content = Get-Content -Raw -LiteralPath $path
    $content = $content.Replace($placeholder, $normalized)
    Set-Content -LiteralPath $path -Value $content -Encoding utf8NoBOM
}

Write-Host "Configured canonical and discovery URLs for $normalized"

