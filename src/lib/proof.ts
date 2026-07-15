import { siteMedia, type SiteImage } from "@/lib/site-media";

export type ProofAsset = SiteImage & {
  sourceUrl?: string;
};

export type GrowthProof = {
  client: string;
  result: string;
  context: string;
  category: "Growth" | "Reviews";
  image: ProofAsset;
  confidence: "drive-file-title";
};

export type TestimonialProof = {
  quote: string;
  name: string;
  shop: string;
  location: string;
  marker: string;
  image: SiteImage;
  source: string;
  confidence: "existing-site-copy" | "existing-marketing-material";
};

export type TestimonialVideoCandidate = {
  name: string;
  shop: string;
  sourceUrl: string;
  status: "needs-transcription";
};

export type ResultMetricProof = {
  client: string;
  eyebrow: string;
  metric: string;
  label: string;
  context: string;
  chartLabel: string;
  chartValues: number[];
  accent: "green" | "blue" | "navy";
  confidence: "drive-file-title";
};

export type VideoTestimonial = {
  name: string;
  shop: string;
  theme: string;
  videoSrc: string;
  posterSrc: string;
  posterAlt: string;
  sourceUrl: string;
  confidence: "drive-file-title";
};

export type ShopResultStory = {
  slug: string;
  name: string;
  logoSrc: string;
  relationship: string;
  location?: string;
  featured?: boolean;
  projected?: boolean;
  headline: string;
  baselineLabel: string;
  baselineValue: string;
  currentLabel: string;
  currentValue: string;
  change: string;
  summary: string;
  proofPoints: string[];
  strategies: string[];
};

export const shopResultStories: ShopResultStory[] = [
  {
    slug: "ssa-european-auto-repair",
    name: "SSA European Auto Repair",
    logoSrc: "/images/results/shop-logos/ssa-european-auto-repair.jpg",
    relationship: "Turnkey relationship since September 2022",
    location: "Kingston, Massachusetts",
    featured: true,
    projected: true,
    headline: "A $3.3M shop on track for $7.2M.",
    baselineLabel: "2023 annual baseline",
    baselineValue: "$3.3M",
    currentLabel: "Projected 2026 revenue",
    currentValue: "$7.2M",
    change: "Approximately +118%",
    summary:
      "SSA expanded its market presence, increased ARO, and filled the capacity of its South Shore location while preparing for a second shop.",
    proofPoints: [
      "ARO increased 33%",
      "25–30% new-customer mix each month",
      "11 technicians across 17 bays; second shop planned for September",
    ],
    strategies: ["Google Ads", "Postcards", "Local market presence"],
  },
  {
    slug: "torque-european",
    name: "Torque European",
    logoSrc: "/images/results/shop-logos/torque-european.png",
    relationship: "Onboarded August 2025",
    featured: true,
    headline: "Monthly revenue doubled.",
    baselineLabel: "Approx. monthly baseline",
    baselineValue: "$110K",
    currentLabel: "Consistent monthly revenue",
    currentValue: "$220K–$230K",
    change: "Approximately +100% to +109%",
    summary:
      "Since onboarding, Torque European has moved from approximately $110K per month to a consistent $220K–$230K per month—more than doubling at the top of the range.",
    proofPoints: ["Consistent $220K–$230K months", "More than doubled at the top of the range"],
    strategies: [],
  },
  {
    slug: "asap-auto-repair",
    name: "ASAP Auto Repair",
    logoSrc: "/images/results/shop-logos/asap-auto-repair.png",
    relationship: "October 2024 → June 2026",
    featured: true,
    headline: "From $125K to $200K per month.",
    baselineLabel: "Monthly baseline",
    baselineValue: "$125K",
    currentLabel: "June 2026 monthly revenue",
    currentValue: "$200K",
    change: "+60% revenue",
    summary:
      "ASAP increased monthly revenue and car count together, while setting an all-time revenue high in three of the last four months.",
    proofPoints: [
      "Monthly car count: 240 → 340 (approximately +42%)",
      "All-time revenue high in three of the last four months",
    ],
    strategies: ["Postcard route updates", "Direct Track"],
  },
  {
    slug: "dempsters-quality-car-care",
    name: "Dempster's Quality Car Care",
    logoSrc: "/images/results/shop-logos/dempsters-quality-car-care.jpg",
    relationship: "Consulting since August 2025 · VIP since January 2026",
    headline: "Four straight months. Four all-time revenue highs.",
    baselineLabel: "Monthly baseline",
    baselineValue: "$105K",
    currentLabel: "Current monthly revenue",
    currentValue: "$160K",
    change: "Approximately +52%",
    summary:
      "Since moving from consulting to VIP, Dempster’s has grown monthly revenue and car count while reaching a new revenue high in each of the last four months.",
    proofPoints: [
      "Monthly car count: 165 → 230 (approximately +39%)",
      "Four consecutive all-time revenue highs",
    ],
    strategies: ["Google Ads", "Postcards", "Direct Track", "VIP"],
  },
  {
    slug: "certified-auto-repair",
    name: "Certified Auto Repair",
    logoSrc: "/images/results/shop-logos/certified-auto-repair.png",
    relationship: "Turnkey relationship since September 2023",
    location: "Henrico, Virginia",
    projected: true,
    headline: "Marketing kept moving while leadership built Shop 2.",
    baselineLabel: "Annual baseline",
    baselineValue: "$2.8M",
    currentLabel: "Projected 2026 revenue",
    currentValue: "$3.7M",
    change: "Approximately +32%",
    summary:
      "Certified kept attracting new customers and growing ARO while leadership focused on opening a second shop.",
    proofPoints: [
      "ARO increased 25%",
      "25–30% new-customer mix each month",
      "6 technicians and 6 bays",
    ],
    strategies: ["Social media", "Google Ads optimization", "Marketing leadership"],
  },
  {
    slug: "sports-car-shop",
    name: "Sports Car Shop",
    logoSrc: "/images/results/shop-logos/sports-car-shop.png",
    relationship: "Onboarded August 2025",
    headline: "From 115 to more than 150 cars per month.",
    baselineLabel: "Approx. monthly baseline",
    baselineValue: "115 cars",
    currentLabel: "Current monthly car count",
    currentValue: "More than 150",
    change: "At least +30%",
    summary:
      "Since onboarding, Sports Car Shop has increased average monthly car count by at least 30%.",
    proofPoints: ["More than 150 cars per month", "At least 30% car-count growth"],
    strategies: [],
  },
];

export type ProspectResultStory = {
  slug: string;
  name: string;
  category: string;
  headline: string;
  narrative: string;
  comparison: string;
  comparisonLabel: string;
  change?: string;
  metrics: Array<{ value: string; label: string }>;
  proofPoints: string[];
  whyItMatters: string;
  logoSrc?: string;
  quote?: string;
};

export const prospectResultStories: ProspectResultStory[] = [
  {
    slug: "legendary-automotive-diesel-repair",
    name: "Legendary Automotive & Diesel Repair",
    category: "Retention + volume",
    headline: "From $260K to more than $700K in revenue.",
    narrative:
      "Between August 2024 and June 2026, Legendary grew revenue from $260,534 to $701,725 while increasing total car count from 406 to 1,123. Returning cars grew from 154 to 827, showing that the growth went well beyond first-time customers.",
    comparison: "$260,534 → $701,725",
    comparisonLabel: "Revenue · August 2024 to June 2026",
    change: "+169% revenue",
    metrics: [
      { value: "406 → 1,123", label: "Total cars · +177%" },
      { value: "154 → 827", label: "Returning cars · +437%" },
      { value: "252 → 296", label: "New cars · +17%" },
    ],
    proofPoints: ["Revenue increased approximately 169%", "Returning-car count increased approximately 437%"],
    whyItMatters: "The strongest growth was not just acquisition—it was customers coming back.",
  },
  {
    slug: "killian-auto-pros",
    name: "Killian Auto Pros",
    category: "Multi-location growth",
    headline: "From one location to four—and growth across the network.",
    narrative:
      "Turnkey began supporting Killian Auto Pros when it operated one Mauldin location. Killian has since expanded to four shops, while the three locations with comparable data increased combined average revenue by approximately 47% and combined average car count by approximately 38%.",
    comparison: "1 → 4 locations",
    comparisonLabel: "Mauldin to a four-shop network",
    change: "+47% combined average revenue",
    metrics: [
      { value: "$662K → $971K", label: "Combined average revenue · +47%" },
      { value: "1,236 → 1,706", label: "Combined average car count · +38%" },
      { value: "3×", label: "Spartanburg revenue and car count in its first six months" },
    ],
    proofPoints: ["Greenville revenue increased approximately 96%", "Fountain Inn revenue increased approximately 98%"],
    whyItMatters: "Marketing supported both established-shop growth and the demand needed to expand the footprint.",
    logoSrc: "/images/trust-logos/vip/29-killian-auto-pros-greenville.webp",
  },
  {
    slug: "dannys-automotive",
    name: "Danny’s Automotive",
    category: "Revenue + expansion",
    headline: "$1 million in growth—and a second location.",
    narrative:
      "Danny’s Automotive grew annual revenue from $1.8M to $2.8M in one year while adding nearly 1,000 cars. That growth helped support a second location, where the bays were already full during the soft launch.",
    comparison: "$1.8M → $2.8M",
    comparisonLabel: "Annual revenue · 2022 to 2023",
    change: "+56% annual revenue",
    metrics: [
      { value: "Nearly 1,000", label: "Additional cars" },
      { value: "2 locations", label: "Expanded footprint" },
      { value: "Full bays", label: "During the second shop’s soft launch" },
    ],
    proofPoints: ["Approximately $1M in annual revenue growth", "Second location opened with bays already full"],
    whyItMatters: "Demand translated into both higher revenue and enough confidence to open another shop.",
    logoSrc: "/images/results/shop-logos/tech-one-automotive.png",
  },
  {
    slug: "clarks-car-care",
    name: "Clark’s Car Care",
    category: "Demand + capacity",
    headline: "Marketing created enough demand to expand the shop.",
    narrative:
      "Clark’s Car Care reached the point where growth required more equipment, more technicians, and additional capacity. The shop reported being booked approximately one week out for oil changes while remaining heavily booked with service work.",
    comparison: "Demand → Expansion",
    comparisonLabel: "More work required more capacity",
    metrics: [
      { value: "2 more racks", label: "Planned equipment expansion" },
      { value: "7th technician", label: "Next planned hire" },
      { value: "1 week out", label: "Reported oil-change lead time" },
    ],
    proofPoints: ["More equipment needed", "More technicians needed", "Additional capacity needed"],
    whyItMatters: "Strong marketing matters when it creates enough real service demand to justify hiring and expansion.",
    quote:
      "We are buying two more racks, and I am calling the recruiter Monday to add a seventh tech. If you build it…and hire Turnkey…they will come.",
  },
  {
    slug: "g-g-autohaus",
    name: "G&G Autohaus",
    category: "Fast momentum",
    headline: "From $392K to $540K—and still climbing.",
    narrative:
      "Within months of beginning work with Turnkey, G&G Autohaus increased March revenue from $392,088 to $540,057 and crossed $500K for the first time. Two months later, the shop set another record at $567,963.",
    comparison: "$392,088 → $540,057",
    comparisonLabel: "March revenue · year over year",
    change: "+38% March revenue",
    metrics: [
      { value: "$500K+", label: "First month above the milestone" },
      { value: "$567,963", label: "New May record" },
      { value: "Within months", label: "After beginning work with Turnkey" },
    ],
    proofPoints: ["First month above $500K", "Another record two months later"],
    whyItMatters: "The result shows fast, measurable momentum followed by another record—not a one-off spike.",
    logoSrc: "/images/results/shop-logos/g-and-g-autohaus.png",
  },
  {
    slug: "car-care-center-nashville",
    name: "The Car Care Center — Nashville",
    category: "New-location ramp",
    headline: "A milestone the original shop reportedly took 32 years to reach—reached in year two.",
    narrative:
      "The Nashville location passed $1M during its second year in business—a milestone the original shop reportedly took 32 years to reach. Along the way, the Nashville team produced a record $35K week with only two technicians.",
    comparison: "32 years → Year 2",
    comparisonLabel: "Time to pass the $1M milestone",
    metrics: [
      { value: "$1M+", label: "Second-year milestone" },
      { value: "$35K", label: "Record week" },
      { value: "2 technicians", label: "Team behind the record week" },
    ],
    proofPoints: ["Passed $1M in year two", "Record $35K week with two technicians"],
    whyItMatters: "It shows how quickly a new location can build productive demand around a lean team.",
    logoSrc: "/images/results/shop-logos/the-car-care-center-nashville.jpg",
  },
  {
    slug: "pro-automotive",
    name: "Pro Automotive",
    category: "Marketing efficiency",
    headline: "$3.74 in tracked revenue for every advertising dollar.",
    narrative:
      "In the first full month of its campaign, Pro Automotive generated $3.74 in tracked revenue for every $1 invested across display, geofencing, OTT, and email marketing.",
    comparison: "$1 spend → $3.74 revenue",
    comparisonLabel: "First full campaign month",
    change: "3.74× ROAS",
    metrics: [
      { value: "Display", label: "Campaign channel" },
      { value: "Geofencing + OTT", label: "Campaign channels" },
      { value: "Email", label: "Campaign channel" },
    ],
    proofPoints: ["Tracked revenue tied to ad spend", "First full month of the campaign"],
    whyItMatters: "This is proof of marketing efficiency—not just topline growth.",
    logoSrc: "/images/results/shop-logos/pro-automotive-services.png",
  },
];

export const resultVerificationNotes = [
  "Confirm whether Killian Auto Pros’ 2026 figures should be described as year-to-date averages.",
  "Confirm whether Clark’s Car Care added six bays or had six bays.",
  "Confirm the calendar years for the G&G Autohaus March comparison.",
  "Confirm The Car Care Center — Nashville business-year period and whether $1M is annual or trailing-12-month revenue.",
] as const;

export const ownerTestimonials: TestimonialProof[] = [
  {
    quote: "They take care of everything.",
    name: "Len Pritchett",
    shop: "RPM Automotive",
    location: "Prairie Du Chien, WI",
    marker: "Marketing leadership",
    image: siteMedia.clients.lenPritchett,
    source: "Existing homepage testimonial copy",
    confidence: "existing-site-copy",
  },
  {
    quote: "One of the best investments I have made in my company.",
    name: "Jason Smith",
    shop: "M&M Car Care Center",
    location: "Northwest Indiana",
    marker: "Long-term growth",
    image: siteMedia.clients.jasonSmith,
    source: "Existing homepage testimonial copy",
    confidence: "existing-site-copy",
  },
  {
    quote: "We got to $300,000/month within one year at a brand new shop.",
    name: "Steve Killian",
    shop: "Killian Auto Pros",
    location: "Greenville, SC",
    marker: "Second-location ramp",
    image: siteMedia.clients.steveKillian,
    source: "Existing homepage testimonial copy and marketing material",
    confidence: "existing-marketing-material",
  },
];

export const growthProof: GrowthProof[] = [
  {
    client: "Auto Medics",
    result: "Broke 500 cars and $300k in revenue after onboarding.",
    context:
      "After onboarding with Turnkey, this shop crossed two important volume and revenue marks.",
    category: "Growth",
    image: {
      src: "/site-media/proof/auto-medics-growth.png",
      alt: "Auto Medics proof screenshot showing 500 cars and $300k revenue after onboarding",
      position: "50% 50%",
      sourceUrl: "https://drive.google.com/file/d/1_aogvxG5J7-h7BJhqC45ydkhmlEg8LFY/view",
    },
    confidence: "drive-file-title",
  },
  {
    client: "Torque European",
    result: "130% year-over-year revenue growth.",
    context: "A year-over-year growth example from a coordinated shop marketing push.",
    category: "Growth",
    image: {
      src: "/site-media/proof/torque-european-growth.png",
      alt: "Torque European proof screenshot showing 130 percent year-over-year revenue growth",
      position: "50% 50%",
      sourceUrl: "https://drive.google.com/file/d/1jcJovt5hN5mOlmkV1SP12LGNJ0rDAlFR/view",
    },
    confidence: "drive-file-title",
  },
  {
    client: "Sports Car Shop",
    result: "Broke $200k revenue for the first time after onboarding.",
    context:
      "After onboarding with Turnkey, this shop crossed a revenue threshold it had not hit before.",
    category: "Growth",
    image: {
      src: "/site-media/proof/sports-car-shop-growth.png",
      alt: "Sports Car Shop proof screenshot showing first time over $200k revenue after onboarding",
      position: "50% 50%",
      sourceUrl: "https://drive.google.com/file/d/1xa8fdycVy81oqedBdNIel32y39opaZyo/view",
    },
    confidence: "drive-file-title",
  },
  {
    client: "Chris Matthews Automotive",
    result: "Moved from 1-2 reviews per month to 15-20 reviews per month.",
    context:
      "A review-growth example showing how reputation work can become consistent instead of occasional.",
    category: "Reviews",
    image: {
      src: "/site-media/proof/chris-matthews-reviews.png",
      alt: "Chris Matthews Automotive proof screenshot showing monthly review growth",
      position: "50% 50%",
      sourceUrl: "https://drive.google.com/file/d/1INgtyCO7amC61iV2ghyvFN8H6IC5Zp1e/view",
    },
    confidence: "drive-file-title",
  },
];

export const resultMetricProof: ResultMetricProof[] = [
  {
    client: "Auto Medics",
    eyebrow: "Car count + revenue",
    metric: "500+",
    label: "cars, plus $300k revenue after onboarding",
    context:
      "A client-specific growth example where car count and revenue both crossed important thresholds.",
    chartLabel: "Onboarding momentum",
    chartValues: [38, 44, 51, 59, 67, 76, 88, 100],
    accent: "green",
    confidence: "drive-file-title",
  },
  {
    client: "Torque European",
    eyebrow: "Year-over-year growth",
    metric: "130%",
    label: "YoY revenue growth",
    context: "A coordinated marketing push tied to a measurable year-over-year revenue lift.",
    chartLabel: "Revenue growth",
    chartValues: [34, 42, 50, 62, 73, 86, 100],
    accent: "blue",
    confidence: "drive-file-title",
  },
  {
    client: "Sports Car Shop",
    eyebrow: "Revenue milestone",
    metric: "$200k+",
    label: "monthly revenue crossed for the first time",
    context:
      "After onboarding with Turnkey, the shop crossed a revenue mark it had not hit before.",
    chartLabel: "Revenue milestone",
    chartValues: [46, 48, 55, 63, 72, 84, 100],
    accent: "navy",
    confidence: "drive-file-title",
  },
];

export const reviewGrowthProof: ResultMetricProof = {
  client: "Chris Matthews Automotive",
  eyebrow: "Google review growth",
  metric: "15-20",
  label: "reviews per month, up from 1-2",
  context:
    "A reputation-growth example showing review activity becoming consistent instead of occasional.",
  chartLabel: "Monthly review volume",
  chartValues: [10, 11, 12, 36, 52, 72, 88, 100],
  accent: "blue",
  confidence: "drive-file-title",
};

export const videoTestimonials: VideoTestimonial[] = [
  {
    name: "Steve Killian",
    shop: "Killian Auto Pros",
    theme: "Second-location growth",
    videoSrc: "/videos/testimonials/steve-killian-testimonial.mp4",
    posterSrc: "/images/video-posters/steve-killian-testimonial-poster.webp",
    posterAlt: "Steve Killian testimonial video poster for Killian Auto Pros",
    sourceUrl: "https://drive.google.com/file/d/1BFYlCOmlgDoPPRRmuSzI7mI8M32WDvz_/view",
    confidence: "drive-file-title",
  },
  {
    name: "Jason Smith",
    shop: "M&M Car Care Center",
    theme: "Long-term marketing investment",
    videoSrc: "/videos/testimonials/jason-smith-testimonial.mp4",
    posterSrc: "/images/video-posters/jason-smith-testimonial-poster.webp",
    posterAlt: "Jason Smith testimonial video poster for M&M Car Care Center",
    sourceUrl: "https://drive.google.com/file/d/1lW0FJMMX9RhdVxICj6aQvjMQWje2nLNO/view",
    confidence: "drive-file-title",
  },
  {
    name: "Ryan Sullivan",
    shop: "Sullivan's",
    theme: "Shop-owner testimonial",
    videoSrc: "/videos/testimonials/ryan-sullivan-testimonial.mp4",
    posterSrc: "/images/video-posters/ryan-sullivan-testimonial-poster.webp",
    posterAlt: "Ryan Sullivan testimonial video poster for Sullivan's",
    sourceUrl: "https://drive.google.com/file/d/1YQYZJAEOUNwlpREraEuWNmcG9yHlyXMq/view",
    confidence: "drive-file-title",
  },
];

export const testimonialVideoCandidates: TestimonialVideoCandidate[] = [
  {
    name: "Ryan Sullivan",
    shop: "Sullivan's",
    sourceUrl: "https://drive.google.com/file/d/1YQYZJAEOUNwlpREraEuWNmcG9yHlyXMq/view",
    status: "needs-transcription",
  },
  {
    name: "Jason Keller",
    shop: "Rocky Mountain",
    sourceUrl: "https://drive.google.com/file/d/12SVGefsCI59CbwgBxSSAGB7pxLuekhvn/view",
    status: "needs-transcription",
  },
  {
    name: "Jonathan Hummel",
    shop: "Hummel's",
    sourceUrl: "https://drive.google.com/file/d/1DxJ5cdR5kW5SiadPQE1cPtbce-x46ii0/view",
    status: "needs-transcription",
  },
  {
    name: "Mike Winter",
    shop: "MDP Diesel & Auto Repair",
    sourceUrl: "https://drive.google.com/file/d/1JGnlFXcRSMEiN6h6c-_nd46fOpIEt7xB/view",
    status: "needs-transcription",
  },
  {
    name: "Libby Canandy",
    shop: "Modern Brake & Alignment",
    sourceUrl: "https://drive.google.com/file/d/1DZ7DlHjqb2YDmqqGDmnBZZXccRShoQwL/view",
    status: "needs-transcription",
  },
  {
    name: "Brian Jesko",
    shop: "Brian Jesko testimonial",
    sourceUrl: "https://drive.google.com/file/d/1Ls9zqtM-KEI2J7bOsVEb6gghjr9E9vHQ/view",
    status: "needs-transcription",
  },
  {
    name: "Brian Ordway",
    shop: "Brian Ordway testimonial",
    sourceUrl: "https://drive.google.com/file/d/13nh1moIdmewQGBP5DfWow33njpLQEEfp/view",
    status: "needs-transcription",
  },
  {
    name: "Steve Killian",
    shop: "Killian Auto Pros",
    sourceUrl: "https://drive.google.com/file/d/1BFYlCOmlgDoPPRRmuSzI7mI8M32WDvz_/view",
    status: "needs-transcription",
  },
  {
    name: "Jason Smith",
    shop: "M&M Car Care Center",
    sourceUrl: "https://drive.google.com/file/d/1lW0FJMMX9RhdVxICj6aQvjMQWje2nLNO/view",
    status: "needs-transcription",
  },
];
