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
    legacyPaths: ["/be-the-guide/"],
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
    date: "Jun 2023",
    tag: "Direct Mail",
    title: "Why Direct Mail Still Works for Repair Shops",
    description:
      "A Turnkey direct mail resource graphic from the original site, built around shop-owner acquisition campaigns.",
    dek: "Direct mail still earns a place when the list, offer, timing, and follow-up are treated like a campaign instead of a print order.",
    image: siteMedia.graphics.directMail,
    href: resourcePath("direct-mail-for-repair-shops"),
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/06/2023-06-27-blog-RW-direct-mail.png",
    takeaways: [
      "Direct mail works best with a specific market, message, offer, and timing.",
      "Tracking matters because mail should be judged by calls, appointments, and customer quality.",
      "Mail is strongest when it is connected to digital, CRM, and follow-up.",
    ],
    sections: [
      {
        heading: "A mailer is not the strategy.",
        body: "The postcard is only one piece. The real work is deciding who should receive it, what problem the offer solves, when it should land, and how the shop follows up when demand starts coming in.",
      },
      {
        heading: "The best campaigns connect channels.",
        body: "Mail can support new customer acquisition, second-location growth, customer reactivation, and dense-market visibility. It works harder when call tracking and follow-up are connected from the start.",
      },
    ],
  },
  {
    slug: "auto-repair-marketing-plan",
    date: "Jan 2023",
    tag: "Planning",
    title: "How to Think About an Auto Repair Marketing Plan",
    seoTitle: "Auto Repair Marketing Plan Guide | Turnkey Marketing",
    description:
      "A practical marketing plan framework for aligning goals, tactics, messages, and measurement.",
    dek: "A marketing plan should make budget decisions clearer, vendor conversations easier, and the next move less dependent on guesswork.",
    image: siteMedia.graphics.marketingPlan,
    href: resourcePath("auto-repair-marketing-plan"),
    sourceAsset: "https://turnkeyautomarketing.com/wp-content/uploads/2023/01/marketing-plan2.png",
    takeaways: [
      "Start with the shop goal, not the channel.",
      "Separate growth, retention, reputation, and capacity questions.",
      "Use reporting to decide the next move, not just prove activity happened.",
    ],
    sections: [
      {
        heading: "The plan has to match the shop.",
        body: "A shop trying to ramp a second location needs a different marketing rhythm than a full shop trying to improve customer quality. The plan should reflect capacity, market, advisor follow-through, and the work the owner wants more of.",
      },
      {
        heading: "The next move should be obvious.",
        body: "Good reporting should make it clear what deserves more budget, what needs fixing, and what should stop. That is where marketing starts feeling manageable instead of scattered.",
      },
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
    title: "Jason Smith Marketing Plan",
    description:
      "A source-site client proof graphic about creating a yearly marketing plan with Turnkey.",
    dek: "A client-proof example of why yearly planning matters when a shop wants marketing to support growth instead of reacting month to month.",
    image: siteMedia.graphics.jasonSmithPlan,
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
        heading: "Growth needs a calendar.",
        body: "A yearly marketing plan gives the shop a rhythm for acquisition, retention, reputation, seasonal pushes, and budget decisions. It also keeps the owner from having to restart the strategy conversation every month.",
      },
      {
        heading: "Accountability keeps it useful.",
        body: "The plan only matters if someone owns execution and reporting. That is where a marketing team can remove the burden from the shop owner while still keeping the direction clear.",
      },
    ],
  },
];

export const getResourcePost = (slug: string) => resourcePosts.find((post) => post.slug === slug);
