# Automotive content clusters and publication queue

Approved by Kyle on September 15, 2026. Audience: independent auto repair shop owners. Automotive relevance comes first; general feedback terms are secondary. This plan covers the articles discussed in this task, not a reclassification of the entire resource library.

## Schedule

Tuesday releases at 9:00 a.m. America/Chicago. These are scheduled agent work sessions: research, implementation, verification, and publication happen during the session, so the page is not guaranteed live at exactly 9:00. Publication is authorized by Kyle's approval of this plan. Do not request approval again for the ordinary work included here.

| Date | Work | Cluster | Status |
|---|---|---|---|
| September 15 | Refine the live AI review tutorial's title, metadata, and introduction; preserve URL | Auto Repair Reputation Management | Implementation completed; see release verification |
| September 22 | Finish pre-publication research and implement/publish Reputation Management for Auto Repair Shops: A Practical Guide | Auto Repair Reputation Management | Draft in drafts/auto-repair-reputation-management.md |
| September 29 | Finish pre-publication research and implement/publish How to Improve the Customer Experience at Your Auto Repair Shop | Auto Repair Customer Experience | Draft in drafts/auto-repair-customer-experience.md |
| October 6 | Research and publish How to Manage Google Reviews for Your Auto Repair Shop if it serves a distinct daily-workflow intent | Auto Repair Reputation Management | Brief below; not drafted |
| October 13 | Check indexing, available query data, and coverage. Recommend next article; do not automatically publish complaints | Both | Review checkpoint |

If a release cannot meet the research, accuracy, or implementation checks, retain the draft and report the specific gap. Do not automatically publish a replacement. Prevent duplicate publication by checking the live URL and resource-posts.ts before each run. Record the result and actual publication date here. If a prior release is unfinished, finish it before later queue items; do not release multiple new articles at once to catch up.

## Cluster 1: Auto Repair Reputation Management

Main guide: Reputation Management for Auto Repair Shops: A Practical Guide.
Planned URL: https://www.turnkeyautomarketing.com/resources/auto-repair-reputation-management (not live at plan creation).

| Keyword | US monthly searches | Difficulty | Intended article |
|---|---:|---:|---|
| automotive reputation management | 170 | 8 | Main guide |
| automotive online reputation management | 30 | 8 | Main guide |
| auto repair reputation management | 10 | 5 | Main guide |
| reputation management for auto repair shops | 0 | 5 | Main guide; optional narrow tracking |
| automotive review management | 10 | 10 | Google review workflow article |

Supporting tutorial: How to Use AI to Analyze Your Auto Repair Shop's Google Reviews.
Existing URL: https://www.turnkeyautomarketing.com/resources/analyze-google-reviews-with-ai
Job: collect review text, analyze evidence, choose an operational fix or marketing strength, and measure the change. Keep the reusable prompt and existing layout. General phrase customer feedback analysis (170, KD17) remains secondary; it does not define the audience or main cluster.

Planned workflow URL: https://www.turnkeyautomarketing.com/resources/google-review-management-auto-repair-shops
Job: correct-location review link, consistent request timing, review queue, human-checked reply examples, exception handling, and a daily/weekly checklist. Avoid duplicating the strategy guide or the AI prompt tutorial. Research the Google results for automotive review management before drafting. If they overwhelmingly favor software comparisons and a distinct useful guide is not justified, strengthen the main guide's workflow section and record the decision instead of forcing another URL.

## Cluster 2: Auto Repair Customer Experience

Main guide: How to Improve the Customer Experience at Your Auto Repair Shop.
Planned URL: https://www.turnkeyautomarketing.com/resources/auto-repair-customer-experience (not live at plan creation).

| Keyword | US monthly searches | Difficulty | Intended article |
|---|---:|---:|---|
| automotive customer experience | 260 | 7 | Main guide |
| automotive customer satisfaction | 20 | 24 | Main guide |
| customer service in automotive industry | 10 | 5 | Main guide |
| service advisor customer service | 10 | 6 | Main guide; monitor intent before a separate article |
| auto repair customer experience | 0 | 8 | Main guide; optional narrow tracking |
| auto repair customer satisfaction | 0 | 13 | Main guide; optional narrow tracking |

Backlog: How to Handle Customer Complaints at Your Auto Repair Shop.
Potential phrase auto repair shop customer complaints: 0, KD22. Broader how to handle customer complaints: 390, KD25. Not approved for automatic publication in this queue; October 13 checkpoint chooses the next work based on coverage and evidence. No separate retention article is planned yet; auto repair customer retention (0, KD10) and auto repair shop customer retention strategies (0, KD5) are backlog research terms.

## Internal linking and overlap

- Main reputation guide links to the existing AI tutorial, existing marketing plan, ideal customer profile, and messaging guide where useful.
- On September 22, add an inbound contextual link from the AI tutorial to the new reputation guide. Do not add a link to an unpublished route now.
- Customer-experience guide links to the AI tutorial, messaging guide, and the reputation guide once live. Add a relevant link back from the reputation guide when the customer-experience guide publishes.
- Workflow article links to the reputation guide and AI tutorial. Keep broad reputation targeting with the main guide.
- Each article has one primary cluster. Cross-links do not make a second primary assignment.
- Preserve the existing AI article URL. Never backdate new publication dates or expose future drafts in the sitemap or resource listing.
- Before creating a new article, check all current resources again for overlapping search intent, including the marketing ideas, marketing plan, ideal customer profile, and messaging guides.

## SE Ranking setup

Create the two groups named exactly as the headings above. Paste the corresponding keywords-*.txt file into each group. These are tracking lists, not an instruction to create one page per keyword. Zero-volume phrases are relevant optional monitors, not demonstrated traffic opportunities. Reported automotive volume includes dealerships and other businesses; never treat it as repair-owner-only demand or add overlapping volumes together.

Use the existing project's US Google tracking settings for a comparable baseline. Track the current AI URL now; add intended target URLs for new articles when they are live. Kyle will do the SE Ranking entry. No connector mutations to SE Ranking are part of this work.

Review initial indexing and impressions after the first releases. Look for automotive/shop-owner query relevance, which page appears for each group, and whether multiple articles compete for the same queries. Check qualified traffic and consultation activity where data exists. October 13 is an early checkpoint, not a deadline for ranking success. Recommend a later 8-12 week assessment rather than scheduling indefinite new content.

## Source reports

All figures above come from Kyle's supplied US SE Ranking exports, not fresh volume estimates:

- /Users/kylecoffelt/Downloads/export_research_bulk_us_17302569_54116916_54117103_144625374_144627289_168.xlsx
- /Users/kylecoffelt/Downloads/export_research_bulk_us_54117005_54117811_54131729_98845111_179595303_1795.xlsx

The initial report is also available at /Users/kylecoffelt/Downloads/export_research_bulk_us_451939941_451940886_1360575091_1369122856_13698714.xlsx.

## Release requirements

Use /Users/kylecoffelt/.codex/skills/blog-post/SKILL.md, current AGENTS.md, the existing Turnkey design system, and the research brief in this directory. Drafts are stored locally outside routes, ignored by Git, and are not published. Kyle explicitly requested that drafts not be pushed. Never force-add the drafts directory. At the scheduled release, implement the finished article in the site's source files and commit only the completed release; keep the working draft local. Finish the research checks described in research-brief.md, including another attempt to observe relevant Google People Also Ask questions. Do not manufacture PAA attribution if that feature is absent.

Implement the complete article with accurate metadata and date, one H1, canonical, matching structured data, appropriate image, internal and external links, resource listing, inbound link, and sitemap. Use the current booking CTA convention. Verify phone and desktop layouts, heading wraps, links, and any interactions. Run build and relevant checks. Preserve unrelated changes; commit only this release's files and inspect the staged diff. Verify production deployment and live content before recording a release as published. Do not send emails or social posts as part of this schedule.
