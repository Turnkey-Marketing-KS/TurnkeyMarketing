import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const distRoot = resolve(projectRoot, "dist");
const canonicalOrigin = "https://www.turnkeyautomarketing.com";
const primaryFaviconPath = "/favicon-search.png";
const failures = [];

function fail(scope, message) {
  failures.push(`${scope}: ${message}`);
}

function decodeHtml(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(#x[\da-f]+|#\d+|amp|apos|gt|lt|nbsp|quot);/gi, (entity, name) => {
    if (name[0] !== "#") return named[name.toLowerCase()] ?? entity;
    const hexadecimal = name[1].toLowerCase() === "x";
    const number = Number.parseInt(name.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
    return Number.isNaN(number) ? entity : String.fromCodePoint(number);
  });
}

function plainText(value) {
  return decodeHtml(
    value.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function attributes(tag) {
  const values = new Map();
  const pattern = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  const tagName = tag.match(/^<\s*([^\s/>]+)/)?.[1]?.toLowerCase();

  for (const match of tag.matchAll(pattern)) {
    const name = match[1].toLowerCase();
    if (name === tagName) continue;
    values.set(name, decodeHtml(match[2] ?? match[3] ?? match[4] ?? ""));
  }

  return values;
}

function tags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

function outputPath(file) {
  const local = relative(distRoot, file).split(sep).join("/");
  if (local === "index.html") return "/";
  if (local.endsWith("/index.html")) return `/${local.slice(0, -"/index.html".length)}`;
  return `/${local.slice(0, -".html".length)}`;
}

function validateCount(scope, label, items) {
  if (items.length !== 1) {
    fail(scope, `expected exactly one ${label}; found ${items.length}`);
    return false;
  }
  return true;
}

let distInfo;
try {
  distInfo = await stat(distRoot);
} catch {
  console.error("SEO check requires an existing dist directory. Run `pnpm build` first.");
  process.exit(1);
}

if (!distInfo.isDirectory()) {
  console.error("SEO check requires dist to be a directory. Run `pnpm build` first.");
  process.exit(1);
}

const files = await walk(distRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const generatedPagePaths = new Set(htmlFiles.map((file) => outputPath(file)));
const indexablePages = [];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const scope = outputPath(file);
  const metaTags = tags(html, "meta").map((tag) => attributes(tag));
  const noindex = metaTags.some((meta) => {
    const robotsName = meta.get("name")?.toLowerCase();
    return robotsName === "robots" && /\bnoindex\b/i.test(meta.get("content") ?? "");
  });
  if (noindex) continue;

  const titleMatches = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  const descriptions = metaTags.filter((meta) => meta.get("name")?.toLowerCase() === "description");
  const canonicals = tags(html, "link")
    .map((tag) => attributes(tag))
    .filter((link) => (link.get("rel") ?? "").toLowerCase().split(/\s+/).includes("canonical"));
  const icons = tags(html, "link")
    .map((tag) => attributes(tag))
    .filter((link) => (link.get("rel") ?? "").toLowerCase().split(/\s+/).includes("icon"));
  const headings = tags(html, "h1");

  const hasTitle = validateCount(scope, "title", titleMatches);
  const hasDescription = validateCount(scope, "meta description", descriptions);
  const hasCanonical = validateCount(scope, "canonical link", canonicals);
  validateCount(scope, "H1", headings);

  const title = hasTitle ? plainText(titleMatches[0][1]) : "";
  const description = hasDescription ? (descriptions[0].get("content")?.trim() ?? "") : "";
  const canonical = hasCanonical ? (canonicals[0].get("href")?.trim() ?? "") : "";

  if (hasTitle && !title) fail(scope, "title is empty");
  if (title.length > 65) fail(scope, `title is ${title.length} characters (maximum 65)`);
  if (hasDescription && !description) fail(scope, "meta description is empty");
  if (description.length > 158) {
    fail(scope, `meta description is ${description.length} characters (maximum 158)`);
  }

  if (hasCanonical) {
    try {
      const url = new URL(canonical);
      if (url.origin !== canonicalOrigin) {
        fail(scope, `canonical must use ${canonicalOrigin}; found ${url.origin}`);
      }
      if (url.pathname !== "/" && url.pathname.endsWith("/")) {
        fail(scope, `canonical has a trailing slash: ${canonical}`);
      }
      if (url.search || url.hash)
        fail(scope, `canonical must not contain a query or hash: ${canonical}`);
    } catch {
      fail(scope, `canonical is not an absolute URL: ${canonical || "(empty)"}`);
    }
  }

  if (!icons.some((icon) => icon.get("href") === primaryFaviconPath)) {
    fail(scope, `missing primary favicon link: ${primaryFaviconPath}`);
  }
  for (const icon of icons) {
    const href = icon.get("href")?.trim() ?? "";
    try {
      const url = new URL(href, canonicalOrigin);
      if (url.search || url.hash) {
        fail(scope, `favicon URL must be stable and omit query strings or hashes: ${href}`);
      }
    } catch {
      fail(scope, `favicon URL is invalid: ${href || "(empty)"}`);
    }
  }

  for (const tag of tags(html, "img")) {
    const image = attributes(tag);
    if (!image.has("alt")) {
      fail(scope, `image is missing alt: ${tag.slice(0, 160)}`);
      continue;
    }
    if (image.get("alt") === "") {
      if (image.get("aria-hidden")?.toLowerCase() !== "true") {
        fail(scope, `decorative image with empty alt must have aria-hidden="true"`);
      }
      if (image.get("role")?.toLowerCase() !== "presentation") {
        fail(scope, `decorative image with empty alt must have role="presentation"`);
      }
    }
  }

  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const anchor = attributes(`<a ${match[1]}>`);
    const ariaLabel = anchor.get("aria-label")?.trim();
    const titleAttribute = anchor.get("title")?.trim();
    const innerText = plainText(match[2]);
    const imageAlt = tags(match[2], "img")
      .map((tag) => attributes(tag).get("alt")?.trim())
      .find(Boolean);
    if (!ariaLabel && !titleAttribute && !innerText && !imageAlt) {
      fail(scope, `anchor has no accessible name: ${match[0].slice(0, 180)}`);
    }
  }

  indexablePages.push({ scope, title, description, canonical });
}

for (const key of ["title", "description", "canonical"]) {
  const seen = new Map();
  for (const page of indexablePages) {
    const value = page[key];
    if (!value) continue;
    const prior = seen.get(value);
    if (prior) fail(page.scope, `${key} duplicates ${prior}: ${value}`);
    else seen.set(value, page.scope);
  }
}

const sitemapFile = resolve(distRoot, "sitemap.xml");
let sitemapUrls = [];
try {
  const sitemap = await readFile(sitemapFile, "utf8");
  const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/gi)];
  sitemapUrls = sitemapEntries.map((entry, index) => {
    const locMatches = [...entry[1].matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)];
    const lastmodMatches = [...entry[1].matchAll(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/gi)];
    if (locMatches.length !== 1) {
      fail("sitemap.xml", `entry ${index + 1} must contain exactly one <loc>`);
    }
    if (lastmodMatches.length !== 1) {
      fail("sitemap.xml", `entry ${index + 1} must contain exactly one <lastmod>`);
    } else {
      const lastmod = lastmodMatches[0][1].trim();
      const parsedDate = new Date(`${lastmod}T00:00:00Z`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod) || Number.isNaN(parsedDate.getTime())) {
        fail("sitemap.xml", `entry ${index + 1} has an invalid <lastmod>: ${lastmod}`);
      }
    }
    return decodeHtml(locMatches[0]?.[1] ?? "");
  });
  if (!sitemapUrls.length) fail("sitemap.xml", "contains no <loc> URLs");
} catch {
  fail("sitemap.xml", "missing from dist");
}

const sitemapSet = new Set();
for (const value of sitemapUrls) {
  if (sitemapSet.has(value)) fail("sitemap.xml", `duplicate URL: ${value}`);
  sitemapSet.add(value);
  try {
    const url = new URL(value);
    if (url.origin !== canonicalOrigin) {
      fail("sitemap.xml", `URL must use ${canonicalOrigin}: ${value}`);
    }
    if (url.pathname !== "/" && url.pathname.endsWith("/")) {
      fail("sitemap.xml", `URL has a trailing slash: ${value}`);
    }
    if (url.search || url.hash) fail("sitemap.xml", `URL contains a query or hash: ${value}`);
  } catch {
    fail("sitemap.xml", `invalid absolute URL: ${value}`);
  }
}

for (const page of indexablePages) {
  if (page.canonical && !sitemapSet.has(page.canonical)) {
    fail(page.scope, `indexable canonical is missing from sitemap: ${page.canonical}`);
  }
}

const canonicalSet = new Set(indexablePages.map((page) => page.canonical).filter(Boolean));
for (const value of sitemapSet) {
  if (!canonicalSet.has(value)) {
    fail("sitemap.xml", `URL is not an indexable canonical page: ${value}`);
  }
}

try {
  await stat(resolve(distRoot, primaryFaviconPath.slice(1)));
} catch {
  fail(primaryFaviconPath, "primary favicon is missing from dist");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') quoted = false;
      else value += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") {
      row.push(value);
      value = "";
    } else if (character === "\n") {
      row.push(value.replace(/\r$/, ""));
      if (row.some((cell) => cell.length)) rows.push(row);
      row = [];
      value = "";
    } else value += character;
  }

  if (value.length || row.length) {
    row.push(value.replace(/\r$/, ""));
    if (row.some((cell) => cell.length)) rows.push(row);
  }
  return rows;
}

const redirectsFile = resolve(projectRoot, "vercel.json");
try {
  const config = JSON.parse(await readFile(redirectsFile, "utf8"));
  if (typeof config.bulkRedirectsPath !== "string" || !config.bulkRedirectsPath) {
    throw new Error("bulkRedirectsPath must point to the reviewed redirect map");
  }

  const bulkRedirectsFile = resolve(projectRoot, config.bulkRedirectsPath);
  const redirectRows = parseCsv(await readFile(bulkRedirectsFile, "utf8"));
  const redirectHeaders = redirectRows.shift() ?? [];
  const expectedHeaders = ["source", "destination", "statusCode"];
  if (redirectHeaders.join(",") !== expectedHeaders.join(",")) {
    throw new Error(`redirect CSV headers must be ${expectedHeaders.join(",")}`);
  }
  const redirects = redirectRows.map(([source, destination, statusCode]) => ({
    source,
    destination,
    statusCode: Number(statusCode),
  }));
  const sources = new Map();

  for (const [index, redirect] of redirects.entries()) {
    const scope = `${config.bulkRedirectsPath} redirect ${index + 1}`;
    const source = redirect.source;
    const destination = redirect.destination;
    if (typeof source !== "string" || typeof destination !== "string") {
      fail(scope, "source and destination must be strings");
      continue;
    }
    if (!source.startsWith("/") || /[?#:*()]/.test(source)) {
      fail(scope, `source must be an exact pathname without wildcards: ${source}`);
    }
    if (redirect.statusCode !== 301) {
      fail(
        scope,
        `legacy and canonical redirects must use status 301; found ${redirect.statusCode}`,
      );
    }
    if (sources.has(source))
      fail(scope, `duplicate source also used by redirect ${sources.get(source)}`);
    else sources.set(source, index + 1);

    let destinationUrl;
    try {
      destinationUrl = new URL(destination, canonicalOrigin);
    } catch {
      fail(scope, `invalid destination: ${destination}`);
      continue;
    }

    if (destinationUrl.origin !== canonicalOrigin) {
      fail(scope, `destination must use the canonical host: ${destination}`);
    }
    if (destinationUrl.pathname !== "/" && destinationUrl.pathname.endsWith("/")) {
      fail(scope, `destination has a trailing slash: ${destination}`);
    }
    if (destinationUrl.search) fail(scope, `destination must not contain a query: ${destination}`);

    const destinationCanonical = `${destinationUrl.origin}${destinationUrl.pathname}`;
    if (!sitemapSet.has(destinationCanonical)) {
      fail(scope, `destination is not an indexable sitemap URL: ${destinationCanonical}`);
    }
  }

  for (const [source, index] of sources) {
    const redirect = redirects[index - 1];
    const destinationPath = new URL(redirect.destination, canonicalOrigin).pathname;
    if (sources.has(destinationPath)) {
      fail(
        `vercel.json redirect ${index}`,
        `redirect chain: ${source} -> ${destinationPath} -> redirect ${sources.get(destinationPath)}`,
      );
    }
  }

  for (const sitemapUrl of sitemapSet) {
    const pathname = new URL(sitemapUrl).pathname;
    if (pathname === "/") continue;
    const slashSource = `${pathname}/`;
    const redirectIndex = sources.get(slashSource);
    if (!redirectIndex) {
      fail(
        config.bulkRedirectsPath,
        `missing trailing-slash redirect for canonical page: ${slashSource}`,
      );
      continue;
    }
    const destination = redirects[redirectIndex - 1].destination;
    if (new URL(destination, canonicalOrigin).pathname !== pathname) {
      fail(config.bulkRedirectsPath, `${slashSource} must redirect directly to ${pathname}`);
    }
  }

  const legacyMatrixFile = resolve(projectRoot, "docs/seo/legacy-url-matrix.csv");
  const legacyRows = parseCsv(await readFile(legacyMatrixFile, "utf8"));
  const legacyHeaders = legacyRows.shift() ?? [];
  const legacyIndexes = new Map(legacyHeaders.map((header, index) => [header, index]));
  for (const requiredHeader of ["source_url", "action", "target_url"]) {
    if (!legacyIndexes.has(requiredHeader)) {
      throw new Error(`legacy URL matrix is missing ${requiredHeader}`);
    }
  }

  const documentedRedirectSources = new Set();
  for (const row of legacyRows) {
    const sourceUrl = new URL(row[legacyIndexes.get("source_url")]);
    const action = row[legacyIndexes.get("action")];
    const target = row[legacyIndexes.get("target_url")];
    const sourcePath = sourceUrl.pathname;
    const slashlessSource = sourcePath === "/" ? "/" : sourcePath.replace(/\/+$/, "");
    const slashSource = slashlessSource === "/" ? "/" : `${slashlessSource}/`;

    if (action === "retire_404") {
      for (const candidate of new Set([slashlessSource, slashSource])) {
        if (sources.has(candidate)) {
          fail("legacy URL matrix", `${candidate} is marked retire_404 but has a redirect`);
        }
      }
      if (generatedPagePaths.has(slashlessSource)) {
        fail("legacy URL matrix", `${slashlessSource} is marked retire_404 but builds as a page`);
      }
      continue;
    }

    if (!["exact_redirect", "section_redirect", "rebuild"].includes(action)) continue;
    if (!target) {
      fail("legacy URL matrix", `${sourcePath} has action ${action} without a target`);
      continue;
    }

    const targetUrl = new URL(target);
    const expectedDestination = `${targetUrl.pathname}${targetUrl.hash}`;
    const candidates =
      slashlessSource === targetUrl.pathname
        ? [slashSource]
        : [...new Set([slashlessSource, slashSource])];
    if (slashlessSource === "/" && sourceUrl.origin !== canonicalOrigin) continue;

    for (const candidate of candidates) {
      documentedRedirectSources.add(candidate);
      const redirectIndex = sources.get(candidate);
      if (!redirectIndex) {
        fail("legacy URL matrix", `${candidate} is missing its reviewed 301 redirect`);
        continue;
      }
      const destination = redirects[redirectIndex - 1].destination;
      if (destination !== expectedDestination) {
        fail(
          "legacy URL matrix",
          `${candidate} redirects to ${destination}; expected ${expectedDestination}`,
        );
      }
    }
  }

  const canonicalSlashSources = new Set(
    [...sitemapSet]
      .map((sitemapUrl) => new URL(sitemapUrl).pathname)
      .filter((pathname) => pathname !== "/")
      .map((pathname) => `${pathname}/`),
  );
  for (const source of sources.keys()) {
    if (!canonicalSlashSources.has(source) && !documentedRedirectSources.has(source)) {
      fail("legacy URL matrix", `${source} has a redirect but is not documented in the matrix`);
    }
  }

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const scope = outputPath(file);
    for (const tag of tags(html, "a")) {
      const href = attributes(tag).get("href")?.trim();
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        continue;
      }
      let url;
      try {
        url = new URL(href, canonicalOrigin);
      } catch {
        continue;
      }
      if (url.origin === canonicalOrigin && sources.has(url.pathname)) {
        fail(scope, `internal link points to redirecting URL: ${href}`);
      }
    }
  }
} catch (error) {
  fail("vercel.json", `could not validate redirects: ${error.message}`);
}

if (failures.length) {
  console.error(
    `SEO check failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:\n`,
  );
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `SEO check passed: ${indexablePages.length} indexable pages, ${sitemapUrls.length} sitemap URLs, and all configured redirects validated.`,
);
