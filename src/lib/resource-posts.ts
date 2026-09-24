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
  layout?:
    | "reputation-guide"
    | "ai-reviews"
    | "article"
    | "client-proof"
    | "marketing-ideas"
    | "ai-search"
    | "advertising-guide";
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
    link?: {
      href: string;
      label: string;
    };
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
    slug: "auto-repair-reputation-management",
    date: "Sep 2026",
    originalDate: "2026-09-22",
    updatedDate: "2026-09-22",
    tag: "Auto Repair Reputation",
    title: "Reputation Management for Auto Repair Shops: A Practical Guide",
    seoTitle: "Auto Repair Reputation Management Guide | Turnkey",
    seoDescription:
      "Build a practical reputation management plan for your auto repair shop, from honest review requests and replies to customer feedback and better marketing.",
    description:
      "Build trust with honest reviews, clear follow-through, and marketing that matches your shop's customer experience.",
    dek: "Earn trust at every visit. Make honest feedback, thoughtful replies, and better follow-through part of your shop's routine.",
    image: {
      ...siteMedia.shops.mikes,
      alt: "A Turnkey Marketing team member discussing a plan across an auto shop counter",
    },
    imageWidth: 1200,
    imageHeight: 900,
    layout: "reputation-guide",
    href: resourcePath("auto-repair-reputation-management"),
    sourceAsset: "Existing approved Turnkey site photo: public/site-media/mikes-auto-works.webp",
    takeaways: [
      "Make accurate information and honest review requests a habit.",
      "Assign customer follow-up separately from public replies.",
      "Build marketing around strengths your team can deliver.",
    ],
    sections: [],
    faq: [
      {
        question: "How much do reputation management services typically cost?",
        answer:
          "Cost depends on the number of locations, platforms, software features, and how much work a provider handles. Request an itemized quote separating software, setup, monitoring, replies, and reporting. Compare the work included and your team's remaining responsibilities before comparing prices.",
      },
    ],
    relatedSlugs: ["analyze-google-reviews-with-ai", "auto-repair-marketing-plan"],
  },
  {
    slug: "analyze-google-reviews-with-ai",
    date: "Sep 2026",
    originalDate: "2026-09-15",
    updatedDate: "2026-09-22",
    tag: "Auto Repair Reputation",
    title: "How to Use AI to Analyze Your Auto Repair Shop’s Google Reviews",
    seoTitle: "AI Google Review Analysis for Auto Repair Shops | Turnkey",
    seoDescription:
      "Use AI to find patterns in your auto repair shop’s Google reviews, improve customer experiences, and build marketing around what customers value.",
    description:
      "A practical guide to turning customer feedback into operational improvements and stronger marketing, with a reusable AI prompt.",
    dek: "Find what customers value, fix recurring problems, and turn your shop’s Google reviews into a practical plan. Includes a copy-and-paste AI prompt.",
    image: {
      src: "/images/resources/ai-google-review-insights.png",
      alt: "Illustration of review cards grouped into strengths to keep, problems to fix, and messages to share",
      position: "50% 50%",
    },
    imageWidth: 1200,
    imageHeight: 900,
    layout: "ai-reviews",
    href: resourcePath("analyze-google-reviews-with-ai"),
    sourceAsset: "Original Turnkey editorial illustration created for this article.",
    takeaways: [
      "Ask AI to show the reviews behind each pattern.",
      "Choose one operational improvement and measure what changes.",
      "Build marketing around strengths your team can consistently deliver.",
    ],
    sections: [],
    faq: [
      {
        question: "How can I analyze Google reviews?",
        answer:
          "Choose a date range, collect the reviews, and group written comments by topic. AI can help organize the feedback. Check its counts and supporting examples, then choose a specific improvement or marketing opportunity to test.",
      },
      {
        question: "Is there an AI that can respond to Google reviews?",
        answer:
          "Yes. AI assistants and review management tools can draft replies. Check each reply for accuracy and tone before posting. A polite response matters, and the underlying complaint still needs attention. Google says helpful replies can help a business stand out.",
      },
    ],
    relatedSlugs: ["be-the-guide-auto-repair-shop-messaging", "ai-search-for-auto-repair-shops"],
  },
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
    dek: "Use this decision guide to choose the right marketing idea for the specific shop problem in front of you, not simply the newest channel.",
    image: siteMedia.hero,
    imageWidth: 1200,
    imageHeight: 800,
    layout: "marketing-ideas",
    href: resourcePath("auto-repair-marketing-ideas"),
    sourceAsset: "public/site-media/hero-thunderbird-shop.webp",
    takeaways: [
      "Choose the shop problem before you choose a marketing channel.",
      "Match every campaign to a specific audience, owner, timeframe, and business result.",
      "Measure the path from response to booked work and the next visit, not just impressions or leads.",
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
    dek: "An ideal customer profile helps your team choose the right messages, offers, channels, and service priorities. It starts with the customers you already love working with, not a guess about what every driver wants.",
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
      "Build the profile from your best current customers, not a demographic someone made up.",
      "Describe the jobs, values, and service experience that make a customer a strong fit for your shop.",
      "Then put the profile to work on real decisions: your message, your offer, your channels, and your follow-up.",
    ],
    sections: [
      {
        heading: "Start with the customers you would gladly clone.",
        body: "Sit down with your advisors and leadership team and ask one question: which five to ten customers would you gladly see more often? Write the names down. Then look for what those relationships have in common beyond the repair order. A strong-fit customer usually values good advice, approves the work the vehicle needs, keeps up with maintenance, communicates well, and refers friends who act the same way.",
        bullets: [
          "Which vehicles and services are a healthy fit for your bays?",
          "Which customers follow a maintenance plan instead of waiting for a breakdown?",
          "Which customers care more about safety, reliability, convenience, or expertise than the lowest price?",
          "Which relationships are profitable without wearing out the front counter?",
        ],
      },
      {
        heading: "Describe the situation, not a stereotype.",
        body: "Age and income can help, but they will not tell you what to say. A profile becomes useful when it explains what the customer is trying to get done. Where do they live? What do they drive? Who depends on that vehicle every morning? Do they prefer a call, a text, or an email? And what makes choosing a repair shop feel risky to them? Answer those questions and your marketing can speak to a real decision instead of a stereotype.",
      },
      {
        heading: "Turn the profile into marketing choices.",
        body: "Now use the profile as a filter for every campaign. A customer who needs predictable transportation may respond to maintenance planning, easy scheduling, and clear updates. A European-car owner may care more about specialized knowledge and the right diagnostic equipment. Same shop, different message. Match the promise, proof, offer, and channel to the customer you want, not to everyone within driving distance.",
        bullets: [
          "Lead with the customer problem your shop is best equipped to solve.",
          "Show the proof that matters to that person, such as reviews, credentials, photos, or your process.",
          "Choose channels based on where that customer actually pays attention.",
          "Give your advisors the same language, so the phone call matches the campaign.",
        ],
      },
      {
        heading: "Validate the profile with shop data.",
        body: "Treat your first profile as a working theory, then test it. Compare it with repair-order quality, vehicle mix, retention, declined work, call recordings, reviews, and customer feedback. Does the shop data back it up? Revisit the profile when capacity, staffing, specialty, service area, or business goals change. The useful profile is the one that keeps improving real decisions, not the one that looked good on paper last year.",
      },
    ],
    faq: [
      {
        question: "What is an ideal customer profile for an auto repair shop?",
        answer:
          "It is a practical description of the customers, vehicles, repair work, values, and service expectations that fit your shop best. A good profile helps your team make better decisions about marketing, offers, scheduling, and the customer experience.",
      },
      {
        question: "How can a repair shop identify its best customers?",
        answer:
          "Start with the customers your advisors and technicians would gladly serve again. Then compare patterns in repair-order quality, retention, vehicle mix, communication, and referrals. You are looking for evidence of a healthy, lasting relationship, not simply the customer who spent the most on one visit.",
      },
      {
        question: "Can an ideal customer profile be too narrow?",
        answer:
          "Yes. A profile stops being helpful when it shuts out good customers without a business reason or leans on stereotypes instead of shop data. Keep the focus on service fit, customer needs, geography, vehicle types, and the experience your shop can deliver every time.",
      },
      {
        question: "How often should a repair shop update its customer profile?",
        answer:
          "Review it at least once a year, and any time capacity, staffing, specialties, location, or business goals change. Use current repair-order data, call recordings, reviews, and advisor feedback to confirm the profile still describes the customers you want more of.",
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
    dek: "Original photography lets customers meet your people, see your place, and understand how you work before they ever make the first call.",
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
      "Photograph the whole customer experience, not just cars on lifts.",
      "Get the shop, vehicles, team, and permissions ready before the photographer arrives.",
      "Secure broad usage rights and organize the final library so the photos keep working for years.",
    ],
    sections: [
      {
        heading: "Build the shot list around customer questions.",
        body: "Think about what a new customer wonders before they call. Who will greet me? Does this place look professional? Will they take care of my car? Your photos should answer those questions, so build the shot list around them. Mix wide shots of the building with close details, shoot both horizontal and vertical, and capture posed portraits alongside candid moments of real work.",
        bullets: [
          "Exterior, roadside sign, parking, entrance, front counter, and waiting area.",
          "Owner, advisors, technicians, and a friendly full-team portrait.",
          "Inspections, diagnostics, repairs, customer updates, the key handoff, and customer care.",
          "Specialty equipment, certifications, amenities, loaners, and the details that make the shop yours.",
          "Community involvement and the vehicles your best customers drive.",
        ],
      },
      {
        heading: "Prepare the shop for one productive day.",
        body: "Pick a day when your key people can be in the photos without wrecking the schedule. Clean every work area the camera will see. Clear clutter and anything showing confidential customer information. Stage vehicles that represent the work you want more of, and ask everyone to wear clean, matching uniforms. Send the photographer the shot list and a few brand examples ahead of time, so nobody is figuring it out on the shop floor.",
      },
      {
        heading: "Protect the right to use every image.",
        body: "Read the agreement before the shoot, not after. It should give your shop lasting permission to use the final photos on your website, social channels, ads, email, print, recruiting, and future campaigns. Get written releases from any customer or team member who can be recognized, and confirm whether the photographer may use the work in their own portfolio.",
      },
      {
        heading: "Make the library easy to reuse.",
        body: "Ask for full-resolution originals plus web-ready versions. Sort the files by people, facility, service, equipment, community, and orientation, and use descriptive filenames so anyone on the team can find the right shot in a minute. Refresh staff and facility photos when the team or the customer experience changes. A small, current library earns more trust than a large one full of people who no longer work there.",
      },
    ],
    faq: [
      {
        question: "What photos should an auto repair shop website include?",
        answer:
          "Show the exterior and entrance, front counter, waiting area, owner, advisors, technicians, inspections, equipment, the vehicles you commonly service, and the key handoff. Together, those photos should tell a new customer who they will meet, where they will go, and how your shop cares for a vehicle.",
      },
      {
        question: "Should a repair shop hire a professional photographer?",
        answer:
          "A professional makes sense when you need a coordinated library for your website, ads, print, recruiting, and social media. A capable team member can still capture day-to-day moments as they happen. Either way, keep the quality, lighting, framing, and permission practices consistent.",
      },
      {
        question: "Do employees and customers need to sign photo releases?",
        answer:
          "Get written permission before using a recognizable employee or customer in your marketing, and be clear about how the photos may be used. Requirements can vary by situation and location, so review your release process with qualified legal counsel when needed.",
      },
      {
        question: "How often should an auto repair shop update its photos?",
        answer:
          "Refresh the library when your team, building, branding, equipment, or customer experience changes. Review the most visible photos on your website and Google Business Profile at least once a year, so customers are not introduced to people or rooms they will never see.",
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
    dek: "Your shop has the expertise, but the customer is the main character. Strong messaging shows you understand their problem and can guide them to a safe, reliable vehicle.",
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
      "The customer is the hero. Your shop earns attention by being a useful guide.",
      "Good guides pair empathy with specific, believable authority.",
      "A simple plan and one clear next step take the uncertainty out of booking service.",
    ],
    sections: [
      {
        heading: "Move the spotlight from the shop to the customer.",
        body: "Most shop marketing opens with years in business, certifications, equipment, or a long list of services. Those facts matter. But the customer's first question is simpler: do you understand what I am dealing with? So lead with the outcome they need. A safe commute. A dependable family vehicle. A clear explanation. Confidence that the repair was done right.",
      },
      {
        heading: "Show empathy and authority together.",
        body: "Empathy tells the customer, “We understand why this is frustrating.” Authority shows them your team can fix it. You need both. Empathy without proof sounds vague, and credentials without empathy sound like you are talking about yourself. Pair a customer-centered statement with reviews, technician credentials, a transparent process, or relevant experience.",
        bullets: [
          "Empathy: name the inconvenience, worry, or uncertainty the driver feels.",
          "Authority: show relevant proof without turning the message into a résumé.",
          "Plan: explain the next two or three steps in plain language.",
          "Action: make it easy to call, schedule, or ask a question.",
        ],
      },
      {
        heading: "Rewrite “we” statements as customer outcomes.",
        body: "Here is a simple editing exercise. Take your homepage or your latest ad and circle every “we,” “our,” and “us.” Keep the ones that carry necessary proof, then rewrite the rest around what the customer gets. “We perform digital inspections” becomes “See what we see before you approve the work.” The capability stays the same. The benefit becomes easy to understand.",
      },
      {
        heading: "Carry the message through the whole experience.",
        body: "Being the guide cannot stop at the website. Use the same clear language in your phone scripts, appointment confirmations, inspections, estimates, follow-up, social content, and review responses. When the message sounds the same at every step, the marketing promise becomes an experience customers can recognize and recommend.",
      },
    ],
    faq: [
      {
        question: "What does it mean for a repair shop to be the guide?",
        answer:
          "It means the customer stays the main character while your shop brings empathy, expertise, and a clear path forward. The message should show that your team understands the driver's concern, can solve it, and will make the next step easy to understand.",
      },
      {
        question: "What should an auto repair shop say on its homepage?",
        answer:
          "Lead with the customer's problem or the outcome they want. Then explain who the shop helps, show relevant proof, and give one clear next action. Services, credentials, and equipment still matter, but they work best when they support a customer-centered promise instead of replacing it.",
      },
      {
        question: "How can a repair shop show authority without sounding self-centered?",
        answer:
          "Tie every credential to a customer benefit. Reviews, technician certifications, warranties, original photos, and a clear inspection process build authority when they help the driver see why your shop is prepared to solve the problem.",
      },
      {
        question: "How can a shop tell whether its message is clear?",
        answer:
          "Show the page for a few seconds to someone who does not know your business. Can they tell you who it serves, what problem it solves, and what to do next? After that, call quality, booking rate, the questions customers keep asking, and advisor feedback will show you where the message still creates confusion.",
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
    dek: "Before customers book, they need to recognize your shop, feel that it understands them, and believe it will deliver. Run every campaign through those three stages before it goes out.",
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
      "Know: make your shop, and why it matters to this customer, easy to recognize.",
      "Like: use useful, human language that sounds like the customer.",
      "Trust: back every promise with proof, process, and consistency.",
    ],
    sections: [
      {
        heading: "Know: can the right customer recognize you?",
        body: "Recognition is more than seeing your logo. The right customer should quickly understand where the shop is, what it helps with, and whether it works on their vehicle or handles their situation. Use the same name, photography, colors, location details, and service language everywhere. Then every impression adds to the last, whether the customer finds you in search, in the mailbox, on social, in their inbox, or driving down the street.",
      },
      {
        heading: "Like: does the message feel useful and human?",
        body: "Nobody needs their repair shop to be entertaining. They need it to be understandable and considerate. Explain problems without jargon. Respect the customer's time and intelligence. Show the people behind the work. Helpful maintenance advice and real community involvement build familiarity without forcing a sales pitch into every message.",
      },
      {
        heading: "Trust: is there enough proof to act?",
        body: "A strong claim needs evidence. Use recent reviews, original shop photos, credentials, warranties, a clear approval process, and honest expectations. Make sure your phone number, hours, address, and scheduling steps match everywhere they appear. Small contradictions plant doubt. Consistency makes the decision feel safer.",
      },
      {
        heading: "Score the campaign before it ships.",
        body: "Before any website page, postcard, ad, email, or social post goes out, ask three questions. Will the intended customer know this is for them? Is the message relevant and respectful enough to like? Is there enough proof and clarity to trust the next step? Fix the weakest answer first, before you increase the budget.",
        bullets: [
          "Name the specific customer and the problem you solve for them.",
          "Use one main message and one clear action.",
          "Add the proof that best supports the promise.",
          "Check that the landing page and the front counter deliver what the campaign promised.",
        ],
      },
    ],
    faq: [
      {
        question: "What is know-like-trust marketing?",
        answer:
          "Know-like-trust is a simple way to check whether customers can recognize a business, relate to its message, and find enough proof to act. For a repair shop, all three stages should work together across search, the website, reviews, mail, social content, and the service experience itself.",
      },
      {
        question: "Which part of know-like-trust should a repair shop fix first?",
        answer:
          "Fix the weakest stage, the one blocking the next action. More awareness will not help if customers cannot tell what your shop does, and a friendly message will not turn into a booked appointment if the hours, address, reviews, or booking process create doubt.",
      },
      {
        question: "Can the know-like-trust filter be used for ads and direct mail?",
        answer:
          "Yes. The piece should make it obvious who sent it, speak to the customer you want, offer believable proof, and lead to a landing page or phone call that matches the promise. A discount alone rarely covers all three stages.",
      },
      {
        question: "How do you measure know, like, and trust?",
        answer:
          "Use a few signals instead of one score. Search visibility and reach point to recognition. Engagement and the quality of responses show relevance. Reviews, the share of calls that book, repeat visits, and customer feedback reveal whether the shop is earning trust.",
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
    date: "Updated Sep 2026",
    updatedDate: "2026-09-22",
    tag: "Guide",
    title: "5 Marketing Mistakes Shop Owners Make & How to Fix Them",
    seoTitle: "5 Auto Repair Marketing Mistakes (and Fixes) | Turnkey",
    seoDescription:
      "Five common auto repair marketing mistakes that waste money, plus practical fixes for timing, messaging, tracking, phone calls, and customer follow-up.",
    description:
      "The five places auto repair marketing usually leaks, and a practical fix for each one.",
    dek: "Most shop marketing does not fail because of one bad channel. It leaks in a few predictable places, and you can fix most of them without spending more.",
    image: {
      ...siteMedia.graphics.leadGenerator,
      alt: "Cover of the Turnkey guide 5 Marketing Mistakes Shop Owners Make and How to Fix Them, featuring two repair shop owners",
    },
    imageWidth: 1000,
    imageHeight: 1000,
    href: resourcePath("5-marketing-mistakes-shop-owners-make"),
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/07/lead-generator-web-graphic.png",
    takeaways: [
      "Keep a steady baseline running and plan the extra pushes before the slow weeks arrive.",
      "Pick the customers and work you want more of, then say something the shop down the street cannot.",
      "Judge marketing on one shop scoreboard, from the call to the completed repair order.",
      "Treat the phone and the front counter as part of the marketing, because they are.",
      "Give past customers a reason to come back before you pay to replace them.",
    ],
    sections: [
      {
        heading: "Most marketing leaks in the same five places.",
        body: "Here is the short version. When a shop owner tells me the marketing is not working, the problem usually lands in one of five places: the marketing only runs when the bays are empty, the message tries to reach every driver in town, each channel gets judged on its own report, callers get lost at the front counter, or past customers never hear from the shop again.\n\nNone of these takes a bigger budget to fix. Most take a decision, a simple habit, and someone who owns it. Below is each one, what it costs you, and what I would do instead.",
      },
      {
        heading: "Marketing only when the bays are empty.",
        body: "This one is so common it almost feels like a tradition. The schedule gets thin, the owner gets nervous, and a discount goes out the door. But marketing takes time to land. Mail needs design, printing, and delivery time. Digital campaigns need time to find the right people. By the time the calls pick up, the shop is busy again, so the marketing gets turned off. A few months later the bays are quiet, and the whole cycle starts over.\n\nThe cost is bigger than it looks. You pay for rushed creative, you teach customers to wait for a coupon, and you never run anything long enough to learn whether it works. The fix is to separate your baseline from your boosts. Keep a steady level of marketing running every month. Then put the extra pushes on the calendar ahead of the slow weeks you already know are coming.",
        bullets: [
          "Baseline: the work that runs every month, such as reviews, customer follow-up, and your local visibility.",
          "Boosts: planned campaigns for known slow periods, seasonal services, or open bays you can see coming.",
          "Guardrail: decide how long a campaign runs and what it needs to prove before it launches, not after a quiet week.",
        ],
        link: {
          href: "/resources/auto-repair-marketing-plan",
          label: "Build a 12-month marketing calendar for your shop",
        },
      },
      {
        heading: "Trying to sell every repair to every driver.",
        body: "\"Honest, reliable service at fair prices. We fix all makes and models.\" I would bet you have seen that line on a dozen shop ads, and that is exactly the problem. When everyone says it, nobody hears it. It also pulls the conversation toward price, which attracts the customers who will happily leave you for a $10 cheaper oil change.\n\nTry this quick test. Cover the logo on your last ad, postcard, or homepage. Could it belong to the shop down the street? If the answer is yes, the message needs work. Start by deciding which customers and repairs you want more of. Then lead with the specifics that matter to them: the makes you know best, how your diagnosis works, your warranty, your wait times, and real reviews that sound like those customers.",
        bullets: [
          "Name the vehicles, services, or customer situations you want more of.",
          "Replace general claims with proof: certifications, warranty terms, photos of your real team, and specific reviews.",
          "Use offers to invite the right work, not to discount the work you would get anyway.",
        ],
        link: {
          href: "/resources/ideal-customer-profile-auto-repair-shop",
          label: "Define the customer your marketing should attract",
        },
      },
      {
        heading: "Grading every channel on its own report card.",
        body: "Try this. Add up the new customers every vendor says they brought you last month. Do not be surprised if the total is bigger than the number of cars that actually came through the door. Nobody has to be lying for that to happen. Every platform counts differently, and most give themselves credit if they touched the customer anywhere along the way.\n\nThe trouble is that separate reports make it almost impossible to decide what to keep. The fix is one shop scoreboard that every channel gets measured against. Pull it from your shop management system, not from vendor dashboards, and review it on the same day every month.",
        bullets: [
          "Calls and online requests by source.",
          "Booked appointments and show rate.",
          "Completed repair orders and average repair order.",
          "New versus returning customers.",
          "Spend by channel, so cost per completed repair order is visible.",
        ],
        link: {
          href: "/resources/why-auto-repair-marketing-breaks",
          label: "Find where your marketing is breaking down",
        },
      },
      {
        heading: "Paying for calls the front counter cannot convert.",
        body: "Marketing's job is to make the phone ring. The shop's job is to turn that call into an appointment. When a call goes to voicemail at 12:15, or the first thing a caller hears is a price with no explanation, the ad did its job and the shop lost the customer anyway. The owner usually never hears about it, because a missed opportunity does not show up on any report.\n\nIf you have call recording, listen to five first-time calls every week. You will learn more in 20 minutes than from most monthly reports. Then give your team a simple, friendly way to handle the calls that matter most, especially the \"how much will it cost?\" question. Explain what you can estimate over the phone, what needs an inspection, and how diagnosis works. Then offer a specific time.",
        bullets: [
          "Track how many first-time callers book an appointment, not just how many call.",
          "Cover the phone at lunch, in the morning rush, and after hours.",
          "Make sure the counter knows about every current offer before the marketing goes out.",
        ],
        link: {
          href: "/resources/ai-search-for-auto-repair-shops",
          label: "See why the way you answer the phone now affects your visibility",
        },
      },
      {
        heading: "Forgetting the customers you already paid to earn.",
        body: "Most marketing budgets chase new customers. Meanwhile, the people who already know your shop, trust your team, and have your number in their phone hear nothing until the dealership sends them a reminder. Those customers are usually the easiest cars to earn back, and the most expensive to replace.\n\nThe fix does not need to be fancy. Thank people after the visit. Remind them when the next service is due. Send useful updates they will actually read. Reach out to customers you have not seen in a year. And ask every customer for an honest review, the same way, every time. Google does not allow incentives in exchange for reviews, so keep the request simple and send the link.",
        bullets: [
          "A thank-you message or note after the visit.",
          "Service reminders based on time or mileage.",
          "A regular newsletter with useful, shop-specific information.",
          "A reactivation message for customers you have not seen in 12 months or more.",
          "A consistent, honest review request with a direct link.",
        ],
        link: {
          href: "/resources/auto-repair-reputation-management",
          label: "Build a reputation routine your team can keep",
        },
      },
      {
        heading: "Check your shop for all five this week.",
        body: "You can find most of these leaks in about an hour. Pull your last three months of marketing and your shop management reports, pour a cup of coffee, and answer the questions below honestly. Anything you cannot answer is a good place to start.\n\nIf every fix on this list lands on your desk, notice that too. The biggest mistake I see is not any single tactic. It is expecting the busiest person in the building to plan, coordinate, and measure the marketing in the evenings. These fixes work best when someone owns them.",
        bullets: [
          "Timing: Which campaigns ran every month, and which ones only ran when it got slow?",
          "Message: Would your last ad still make sense with another shop's logo on it?",
          "Scoreboard: Do you know how many completed repair orders came from each channel?",
          "Phone: What share of first-time callers booked an appointment last month?",
          "Retention: When did your past customers last hear from you, and what did you say?",
        ],
        link: {
          href: "/results",
          label: "See what changes when someone owns the plan",
        },
      },
    ],
    faq: [
      {
        question: "What is the most common auto repair shop marketing mistake?",
        answer:
          "Running marketing only when the shop gets slow is one of the most common, and one of the most expensive. Campaigns take time to reach customers, so stop-start marketing usually arrives after the slow period has passed and never runs long enough to show what works. A steady monthly baseline with planned seasonal pushes is far more reliable.",
      },
      {
        question: "How can a shop owner tell whether marketing money is being wasted?",
        answer:
          "Check whether each campaign has a defined audience, offer, owner, timeframe, and measurable result. Then compare spend against calls, booked appointments, and completed repair orders by source in your shop management system. If you cannot connect a campaign to any of those numbers, fix the tracking before you raise the budget.",
      },
      {
        question: "How long should I wait before judging a marketing campaign?",
        answer:
          "It depends on the channel. Customer follow-up and reminders can show results within weeks, while direct mail, local visibility, and awareness campaigns usually need a few months of consistent effort. Decide the test length and the numbers that define success before the campaign starts, then review it on schedule.",
      },
      {
        question: "Should an auto repair shop stop marketing when it is busy?",
        answer:
          "Usually not. Stopping everything creates the next slow period. It is reasonable to pause promotions for work you cannot take, but keep your baseline running: reviews, customer follow-up, and local visibility. Use busy stretches to promote the higher-value work you want more of.",
      },
      {
        question: "Is weak marketing always the vendor's fault?",
        answer:
          "No. The leak may be in the targeting or the offer, but it can just as easily be in call handling, scheduling, capacity, or follow-up after the first visit. Review the whole customer path, from the first response to the completed repair order, before you decide a channel or vendor is the only problem.",
      },
    ],
    externalSources: [
      {
        href: "https://support.google.com/analytics/answer/10597962?hl=en",
        label: "Understand why platforms give themselves credit",
        publisher: "Google Analytics Help",
        description:
          "Google's explanation of attribution models and how paid and organic channels can receive credit for the same conversion.",
      },
      {
        href: "https://support.google.com/business/answer/3474122?hl=en",
        label: "Ask for Google reviews the right way",
        publisher: "Google Business Profile Help",
        description:
          "Google's guidance on sharing a review link, replying to reviews, and why incentives for reviews are prohibited.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers",
        label: "Follow the federal rules on reviews",
        publisher: "Federal Trade Commission",
        description:
          "Questions and answers on the Consumer Reviews and Testimonials Rule, including incentives and review suppression.",
      },
    ],
    serviceLinks: [
      {
        href: "/services/marketing-consulting",
        label: "Find the leaks with marketing consulting",
        description: "Get a practical view of what to keep, fix, stop, and run next.",
      },
      {
        href: "/services/retention-marketing",
        label: "Bring past customers back with retention marketing",
        description:
          "Newsletters, thank-you notes, and CRM follow-up that keep customers coming back.",
      },
    ],
    relatedSlugs: [
      "why-auto-repair-marketing-breaks",
      "auto-repair-marketing-plan",
      "ideal-customer-profile-auto-repair-shop",
      "auto-repair-reputation-management",
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
    dek: "Direct mail still earns its place when the list, offer, timing, creative, tracking, and follow-up are run as one campaign instead of a print order.",
    image: siteMedia.graphics.directMail,
    href: resourcePath("direct-mail-for-repair-shops"),
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/06/2023-06-27-blog-RW-direct-mail.png",
    originalUrl: "https://turnkeyautomarketing.com/joe-flammer-ratchet-wrench/",
    legacyPaths: ["/joe-flammer-ratchet-wrench/"],
    takeaways: [
      "The mailing list decides more of the outcome than the postcard design does.",
      "Judge mail by calls, booked appointments, and repair-order quality, not by how good the piece looked.",
      "Most disappointing campaigns break down at timing, tracking, or front-counter follow-up, not at the printer.",
    ],
    sections: [
      {
        heading: "A mailer is not the strategy.",
        body: "The postcard is one piece of a direct mail campaign for an auto repair shop. The real work is deciding who should get it, what problem the offer solves, when it should land, and how the shop follows up when the phone starts ringing. A printer can sell you quantity. Nobody at the print shop is responsible for whether the mail reached households that can become good customers.",
      },
      {
        heading: "Build the mailing list before the creative.",
        body: "Start with the households that can realistically drive to your shop and afford the work your bays are built for. A tight radius around the shop usually beats a broad blanket drop. Household filters such as vehicle age, income range, homeownership, and how long people have lived in the neighborhood matter more than raw quantity. Your own customer list is a separate audience, and often a stronger one, because bringing back a lapsed customer costs less than buying a new one.",
        bullets: [
          "A drive-time radius from the shop, not an arbitrary mile count.",
          "Household characteristics that match your best current customers.",
          "New movers, who are actively choosing a shop for the first time.",
          "Your own lapsed customers, mailed as a separate reactivation campaign.",
        ],
      },
      {
        heading: "Write an offer that attracts the right work.",
        body: "The offer decides who responds. A deep discount on a low-margin service brings in price shoppers who will not come back. An offer tied to the work you want more of, such as diagnostics, maintenance intervals, seasonal inspections, or a specific vehicle type, attracts a customer worth keeping. State the offer plainly. Give it an expiration date so people have a reason to act. And make sure the front counter can honor exactly what was printed.",
      },
      {
        heading: "Decide the timing and the drop schedule.",
        body: "Mail should land when the shop has room to handle the response and when demand is naturally moving. Plan around your real slow weeks, seasonal service patterns, and technician availability. Then work backward through the list pull, creative approval, printing, and postal delivery. One drop rarely makes a shop recognizable. A repeated schedule to the same list, with several drops across a season, consistently outperforms one large mailing to a list you only touch once.",
        bullets: [
          "Work backward from the mail date through print, approval, and list deadlines.",
          "Mail into weeks the shop can actually staff.",
          "Mail a smaller list more often instead of a larger list once.",
          "Space the drops far enough apart to read the response before the next one goes out.",
        ],
      },
      {
        heading: "Track the response, not just the impression.",
        body: "Direct mail earns its budget when you can connect it to booked work. Put a trackable phone number on the piece. Send people to a landing page or scheduling link that matches the mailer's promise. Ask at the counter how the customer heard about you. Penetration reporting shows where the campaign reached, and call and appointment data shows what came back. So judge the campaign on calls, booked appointments, show rate, and average repair order, not on the print cost per piece.",
        bullets: [
          "A trackable phone number and a matching landing page or booking link.",
          "The same source question at the counter and on the phone, every time.",
          "Calls, booked appointments, show rate, and repair-order value for each drop.",
          "Penetration reporting to confirm the mail reached the neighborhoods you chose.",
        ],
      },
      {
        heading: "Plan the follow-up before the mail drops.",
        body: "The campaign keeps going after the postcard arrives. Someone has to answer the phone well, capture the customer's information, book the appointment, and bring that customer back a second time. Connect the mail to your email, text, and CRM follow-up, so a first visit from a postcard turns into a customer who stays. This is where most disappointing direct mail campaigns actually fall apart. Not at the mailbox, but at the counter and in the weeks after the first visit.",
      },
    ],
    faq: [
      {
        question: "Does direct mail still work for auto repair shops?",
        answer:
          "It can, when the list, offer, timing, creative, tracking, and front-counter follow-up all support the same goal. A postcard sent once to a broad list is hard to judge. A repeated, trackable campaign aimed at households your shop can realistically serve gives you a real answer.",
      },
      {
        question: "How often should an auto repair shop send direct mail?",
        answer:
          "There is no universal schedule, but repeated contact with a qualified list usually gives you a better test than one large drop. Plan the rhythm around seasonal demand, shop capacity, postal timing, budget, and enough space between drops to measure the response.",
      },
      {
        question: "How should a repair shop choose a direct mail list?",
        answer:
          "Start with a realistic drive-time area, then use household and vehicle characteristics that resemble your best current customers. Keep new movers, prospects, current customers, and lapsed customers in separate groups, because each one needs a different message and a different way to measure it.",
      },
      {
        question: "How do you track direct mail return on investment?",
        answer:
          "Use a trackable phone number or a response path built for that campaign, record the source during calls and at check-in, and connect responses to booked and completed repair orders. Then review show rate, repair-order value, customer acquisition cost, and whether first-time customers come back. Coupon redemptions and print cost alone will not tell you much.",
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
    dek: "A useful auto repair marketing plan starts with the result your shop needs, then lines up the customers, campaigns, calendar, budget, and measurements that can produce it.",
    image: siteMedia.graphics.marketingPlan,
    href: resourcePath("auto-repair-marketing-plan"),
    sourceAsset: "https://turnkeyautomarketing.com/wp-content/uploads/2023/01/marketing-plan2.png",
    originalUrl:
      "https://turnkeyautomarketing.com/how-to-create-a-winning-marketing-plan-for-your-auto-repair-shop/",
    legacyPaths: ["/how-to-create-a-winning-marketing-plan-for-your-auto-repair-shop/"],
    takeaways: [
      "Start with a specific shop result, such as better-fit work, stronger retention, or more booked appointments.",
      "Give acquisition, retention, reputation, and seasonal campaigns each a clear job on a 12-month calendar.",
      "Track the path from marketing source to calls, appointments, repair orders, and revenue, so you know what to keep, change, or stop.",
    ],
    sections: [
      {
        heading: "Choose the shop result before the marketing channel.",
        body: "Start your auto repair marketing plan with one business result. What do you need the marketing to do? A second location that needs first-time customers calls for a very different plan than a full shop that wants better repair-order quality or stronger retention. Write down the change you need in capacity, car count, revenue, customer mix, or service category, and put a timeframe on it. That keeps you from buying a channel just because a vendor recommended it.",
        bullets: [
          "How many more booked appointments can the shop handle each week?",
          "Which services, vehicles, or customer relationships fit best?",
          "Is the priority acquisition, retention, reputation, reactivation, or a seasonal capacity gap?",
          "What has to improve in the next 90 days, and what is the 12-month goal?",
        ],
      },
      {
        heading: "Establish the baseline and a workable budget.",
        body: "Before you add anything, write down what the shop already spends, which vendors and campaigns are running, and what each one appears to produce. Include software, creative, media, mail, agency fees, discounts, and staff time when they affect the decision. Then set a budget range you can keep up long enough to learn something. A smaller plan where the pieces work together beats an ambitious mix that stops before the results are clear.",
        bullets: [
          "Current monthly spend by vendor and channel.",
          "Calls, forms, booked appointments, new customers, and returning customers by source, when you have them.",
          "Average repair order, gross profit, customer acquisition cost, and customer value, using your shop's own definitions.",
          "Capacity limits such as technician hours, advisor follow-through, or parts availability.",
        ],
      },
      {
        heading: "Define the customer, work, and offer.",
        body: "Decide who the plan should attract and what you want them to do. The best audience is not always every driver within a few miles. It might be owners of a specific vehicle type, households near a new location, lapsed customers, or current customers who are due for maintenance. Match the message and offer to that situation. Then make sure the front counter delivers the same promise when the customer calls.",
      },
      {
        heading: "Give every marketing channel one clear job.",
        body: "Choose each channel for the role it plays on the path from attention to appointment. Local SEO, your Google Business Profile, reviews, and paid search help you catch the drivers who are already looking. Direct mail, targeted digital campaigns, and social content build awareness before someone searches. Email, CRM follow-up, thank-you messages, and reactivation campaigns earn another visit from customers you already paid to win. Use only the channels your team can coordinate and measure.",
        bullets: [
          "Capture demand: local search visibility, reviews, website conversion, and paid search.",
          "Create demand: direct mail, targeted digital campaigns, community visibility, and social content.",
          "Retain demand: email, service reminders, CRM follow-up, thank-you messages, and reactivation.",
          "Support conversion: call handling, online scheduling, advisor scripts, offers, and follow-up.",
        ],
      },
      {
        heading: "Build a 12-month auto repair shop marketing calendar.",
        body: "Put recurring work, seasonal opportunities, campaign launches, creative deadlines, and review dates on one calendar. Build it around your shop's real busy and slow stretches, not a generic holiday list. Leave enough lead time for mail, creative approval, landing pages, lists, tracking, team communication, and follow-up. And put a name next to every task, so you do not become the default project manager.",
      },
      {
        heading: "Measure the path from response to repair order.",
        body: "Your reporting should connect marketing activity to what happens in the shop. Clicks and impressions can help diagnose a campaign, but they cannot tell you whether the right cars reached the bays. Track calls and forms, then booked appointments, show rate, repair-order quality, source mix, returning customers, and revenue. Define sources the same way everywhere, so vendor reports can be compared side by side instead of read one at a time.",
      },
      {
        heading: "Review the plan with keep, fix, stop, and start decisions.",
        body: "Review the plan every month and make a clear call on every active campaign. Keep what is producing the results you planned for. Fix the message, targeting, tracking, landing page, call handling, or follow-up when a channel has potential but something is leaking. Stop work that cannot support the goal. Start the next priority only when someone can own it. Good reporting makes the next move obvious instead of just proving that activity happened.",
        bullets: [
          "Keep: producing the result you planned for at a cost the shop can defend.",
          "Fix: a promising channel with a specific leak you can correct.",
          "Stop: wrong audience, wrong goal, weak economics, or no one accountable for it.",
          "Start: the most important gap your current team can execute and measure.",
        ],
      },
    ],
    faq: [
      {
        question: "What should an auto repair shop marketing plan include?",
        answer:
          "Include the business result, the customers and repair work you want, baseline performance, budget, the job of each channel, offers, a 12-month calendar, campaign owners, and the numbers you will use to make decisions. Account for shop capacity and front-counter follow-up too, so the marketing never promises work your team cannot support.",
      },
      {
        question: "How much should an auto repair shop spend on marketing?",
        answer:
          "There is no percentage that fits every shop. Build the budget from your growth goals, current revenue and margin, customer value, local competition, existing demand, and the number of additional appointments the shop can profitably handle.",
      },
      {
        question: "How often should a repair shop review its marketing plan?",
        answer:
          "Review campaign performance monthly and revisit the larger plan at least once a quarter. Seasonal demand, staffing, capacity, vehicle mix, and priorities change, so adjust the calendar and budget based on what the numbers show instead of leaving them untouched for a full year.",
      },
      {
        question: "Which marketing channels should an auto repair shop use?",
        answer:
          "Choose each channel for the job it needs to do. Local search, reviews, your website, and paid search can capture existing demand. Direct mail and targeted campaigns can create new demand. Email, reminders, reactivation, and follow-up help you keep the customers you already earned.",
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
    date: "Updated Sep 2026",
    updatedDate: "2026-09-22",
    tag: "Strategy",
    title: "Why Auto Repair Marketing Breaks Down",
    seoTitle: "Why Your Auto Repair Marketing Isn't Working | Turnkey",
    seoDescription:
      "Find where your auto repair shop's marketing is breaking down, from mixed messages and vendor reports to phone calls and capacity, and how to fix it.",
    description:
      "How to find the handoff where your shop's marketing is breaking down, and who should fix it.",
    dek: "When the marketing looks busy but the bays do not show it, the problem is usually a handoff nobody owns. Here is how to find the break and fix it.",
    image: siteMedia.graphics.problems,
    imageWidth: 1536,
    imageHeight: 1024,
    href: resourcePath("why-auto-repair-marketing-breaks"),
    sourceAsset: "https://turnkeyautomarketing.com/wp-content/uploads/2023/03/problems.png",
    takeaways: [
      "Find the stage where customers drop out before you blame a channel or a vendor.",
      "Give every campaign one brief that the vendors and the front counter both see.",
      "Measure with one shop scoreboard instead of separate vendor reports.",
      "Make sure the shop owns its accounts and one person owns the coordination.",
      "Match the marketing to the work your shop can actually take.",
    ],
    sections: [
      {
        heading: "Usually, nothing is broken. It is disconnected.",
        body: "When marketing stops working, the natural reaction is to hunt for the one bad piece. Fire the vendor, cancel the mailer, try the new thing a rep pitched last week. Sometimes that is the right call. More often, each piece is doing roughly what it was hired to do. The problem is what happens between them.\n\nThink about the path a new customer takes. They see a postcard, look you up on Google, visit your website, call the shop, talk to an advisor, drop off the car, approve the work, and hopefully come back. Different people and vendors handle almost every step. When nobody owns the whole path, it usually breaks at a handoff, and every report still looks fine.",
      },
      {
        heading: "Find the stage where customers drop out.",
        body: "Before you change anything, find where people are falling out. It is the fastest way to end the blame game, because each drop-off points to a different fix. Pull the last 60 to 90 days and ask one question: where do the numbers get thin?",
        bullets: [
          "Few calls or requests: the audience, offer, message, or reach needs work. That is a marketing conversation.",
          "Plenty of calls, few appointments: look at phone coverage, hours, availability, and how price questions are handled.",
          "Appointments booked, but people do not show: check confirmations, reminders, and how far out you are booking.",
          "Cars arrive, but tickets are small: the offer may be attracting the wrong work, or the inspection and advisor process needs attention.",
          "One visit and gone: follow-up and retention are missing.",
        ],
      },
      {
        heading: "Every piece is telling a different story.",
        body: "Picture this. A customer calls about the brake special on your postcard, and the advisor says, \"What special?\" Or the mailer says you specialize in European vehicles, the homepage says \"all makes and models,\" and Google still shows last year's Saturday hours. Nobody did anything terrible. But the customer now has three reasons to hesitate.\n\nThe fix is a one-page brief for every campaign, shared with every vendor and the front counter before anything launches. It should answer who the campaign is for, what it offers, when it runs, where customers will land, what the team should say, and how the shop will know it worked.",
        link: {
          href: "/resources/know-like-trust-marketing-filter",
          label: "Check every campaign with the know-like-trust filter",
        },
      },
      {
        heading: "Every vendor is winning. The shop is not.",
        body: "Each vendor reports on its own work, in its own dashboard, by its own definitions. The mail house counts households reached. The ad platform counts clicks and calls. The review tool counts stars. Many platforms also take credit any time they touched a customer along the way, so the same car can show up as a win in three different reports.\n\nThat is why vendor reports should never be your scoreboard. Use the numbers in your shop management system and track the same few things every month: calls and requests by source, booked appointments, completed repair orders, average repair order, and new versus returning customers. Ask every new customer how they heard about you, and record the answer the same way every time.",
        link: {
          href: "/resources/auto-repair-marketing-plan",
          label: "Set up a scoreboard as part of your marketing plan",
        },
      },
      {
        heading: "The owner is the only one connecting the dots.",
        body: "In a lot of shops, the owner is the unofficial marketing department. They approve the creative, pass information between vendors, dig up logins, and try to remember who promised what. That works until the shop gets busy, which is exactly when the marketing matters most. Decisions wait, deadlines slip, and campaigns go out half finished or not at all.\n\nThere is a quieter risk here too. When vendors create and control your accounts, leaving a vendor can mean losing access to your own profile, ads, or data. Your shop should own its accounts and give vendors the access they need. Google Business Profile, for example, lets an owner add managers without sharing a password.",
        bullets: [
          "Google Business Profile, with the shop as owner.",
          "Your website domain and hosting.",
          "Ad accounts and call tracking numbers.",
          "Your customer list and email platform.",
        ],
        link: {
          href: "/services/vip-marketing-manager",
          label: "See how a VIP Marketing Manager takes over the coordination",
        },
      },
      {
        heading: "The plan changes every time the phone gets quiet.",
        body: "Marketing that restarts every few weeks never gets a fair test. A quiet Tuesday sparks a new idea, the new idea replaces the old one before it had time to work, and three months later nobody can say what worked. The opposite happens too. Some campaigns run for years because nobody ever decided what success looks like.\n\nBefore a campaign starts, write down how long it will run, which numbers it needs to move, and the date you will review it. Then make a clear call at that review: keep it, fix it, stop it, or start something else.",
        link: {
          href: "/resources/5-marketing-mistakes-shop-owners-make",
          label: "Avoid the stop-start marketing mistake",
        },
      },
      {
        heading: "Marketing is promising work the shop cannot take.",
        body: "Sometimes the marketing works and the shop still struggles. If your technicians are booked out two weeks, more calls do not create more revenue. They create frustrated customers and a stressed front counter. The reverse happens too, when a shop promotes the work that is easy to advertise instead of the work it actually wants.\n\nMarketing should follow capacity. Tell whoever runs your marketing how far out you are booking, what your technicians can take on, and which work you want more of. Turn campaigns up when bays open, point them toward higher-value work when you are busy, and plan a focused push when you can see a slow stretch coming.",
        link: {
          href: "/services/boost-days",
          label: "Fill a slow stretch with a focused Boost Day campaign",
        },
      },
      {
        heading: "How to put it back together.",
        body: "You do not need more tools to fix a disconnected system. You need one owner, one scoreboard, and one regular conversation where decisions actually get made. Here is a simple monthly marketing meeting that fits in about 45 minutes.",
        bullets: [
          "Review the shop scoreboard against last month and the same month last year.",
          "Make a keep, fix, stop, or start call on every active campaign.",
          "Look at capacity for the next 60 days and adjust the marketing to match.",
          "Approve the briefs for anything launching next month, including what the front counter needs to know.",
          "Leave with one owner and one due date for every next step.",
        ],
        link: {
          href: "/resources/jason-smith-marketing-plan",
          label: "See how a yearly plan changed things for Jason Smith",
        },
      },
    ],
    faq: [
      {
        question: "Why is my auto repair shop marketing not working?",
        answer:
          "The problem may be the targeting, offer, or message, but it is often a handoff: mixed information across the website and Google, missed or poorly handled calls, no follow-up, or campaigns that change before anyone can measure them. Find the stage where customers drop out before you blame one channel.",
      },
      {
        question: "Can too many marketing vendors hurt results?",
        answer:
          "Specialists can be valuable, but results suffer when each vendor works toward a different definition of success and nobody coordinates the customer's path from first look to repair order. One accountable owner should line up the message, timing, tracking, and reporting across vendors and keep the front counter informed.",
      },
      {
        question: "Which marketing numbers should a repair shop review?",
        answer:
          "Track calls and requests by source, booked appointments, show rate, completed repair orders, average repair order, new versus returning customers, and spend. Clicks and impressions help diagnose a campaign, but they should connect to outcomes you can see in the shop.",
      },
      {
        question: "When should a repair shop stop a marketing campaign?",
        answer:
          "Stop when the audience or goal is wrong, the economics cannot work, or no one can own the campaign well enough to learn from it. If the channel has potential and the leak is specific, such as the offer, tracking, landing page, or call handling, fix and retest that first.",
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
          "Google's explanation of attribution models and how paid and organic channels can receive credit for the same conversion.",
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
    relatedSlugs: [
      "5-marketing-mistakes-shop-owners-make",
      "auto-repair-marketing-plan",
      "know-like-trust-marketing-filter",
      "jason-smith-marketing-plan",
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
    dek: "For the first time, Jason could see a full year of marketing mapped to his shop, instead of another pile of disconnected monthly tactics.",
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
      "Long-term growth needs a plan you can actually see.",
      "The owner should not have to build the marketing calendar alone.",
      "The strongest plan ties campaigns, reporting, and accountability together.",
    ],
    sections: [
      {
        heading: "The plan made the whole year visible.",
        body: "A yearly marketing plan sets the schedule for attracting customers, encouraging repeat visits, managing reviews, and planning seasonal campaigns and spending. Instead of restarting the strategy conversation every month, Jason and his team could see how the pieces fit together and what needed to happen next.",
      },
      {
        heading: "A plan is only useful when someone owns it.",
        body: "Turnkey pairs the strategy with execution and reporting, so the owner gets a clear direction without becoming the project manager for every campaign. The result is real accountability, fewer last-minute decisions, and marketing that supports the goals the shop actually has.",
      },
    ],
    faq: [
      {
        question: "What is a yearly marketing plan for an auto repair shop?",
        answer:
          "It is a 12-month view of the shop's acquisition, retention, reputation, and seasonal campaigns, along with the budget, deadlines, and dates to review results. The plan gives every activity a purpose and helps the team prepare before a slow week or service opportunity turns urgent. Instead of deciding what to run from scratch each month, the shop works from a calendar it already agreed on.",
      },
      {
        question: "What should go on an annual auto repair marketing calendar?",
        answer:
          "Include recurring campaigns, seasonal service opportunities, customer follow-up, review and reputation work, direct-mail dates, creative deadlines, budget checkpoints, and reporting meetings. Put a name next to each task, so the calendar shows who owns the work as well as when it happens.",
      },
      {
        question: "How far in advance should a repair shop plan marketing?",
        answer:
          "Set the annual direction before the year or planning cycle begins, then work at least several weeks ahead of each campaign. Direct mail, creative approvals, landing pages, lists, tracking, and staff preparation all need lead time, and monthly reviews keep the plan responsive. The earlier the direction is set, the fewer marketing decisions get made in a rush.",
      },
      {
        question: "Who should manage the yearly marketing plan?",
        answer:
          "One accountable person or team should coordinate the plan, vendors, approvals, reporting, and next steps. The owner should set the goals and understand the decisions without chasing every deadline or translating separate vendor reports alone.",
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
