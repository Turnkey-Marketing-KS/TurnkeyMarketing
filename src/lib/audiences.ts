import { siteMedia, type SiteImage } from "@/lib/site-media";

export type AudiencePage = {
  slug: string;
  name: string;
  eyebrow: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroAccent: string;
  heroCopy: string;
  image: SiteImage & { width: number; height: number };
  answer: string;
  priorities: { title: string; description: string }[];
  approach: { title: string; description: string }[];
  proof: {
    eyebrow: string;
    metric: string;
    title: string;
    description: string;
    href: string;
    linkLabel: string;
  };
  services: { href: string; title: string; description: string }[];
  sources: { href: string; publisher: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};

export const audiences: AudiencePage[] = [
  {
    slug: "european-auto-repair-shops",
    name: "European auto repair shops",
    eyebrow: "Who we help · European specialists",
    seoTitle: "European Auto Repair Marketing | Turnkey Marketing",
    seoDescription:
      "Marketing for independent European auto repair shops that need better-fit customers, stronger specialist trust, and campaigns tied to profitable repair work.",
    heroTitle: "Marketing for European repair shops.",
    heroAccent: "Built around the right customer.",
    heroCopy:
      "A European specialist does not need every driver in town. You need owners who value marque-specific expertise, diagnostics, maintenance planning, and a dependable alternative to the dealership.",
    image: {
      ...siteMedia.shops.serviceBays,
      alt: "Independent auto repair service bays with vehicles being serviced",
      width: 640,
      height: 427,
    },
    answer:
      "European auto repair marketing should make the shop's specialist fit easy to verify, then reach owners of the makes and repair work the shop wants more of. That means clear make and service coverage, useful proof, accurate local profiles, targeted acquisition, and measurement through calls, booked appointments, completed repair orders, and repeat visits—not indiscriminate lead volume.",
    priorities: [
      {
        title: "Win the dealership comparison",
        description:
          "Show why the shop is a credible specialist alternative: the makes served, diagnostic capability, equipment, experience, communication, and ownership experience a driver can expect.",
      },
      {
        title: "Protect repair-order quality",
        description:
          "Build campaigns around the vehicles, services, neighborhoods, and owner expectations that fit the shop instead of optimizing for the cheapest possible lead.",
      },
      {
        title: "Turn specialist trust into proof",
        description:
          "Use accurate service information, honest customer reviews, technician knowledge, shop photography, and documented outcomes to reduce uncertainty before the call.",
      },
    ],
    approach: [
      {
        title: "Define the vehicle and customer fit",
        description:
          "Clarify the makes, model years, repair categories, geography, capacity, and customer traits the shop is equipped to serve well.",
      },
      {
        title: "Give every channel one job",
        description:
          "Use local visibility to capture active demand, targeted campaigns to reach qualified households, and retention to bring the right customers back.",
      },
      {
        title: "Measure work that reaches the bays",
        description:
          "Review calls, appointments, show rate, repair-order mix, completed revenue when attribution supports it, and repeat visits before scaling spend.",
      },
    ],
    proof: {
      eyebrow: "Documented European-specialist result",
      metric: "2×",
      title: "Torque European's monthly revenue",
      description:
        "Reported monthly revenue moved from approximately $110K to a consistent $220K–$230K after onboarding in August 2025. The result is a client-specific example, not a promise of typical performance.",
      href: "/results#torque-european",
      linkLabel: "See the documented result",
    },
    services: [
      {
        href: "/services/vip-marketing-manager",
        title: "VIP Marketing Manager",
        description:
          "Put strategy, creative, vendor coordination, execution, and reporting under one accountable outside marketing department.",
      },
      {
        href: "/services/directtrack-marketing",
        title: "DirectTrack Marketing",
        description:
          "Reach targeted local households with email, streaming TV, and geofenced display, then review the response with the broader plan.",
      },
      {
        href: "/services/digital-marketing",
        title: "Digital Marketing",
        description:
          "Coordinate Google reviews, Business Profile optimization, website audits, and the vendors responsible for local visibility.",
      },
    ],
    sources: [
      {
        href: "https://support.google.com/business/answer/3038177?hl=en",
        publisher: "Google Business Profile Help",
        title: "Guidelines for representing a business on Google",
        description:
          "Google's official guidance on accurate names, addresses, categories, locations, and real-world business representation.",
      },
      {
        href: "https://support.google.com/business/answer/9455399?hl=en",
        publisher: "Google Business Profile Help",
        title: "Manage services on a Business Profile",
        description:
          "Official guidance explaining how service businesses can list and organize the offerings customers may see in Search and Maps.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews",
        publisher: "Federal Trade Commission",
        title: "Endorsements, influencers, and reviews",
        description:
          "Plain-language compliance guidance for using reviews and testimonials honestly in business marketing.",
      },
    ],
    faqs: [
      {
        question: "What makes marketing a European auto repair shop different?",
        answer:
          "The useful audience is narrower and the trust decision is more specific. Marketing should explain which makes and repair work the shop handles, why its expertise is credible, how it compares with the dealership experience, and what a qualified owner can expect before requesting an appointment.",
      },
      {
        question: "Should a European specialist advertise every make and service?",
        answer:
          "No. The shop should lead with the makes, work, geography, and customer profile it can serve profitably and consistently. Broader reach is useful only when capacity, equipment, training, and customer fit support it.",
      },
      {
        question: "How should a European repair shop measure marketing?",
        answer:
          "Track the path from source to qualified call, booked appointment, show rate, completed repair order, repair mix, and repeat visit. Clicks and impressions help diagnose delivery, but they do not prove that the campaign brought the right work into the bays.",
      },
      {
        question: "Can Turnkey work with our current website or Google Ads vendor?",
        answer:
          "Yes, when vendor coordination is included in the selected service. Turnkey can set shared priorities, clarify handoffs, and review reporting while a competent specialist vendor continues its work.",
      },
    ],
  },
  {
    slug: "multi-location-auto-repair-shops",
    name: "Multi-location auto repair shops",
    eyebrow: "Who we help · Multi-location groups",
    seoTitle: "Multi-Location Auto Repair Marketing | Turnkey Marketing",
    seoDescription:
      "Marketing for multi-location auto repair shops with one central strategy, location-level priorities, coordinated vendors, and clearer performance reporting.",
    heroTitle: "Marketing for multi-location repair shops.",
    heroAccent: "One plan. Every shop visible.",
    heroCopy:
      "A second location does not just double the marketing workload. Each shop has its own capacity, local demand, reviews, profile, team, and performance—while the ownership group still needs one brand and a clear plan for every location.",
    image: {
      ...siteMedia.clients.steveKillian,
      alt: "Steve Killian, owner of the multi-location Killian Auto Pros group",
      width: 387,
      height: 516,
    },
    answer:
      "Multi-location auto repair marketing should centralize the brand, planning, vendor direction, and reporting while keeping capacity, offers, local profiles, reputation, and campaign decisions specific to each shop. The ownership group needs one view of the system and a clear location-level answer to where demand, budget, and follow-through need attention next.",
    priorities: [
      {
        title: "Central strategy, local decisions",
        description:
          "Hold every location to the same business goals and brand standards, then adjust the message, offer, timing, and channel mix for that shop's market and open capacity.",
      },
      {
        title: "A real local presence for every shop",
        description:
          "Maintain accurate location information, service coverage, photos, reviews, and website paths so customers and search engines can distinguish one operating location from another.",
      },
      {
        title: "Reporting owners can compare",
        description:
          "Use consistent definitions for spend, calls, appointments, repair orders, attributable revenue, and retention while preserving the local context behind each number.",
      },
    ],
    approach: [
      {
        title: "Set the group-wide rules",
        description:
          "Define brand standards, decision rights, vendor responsibilities, reporting definitions, approval paths, and the parts of the plan that should stay consistent everywhere.",
      },
      {
        title: "Plan demand by location",
        description:
          "Review each shop's market, customer mix, capacity, seasonality, repair categories, and call handling before moving budget or launching another campaign.",
      },
      {
        title: "Review the portfolio and the shops",
        description:
          "Give ownership a consolidated view while preserving the location-level detail needed to diagnose a weak handoff, an underfilled schedule, or a market-specific opportunity.",
      },
    ],
    proof: {
      eyebrow: "Documented multi-location result",
      metric: "1 → 4",
      title: "Killian Auto Pros expanded from one shop to four",
      description:
        "The public results record explains how growth funded a second, third, and fourth location. Across the three locations with comparable data, combined average revenue grew from $662K to $971K when comparing 2023 with 2026 averages. The result is client-specific, not a promise of typical performance.",
      href: "/results#killian-auto-pros",
      linkLabel: "See the location-growth result",
    },
    services: [
      {
        href: "/services/vip-marketing-manager",
        title: "VIP Marketing Manager",
        description:
          "Centralize strategy, creative, execution, vendor coordination, and reporting under an outside marketing department that can see the whole group.",
      },
      {
        href: "/services/directtrack-marketing",
        title: "DirectTrack Marketing",
        description:
          "Run targeted acquisition around the geography and demand needs of a location, then connect performance to the rest of the ownership group's plan.",
      },
      {
        href: "/services/digital-marketing",
        title: "Digital Marketing",
        description:
          "Coordinate reviews, Business Profiles, website audits, and digital vendors while keeping location information and responsibilities clear.",
      },
    ],
    sources: [
      {
        href: "https://support.google.com/business/answer/3038177?hl=en",
        publisher: "Google Business Profile Help",
        title: "Guidelines for representing multiple locations",
        description:
          "Google's official guidance covers accurate locations and consistent names and categories across a business's locations.",
      },
      {
        href: "https://support.google.com/business/answer/3217744?hl=en",
        publisher: "Google Business Profile Help",
        title: "Bulk location management overview",
        description:
          "Official guidance for organizing access and managing multiple eligible Business Profiles through business groups.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews",
        publisher: "Federal Trade Commission",
        title: "Endorsements, influencers, and reviews",
        description:
          "Plain-language compliance guidance for using customer reviews and testimonials honestly across a multi-location brand.",
      },
    ],
    faqs: [
      {
        question: "How should marketing differ by auto repair location?",
        answer:
          "Keep the brand, measurement definitions, and ownership priorities consistent. Adjust the offer, message, media, budget, and timing when a location's capacity, customer mix, competition, seasonality, or repair-order needs differ.",
      },
      {
        question: "Should every shop have its own Google Business Profile?",
        answer:
          "Each eligible real-world location should be represented accurately under Google's current Business Profile rules. Names and categories should stay consistent when the locations provide the same service, while addresses, phone numbers, hours, services, and local details must match the individual shop.",
      },
      {
        question: "Can one marketing report cover every location?",
        answer:
          "Ownership should have one consolidated view, but it should not erase location-level detail. The useful report lets the group compare consistent measures and then inspect the calls, appointments, repair mix, spend, and capacity behind each shop's result.",
      },
      {
        question: "How do you market a new auto repair location?",
        answer:
          "Start with the launch market, service capacity, staffing, customer fit, local profile eligibility, website path, call handling, offer, budget, and measurement plan. The new location needs its own demand plan without drifting away from the ownership group's brand and operating standards.",
      },
    ],
  },
];

export const getAudience = (slug: string) => audiences.find((audience) => audience.slug === slug);
