export type CaseStudyWorkflowStatus =
  | "evidence-gap"
  | "interview-needed"
  | "ready-for-internal-review"
  | "participant-review"
  | "approved"
  | "published";

export type ApprovalState = "needed" | "not-applicable" | "already-public" | "approved";

export type EvidenceReference = {
  source: string;
  supports: string;
  confidence: "approved-internal-brief" | "existing-public-site" | "asset-metadata";
};

export type CaseStudyCandidate = {
  slug: string;
  shopName: string;
  priority: 1 | 2 | 3 | 4 | 5;
  status: CaseStudyWorkflowStatus;
  documented: {
    startingCondition: boolean;
    marketingWork: boolean;
    timeframe: boolean;
    measuredOutcome: boolean;
    clientQuote: boolean;
    serviceLinks: string[];
    vendors: string[];
  };
  missingEvidence: string[];
  approvals: {
    shopParticipation: ApprovalState;
    metrics: ApprovalState;
    quote: ApprovalState;
    logoAndName: ApprovalState;
    shopSyndication: ApprovalState;
    vendorSyndication: ApprovalState;
  };
  evidence: EvidenceReference[];
  cautions: string[];
};

export type CaseStudyMetric = {
  label: string;
  before: string;
  after: string;
  change: string;
  basis: string;
  comparison: string;
};

export type ReviewOnlyCaseStudyDraft = {
  slug: string;
  reviewOnly: true;
  title: string;
  seoTitle: string;
  seoDescription: string;
  shop: {
    name: string;
    logoSrc: string;
    logoAlt: string;
    logoWidth: number;
    logoHeight: number;
  };
  timeframe: string;
  startingCondition: string;
  workPerformed: {
    summary: string;
    items: string[];
    serviceLinks: { href: string; label: string }[];
  };
  outcome: {
    summary: string;
    metrics: CaseStudyMetric[];
  };
  quote: {
    text: string;
    attribution: string;
    sourceStatus: "already-public-on-turnkey-site";
  };
  caveat: string;
  evidence: EvidenceReference[];
};

const resultsBrief = "RESULTS-PAGE-CONTEXT-AND-PROMPT.md";
const googleReviews = "src/lib/google-reviews.ts";
const proofLibrary = "src/lib/proof.ts";
const resourceLibrary = "src/lib/resource-posts.ts";

export const caseStudyCandidates: CaseStudyCandidate[] = [
  {
    slug: "asap-auto-repair",
    shopName: "ASAP Auto Repair",
    priority: 1,
    status: "ready-for-internal-review",
    documented: {
      startingCondition: true,
      marketingWork: true,
      timeframe: true,
      measuredOutcome: true,
      clientQuote: true,
      serviceLinks: ["/services/direct-mail", "/services/directtrack-marketing"],
      vendors: [],
    },
    missingEvidence: [
      "Underlying performance report supporting the October 2024 and June 2026 figures",
      "Direct source URL for the Terrie Walters review",
      "Official shop website URL for the backlink packet",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "already-public",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "not-applicable",
    },
    evidence: [
      {
        source: `${resultsBrief}:27-38`,
        supports: "Dates, revenue, car count, postcard route updates, and DirectTrack work",
        confidence: "approved-internal-brief",
      },
      {
        source: `${googleReviews}:50-55`,
        supports: "Terrie Walters quote and ASAP Auto Repair attribution",
        confidence: "existing-public-site",
      },
    ],
    cautions: [
      "Do not use the ambiguous $200K DirectTrack claim held in the approved brief.",
      "Describe the result as occurring during the period working with Turnkey, not as solely caused by marketing.",
    ],
  },
  {
    slug: "pro-automotive-services-townsquare",
    shopName: "Pro Automotive Services",
    priority: 1,
    status: "interview-needed",
    documented: {
      startingCondition: false,
      marketingWork: true,
      timeframe: false,
      measuredOutcome: true,
      clientQuote: false,
      serviceLinks: ["/services/directtrack-marketing"],
      vendors: ["Townsquare"],
    },
    missingEvidence: [
      "Starting shop condition or campaign baseline",
      "Exact first-full-month dates",
      "Client quote",
      "Underlying attribution report and revenue definition",
      "Official Pro Automotive Services and Townsquare URLs",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "needed",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "needed",
    },
    evidence: [
      {
        source: `${resultsBrief}:172-181`,
        supports:
          "Campaign channels, Townsquare involvement, and 3.74x tracked revenue to ad spend",
        confidence: "approved-internal-brief",
      },
    ],
    cautions: ["Call the result 3.74x ROAS, not 374% ROI."],
  },
  {
    slug: "killian-auto-pros",
    shopName: "Killian Auto Pros",
    priority: 1,
    status: "interview-needed",
    documented: {
      startingCondition: true,
      marketingWork: false,
      timeframe: true,
      measuredOutcome: true,
      clientQuote: true,
      serviceLinks: [],
      vendors: [],
    },
    missingEvidence: [
      "Exact marketing work tied to the expansion and location results",
      "Confirmation that 2026 figures are YTD averages",
      "Underlying location-level reports",
      "Shop website URL and publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "already-public",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "not-applicable",
    },
    evidence: [
      {
        source: `${resultsBrief}:113-129`,
        supports:
          "One-to-four-location narrative and location-level car count and revenue averages",
        confidence: "approved-internal-brief",
      },
      {
        source: `${proofLibrary}:79-87`,
        supports: "Steve Killian quote and portrait reference",
        confidence: "existing-public-site",
      },
    ],
    cautions: ["Do not invent Spartanburg figures or omit the average/YTD qualifier."],
  },
  {
    slug: "dempsters-quality-car-care",
    shopName: "Dempster's Quality Car Care",
    priority: 1,
    status: "interview-needed",
    documented: {
      startingCondition: true,
      marketingWork: true,
      timeframe: true,
      measuredOutcome: true,
      clientQuote: false,
      serviceLinks: [
        "/services/vip-marketing-manager",
        "/services/direct-mail",
        "/services/directtrack-marketing",
        "/services/digital-marketing",
      ],
      vendors: [],
    },
    missingEvidence: [
      "Client quote",
      "Named Google Ads vendor, if it will participate",
      "Underlying monthly reports",
      "Shop website URL and publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "needed",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "needed",
    },
    evidence: [
      {
        source: `${resultsBrief}:40-50`,
        supports: "Consulting/VIP dates, revenue, car count, record months, and campaign mix",
        confidence: "approved-internal-brief",
      },
    ],
    cautions: [],
  },
  {
    slug: "certified-auto-repair",
    shopName: "Certified Auto Repair",
    priority: 2,
    status: "interview-needed",
    documented: {
      startingCondition: true,
      marketingWork: true,
      timeframe: true,
      measuredOutcome: true,
      clientQuote: false,
      serviceLinks: ["/services/social-media-marketing", "/services/digital-marketing"],
      vendors: [],
    },
    missingEvidence: [
      "Client quote",
      "Named Google Ads vendor",
      "Underlying reports",
      "Publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "needed",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "needed",
    },
    evidence: [
      {
        source: `${resultsBrief}:52-63`,
        supports: "Relationship date, capacity, revenue, ARO, customer mix, and documented work",
        confidence: "approved-internal-brief",
      },
    ],
    cautions: ["The $3.7M figure is a 2026 projection, not an actual result."],
  },
  {
    slug: "ssa-european-auto-repair",
    shopName: "SSA European Auto Repair",
    priority: 2,
    status: "interview-needed",
    documented: {
      startingCondition: true,
      marketingWork: true,
      timeframe: true,
      measuredOutcome: true,
      clientQuote: false,
      serviceLinks: ["/services/direct-mail", "/services/digital-marketing"],
      vendors: [],
    },
    missingEvidence: [
      "Client quote",
      "Named Google Ads vendor",
      "Underlying reports",
      "Publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "needed",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "needed",
    },
    evidence: [
      {
        source: `${resultsBrief}:65-79`,
        supports: "Relationship date, capacity, revenue, ARO, customer mix, and documented work",
        confidence: "approved-internal-brief",
      },
    ],
    cautions: [
      "The $7.2M figure is a 2026 projection.",
      "Do not publish a second-location opening date until the year is confirmed.",
    ],
  },
  {
    slug: "legendary-automotive-diesel-repair",
    shopName: "Legendary Automotive & Diesel Repair",
    priority: 2,
    status: "interview-needed",
    documented: {
      startingCondition: true,
      marketingWork: false,
      timeframe: true,
      measuredOutcome: true,
      clientQuote: false,
      serviceLinks: [],
      vendors: [],
    },
    missingEvidence: [
      "Marketing work performed",
      "Client quote",
      "Revenue reporting cadence",
      "Underlying reports",
      "Publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "needed",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "not-applicable",
    },
    evidence: [
      {
        source: `${resultsBrief}:97-111`,
        supports: "August 2024 and June 2026 revenue and car-count comparisons",
        confidence: "approved-internal-brief",
      },
    ],
    cautions: [
      "Do not call the revenue figures monthly until cadence is confirmed.",
      "Revenue growth is approximately 169%, not 239%.",
    ],
  },
  {
    slug: "gg-autohaus",
    shopName: "G&G Autohaus",
    priority: 2,
    status: "interview-needed",
    documented: {
      startingCondition: true,
      marketingWork: false,
      timeframe: true,
      measuredOutcome: true,
      clientQuote: false,
      serviceLinks: [],
      vendors: [],
    },
    missingEvidence: [
      "Starting business challenge",
      "Marketing work performed",
      "Client quote",
      "Underlying reports",
      "Publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "needed",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "not-applicable",
    },
    evidence: [
      {
        source: `${resultsBrief}:153-161`,
        supports: "Relationship date and March/May revenue milestones",
        confidence: "approved-internal-brief",
      },
    ],
    cautions: ["Keep the March comparison year over year; do not imply every month grew 38%."],
  },
  {
    slug: "torque-european",
    shopName: "Torque European",
    priority: 3,
    status: "evidence-gap",
    documented: {
      startingCondition: true,
      marketingWork: false,
      timeframe: false,
      measuredOutcome: true,
      clientQuote: false,
      serviceLinks: [],
      vendors: [],
    },
    missingEvidence: [
      "Marketing work performed",
      "Comparison end date",
      "Client quote",
      "Underlying reports",
      "Publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "needed",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "not-applicable",
    },
    evidence: [
      {
        source: `${resultsBrief}:81-87`,
        supports: "August 2025 onboarding and approximate monthly revenue change",
        confidence: "approved-internal-brief",
      },
      {
        source: `${proofLibrary}:105-117`,
        supports: "Separate 130% year-over-year proof asset",
        confidence: "asset-metadata",
      },
    ],
    cautions: [
      "Do not combine the separate 130% YoY claim with the $110K to $220K-$230K comparison.",
    ],
  },
  {
    slug: "sports-car-shop",
    shopName: "Sports Car Shop",
    priority: 3,
    status: "evidence-gap",
    documented: {
      startingCondition: true,
      marketingWork: false,
      timeframe: false,
      measuredOutcome: true,
      clientQuote: false,
      serviceLinks: [],
      vendors: [],
    },
    missingEvidence: [
      "Marketing work performed",
      "Comparison end date",
      "Client quote",
      "Underlying reports",
      "Publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "needed",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "not-applicable",
    },
    evidence: [
      {
        source: `${resultsBrief}:89-95`,
        supports: "August 2025 onboarding and monthly car-count change",
        confidence: "approved-internal-brief",
      },
      {
        source: `${proofLibrary}:119-131`,
        supports: "Separate first-$200K proof asset",
        confidence: "asset-metadata",
      },
    ],
    cautions: ["Keep the $200K milestone separate unless it is independently verified."],
  },
  {
    slug: "car-care-center-nashville",
    shopName: "The Car Care Center — Nashville",
    priority: 3,
    status: "evidence-gap",
    documented: {
      startingCondition: false,
      marketingWork: false,
      timeframe: false,
      measuredOutcome: true,
      clientQuote: false,
      serviceLinks: [],
      vendors: [],
    },
    missingEvidence: [
      "Starting condition",
      "Marketing work",
      "Client quote",
      "Exact reporting period",
      "Definition of the $1M result",
      "Publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "needed",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "not-applicable",
    },
    evidence: [
      {
        source: `${resultsBrief}:163-170`,
        supports: "$35K record week and reported $1M milestone",
        confidence: "approved-internal-brief",
      },
    ],
    cautions: ["Do not describe $1M as annual revenue until the reporting basis is confirmed."],
  },
  {
    slug: "clarks-car-care",
    shopName: "Clark's Car Care",
    priority: 4,
    status: "evidence-gap",
    documented: {
      startingCondition: false,
      marketingWork: false,
      timeframe: false,
      measuredOutcome: false,
      clientQuote: true,
      serviceLinks: [],
      vendors: [],
    },
    missingEvidence: [
      "Starting condition",
      "Marketing work",
      "Dates",
      "Measured before/after outcome",
      "Underlying reports",
      "Publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "needed",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "not-applicable",
    },
    evidence: [
      {
        source: `${resultsBrief}:143-151`,
        supports: "Customer quote and reported hiring/equipment demand",
        confidence: "approved-internal-brief",
      },
    ],
    cautions: ["Do not publish the ambiguous six-bay claim."],
  },
  {
    slug: "tech-one-automotive",
    shopName: "Tech One Automotive / internal Danny's Automotive reference",
    priority: 5,
    status: "evidence-gap",
    documented: {
      startingCondition: true,
      marketingWork: false,
      timeframe: true,
      measuredOutcome: true,
      clientQuote: true,
      serviceLinks: [],
      vendors: [],
    },
    missingEvidence: [
      "Correct public business identity",
      "Marketing work",
      "Underlying reports",
      "Publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "needed",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "not-applicable",
    },
    evidence: [
      {
        source: `${resultsBrief}:131-141`,
        supports: "Held identity notes and reported revenue/car-count results",
        confidence: "approved-internal-brief",
      },
      {
        source: `${googleReviews}:28-34`,
        supports: "Christopher Taylor quote attributed to Danny's Automotive",
        confidence: "existing-public-site",
      },
    ],
    cautions: ["The approved brief holds the entire story until the public identity is confirmed."],
  },
  {
    slug: "auto-medics",
    shopName: "Auto Medics",
    priority: 3,
    status: "evidence-gap",
    documented: {
      startingCondition: false,
      marketingWork: false,
      timeframe: false,
      measuredOutcome: true,
      clientQuote: true,
      serviceLinks: [],
      vendors: [],
    },
    missingEvidence: [
      "Baseline",
      "Timeframe",
      "Marketing work",
      "Underlying report beyond asset title",
      "Publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "already-public",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "not-applicable",
    },
    evidence: [
      {
        source: `${proofLibrary}:90-104`,
        supports: "500-car and $300K milestone asset",
        confidence: "asset-metadata",
      },
      {
        source: `${googleReviews}:42-48`,
        supports: "Virgilio Peralta quote",
        confidence: "existing-public-site",
      },
    ],
    cautions: ["The result currently relies on a Drive filename, not an exported report."],
  },
  {
    slug: "chris-matthews-automotive",
    shopName: "Chris Matthews Automotive",
    priority: 3,
    status: "evidence-gap",
    documented: {
      startingCondition: true,
      marketingWork: false,
      timeframe: false,
      measuredOutcome: true,
      clientQuote: false,
      serviceLinks: ["/services/digital-marketing"],
      vendors: [],
    },
    missingEvidence: [
      "Timeframe",
      "Exact reputation work",
      "Client quote",
      "Underlying report beyond asset title",
      "Publication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "needed",
      logoAndName: "needed",
      shopSyndication: "needed",
      vendorSyndication: "not-applicable",
    },
    evidence: [
      {
        source: `${proofLibrary}:133-146`,
        supports: "Review growth from 1-2 to 15-20 per month",
        confidence: "asset-metadata",
      },
    ],
    cautions: ["The result currently relies on a Drive filename, not an exported report."],
  },
  {
    slug: "mm-car-care-center",
    shopName: "M&M Car Care Center",
    priority: 4,
    status: "evidence-gap",
    documented: {
      startingCondition: true,
      marketingWork: true,
      timeframe: false,
      measuredOutcome: false,
      clientQuote: true,
      serviceLinks: ["/services/vip-marketing-manager", "/services/marketing-consulting"],
      vendors: [],
    },
    missingEvidence: [
      "Measured outcome",
      "Measurement timeframe",
      "Underlying report",
      "Shop syndication permission",
    ],
    approvals: {
      shopParticipation: "needed",
      metrics: "needed",
      quote: "already-public",
      logoAndName: "already-public",
      shopSyndication: "needed",
      vendorSyndication: "not-applicable",
    },
    evidence: [
      {
        source: `${resourceLibrary}:521-579`,
        supports: "Existing yearly marketing plan story, quote, portrait, and VIP link",
        confidence: "existing-public-site",
      },
    ],
    cautions: ["This is currently a client story, not a results case study."],
  },
];

const asapEvidence = caseStudyCandidates.find(
  (candidate) => candidate.slug === "asap-auto-repair",
)?.evidence;

if (!asapEvidence) {
  throw new Error("ASAP Auto Repair evidence inventory is required for its review-only draft.");
}

export const reviewOnlyCaseStudyDrafts: ReviewOnlyCaseStudyDraft[] = [
  {
    slug: "asap-auto-repair",
    reviewOnly: true,
    title: "How ASAP Auto Repair grew monthly revenue and car count",
    seoTitle: "ASAP Auto Repair Growth Case Study | Turnkey Marketing",
    seoDescription:
      "See ASAP Auto Repair's revenue and car-count growth from October 2024 to June 2026 during its work with Turnkey Marketing.",
    shop: {
      name: "ASAP Auto Repair",
      logoSrc: "/images/results/shop-logos/asap-auto-repair.png",
      logoAlt: "ASAP Auto Repair logo",
      logoWidth: 792,
      logoHeight: 612,
    },
    timeframe: "October 2024 through June 2026",
    startingCondition:
      "At the beginning of the documented comparison period in October 2024, ASAP Auto Repair reported $125,000 in monthly revenue and 240 cars per month.",
    workPerformed: {
      summary:
        "The documented work during the comparison period included updated postcard routes and DirectTrack Marketing.",
      items: [
        "Updated postcard routes to support the shop's direct-mail activity.",
        "Used DirectTrack Marketing as part of the shop's customer-acquisition work.",
      ],
      serviceLinks: [
        { href: "/services/direct-mail", label: "Auto repair direct mail" },
        { href: "/services/directtrack-marketing", label: "DirectTrack Marketing" },
      ],
    },
    outcome: {
      summary:
        "By June 2026, ASAP Auto Repair reported $200,000 in monthly revenue and 340 cars per month. The approved internal brief also records an all-time revenue high in three of the four most recent months.",
      metrics: [
        {
          label: "Monthly revenue",
          before: "$125,000",
          after: "$200,000",
          change: "+60%",
          basis: "Monthly revenue reported by the shop",
          comparison: "October 2024 versus June 2026",
        },
        {
          label: "Monthly car count",
          before: "240",
          after: "340",
          change: "Approximately +42%",
          basis: "Cars per month reported by the shop",
          comparison: "October 2024 versus June 2026",
        },
      ],
    },
    quote: {
      text: "They have absolutely perfected marketing for auto repair.",
      attribution: "Terrie Walters, ASAP Auto Repair",
      sourceStatus: "already-public-on-turnkey-site",
    },
    caveat:
      "This is a client-specific example. Results vary by shop, market, investment, capacity, and execution. The figures describe growth during the documented period and do not claim that marketing was the only contributing factor.",
    evidence: asapEvidence,
  },
];

const duplicateSlugs = caseStudyCandidates
  .map((candidate) => candidate.slug)
  .filter((slug, index, slugs) => slugs.indexOf(slug) !== index);

if (duplicateSlugs.length > 0) {
  throw new Error(`Duplicate case-study candidate slugs: ${duplicateSlugs.join(", ")}`);
}
