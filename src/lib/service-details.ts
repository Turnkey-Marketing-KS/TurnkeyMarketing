import { siteMedia, type SiteImage } from "@/lib/site-media";

export type ServiceDetail = {
  image: SiteImage;
  imageFit?: "cover" | "contain";
  accent?: "blue" | "green";
  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
    subhead: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
  pains: string[];
  deliverables: {
    icon: string;
    title: string;
    description: string;
  }[];
  process: {
    title: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    name: string;
    detail: string;
  };
  faqs: {
    q: string;
    a: string;
  }[];
  pairsWith: string[];
  included: string[];
  bestFor: string;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "vip-marketing-manager": {
    image: siteMedia.graphics.serviceVipMarketing,
    accent: "green",
    hero: {
      badge: "Flagship service",
      headline: "A full marketing department.",
      headlineAccent: "Without the payroll.",
      subhead:
        "VIP gives your shop an account manager, designer, copywriter, and social coordinator — one team that plans your marketing, runs it every week, and reports what it did for car count.",
      stats: [
        {
          value: "One team",
          label: "Strategy, creative, copy, social, and reporting live under one roof — not five vendors.",
        },
        {
          value: "Zero hiring",
          label: "No recruiting, training, or managing an in-house marketer to get real marketing leadership.",
        },
        {
          value: "Monthly reporting",
          label: "You always know what ran, what it cost, and what it brought back through the door.",
        },
      ],
    },
    pains: [
      "You're the owner, the service advisor, and the marketing department — and marketing always loses.",
      "Every vendor needs direction, and you're the only one giving it.",
      "Campaigns start strong, then die the moment the shop gets busy.",
    ],
    deliverables: [
      {
        icon: "layers",
        title: "The full Turnkey stack",
        description:
          "Every service we offer — direct mail, social, digital, retention, and Boost Days — coordinated under one plan.",
      },
      {
        icon: "user",
        title: "Account manager",
        description: "Your single point of contact who owns the plan and keeps every piece moving.",
      },
      {
        icon: "share",
        title: "Social media coordinator",
        description: "Keeps Facebook, Instagram, and Google Business Profile active in your shop's voice.",
      },
      {
        icon: "palette",
        title: "Graphic designer",
        description: "Postcards, ads, and social creative built for your shop — not pulled from templates.",
      },
      {
        icon: "pen",
        title: "Copywriter",
        description: "The words on your mailers, emails, and ads, written by someone who knows shop customers.",
      },
      {
        icon: "clipboard",
        title: "Administrative assistant",
        description: "The coordination and follow-through that keeps campaigns shipping on schedule.",
      },
    ],
    process: [
      {
        title: "Build your marketing plan",
        description:
          "We look at what you're running today, your market, and your capacity — then build a year-long plan around your goals.",
      },
      {
        title: "Your team gets to work",
        description:
          "Account manager, designer, copywriter, and coordinator run the plan week by week. You approve — we execute.",
      },
      {
        title: "Review, report, adjust",
        description:
          "Monthly reporting shows what ran, what it cost, and what it returned — and the plan adjusts with your schedule.",
      },
    ],
    testimonial: {
      quote: "It feels like having an in-house marketing department without the overhead.",
      name: "Veille A.",
      detail: "Google review",
    },
    faqs: [
      {
        q: "How much of my time does this take?",
        a: "You approve the plan and the big swings — we handle the execution. Most owners spend more time reviewing results than producing marketing.",
      },
      {
        q: "What happens to the vendors I already use?",
        a: "We coordinate them. If your website or Google Ads vendor is doing good work, they stay — they just stop operating in a silo.",
      },
      {
        q: "How is this different from hiring a marketing manager?",
        a: "You get a full team — strategy, design, copy, social, and admin — without the recruiting, training, and management that come with an in-house hire.",
      },
      {
        q: "Is VIP right for a single-location shop?",
        a: "Yes. VIP is built for independent shops — it fits owners who want marketing led and executed for them, whether that's one location or several.",
      },
    ],
    pairsWith: ["marketing-consulting", "directtrack-marketing", "boost-days"],
    included: [
      "All services listed in the Turnkey stack",
      "Account Manager",
      "Social Media Coordinator",
      "Graphic Designer",
      "Copywriter",
      "Administrative Assistant",
    ],
    bestFor:
      "Best when you want your own marketing department without hiring one, and you still want a clear view of what is happening.",
  },
  "marketing-consulting": {
    image: siteMedia.graphics.serviceConsulting,
    hero: {
      badge: "Monthly strategy",
      headline: "Stop guessing where your",
      headlineAccent: "marketing spend goes.",
      subhead:
        "One hour a month with a strategist who only works with auto repair shops. We review everything you're running and give you straight answers on what to keep, fix, or stop paying for.",
      stats: [
        {
          value: "Keep, fix, or stop",
          label: "A clear call on every campaign and vendor you're currently paying for.",
        },
        {
          value: "No new vendor",
          label: "Direction that works with the marketing you already have in motion.",
        },
        {
          value: "ROI-first advice",
          label: "Recommendations framed around car count and revenue, not vanity metrics.",
        },
      ],
    },
    pains: [
      "You're spending on marketing every month but can't tell what's actually working.",
      "Every vendor swears their channel is the answer — and none of them see the whole picture.",
      "Decisions get made on gut feel because there's no one experienced to ask.",
    ],
    deliverables: [
      {
        icon: "calendar",
        title: "Monthly one-hour strategy meeting",
        description: "A standing meeting focused on decisions, not status updates.",
      },
      {
        icon: "search",
        title: "Review of current marketing",
        description: "We look at everything you're running — spend, vendors, results — and find the leaks.",
      },
      {
        icon: "compass",
        title: "Keep, fix, stop, start calls",
        description: "Clear recommendations on every dollar, in plain language.",
      },
      {
        icon: "trending",
        title: "ROI-focused next steps",
        description: "You leave every meeting knowing the next move and why it's worth making.",
      },
    ],
    process: [
      {
        title: "Share what you're running",
        description:
          "Before the first meeting, we review your current marketing, spend, and vendors so the hour isn't spent catching up.",
      },
      {
        title: "Meet for one focused hour",
        description:
          "Each month we walk through what's working, what's leaking, and what deserves the next dollar.",
      },
      {
        title: "Leave with next steps",
        description:
          "Keep, fix, stop, start — specific calls you can act on immediately, with the reasoning behind them.",
      },
    ],
    testimonial: {
      quote:
        "Having a year long marketing calendar and an expert who knows our business makes this one of the best investments I have made in my company.",
      name: "Jason Smith",
      detail: "M&M Car Care Center",
    },
    faqs: [
      {
        q: "Will you try to sell me your other services?",
        a: "The meeting's job is a better decision, not an upsell. If a recommendation involves something we offer, we'll say so plainly — and we'll just as readily tell you to keep a vendor that's working.",
      },
      {
        q: "What should I bring to the first meeting?",
        a: "Whatever you have — current campaigns, spend, vendor reports, and the questions keeping you up at night. We'll organize it from there.",
      },
      {
        q: "Is one hour a month really enough?",
        a: "For direction, yes. The review work happens before the meeting, so the hour is spent on decisions — what to do next and why.",
      },
      {
        q: "What if I don't have any marketing running yet?",
        a: "Then the meetings focus on sequencing — what to start first, what to skip, and how to avoid the expensive mistakes shops usually make early.",
      },
    ],
    pairsWith: ["vip-marketing-manager", "boost-days", "directtrack-marketing"],
    included: [
      "One-hour monthly consulting meeting",
      "Review of current marketing",
      "Start, stop, change, and keep recommendations",
      "ROI-focused next steps",
    ],
    bestFor:
      "Best when you already have marketing pieces in motion, but need experienced outside eyes to sort what to keep, fix, or stop.",
  },
  "directtrack-marketing": {
    image: siteMedia.graphics.serviceDirectTrack,
    hero: {
      badge: "New service",
      headline: "New customers you can",
      headlineAccent: "track to the dollar.",
      subhead:
        "DirectTrack combines targeted email, streaming TV commercials, and geofenced display ads into one acquisition lane — with monthly ROI reporting that shows exactly what your spend brought back.",
      stats: [
        {
          value: "3 channels",
          label: "Email, streaming TV, and geofenced display working together as one campaign.",
        },
        {
          value: "Super-targeted",
          label: "Aimed at the local households most likely to become your customers.",
        },
        {
          value: "Monthly ROI meeting",
          label: "A reporting call that shows what moved, what didn't, and what to adjust.",
        },
      ],
    },
    pains: [
      "Car count is flat, and word of mouth isn't filling the schedule anymore.",
      "You've spent on ads before and never could tell what they returned.",
      "New competitors are pulling customers from the same neighborhoods you depend on.",
    ],
    deliverables: [
      {
        icon: "mail",
        title: "Super-targeted email campaigns",
        description: "Sent to the local households most likely to need a shop like yours.",
      },
      {
        icon: "tv",
        title: "Streaming TV commercials",
        description: "Your shop on the streaming services your neighbors actually watch.",
      },
      {
        icon: "map-pin",
        title: "Geofenced display ads",
        description: "Banner ads aimed at real geography — neighborhoods, commuter routes, competitor zones.",
      },
      {
        icon: "chart",
        title: "Transparent ROI tracking",
        description: "Response and revenue tracked so you can defend every dollar of spend.",
      },
      {
        icon: "calendar",
        title: "Monthly reporting meeting",
        description: "A standing call to review what moved and sharpen the next month.",
      },
    ],
    process: [
      {
        title: "Define the target",
        description:
          "We map the households, neighborhoods, and audiences most likely to become your customers.",
      },
      {
        title: "Launch the lane",
        description:
          "Email, streaming commercials, and geofenced display go live as one coordinated campaign — not three disconnected ads.",
      },
      {
        title: "Track and tighten",
        description:
          "Monthly ROI reporting shows what your spend returned, and the targeting sharpens every cycle.",
      },
    ],
    testimonial: {
      quote: "We got to $300,000/month within one year at a brand new shop.",
      name: "Steve Killian",
      detail: "Killian Auto Pros",
    },
    faqs: [
      {
        q: "How do you track ROI?",
        a: "Campaign response is tracked back to real activity — calls, appointments, and revenue — and reviewed with you in a monthly reporting meeting, not buried in a dashboard.",
      },
      {
        q: "How is this different from boosting posts or running Google Ads?",
        a: "DirectTrack is a coordinated acquisition lane — email, streaming TV, and geofenced display aimed at the same targeted households — rather than one channel working alone.",
      },
      {
        q: "Does this replace my Google Ads?",
        a: "No — it runs alongside search. Google Ads catches people already searching for a shop; DirectTrack builds demand in households before they search.",
      },
      {
        q: "How long until I see results?",
        a: "You'll see campaign data in your first monthly report. How fast bays fill depends on your market and capacity — which is exactly what the reporting meeting is for.",
      },
    ],
    pairsWith: ["direct-mail", "digital-marketing", "retention-marketing"],
    included: [
      "Super-targeted email campaigns",
      "Commercials on streaming services",
      "Geofencing banner and display ads",
      "Transparent ROI tracking",
      "Monthly reporting meeting",
    ],
    bestFor:
      "Best for launch, rescue, or dense-market situations where you need targeted acquisition with clearer tracking.",
  },
  "direct-mail": {
    image: siteMedia.graphics.directMailMailbox,
    hero: {
      badge: "Managed campaigns",
      headline: "Postcards that pull cars",
      headlineAccent: "into your bays.",
      subhead:
        "We plan the list, the offer, the design, and the mail date as one campaign — then show you penetration reports so you know it reached the right homes and what came back.",
      stats: [
        {
          value: "The right homes",
          label: "List strategy targets the neighborhoods actually worth mailing.",
        },
        {
          value: "Offers that pull",
          label: "Built to bring in first-time customers, not just discount hunters.",
        },
        {
          value: "Proof it landed",
          label: "Penetration reports show where the campaign reached and what moved.",
        },
      ],
    },
    pains: [
      "You've mailed postcards before and heard nothing back.",
      "The printer sells you quantity — nobody owns the list, the offer, or the timing.",
      "You have no idea whether the last campaign even reached the right homes.",
    ],
    deliverables: [
      {
        icon: "mail",
        title: "Postcard campaign management",
        description: "One campaign managed end to end — not a print order you have to babysit.",
      },
      {
        icon: "palette",
        title: "Design and timeline coordination",
        description: "Design, print, and drop dates handled as one schedule.",
      },
      {
        icon: "dollar",
        title: "Budget and order verification",
        description: "We check the order, the quantities, and the money before anything mails.",
      },
      {
        icon: "target",
        title: "Offer planning",
        description: "Offers built to bring in first-time customers, not just discount shoppers.",
      },
      {
        icon: "chart",
        title: "Penetration reporting",
        description: "See which neighborhoods the campaign reached and what came back.",
      },
      {
        icon: "repeat",
        title: "Direct mail retention campaigns",
        description: "Mail that reactivates your past customers, not just cold households.",
      },
    ],
    process: [
      {
        title: "Plan the campaign",
        description:
          "List strategy, offer, budget, and mail dates planned together as one campaign — not a print order.",
      },
      {
        title: "Design, verify, mail",
        description:
          "We design the postcard, verify the order and budget, and get it in the mail on schedule.",
      },
      {
        title: "Read the results",
        description:
          "Penetration reporting shows where the campaign landed — and makes the next drop smarter.",
      },
    ],
    testimonial: {
      quote: "They have helped me grow my shop over 300% during that time.",
      name: "Christopher Taylor",
      detail: "Danny's Automotive",
    },
    faqs: [
      {
        q: "Does direct mail still work?",
        a: "For auto repair, yes — cars are local, and mail reaches the exact neighborhoods around your shop. The difference between working and wasted is the list, the offer, and the follow-through. That's the part we manage.",
      },
      {
        q: "Who picks the mailing list?",
        a: "We build the list strategy with you — targeting the right neighborhoods and household types instead of blanketing a radius.",
      },
      {
        q: "How will I know if it worked?",
        a: "Penetration reporting shows where the campaign reached, and we review the response together so the next drop is smarter.",
      },
      {
        q: "Can direct mail bring back past customers?",
        a: "Yes — retention campaigns to your own customer list are part of the service, and they're often the highest-return mail a shop can send.",
      },
    ],
    pairsWith: ["retention-marketing", "directtrack-marketing", "boost-days"],
    included: [
      "Management of one postcard campaign",
      "Design and timeline coordination",
      "Budget and order verification",
      "Offer planning",
      "Penetration reporting",
      "Direct mail retention campaigns",
    ],
    bestFor:
      "Best when the postcard, list, budget, order, offer, timing, and follow-up need to be managed as one campaign.",
  },
  "social-media-marketing": {
    image: siteMedia.graphics.serviceSocial,
    hero: {
      badge: "Done-for-you content",
      headline: "Stay in front of local customers.",
      headlineAccent: "We do the posting.",
      subhead:
        "Facebook, Instagram, and Google Business Profile posts in your shop's real voice — plus ad management and responses to the comments and reviews your customers actually read.",
      stats: [
        {
          value: "3 platforms",
          label: "Facebook, Instagram, and Google Business Profile stay consistently active.",
        },
        {
          value: "Ads included",
          label: "Facebook ad creation and management on top of the organic posting.",
        },
        {
          value: "Reviews covered",
          label: "Comments and reviews get responses that protect your local reputation.",
        },
      ],
    },
    pains: [
      "Your last post was months ago — and customers checking your page can tell.",
      "Nobody at the shop has time to take photos, write captions, and keep a schedule.",
      "Comments and reviews sit unanswered for weeks while you're under a car.",
    ],
    deliverables: [
      {
        icon: "facebook",
        title: "Organic Facebook posts",
        description: "3–5 posts a week that show real work, real people, and your shop's personality.",
      },
      {
        icon: "instagram",
        title: "Organic Instagram posts",
        description: "Your shop's work, team, and story — kept current without you filming anything.",
      },
      {
        icon: "map-pin",
        title: "Google Business Profile posts",
        description: "Regular GBP activity that feeds the profile customers check before calling.",
      },
      {
        icon: "megaphone",
        title: "Facebook ad creation and management",
        description: "Paid reach on top of organic, built and managed for you.",
      },
      {
        icon: "message",
        title: "Comment and review response",
        description: "Replies that protect your reputation while you run the shop.",
      },
    ],
    process: [
      {
        title: "Capture your shop's voice",
        description:
          "We learn your shop, your team, and your customers — so posts sound like you, not a content mill.",
      },
      {
        title: "Post, run, respond",
        description:
          "Facebook, Instagram, and GBP stay active every week, ads run, and comments and reviews get answered.",
      },
      {
        title: "Report and refine",
        description:
          "You see what published and how customers responded, and the content plan sharpens from there.",
      },
    ],
    testimonial: {
      quote:
        "They helped us through so many transitions on the marketing side while allowing us to focus on operations and growth.",
      name: "Anthony Campanella",
      detail: "Paul Campanella's Auto Centers",
    },
    faqs: [
      {
        q: "Where does the content come from?",
        a: "From your shop. We learn your voice, use your photos and real work, and coordinate with you on what's happening — you never have to write a post.",
      },
      {
        q: "Do you respond to negative reviews too?",
        a: "Yes. Comment and review response is part of the service — including the hard ones, handled professionally and quickly.",
      },
      {
        q: "Which platforms are included?",
        a: "Facebook, Instagram, and Google Business Profile, plus Facebook ad creation and management.",
      },
      {
        q: "Will social media actually bring in cars?",
        a: "Social keeps your shop visible and trusted in the places customers check before choosing. It compounds with the rest of your marketing — visibility now, easier conversion everywhere else.",
      },
    ],
    pairsWith: ["digital-marketing", "retention-marketing", "boost-days"],
    included: [
      "Organic Facebook posts",
      "Organic Instagram posts",
      "Organic Google Business Profile posts",
      "Facebook ad creation and management",
      "Social comment and review response",
    ],
    bestFor:
      "Best when your shop needs consistency, a real local voice, and follow-through on the places customers already check.",
  },
  "retention-marketing": {
    image: siteMedia.graphics.serviceRetention,
    hero: {
      badge: "Repeat business",
      headline: "Make the first visit",
      headlineAccent: "the first of many.",
      subhead:
        "You already paid to earn every customer in your CRM. Newsletters, thank-you notes, and steady follow-up keep them coming back to you — not drifting to the shop down the road.",
      stats: [
        {
          value: "Monthly newsletter",
          label: "Real content customers actually open, written and sent for you.",
        },
        {
          value: "Thank-you notes",
          label: "A personal touch after service that customers remember.",
        },
        {
          value: "CRM refresh",
          label: "Clean customer data so your follow-up actually reaches people.",
        },
      ],
    },
    pains: [
      "Customers come once, seem happy — and you never see them again.",
      "Your CRM is full of names nobody has followed up with in years.",
      "You keep paying to win new customers while the old ones quietly drift away.",
    ],
    deliverables: [
      {
        icon: "mail",
        title: "Monthly email newsletter",
        description: "Written, designed, and sent for you — real content, not filler your customers delete.",
      },
      {
        icon: "heart",
        title: "Thank-you note creation",
        description: "A personal touch after service that keeps your shop memorable.",
      },
      {
        icon: "refresh",
        title: "CRM audit refresh",
        description: "Customer data cleaned up so follow-up actually lands.",
      },
    ],
    process: [
      {
        title: "Clean up the list",
        description: "A CRM audit makes sure follow-up reaches real customers at real addresses.",
      },
      {
        title: "Start the rhythm",
        description: "Newsletter and thank-you touchpoints go out on a steady monthly schedule.",
      },
      {
        title: "Stay in their orbit",
        description:
          "Your shop stays the first call when the next repair comes up — without you lifting a finger.",
      },
    ],
    testimonial: {
      quote: "I've felt a real sense of relief knowing everything is being handled with care and urgency.",
      name: "Virgilio Peralta",
      detail: "Auto Medics",
    },
    faqs: [
      {
        q: "Why market to people who already know us?",
        a: "Because they drift. A customer who doesn't hear from you between visits is a customer another shop can win. Follow-up protects the money you already spent earning them.",
      },
      {
        q: "What does the newsletter actually say?",
        a: "Useful, shop-specific content — maintenance reminders, seasonal advice, what's happening at your shop — written for customers, not spam folders.",
      },
      {
        q: "What if my customer list is a mess?",
        a: "That's expected. The CRM audit refresh is part of the service — we clean up the data first so the follow-up lands.",
      },
      {
        q: "How is this different from the appointment reminders my software sends?",
        a: "Reminders are transactional. Retention marketing builds the relationship between visits — so when the next repair comes up, there's no question who they call.",
      },
    ],
    pairsWith: ["direct-mail", "social-media-marketing", "digital-marketing"],
    included: ["Monthly email newsletter", "Thank-you note creation", "CRM audit refresh"],
    bestFor:
      "Best when acquisition is expensive and you need a steadier path for first-time or inactive customers to come back.",
  },
  "digital-marketing": {
    image: siteMedia.graphics.serviceDigital,
    hero: {
      badge: "Local visibility",
      headline: "Customers Google you",
      headlineAccent: "before they call you.",
      subhead:
        "Review management, Google Business Profile optimization, website audits, and vendor coordination — so when a local customer searches for a shop, yours looks like the obvious choice.",
      stats: [
        {
          value: "Reviews managed",
          label: "New reviews encouraged, and every review gets an answer.",
        },
        {
          value: "GBP optimized",
          label: "Your profile tuned for the searches that turn into phone calls.",
        },
        {
          value: "Vendors aligned",
          label: "Website and Google Ads vendors held to one connected plan.",
        },
      ],
    },
    pains: [
      "Your Google Business Profile hasn't been touched since the day you claimed it.",
      "Shops with worse work outrank you because their reviews keep growing and yours don't.",
      "Your website vendor, ads vendor, and reviews all live in separate silos nobody connects.",
    ],
    deliverables: [
      {
        icon: "star",
        title: "Google review management",
        description: "A steady process for earning new reviews — and answering every single one.",
      },
      {
        icon: "map-pin",
        title: "GBP optimization",
        description: "Your profile tuned for the local searches that turn into phone calls.",
      },
      {
        icon: "globe",
        title: "Semi-annual website audit",
        description: "Twice-a-year checks that catch what's quietly costing you calls.",
      },
      {
        icon: "users",
        title: "Website vendor coordination",
        description: "We speak web-vendor so you don't have to.",
      },
      {
        icon: "target",
        title: "Google Ads vendor coordination",
        description: "Your ads vendor held to the same plan as everything else.",
      },
    ],
    process: [
      {
        title: "Audit the foundation",
        description: "We review your profile, reviews, website, and ads for what's costing you calls.",
      },
      {
        title: "Optimize and manage",
        description:
          "The profile gets tuned, the review process starts running, and your vendors get pulled onto one plan.",
      },
      {
        title: "Measure what matters",
        description: "Progress is tracked against calls and booked appointments — not impressions.",
      },
    ],
    testimonial: {
      quote: "They have absolutely perfected marketing for auto repair.",
      name: "Terrie Walters",
      detail: "ASAP Auto Repair",
    },
    faqs: [
      {
        q: "How do you get more Google reviews?",
        a: "With a consistent ask-and-respond process after service — not incentives or gimmicks that violate Google's rules. As one example, one client went from 1–2 reviews a month to 15–20.",
      },
      {
        q: "I already have a website company. Do I need this?",
        a: "This isn't website building — it's making Google, reviews, your profile, and your vendors pull in the same direction. Coordinating that website company is part of the job.",
      },
      {
        q: "What is a Google Business Profile and why does it matter?",
        a: "It's the panel customers see on Google before they ever reach your website — hours, reviews, photos, directions. It's usually your first impression, and most shops leave it unmanaged.",
      },
      {
        q: "Do you run the Google Ads yourselves?",
        a: "We coordinate your Google Ads vendor so the ads follow the same plan as the rest of your marketing — and we'll tell you plainly if the spend isn't earning its keep.",
      },
    ],
    pairsWith: ["social-media-marketing", "directtrack-marketing", "retention-marketing"],
    included: [
      "Google Review Management",
      "GBP Optimization",
      "Semi-annual website audit",
      "Website vendor coordination",
      "Google Ads vendor coordination",
    ],
    bestFor:
      "Best when Google, reviews, ads, and website work need to stop feeling like disconnected vendor conversations.",
  },
  "boost-days": {
    image: siteMedia.graphics.serviceBoostDays,
    hero: {
      badge: "Focused demand push",
      headline: "Slow week coming?",
      headlineAccent: "Fill it on purpose.",
      subhead:
        "Boost Days concentrate email, text, and social around one offer with a deadline — a controlled demand push for open bays and soft weeks, without creating chaos at the counter.",
      stats: [
        {
          value: "One focused push",
          label: "Email, text, and social firing around the same offer and deadline.",
        },
        {
          value: "Calls checked",
          label: "Phone call evaluations confirm the demand got handled well at the counter.",
        },
        {
          value: "One deliverable",
          label: "Print, social, email, radio, or outdoor — built to support the push.",
        },
      ],
    },
    pains: [
      "Some weeks the schedule just dies — and you still make payroll either way.",
      "Panic discounting fills a day but trains customers to wait for the next deal.",
      "You need demand this month, not a six-month strategy.",
    ],
    deliverables: [
      {
        icon: "compass",
        title: "Boost Day strategy",
        description: "We pick the offer, the audience, and the timing around your open capacity.",
      },
      {
        icon: "zap",
        title: "Email, text, and social campaign",
        description: "All three channels firing around the same offer and deadline.",
      },
      {
        icon: "phone",
        title: "Phone call evaluations",
        description: "Ten calls evaluated so the response doesn't die at the front counter.",
      },
      {
        icon: "file",
        title: "One marketing deliverable",
        description: "Print, social, email, radio, or outdoor — built to support the push.",
      },
    ],
    process: [
      {
        title: "Spot the gap",
        description: "A soft week, open bays, or a seasonal lull — we scope the push around it.",
      },
      {
        title: "Fire the campaign",
        description: "Email, text, and social go out together around one offer with a real deadline.",
      },
      {
        title: "Answer the phones",
        description:
          "Call evaluations confirm the demand showed up and got booked — not lost at the counter.",
      },
    ],
    testimonial: {
      quote:
        "The ability to have a super smart marketing manager on staff without having the big commitment is great.",
      name: "ASC AutoCenter",
      detail: "ASC AutoCenter",
    },
    faqs: [
      {
        q: "When should I use a Boost Day?",
        a: "Open bays next month, a seasonal slump, a new service to push, or a schedule gap you can see coming — any time you need demand on a date, not someday.",
      },
      {
        q: "Will discounting hurt my brand?",
        a: "A Boost Day isn't panic discounting — it's a planned offer with a deadline, aimed at the right audience. The strategy step exists to protect your margins and your positioning.",
      },
      {
        q: "What if the calls come in and my counter can't keep up?",
        a: "That's why call evaluations are included — ten calls reviewed so you know the demand got answered and booked, not lost at the front desk.",
      },
      {
        q: "What's the marketing deliverable?",
        a: "One supporting piece built for the push — print, social, email, radio, or outdoor, whichever fits the offer and your market.",
      },
    ],
    pairsWith: ["directtrack-marketing", "direct-mail", "social-media-marketing"],
    included: [
      "Boost Day Strategy",
      "Email, text, and social campaign",
      "Phone Call Evaluations",
      "Marketing Deliverable",
    ],
    bestFor:
      "Best when the schedule softens and you need controlled demand without creating chaos at the counter.",
  },
};

export const getServiceDetail = (slug: string) => serviceDetails[slug];
