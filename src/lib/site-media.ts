export type SiteImage = {
  src: string;
  alt: string;
  position?: string;
};

export const siteMedia = {
  hero: {
    src: "/site-media/hero-thunderbird-shop.webp",
    alt: "Thunderbird Automotive Specialists service counter with staff helping a customer",
    position: "50% 50%",
  },
  about: {
    founder: {
      src: "/site-media/founder-carrie-lynn.webp",
      alt: "Carrie-Lynn Rodenberg, founder of Turnkey Marketing",
      position: "54% 18%",
    },
    team: {
      src: "/site-media/team-turnkey-2025.webp",
      alt: "The Turnkey Marketing team",
      position: "50% 45%",
    },
  },
  shops: {
    mikes: {
      src: "/site-media/mikes-auto-works.webp",
      alt: "Mike's Auto Works team member helping a customer at the counter",
      position: "50% 45%",
    },
    tommys: {
      src: "/site-media/tommys-hi-tech-building.webp",
      alt: "Tommy's Hi-Tech Auto Repair shop exterior",
      position: "50% 50%",
    },
    thunderbirdTeam: {
      src: "/site-media/thunderbird-team.webp",
      alt: "Thunderbird Automotive Specialists team members in the shop",
      position: "50% 50%",
    },
    pearsonExterior: {
      src: "/site-media/pearson-auto-repair-shop.webp",
      alt: "Pearson Auto Repair technician working in a service bay",
      position: "50% 50%",
    },
    pearsonBays: {
      src: "/site-media/pearson-auto-repair-bays.webp",
      alt: "Pearson Auto Repair service bays",
      position: "50% 45%",
    },
    mmShop: {
      src: "/site-media/mm-shop.webp",
      alt: "Auto repair shop service area",
      position: "50% 50%",
    },
    killian: {
      src: "/site-media/killian-auto-pros.webp",
      alt: "Killian Auto Pros logo",
      position: "50% 50%",
    },
    mmTechnician: {
      src: "/images/shops/m-m-IMG_1190-1200-800x533.jpg",
      alt: "Technician working under the hood in an auto repair bay",
      position: "50% 45%",
    },
    serviceBays: {
      src: "/images/shops/image6.jpg",
      alt: "Auto repair service bays with vehicles in the shop",
      position: "50% 50%",
    },
    technicianUnderVehicle: {
      src: "/images/shops/image8.jpg",
      alt: "Auto repair technician inspecting the underside of a vehicle",
      position: "50% 45%",
    },
    tommysExterior: {
      src: "/images/shops/Tommys-hi-tech-building.png",
      alt: "Tommy's Hi-Tech Auto Repair shop exterior",
      position: "50% 50%",
    },
  },
  clients: {
    keeganShopTeam: {
      src: "/images/clients/turnkey-keegan.jpg",
      alt: "Repair shop team members standing outside an auto repair shop",
      position: "50% 40%",
    },
    jasonSmith: {
      src: "/images/clients/jason-smith.jpg",
      alt: "Auto repair shop owner in a shop-branded shirt",
      position: "50% 18%",
    },
    lenPritchett: {
      src: "/images/clients/len-pritchett.jpeg",
      alt: "Len Pritchett wearing an RPM Automotive shirt",
      position: "50% 50%",
    },
    steveKillian: {
      src: "/images/clients/steve-killian.jpeg",
      alt: "Steve Killian in an auto repair shop office",
      position: "50% 35%",
    },
  },
  team: {
    visionExpoConversation: {
      src: "/images/team/20230303-turnkeyvisionexpo0043.jpg",
      alt: "Turnkey Marketing team member speaking with shop owners at an industry event",
      position: "50% 45%",
    },
    industrySession: {
      src: "/images/team/20230304-turnkeyvisionexpo0126.jpg",
      alt: "Turnkey Marketing presenting to auto repair professionals",
      position: "50% 45%",
    },
  },
  graphics: {
    leadGenerator: {
      src: "/site-media/lead-generator.webp",
      alt: "Auto repair marketing lead generator graphic",
      position: "50% 50%",
    },
    marketingPlan: {
      src: "/site-media/marketing-plan.webp",
      alt: "Marketing plan worksheet and strategy graphic",
      position: "50% 50%",
    },
    directMail: {
      src: "/site-media/direct-mail-results.webp",
      alt: "Direct mail campaign graphic for auto repair marketing",
      position: "50% 50%",
    },
    problems: {
      src: "/site-media/problems-graphic.webp",
      alt: "Marketing problems framework graphic",
      position: "50% 50%",
    },
    jasonSmithPlan: {
      src: "/original-site-assets/jason-smith-marketing-plan.png",
      alt: "Jason Smith quote about creating a yearly marketing plan with Turnkey Marketing",
      position: "50% 50%",
    },
  },
} as const;
