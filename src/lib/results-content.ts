// Content for the Results page. Facts come from the approved client-results
// brief; items marked "hold" or "needs confirmation" there are intentionally
// absent. Keep monthly / annual / average / projected / one-time labels intact
// when editing.

export const featuredResult = {
  name: "Legendary Automotive & Diesel Repair",
  logoSrc: "/images/results/shop-logos/legendary-automotive-diesel-repair.png",
  headline: "Legendary Automotive",
  body: "Between August 2024 and June 2026, Legendary Automotive & Diesel Repair grew from $260,534 to $701,725 in revenue — while total cars served nearly tripled and returning cars grew more than five-fold.",
  footnote: "Figures compare August 2024 with June 2026.",
  chart: {
    ariaLabel:
      "Bar chart comparing Legendary Automotive & Diesel Repair revenue: $260,534 in August 2024 versus $701,725 in June 2026, an increase of approximately 169 percent.",
    caption: "Revenue · August 2024 vs. June 2026",
    bars: [
      { label: "Aug 2024", value: "$260,534", height: 30.5, color: "#4E94D6" },
      { label: "June 2026", value: "$701,725", height: 82, color: "#28619B", tag: "≈ +169%" },
    ],
  },
};

export const bandStats = [
  {
    value: "2×",
    label:
      "Torque European's monthly revenue — from ≈ $110K to a consistent $220K–$230K since onboarding in August 2025.",
  },
  {
    value: "+60%",
    label:
      "ASAP Auto Repair's monthly revenue — $125K to $200K from October 2024 to June 2026, with an all-time high in three of the last four months.",
  },
  {
    value: "3.74×",
    label:
      "Pro Automotive's tracked revenue for every $1 of advertising in the first full month of its campaign.",
  },
];

export const killianStory = {
  name: "Killian Auto Pros",
  logoSrc: "/images/results/shop-logos/killian-auto-pros.png",
  headline: "One shop became four.",
  body: "Killian Auto Pros started with Turnkey as a single location in Mauldin, South Carolina — and the growth funded a second, a third, and a fourth. Across the three locations with comparable data, combined average revenue grew from $662K to $971K (≈ +47%).",
  footnote: "Revenue figures are 2023 vs. 2026 averages.",
  locations: [
    { name: "Mauldin", detail: "The original location · average revenue ≈ +10%" },
    { name: "Greenville", detail: "Opened summer 2023 · average revenue ≈ +96%" },
    { name: "Fountain Inn", detail: "Opened summer 2023 · average revenue ≈ +98%" },
    {
      name: "Spartanburg",
      detail: "Opened end of 2025 · 3× car count and revenue in its first six months",
    },
  ],
};

export const moreResults = [
  {
    name: "SSA European Auto Repair",
    logoSrc: "/images/results/shop-logos/ssa-european-auto-repair.jpg",
    delta: "≈ +118%",
    line: "$3.3M → $7.2M annual revenue · 2023 actual vs. 2026 projected",
    meta: "With Turnkey since September 2022 · Kingston, MA",
  },
  {
    name: "Dempster's Quality Car Care",
    logoSrc: "/images/results/shop-logos/dempsters-quality-car-care.jpg",
    delta: "≈ +52%",
    line: "$105K → $160K monthly revenue, with four straight record months",
    meta: "With Turnkey since August 2025",
  },
  {
    name: "G&G Autohaus",
    logoSrc: "/images/results/shop-logos/g-and-g-autohaus.png",
    delta: "+38%",
    line: "$392,088 → $540,057 March revenue, year over year — the first month above $500K",
    meta: "March 2023 vs. March 2024",
  },
  {
    name: "Certified Auto Repair",
    logoSrc: "/images/results/shop-logos/certified-auto-repair.png",
    delta: "≈ +32%",
    line: "$2.8M → $3.7M annual revenue · baseline vs. 2026 projected",
    meta: "With Turnkey since September 2023 · Henrico, VA",
  },
  {
    name: "Sports Car Shop",
    logoSrc: "/images/results/shop-logos/sports-car-shop.png",
    delta: "+30%+",
    line: "≈ 115 → more than 150 cars per month, on average",
    meta: "Onboarded August 2025",
  },
  {
    name: "The Car Care Center — Nashville",
    logoSrc: "/images/results/shop-logos/the-car-care-center-nashville.jpg",
    delta: "$35K",
    line: "A record revenue week — with a two-technician team",
    meta: "One-week record",
  },
];

export const demandQuote = {
  quote:
    "We are buying two more racks, and I am calling the recruiter Monday to add a seventh tech. If you build it…and hire Turnkey…they will come.",
  attribution: "Clark's Car Care",
  logoSrc: "/images/results/shop-logos/clarks-car-care.png",
  context:
    "Booked out about a week on oil changes and heavily booked with service work — demand that turned into new equipment and hiring plans.",
};
