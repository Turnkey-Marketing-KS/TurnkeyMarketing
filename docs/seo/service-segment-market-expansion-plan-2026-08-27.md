# Service, segment, and market expansion plan

**Plan date:** August 27, 2026
**Website:** `https://www.turnkeyautomarketing.com`
**Planning horizon:** 6 months
**Primary business-data source:** Read-only Airtable snapshot of 239 records marked `Active`, grouped on August 27, 2026
**Primary search-data source:** SE Ranking project `12503330`, connected Google Search Console data, and the August 13, 2026 SEO master plan
**Repository service source of truth:** `src/lib/services.ts` and `src/lib/service-details.ts`

## 1. Executive decision

Turnkey should expand the site around proven commercial demand and real client concentration, not by generating a large library of nearly interchangeable city pages.

The next six months should follow this order:

1. Make the three commercially validated offers—VIP, DirectTrack, and Marketing Consulting—the strongest service pages on the site.
2. Reinforce the homepage as the definitive page for independent general repair shops.
3. Add two materially distinct audience pages: European repair specialists and multi-location repair groups.
4. Build a permissioned proof system that supplies testimonials, results, and case studies to those pages.
5. Pilot one to three evidence-rich market pages, beginning with the strongest combination of client density, product adoption, and approved proof among Chicago–Northwest Indiana, Atlanta, and Houston.
6. Consider new standalone service pages such as Reputation Management, Local SEO, and Facebook Ads only after confirming that each can be purchased independently and documenting its exact scope.

This plan deliberately does **not** recommend 50 city pages. Google describes substantially similar regional or city pages that funnel visitors to the same destination as potential doorway abuse. A market page is publishable only when it provides meaningful local evidence and a visitor would still find it useful if search traffic did not exist.

## 2. What the business data establishes

### Active product adoption

Products are multi-select, so totals exceed 239.

| Product family | Active clients | Share of active records | Strategic implication |
| --- | ---: | ---: | --- |
| VIP | 169 | 70.7% | Flagship offer and highest-priority service page |
| DirectTrack | 144 | 60.3% | Flagship acquisition product and second service-page priority |
| Consulting | 44 | 18.4% | Proven advisory entry point and third service-page priority |
| Direct Mail | 14 | 5.9% | Real focused service; improve after the flagship three |
| Social Media | 10 | 4.2% | Real service, but not yet a first-wave expansion target |
| Retention | 5 | 2.1% | Real service with a small recorded standalone base |
| Custom | 4 | 1.7% | Requires manual classification before SEO use |
| Digital | 3 | 1.3% | May be under-recorded because capabilities are bundled into VIP |

The dominant product combinations are:

| Product combination | Active clients | Strategic implication |
| --- | ---: | --- |
| VIP + DirectTrack | 97 | The site needs a clear explanation of why the offers work together |
| VIP only | 67 | VIP must stand on its own as a complete outsourced leadership/execution offer |
| Consulting + DirectTrack | 18 | Consulting can guide the whole plan while DirectTrack supplies acquisition execution |
| DirectTrack only | 14 | DirectTrack needs a clear standalone qualification path |
| Consulting only | 13 | Consulting needs a clear scope boundary and outcome independent of managed execution |

### Shop configuration

| Configuration | Active shops | Share |
| --- | ---: | ---: |
| General Repair appears in selection | 196 | 82.0% |
| European appears in selection | 30 | 12.6% |
| Diesel appears in selection | 12 | 5.0% |
| Transmission appears in selection | 1 | 0.4% |
| Specialty not populated | 25 | 10.5% |

General repair is the core audience and should remain owned by the homepage. European repair has sufficient client depth and existing proof candidates to justify a dedicated audience page. Diesel is a promising later segment but needs additional scope and proof validation.

### Ownership structure

Because `Number of Locations` is blank for every active record, the current grouping is inferred from repeated owner email addresses or phone numbers.

| Detected structure | Count |
| --- | ---: |
| Likely multi-location ownership groups | 19 |
| Active shops within those groups | 48 |
| Share of active records associated with detected multi-location owners | 20.1% |

The current inference is strong enough to prioritize research, but not strong enough to support public numerical claims. Ownership groups must be verified manually before a multi-location page cites counts or names clients.

### Market concentration

| Metro/market | Active shops |
| --- | ---: |
| Chicago–Northwest Indiana | 16 |
| Atlanta | 11 |
| Houston | 9 |
| Minneapolis–St. Paul | 8 |
| Orlando | 8 |
| Inland Empire | 7 |
| Northern Colorado | 7 |
| Philadelphia | 7 |
| Raleigh–Durham | 7 |
| Los Angeles–Orange County | 6 |
| Dallas–Fort Worth | 5 |
| Greenville–Spartanburg | 5 |
| Wilmington, DE | 4 |

Coverage is incomplete: 211 records have usable addresses and 28 cannot be confidently assigned. Seventy-one records currently appear as single-shop markets. This supports a nationwide position with selective market depth; it does not support a claim that Turnkey has meaningful concentration in every large U.S. city.

### Proof and permission

| Evidence status | Shops |
| --- | ---: |
| Strong testimonial candidates | 41 |
| Any positive source quote | 72 |
| No positive source quote identified | 167 |
| Documented publication permission | 0 confirmed in Airtable |

The 41 strongest candidates contain 119 positive quotes categorized as `Deliverable Feedback` or `Turnkey Position`. These are sourcing candidates, not publishable testimonials. No quote, logo, client name, metric, or case study should be published without verified permission and evidence.

### Revenue limitations

Revenue is populated for 130 of 239 shops; 109 are missing. Among populated records, the median is $60,000 per month and the average is $202,019, with the average heavily skewed by large values.

Revenue data may guide internal prioritization, but it should not yet support public statements about Turnkey's typical client or outcomes. Before use, each record needs a reporting period, definition, source, and verification status.

## 3. Confirmed offer inventory and boundaries

The public site currently defines eight named offers.

### VIP Marketing Manager

Directly delivered:

- Marketing leadership and planning
- Account management
- Creative and copy
- Social coordination
- Execution and administrative support
- Reporting
- Vendor coordination

### DirectTrack Marketing

Directly delivered:

- Targeted email campaigns
- Streaming/CTV commercials
- Geofenced banner and display advertising
- Campaign tracking
- Monthly reporting and review

### Marketing Consulting

Directly delivered:

- Monthly strategy session
- Review of current marketing, spending, vendors, and reporting
- Keep, fix, stop, and start recommendations
- ROI-focused decision support

Execution stays with the shop and its vendors unless a managed Turnkey service is purchased.

### Direct Mail

Directly delivered:

- Postcard campaign management
- Design and copy
- List and offer strategy
- Campaign timing
- Budget and order verification
- Penetration and response review

### Social Media Marketing

Directly delivered:

- Organic Facebook posts
- Organic Instagram posts
- Google Business Profile posts
- Facebook ad creation and management
- Comment and review responses, including negative reviews

### Retention Marketing

Directly delivered:

- Monthly email newsletter
- Thank-you note creation
- CRM audit and cleanup
- Ongoing customer follow-up rhythm

### Digital Marketing

Directly delivered:

- Google review management
- Google Business Profile optimization
- Semiannual website audits
- Website vendor coordination
- Google Ads vendor coordination

Explicitly excluded under current copy:

- Website design and development
- Direct Google Ads management
- A standalone comprehensive technical SEO program
- Link building

### Boost Days

Directly offered on the website:

- Focused strategy around a schedule gap
- Email, text, and social campaign
- Ten call evaluations
- One supporting print, social, email, radio, or outdoor deliverable

Boost Days does not appear as a normalized active product in the August 27 Airtable snapshot. Before further SEO investment, determine whether it is new, bundled into VIP, recorded under Custom, inactive, or omitted from the normalization.

## 4. Page ownership model

Every important search intent needs one intended URL.

| Intent | Owner URL | Supporting pages | Must not compete |
| --- | --- | --- | --- |
| Auto repair marketing agency/company | `/` | Results, resources, audience pages | `/services`, general-repair audience duplicate |
| Auto repair marketing services | `/services` | Individual service pages | Homepage title/H1 |
| Outsourced marketing department/director | `/services/vip-marketing-manager` | Multi-location page, case studies | Results hub, Consulting |
| Targeted customer acquisition/DirectTrack | `/services/directtrack-marketing` | Channel explainers and case studies | Generic lead-generation duplicate |
| Marketing consultant/audit/advisory | `/services/marketing-consulting` | Plan guide and case studies | VIP, marketing-plan guide |
| General independent repair shops | `/` | Service and result pages | New generic `who-we-help` page |
| European repair shop marketing | `/who-we-help/european-auto-repair-shops` | European case studies | Homepage and generic agency pages |
| Multi-location repair shop marketing | `/who-we-help/multi-location-auto-repair-shops` | VIP, DirectTrack, location case studies | Generic VIP copy |
| A validated local market | `/markets/{market-slug}` | Relevant service, segment, and case-study pages | Other market pages and homepage |

Do not create a new page when an existing page already owns the intent and can satisfy it through stronger copy, proof, and internal links.

## 5. Priority service-page program

### Priority 1: VIP Marketing Manager

**Existing URL:** `/services/vip-marketing-manager`
**Page role:** Flagship outsourced marketing department offer
**Business evidence:** 169 active clients; 97 paired with DirectTrack; 67 VIP-only

#### Required positioning

The page should make four ideas unmistakable:

1. VIP is an outsourced marketing department, not a monthly consulting call.
2. One accountable team owns the plan, coordination, creative, execution, and reporting.
3. Existing competent vendors may remain; Turnkey coordinates them rather than replacing every specialist.
4. VIP is appropriate when the owner needs leadership and follow-through across multiple channels, not merely one campaign.

#### Required sections

- Owner problem: the shop owner is still acting as marketing director
- What VIP owns versus what the owner approves
- Team structure and named roles
- First 30, 60, 90, and 120 days
- Meeting and reporting cadence
- Deliverables and exclusions
- VIP + DirectTrack relationship
- VIP versus Consulting comparison
- Best-fit and poor-fit qualification
- Proof from a general repair client
- Proof from a multi-location or expansion-stage client
- FAQ covering vendors, time commitment, measurement, and onboarding
- Consultation CTA

#### Inputs required from Turnkey

- Confirmed role roster involved in a typical VIP account
- Exact recurring deliverables and cadence
- Typical onboarding sequence
- Client responsibilities and approval expectations
- Reporting examples with sensitive information removed
- Definition of what “all core services” means
- Minimum engagement or pricing language that may be public
- Two service-specific testimonials with permission
- One permissioned case study

#### Acceptance criteria

- Owns outsourced department/director terms
- Does not read like Consulting
- Explains the 97-client VIP + DirectTrack use case
- Contains at least one permissioned proof example
- Receives contextual links from the homepage, services hub, results, and multi-location page

### Priority 2: DirectTrack Marketing

**Existing URL:** `/services/directtrack-marketing`
**Page role:** Targeted customer-acquisition system
**Business evidence:** 144 active clients; 97 paired with VIP; 18 paired with Consulting

#### Required positioning

Keep the DirectTrack name, but lead with a plain-language category:

> Targeted customer acquisition for auto repair shops.

The page must explain the product without requiring the prospect to understand specialized digital-advertising vocabulary.

#### Required sections

- Demand problem: the shop needs qualified new customers, not an unexplained impression count
- How household targeting works in plain language
- Targeted email role
- Streaming/CTV role
- Geofenced display role
- How channels work together
- What response and revenue attribution can and cannot prove
- DirectTrack versus Google Ads
- DirectTrack-only versus VIP + DirectTrack
- DirectTrack with Consulting
- Market and capacity qualification
- Proof with campaign dates, spend, response definition, and outcome
- FAQ covering privacy, targeting, creative, timing, attribution, and budget
- Consultation CTA

#### Inputs required from Turnkey

- Current targeting methodology and approved public explanation
- Platforms and vendor responsibilities
- Minimum geography or audience-size requirements
- Media-spend treatment and management-fee structure
- Creative formats and production ownership
- Definitions for impressions, responses, attributed customers, revenue, ROAS, and ROI
- Sample monthly report
- Two permissioned client examples, ideally one DirectTrack-only and one VIP + DirectTrack
- Confirmation of which DirectTrack components, if any, are independently purchasable: geofencing, CTV, and targeted email

#### Acceptance criteria

- Explains DirectTrack in language a shop owner understands
- Ranks and converts for a nonbranded acquisition intent, not only the product name
- Makes no unsupported deterministic attribution claim
- Distinguishes Google Ads from DirectTrack accurately
- Receives contextual links from VIP, Consulting, Results, and relevant resources

### Priority 3: Marketing Consulting

**Existing URL:** `/services/marketing-consulting`
**Page role:** Advisory, audit, and decision-support entry point
**Business evidence:** 44 active clients; 18 paired with DirectTrack; 13 Consulting-only

#### Required positioning

Consulting is the right choice when an owner wants experienced direction without outsourcing all execution.

#### Required sections

- Problems: unclear reports, disconnected vendors, uncertain spending, no annual plan
- Pre-meeting audit and preparation
- Monthly meeting structure
- Keep, fix, stop, and start decision framework
- What Consulting includes and excludes
- What stays with the client's team or vendors
- Consulting-only versus Consulting + DirectTrack
- Consulting versus VIP
- Example decision and resulting action
- Proof specific to advisory work
- FAQ covering independence, vendor participation, deliverables, and transition to managed services
- Consultation CTA

#### Inputs required from Turnkey

- Consulting agenda or anonymized example
- Pre-meeting information requested from clients
- Concrete post-meeting deliverable
- Rules for vendor participation
- Scope between meetings
- Minimum term and pricing language that may be public
- One Consulting-only testimonial
- One Consulting + DirectTrack example

#### Acceptance criteria

- Consultant and audit queries select this page rather than the marketing-plan resource
- Scope is visibly different from VIP
- Contains one concrete advisory example
- Links reciprocally with the marketing-plan guide and DirectTrack where appropriate

## 6. Audience-page program

### Homepage: independent general repair shops

General repair appears in 196 records, so the homepage should remain the category owner.

Required homepage additions or confirmations:

- Explicit independent general-repair positioning
- Clear choice among Consulting, DirectTrack, and VIP
- Proof representing the common single-location general repair shop
- Proof representing a growing or multi-location operator
- Links to European and multi-location audience pages
- Language connecting marketing to car count, repair-order quality, capacity, reviews, and revenue

Do not create `/who-we-help/general-repair-shops` unless future query evidence proves the homepage cannot own both agency and general-repair intent.

### European repair specialists

**Proposed URL:** `/who-we-help/european-auto-repair-shops`
**Evidence:** 30 active records include European; multiple existing proof candidates

#### Page promise

Turnkey understands the marketing differences between a European specialist and a general repair shop, including dealership competition, vehicle-specific expertise, higher-value repair work, and narrower customer fit.

#### Required sections

- The European-specialist customer decision
- Competing with dealerships without pretending to be one
- Communicating makes, diagnostics, credentials, equipment, and experience
- Targeting the right households and vehicle owners
- Reviews and proof that support specialist trust
- Protecting repair-order quality rather than chasing indiscriminate lead volume
- Relevant Turnkey services
- Named, permissioned European proof
- FAQ specific to specialty shops

#### Inputs required

- Verified list of European-specialist clients
- Makes and specialties Turnkey has marketed
- Two owner interviews
- One permissioned testimonial
- One verified result or case study
- Examples of European-specific campaign decisions
- Confirmation that client logos/names may be used

### Multi-location repair groups

**Proposed URL:** `/who-we-help/multi-location-auto-repair-shops`
**Evidence:** 19 inferred groups representing 48 active shops

#### Page promise

Turnkey helps ownership groups coordinate the plan while respecting different capacity, demand, and performance at each location.

#### Required sections

- Central strategy versus local execution
- Location-level capacity and demand planning
- Separate Google Business Profiles and reputation needs
- Brand and offer consistency
- Location-level reporting and budget allocation
- Launching or acquiring another location
- Centralized vendor coordination
- VIP and DirectTrack roles
- Named, permissioned multi-location proof
- FAQ about reporting, budgets, ownership structure, and new-location launches

#### Inputs required

- Manual verification of inferred ownership groups
- Confirmed location counts
- Rules for centralized versus location-specific decisions
- Sample location-level report
- One established multi-location client interview
- One new-location launch or expansion case study
- Publication permission for all location and growth claims

### Later candidate: diesel repair shops

Do not build immediately. First verify:

- All 12 Diesel-coded records
- Which are light-duty diesel, heavy-duty, fleet, or general shops that also accept diesel
- Which Turnkey services they buy
- Whether their marketing needs are genuinely different
- Whether at least one permissioned result and two useful interviews are available

If confirmed, proposed URL: `/who-we-help/diesel-repair-shops`.

## 7. Market-page pilot

### Candidate selection model

Score each metro on a 100-point scale before selecting a pilot.

| Factor | Weight | Scoring guidance |
| --- | ---: | --- |
| Active shop count | 25 | Highest-density metro receives full points |
| VIP and DirectTrack adoption | 20 | Reward validated flagship-product use |
| Strong testimonial candidates | 15 | Count only quotes with identifiable sources |
| Permissioned case-study potential | 15 | Require a plausible approval path |
| Specialty and ownership diversity | 10 | General, European, and multi-location representation |
| Search demand and SERP opportunity | 10 | Use GSC, SE Ranking, and manual SERP review |
| Address confidence and metro coherence | 5 | Penalize ambiguous or overly broad groupings |

No market page advances without a scorecard and editorial evidence packet.

### First metros to score

1. Chicago–Northwest Indiana — 16 active shops
2. Atlanta — 11
3. Houston — 9
4. Minneapolis–St. Paul — 8
5. Orlando — 8

The top three by shop count are the initial pilot candidates, not automatic winners.

### Market-page purpose

A market page is not a claim that Turnkey has a physical office in that metro. It should explain what Turnkey has learned while helping shops in the market and connect that knowledge to useful decisions.

### Required market-page content

- Transparent statement that Turnkey serves the market remotely/nationally
- Market-specific shop and customer considerations verified by interviews or data
- Number of active clients only if disclosure is approved
- Product mix without exposing confidential client details
- At least one permissioned local testimonial or case example
- Locally relevant automotive, commuting, seasonality, or competitive context
- Relevant segment context, such as European or multi-location experience
- Links to VIP, DirectTrack, Consulting, and applicable audience pages
- One primary consultation CTA

### Prohibited market-page patterns

- Changing only the city name
- Invented local expertise
- Implying an office, staff, or Google Business Profile that does not exist
- Repeating the same testimonial across every market
- Publishing exact confidential client counts without approval
- Listing generic landmarks, neighborhoods, or weather facts that do not affect the marketing decision
- Using a market page as an intermediate doorway to the same generic sales page

### Pilot decision

Publish one market page first. Measure it for at least one full indexing and reporting cycle before publishing the second. A second and third market page may proceed only when each has an independent evidence packet and the pilot demonstrates useful impressions, engagement, assisted conversions, qualified consultations, or link/mention potential.

## 8. New service-page decision gates

The next likely service pages are Reputation Management, Local SEO, and Facebook Ads. Do not publish them merely because the capabilities appear inside existing packages.

For each candidate, answer:

1. Can a client buy it independently today?
2. If not, which package includes it?
3. What exact deliverables recur each month?
4. Who performs the work?
5. What is excluded?
6. How is performance reported?
7. What client participation is required?
8. Is there at least one approved testimonial or result?
9. Is the buyer intent distinct from an existing service page?
10. Can the page remain materially useful without repeating a parent service page?

### Reputation Management

Current evidence:

- Review-generation process in Digital Marketing
- Review and comment response in Social Media
- Existing review-growth proof candidate

Required business decision: create a unified standalone offer or describe it as a capability included across Digital, Social, and VIP.

### Local SEO

Current evidence:

- Google Business Profile optimization
- Review management
- Semiannual website audits
- Vendor coordination

Required business decision: determine whether Turnkey sells a standalone local-visibility program. Do not imply technical SEO, content production, citations, or link building unless they become real deliverables.

If Local SEO becomes the primary positioning of the current Digital Marketing offer, strengthen or rename the current page rather than creating two competing URLs.

### Facebook Ads

Current evidence:

- Facebook ad creation and management explicitly included in Social Media Marketing

Required business decision: determine whether paid Facebook management can be purchased independently. If a standalone `/services/facebook-ads` page is approved, remove its current legacy redirect intentionally and update the migration matrix and tests.

## 9. Airtable and evidence-system requirements

### Required shop fields

Add or normalize:

- Canonical shop name
- Public website URL
- Full normalized address
- Verified metro
- Owner organization/group ID
- Verified number of active locations
- Shop specialty, allowing multi-select
- Service start date by product
- Active products using controlled values
- Former products and end dates
- Account owner
- Current monthly shop revenue with period and source
- Turnkey fee with period and product allocation

### Required proof fields

- Quote text
- Quote speaker
- Quote source URL or artifact
- Quote category
- Date received
- Permission status: unknown, requested, approved, declined, expired
- Approved channels: website, social, sales deck, paid ads, partner syndication
- Approved client name, owner name, logo, website link, and location
- Metric definition
- Metric reporting period
- Underlying report or source
- Turnkey-controlled work
- Other contributing vendors
- Legal/claims review status
- Expiration or re-verification date

### Required tenure fields

Do not use Airtable creation dates as client start dates. Add:

- Original relationship start date
- Product-specific start dates
- Source of start date
- Confidence status

### Required market fields

- Normalized market ID
- Metro display name
- States included
- Cities/suburbs included
- Assignment confidence
- Manual-review note

The 28 unassigned records should enter a manual cleanup queue. They should not delay the flagship service pages or audience pages, but they should be resolved before reporting national coverage percentages as complete.

## 10. Proof-production program

### First proof targets

Select proof candidates by page need rather than by the most dramatic unverified result.

| Page | Minimum proof needed |
| --- | --- |
| VIP | One single-location general repair story and one multi-location/expansion story |
| DirectTrack | One standalone campaign and one VIP + DirectTrack campaign |
| Consulting | One Consulting-only decision story and one Consulting + DirectTrack story |
| European segment | One European specialist result plus one owner quote |
| Multi-location segment | One verified group or location-launch story |
| First market page | One permissioned local quote or case example |

### Approval workflow

1. Confirm the source and speaker.
2. Verify metrics against underlying reporting.
3. Separate Turnkey's work from other contributing factors and vendors.
4. Draft the exact proposed public wording.
5. Obtain permission for quote, name, logo, metric, URL, and distribution channels.
6. Complete internal claims review.
7. Record the approval in Airtable.
8. Publish only the approved wording and assets.
9. Reverify time-sensitive proof annually.

No existing `Deliverable Feedback` or `Turnkey Position` label should be treated as publication consent.

## 11. Keyword and search-validation requirements

Before drafting each page, produce a one-page search brief containing:

- Primary query
- Secondary query cluster
- Commercial or informational intent
- Intended target URL
- Current Turnkey ranking URLs
- Current GSC impressions, clicks, CTR, and average position
- SE Ranking volume and position when available
- Top current search results and their page types
- Common questions and objections
- Internal pages that could compete
- Internal pages that should link to the new page
- Proof required to exceed the current results

### Immediate keyword groups

1. Outsourced marketing department/director
2. Auto repair customer acquisition and lead generation
3. Auto repair marketing consultant/audit
4. European auto repair marketing
5. Multi-location auto repair marketing
6. Chicago, Atlanta, and Houston agency/marketing variations for pilot evaluation

Keyword demand alone does not approve a page. The page must also pass business-scope and proof gates.

## 12. Internal-link architecture

### Core commercial flow

- Homepage → VIP, DirectTrack, Consulting
- Services hub → every active service
- VIP ↔ DirectTrack
- VIP ↔ Consulting comparison
- Consulting ↔ marketing-plan resource
- European page → relevant services and European proof
- Multi-location page → VIP, DirectTrack, Digital, and relevant proof
- Market page → relevant segment, services, and case study
- Results/case studies → the exact service that contributed to the result

### Rules

- Use descriptive contextual links, not repeated generic `Learn more` anchors.
- Give every indexable page at least two contextual inbound links.
- Link to the most specific page that satisfies the next question.
- Avoid identical exact-match anchors sitewide.
- Do not put every future market page in the primary navigation. Use a browsable hub only after several validated pages exist.

## 13. Page production standard

Every new public marketing page must follow the repository's homepage-based design standard and include:

- `BaseLayout`
- Unique title and meta description
- Correct canonical path
- Appropriate Organization, Service, Article, FAQ, and Breadcrumb structured data as applicable
- Exactly one visible H1
- Ordered H2/H3 hierarchy
- A strong hero with eyebrow, concise heading, supporting copy, and primary CTA
- `container-page` content width
- Homepage-consistent typography, spacing, colors, rounded geometry, cards, and motion
- Useful proof rather than unsupported marketing claims
- Accurate image alt text, explicit dimensions, and sensible loading behavior
- Mobile-first layout and visible keyboard focus
- Consultation CTA using `CONSULTATION_URL` and existing tracking attributes

Do not add a new generic template that visually separates these pages from the homepage system.

## 14. Analytics and measurement

### Page-level measurements

Track by landing page:

- Organic impressions
- Organic clicks
- CTR
- Average position by assigned query cluster
- Engaged sessions
- Service-page CTA clicks
- Consultation starts
- AppointmentCore booking completions
- Phone clicks
- Qualified opportunities
- Closed clients and selected product when CRM attribution is available

### Diagnostic measurements

- Google-selected landing page for each target query
- Cannibalization between homepage, services, resources, and results
- Contextual internal-link coverage
- Indexing and canonical status
- Referring domains to service, segment, proof, and market pages
- Assisted conversions from resources and audience pages

### Market-page success criteria

A market page should not be judged only on traffic. Continue or expand the program when it demonstrates at least two of the following after sufficient indexing time:

- Relevant nonbrand impressions grow
- The intended page becomes Google's selected URL
- Qualified consultation or assisted-conversion activity occurs
- Local partners or clients link to or share the page
- Prospects reference the local proof in sales conversations
- Engagement is comparable to or better than other commercial landing pages

## 15. Six-month execution schedule

### Weeks 1–2: truth and measurement

- Confirm product definitions and independent-purchase status
- Resolve the Boost Days Airtable classification
- Baseline VIP, DirectTrack, and Consulting rankings and conversions
- Cross-tab product adoption, specialty, ownership group, quote candidates, and metro
- Identify proof candidates for each priority page
- Add or approve the Airtable permission model

**Gate:** No page claims a scope or standalone product that sales and delivery have not approved.

### Weeks 3–5: VIP

- Interview sales, account management, and delivery owners
- Produce the VIP search brief
- Secure proof permissions
- Rewrite and design the page
- Add homepage, Services, and Results links
- Run build, ESLint, and SEO validation

**Gate:** VIP scope, cadence, comparison, and proof are approved.

### Weeks 6–8: DirectTrack

- Document targeting, delivery, attribution, and reporting
- Produce the DirectTrack search brief
- Secure standalone and paired-use proof
- Rewrite and design the page
- Link from VIP, Consulting, Results, and relevant resources
- Validate tracking and claims

**Gate:** A shop owner can understand the product without specialized digital-advertising expertise.

### Weeks 9–10: Consulting

- Document agenda, deliverable, scope, and escalation paths
- Produce the Consulting search brief
- Secure Consulting-specific proof
- Rewrite and design the page
- Reinforce reciprocal plan-guide links

**Gate:** Consulting and VIP cannot be mistaken for the same offer.

### Weeks 11–13: European segment

- Verify 30 European-coded records
- Interview two European clients
- Approve one quote and one case result
- Produce the segment search brief
- Build and internally link the page

**Gate:** Page contains specialty-specific insight that would not belong on a general-repair page.

### Weeks 14–16: Multi-location segment

- Validate 19 inferred ownership groups and location counts
- Interview one established group and one expansion-stage owner
- Approve one multi-location result
- Produce the segment search brief
- Build and internally link the page

**Gate:** No inferred location count is presented as verified fact.

### Weeks 17–18: Market scoring and pilot selection

- Complete metro × product × specialty × ownership × proof cross-tab
- Research search demand and SERPs for the top five metros
- Score candidates using the 100-point model
- Select one pilot
- Build the evidence packet

**Gate:** Pilot has permissioned local proof and meaningful local analysis.

### Weeks 19–21: First market page

- Interview relevant client/account owners
- Draft market-specific content
- Build and link the page
- Validate transparent nationwide/remote positioning
- Launch with annotation in the reporting workflow

### Weeks 22–24: measurement and next-quarter decision

- Review page selection, rankings, engagement, CTA behavior, and qualified leads
- Check for service-page or market-page cannibalization
- Decide whether to publish a second market page
- Decide whether Reputation Management, Local SEO, or Facebook Ads passes the standalone-service gate
- Update the next-quarter backlog

## 16. Roles and approvals

| Role | Responsibility |
| --- | --- |
| Executive/service owner | Confirms what is sold, pricing visibility, scope, and exclusions |
| Sales owner | Supplies buyer questions, objections, qualification rules, and loss reasons |
| Delivery owner | Verifies deliverables, cadence, vendors, reporting, and operational feasibility |
| Account owner | Identifies proof candidates and validates client context |
| Data owner | Normalizes Airtable fields and maintains product/market/ownership truth |
| Proof/permissions owner | Obtains and records quote, metric, logo, name, and case-study consent |
| SEO owner | Owns keyword map, briefs, target URLs, internal links, and reporting |
| Writer/strategist | Produces shop-owner language grounded in verified delivery and proof |
| Designer/developer | Implements the homepage design system, metadata, schema, performance, and tracking |
| Analytics owner | Validates GA4, consultation, phone, booking, and CRM attribution |
| Claims reviewer | Confirms numbers, definitions, timeframes, caveats, and vendor contributions |

One named person must own each row before production begins.

## 17. Required decisions from Turnkey

### Product decisions

1. Is Reputation Management independently purchasable?
2. Is Local SEO independently purchasable, or is Digital Marketing the only package?
3. Is Facebook Ads independently purchasable?
4. How is Boost Days recorded, and does it currently have active clients?
5. What precisely is included in VIP versus separately billed?
6. Which DirectTrack channels are always included versus optional?

### Audience decisions

1. Does Turnkey want to actively pursue more European specialists?
2. Does delivery have a distinct multi-location operating model?
3. Does Turnkey want diesel shops as a strategic segment?
4. Are collision, tire, dealership, heavy-duty, fleet, and transmission businesses in or out of scope?

### Proof decisions

1. Who can request testimonial and case-study permission?
2. Who approves public metrics?
3. Which 41 strong quote candidates should be approached first?
4. Can Turnkey publicly identify client counts by metro or segment?
5. Can client websites receive followed links, and can clients/partners link back to case studies?

### Data decisions

1. Who will backfill true relationship start dates?
2. Who will verify ownership groups and location counts?
3. What is the authoritative revenue source and reporting period?
4. How should Custom and legacy product names map to current offers?

## 18. Immediate deliverables

The next working sprint should produce:

1. A signed-off offer matrix for all current products and capabilities.
2. A metro × product × specialty × ownership × proof cross-tab.
3. A verified list of the 19 possible multi-location groups.
4. A permission workflow and Airtable field set.
5. A ranked list of 10 proof candidates mapped to VIP, DirectTrack, Consulting, European, multi-location, and market needs.
6. Search briefs for VIP, DirectTrack, and Consulting.
7. A content/design brief for the VIP rewrite.
8. Baseline organic and conversion reporting for all three flagship service pages.

## 19. Definition of done

The expansion program is successful when:

- VIP, DirectTrack, and Consulting each have a distinct commercial intent and stable target-query ownership.
- Each flagship page contains permissioned service-specific proof.
- The homepage clearly owns independent general repair shop marketing.
- European and multi-location pages contain original, segment-specific expertise and approved proof.
- The first market page contains real local evidence and does not function as a doorway page.
- No page implies direct Google Ads management, website development, or comprehensive technical SEO unless the offer changes.
- Organic consultations and phone clicks are attributable by landing page.
- Qualified opportunities and closed products can be connected back to landing pages when CRM data permits.
- Every new page passes production build, ESLint, `scripts/seo-check.mjs`, metadata, schema, accessibility, responsive, image, sitemap, internal-link, and tracking checks.
- Expansion beyond the pilot is based on measured performance and available proof, not page-count goals.
