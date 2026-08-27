# Agent brief: core agency, outsourced department, and consulting intent

## Opportunity

The clean qualified cluster is small—approximately 40 monthly searches—but it is close to revenue. Broad terms such as `marketing pro` and `professional marketers` were excluded because they are ambiguous. Do not optimize for their apparent volume.

## Page ownership

- Agency / outsourced marketing department: `/services/vip-marketing-manager`
- Advisor / consultant: `/services/marketing-consulting`
- Buyer education: proposed `/resources/choose-auto-repair-marketing-agency`

## Files likely involved

- `src/lib/services.ts`
- `src/lib/service-details.ts`
- `src/pages/services/[slug].astro`
- `src/lib/resource-posts.ts`
- `src/pages/services/index.astro`
- `src/pages/index.astro` only for a carefully scoped anchor/copy adjustment

## Phase 0 — intent and offer map

1. Document the difference between VIP and Consulting: buyer situation, scope, cadence, deliverables, decision rights, price path, and success criteria.
2. Baseline queries and conversion paths for both service pages.
3. Identify copy that makes both pages sound like the same offer.
4. Inventory approved team credentials, operating process, proof, and results.

Exit gate: a comparison table approved by leadership and sales.

## Phase 1 — VIP page

Position VIP as the commercial owner for an outsourced auto-repair marketing department/agency.

- Working SEO title: `Auto Repair Marketing Agency & Outsourced Department`
- Explain the team composition, ownership model, weekly execution, reporting, and vendor coordination.
- Add fit/not-fit criteria and the operational problem VIP replaces.
- Use approved proof and link to specific Results entries.
- Preserve one primary consultation CTA and existing event conventions.

Do not replace the recognizable VIP product name; pair it with descriptive language.

## Phase 2 — Consulting page

Position Consulting as focused advisory direction rather than done-for-you execution.

- Keep the current consultant-focused title unless Search Console supports a better variant.
- Explain inputs, meeting cadence, outputs, responsibilities, and what implementation is not included.
- Link to the auto-repair marketing plan resource and the buyer guide.
- Add a comparison section that sends done-for-you prospects to VIP.

## Phase 3 — buyer guide

Working specification:

- URL: `/resources/choose-auto-repair-marketing-agency`
- SEO title: `How to Choose an Auto Repair Marketing Agency`
- Description: `Compare auto repair marketing agencies by strategy ownership, execution, reporting, proof, communication, service scope, and fit.`

Required sections: agency vs consultant vs vendors vs in-house; questions to ask; proof evaluation; reporting; access/ownership; red flags; decision scorecard; when Turnkey is and is not a fit. Keep it educational and link to both services.

## Measurement

Track landing-page consultation rate, qualified lead type, cross-clicks between VIP and Consulting, buyer-guide assists, and query overlap. Sales must label whether a lead wanted execution or advice.

## Acceptance criteria

- VIP and Consulting can be distinguished from their hero and first two sections alone.
- Titles, H1s, schema, and anchors reinforce distinct intent.
- No invented price, scope, result, or credential.
- The buyer guide evaluates options fairly and does not disguise a sales page.
- `pnpm build`, `pnpm lint`, and `pnpm seo:check` pass.
