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
  layout?: "article" | "client-proof" | "marketing-ideas" | "ai-search" | "advertising-guide";
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
  faqs?: {
    q: string;
    a: string;
  }[];
  serviceLinks?: {
    href: string;
    label: string;
    description: string;
  }[];
  relatedSlugs?: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  externalSources?: {
    href: string;
    label: string;
    publisher: string;
    description: string;
  }[];
};

const resourcePath = (slug: string) => `/resources/${slug}`;

export const resourcePosts: ResourcePost[] = [
  {
    slug: "ai-search-for-auto-repair-shops",
    date: "Aug 2026",
    originalDate: "2026-08-26",
    updatedDate: "2026-08-26",
    tag: "AI Search",
    title: "Will AI Recommend Your Auto Repair Shop?",
    seoTitle: "AI Search for Auto Repair Shops: How to Get Found | Turnkey",
    seoDescription:
      "Learn how AI search may compare auto repair shops, what Google’s automated calls mean, and which practical improvements can help your shop stand out.",
    description:
      "A plain-English guide to how AI search may affect independent auto repair shops and what owners can improve now.",
    dek: "Your next customer may ask AI who to call before they ever see your website. Let’s talk about what that actually changes, what it does not, and how to make your shop the easy choice.",
    image: {
      src: "/images/resources/ai-search-abstract-sports-car.jpg",
      alt: "Abstract blurred silhouette of a sports car glowing in blue and coral light",
      position: "50% 50%",
    },
    imageWidth: 2000,
    imageHeight: 1119,
    layout: "ai-search",
    href: resourcePath("ai-search-for-auto-repair-shops"),
    sourceAsset: "User-provided artwork.",
    takeaways: [
      "Make it clear which repairs, vehicles, and customers your shop serves best.",
      "Keep your website, Google profile, reviews, photos, and contact information consistent.",
      "Focus on qualified calls and booked work instead of chasing a secret AI ranking.",
    ],
    faq: [
      {
        question: "Is there an AI for automotive repair?",
        answer:
          "Yes. AI tools now help with repair information, inspections, estimates, scheduling, customer communication, and shop operations. Drivers also use tools such as Google, ChatGPT, Gemini, and Perplexity to research symptoms and find nearby shops. These tools can organize information and suggest possibilities, but they do not replace a qualified technician inspecting the vehicle.",
      },
      {
        question: "Which AI is best for automotive?",
        answer:
          "There is no single best AI for every automotive job. A repair information platform may be useful to a technician, while Google or ChatGPT may be where a customer starts looking for a shop. Choose a tool based on the job it needs to do, the quality of its automotive data, and how well it fits your existing process. Never treat a general-purpose chatbot as the final authority on a repair diagnosis.",
      },
      {
        question: "Is there a free AI mechanic app available?",
        answer:
          "Several apps and general AI assistants offer free symptom explanations or basic car-care guidance. They can help a driver prepare better questions, but they may be incomplete or confidently wrong. For a repair shop, the safest message is simple: use the AI answer as background information, then verify the concern with a proper inspection before recommending work.",
      },
      {
        question: "How can an auto repair shop appear in AI search results?",
        answer:
          "Make the shop easy to understand and verify. Publish clear service and vehicle-specialty pages, keep the same name, address, phone number, hours, and booking information everywhere, earn recent detailed reviews, show real proof of the team and work, and make the next step obvious. AI visibility grows from a strong public record, not from one special file or trick.",
      },
      {
        question: "Does AI search replace local SEO or a Google Business Profile?",
        answer:
          "No. AI search often depends on the same public information that supports local SEO: a complete Google Business Profile, accurate directories, useful website pages, reviews, local mentions, and strong technical foundations. The goal is not to abandon local search. It is to make those same signals easier for both customers and AI systems to understand.",
      },
      {
        question: "How long does it take to improve AI visibility?",
        answer:
          "There is no fixed timeline or permanent AI ranking. Correcting shop information can improve clarity quickly, while new pages, reviews, citations, and authority take time to be discovered and trusted. Measure progress over months, test the real questions customers ask, and focus on qualified calls and booked work instead of chasing a single screenshot.",
      },
    ],
    sections: [],
    externalSources: [
      {
        href: "https://support.google.com/websearch/answer/13572151?hl=en",
        label: "Understand generative AI experiences in Google Search",
        publisher: "Google Search Help",
        description:
          "Google's official overview of generative AI search features, how responses are produced, and why important information should be checked.",
      },
      {
        href: "https://support.google.com/business/answer/3038177?hl=en",
        label: "Represent your shop accurately on Google",
        publisher: "Google Business Profile Help",
        description:
          "Official rules for consistent business names, locations, categories, service areas, and profile information.",
      },
      {
        href: "https://www.nist.gov/itl/ai-risk-management-framework",
        label: "Review the NIST AI Risk Management Framework",
        publisher: "National Institute of Standards and Technology",
        description:
          "A voluntary framework for understanding and managing the reliability, transparency, privacy, and other risks of AI systems.",
      },
    ],
    serviceLinks: [
      {
        href: "/services/digital-marketing",
        label: "Strengthen local visibility",
        description:
          "Coordinate reviews, Google Business Profile work, website audits, and digital vendors.",
      },
      {
        href: "/services/vip-marketing-manager",
        label: "Put one team in charge",
        description:
          "Bring strategy, content, execution, vendor coordination, and reporting under one accountable team.",
      },
    ],
    relatedSlugs: [
      "auto-repair-marketing-ideas",
      "auto-repair-shop-photography-guide",
      "know-like-trust-marketing-filter",
    ],
  },
  {
    slug: "auto-repair-marketing-ideas",
    date: "Updated Aug 2026",
    originalDate: "2026-08-14",
    updatedDate: "2026-08-27",
    tag: "Planning",
    title: "Auto Repair Marketing Ideas for the Problem in Front of You",
    seoTitle: "Auto Repair Marketing Ideas for Independent Shops | Turnkey",
    seoDescription:
      "Find practical auto repair marketing ideas for attracting better customers, filling slow bays, earning trust, and bringing past customers back.",
    description:
      "A decision guide for choosing the right marketing move based on the problem your shop needs to solve.",
    dek: "Use this decision guide to choose the right marketing idea for the specific shop problem in front of you—not simply the newest channel.",
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
    faq: [
      {
        question: "What is the best marketing idea for an auto repair shop?",
        answer:
          "The best idea is the one that solves the shop's current constraint. A shop that needs new customers may need stronger local visibility or targeted acquisition, while a shop with an active customer base may get a faster return from retention, reactivation, or declined-work follow-up.",
      },
      {
        question: "How should a repair shop choose which marketing channel to use?",
        answer:
          "Start with the audience, the result the shop needs, and the timeframe. Then choose a channel that can reach that audience in time, assign one person to own the campaign, and decide how calls, appointments, and completed work will be measured before launch.",
      },
      {
        question: "What are some low-cost marketing ideas for an auto repair shop?",
        answer:
          "Useful low-cost options include improving the Google Business Profile, asking eligible customers for honest reviews, following up on declined work, reactivating past customers, and turning common advisor questions into helpful content. These ideas still require staff time and consistent follow-through, so they should be planned like any other campaign.",
      },
      {
        question: "How do you know whether an auto repair marketing idea is working?",
        answer:
          "Track the path from the response to the business result: calls or forms, booked appointments, show rate, completed repair orders, customer fit, and revenue. Impressions and clicks can explain what happened, but they should not be the only evidence used to keep funding a campaign.",
      },
    ],
    externalSources: [
      {
        href: "https://www.sba.gov/business-guide/manage-your-business/marketing-sales",
        label: "Build a practical small-business marketing plan",
        publisher: "U.S. Small Business Administration",
        description:
          "A planning framework for target markets, goals, channels, budgets, sales, and post-sale customer support.",
      },
      {
        href: "https://support.google.com/business/answer/3474122?hl=en",
        label: "Follow Google's guidance for earning and managing reviews",
        publisher: "Google Business Profile Help",
        description:
          "Official recommendations for requesting genuine reviews and responding to customer feedback.",
      },
      {
        href: "https://www.usps.com/business/every-door-direct-mail.htm",
        label: "Explore neighborhood targeting with Every Door Direct Mail",
        publisher: "U.S. Postal Service",
        description:
          "USPS guidance for selecting local routes, audience characteristics, mailpiece formats, and drop dates.",
      },
    ],
    relatedSlugs: [
      "auto-repair-advertising",
      "auto-repair-marketing-plan",
      "ideal-customer-profile-auto-repair-shop",
      "direct-mail-for-repair-shops",
    ],
  },
  {
    slug: "auto-repair-advertising",
    date: "Aug 2026",
    originalDate: "2026-08-27",
    updatedDate: "2026-08-27",
    tag: "Advertising",
    title: "Auto Repair Advertising: One Plan for Every Channel",
    seoTitle: "Auto Repair Advertising: Strategy for Every Channel",
    seoDescription:
      "Build a coordinated auto repair advertising plan with clear channel roles, vendor oversight, stronger offers, and measurement from calls to repair orders.",
    description:
      "A shop-owner guide to choosing advertising channels, directing vendors, and measuring what turns into booked and completed work.",
    dek: "You should not have to become the marketing manager for every ad vendor. Start with one plan, give each channel a job, and hold the entire system accountable to the shop.",
    image: siteMedia.graphics.advertisingGoogleSearch,
    imageWidth: 1600,
    imageHeight: 1067,
    layout: "advertising-guide",
    href: resourcePath("auto-repair-advertising"),
    sourceAsset: "public/images/resources/auto-repair-advertising-google-search.webp",
    takeaways: [
      "Start with the shop problem, customer, capacity, and offer before selecting an advertising channel.",
      "Give paid search, LSA, DirectTrack, direct mail, social, retention, and local SEO distinct jobs inside one plan.",
      "Measure the path from response to qualified call, booked appointment, completed repair order, and next visit.",
    ],
    sections: [],
    externalSources: [
      {
        href: "https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business",
        label: "Review truth-in-advertising rules for small businesses",
        publisher: "Federal Trade Commission",
        description:
          "Plain-language guidance on substantiating claims, pricing, endorsements, warranties, and other advertising practices.",
      },
      {
        href: "https://support.google.com/localservices/answer/6224841?hl=en",
        label: "Check Local Services Ads eligibility and account features",
        publisher: "Google Local Services Help",
        description:
          "Google's current U.S. category list includes auto repair shops and explains lead, booking, budget, and reporting tools.",
      },
      {
        href: "https://support.google.com/analytics/answer/10597962?hl=en",
        label: "Understand cross-channel attribution settings",
        publisher: "Google Analytics Help",
        description:
          "Official documentation for attribution models, eligible channels, and lookback windows used in conversion reporting.",
      },
    ],
    faqs: [
      {
        q: "What is the best advertising for an auto repair shop?",
        a: "There is no universal best channel. The right starting point depends on whether the shop needs immediate demand, stronger local visibility, better-fit new customers, repeat visits, or support for a known slow period. The channel should follow the business problem, audience, capacity, and measurement plan.",
      },
      {
        q: "How much should an auto repair shop spend on advertising?",
        a: "Start with the result the shop needs, the capacity it can accept, and the economics of a qualified repair order. Budget should include media, creative, landing experience, call handling, follow-up, and measurement. A percentage alone cannot show whether the plan is affordable or useful.",
      },
      {
        q: "Does Turnkey manage Google Ads or Local Services Ads?",
        a: "Turnkey can oversee the broader advertising plan and coordinate outside Google Ads, LSA, website, or media vendors through the right service relationship. Turnkey directly manages DirectTrack's targeted email, streaming TV, and geofenced display campaigns. Scope is confirmed before work begins so ownership is clear.",
      },
      {
        q: "What is DirectTrack Marketing?",
        a: "DirectTrack combines super-targeted email, streaming TV commercials, geofenced display advertising, transparent ROI tracking, and a monthly reporting meeting. It is designed to create and measure local demand alongside search, direct mail, retention, and other parts of the shop's plan.",
      },
      {
        q: "How do you know whether auto repair advertising is working?",
        a: "Connect campaign source and spend to qualified calls or responses, booked appointments, show rate, completed repair orders, new-customer quality, attributable revenue when the data supports it, and the next visit. Impressions and clicks explain delivery; they do not prove shop results by themselves.",
      },
      {
        q: "Can Turnkey work with the advertising vendors I already have?",
        a: "Yes, when vendor oversight is part of the selected Turnkey service. The goal is to give each partner a clear objective, audience, offer, handoff, and reporting expectation so the owner is not left reconciling disconnected recommendations.",
      },
    ],
    serviceLinks: [
      {
        href: "/services/directtrack-marketing",
        label: "Explore DirectTrack Marketing",
        description:
          "See the targeted email, streaming TV, geofenced display campaigns, and reporting Turnkey manages directly.",
      },
      {
        href: "/services/marketing-consulting",
        label: "Get experienced advertising direction",
        description:
          "Review spend, vendors, reporting, and the next move with an auto-repair marketing strategist.",
      },
    ],
    relatedSlugs: [
      "auto-repair-marketing-ideas",
      "auto-repair-marketing-plan",
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
    faq: [
      {
        question: "What is an ideal customer profile for an auto repair shop?",
        answer:
          "It is a practical description of the customers, vehicles, repair work, values, and service expectations that create a strong fit for the shop. It should help the team make better decisions about marketing, offers, scheduling, and the customer experience.",
      },
      {
        question: "How can a repair shop identify its best customers?",
        answer:
          "Start with customers the advisors and technicians would gladly serve again, then compare patterns in repair-order quality, retention, vehicle mix, communication, and referrals. The goal is to find evidence of a healthy relationship, not simply the customers who spent the most on one visit.",
      },
      {
        question: "Can an ideal customer profile be too narrow?",
        answer:
          "Yes. A profile becomes unhelpful when it excludes viable customers without a business reason or depends on stereotypes instead of shop data. Keep the focus on service fit, customer needs, geography, vehicle types, and the experience the shop can consistently deliver.",
      },
      {
        question: "How often should a repair shop update its customer profile?",
        answer:
          "Review it at least once a year and whenever capacity, staffing, specialties, location, or business goals change. Use current repair-order data, call recordings, reviews, and advisor feedback to confirm whether the profile still describes the relationships the shop wants more of.",
      },
    ],
    externalSources: [
      {
        href: "https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis",
        label: "Use market research to find and understand customers",
        publisher: "U.S. Small Business Administration",
        description:
          "A guide to demand, market size, location, saturation, pricing, and direct customer research.",
      },
      {
        href: "https://www.census.gov/programs-surveys/sis/resources/data-tools/business-builder.html",
        label: "Research local customers with Census Business Builder",
        publisher: "U.S. Census Bureau",
        description:
          "A free tool for exploring local demographic, socioeconomic, business, and consumer-spending data.",
      },
      {
        href: "https://www.sba.gov/business-guide/manage-your-business/marketing-sales",
        label: "Turn a target market into a marketing action plan",
        publisher: "U.S. Small Business Administration",
        description:
          "Official planning guidance connecting audience, competitive advantage, marketing goals, channels, and customer support.",
      },
    ],
    serviceLinks: [
      {
        href: "/services/marketing-consulting",
        label: "See how marketing consulting sharpens your strategy",
        description:
          "Use the customer profile to guide your audience, offer, channels, and follow-up.",
      },
    ],
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
    faq: [
      {
        question: "What photos should an auto repair shop website include?",
        answer:
          "Show the exterior and entrance, front counter, waiting area, owner, advisors, technicians, inspections, equipment, common vehicle types, and the key handoff. The library should help a new customer understand who they will meet, where they will go, and how the shop cares for a vehicle.",
      },
      {
        question: "Should a repair shop hire a professional photographer?",
        answer:
          "A professional is useful when the shop needs a coordinated library for its website, ads, print, recruiting, and social media. A capable team member can still capture timely day-to-day images, but the shop should maintain consistent quality, lighting, framing, and permission practices.",
      },
      {
        question: "Do employees and customers need to sign photo releases?",
        answer:
          "Get written permission before using recognizable employees or customers in marketing, and confirm how the images may be used. Requirements can vary by situation and location, so the release process should be reviewed with qualified legal counsel when needed.",
      },
      {
        question: "How often should an auto repair shop update its photos?",
        answer:
          "Refresh the library when the team, building, branding, equipment, or customer experience changes. Review prominent website and Google Business Profile images at least yearly so customers are not introduced to people or facilities they will no longer see.",
      },
    ],
    externalSources: [
      {
        href: "https://support.google.com/business/answer/7213077?hl=en",
        label: "Review Google Business Profile photo and video policies",
        publisher: "Google Business Profile Help",
        description:
          "Google's official requirements for imagery and other content published to a Business Profile.",
      },
      {
        href: "https://www.copyright.gov/circs/circ42.pdf",
        label: "Understand copyright registration for photographs",
        publisher: "U.S. Copyright Office",
        description:
          "The Copyright Office's guide to authorship, ownership, publication, and registration of photographic work.",
      },
      {
        href: "https://www.w3.org/WAI/tutorials/images/decision-tree/",
        label: "Choose appropriate alternative text for website images",
        publisher: "W3C Web Accessibility Initiative",
        description:
          "A practical decision tree for deciding when an image needs descriptive alt text and when it should be treated as decorative.",
      },
    ],
    serviceLinks: [
      {
        href: "/services/digital-marketing",
        label: "See how digital marketing strengthens local trust",
        description:
          "Put a current, credible photo library to work across your local online presence.",
      },
    ],
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
    faq: [
      {
        question: "What does it mean for a repair shop to be the guide?",
        answer:
          "It means the customer remains the main character while the shop provides empathy, expertise, and a clear path forward. The message should show that the team understands the driver's concern, can solve it, and will make the next step easy to understand.",
      },
      {
        question: "What should an auto repair shop say on its homepage?",
        answer:
          "Lead with the customer problem or outcome, explain who the shop helps, show relevant proof, and give one clear next action. Services, credentials, and equipment matter, but they work best when they support a customer-centered promise instead of replacing it.",
      },
      {
        question: "How can a repair shop show authority without sounding self-centered?",
        answer:
          "Connect every credential to a customer benefit. Reviews, technician certifications, warranties, original photos, and a clear inspection process build authority when they help the driver understand why the shop is prepared to solve the problem.",
      },
      {
        question: "How can a shop tell whether its message is clear?",
        answer:
          "Ask someone unfamiliar with the business to review the page for a few seconds and explain who it serves, what problem it solves, and what to do next. Call quality, booking rate, repeated customer questions, and advisor feedback can then show where the message still creates confusion.",
      },
    ],
    externalSources: [
      {
        href: "https://digital.gov/guides/plain-language",
        label: "Write clear, useful customer-facing content",
        publisher: "Digital.gov",
        description:
          "Federal plain-language guidelines for organizing information, choosing words, writing sentences, and designing readable content.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business",
        label: "Keep marketing claims truthful and supportable",
        publisher: "Federal Trade Commission",
        description:
          "Small-business guidance on the evidence needed for advertising claims and the proper use of endorsements.",
      },
      {
        href: "https://support.google.com/business/answer/3474122?hl=en",
        label: "Use reviews as honest, customer-centered proof",
        publisher: "Google Business Profile Help",
        description:
          "Official advice for requesting genuine feedback and writing relevant, professional review responses.",
      },
    ],
    serviceLinks: [
      {
        href: "/services/marketing-consulting",
        label: "Build a clearer shop message with marketing consulting",
        description:
          "Align the customer problem, proof, offer, and next step before the campaign goes live.",
      },
    ],
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
    faq: [
      {
        question: "What is know-like-trust marketing?",
        answer:
          "Know-like-trust is a simple way to evaluate whether customers can recognize a business, relate to its message, and find enough proof to act. For a repair shop, those stages should work together across search, the website, reviews, mail, social content, and the service experience.",
      },
      {
        question: "Which part of know-like-trust should a repair shop fix first?",
        answer:
          "Fix the weakest stage that blocks the next action. More awareness will not help if customers cannot tell what the shop does, and a friendly message will not convert if the hours, address, reviews, or booking process create doubt.",
      },
      {
        question: "Can the know-like-trust filter be used for ads and direct mail?",
        answer:
          "Yes. The piece should make the sender recognizable, use language relevant to the intended customer, provide believable proof, and lead to a landing page or phone experience that matches the promise. A discount alone rarely covers all three stages.",
      },
      {
        question: "How do you measure know, like, and trust?",
        answer:
          "Use a combination of signals instead of one score. Search visibility and reach can indicate recognition; engagement and response quality can show relevance; reviews, call-to-book rate, repeat visits, and customer feedback can reveal whether the shop is earning trust.",
      },
    ],
    externalSources: [
      {
        href: "https://support.google.com/business/answer/3038177?hl=en",
        label: "Represent your shop consistently on Google",
        publisher: "Google Business Profile Help",
        description:
          "Google's official rules for accurate business names, addresses, categories, service areas, and profile content.",
      },
      {
        href: "https://support.google.com/business/answer/3474122?hl=en",
        label: "Build trust with genuine reviews and thoughtful replies",
        publisher: "Google Business Profile Help",
        description:
          "Best practices for asking for reviews, responding publicly, and avoiding prohibited incentives.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews",
        label: "Follow federal guidance for reviews and testimonials",
        publisher: "Federal Trade Commission",
        description:
          "Current guidance on honest endorsements, review solicitation, disclosures, and the Consumer Reviews and Testimonials Rule.",
      },
    ],
    serviceLinks: [
      {
        href: "/services/marketing-consulting",
        label: "Use marketing consulting to strengthen the whole campaign",
        description:
          "Review the audience, message, proof, and next step as one coordinated system.",
      },
      {
        href: "/services/digital-marketing",
        label: "Strengthen local trust with digital marketing",
        description:
          "Keep the shop information, reviews, and online presence consistent where drivers check first.",
      },
    ],
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
    faq: [
      {
        question: "What is the most common auto repair shop marketing mistake?",
        answer:
          "A common mistake is running disconnected tactics without one shop-level goal or accountable owner. Mail, ads, reviews, social media, and CRM activity can all stay busy while nobody connects them to calls, booked appointments, customer fit, and completed work.",
      },
      {
        question: "How can a shop owner tell whether marketing money is being wasted?",
        answer:
          "Start by checking whether each campaign has a defined audience, offer, owner, timeframe, and measurable business result. If the team cannot connect spend to responses, appointments, repair orders, or a clear strategic purpose, the next step is to repair the tracking before increasing the budget.",
      },
      {
        question: "Is weak marketing always the vendor's fault?",
        answer:
          "No. The leak may be in targeting, the offer, the landing page, call handling, scheduling, capacity, or follow-up after the first visit. Review the whole customer path before deciding that the channel or vendor is the only problem.",
      },
      {
        question: "Who should own marketing in an independent repair shop?",
        answer:
          "One person or team should be accountable for the overall plan, even when specialists handle individual channels. Ownership means coordinating deadlines and vendors, reviewing results, and making clear keep, fix, stop, or start decisions so the shop owner is not the default project manager.",
      },
    ],
    externalSources: [
      {
        href: "https://www.sba.gov/business-guide/manage-your-business/marketing-sales",
        label: "Connect marketing goals, costs, and sales results",
        publisher: "U.S. Small Business Administration",
        description:
          "A small-business framework for setting goals, choosing channels, planning customer support, and comparing marketing cost with revenue.",
      },
      {
        href: "https://support.google.com/analytics/answer/9267568?hl=en",
        label: "Measure the actions that matter with key events",
        publisher: "Google Analytics Help",
        description:
          "Official guidance for identifying important actions and evaluating the channels that contribute to them.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business",
        label: "Avoid unsupported claims and deceptive offers",
        publisher: "Federal Trade Commission",
        description:
          "Truth-in-advertising guidance covering claims, pricing, guarantees, endorsements, and promotional practices.",
      },
    ],
    serviceLinks: [
      {
        href: "/services/marketing-consulting",
        label: "Find the leaks with marketing consulting",
        description: "Get a practical view of what to keep, fix, stop, and run next.",
      },
      {
        href: "/services/vip-marketing-manager",
        label: "Put one team in charge with a VIP Marketing Manager",
        description:
          "Coordinate the moving parts so the owner is not left connecting every report and vendor.",
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
    faq: [
      {
        question: "Does direct mail still work for auto repair shops?",
        answer:
          "It can work when the list, offer, timing, creative, tracking, and front-counter follow-up support the same goal. A postcard sent once to a broad list is much harder to evaluate than a repeated, trackable campaign aimed at households the shop can realistically serve.",
      },
      {
        question: "How often should an auto repair shop send direct mail?",
        answer:
          "There is no universal schedule, but repeated contact with a qualified list usually provides a better test than one large drop. Plan the cadence around seasonal demand, shop capacity, postal timing, budget, and enough space between drops to measure response.",
      },
      {
        question: "How should a repair shop choose a direct mail list?",
        answer:
          "Begin with a realistic drive-time area, then use household and vehicle characteristics that resemble the shop's best current customers. Keep new movers, prospects, current customers, and lapsed customers in separate groups because each audience needs a different message and measurement plan.",
      },
      {
        question: "How do you track direct mail return on investment?",
        answer:
          "Use a trackable phone number or campaign-specific response path, record the source during calls and check-in, and connect responses to booked and completed repair orders. Review show rate, repair-order value, customer acquisition cost, and whether first-time customers return—not only coupon redemptions or print cost.",
      },
    ],
    externalSources: [
      {
        href: "https://www.usps.com/business/every-door-direct-mail.htm",
        label: "Plan a targeted Every Door Direct Mail campaign",
        publisher: "U.S. Postal Service",
        description:
          "The official EDDM workflow for choosing routes and demographics, preparing mailpieces, scheduling, and drop-off.",
      },
      {
        href: "https://pe.usps.com/MailpieceDesign",
        label: "Check USPS mailpiece design requirements",
        publisher: "U.S. Postal Service Postal Explorer",
        description:
          "Design resources that help mail qualify for the intended postage rates and move through processing accurately.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business",
        label: "Make direct-mail offers clear and supportable",
        publisher: "Federal Trade Commission",
        description:
          "Federal guidance for advertising claims, prices, guarantees, disclosures, and endorsements across media, including print.",
      },
    ],
    serviceLinks: [
      {
        href: "/services/direct-mail",
        label: "See how our managed direct mail campaigns work",
        description:
          "Plan the list, offer, timing, tracking, and follow-up as one accountable campaign.",
      },
    ],
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
      "Track the path from marketing source to calls, appointments, repair orders, and revenue so you can decide what to keep, change, or stop.",
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
        body: "Review the marketing plan each month and make a clear call on each active campaign. Keep campaigns that produce the shop results you planned for. Fix the message, targeting, tracking, landing page, call handling, or follow-up when the channel has potential but the system is leaking. Stop work that cannot support the goal, and start the next priority only when someone can own it. Good reporting makes the next move obvious instead of merely proving that activity happened.",
        bullets: [
          "Keep: producing the intended shop outcome at a cost the business can defend.",
          "Fix: promising channel with a specific, correctable leak.",
          "Stop: wrong audience, wrong goal, weak economics, or no accountable owner.",
          "Start: the highest-priority gap the current team can execute and measure.",
        ],
      },
    ],
    faq: [
      {
        question: "What should an auto repair shop marketing plan include?",
        answer:
          "Include the business result, target customers and repair work, baseline performance, budget, channel roles, offers, a 12-month calendar, campaign owners, and the metrics used to make decisions. The plan should also account for shop capacity and front-counter follow-up so marketing does not promise work the team cannot support.",
      },
      {
        question: "How much should an auto repair shop spend on marketing?",
        answer:
          "There is no percentage that fits every shop. Build the budget from growth goals, current revenue and margin, customer value, local competition, existing demand, and the number of additional appointments the shop can profitably handle.",
      },
      {
        question: "How often should a repair shop review its marketing plan?",
        answer:
          "Review campaign performance monthly and revisit the larger plan at least quarterly. Seasonal demand, staffing, capacity, vehicle mix, and business priorities can change, so the calendar and budget should be adjusted with evidence rather than left untouched for a full year.",
      },
      {
        question: "Which marketing channels should an auto repair shop use?",
        answer:
          "Choose channels by the job they need to perform. Local search, reviews, the website, and paid search can capture demand; direct mail and targeted campaigns can create demand; email, reminders, reactivation, and follow-up can help retain customers the shop already earned.",
      },
    ],
    externalSources: [
      {
        href: "https://www.sba.gov/business-guide/manage-your-business/marketing-sales",
        label: "Structure a small-business marketing plan",
        publisher: "U.S. Small Business Administration",
        description:
          "A practical outline for target market, competitive advantage, goals, action plans, budgets, and return on investment.",
      },
      {
        href: "https://www.census.gov/programs-surveys/sis/resources/data-tools/business-builder.html",
        label: "Use local market data to refine the plan",
        publisher: "U.S. Census Bureau",
        description:
          "Census Business Builder combines local demographic, socioeconomic, business, and consumer-spending information.",
      },
      {
        href: "https://support.google.com/analytics/answer/10597962?hl=en",
        label: "Choose and document an attribution approach",
        publisher: "Google Analytics Help",
        description:
          "Official documentation for attribution models, conversion windows, and which paid and organic channels receive credit.",
      },
    ],
    serviceLinks: [
      {
        href: "/services/marketing-consulting",
        label: "Get an experienced auto repair marketing consultant",
        description:
          "Build a clear plan around your goals, capacity, budget, and the results you want to measure.",
      },
      {
        href: "/services/vip-marketing-manager",
        label: "See how a VIP Marketing Manager carries the plan forward",
        description:
          "Keep campaigns, reporting, and next steps coordinated after the plan is built.",
      },
    ],
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
        body: "When each vendor only reports on its own work, the owner still has to connect spend, calls, appointments, capacity, and customer quality. That is usually where momentum slows down.",
      },
      {
        heading: "Leadership removes the drag.",
        body: "The better path is one team coordinating vendors, campaigns, reporting, and next steps. The owner should understand the why without having to manage every small decision.",
      },
    ],
    faq: [
      {
        question: "Why is my auto repair shop marketing not working?",
        answer:
          "The problem may be unclear goals, disconnected vendors, weak targeting, inconsistent tracking, poor call handling, or follow-up that stops after the first response. Review the complete path from the campaign to the booked and completed repair order before blaming one channel.",
      },
      {
        question: "Can too many marketing vendors hurt results?",
        answer:
          "Specialists can be valuable, but results suffer when each vendor works toward a different definition of success and nobody coordinates the customer journey. One accountable owner should align the message, timing, tracking, landing experience, reporting, and next decisions across vendors.",
      },
      {
        question: "Which marketing numbers should a repair shop review?",
        answer:
          "Track calls and forms, booked appointments, show rate, completed repair orders, customer source, repair-order quality, repeat visits, revenue, and spend. Channel metrics such as impressions and clicks are useful diagnostics, but they should connect to outcomes the shop can recognize.",
      },
      {
        question: "When should a repair shop stop a marketing campaign?",
        answer:
          "Stop when the audience or goal is wrong, the economics cannot work, or no one can own the campaign well enough to learn from it. If the channel has potential but the leak is specific—such as the offer, tracking, landing page, or call handling—fix and retest that problem before abandoning it.",
      },
    ],
    externalSources: [
      {
        href: "https://www.sba.gov/business-guide/manage-your-business/marketing-sales",
        label: "Give the marketing plan shared goals and actions",
        publisher: "U.S. Small Business Administration",
        description:
          "A framework for aligning audience, channels, budget, customer support, sales goals, and the work required to reach them.",
      },
      {
        href: "https://support.google.com/analytics/answer/10597962?hl=en",
        label: "Understand why channel reports assign credit differently",
        publisher: "Google Analytics Help",
        description:
          "Google's explanation of attribution models, lookback windows, and channel eligibility in conversion reporting.",
      },
      {
        href: "https://support.google.com/business/answer/3403100?hl=en",
        label: "Assign Business Profile access without sharing passwords",
        publisher: "Google Business Profile Help",
        description:
          "Official owner and manager roles for giving vendors appropriate access while the business retains control.",
      },
    ],
    serviceLinks: [
      {
        href: "/services/marketing-consulting",
        label: "Diagnose the gaps with marketing consulting",
        description:
          "Clarify the goals, priorities, and decisions that should guide the whole effort.",
      },
      {
        href: "/services/vip-marketing-manager",
        label: "See how a VIP Marketing Manager coordinates the whole plan",
        description:
          "Bring campaigns, vendors, reporting, and next steps under one accountable team.",
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
        body: "A yearly marketing plan sets a schedule for attracting customers, encouraging repeat visits, managing reviews, and planning seasonal campaigns and spending. Instead of restarting the strategy conversation every month, Jason and his team could see how the pieces worked together and what needed to happen next.",
      },
      {
        heading: "A plan is only useful when someone owns it.",
        body: "Turnkey pairs the strategy with execution and reporting, so the owner gets a clear direction without becoming the project manager for every campaign. The result is accountability, fewer last-minute decisions, and marketing that supports the shop's actual goals.",
      },
    ],
    faq: [
      {
        question: "What is a yearly marketing plan for an auto repair shop?",
        answer:
          "It is a 12-month view of the shop's acquisition, retention, reputation, seasonal campaigns, budget, deadlines, and dates to review results. The plan gives each activity a purpose and helps the team prepare before a slow week or service opportunity becomes urgent.",
      },
      {
        question: "What should go on an annual auto repair marketing calendar?",
        answer:
          "Include recurring campaigns, seasonal service opportunities, customer follow-up, review and reputation work, direct-mail dates, creative deadlines, budget checkpoints, and reporting meetings. Add the person responsible for each task so the calendar shows ownership as well as timing.",
      },
      {
        question: "How far in advance should a repair shop plan marketing?",
        answer:
          "Set the annual direction before the year or planning cycle begins, then work at least several weeks ahead of each campaign. Direct mail, creative approvals, landing pages, lists, tracking, and staff preparation all need lead time, while monthly reviews keep the plan responsive.",
      },
      {
        question: "Who should manage the yearly marketing plan?",
        answer:
          "One accountable person or team should coordinate the plan, vendors, approvals, reporting, and next actions. The owner should set goals and understand the decisions without having to chase every deadline or translate separate vendor reports alone.",
      },
    ],
    externalSources: [
      {
        href: "https://www.sba.gov/business-guide/manage-your-business/marketing-sales",
        label: "Map annual marketing goals into an action plan",
        publisher: "U.S. Small Business Administration",
        description:
          "SBA guidance for defining the target market, annual goals, channels, budget, customer support, and sales process.",
      },
      {
        href: "https://support.google.com/analytics/answer/9267568?hl=en",
        label: "Choose measurable actions for the yearly scorecard",
        publisher: "Google Analytics Help",
        description:
          "Official guidance for tracking important actions and evaluating how marketing touchpoints contribute to them.",
      },
      {
        href: "https://www.census.gov/programs-surveys/sis/resources/data-tools/business-builder.html",
        label: "Ground yearly decisions in local market data",
        publisher: "U.S. Census Bureau",
        description:
          "A free source of local demographic, economic, business, and consumer-spending data for planning and expansion.",
      },
    ],
    serviceLinks: [
      {
        href: "/services/vip-marketing-manager",
        label: "See how a VIP Marketing Manager owns the plan",
        description:
          "Get strategy, execution, reporting, and next steps coordinated around your shop.",
      },
    ],
    relatedSlugs: ["auto-repair-marketing-plan", "why-auto-repair-marketing-breaks"],
  },
];

export const getResourcePost = (slug: string) => resourcePosts.find((post) => post.slug === slug);
