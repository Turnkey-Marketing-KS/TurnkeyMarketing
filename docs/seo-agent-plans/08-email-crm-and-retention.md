# Agent brief: email, CRM, service reminders, and retention

## Opportunity

The export shows approximately 30 clearly qualified monthly searches after generic `service emails` noise is removed. Search volume is modest, but CPC and service alignment are strong. The strategic goal is to make Turnkey’s retention differentiation legible and useful.

## Page ownership

- Commercial owner: `/services/retention-marketing`
- Support resource: proposed `/resources/auto-repair-service-reminder-templates`
- Support resource: proposed `/resources/auto-repair-winback-campaign`

## Files likely involved

- `src/lib/services.ts`
- `src/lib/service-details.ts`
- `src/lib/resource-posts.ts`
- `src/lib/site-media.ts`
- `src/pages/services/[slug].astro`
- `src/pages/resources/[slug].astro`

## Phase 0 — workflow inventory

Document what Turnkey directly provides for newsletters, thank-you notes, CRM audits, service reminders, win-back, list segmentation, copy, sends, reporting, and integrations. Confirm consent/compliance responsibilities and what client systems are required. Inventory approved example messages and repeat-visit proof.

Exit gate: a lifecycle diagram and claim matrix approved by the service owner.

## Phase 1 — refresh the Retention Marketing page

- Working SEO title: `Auto Repair Email & Customer Retention Marketing`
- Working description: `Bring customers back with auto repair email newsletters, service reminders, thank-you campaigns, CRM follow-up, and win-back planning.`
- Keep one H1 focused on repeat visits and protecting acquisition cost.
- Add visible lifecycle stages: first visit, thank-you, education, service reminder, newsletter, lapsed customer, win-back.
- Define deliverables, cadence, inputs, approval process, reporting, and fit.
- Include a limitations section: email cannot fix bad data, consent, service, or phone handling.
- Link to Direct Mail, Social Media, Boost Days, and relevant Results only where the lifecycle connection is explained.

## Phase 2 — service-reminder resource

Working specification:

- URL: `/resources/auto-repair-service-reminder-templates`
- SEO title: `Auto Repair Service Reminder Templates & Timing`
- Description: `Plan useful auto repair service reminders with clear timing, customer context, consent, calls to action, and follow-up.`

Provide frameworks and short original examples, not copied vendor templates. Explain segmentation, personalization, timing, CTA, frequency, and measurement. Include visible compliance caveats without pretending to provide legal advice.

## Phase 3 — win-back resource

Working specification:

- URL: `/resources/auto-repair-winback-campaign`
- SEO title: `How to Build an Auto Repair Win-Back Campaign`
- Description: `Segment lapsed customers, choose a useful message and offer, coordinate email and direct mail, and measure return visits.`

Cover eligibility, list hygiene, segment logic, message, offer guardrails, channels, phone handling, attribution, and second-visit follow-up.

## Measurement

Track resource-to-service clicks, retention consultation leads, email engagement only as a diagnostic, recovered customers, repeat visits, unsubscribes, and revenue/repair orders where the client’s system supports reliable attribution.

## Acceptance criteria

- Every claim maps to an approved workflow.
- Templates are original, practical, and clearly illustrative.
- Consent/privacy caveats are visible and accurate.
- Service and resources have distinct commercial/informational intent.
- Tracking, schema, sitemap, images, H1, metadata, and responsive QA pass.
- `pnpm build`, `pnpm lint`, and `pnpm seo:check` pass.
