# Agent brief: auto-repair industry resources, events, and appearances

## Opportunity and constraint

The cluster represents approximately 210 qualified monthly searches, led by broad conference terms. It is top-of-funnel and maintenance-heavy. Publish only if Turnkey can add first-hand value and assign a freshness owner.

## Proposed ownership

- Conditional annual hub: `/resources/auto-repair-marketing-events`
- Event recaps or podcast pages: publish only for Turnkey’s real participation/appearance
- Existing evidence source: team/industry-event media in `src/lib/site-media.ts`

## Phase 0 — maintenance and participation gate

1. Inventory conferences, associations, podcasts, presentations, workshops, dates, locations, and Turnkey participation.
2. Identify primary event sources and update frequency.
3. Assign a named owner responsible for quarterly date/link checks and an annual rebuild.
4. Define the conversion path: event meeting, newsletter, consultation, or related educational resource.

Exit gate: real participation or a unique curation method plus a maintenance owner. Without both, do not build the hub.

## Phase 1 — annual hub

Working specification:

- URL: `/resources/auto-repair-marketing-events`
- SEO title: `Auto Repair Marketing Events & Conferences`
- Description: `Find selected auto repair events and conferences relevant to shop marketing, leadership, customer experience, and business growth.`

For every event include official name, organizer, official URL, date, location, intended audience, why it is relevant, Turnkey participation if any, and last-checked date. Do not scrape or copy event descriptions. Use primary-source links.

## Phase 2 — first-hand recaps

Publish a recap only when Turnkey attended, presented, sponsored, or interviewed. Include original takeaways, named participants with approval, photos with alt/dimensions, and links to useful related resources. Do not publish generic summaries of events Turnkey did not attend.

## Phase 3 — partnerships

Coordinate with organizers/speakers for factual links and distribution. Avoid reciprocal-link schemes. Reuse existing Vision Expo imagery only when it accurately represents the event and rights are clear.

## Phase 4 — freshness review

At least quarterly, verify dates and official URLs. After an event, move it to a past-event section or remove it from the current list while preserving valuable recap URLs. Update the visible reviewed date and Article `dateModified`.

## Measurement

Track referral links, newsletter/consultation actions, event-assisted conversations, backlinks, organic entrances, and maintenance hours. Retire the hub if maintenance exceeds demonstrated value.

## Acceptance criteria

- Every listing has a primary official source and checked date.
- Page adds original selection context or first-hand participation.
- No copied event copy, stale year in the title, or fake participation.
- Metadata, Article/Breadcrumb schema, visible dates, sitemap, images, links, tracking, and responsive QA pass.
- `pnpm build`, `pnpm lint`, and `pnpm seo:check` pass.
