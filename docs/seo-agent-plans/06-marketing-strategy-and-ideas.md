# Agent brief: auto-repair marketing strategy, ideas, and planning

## Opportunity

This cluster represents approximately 2,220 qualified monthly searches. The site already has two strong owners:

- `/resources/auto-repair-marketing-ideas`
- `/resources/auto-repair-marketing-plan`

The task is consolidation and intent separation—not publishing another generic marketing pillar.

## Ownership model

- `marketing ideas`, `advertising ideas`, and problem-led channel selection → marketing-ideas resource
- `marketing plan`, `marketing strategy`, budgeting sequence, execution cadence, and measurement plan → marketing-plan resource
- marketing mistakes → existing mistakes resource
- commercial advice/engagement → `/services/marketing-consulting`

## Files likely involved

- `src/lib/resource-posts.ts`
- `src/components/resources/MarketingIdeasArticle.astro`
- `src/pages/resources/[slug].astro`
- `src/lib/service-details.ts`
- `src/pages/resources.astro`

Preserve the user’s current uncommitted changes in `MarketingIdeasArticle.astro` and `resource-posts.ts`. Inspect and integrate; do not overwrite.

## Phase 0 — content inventory and query map

1. Extract titles, H1/H2s, canonical URLs, internal links, related slugs, and Search Console queries for all planning/ideas/mistakes resources.
2. Build a section-level overlap table. Mark keep, move, merge, rewrite, or delete.
3. Review SERPs for `auto repair marketing ideas`, `auto repair marketing strategies`, and `auto repair marketing plan`.
4. Confirm the marketing-ideas custom renderer remains necessary and accessible.

Exit gate: one signed-off intent owner per query family.

## Phase 1 — refresh the ideas page

Keep the existing URL. Strengthen it as a decision guide organized by the shop problem:

- fill slow bays;
- attract better-fit customers;
- improve local visibility and trust;
- reactivate past customers;
- support capacity or seasonal demand;
- measure what worked.

Each idea must state when it fits, what it requires, what to measure, and which service can execute or support it. Add contextual links without turning the page into a service directory. Preserve exactly one H1 and existing Article/Breadcrumb schema.

## Phase 2 — refresh the plan page

Keep the existing URL and separate it from the ideas page. Required planning sequence:

1. business constraint and capacity;
2. ideal customer and work mix;
3. baseline and budget;
4. channel roles;
5. campaign calendar and owner;
6. conversion/phone/follow-up;
7. reporting and decision cadence.

Link to Marketing Consulting with `service_cta_click`, the service slug, and a resource-specific placement.

## Phase 3 — supporting asset decision

Evaluate a single `/resources/auto-repair-marketing-audit` checklist. Build it only if it adds an auditable diagnostic not already present in the plan or mistakes pages. Do not create separate `strategy`, `strategies`, `tools`, and `SWOT` pages merely to match variants.

## Phase 4 — cannibalization review

At 30/60/90 days, compare queries and landing pages. If both pages receive impressions for the same head term, sharpen titles, H1s, introductions, and internal anchors before considering a merge. Track resource-to-service clicks and consultation assists.

## Acceptance criteria

- The two existing resources have distinct intent and no duplicated section blocks.
- Related slugs and service links form a deliberate hub rather than a circular link dump.
- Metadata remains unique and within repository limits.
- Article content contains concrete examples and measurement guidance.
- The custom marketing-ideas UI works at mobile/desktop widths and with keyboard navigation.
- `pnpm build`, `pnpm lint`, and `pnpm seo:check` pass.
