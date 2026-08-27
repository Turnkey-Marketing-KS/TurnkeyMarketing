# Agent brief: seasonal campaigns, promotions, calendars, and Boost Days

## Opportunity

The cluster represents approximately 100 qualified monthly searches. Build one evergreen planning hub rather than thin pages for every month, holiday, coupon, or special.

## Page ownership

- Evergreen hub: proposed `/resources/auto-repair-marketing-calendar`
- Promotion guide: proposed `/resources/auto-repair-promotion-ideas`, only if distinct
- Commercial owner for urgent slow periods: `/services/boost-days`
- Lifecycle support: Retention Marketing and Social Media Marketing

## Phase 0 — seasonal model

Map campaigns to climate, service patterns, capacity, technician availability, geography, lead time, margin, repeat-visit strategy, and channel. Inventory approved campaign examples and determine whether dates/results can be disclosed.

Exit gate: an annual matrix that avoids unsafe, deceptive, or margin-destroying promotions.

## Phase 1 — evergreen calendar

Working specification:

- URL: `/resources/auto-repair-marketing-calendar`
- SEO title: `Auto Repair Marketing Calendar & Campaign Plan`
- Description: `Plan auto repair campaigns around capacity, seasonality, service demand, lead times, customer segments, offers, and follow-up.`

Required sections: annual planning method; quarterly themes; lead-time checklist; capacity and offer guardrails; channel bundles; follow-up; measurement; reusable worksheet. Use examples as scenarios, not universal seasonal truths.

## Phase 2 — promotion content decision

Create a separate promotion guide only if it provides unique offer design and margin guidance. Otherwise add a promotion section to the calendar. Do not create standalone March, June, Christmas, coupon, or gift pages unless first-party data proves sustained value.

## Phase 3 — Boost Days bridge

Refresh `/services/boost-days` so it clearly owns urgent capacity-demand campaigns. Link from the calendar when the need is a slow spot/open bays. Link to Retention and Social resources for planned recurring communication.

## Phase 4 — annual maintenance

Review the hub at least 90 days before the next calendar year. Update dates, remove expired examples, and preserve the URL. Track seasonal entrances, resource-to-service clicks, Boost Day inquiries, lead quality, and margin/repair-order outcomes where reliable.

## Acceptance criteria

- One evergreen URL owns the calendar cluster.
- Recommendations account for shop capacity and margin, not discounts alone.
- No thin month/holiday pages are created.
- Examples and performance claims are approved and dated.
- Metadata, Article/Breadcrumb schema, H1, sitemap, links, download accessibility, tracking, and responsive QA pass.
- `pnpm build`, `pnpm lint`, and `pnpm seo:check` pass.
