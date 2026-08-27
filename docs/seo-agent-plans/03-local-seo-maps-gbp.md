# Agent brief: local SEO, Google Maps, and Google Business Profile

## Opportunity

This is the cleanest service-aligned cluster: approximately 1,420 qualified monthly searches, low weighted difficulty, and frequent local-pack, review, PAA, video, and AI Overview features.

## Primary page ownership

- Commercial owner: `/services/digital-marketing`
- Support guide 1: proposed `/resources/auto-repair-google-maps-ranking`
- Support guide 2: proposed `/resources/auto-repair-keywords`

The service page owns `auto repair SEO`, `auto shop SEO`, and local-visibility service intent. The Maps guide owns how-to ranking intent. The keyword guide owns research/target-list intent.

## Files likely involved

- `src/lib/services.ts`
- `src/lib/service-details.ts`
- `src/lib/resource-posts.ts`
- `src/lib/site-media.ts`
- `src/pages/services/[slug].astro`
- `src/pages/resources/[slug].astro`
- `src/layouts/BaseLayout.astro` only if approved schema helper work is already merged

## Phase 0 — baseline and ownership

1. Export current Search Console queries for the Digital Marketing page and any resource receiving SEO/Maps/GBP impressions.
2. Record title, description, H1, headings, canonical, schema, internal links, and current ranking queries.
3. Sample live results for `auto repair seo`, `seo for auto shops`, `rank auto repair shop on google maps`, and `auto repair keywords`.
4. Document which local SEO work Turnkey performs directly: GBP, reviews, website audit, citations, on-page work, vendor coordination, reporting, and ongoing optimization.

Exit gate: one approved query-to-URL map and one service-scope matrix.

## Phase 1 — refresh `/services/digital-marketing`

- Proposed SEO title: `Auto Repair SEO & Local Digital Marketing | Turnkey`
- Proposed description: `Improve local visibility with auto repair SEO, Google Business Profile optimization, review management, website audits, and vendor coordination.`
- Keep one H1 focused on nearby customers finding and trusting the shop.
- Add sections for Maps/GBP, reviews, website/on-page audit, vendor coordination, process, reporting, limitations, and fit.
- Add specific deliverables rather than ranking guarantees.
- Add visible FAQs for timing, multi-location support, ownership/access, reviews, and how SEO differs from ads.
- Link to Results, relevant client proof, the website-design guide, and the two support guides.

Use Service, FAQ, and Breadcrumb schema only when the visible page supports each item.

## Phase 2 — Maps guide

Working specification:

- URL: `/resources/auto-repair-google-maps-ranking`
- SEO title: `How Auto Repair Shops Rank on Google Maps`
- Description: `Learn how relevance, distance, prominence, reviews, services, website signals, and profile accuracy affect an auto shop’s Google Maps visibility.`

Required sections: realistic ranking model; profile categories/services; location and service-area rules; reviews; website/local landing signals; citations; photos/posts; spam avoidance; tracking; 30/60/90-day checklist. Do not promise position one and do not recommend fake locations or reviews.

## Phase 3 — keyword guide

Working specification:

- URL: `/resources/auto-repair-keywords`
- SEO title: `Auto Repair Keywords by Service and Search Intent`
- Description: `Map auto repair keywords to service pages, local intent, educational content, and measurement without creating duplicate or doorway pages.`

Organize keyword examples by service, problem, location, informational question, and commercial intent. Explain page mapping and cannibalization. Do not publish an uncurated list of 500 near-duplicates.

## Internal links

- Digital Marketing ↔ Maps guide ↔ keyword guide.
- Homepage and Services index link to Digital Marketing, not directly to every guide.
- Website-design, reputation, AI/AEO, multi-location, and niche-vertical pages link to the relevant local SEO owner with descriptive anchors.
- Related resources link laterally only when contextually useful.

## Measurement

Track nonbrand queries, local-intent impressions, top-20/top-10 counts, service-page CTA clicks, resource-to-service clicks, qualified SEO consultations, and multiple URLs ranking for the same head term.

## Acceptance criteria

- One commercial canonical owns auto-repair SEO service intent.
- No claim implies guaranteed Maps rankings.
- All guide examples stay auto-repair specific.
- Metadata, schema, sitemap, H1, images, links, responsiveness, and tracking pass repository checks.
- `pnpm build`, `pnpm lint`, and `pnpm seo:check` pass.
