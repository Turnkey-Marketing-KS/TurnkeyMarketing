# Agent brief: paid media, PPC, LSA, and auto-repair advertising

## Opportunity and constraint

The qualified cluster represents approximately 4,320 monthly searches and the highest directional opportunity score in the export. The current site has `DirectTrack Marketing` and vendor coordination under `Digital Marketing`, but it does not clearly promise direct Google Ads, PPC, or Local Services Ads management.

Your first job is to establish truthful service boundaries. Do not turn search demand into unsupported service claims.

## Primary page ownership

- Commercial owner: `/services/directtrack-marketing`
- Editorial pillar: proposed `/resources/auto-repair-advertising`
- Support pages, only after the pillar: `/resources/local-service-ads-auto-repair` and `/resources/auto-repair-ppc-vs-seo`

## Files likely involved

- `src/lib/services.ts`
- `src/lib/service-details.ts`
- `src/lib/resource-posts.ts`
- `src/lib/site-media.ts`
- `src/pages/services/[slug].astro`
- `src/pages/resources/[slug].astro`

## Phase 0 — capability and SERP validation

1. Get an explicit answer from the program owner for each channel: directly managed, coordinated with an outside vendor, advised only, or not offered.
2. Inventory approved proof: campaigns, media types, targeting, call tracking, reporting screenshots, outcomes, and client quotes.
3. Review live SERPs for the top qualified terms, including `auto repair advertising`, `auto repair shop advertising`, and `advertising for auto repair shops`. Record dominant page type, local/paid features, questions, and competitor claims.
4. Baseline current Search Console queries and landing pages. Do not publish until one URL is assigned to each intent family.

Exit gate: a written claim matrix approved by the program owner.

## Phase 1 — strengthen the commercial owner

Update the DirectTrack service data only for capabilities the claim matrix supports.

- Clarify which channels DirectTrack includes and which are coordination/advisory.
- Add plain-language sections for audience targeting, offer, creative, landing experience, call handling, attribution, reporting, and optimization.
- Explain who the service is and is not for.
- Add visible FAQs that match any FAQ schema.
- Link contextually to Digital Marketing for local SEO and to Results for documented proof.
- Preserve one commercial H1 and the existing tracked consultation CTA.

Do not retitle DirectTrack as PPC management unless PPC management is directly delivered.

## Phase 2 — publish the editorial pillar

Add a `resourcePosts` entry with this working specification:

- URL: `/resources/auto-repair-advertising`
- SEO title: `Auto Repair Advertising: Channels, Costs & Strategy`
- Description: `Compare advertising channels for auto repair shops, understand cost drivers, choose an offer, and track calls, booked work, and repeat visits.`
- Primary intent: informational/commercial investigation
- CTA: `Book an advertising strategy consultation`

Required sections:

1. Diagnose the shop constraint before selecting a channel.
2. Comparison table: direct mail, paid search, LSA, paid social, streaming/display, email/CRM, and organic/local SEO.
3. Cost drivers without fabricated price ranges.
4. Offer, audience, landing page, call handling, and follow-up.
5. Measurement from impression through booked work and repeat visit.
6. Decision tree by capacity, timeframe, geography, and customer type.
7. Visible FAQs based on verified SERP questions.

Link to DirectTrack, Digital Marketing, Boost Days, Direct Mail, the marketing plan resource, and relevant result pages.

## Phase 3 — support content

- Create the LSA guide only if the capability matrix supports useful first-hand guidance. Cover eligibility, lead disputes, booking discipline, economics, and when LSA does not fit.
- Create PPC-vs-SEO as a neutral decision page. It must link to one paid owner and one organic owner and must not declare a universal winner.
- Consolidate `advertising ideas` variants into the advertising pillar or the existing marketing-ideas page; do not create synonym pages.

## Phase 4 — measurement and iteration

Track nonbrand impressions, top-20 terms, consultation assists, CTA clicks, qualified paid-media leads, and overlap with DirectTrack/Digital pages. Review cost/platform facts quarterly.

## Acceptance criteria

- Claims match the approved delivery matrix.
- The commercial and editorial pages target different primary intent.
- Every new resource has Article and breadcrumb schema through the existing renderer.
- Titles/descriptions are unique and within repository limits.
- CTA tracking uses `consultation_cta_click` and a page-specific placement.
- `pnpm build`, `pnpm lint`, and `pnpm seo:check` pass.
