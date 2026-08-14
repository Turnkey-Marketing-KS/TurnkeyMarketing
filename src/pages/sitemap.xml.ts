import { services } from "@/lib/services";
import { resourcePosts } from "@/lib/resource-posts";

const canonicalSite = new URL("https://www.turnkeyautomarketing.com");

type SitemapEntry = {
  path: string;
  lastmod?: string;
};

const currentContentDate = "2026-08-04";

const staticEntries: SitemapEntry[] = [
  { path: "/", lastmod: currentContentDate },
  { path: "/services", lastmod: currentContentDate },
  { path: "/about", lastmod: currentContentDate },
  { path: "/results", lastmod: "2026-08-13" },
  { path: "/resources", lastmod: currentContentDate },
  { path: "/contact", lastmod: "2026-08-13" },
  { path: "/privacy-policy" },
  { path: "/terms-of-service" },
];

export function GET() {
  const serviceEntries: SitemapEntry[] = services.map((service) => ({
    path: `/services/${service.slug}`,
    lastmod: ["marketing-consulting", "direct-mail", "vip-marketing-manager"].includes(service.slug)
      ? "2026-08-13"
      : currentContentDate,
  }));
  const resourceEntries: SitemapEntry[] = resourcePosts.map((post) => ({
    path: post.href,
    lastmod: post.updatedDate ?? post.originalDate,
  }));
  const entries = [...staticEntries, ...serviceEntries, ...resourceEntries];
  const urls = entries.map(({ path, lastmod }) => {
    const loc = new URL(path, canonicalSite).toString();
    const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
    return `  <url><loc>${loc}</loc>${lastmodTag}</url>`;
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
