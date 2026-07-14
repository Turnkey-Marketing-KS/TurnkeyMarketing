import { siteMedia, type SiteImage } from "@/lib/site-media";

export type ServiceDetail = {
  image: SiteImage;
  imageFit?: "cover" | "contain";
  accent?: "blue" | "green";
  included: string[];
  bestFor: string;
  badgeValue: string;
  badgeLabel: string;
  proofLine: string;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "vip-marketing-manager": {
    image: siteMedia.about.team,
    accent: "green",
    included: [
      "Marketing Consulting",
      "Direct Mail",
      "Social Media",
      "Retention",
      "Digital",
      "Boost Days",
    ],
    bestFor:
      "Best when you want a marketing department without hiring one, and you still want a clear view of what is happening.",
    badgeValue: "1 plan",
    badgeLabel: "Strategy + execution",
    proofLine: "Your own outside Director of Marketing, supported by the Turnkey team.",
  },
  "marketing-consulting": {
    image: siteMedia.team.visionExpoConversation,
    included: ["Monthly Consulting Meeting", "Marketing Review", "ROI Recommendations"],
    bestFor:
      "Best when you already have marketing pieces in motion, but need experienced outside eyes to sort what to keep, fix, or stop.",
    badgeValue: "90 days",
    badgeLabel: "Clear next moves",
    proofLine: "Practical direction from people who know repair-shop marketing.",
  },
  "directtrack-marketing": {
    image: siteMedia.graphics.leadGenerator,
    imageFit: "contain",
    included: ["OTT Video Ads", "Acquisition E-mails", "Geofencing Display Ads", "ROI Tracking"],
    bestFor:
      "Best for launch, rescue, or dense-market situations where you need targeted acquisition with clearer tracking.",
    badgeValue: "7x–15x",
    badgeLabel: "Average ROI",
    proofLine: "DirectTrack campaigns average a 7x–15x return on spend.",
  },
  "direct-mail": {
    image: siteMedia.graphics.directMail,
    imageFit: "contain",
    included: ["Postcard Management", "Penetration Reports", "Retention Campaigns"],
    bestFor:
      "Best when the list, offer, timing, and follow-up need to work together instead of sending another pretty mailer.",
    badgeValue: "List",
    badgeLabel: "Offer + timing",
    proofLine: "Direct mail that is planned like a campaign, not a one-off print job.",
  },
  "social-media-marketing": {
    image: siteMedia.team.industrySession,
    included: [
      "Facebook Posts",
      "Instagram Posts",
      "GBP Posts",
      "Facebook Ads",
      "Comment + Review Response",
    ],
    bestFor:
      "Best when your shop needs consistency, a real local voice, and follow-through on the places customers already check.",
    badgeValue: "3-5",
    badgeLabel: "Weekly posts",
    proofLine: "A social presence built around your real shop voice and local proof.",
  },
  "retention-marketing": {
    image: siteMedia.shops.thunderbirdTeam,
    included: ["E-mail Newsletter", "Thank You Notes"],
    bestFor:
      "Best when acquisition is expensive and you need a steadier path for first-time or inactive customers to come back.",
    badgeValue: "Repeat",
    badgeLabel: "Customer rhythm",
    proofLine: "Follow-up that protects the money you already spent earning the customer.",
  },
  "digital-marketing": {
    image: siteMedia.graphics.marketingPlan,
    imageFit: "contain",
    included: [
      "Google Review Management",
      "GBP Optimization",
      "Website Audit",
      "Vendor Coordination",
    ],
    bestFor:
      "Best when Google, reviews, ads, and website work need to stop feeling like disconnected vendor conversations.",
    badgeValue: "Google",
    badgeLabel: "GBP + reviews",
    proofLine: "Digital work coordinated around calls, appointments, and customer quality.",
  },
  "boost-days": {
    image: siteMedia.shops.serviceBays,
    included: [
      "Boost Day Strategy",
      "Email/Text/Social Campaign",
      "Phone Call Evaluations",
      "Marketing Deliverable",
    ],
    bestFor:
      "Best when the schedule softens and you need controlled demand without creating chaos at the counter.",
    badgeValue: "Fast",
    badgeLabel: "Demand push",
    proofLine: "A focused campaign for open bays, slow spots, or timing-sensitive pushes.",
  },
};

export const getServiceDetail = (slug: string) => serviceDetails[slug];
