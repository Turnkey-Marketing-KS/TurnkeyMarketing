# Agent brief: auto-repair website design, audits, and conversion

## Opportunity and decision gate

The cluster represents approximately 520 qualified monthly searches, led by `auto repair website design` and `auto shop website design`. The current offer documents website audits and vendor coordination—not a standalone website-design service.

Do not create a commercial design-service page until leadership explicitly approves the service, fulfillment model, pricing path, and proof. The default implementation is an audit-led educational resource that feeds Digital Marketing.

## Primary page ownership

- Default editorial owner: proposed `/resources/auto-repair-website-design`
- Commercial bridge: `/services/digital-marketing`
- Existing supporting page: `/photos`
- Optional support: `/resources/auto-repair-website-checklist`

## Files likely involved

- `src/lib/resource-posts.ts`
- `src/lib/site-media.ts`
- `src/pages/resources/[slug].astro`
- `src/pages/photos.astro`
- `src/lib/service-details.ts` for a limited Digital Marketing cross-link

## Phase 0 — offer and SERP validation

1. Get a written choice: design/build, audit only, vendor coordination, or partner referral.
2. Inventory real website examples, audit artifacts, conversion improvements, screenshots, and approved outcomes.
3. Review live results for the two head terms and classify service pages, galleries, templates, and guides.
4. Baseline Search Console queries for `/photos`, Digital Marketing, and any website-related resource.

Exit gate: approved offer wording and permission to use every example.

## Phase 1 — publish the audit-led pillar

Working specification:

- URL: `/resources/auto-repair-website-design`
- SEO title: `Auto Repair Website Design & Conversion Guide`
- Description: `Learn what an auto repair website needs to earn trust, explain services, work on mobile, convert calls, and support local search.`
- CTA: `Request a website and marketing audit`

Required sections:

1. What a shop owner should expect the website to accomplish.
2. Mobile navigation, tap-to-call, appointment paths, speed, accessibility, and readable service content.
3. Trust: real team/shop photography, reviews, credentials, warranties, process, and transparent contact details.
4. Local SEO: service pages, location information, internal links, schema, and avoiding duplicate city pages.
5. Conversion: one primary action, phone handling, form friction, analytics, and attribution.
6. Vendor-evaluation scorecard and ownership checklist for domain, analytics, GBP, CMS, and content.
7. Annotated examples using only approved Turnkey/client assets.

Use Article and Breadcrumb schema. Do not use Service schema unless design becomes a delivered service.

## Phase 2 — checklist and supporting updates

- Create `/resources/auto-repair-website-checklist` only if it offers a genuinely useful downloadable/interactive checklist; otherwise make it a section of the pillar.
- Add contextual links from `/photos` to the pillar using language about website trust and image planning.
- Add one link from Digital Marketing explaining website audits and vendor coordination.
- Do not create separate pages for `best`, `examples`, `templates`, and `homepage examples` unless Search Console proves distinct intent.

## Phase 3 — proof

Add before/after annotations, not unsupported conversion percentages. For every example, state what changed, why it mattered, and what evidence exists. Obtain client approval for screenshots, names, and results.

## Phase 4 — measurement

Track resource entrances, clicks to Digital Marketing, audit CTA clicks, qualified website inquiries, scroll/engagement on the checklist, and query overlap with `/photos` or Digital Marketing.

## Acceptance criteria

- Page positioning exactly matches the approved fulfillment model.
- The resource does not masquerade as a design-service landing page.
- It has one H1, unique metadata/canonical, Article/Breadcrumb schema, intentional images, and tracked CTA.
- Links to Digital Marketing and `/photos` are descriptive and reciprocal where useful.
- Mobile layouts demonstrate the standards the article recommends.
- `pnpm build`, `pnpm lint`, and `pnpm seo:check` pass.
