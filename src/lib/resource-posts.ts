import { siteMedia, type SiteImage } from "@/lib/site-media";

export type ResourcePost = {
  slug: string;
  date: string;
  originalDate?: string;
  updatedDate?: string;
  tag: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  description: string;
  dek: string;
  image: SiteImage;
  imageWidth?: number;
  imageHeight?: number;
  layout?: "article" | "client-proof" | "marketing-ideas";
  client?: {
    name: string;
    company: string;
    location: string;
    quote: string;
    portrait: SiteImage;
  };
  href: string;
  sourceAsset: string;
  originalUrl?: string;
  legacyPaths?: string[];
  takeaways: string[];
  sections: {
    heading: string;
    body: string;
    bullets?: string[];
  }[];
  serviceLink?: {
    href: string;
    label: string;
  };
  relatedSlugs?: string[];
};

const resourcePath = (slug: string) => `/resources/${slug}`;

export const resourcePosts: ResourcePost[] = [
  {
    slug: "auto-repair-marketing-ideas",
    date: "Aug 2026",
    originalDate: "2026-08-14",
    updatedDate: "2026-08-14",
    tag: "Planning",
    title: "Auto Repair Marketing Ideas for the Problem in Front of You",
    seoTitle: "Auto Repair Marketing Ideas for Independent Shops | Turnkey",
    seoDescription:
      "Find practical auto repair marketing ideas for attracting better customers, filling slow bays, earning trust, and bringing past customers back.",
    description:
      "A decision guide for choosing the right marketing move based on the problem your shop needs to solve.",
    dek: "The best marketing idea is not the newest channel. It is the move that addresses the constraint currently holding back your shop.",
    image: siteMedia.hero,
    imageWidth: 1200,
    imageHeight: 800,
    layout: "marketing-ideas",
    href: resourcePath("auto-repair-marketing-ideas"),
    sourceAsset: "public/site-media/hero-thunderbird-shop.webp",
    takeaways: [
      "Choose the shop problem before you choose a marketing channel.",
      "Match every campaign to a specific audience, owner, timeframe, and business result.",
      "Measure the path from response to booked work and the next visit—not only impressions or leads.",
    ],
    sections: [],
    serviceLink: {
      href: "/services/marketing-consulting",
      label: "Choose what to run next with marketing consulting",
    },
    relatedSlugs: [
      "auto-repair-marketing-plan",
      "ideal-customer-profile-auto-repair-shop",
      "direct-mail-for-repair-shops",
    ],
  },
  {
    slug: "ideal-customer-profile-auto-repair-shop",
    date: "Updated Jul 2026",
    originalDate: "2023-02-20",
    updatedDate: "2026-07-27",
    tag: "Strategy",
    title: "How to Build an Ideal Customer Profile for Your Repair Shop",
    seoTitle: "Auto Repair Shop Customer Profile | Turnkey Marketing",
    seoDescription:
      "Define your auto repair shop's ideal customer, choose useful traits, and turn the profile into clearer offers, content, and marketing campaigns.",
    description:
      "A practical exercise for defining the customers and repair work your shop wants more of.",
    dek: "An ideal customer profile helps your team choose better messages, offers, channels, and service priorities without pretending every driver wants the same thing.",
    image: {
      src: "/images/resources/ideal-auto-repair-customer-profile.png",
      alt: "Notebook asking who is your ideal customer",
      position: "50% 50%",
    },
    imageWidth: 1200,
    imageHeight: 800,
    href: resourcePath("ideal-customer-profile-auto-repair-shop"),
    sourceAsset: "public/original-site-assets/ideal-customer-title.png",
    originalUrl: "https://turnkeyautomarketing.com/create-customer-profile-auto-repair-shop/",
    legacyPaths: ["/create-customer-profile-auto-repair-shop/"],
    takeaways: [
      "Start with evidence from your best current customers, not a made-up demographic.",
      "Describe the jobs, values, and service experience that make a customer a strong fit.",
      "Use the profile to make practical decisions about messages, offers, channels, and follow-up.",
    ],
    sections: [
      {
        heading: "Start with the customers you would gladly clone.",
        body: "Ask your advisors and leadership team to name five to ten customers they would be happy to see more often. Look for patterns in the relationship, not just the repair order. A strong-fit customer values good advice, approves needed work, keeps vehicles maintained, communicates well, and refers people who behave similarly.",
        bullets: [
          "Which vehicles and services create a healthy fit for the shop?",
          "Which customers follow a maintenance plan instead of waiting for a crisis?",
          "Which customers value safety, reliability, convenience, or expertise over the lowest price?",
          "Which relationships are profitable without exhausting the front counter?",
        ],
      },
      {
        heading: "Describe the situation, not a stereotype.",
        body: "Age and income can be useful, but a profile becomes actionable when it explains what the customer is trying to accomplish. Note where they live, what they drive, who depends on the vehicle, how they prefer to communicate, and what makes choosing a repair shop feel risky. Those details help your marketing address a real decision.",
      },
      {
        heading: "Turn the profile into marketing choices.",
        body: "Use the profile as a filter. A customer who values predictable transportation may respond to maintenance planning, easy scheduling, and clear updates. A European-car owner may care more about specialized knowledge and the right diagnostic equipment. Match the promise, proof, offer, and channel to the customer you want—not to everyone within driving distance.",
        bullets: [
          "Lead with the customer problem your shop is best equipped to solve.",
          "Show proof that matters to that person, such as reviews, credentials, photos, or process.",
          "Choose channels based on where that audience pays attention.",
          "Give advisors the same language so the experience matches the campaign.",
        ],
      },
      {
        heading: "Validate the profile with shop data.",
        body: "Treat the first profile as a working hypothesis. Compare it with repair-order quality, vehicle mix, retention, declined work, call recordings, reviews, and customer feedback. Revisit it when capacity, staffing, specialty, geography, or business goals change. The useful profile is the one that keeps improving real decisions.",
      },
    ],
    serviceLink: {
      href: "/services/marketing-consulting",
      label: "See how marketing consulting sharpens your strategy",
    },
    relatedSlugs: [
      "be-the-guide-auto-repair-shop-messaging",
      "know-like-trust-marketing-filter",
      "auto-repair-marketing-plan",
    ],
  },
  {
    slug: "auto-repair-shop-photography-guide",
    date: "Updated Jul 2026",
    originalDate: "2023-03-09",
    updatedDate: "2026-07-27",
    tag: "Digital",
    title: "The Auto Repair Shop Photography Guide",
    seoTitle: "Auto Repair Shop Photography Guide | Turnkey Marketing",
    seoDescription:
      "Plan an auto repair shop photo shoot with a practical shot list, preparation checklist, usage rights, and ideas for websites, ads, and social media.",
    description:
      "A useful shot list and preparation guide for photos that make your shop easier to trust.",
    dek: "Original photography lets customers see the people, place, and process behind your shop before they ever make the first call.",
    image: {
      src: "/images/resources/auto-repair-shop-photography.jpg",
      alt: "Two Wiggs Auto Service team members photographed outside their shop",
      position: "50% 38%",
    },
    imageWidth: 1200,
    imageHeight: 1000,
    href: resourcePath("auto-repair-shop-photography-guide"),
    sourceAsset: "public/original-site-assets/wiggs-office-team-390A4401-1200px.jpg",
    originalUrl: "https://turnkeyautomarketing.com/auto-repair-shop-photography/",
    legacyPaths: ["/auto-repair-shop-photography/"],
    takeaways: [
      "Photograph the complete customer experience, not only cars on lifts.",
      "Prepare the shop, vehicles, team, and permissions before the photographer arrives.",
      "Secure broad usage rights and organize the final library so the images keep working.",
    ],
    sections: [
      {
        heading: "Build the shot list around customer questions.",
        body: "A prospective customer wants to know who will greet them, whether the shop feels professional, and whether their vehicle will be handled with care. Build a photo library that answers those questions. Mix wide establishing images with close details, horizontal and vertical compositions, and both posed and candid moments.",
        bullets: [
          "Exterior, roadside signage, parking, entrance, counter, and waiting area.",
          "Owner, advisors, technicians, and a friendly full-team portrait.",
          "Inspections, diagnostics, repairs, updates, key handoff, and customer care.",
          "Specialty equipment, certifications, amenities, loaners, and shop details.",
          "Community involvement and the vehicle types your best customers drive.",
        ],
      },
      {
        heading: "Prepare the shop for one productive day.",
        body: "Choose a day when key team members can participate without disrupting the schedule. Clean visible work areas, remove clutter and confidential customer information, stage representative vehicles, and ask everyone to wear clean, consistent uniforms. Share the shot list and brand examples with the photographer in advance.",
      },
      {
        heading: "Protect the right to use every image.",
        body: "The agreement should give the shop lasting permission to use the final photographs on its website, social channels, ads, email, print, recruiting, and future campaigns. Get written releases from recognizable customers and team members, and confirm whether the photographer may use the work in their own portfolio.",
      },
      {
        heading: "Make the library easy to reuse.",
        body: "Ask for full-resolution originals plus web-ready exports. Sort files by people, facility, service, equipment, community, and orientation, then use descriptive filenames. Refresh staff and facility photography when the team or customer experience changes; a smaller current library is more credible than a large outdated one.",
      },
    ],
    serviceLink: {
      href: "/services/digital-marketing",
      label: "See how digital marketing strengthens local trust",
    },
    relatedSlugs: [
      "be-the-guide-auto-repair-shop-messaging",
      "know-like-trust-marketing-filter",
      "why-auto-repair-marketing-breaks",
    ],
  },
  {
    slug: "be-the-guide-auto-repair-shop-messaging",
    date: "Updated Jul 2026",
    originalDate: "2023-03-24",
    updatedDate: "2026-07-27",
    tag: "Messaging",
    title: "Make Your Repair Shop the Guide in Your Customer's Story",
    seoTitle: "Make Your Repair Shop the Guide | Turnkey Marketing",
    seoDescription:
      "Clarify your auto repair shop messaging by making the customer the hero and your team the trusted guide with empathy, authority, and a clear plan.",
    description:
      "A customer-centered messaging framework that balances empathy, expertise, and a clear next step.",
    dek: "Your shop has the expertise, but the customer is the main character. Strong messaging shows that you understand the problem and can guide them toward a safe, reliable vehicle.",
    image: {
      src: "/images/resources/repair-shop-guide-messaging.png",
      alt: "Compass needle pointing toward the word guide",
      position: "50% 50%",
    },
    imageWidth: 1200,
    imageHeight: 800,
    href: resourcePath("be-the-guide-auto-repair-shop-messaging"),
    sourceAsset: "public/original-site-assets/be-the-guide.png",
    originalUrl: "https://turnkeyautomarketing.com/be-the-guide/",
    legacyPaths: ["/be-the-guide/", "/two-keys-auto-repair-shop-message/"],
    takeaways: [
      "The customer is the hero; the shop earns attention by being a useful guide.",
      "Effective guides pair empathy with specific, believable authority.",
      "A simple plan and clear next step reduce the uncertainty around booking service.",
    ],
    sections: [
      {
        heading: "Move the spotlight from the shop to the customer.",
        body: "Most shop marketing opens with years in business, certifications, equipment, or a long service list. Those facts matter, but customers first want to know whether you understand their situation. Lead with the outcome they need: a safe commute, a dependable family vehicle, a clear explanation, or confidence that the repair was done right.",
      },
      {
        heading: "Show empathy and authority together.",
        body: "Empathy tells the customer, “We understand why this is frustrating.” Authority shows that the team can solve it. Either one alone is weak: empathy without proof feels vague, while credentials without empathy can feel self-centered. Pair a customer-centered statement with reviews, technician credentials, a transparent process, or relevant experience.",
        bullets: [
          "Empathy: name the inconvenience, concern, or uncertainty the driver feels.",
          "Authority: show relevant proof without turning the message into a résumé.",
          "Plan: explain the next two or three steps in plain language.",
          "Action: make calling, scheduling, or asking a question easy.",
        ],
      },
      {
        heading: "Rewrite “we” statements as customer outcomes.",
        body: "A useful editing pass is to circle every “we,” “our,” and “us.” Keep the ones that provide necessary proof, then rewrite the rest around what the customer gets. “We perform digital inspections” becomes “See what we see before you approve the work.” The capability stays; the benefit becomes easier to understand.",
      },
      {
        heading: "Carry the message through the whole experience.",
        body: "The guide role cannot stop at the website. Use the same clear language in phone scripts, appointment confirmations, inspections, estimates, follow-up, social content, and review responses. Consistency turns a marketing promise into an experience customers can recognize and recommend.",
      },
    ],
    serviceLink: {
      href: "/services/marketing-consulting",
      label: "Build a clearer shop message with marketing consulting",
    },
    relatedSlugs: [
      "ideal-customer-profile-auto-repair-shop",
      "know-like-trust-marketing-filter",
      "auto-repair-shop-photography-guide",
    ],
  },
  {
    slug: "know-like-trust-marketing-filter",
    date: "Updated Jul 2026",
    originalDate: "2023-01-27",
    updatedDate: "2026-07-27",
    tag: "Messaging",
    title: "The Know-Like-Trust Filter for Repair Shop Marketing",
    seoTitle: "Know-Like-Trust for Repair Shops | Turnkey Marketing",
    seoDescription:
      "Use the know-like-trust filter to review your repair shop website, ads, mail, email, and social content before asking customers to book service.",
    description:
      "A three-question filter for checking whether a campaign earns attention and confidence before it asks for action.",
    dek: "Before customers book, they need to recognize your shop, feel that it understands them, and believe it will deliver. Use those three stages to improve every campaign.",
    image: {
      src: "/images/resources/know-like-trust-filter.png",
      alt: "Magician presenting a top hat as a three-word marketing filter",
      position: "50% 50%",
    },
    imageWidth: 1200,
    imageHeight: 800,
    href: resourcePath("know-like-trust-marketing-filter"),
    sourceAsset: "public/original-site-assets/magic-three-words-01.png",
    originalUrl:
      "https://turnkeyautomarketing.com/use-this-magical-three-word-filter-to-woo-customers-to-your-auto-repair-shop/",
    legacyPaths: ["/use-this-magical-three-word-filter-to-woo-customers-to-your-auto-repair-shop/"],
    takeaways: [
      "Know: make the shop and its relevance immediately recognizable.",
      "Like: communicate with useful, human language that reflects the customer.",
      "Trust: support every promise with proof, process, and consistency.",
    ],
    sections: [
      {
        heading: "Know: can the right customer recognize you?",
        body: "Recognition is more than seeing a logo. The customer should quickly understand where the shop is, what it helps with, and whether it serves their vehicle or situation. Consistent naming, photography, colors, location details, and service language make repeated impressions add up across search, mail, social, email, and the street.",
      },
      {
        heading: "Like: does the message feel useful and human?",
        body: "Customers do not need a repair shop to be entertaining; they need it to be understandable and considerate. Explain problems without jargon, respect the customer's time and intelligence, and show the people behind the work. Helpful maintenance advice and community involvement can create familiarity without forcing a sales pitch into every message.",
      },
      {
        heading: "Trust: is there enough proof to act?",
        body: "A strong claim needs evidence. Use recent reviews, original shop photos, credentials, warranties, a clear approval process, and honest expectations. Make phone numbers, hours, address, and scheduling steps consistent everywhere. Small contradictions create doubt, while operational consistency makes the decision feel safer.",
      },
      {
        heading: "Score the campaign before it ships.",
        body: "Review each website page, postcard, ad, email, and social post with three questions: Will the intended customer know who this is for? Is the message relevant and respectful enough to like? Is there enough proof and clarity to trust the next step? Fix the weakest answer before increasing the budget.",
        bullets: [
          "Name the specific audience and problem.",
          "Use one primary message and one clear action.",
          "Add the proof most relevant to the promise.",
          "Check that the landing page and front-counter experience match.",
        ],
      },
    ],
    serviceLink: {
      href: "/services/marketing-consulting",
      label: "Use marketing consulting to strengthen the whole campaign",
    },
    relatedSlugs: [
      "be-the-guide-auto-repair-shop-messaging",
      "ideal-customer-profile-auto-repair-shop",
      "auto-repair-shop-photography-guide",
    ],
  },
  {
    slug: "5-marketing-mistakes-shop-owners-make",
    date: "Jul 2023",
    tag: "Guide",
    title: "5 Marketing Mistakes Shop Owners Make & How to Fix Them",
    seoTitle: "5 Marketing Mistakes for Shop Owners | Turnkey Marketing",
    description:
      "A Turnkey resource for shop owners who want to spot common marketing leaks and correct them.",
    dek: "A practical checklist for spotting common marketing problems before they turn into wasted spend, weak calls, or confusing vendor conversations.",
    image: siteMedia.graphics.leadGenerator,
    href: resourcePath("5-marketing-mistakes-shop-owners-make"),
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/07/lead-generator-web-graphic.png",
    takeaways: [
      "Marketing needs one accountable plan, not disconnected tactics.",
      "Tracking should explain what to keep, fix, stop, and run next.",
      "The best fixes are usually practical: clearer offers, better follow-up, and cleaner reporting.",
    ],
    sections: [
      {
        heading: "The mistake is not always spending too much.",
        body: "Many shops are already investing in mail, Google, reviews, social, CRM, or ads. The problem is that each channel is often judged separately, so the owner still has to figure out what is actually moving calls and cars.",
      },
      {
        heading: "The fix is a single scoreboard.",
        body: "A useful marketing plan connects calls, booked appointments, customer mix, retention, and spend. That makes the next move easier to defend because every channel is working toward the same shop goal.",
      },
    ],
  },
  {
    slug: "direct-mail-for-repair-shops",
    date: "Updated Aug 2026",
    originalDate: "2023-06-27",
    updatedDate: "2026-08-13",
    tag: "Direct Mail",
    title: "Direct Mail for Auto Repair Shops: A Campaign Guide",
    seoTitle: "Direct Mail for Auto Repair Shops: Campaign Guide | Turnkey",
    seoDescription:
      "Plan auto repair direct mail campaigns with the right mailing list, offer, timing, postcard creative, call tracking, and follow-up that drives repair orders.",
    description:
      "A six-part guide to running auto repair direct mail as a managed campaign instead of a one-off postcard order.",
    dek: "Direct mail still earns a place when the list, offer, timing, creative, tracking, and follow-up are treated like a campaign instead of a print order.",
    image: siteMedia.graphics.directMail,
    href: resourcePath("direct-mail-for-repair-shops"),
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/06/2023-06-27-blog-RW-direct-mail.png",
    originalUrl: "https://turnkeyautomarketing.com/joe-flammer-ratchet-wrench/",
    legacyPaths: ["/joe-flammer-ratchet-wrench/"],
    takeaways: [
      "The mailing list decides more of the outcome than the postcard design does.",
      "Mail should be judged by calls, booked appointments, and repair-order quality — not by how the piece looked.",
      "Most disappointing campaigns fail at timing, tracking, or front-counter follow-up rather than at the print stage.",
    ],
    sections: [
      {
        heading: "1. A mailer is not the strategy.",
        body: "The postcard is one piece of a direct mail campaign for an auto repair shop. The real work is deciding who should receive it, what problem the offer solves, when it should land, and how the shop follows up when the phone starts ringing. A printer can sell quantity. Nobody at the print shop owns whether the mail reached households that can become good customers.",
      },
      {
        heading: "2. Build the mailing list before the creative.",
        body: "Start with the households that can realistically drive to the shop and afford the work the bays are built for. A tight radius around the shop usually beats a broad blanket drop, and household filters — vehicle age, income range, homeownership, tenure in the neighborhood — matter more than raw quantity. Your own customer list is a separate and often stronger audience, because reactivating a lapsed customer costs less than buying a new one.",
        bullets: [
          "Drive-time radius from the shop, not an arbitrary mile count.",
          "Household characteristics that match your best current customers.",
          "New movers, who are actively choosing a shop for the first time.",
          "Your own lapsed customers, mailed as a separate reactivation campaign.",
        ],
      },
      {
        heading: "3. Write an offer that attracts the right work.",
        body: "The offer decides which customer responds. A deep discount on a low-margin service brings in price shoppers who will not return. An offer tied to the work the shop wants more of — diagnostics, maintenance intervals, seasonal inspections, a specific vehicle type — attracts a customer worth keeping. State the offer plainly, give it an expiration so the mail has a reason to be acted on, and make sure the front counter can honor exactly what was printed.",
      },
      {
        heading: "4. Decide the timing and the drop schedule.",
        body: "Mail should land when the shop has capacity to absorb the response and when demand is naturally moving. Plan around the shop's real slow weeks, seasonal service patterns, and technician availability, then work backward through list pull, creative approval, print, and postal transit. One drop rarely establishes recognition. A repeated schedule to the same list — several drops across a season — consistently outperforms a single large mailing to a list you only touch once.",
        bullets: [
          "Work backward from the mail date through print, approval, and list deadlines.",
          "Mail into weeks the shop can actually staff.",
          "Repeat to a smaller list rather than mailing a larger list once.",
          "Give each drop enough spacing to read the response before the next one.",
        ],
      },
      {
        heading: "5. Track the response, not just the impression.",
        body: "Direct mail earns its budget when the shop can connect it to booked work. Put a trackable phone number on the piece, keep a landing page or scheduling link that matches the mailer's promise, and ask at the counter how the customer heard about the shop. Penetration reporting shows where the campaign reached; call and appointment data shows what came back. Judge the campaign on calls, booked appointments, show rate, and average repair order — not on the print cost per piece.",
        bullets: [
          "Trackable phone number and a matching landing page or booking link.",
          "A consistent source question at the counter and on the phone.",
          "Calls, booked appointments, show rate, and repair-order value by drop.",
          "Penetration reporting to confirm the mail reached the intended neighborhoods.",
        ],
      },
      {
        heading: "6. Plan the follow-up before the mail drops.",
        body: "The campaign continues after the postcard arrives. Someone has to answer the phone well, capture the customer's information, book the appointment, and bring that customer back a second time. Connect the mail to the shop's email, text, and CRM follow-up so a first visit generated by a postcard turns into a retained customer. This is where most disappointing direct mail campaigns actually fail — not at the mailbox.",
      },
    ],
    serviceLink: {
      href: "/services/direct-mail",
      label: "See how our managed direct mail campaigns work",
    },
    relatedSlugs: [
      "auto-repair-marketing-plan",
      "ideal-customer-profile-auto-repair-shop",
      "5-marketing-mistakes-shop-owners-make",
    ],
  },
  {
    slug: "auto-repair-marketing-plan",
    date: "Updated Aug 2026",
    originalDate: "2023-01-26",
    updatedDate: "2026-08-13",
    tag: "Planning",
    title: "How to Build an Auto Repair Marketing Plan",
    seoTitle: "Auto Repair Marketing Plan: 7-Step Guide | Turnkey",
    seoDescription:
      "Build an auto repair marketing plan around shop goals, ideal customers, budget, channels, a 12-month calendar, and useful performance metrics.",
    description:
      "A seven-step framework for turning shop goals, budget, channels, and reporting into one practical marketing plan.",
    dek: "A useful auto repair marketing plan connects the result your shop needs to the customers, campaigns, calendar, budget, and measurements that can produce it.",
    image: siteMedia.graphics.marketingPlan,
    href: resourcePath("auto-repair-marketing-plan"),
    sourceAsset: "https://turnkeyautomarketing.com/wp-content/uploads/2023/01/marketing-plan2.png",
    originalUrl:
      "https://turnkeyautomarketing.com/how-to-create-a-winning-marketing-plan-for-your-auto-repair-shop/",
    legacyPaths: ["/how-to-create-a-winning-marketing-plan-for-your-auto-repair-shop/"],
    takeaways: [
      "Start with a specific shop result, such as better-fit work, stronger retention, or more booked appointments.",
      "Give acquisition, retention, reputation, and seasonal campaigns clear jobs in a 12-month calendar.",
      "Track the path from marketing source to calls, appointments, repair orders, and revenue so the next move is defensible.",
    ],
    sections: [
      {
        heading: "1. Choose the shop result before the marketing channel.",
        body: "Start the auto repair marketing plan with one business result. A second location that needs first-time customers requires a different plan than a full shop that wants better repair-order quality or stronger retention. Write down the capacity, car-count, revenue, customer-mix, or service-category change you need, along with a timeframe. That keeps the team from buying a channel simply because a vendor recommended it.",
        bullets: [
          "How many additional booked appointments can the shop handle each week?",
          "Which services, vehicles, or customer relationships are the best fit?",
          "Is the priority acquisition, retention, reputation, reactivation, or a seasonal capacity gap?",
          "What must improve in the next 90 days, and what is a 12-month goal?",
        ],
      },
      {
        heading: "2. Establish the baseline and a workable budget.",
        body: "Record what the shop already spends, which vendors and campaigns are active, and what each one appears to produce. Include software, creative, media, mail, agency fees, discounts, and staff time when they materially affect the decision. Then set a budget range the shop can maintain long enough to learn. A smaller coordinated plan is more useful than an ambitious mix that stops before the results are clear.",
        bullets: [
          "Current monthly spend by vendor and channel.",
          "Calls, forms, booked appointments, new customers, and returning customers by source when available.",
          "Average repair order, gross profit, customer acquisition cost, and customer value using the shop's own definitions.",
          "Capacity constraints such as technician hours, advisor follow-through, or parts availability.",
        ],
      },
      {
        heading: "3. Define the customer, work, and offer.",
        body: "Decide who the plan should attract and what action they should take. The best audience is not always every driver in a radius. It may be owners of a specific vehicle type, households near a new location, lapsed customers, or current customers who need a maintenance service. Match the message and offer to that situation, then make sure the front counter can deliver the same promise when the customer calls.",
      },
      {
        heading: "4. Give every marketing channel one clear job.",
        body: "Choose channels by the role they play in the customer journey. Local SEO, Google Business Profile work, reviews, and paid search help capture existing demand. Direct mail, targeted digital campaigns, and social content can create awareness before a driver searches. Email, CRM follow-up, thank-you messages, and reactivation campaigns help the shop earn another visit from customers it already paid to acquire. Use only the channels the team can coordinate and measure.",
        bullets: [
          "Capture demand: local search visibility, reviews, website conversion, and paid search.",
          "Create demand: direct mail, targeted digital campaigns, community visibility, and social content.",
          "Retain demand: email, service reminders, CRM follow-up, thank-you messages, and reactivation.",
          "Support conversion: call handling, online scheduling, advisor scripts, offers, and follow-up.",
        ],
      },
      {
        heading: "5. Build a 12-month auto repair shop marketing calendar.",
        body: "Put recurring work, seasonal opportunities, campaign launches, creative deadlines, and review dates on one calendar. Start with the shop's real demand patterns rather than a generic holiday list. Schedule enough lead time for mail, creative approval, landing pages, lists, tracking, staff communication, and follow-up. The calendar should also show who owns each task so the owner does not become the default project manager.",
      },
      {
        heading: "6. Measure the path from response to repair order.",
        body: "A marketing dashboard should connect activity to shop outcomes. Clicks and impressions can help diagnose a campaign, but they do not show whether the right cars reached the bays. Track calls and forms, then booked appointments, show rate, repair-order quality, source mix, returning customers, and revenue. Use consistent source definitions so vendor reports can be compared instead of reviewed in separate silos.",
      },
      {
        heading: "7. Review the plan with keep, fix, stop, and start decisions.",
        body: "Review the marketing plan on a regular monthly rhythm and make a clear call on each active campaign. Keep what is producing a defensible result. Fix the message, targeting, tracking, landing page, call handling, or follow-up when the channel has potential but the system is leaking. Stop work that cannot support the goal, and start the next priority only when someone can own it. Good reporting makes the next move obvious instead of merely proving that activity happened.",
        bullets: [
          "Keep: producing the intended shop outcome at a cost the business can defend.",
          "Fix: promising channel with a specific, correctable leak.",
          "Stop: wrong audience, wrong goal, weak economics, or no accountable owner.",
          "Start: the highest-priority gap the current team can execute and measure.",
        ],
      },
    ],
    serviceLink: {
      href: "/services/marketing-consulting",
      label: "Get an experienced auto repair marketing consultant",
    },
    relatedSlugs: [
      "why-auto-repair-marketing-breaks",
      "jason-smith-marketing-plan",
      "ideal-customer-profile-auto-repair-shop",
    ],
  },
  {
    slug: "why-auto-repair-marketing-breaks",
    date: "Mar 2023",
    tag: "Strategy",
    title: "Why Auto Repair Marketing Breaks Down",
    description:
      "A Turnkey visual resource for diagnosing the problems that keep a shop marketing plan from working.",
    dek: "When marketing feels hard to trust, the issue is often unclear ownership: too many vendors, too many reports, and no one responsible for the whole board.",
    image: siteMedia.graphics.problems,
    href: resourcePath("why-auto-repair-marketing-breaks"),
    sourceAsset: "https://turnkeyautomarketing.com/wp-content/uploads/2023/03/problems.png",
    takeaways: [
      "Disconnected vendors create extra owner work.",
      "A shop needs reporting that explains customer movement, not just channel activity.",
      "Marketing leadership means owning the decision, not handing more homework to the owner.",
    ],
    sections: [
      {
        heading: "The owner becomes the connector.",
        body: "When every vendor reports in its own lane, the owner still has to connect spend, calls, appointments, capacity, and customer quality. That is usually where momentum slows down.",
      },
      {
        heading: "Leadership removes the drag.",
        body: "The better path is one team coordinating vendors, campaigns, reporting, and next steps. The owner should understand the why without having to manage every small decision.",
      },
    ],
  },
  {
    slug: "jason-smith-marketing-plan",
    date: "Jan 2023",
    tag: "Client Proof",
    title: "The Yearly Marketing Plan Jason Smith Had Never Had",
    seoTitle: "Jason Smith's Yearly Marketing Plan | Turnkey Marketing",
    description:
      "See why sitting down with Turnkey to build a yearly marketing plan was a mind-blowing moment for Jason Smith of M&M Car Care Center.",
    dek: "For the first time, Jason could see an entire year of marketing mapped to his shop—not another pile of disconnected monthly tactics.",
    image: siteMedia.graphics.jasonSmithPlan,
    imageWidth: 960,
    imageHeight: 540,
    layout: "client-proof",
    client: {
      name: "Jason Smith",
      company: "M&M Car Care Center",
      location: "Northwest Indiana",
      quote:
        "I never created a yearly marketing plan—ever. So when Jared, my Turnkey Marketing account manager, came out and we sat down and did that, it was mind blowing to me.",
      portrait: siteMedia.clients.jasonSmith,
    },
    href: resourcePath("jason-smith-marketing-plan"),
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/01/jason-smith-marketing-plan.png",
    takeaways: [
      "Long-term growth needs a visible plan.",
      "The owner should not have to invent the marketing calendar alone.",
      "The strongest plan connects campaigns, reporting, and accountability.",
    ],
    sections: [
      {
        heading: "The plan made the whole year visible.",
        body: "A yearly marketing plan gives the shop a rhythm for acquisition, retention, reputation, seasonal pushes, and budget decisions. Instead of restarting the strategy conversation every month, Jason and his team could see how the pieces worked together and what needed to happen next.",
      },
      {
        heading: "A plan is only useful when someone owns it.",
        body: "Turnkey pairs the strategy with execution and reporting, so the owner gets a clear direction without becoming the project manager for every campaign. The result is accountability, fewer last-minute decisions, and marketing that supports the shop's actual goals.",
      },
    ],
    serviceLink: {
      href: "/services/vip-marketing-manager",
      label: "See how a VIP Marketing Manager owns the plan",
    },
    relatedSlugs: ["auto-repair-marketing-plan", "why-auto-repair-marketing-breaks"],
  },
];

export const getResourcePost = (slug: string) => resourcePosts.find((post) => post.slug === slug);
