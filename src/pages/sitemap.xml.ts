import { services } from "@/lib/services";
import { resourcePosts } from "@/lib/resource-posts";

const staticPaths = [
  "/",
  "/services",
  "/about",
  "/results",
  "/resources",
  "/contact",
  "/book-a-call",
  "/privacy-policy",
  "/terms-of-service",
];

export function GET({ site }: { site: URL }) {
  const servicePaths = services.map((service) => `/services/${service.slug}`);
  const resourcePaths = resourcePosts.map((post) => post.href);
  const paths = [...staticPaths, ...servicePaths, ...resourcePaths];
  const urls = paths.map((path) => {
    const loc = new URL(path, site).toString();
    return `  <url><loc>${loc}</loc><changefreq>weekly</changefreq></url>`;
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
