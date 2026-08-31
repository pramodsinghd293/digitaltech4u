$root = "c:\Websites\DeploymyWebsite"
$site = "https://digitaltech4u.com"
$utf8 = New-Object System.Text.UTF8Encoding $false

function Write-Utf8($path, $text) {
  [System.IO.File]::WriteAllText($path, $text, $utf8)
}

function Get-Shell($title, $desc, $canonical, $base, $body) {
  $prefix = if ($base -eq ".") { "" } else { "../" }
  @"
<!DOCTYPE html>
<html lang="en-IN" data-base="$base">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>$title</title>
  <meta name="description" content="$desc">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="$canonical">
  <link rel="icon" href="${prefix}images/favicon-mark.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,500&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${prefix}css/style.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <div id="site-announce"></div>
  <div id="site-header"></div>
  <main id="main">$body</main>
  <div id="site-footer"></div>
  <script src="${prefix}js/config.js"></script>
  <script src="${prefix}js/api.js"></script>
  <script src="${prefix}js/articles.js"></script>
  <script src="${prefix}js/components.js"></script>
  <script src="${prefix}js/main.js"></script>
</body>
</html>
"@
}

$cities = @(
  @{ slug="bhopal"; name="Bhopal"; image="city-bhopal.png"; extra="From lakeside brands to government-adjacent services, Bhopal companies need websites that look credible and load fast on mobile." },
  @{ slug="delhi"; name="Delhi"; image="city-delhi.png"; extra="Delhi-NCR competition is intense. We pair sharp UI with SEO and ads so you are not invisible among thousands of nearby offers." },
  @{ slug="indore"; name="Indore"; image="city-indore.png"; extra="Indore trading and food businesses grow faster with ecommerce, WhatsApp-friendly sites and local search pages." },
  @{ slug="gwalior"; name="Gwalior"; image="city-gwalior.png"; extra="This is our registered home. B-752 Anand Nagar, Gwalior 474012. Local businesses get the same national-grade delivery as metro clients." },
  @{ slug="mumbai"; name="Mumbai"; image="city-delhi.png"; extra="Mumbai teams need speed: landing pages, paid campaigns and dashboards that sales can use the same week." },
  @{ slug="bengaluru"; name="Bengaluru"; image="city-bhopal.png"; extra="Product companies and services firms here expect clean UX, performance and a backlog handled through tickets." },
  @{ slug="pune"; name="Pune"; image="city-indore.png"; extra="Manufacturing and education brands in Pune use us for multilingual sites, lead forms and long-term maintenance." },
  @{ slug="hyderabad"; name="Hyderabad"; image="city-gwalior.png"; extra="Hyderabad's growth story needs bilingual content, maps, and funnels that turn searchers into booked calls." },
  @{ slug="jaipur"; name="Jaipur"; image="city-delhi.png"; extra="Heritage brands and exporters in Jaipur get catalogue sites, Instagram-led marketing and secure checkout." },
  @{ slug="lucknow"; name="Lucknow"; image="city-bhopal.png"; extra="Lucknow professionals and retailers get trustworthy websites, Google Business alignment and patient support." }
)

New-Item -ItemType Directory -Force -Path (Join-Path $root "cities") | Out-Null

foreach ($c in $cities) {
  $n = $c.name
  $body = @"
    <section class="page-hero">
      <img class="hero__bg" src="../images/$($c.image)" alt="Website designing company in $n">
      <div class="hero__overlay"></div>
      <div class="container hero__content">
        <p class="eyebrow">digitaltech4u &middot; India's Best Web Agency</p>
        <h1>Website Designing Company in $n</h1>
        <p class="crumbs">Home &gt; <span>Website Designing Company In $n</span></p>
      </div>
    </section>
    <section class="section"><div class="container grid-2">
      <div>
        <h2>End-to-end websites for $n businesses</h2>
        <p>$($c.extra)</p>
        <p>digitaltech4u is not a single-city shop. The same 20+ expert team designs, codes, markets and supports brands across India. Website designing starts at &#8377;4,999 with minimal maintenance. 100+ happy customers. Experts reply within 24 hours.</p>
        <ul class="list">
          <li>Custom web, UI/UX, WordPress, ecommerce and redesign</li>
          <li>Digital marketing, SEO and city-specific landing pages</li>
          <li>Support tickets, email and Zoho Desk for existing customers</li>
        </ul>
        <p><a class="btn btn-lime" href="../consultation.html">Free consultation</a> <a class="btn btn-ghost" href="../raise-ticket.html">Raise a ticket</a></p>
      </div>
      <form class="consult-card" id="consultForm">
        <h3>Get Free Consultation</h3>
        <input class="field" name="name" placeholder="Your Name" required>
        <input class="field" name="email" type="email" placeholder="Your Email" required>
        <input class="field" name="phone" placeholder="Phone Number" required>
        <textarea class="field" name="message" placeholder="I need a website in $n"></textarea>
        <button class="btn btn-red" type="submit">Lets Talk</button>
        <div class="success"></div><div class="error"></div>
      </form>
    </div></section>
"@
  $html = Get-Shell "Website Designing Company in $n | digitaltech4u" "Website designing company in $n. Sites from &#8377;4,999, 20+ developers, 24/7 support. digitaltech4u serves $n and all of India from Gwalior." "$site/cities/$($c.slug).html" ".." $body
  Write-Utf8 (Join-Path $root "cities\$($c.slug).html") $html
}

function Write-Urlset($path, $urls) {
  $lines = @('<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
  foreach ($u in $urls) {
    $lines += "  <url><loc>$site$u</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>"
  }
  $lines += '</urlset>'
  Write-Utf8 $path ($lines -join "`n")
}

$static = @(
  "/", "/about.html", "/services.html", "/portfolio.html", "/blog.html", "/consultation.html",
  "/contact.html", "/email-us.html", "/support.html", "/raise-ticket.html", "/track-ticket.html",
  "/feedback.html", "/privacy.html", "/terms.html", "/sitemap.html"
) + ($cities | ForEach-Object { "/cities/$($_.slug).html" })

Write-Urlset (Join-Path $root "sitemap-pages.xml") $static

1..4 | ForEach-Object {
  $i = $_
  $start = (($i - 1) * 550) + 1
  $end = [Math]::Min(2200, $i * 550)
  $urls = @()
  for ($id = $start; $id -le $end; $id++) { $urls += "/article.html?id=$id" }
  Write-Urlset (Join-Path $root "sitemap-articles-$i.xml") $urls
}

$index = @"
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>$site/sitemap-pages.xml</loc></sitemap>
  <sitemap><loc>$site/sitemap-articles-1.xml</loc></sitemap>
  <sitemap><loc>$site/sitemap-articles-2.xml</loc></sitemap>
  <sitemap><loc>$site/sitemap-articles-3.xml</loc></sitemap>
  <sitemap><loc>$site/sitemap-articles-4.xml</loc></sitemap>
</sitemapindex>
"@
Write-Utf8 (Join-Path $root "sitemap.xml") $index
Write-Utf8 (Join-Path $root "robots.txt") "User-agent: *`nAllow: /`nSitemap: $site/sitemap.xml`n"
Write-Host "City pages and sitemaps written"
