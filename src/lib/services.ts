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
    tagline: "Your outside marketing department, with the plan and execution owned by one team.",
    summary:
      "VIP brings the full Turnkey service stack together with account management, creative, copy, social coordination, reporting, and admin support, so your shop has a marketing department without building one in-house.",
    outcomes: [
      "All core services coordinated",
      "Account management and reporting",
      "Creative, copy, and social support",
      "Execution without vendor chasing",
    ],
    featured: true,
  },
  {
    slug: "directtrack-marketing",
    name: "DirectTrack Marketing",
    tagline: "A complete, data-driven acquisition lane for shops that need new customer growth.",
    summary:
      "DirectTrack uses precision-targeted digital campaigns, transparent ROI tracking, and monthly reporting to show what is actually moving new customer acquisition.",
    outcomes: [
      "Targeted email campaigns",
      "Streaming commercial campaigns",
      "Geofencing banner and display ads",
      "ROI tracking and reporting",
    ],
    isNew: true,
  },
  {
    slug: "marketing-consulting",
    name: "Marketing Consulting",
    tagline: "A monthly strategy meeting that helps you decide what to change, start, stop, or keep.",
    summary:
      "Consulting gives you experienced auto-repair marketing direction without adding another vendor to manage. We look at your current marketing and help remove the guesswork from the next move.",
    outcomes: ["Monthly strategy meeting", "Marketing review", "Start/stop/change guidance", "ROI-focused recommendations"],
  },
  {
    slug: "direct-mail",
    name: "Direct Mail",
    tagline: "Postcard campaigns managed from design and timing through list strategy and reporting.",
    summary:
      "Direct Mail gives shops a planned postcard campaign instead of a one-off print job, with the design, timeline, budget, order verification, offers, and penetration reporting handled together.",
    outcomes: ["Postcard management", "Campaign timeline", "Offer and list strategy", "Penetration reporting"],
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    tagline: "Consistent Facebook, Instagram, and Google Business Profile content with review follow-through.",
    summary:
      "Social Media keeps your shop visible with regular Facebook, Instagram, and Google Business Profile posts, plus ad creation and response support for comments and reviews.",
    outcomes: [
      "Facebook posts",
      "Instagram posts",
      "GBP posts",
      "Comment and review response",
    ],
  },
  {
    slug: "retention-marketing",
    name: "Retention Marketing",
    tagline: "Newsletter, thank-you, and CRM follow-up that keeps customers connected after the first visit.",
    summary:
      "Retention Marketing protects the money you already spent earning customers by keeping newsletter, thank-you, and CRM follow-up activity on a steady rhythm.",
    outcomes: ["Monthly email newsletter", "Thank-you note creation", "CRM audit refresh", "Repeat-customer rhythm"],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    tagline: "Google reviews, Google Business Profile, website audits, and vendor coordination.",
    summary:
      "Digital Marketing keeps the core visibility pieces connected: Google review management, Google Business Profile optimization, website audits, and coordination with website or Google Ads vendors.",
    outcomes: ["Google review management", "GBP optimization", "Website audit", "Website and ads vendor coordination"],
  },
  {
    slug: "boost-days",
    name: "Boost Days",
    tagline: "A focused campaign push for slow spots, open bays, or timing-sensitive demand.",
    summary:
      "Boost Days package strategy, email, text, social, call evaluation, and one marketing deliverable into a focused demand push when your schedule needs support.",
    outcomes: ["Boost Day strategy", "Email, text, and social campaign", "Phone call evaluations", "One marketing deliverable"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const BOOKING_URL = "/book-a-call";
export const GHL_DISCOVERY_CALL_BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/booking/yu2OePYtPJE21ORfX8a0";

export const CONSULTATION_URL = BOOKING_URL;
