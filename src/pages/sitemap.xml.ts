import { services } from "@/lib/services";
import { resourcePosts } from "@/lib/resource-posts";

const canonicalSite = new URL("https://www.turnkeyautomarketing.com");

type SitemapEntry = {
  path: string;
  lastmod: string;
};

const homepageUpdatedDate = "2026-08-14";
const seoRefreshDate = "2026-08-13";
const contentBaselineDate = "2026-08-04";

const staticEntries: SitemapEntry[] = [
  { path: "/", lastmod: homepageUpdatedDate },
  { path: "/services", lastmod: seoRefreshDate },
  { path: "/about", lastmod: contentBaselineDate },
  { path: "/results", lastmod: seoRefreshDate },
  { path: "/resources", lastmod: seoRefreshDate },
  { path: "/contact", lastmod: seoRefreshDate },
  { path: "/privacy-policy", lastmod: seoRefreshDate },
  { path: "/terms-of-service", lastmod: seoRefreshDate },
];

export function GET() {
  const serviceEntries: SitemapEntry[] = services.map((service) => ({
    path: `/services/${service.slug}`,
    lastmod: ["marketing-consulting", "direct-mail", "vip-marketing-manager"].includes(service.slug)
      ? seoRefreshDate
      : contentBaselineDate,
  }));
  const resourceEntries: SitemapEntry[] = resourcePosts.map((post) => ({
    path: post.href,
    lastmod: post.updatedDate ?? post.originalDate ?? contentBaselineDate,
  }));
  const entries = [...staticEntries, ...serviceEntries, ...resourceEntries];
  const urls = entries.map(({ path, lastmod }) => {
    const loc = new URL(path, canonicalSite).toString();
    return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
  });

  return new Response(
    [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
      ...urls,
      `</urlset>`,
    ].join("\n"),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
