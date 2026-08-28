# SEO/GEO audit and remediation loop

**Audit date:** August 28, 2026

**Canonical site:** `https://www.turnkeyautomarketing.com`

**Repository build:** Astro static output

**Live benchmark:** Google Search/AI Overview, DuckDuckGo, Bing Copilot Search

## Outcome

The repository now has no critical, high, or medium finding in the repeatable source crawl used for this audit.

| Measure | Baseline | Final source crawl |
| --- | ---: | ---: |
| Critical findings | 0 | 0 |
| High-impact findings | 6 | 0 |
| Medium findings | 0 | 0 |
| Indexable pages | 30 | 32 |
| Sitemap URLs | 30 | 32 |
| Priority queries with an answer-ready owner | 8 / 10 | 10 / 10 |

The final production build and repository SEO check both pass. The two new audience pages were also checked at 320, 768, and 1,440 CSS pixels with one H1, visible consultation actions, and no horizontal overflow.

## Audit method

The same built-output crawl was run after every material fix. It checks:

- robots and canonical sitemap discovery;
- sitemap-to-build and canonical parity;
- index/noindex conflicts;
- one H1, unique titles, and descriptions;
- internal-link reachability, with a minimum of two contextual inbound sources for indexable non-utility pages;
- required Service and Article schema types;
- visible editorial source links on resource and audience content;
- early-page query signals and sufficient visible content for every priority query owner.

The live benchmark used the same four representative queries on each observable engine surface:

1. `auto repair marketing agency`
2. `auto repair marketing plan`
3. `European auto repair marketing`
4. `multi-location auto repair marketing`

## Ranked baseline gaps

### 1. European-specialist intent had no Turnkey-owned answer page

**Impact:** Highest. The internal business analysis identifies a meaningful European-specialist client segment, while Google, DuckDuckGo, and Bing Copilot did not surface Turnkey for the segment query.

**Fix:** Added `/who-we-help/european-auto-repair-shops` with a direct answer, segment-specific decision guidance, an approved result link, relevant services, FAQ content, Service/Breadcrumb/FAQ schema, three primary source notes, two contextual inbound links, sitemap inclusion, a slash redirect, and an `llms.txt` entry.

### 2. Multi-location intent had no Turnkey-owned answer page

**Impact:** High. The repository already contains approved multi-location proof, but no page owned the search and answer-engine intent. Live Google, DuckDuckGo, and Bing Copilot did not mention Turnkey for the query.

**Fix:** Added `/who-we-help/multi-location-auto-repair-shops` with a direct answer, central-versus-local operating guidance, the approved Killian Auto Pros result, relevant services, FAQ content, Service/Breadcrumb/FAQ schema, three primary source notes, two contextual inbound links, sitemap inclusion, a slash redirect, and an `llms.txt` entry.

### 3. Three indexable utility/support pages were below the two-link standard

**Impact:** Moderate to low. `/about`, `/ai-visibility-scan`, and `/photos` were discoverable through global navigation or a single article but had fewer than two contextual inbound sources.

**Fix:** Added descriptive links from the homepage, resource hub, and photography guide. Each page now has two contextual inbound sources.

### 4. Full-repository lint was spending time in generated research artifacts

**Impact:** Low, but it weakened the required verification loop.

**Fix:** Excluded generated build, research-output, temporary, and local work directories from ESLint. `pnpm lint` now completes successfully.

## Priority-query ownership after remediation

| Query | Intended answer-ready page |
| --- | --- |
| auto repair marketing agency | `/` |
| auto repair marketing services | `/services` |
| auto repair marketing consultant | `/services/marketing-consulting` |
| outsourced marketing department for auto repair shops | `/services/vip-marketing-manager` |
| auto repair customer acquisition | `/services/directtrack-marketing` |
| auto repair marketing plan | `/resources/auto-repair-marketing-plan` |
| auto repair direct mail | `/services/direct-mail` |
| direct mail for auto repair shops | `/resources/direct-mail-for-repair-shops` |
| European auto repair marketing | `/who-we-help/european-auto-repair-shops` |
| multi-location auto repair marketing | `/who-we-help/multi-location-auto-repair-shops` |

## Live search and answer-engine benchmark

### Baseline and immediate rerun

The live results did not change during this repository-only work, which is expected because the new URLs have not been deployed or recrawled.

| Engine surface | Agency | Marketing plan | European | Multi-location |
| --- | --- | --- | --- | --- |
| Google Search / AI Overview | Turnkey mentioned; homepage/brand entity visible | No Turnkey mention observed | No Turnkey mention observed | No Turnkey mention observed |
| DuckDuckGo | Turnkey mentioned | No Turnkey mention observed | No Turnkey mention observed | No Turnkey mention observed |
| Bing Copilot Search | Turnkey ranked first in the generated agency list and cited `/about` plus `/` | No Turnkey mention observed | No Turnkey mention observed | No Turnkey mention observed |

The engine benchmark therefore remains the post-deployment measurement baseline. It does not invalidate the source-crawl result; it shows the release and indexing dependency that comes next. A ranking or AI-citation change cannot be truthfully claimed until the pages are live and the engines have revisited them.

## Source and structured-data coverage

Both new audience pages include visible source notes linking to primary guidance from Google Business Profile Help and the Federal Trade Commission. They also emit Service, BreadcrumbList, and FAQPage JSON-LD. The sitemap, canonical URLs, slash redirects, internal links, `llms.txt`, titles, descriptions, and H1s agree on the final URLs.

## Verification record

- `pnpm build` — passed
- `pnpm lint` — passed
- `node scripts/seo-check.mjs` — passed: 32 indexable pages, 32 sitemap URLs, all configured redirects validated
- `pnpm seo:geo-check` — passed: 0 critical, 0 high, 0 medium; 10/10 priority queries answer-ready
- responsive browser check — passed at 320, 768, and 1,440 pixels for both new pages

## External next step

Deploy the changes, submit or refresh the sitemap through the normal webmaster workflow, and rerun the four-query live benchmark after the pages have been crawled. Do not interpret an unchanged result before recrawl as a content failure, and do not claim ranking or AI-citation gains until the live engines show them.
