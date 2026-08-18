# Legacy URL migration audit

**Date:** August 18, 2026

**Canonical origin:** `https://www.turnkeyautomarketing.com`

**Canonical path style:** no trailing slash

## Outcome

The repository now has one explicit, reviewable migration map instead of broad redirect patterns. The map contains 123 exact redirect rules, all with an explicit `301` status. It covers both slashed and slashless forms of each legitimate legacy route and the trailing-slash form of every indexable current page.

The exhaustive URL-level deliverable is [`legacy-url-matrix.csv`](./legacy-url-matrix.csv). It contains 106 historical URL records, their disposition, final destination when applicable, and a rationale for every decision:

| Disposition | URL records | Result |
| --- | ---: | --- |
| Exact redirect | 21 | Direct `301` to the closest current equivalent |
| Section redirect | 26 | Direct `301` only where the section still satisfies the old intent |
| Rebuilt resource | 4 | Direct `301` to the exact rebuilt article |
| Canonical route retained | 4 | Current path remains a canonical `200`; host/slash variants normalize |
| Retire as 404 | 50 | No redirect and no generated page |
| Retire as security-layer 403 | 1 | WordPress login endpoint remains blocked and is not redirected |

## Existing system audit

- Framework: Astro static output. There is no Next.js router, middleware, `_redirects`, `.htaccess`, Netlify routing file, or separate server redirect utility.
- Redirects were previously defined only in `vercel.json` with `permanent: true`. On Vercel that produced `308`, not the requested `301`.
- `trailingSlash: false` ran before the legacy rules in production. A URL such as `/whoweare/` therefore took two hops: `308` to `/whoweare`, then `308` to `/about`.
- Broad `/category/:path*`, `/author/:path*`, and `/portfolio_category/:path*` rules redirected arbitrary URLs. Live testing confirmed that even `/category/not-a-real-category/` reached `/resources` with two redirects.
- `BaseLayout.astro` already self-canonicalized pages to the HTTPS `www` origin and removed trailing slashes.
- `sitemap.xml.ts` already emitted only current canonical URLs. `robots.txt` referenced the canonical sitemap.

## Redirect map

The exact deployable map is [`redirects.csv`](../../redirects.csv). Important mappings include:

| Legacy URL or family | Final destination | Reason |
| --- | --- | --- |
| `/whoweare`, `/about-us`, `/meet-the-team` | `/about` | Current company, history, and team page |
| `/whatwedo` | `/services` | Direct successor to the old service index |
| `/why-us` | `/results` | Current proof and client-results page |
| `/contact-us`, `/book-a-call`, `/our-office` | `/contact` | Current contact, address, and booking flow |
| `/asa`, `/ati` | `/services` | Current service lineup satisfies the old partner-campaign intent |
| `/blog`, `/insights`, known insight pagination | `/resources` | Current resource library |
| Known marketing/news/client categories and author archives | `/resources` | Current editorial library; only evidenced archives are included |
| Known portfolio taxonomies and `/case-study` index | `/results` | Current verified results page |
| `/customer-life-cycle` | `/services/retention-marketing` | Direct current service equivalent |
| Old newsletter routes | `/services/retention-marketing` | Current service includes newsletters and CRM follow-up |
| `/services/facebook-ads` | `/services/social-media-marketing` | Current social service includes Facebook and ad creation |
| `/services/the-marketing-engine` | `/services/vip-marketing-manager` | Current full-service, done-for-you offer |
| `/auto-repair-shop-photography` | `/resources/auto-repair-shop-photography-guide` | Exact rebuilt evergreen topic |
| `/create-customer-profile-auto-repair-shop` | `/resources/ideal-customer-profile-auto-repair-shop` | Exact rebuilt evergreen topic |
| `/be-the-guide`, `/two-keys-auto-repair-shop-message` | `/resources/be-the-guide-auto-repair-shop-messaging` | Same customer-centered messaging intent |
| `/use-this-magical-three-word-filter-to-woo-customers-to-your-auto-repair-shop` | `/resources/know-like-trust-marketing-filter` | Exact rebuilt framework |
| `/how-to-create-a-winning-marketing-plan-for-your-auto-repair-shop` | `/resources/auto-repair-marketing-plan` | Exact rebuilt guide |
| `/joe-flammer-ratchet-wrench` | `/resources/direct-mail-for-repair-shops` | Same enduring direct-mail intent |
| `/celebrating-10-years-of-turnkey-marketing` | `/about` | Company-history subject is retained on About |

Both the trailing-slash and slashless version of each legacy route point directly to the final destination. No redirect destination is itself a redirect source.

## Intentional non-redirects

The 50 `retire_404` rows in the URL matrix are intentionally left without a route or generated page. They include:

- Avada and WordPress demo pages, fake case studies, lorem-ipsum FAQs, theme-builder taxonomies, slide templates, and test products.
- Obsolete cart, shop, account, coming-soon, and discontinued software-product pages.
- Time-bound event recaps and client news with no referring-domain evidence or sufficiently equivalent current page.
- `/services/video-websites`, because the current Digital Marketing page explicitly says Turnkey does not build websites; redirecting it would misrepresent the offer.
- WordPress and Cloudflare technical endpoints that are not content.

`/wp-login.php` is separately marked `retire_403`: production blocks it at the security layer, which is preferable to redirecting an obsolete administrative endpoint.

## Internal links, sitemap, and canonicals

- No current internal links to legacy or redirecting URLs were found, so no anchor URLs needed correction.
- The SEO check now fails if any built internal link points to a redirect source.
- The sitemap contains 26 URLs, all HTTPS `www`, slashless, unique, indexable, and matched to a self-canonical page.
- Every indexable sitemap path has an explicit trailing-slash `301` to its slashless canonical.
- The SEO check now cross-validates the migration matrix, redirect map, generated pages, redirect status codes, destinations, chains, sitemap entries, canonical tags, and internal links.

## Domain normalization

Live behavior before deployment was:

| Request | Live result | Hops |
| --- | --- | ---: |
| `http://turnkeyautomarketing.com/` | `308` to HTTPS apex, then `308` to HTTPS `www`, then `200` | 2 |
| `http://www.turnkeyautomarketing.com/` | `308` to HTTPS `www`, then `200` | 1 |
| `https://turnkeyautomarketing.com/` | `308` to HTTPS `www`, then `200` | 1 |
| `https://www.turnkeyautomarketing.com/` | `200` | 0 |

The canonical host is consistent and no noncanonical host serves a `200`. The remaining two-hop HTTP-apex sequence is controlled by Vercel's domain/HTTPS layer, not this repository. The project is not locally linked to a Vercel account, so no external domain setting was changed. After deployment, the domain redirect should be reviewed in Vercel Domains and set to a permanent redirect to `www`; Vercel may still perform its platform HTTP-to-HTTPS upgrade before the domain redirect.

## Verification

| Check | Result |
| --- | --- |
| Production build | Passed; 30 pages generated |
| ESLint | Passed |
| SEO validation | Passed; 26 indexable pages and 26 sitemap URLs |
| Redirect rules | 123/123 use explicit status `301` |
| Redirect destinations | 26/26 are current sitemap canonicals |
| Redirect chains | 0 in the configured map |
| Matrix coverage | Every redirect disposition is mapped; every configured legacy rule is documented |
| Intentional 404 coverage | 50/50 have no redirect and no generated page |
| Internal links to redirects | 0 |

Expected deployed behavior for every redirect row is `legacy URL → 301 → canonical 200` in one hop. Live production still reflects the pre-change deployment until these repository changes are deployed; a post-deploy HTTP crawl is required to record the final edge responses.

## Files changed

- `vercel.json` — points Vercel to the reviewed bulk redirect map.
- `redirects.csv` — exact one-hop 301 rules; no wildcard archive redirects.
- `docs/seo/legacy-url-matrix.csv` — exhaustive historical URL disposition table and rationale.
- `scripts/seo-check.mjs` — validates redirect status, destinations, chains, matrix coverage, intentional 404s, slash normalization, and internal links.
- `src/lib/resource-posts.ts` — records the additional exact legacy article paths on their rebuilt resources.
- `docs/seo/legacy-url-migration-audit-2026-08-18.md` — this audit and verification record.
