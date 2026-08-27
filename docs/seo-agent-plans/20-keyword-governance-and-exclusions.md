# Agent brief: keyword governance, exclusions, and cannibalization control

## Mission

The raw export contained 17,320 monthly searches. Only 10,440 were qualified for the roadmap; 6,880 came from ambiguous, unrelated, navigational, consumer, job-seeking, malformed, or generic terms. Preserve the data, but prevent it from directing public-page work.

Examples include broad `marketing pro` terms, `failing forward`, shopper-marketing jobs, unrelated people/brands, consumer coupons, malformed numbered variants, and generic service phrases without auto-repair context.

## Deliverables

### 1. Keyword decision log

Create `docs/seo/keyword-decision-log.md` with:

- normalized keyword;
- cluster;
- include, monitor, or exclude;
- reason;
- intended URL if included;
- reviewer and review date;
- evidence/source.

Seed the log with all high-volume/high-CPC excluded terms and any keyword agents dispute. Do not paste all 551 rows into a public page.

### 2. Exclusion taxonomy

Use explicit reasons:

- unrelated industry;
- job/career intent;
- consumer/shopper intent;
- competitor support/navigation;
- unrelated person or brand;
- generic marketing term without auto-repair fit;
- malformed/numbered duplicate;
- service not offered;
- duplicate intent owned by another URL;
- zero-volume incubator requiring validation.

An excluded keyword is not deleted. It remains available for quarterly review.

### 3. Cannibalization register

Add a section to `docs/seo/page-ownership.md` or create `docs/seo/cannibalization-register.md`. Record:

- query family;
- primary owner URL;
- secondary/support URLs;
- prohibited new URL variants;
- current overlap evidence;
- remediation decision and date.

Seed it with these pairs:

- marketing ideas vs marketing plan;
- Direct Mail service vs guide;
- Digital Marketing vs Maps/keywords guides;
- VIP vs Consulting;
- Social Media service vs content/calendar guides;
- industry pillar vs specialty SEO support pages.

### 4. Agent review gate

Before any agent adds a public URL, require a short entry containing:

- primary query family and intent;
- why an existing URL cannot own it;
- owning service;
- proposed canonical;
- links in and out;
- sitemap/indexability decision;
- proof and maintenance owner.

Reject pages created only for singular/plural, word-order, city-without-location, or synonymous keyword variations.

## Quarterly process

1. Import new competitor/export and Search Console data without overwriting prior snapshots.
2. Normalize numbered prefixes and obvious formatting differences.
3. Review top-volume/top-CPC exclusions manually.
4. Compare query-to-page mapping in Search Console.
5. Promote, demote, merge, or keep terms with a dated reason.
6. Update focus briefs when evidence changes; do not silently change page ownership.

## Acceptance criteria

- Every approved new page has one documented primary intent and owner.
- Exclusion reasons are reviewable, not a hidden formula.
- High-volume excluded terms receive manual review.
- No public-facing page is created for an excluded term without a documented override.
- Cannibalization pairs have a remediation owner.
- Governance documents contain no customer PII or proprietary third-party data.
