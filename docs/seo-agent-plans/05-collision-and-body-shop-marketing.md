# Agent brief: collision and auto-body shop marketing

## Opportunity and decision gate

The cluster represents approximately 720 qualified monthly searches with low difficulty and strong CPC. It is an adjacent vertical, not automatically part of Turnkey’s current independent mechanical-repair positioning.

Do not publish until leadership confirms collision shops are an intentional ICP and supplies collision-specific service fit and proof.

## Proposed ownership

- Vertical pillar: `/industries/collision-repair-marketing`
- Support guide: `/resources/collision-repair-seo`
- Optional support guide: `/resources/body-shop-advertising-ideas`

This agent may build the first reusable industry-page data model only after the shared-foundation agent approves the architecture. The niche and multi-location agents depend on that template and must not create competing implementations.

## Files likely involved

- Proposed `src/lib/industry-pages.ts`
- Proposed `src/pages/industries/[slug].astro`
- Proposed `src/pages/industries/index.astro` only if two or more approved verticals exist
- `src/pages/sitemap.xml.ts`
- `src/lib/resource-posts.ts`
- `src/lib/site-media.ts`
- Existing service and result data for contextual links

## Phase 0 — ICP and evidence validation

1. Confirm target business type: independent collision center, MSO, dealer body shop, or another segment.
2. Document services Turnkey can deliver without alteration and those needing collision-specific operations.
3. Inventory approved collision clients, testimonials, creative, results, sales-call language, and association knowledge.
4. Interview at least one knowledgeable internal subject-matter owner. Document differences from mechanical repair: insurer/referral dynamics, estimate cycle, OEM certifications, photo/estimate experience, reputation, geography, and capacity.
5. Review live SERPs for the head terms and record dominant claims and page types.

Exit gate: ICP, service scope, page owner, and proof inventory approved. If any is missing, stop with a research memo.

## Phase 1 — vertical pillar

Working specification:

- URL: `/industries/collision-repair-marketing`
- SEO title: `Collision Repair & Auto Body Shop Marketing`
- Description: `Build a collision-shop marketing plan around local visibility, reputation, referral mix, customer communication, and measurable demand.`
- CTA: `Discuss a collision-shop growth plan`

Required sections:

1. Collision owner’s desired outcome and operational constraints.
2. Ideal repair/customer/referral mix.
3. Local SEO, reviews, website/estimate path, paid media, retention, and community relationships.
4. Process and deliverables that Turnkey actually offers.
5. Collision-specific proof; otherwise label examples as methodology, not results.
6. Fit/not-fit section and visible FAQs.

Use one H1, Service or WebPage schema as appropriate, Breadcrumb schema, and an indexable sitemap entry only after approval.

## Phase 2 — support resources

- `/resources/collision-repair-seo` covers Maps, reviews, certifications, service-area relevance, site structure, and measurement.
- `/resources/body-shop-advertising-ideas` organizes campaigns by capacity, geography, customer/referral source, and stage—not a generic list of promotions.
- Link every support page to the vertical pillar and the specific owning services. The pillar links back contextually.

## Phase 3 — authority

Obtain collision-specific review by a named expert, client approval, original examples, and credible association/industry citations. Do not copy competitor positioning or make insurer/OEM claims without sources.

## Phase 4 — go/no-go review

After 90 days, review qualified collision consultations, account fit, engagement, rankings, and sales feedback. Expand only if lead quality supports the vertical. Otherwise keep the pillar, consolidate support content, or noindex/remove according to evidence.

## Acceptance criteria

- At least 40% of pillar content is genuinely collision-specific.
- No mechanical-repair copy is merely keyword-swapped.
- Industry registry/template is typed, reusable, and owned centrally.
- Page metadata, schema, H1, sitemap, internal links, images, tracking, and responsive layout pass.
- `pnpm build`, `pnpm lint`, and `pnpm seo:check` pass.
