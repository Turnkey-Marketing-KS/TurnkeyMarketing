# Agent brief: competitor comparisons and alternatives

## Opportunity and risk

The cluster represents approximately 370 qualified monthly searches, but much of it is navigational. Named comparison pages create legal, reputational, freshness, and support-intent risk. Start with a neutral buyer guide. A named page requires separate approval.

## Page ownership

- Category buyer guide: proposed `/resources/compare-auto-repair-marketing-companies`
- Named pilot, conditional: `/resources/autoshop-solutions-alternative`
- Review-evaluation content should normally remain a section of the buyer guide.

## Phase 0 — comparison policy

Create `docs/seo/competitor-comparison-policy.md` containing:

- permitted comparison criteria;
- primary-source requirements;
- publication and review dates;
- trademark and naming treatment;
- factual-review and correction process;
- claims that require legal/leadership approval;
- rule against anonymous or fabricated reviews;
- rule against copying competitor language, screenshots, or pricing without permission/source rights.

Review live SERPs and Search Console. Distinguish users comparing providers from users seeking competitor login/support/reviews.

Exit gate: policy approved by leadership. Without approval, build only the neutral buyer guide.

## Phase 1 — neutral buyer guide

Working specification:

- URL: `/resources/compare-auto-repair-marketing-companies`
- SEO title: `How to Compare Auto Repair Marketing Companies`
- Description: `Compare auto repair marketing companies by strategy ownership, execution, reporting, proof, communication, access, and service fit.`

Required criteria: ideal client; service ownership; execution vs coordination; communication cadence; reporting/attribution; account access; creative/content ownership; proof quality; contract/exit questions; red flags; scorecard. Include Turnkey’s fit/not-fit transparently.

## Phase 2 — named pilot decision

Only build a named alternative page if:

- the query shows comparison intent rather than support/navigation;
- every factual statement has a current primary source URL and checked date;
- Turnkey has meaningful, truthful differentiation;
- leadership approves the page;
- an owner accepts quarterly review responsibility.

The page must compare fit and operating model, not declare an absolute winner. Provide a correction contact. Avoid review schema unless the page contains eligible first-party review content and policy approves it.

## Phase 3 — authority and maintenance

Add source notes, visible update date, named reviewer, and a change log for material competitor changes. Recheck quarterly and immediately after a correction request.

## Measurement

Track qualified consultation rate, competitor-support misroutes, back-to-SERP behavior, branded query effects, corrections, and conversions assisted by the neutral guide versus named page.

## Acceptance criteria

- The policy exists and is approved before named content.
- Sources are current, primary, and attached to the claims they support.
- The buyer guide is useful without naming competitors.
- No unsupported superiority, pricing, review, or feature claim appears.
- Metadata, Article/Breadcrumb schema, H1, dates, sitemap, links, and tracking pass.
- `pnpm build`, `pnpm lint`, and `pnpm seo:check` pass.
