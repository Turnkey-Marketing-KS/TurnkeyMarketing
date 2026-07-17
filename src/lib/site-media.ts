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
      src: "/images/resources/auto-repair-marketing-plan-v2.jpg",
      alt: "Illustrated marketing roadmap leading to a successful auto repair shop",
      position: "50% 50%",
    },
    directMail: {
      src: "/images/resources/direct-mail-still-works-v2.jpg",
      alt: "Illustrated postcard campaign directing cars to an auto repair shop",
      position: "50% 50%",
    },
    directMailMailbox: {
      src: "/images/services/direct-mail-mailbox.png",
      alt: "Stylized blue mailbox representing direct mail marketing campaigns",
      position: "50% 50%",
    },
    serviceVipMarketing: {
      src: "/images/services/vip-marketing-manager-hero.jpg",
      alt: "Stylized marketing command center representing Turnkey's VIP Marketing Manager service",
      position: "50% 50%",
    },
    serviceDirectTrack: {
      src: "/images/services/directtrack-marketing-hero.jpg",
      alt: "Stylized acquisition targeting system representing DirectTrack Marketing campaigns",
      position: "50% 50%",
    },
    serviceConsulting: {
      src: "/images/services/marketing-consulting-hero.jpg",
      alt: "Stylized strategy workspace representing marketing consulting for auto repair shops",
      position: "50% 50%",
    },
    serviceSocial: {
      src: "/images/services/social-media-marketing-hero.jpg",
      alt: "Stylized social content system representing social media marketing for auto repair shops",
      position: "50% 50%",
    },
    serviceRetention: {
      src: "/images/services/retention-marketing-hero.jpg",
      alt: "Stylized customer follow-up loop representing retention marketing for auto repair shops",
      position: "50% 50%",
    },
    serviceDigital: {
      src: "/images/services/digital-marketing-hero.jpg",
      alt: "Stylized local visibility dashboard representing digital marketing for auto repair shops",
      position: "50% 50%",
    },
    serviceBoostDays: {
      src: "/images/services/boost-days-hero.jpg",
      alt: "Stylized demand campaign system representing Boost Days for auto repair shops",
      position: "50% 50%",
    },
    problems: {
      src: "/images/resources/why-auto-repair-marketing-breaks-v2.jpg",
      alt: "Disconnected marketing activities surrounding an auto repair shop",
      position: "50% 50%",
    },
    jasonSmithPlan: {
      src: "/site-media/jason-smith-marketing-plan.png",
      alt: "Jason Smith quote about creating a yearly marketing plan with Turnkey Marketing",
      position: "50% 50%",
    },
  },
} as const;
