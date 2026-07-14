export type Service = {
  slug: string;
  name: string;
  shortName?: string;
  tagline: string;
  summary: string;
  outcomes: string[];
  featured?: boolean;
  isNew?: boolean;
};

export const services: Service[] = [
  {
    slug: "vip-marketing-manager",
    name: "VIP Marketing Manager",
    shortName: "VIP Marketing Manager",
    tagline: "Marketing off your plate, with one team owning the plan.",
    summary:
      "Done-for-you marketing leadership for shops that need strategy, execution, vendor coordination, reporting, and clear next moves without managing every detail themselves.",
    outcomes: [
      "One team owning the whole plan",
      "Weekly rhythm, monthly reporting",
      "Direct mail, digital, retention — coordinated",
      "Vendor cleanup and budget clarity",
    ],
    featured: true,
  },
  {
    slug: "directtrack-marketing",
    name: "DirectTrack Marketing",
    tagline: "Our newest service — trackable acquisition campaigns averaging 7x–15x ROI.",
    summary:
      "Multi-channel campaigns wired with call tracking and household-level follow-up, so urgent growth bets get a clearer read on what is moving — with an average ROI of 7x–15x.",
    outcomes: [
      "7x–15x average ROI",
      "Trackable phone numbers",
      "Attribution reporting",
      "Optimization loops",
    ],
    isNew: true,
  },
  {
    slug: "marketing-consulting",
    name: "Marketing Consulting",
    tagline: "Outside eyes for teams that already have pieces in motion.",
    summary:
      "Sit down with a marketing team that knows auto repair. We audit what is working, what is leaking, what to keep, and what to change next.",
    outcomes: ["Marketing audit", "90-day focus plan", "Budget guidance", "Vendor scorecard"],
  },
  {
    slug: "direct-mail",
    name: "Direct Mail",
    tagline: "Sharper lists, offers, timing, and follow-up.",
    summary:
      "Targeted mailers built around the market, message, offer, timing, and follow-up cadence that fit the shop.",
    outcomes: ["Neighborhood targeting", "Custom creative", "Offer strategy", "Call tracking"],
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    tagline: "Social that sounds like your shop and stays consistent.",
    summary:
      "We interview your team, learn your voice, and keep social consistent with real shop proof instead of generic posts.",
    outcomes: [
      "On-brand content",
      "Community engagement",
      "Review amplification",
      "Local presence",
    ],
  },
  {
    slug: "retention-marketing",
    name: "Retention Marketing",
    tagline: "Protect the money you already spent acquiring customers.",
    summary:
      "CRM, email, and follow-up systems that help first-time and dormant customers become the kind of repeat business worth keeping.",
    outcomes: ["Reactivation campaigns", "Service reminders", "Review requests", "Loyalty rhythm"],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    tagline: "Google, GBP, reviews, ads — coordinated, not scattered.",
    summary:
      "SEO, Google Business Profile, paid search, and reputation working together instead of becoming another set of disconnected vendors.",
    outcomes: ["Google Business Profile", "Local SEO", "Paid search", "Review strategy"],
  },
  {
    slug: "boost-days",
    name: "Boost Days",
    tagline: "Controlled demand when the schedule softens.",
    summary:
      "Short, focused promotions for slow spots, open bays, and campaign timing that needs a practical push.",
    outcomes: ["Slow-day promotions", "Bay optimization", "Seasonal pushes", "Fast execution"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const BOOKING_URL = "/book-a-call";
export const GHL_DISCOVERY_CALL_BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/booking/yu2OePYtPJE21ORfX8a0";

export const CONSULTATION_URL = BOOKING_URL;
