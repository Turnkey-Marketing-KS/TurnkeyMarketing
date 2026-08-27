# Agent brief: marketing budget, measurement, and ROI tools

## Opportunity

The cluster represents approximately 280 qualified monthly searches. A useful calculator can earn links and consultations, but false precision would damage trust. Build the method before the interface.

## Page ownership

- Interactive pillar: proposed `/resources/auto-repair-marketing-budget-calculator`
- Supporting guide: proposed `/resources/auto-repair-marketing-budget`
- Measurement guide: proposed `/resources/auto-repair-marketing-metrics`

## Architecture decision

Prefer a new resource layout mode rather than a conflicting standalone route:

- Extend the `ResourcePost.layout` union with `calculator`.
- Add `src/components/resources/MarketingBudgetCalculator.astro`.
- Render it conditionally in `src/pages/resources/[slug].astro`.
- Keep metadata, Article/Breadcrumb schema, related links, and sitemap behavior in the existing resource system.

Coordinate this shared-file change with the integration owner.

## Phase 0 — model specification

Before coding, produce a reviewed method note containing:

- editable inputs and units;
- formulas;
- defaults and their evidence;
- minimum/maximum validation;
- what the output means and does not mean;
- whether any value is stored or sent;
- analytics events;
- disclaimer language.

Candidate inputs: monthly revenue, repair orders, average repair order, gross-profit target, current marketing spend, new-customer count, capacity, and repeat-visit assumptions. Do not include an input unless the output uses it transparently.

Exit gate: formulas manually verified with at least five test cases, including zero, missing, and extreme values.

## Phase 1 — build the calculator

Working metadata:

- SEO title: `Auto Repair Marketing Budget Calculator`
- Description: `Estimate and compare an auto repair shop marketing budget using editable assumptions for revenue, repair orders, acquisition, and capacity.`

Requirements:

- Server-rendered explanatory content remains useful without JavaScript.
- Inputs have labels, help text, units, keyboard access, validation, and accessible error messages.
- Calculations run locally; do not collect user-entered financial data unless separately approved.
- Results show formulas/assumptions and scenario ranges, not a guaranteed budget or ROI.
- Add `calculator_start`, `calculator_complete`, and consultation click tracking only through `window.tkTrack`; never send raw financial inputs.
- Provide a print/copy summary if it can be implemented accessibly.

## Phase 2 — supporting guides

The budget guide explains allocation by objective, capacity, acquisition vs retention, fixed/variable costs, testing reserve, and review cadence. The metrics guide defines lead, qualified call, booked appointment, repair order, new customer, CAC, ARO, gross profit, repeat visit, and attribution limits.

Each guide links to the calculator and relevant services. The calculator links to Marketing Consulting and Results.

## Phase 3 — verification and distribution

- Add unit tests for pure calculation functions.
- Test keyboard-only and screen-reader-friendly form behavior.
- Confirm no sensitive values enter analytics or URLs.
- Prepare a concise methodology section suitable for citations and partner sharing.

## Measurement

Track entrances, starts, completions, result interactions, consultation assists, quality links, and qualified strategy leads. Review default assumptions semiannually.

## Acceptance criteria

- Calculation logic is isolated, typed, unit-tested, and documented.
- Five manual test cases match expected outputs.
- No PII or financial inputs are transmitted.
- The page works and explains itself without relying on an opaque result.
- Metadata, schema, sitemap, H1, responsive layout, reduced motion, focus states, and tracking pass.
- `pnpm build`, `pnpm lint`, `pnpm seo:check`, and relevant tests pass.
