import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const fallbackUrl = "http://localhost:8080";
const rawSiteUrl =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

const siteUrl = (rawSiteUrl || fallbackUrl).replace(/\/+$/, "");
const siteUrlWithSlash = `${siteUrl}/`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrlWithSlash}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const robots = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const distDir = path.resolve(process.cwd(), "dist");
await mkdir(distDir, { recursive: true });
await Promise.all([
  writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8"),
  writeFile(path.join(distDir, "robots.txt"), robots, "utf8"),
]);

if (!rawSiteUrl) {
  console.warn(`[seo] SITE_URL/VITE_SITE_URL/VERCEL_URL not set; using ${fallbackUrl}`);
}
