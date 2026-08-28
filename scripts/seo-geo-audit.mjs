import { readFile, readdir } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const distRoot = resolve(projectRoot, "dist/client");
const origin = "https://www.turnkeyautomarketing.com";

const priorityQueries = [
  { query: "auto repair marketing agency", path: "/", intent: "commercial" },
  { query: "auto repair marketing services", path: "/services", intent: "commercial" },
  {
    query: "auto repair marketing consultant",
    path: "/services/marketing-consulting",
    intent: "commercial",
  },
  {
    query: "outsourced marketing department for auto repair shops",
    path: "/services/vip-marketing-manager",
    intent: "commercial",
  },
  {
    query: "auto repair customer acquisition",
    path: "/services/directtrack-marketing",
    intent: "commercial",
  },
  {
    query: "auto repair marketing plan",
    path: "/resources/auto-repair-marketing-plan",
    intent: "informational",
  },
  { query: "auto repair direct mail", path: "/services/direct-mail", intent: "commercial" },
  {
    query: "direct mail for auto repair shops",
    path: "/resources/direct-mail-for-repair-shops",
    intent: "informational",
  },
  {
    query: "European auto repair marketing",
    path: "/who-we-help/european-auto-repair-shops",
    intent: "commercial",
  },
  {
    query: "multi-location auto repair marketing",
    path: "/who-we-help/multi-location-auto-repair-shops",
    intent: "commercial",
  },
];

const querySignals = {
  "/": [/auto repair marketing/i, /agency|company/i],
  "/services": [/auto repair marketing services/i, /service/i],
  "/services/marketing-consulting": [/auto repair marketing consult/i, /guidance|advice|strategy/i],
  "/services/vip-marketing-manager": [
    /marketing department|marketing director/i,
    /auto repair|shop/i,
  ],
  "/services/directtrack-marketing": [/customer|acquisition|new customers/i, /auto repair|shop/i],
  "/resources/auto-repair-marketing-plan": [/auto repair marketing plan/i, /plan|step|guide/i],
  "/services/direct-mail": [/auto repair direct mail|direct mail/i, /service|campaign/i],
  "/resources/direct-mail-for-repair-shops": [/direct mail/i, /auto repair|repair shop/i],
  "/who-we-help/european-auto-repair-shops": [/European auto repair/i, /marketing/i],
  "/who-we-help/multi-location-auto-repair-shops": [
    /multi-location|multiple locations|multi-shop/i,
    /auto repair|repair shop/i,
  ],
};

const decode = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const text = (value) =>
  decode(
    value
      .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(file)));
    else files.push(file);
  }
  return files;
}

function routeFor(file) {
  const local = relative(distRoot, file).split(sep).join("/");
  if (local === "index.html") return "/";
  if (local === "404.html") return "/404";
  return `/${local.replace(/\/index\.html$/, "").replace(/\.html$/, "")}`;
}

const robots = await readFile(resolve(distRoot, "robots.txt"), "utf8");
const sitemap = await readFile(resolve(distRoot, "sitemap.xml"), "utf8");
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => new URL(decode(match[1])).pathname,
);
const sitemapSet = new Set(sitemapPaths);
const htmlFiles = (await walk(distRoot)).filter((file) => file.endsWith(".html"));
const pages = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const route = routeFor(file);
  const title = text(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = decode(
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? "",
  );
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1] ?? "";
  const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  const body = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  const bodyWithoutChrome = body
    .replace(/<header\b[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, " ");
  const visibleText = text(bodyWithoutChrome);
  const earlyText = visibleText.split(/\s+/).slice(0, 260).join(" ");
  const internalLinks = [...bodyWithoutChrome.matchAll(/<a\b[^>]*href="([^"]+)"/gi)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/") && !href.startsWith("//"))
    .map((href) => href.split(/[?#]/)[0] || "/");
  const externalLinks = [...bodyWithoutChrome.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"/gi)]
    .map((match) => match[1])
    .filter((href) => !href.startsWith(origin))
    .filter(
      (href) => !/appointmentcore|google\.com\/maps|facebook|instagram|linkedin|tiktok/i.test(href),
    );
  const schemas = [
    ...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ].flatMap((match) => {
    try {
      const parsed = JSON.parse(decode(match[1]));
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [{ "@type": "INVALID_JSON" }];
    }
  });
  pages.set(route, {
    route,
    title,
    description,
    canonical,
    noindex,
    earlyText,
    visibleText,
    internalLinks,
    externalLinks,
    schemaTypes: schemas.map((item) => item?.["@type"]).filter(Boolean),
    h1Count: (html.match(/<h1\b/gi) ?? []).length,
  });
}

const indexablePages = [...pages.values()].filter((page) => !page.noindex && page.route !== "/404");
const inbound = new Map(indexablePages.map((page) => [page.route, 0]));
for (const page of indexablePages) {
  for (const target of new Set(page.internalLinks)) {
    if (inbound.has(target) && target !== page.route) inbound.set(target, inbound.get(target) + 1);
  }
}

const critical = [];
const high = [];
const medium = [];
const notes = [];

if (!/User-agent:\s*\*/i.test(robots) || /Disallow:\s*\//i.test(robots))
  critical.push("robots.txt may block sitewide crawling");
if (!robots.includes(`${origin}/sitemap.xml`))
  high.push("robots.txt does not declare the canonical sitemap");

for (const path of sitemapPaths) {
  const page = pages.get(path);
  if (!page) critical.push(`sitemap URL has no built HTML: ${path}`);
  else if (page.noindex) critical.push(`sitemap contains a noindex page: ${path}`);
}

for (const page of indexablePages) {
  if (!sitemapSet.has(page.route))
    critical.push(`indexable page omitted from sitemap: ${page.route}`);
  if (page.canonical !== `${origin}${page.route === "/" ? "/" : page.route}`)
    critical.push(`canonical mismatch: ${page.route} -> ${page.canonical || "missing"}`);
  if (page.h1Count !== 1) critical.push(`${page.route} has ${page.h1Count} H1 elements`);
  if (!page.title || !page.description)
    critical.push(`${page.route} is missing a title or description`);
  if (
    (inbound.get(page.route) ?? 0) < 2 &&
    !["/privacy-policy", "/terms-of-service"].includes(page.route)
  ) {
    high.push(
      `${page.route} has fewer than two contextual inbound links (${inbound.get(page.route) ?? 0})`,
    );
  }
  if (page.route.startsWith("/services/") && !page.schemaTypes.includes("Service"))
    high.push(`${page.route} lacks Service schema`);
  if (page.route.startsWith("/resources/") && !page.schemaTypes.includes("Article"))
    high.push(`${page.route} lacks Article schema`);
  if (page.route.startsWith("/resources/") && page.externalLinks.length === 0)
    medium.push(`${page.route} has no visible editorial source citation`);
}

const titleOwners = new Map();
for (const page of indexablePages) {
  if (titleOwners.has(page.title))
    critical.push(`duplicate title: ${page.route} and ${titleOwners.get(page.title)}`);
  else titleOwners.set(page.title, page.route);
}

const queryCoverage = priorityQueries.map((item) => {
  const page = pages.get(item.path);
  if (!page || page.noindex) return { ...item, status: "missing", answerReady: false, signals: 0 };
  const signals = (querySignals[item.path] ?? []).filter((pattern) =>
    pattern.test(`${page.title} ${page.earlyText}`),
  ).length;
  const answerReady =
    signals === (querySignals[item.path] ?? []).length &&
    page.visibleText.split(/\s+/).length >= 350;
  return {
    ...item,
    status: "mapped",
    answerReady,
    signals,
    title: page.title,
    inboundLinks: inbound.get(item.path) ?? 0,
  };
});

for (const query of queryCoverage) {
  if (query.status === "missing")
    high.push(`priority query has no target page: ${query.query} -> ${query.path}`);
  else if (!query.answerReady)
    high.push(`priority query target is not answer-ready: ${query.query} -> ${query.path}`);
}

notes.push(`${indexablePages.length} indexable built pages; ${sitemapPaths.length} sitemap URLs`);
notes.push(
  `${queryCoverage.filter((item) => item.answerReady).length}/${queryCoverage.length} priority queries map to answer-ready pages`,
);

console.log(
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      summary: {
        critical: critical.length,
        high: high.length,
        medium: medium.length,
        indexablePages: indexablePages.length,
        sitemapUrls: sitemapPaths.length,
        answerReadyQueries: queryCoverage.filter((item) => item.answerReady).length,
        priorityQueries: queryCoverage.length,
      },
      critical,
      high,
      medium,
      notes,
      queryCoverage,
      pageMetrics: indexablePages.map((page) => ({
        route: page.route,
        title: page.title,
        inboundLinks: inbound.get(page.route) ?? 0,
        externalCitations: page.externalLinks.length,
        schemaTypes: page.schemaTypes,
        words: page.visibleText.split(/\s+/).length,
      })),
    },
    null,
    2,
  ),
);
