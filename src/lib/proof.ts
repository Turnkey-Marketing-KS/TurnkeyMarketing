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
