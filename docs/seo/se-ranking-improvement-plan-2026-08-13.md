# SE Ranking improvement plan - August 13, 2026

This plan uses the connected SE Ranking project for `turnkeyautomarketing.com` (project ID `12503330`), including the August 13 rank snapshot, current keyword configuration, connected Google Search Console query data, the July 29 website audit, competitors, and backlink summaries.

## What the connected data changes

The project tracks 133 phrases on U.S. desktop and mobile. All keywords currently sit in one group (`177601`), and no target URLs are assigned. That setup reports movement, but it does not clearly identify page cannibalization or separate service lines.

The useful search demand is concentrated in four existing page families:

| Priority | Intent | Current evidence | Current ranking URL |
| --- | --- | --- | --- |
| 1 | Marketing plan and strategy | `auto repair marketing plan`: volume 110, positions 11 desktop / 12 mobile; `auto repair marketing strategies`: volume 140, position 28 on both | `/resources/auto-repair-marketing-plan` |
| 2 | Core agency/company | `auto repair marketing agency`: volume 30, positions 25 / 24; GSC returned 336 impressions for `auto repair marketing companies` at average position 20.33 | `/` |
| 3 | Direct mail | `auto repair shop direct mail`: positions 14 / 15; `auto repair direct mail`: volume 30, positions 22 / 22; GSC returned 132 impressions for the latter | `/services/direct-mail` |
| 4 | Consultant and outsourced leadership | Consultant phrases appear around positions 13-20; outsourced director appears around 16 / 22 | Plan article, consulting, VIP, and results pages are splitting this intent |

## Target URL map

This is the page ownership model to configure in SE Ranking and reinforce on the site.

| Keyword group | Primary URL | Page role | Do not target from |
| --- | --- | --- | --- |
| Agency and company | `/` | Main commercial category and brand promise | Resources hub |
| Marketing services | `/services` | Service lineup and coordinated-service overview | Homepage title/H1 |
| Consultant, audit, and advisory | `/services/marketing-consulting` | Monthly outside advice and decision support | Marketing-plan resource |
| Outsourced marketing department/director | `/services/vip-marketing-manager` | Done-for-you leadership and execution | Results page |
| Marketing plan and strategy | `/resources/auto-repair-marketing-plan` | Informational seven-step guide | Consulting title/H1 |
| Direct mail and postcards | `/services/direct-mail` | Commercial service intent | Direct-mail resource |
| Direct-mail education | `/resources/direct-mail-for-repair-shops` | Informational support and internal-link source | Service title/H1 |
| Social media | `/services/social-media-marketing` | Commercial service intent | General resources hub |
| Retention and email | `/services/retention-marketing` | Commercial service intent | General resources hub |
| Local visibility and digital coordination | `/services/digital-marketing` | Current proven scope: reviews, GBP, audits, vendor coordination | Unconfirmed standalone SEO/PPC pages |

## Phase 1: measurement and page-one opportunities (days 0-14)

### 1. Rebuild the SE Ranking project structure

- Create keyword groups matching the target URL map.
- Assign each tracked keyword a target page in SE Ranking.
- Put Google Ads/PPC, website design, broad SEO, and lead-generation terms into a `Scope pending` group until Turnkey confirms those standalone offerings.
- Separate informational and commercial terms even when the wording overlaps.
- Remove duplicate competitors entered with and without trailing slashes.
- Remove unrelated brand-lookalike domains unless they are causing a real branded-search problem.

Success condition: every valuable tracked phrase has one intended URL, and ranking-page changes become visible as cannibalization rather than ordinary position noise.

### 2. Deploy and measure the updated marketing-plan guide

The guide is the closest page-one opportunity and was expanded in the current code pass.

- Deploy the updated title, description, H1, seven-step content, related resources, and consulting link.
- Request indexing for the guide and consulting page after deployment.
- Annotate the deployment date in the reporting workflow.
- Review desktop/mobile position, GSC impressions, clicks, CTR, and the selected landing page after Google recrawls it.
- Keep the guide focused on plan and strategy. Move consultant and outsourced-service language toward their commercial pages through descriptive internal links.

Success condition: the guide enters the top 10 for `auto repair marketing plan`, and consultant searches increasingly select `/services/marketing-consulting`.

### 3. Rerun the website audit after deployment

The available audit is from July 29 and scored 93/100 across 26 pages. Its nonzero findings were:

- Two oversized-image warnings on `/services` and `/results`.
- One long-H1 notice on `/`.
- One no-inbound-link error on legacy `/book-a-call`.
- One-internal-link notices on three resource pages.
- Uncompressed-CSS notices on all 26 crawled pages.

The legacy `/book-a-call` path is already configured to redirect, and the site has changed since the audit. Rerun first; fix only issues that remain.

Success condition: current audit has no indexable orphan page, no oversized-image warning, and no error-level finding on a live canonical URL.

## Phase 2: commercial relevance and internal linking (days 15-45)

### 4. Strengthen the direct-mail cluster

The direct-mail service already has consistent page-two rankings, making it the next practical page-one push.

- Expand `/resources/direct-mail-for-repair-shops` from a short article into a useful campaign guide covering list, offer, timing, creative, tracking, and follow-up.
- Add one approved direct-mail example or client result to `/services/direct-mail`; do not invent performance numbers.
- Add links to the service from the direct-mail resource, relevant results, the services hub, and one related planning resource.
- Keep the service page commercial and the resource educational.
- Improve the snippet around the exact phrase `auto repair direct mail` without repeating it unnaturally.

Success condition: `/services/direct-mail` is the stable ranking URL for direct-mail service terms and moves at least one tracked term into the top 10.

### 5. Resolve consultant/director cannibalization

Current ranking URLs are split:

- The plan article ranks for `auto repair marketing consultant`.
- `/services/marketing-consulting` ranks for `auto shop marketing consultant`.
- `/services/vip-marketing-manager` ranks for `outsourced marketing director auto repair`.
- `/results` ranks for `auto repair marketing director`.

Actions:

- Keep `/services/marketing-consulting` focused on advice, audits, monthly strategy, and keep/fix/stop/start decisions.
- Keep VIP focused on an outsourced marketing department, accountable leadership, and execution.
- Add descriptive links from relevant proof on `/results` to VIP or consulting instead of allowing results to act as the commercial landing page.
- On the plan article, answer the informational need and route readers to consulting; do not make its title or H1 commercial.

Success condition: consultant terms consolidate on consulting, outsourced department/director terms consolidate on VIP, and `/results` supports rather than competes.

### 6. Protect the homepage as the agency/company page

The homepage currently ranks for seven closely related agency/company variants. GSC also shows substantial impressions for company and agency phrasing.

- Preserve `/` as the target for agency/company intent.
- Make `/services` the service-lineup target rather than a second agency homepage.
- Review homepage title/H1 changes conservatively; rankings are volatile and the current page is already the selected URL.
- Add a concise comparison section explaining the difference between consulting, a managed service, and the VIP outsourced department.
- Link from the resources hub back to the homepage with descriptive category language so `/resources` stops surfacing for broad commercial terms.

Success condition: the homepage remains the selected URL for core agency/company terms while the services hub owns service-lineup phrases.

## Phase 3: topical coverage and authority (days 45-90)

### 7. Publish one adjacent informational asset at a time

SE Ranking reports volume 170 for `auto repair marketing ideas`, with no current top-100 ranking. A well-scoped resource can support the existing plan guide without duplicating it.

Recommended first asset:

- `/resources/auto-repair-marketing-ideas`
- Intent: practical campaign ideas categorized by acquisition, retention, reputation, slow-bay demand, and customer quality.
- Internal links: plan guide, direct mail, retention, digital marketing, social media, and consulting.
- Required proof: Turnkey examples, screenshots, or clearly labeled experience-based recommendations.

Do not create SEO, PPC, website-design, or lead-generation service pages solely because the tracked volume is attractive. Confirm the service is actually sold, its deliverables, ownership, reporting, proof, and exclusions first.

### 8. Build authority to specific pages

SE Ranking's backlink summary shows Turnkey at 81 referring domains, 32 dofollow referring domains, and only eight pages with backlinks. Competitor referring-domain counts range from 110 for Auto Shop Digital to 253 for LIFT, 490 for Shop Marketing Pros, and 1,726 for AutoShop Solutions. Some competitor totals are inflated by sitewide client footers, so the goal is relevant authority rather than raw link count.

90-day outreach plan:

- Earn links from client case studies and approved partner/vendor pages to the most relevant result or service page.
- Pitch original shop-marketing benchmarks or campaign checklists to automotive associations, podcasts, newsletters, and event partners.
- Reclaim links pointing at legacy `/contact-us`, `/about-us`, `/whoweare`, and other old URLs when the referring site can update them directly.
- Promote the marketing-plan guide and direct-mail guide as linkable resources.
- Prefer branded and natural anchors; do not manufacture exact-match anchor patterns.

Success condition: 8-12 new relevant referring domains in 90 days, with at least half linking to a resource, service, or results page rather than only the homepage.

## Weekly scorecard

Track these measures once per week, not as daily verdicts:

1. Top-10 count and top-30 count by keyword group.
2. Selected landing page for every priority term.
3. GSC impressions, clicks, CTR, and average position for the four priority clusters.
4. Indexable pages and sitemap coverage.
5. Site-audit errors and warnings after each material deployment.
6. New referring domains and which page earned the link.
7. Qualified consultation conversions from organic landing pages.

## Decisions required before expanding scope

Turnkey should explicitly confirm whether it directly sells each of the following before SEO pages are planned: local SEO as a standalone service, Google Ads/PPC management, website design/development, Facebook ads, and lead generation. Until confirmed, keep those keywords tracked in `Scope pending` and avoid publishing pages that imply unsupported deliverables.
