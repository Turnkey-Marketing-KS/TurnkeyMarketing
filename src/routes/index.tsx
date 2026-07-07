import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Star,
  Wrench,
  TrendingUp,
  Zap,
  Target,
  BarChart3,
  Mail,
  Users,
  PhoneCall,
  Plus,
  Minus,
} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ScrollPhrase } from "@/components/site/ScrollPhrase";
import { CONSULTATION_URL } from "@/lib/services";
import { track } from "@/lib/analytics";
import { siteMedia } from "@/lib/site-media";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Turnkey Marketing — Marketing that knows your auto repair shop" },
      {
        name: "description",
        content:
          "The auto-repair-specific marketing team that owns the plan, manages the pieces, and helps shops get more calls, more cars, and more revenue.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function Home() {
  return (
    <SiteShell>
      <Hero />
      <LogoStrip />
      <CoreCapabilities />
      <StatsBand />
      <LaunchCampaigns />
      <Testimonials />
      <FeaturesGrid />
      <Pricing />
      <LatestInsights />
      <FAQ />
      <FinalCTA />
    </SiteShell>
  );
}

/* ————————————————————————————————————————————————————— */
/* 1. HERO                                                */
/* ————————————————————————————————————————————————————— */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page pt-6 md:pt-10 pb-24 md:pb-32 relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12 items-center min-h-[80vh]">
          {/* Left */}
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display-1 text-balance"
              style={{ fontSize: "clamp(2.5rem, 4.2vw, 3.5rem)", lineHeight: 1.05 }}
            >
              <span className="text-charcoal">Auto repair marketing</span>
              <br />
              <ScrollPhrase
                phrases={[
                  "no guesswork.",
                  "with one owner.",
                  "for right cars.",
                  "protects spend.",
                  "fits capacity.",
                ]}
                className="whitespace-nowrap text-[var(--key-blue)]"
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 text-lg md:text-xl text-charcoal/65 max-w-[46ch] leading-relaxed"
            >
              Know what to keep, fix, stop funding, and run next. Then
              Turnkey owns the moving pieces while you stay focused on the shop.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <a
                href={CONSULTATION_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 font-medium text-[0.95rem] text-white transition"
                style={{
                  background: "var(--navy)",
                  boxShadow: "0 14px 34px -12px rgba(35,46,102,0.55)",
                }}
                onClick={() => track("consultation_cta_click", { placement: "hero_primary" })}
              >
                Schedule a Consultation
              </a>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-charcoal/80 hover:text-charcoal font-medium text-[0.95rem] transition"
              >
                See what we do
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right — photo card w/ floating pills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-5 relative w-full max-w-[420px] xl:max-w-[470px] justify-self-center lg:justify-self-center xl:justify-self-end"
          >
            <div
              className="relative aspect-[4/5] w-full rounded-[34px] overflow-hidden shadow-[0_34px_90px_-42px_rgba(20,22,28,0.45)]"
              style={{
                background:
                  "linear-gradient(160deg, var(--key-blue) 0%, #2e6fa8 100%)",
              }}
            >
              <img
                src={siteMedia.hero.src}
                alt={siteMedia.hero.alt}
                width={1200}
                height={800}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: siteMedia.hero.position }}
              />
            </div>

            {/* Floating: call metric */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="floaty absolute -left-3 md:-left-5 top-14 md:top-20 card-float px-5 py-4 min-w-[190px]"
            >
              <div className="text-[11px] text-charcoal/60 mb-1">Booked calls</div>
              <div className="flex items-baseline gap-2">
                <div className="font-display text-2xl font-semibold text-charcoal leading-none">
                  +38%
                </div>
                <div className="text-xs font-medium" style={{ color: "var(--green)" }}>
                  ↑ this month
                </div>
              </div>
            </motion.div>

            {/* Floating: reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="floaty-delay absolute -right-3 md:-right-5 bottom-24 md:bottom-32 card-float px-5 py-4 min-w-[200px]"
            >
              <div className="flex items-center gap-2 text-[11px] text-charcoal/60 mb-1.5">
                <div className="flex" style={{ color: "var(--green)" }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3 w-3" fill="currentColor" />
                  ))}
                </div>
                <span>4.9 · 300+ shops</span>
              </div>
              <div className="font-display text-sm font-semibold text-charcoal leading-tight">
                "They just know our shop."
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————— */
/* 2. LOGO STRIP                                          */
/* ————————————————————————————————————————————————————— */
const shopLogos = [
  { name: "CarFix", src: "/trust-logos/carfix.png" },
  { name: "Certified Auto Repair", src: "/trust-logos/certified-auto-repair.png" },
  { name: "Gulf Breeze Automotive", src: "/trust-logos/gulf-breeze-automotive.png" },
  {
    name: "Thunderbird Automotive Specialists",
    src: "/trust-logos/thunderbird-automotive-specialists.jpg",
  },
  { name: "Choisser Automotive Services", src: "/trust-logos/choisser-automotive-services.png" },
  { name: "European Autoworks", src: "/trust-logos/european-autoworks.png" },
  { name: "Killian Auto Pros", src: "/trust-logos/killian-auto-pros.jpg" },
  { name: "Pro Automotive", src: "/trust-logos/pro-automotive.png" },
  { name: "Pit Shop Auto Repair", src: "/trust-logos/pit-shop-auto-repair.png" },
  { name: "Tommy's Hi-Tech Auto Repair", src: "/trust-logos/tommys-hi-tech-auto-repair.png" },
];

function LogoStrip() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <p className="text-center text-charcoal/60 text-sm mb-10">
          Trusted by 300+ shops and industry-leading partners
        </p>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex marquee items-center gap-8 md:gap-12 whitespace-nowrap py-2">
            {[...shopLogos, ...shopLogos].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex h-24 w-40 shrink-0 items-center justify-center px-5 py-4"
              >
                <img
                  src={logo.src}
                  alt={i < shopLogos.length ? logo.name : ""}
                  aria-hidden={i >= shopLogos.length}
                  className="max-h-16 w-full object-contain"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————— */
/* 3. CORE CAPABILITIES — 2×2 grid                       */
/* ————————————————————————————————————————————————————— */
function CoreCapabilities() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium" style={{ color: "var(--key-blue)" }}>
            Core Capabilities
          </p>
          <h2 className="display-2 mt-4 text-balance">
            Built to run{" "}
            <span className="text-charcoal/35">every part of your marketing.</span>
          </h2>
          <p className="mt-6 text-charcoal/65 text-lg leading-relaxed">
            Strategy, direct mail, digital, CRM, reviews, retention, and
            reporting — coordinated by one team that actually knows your shop.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <CapabilityCard
            title="One view of the whole board"
            copy="Direct mail, digital, GBP, CRM, vendors, and budgets connected into one plan — so you can stop guessing which lever to pull."
            visual={<CardVisualCalls />}
          />
          <CapabilityCard
            title="Customer retention & reactivation"
            copy="Acquisition is expensive. We help bring the right customers back and protect the money you already spent earning them."
            visual={<CardVisualRetention />}
          />
          <CapabilityCard
            title="Direct mail that still works"
            copy="Sharper lists, offers, timing, creative, and follow-up — so each drop is built around the market, not just the postcard."
            visual={<CardVisualMail />}
          />
          <CapabilityCard
            title="Reporting shop owners actually read"
            copy="Calls, appointments, customer mix, spend, and next moves — with a real human explaining what to keep doing and what to fix."
            visual={<CardVisualReport />}
          />
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({
  title,
  copy,
  visual,
}: {
  title: string;
  copy: string;
  visual: React.ReactNode;
}) {
  return (
    <motion.div
      {...fadeUp}
      className="rounded-[32px] p-8 md:p-10 relative overflow-hidden"
      style={{ background: "var(--off-white)" }}
    >
      <h3 className="font-display text-2xl md:text-[1.75rem] font-semibold text-charcoal leading-tight max-w-md">
        {title}
      </h3>
      <p className="mt-4 text-charcoal/60 max-w-md leading-relaxed">{copy}</p>
      <div className="mt-10 relative h-[280px] md:h-[320px]">{visual}</div>
    </motion.div>
  );
}

function CardVisualCalls() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-x-6 inset-y-4 rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, var(--navy) 0%, var(--navy-deep) 100%)",
        }}
      >
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white/70 text-xs">
          <span>Call volume · last 30 days</span>
          <span style={{ color: "var(--green)" }}>+38%</span>
        </div>
        <svg viewBox="0 0 300 140" className="absolute inset-x-4 bottom-4 top-12 w-[calc(100%-2rem)] h-[calc(100%-4rem)]">
          <defs>
            <linearGradient id="ln" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#93C845" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#93C845" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,110 L30,95 L60,100 L90,80 L120,85 L150,60 L180,65 L210,45 L240,50 L270,30 L300,20 L300,140 L0,140 Z" fill="url(#ln)" />
          <path d="M0,110 L30,95 L60,100 L90,80 L120,85 L150,60 L180,65 L210,45 L240,50 L270,30 L300,20" fill="none" stroke="#93C845" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute -left-2 bottom-4 card-float px-4 py-3 flex items-center gap-2.5">
        <span
          className="inline-flex h-8 w-8 rounded-lg items-center justify-center"
          style={{ background: "var(--key-blue-soft)", color: "var(--key-blue)" }}
        >
          <PhoneCall className="h-4 w-4" />
        </span>
        <div>
          <div className="text-[10px] text-charcoal/60">Today</div>
          <div className="font-display text-sm font-semibold text-charcoal">47 calls</div>
        </div>
      </div>
    </div>
  );
}

function CardVisualRetention() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-x-6 inset-y-4 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #f0e5d4 0%, #e0d0b8 100%)",
        }}
      >
        <img
          src={siteMedia.shops.mikes.src}
          alt={siteMedia.shops.mikes.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: siteMedia.shops.mikes.position }}
        />
      </div>
      <div className="absolute -right-2 top-6 card-float px-4 py-3 min-w-[170px]">
        <div className="text-[10px] text-charcoal/60 mb-1">Reactivated</div>
        <div className="font-display text-xl font-semibold text-charcoal leading-none">
          912 <span className="text-charcoal/40 text-sm font-normal">customers</span>
        </div>
      </div>
      <div className="absolute -left-2 bottom-4 card-float px-4 py-3 flex items-center gap-2.5">
        <span
          className="inline-flex h-8 w-8 rounded-lg items-center justify-center text-white"
          style={{ background: "var(--green)" }}
        >
          <Mail className="h-4 w-4" />
        </span>
        <div>
          <div className="text-[10px] text-charcoal/60">Open rate</div>
          <div className="font-display text-sm font-semibold text-charcoal">42%</div>
        </div>
      </div>
    </div>
  );
}

function CardVisualMail() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="relative w-[85%] aspect-[4/3] rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, var(--navy) 0%, var(--navy-deep) 100%)",
        }}
      >
        <div className="absolute inset-0 p-6 text-white">
          <div className="text-[10px] uppercase tracking-widest text-white/50">
            Turnkey · Direct Mail
          </div>
          <div className="font-display text-2xl font-semibold mt-2 leading-tight">
            Free brake<br />inspection.
          </div>
          <div
            className="absolute bottom-4 right-4 text-[10px] px-2 py-1 rounded"
            style={{ background: "var(--green)", color: "var(--charcoal)" }}
          >
            SPRING '26
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 card-float px-4 py-3">
        <div className="text-[10px] text-charcoal/60">Response rate</div>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <div className="font-display text-xl font-semibold text-charcoal">2.4x</div>
          <span className="text-[10px]" style={{ color: "var(--green)" }}>vs. avg</span>
        </div>
      </div>
    </div>
  );
}

function CardVisualReport() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-x-6 inset-y-4 rounded-2xl bg-white p-5 shadow-[0_20px_50px_-20px_rgba(20,22,28,0.15)]">
        <div className="flex items-center justify-between">
          <div className="text-xs text-charcoal/60">Monthly Report</div>
          <div className="text-[10px] font-medium" style={{ color: "var(--green)" }}>
            +$18,240 revenue
          </div>
        </div>
        <div className="mt-4 flex items-end gap-2 h-24">
          {[42, 58, 48, 72, 65, 88, 78, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-md"
              style={{
                height: `${h}%`,
                background:
                  i === 7
                    ? "var(--navy)"
                    : i === 5
                    ? "var(--key-blue)"
                    : "var(--key-blue-soft)",
              }}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[10px] text-charcoal/40">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
          <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
        </div>
      </div>
    </div>
  );
}

/* ————————————————————————————————————————————————————— */
/* 4. STATS BAND                                          */
/* ————————————————————————————————————————————————————— */
function StatsBand() {
  const stats = [
    { k: "300+", v: "Auto repair shops served across the U.S." },
    { k: "13+", v: "Years marketing exclusively for shop owners" },
    { k: "94%", v: "Of clients renew year over year" },
  ];
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
          <h2 className="display-2 text-balance">
            Everything you need to{" "}
            <span className="text-charcoal/35">grow your shop.</span>
          </h2>
          <p className="mt-6 text-charcoal/65 text-lg leading-relaxed">
            From strategy to execution, we run the marketing playbook that has
            filled bays for hundreds of shops across the country — while their
            owners run the shop.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 md:divide-x hairline">
          {stats.map((s, i) => (
            <motion.div
              key={s.k}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="text-center px-6"
            >
              <div className="font-display text-6xl md:text-7xl font-semibold text-charcoal tracking-tight">
                {s.k}
              </div>
              <p className="mt-4 text-charcoal/60 max-w-[24ch] mx-auto leading-relaxed">
                {s.v}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————— */
/* 5. LAUNCH CAMPAIGNS — dark rounded card               */
/* ————————————————————————————————————————————————————— */
function LaunchCampaigns() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <motion.div
          {...fadeUp}
          className="rounded-[36px] overflow-hidden grid lg:grid-cols-2 gap-10 p-10 md:p-16 relative"
          style={{ background: "var(--charcoal)", color: "#fff" }}
        >
          <div className="relative">
            <h3 className="display-2 leading-tight text-white text-balance">
              Own the plan.<br />
              <span className="text-white/40">Run every channel.</span>
            </h3>
            <p className="mt-6 text-white/70 text-lg max-w-md leading-relaxed">
              Not more homework. More ownership. We coordinate vendors,
              campaigns, reporting, and next steps without making you manage
              every marketing decision.
            </p>
            <div className="mt-10">
              <a
                href={CONSULTATION_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium text-sm bg-white text-charcoal hover:bg-white/90 transition"
                onClick={() =>
                  track("consultation_cta_click", { placement: "launch_section" })
                }
              >
                Talk through the plan
              </a>
            </div>
          </div>

          <div className="relative min-h-[380px]">
            {/* portrait */}
            <div
              className="absolute right-0 bottom-0 w-[65%] aspect-[3/4] rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(160deg, var(--key-blue) 0%, var(--navy) 100%)",
              }}
            >
              <img
                src={siteMedia.shops.thunderbirdTeam.src}
                alt={siteMedia.shops.thunderbirdTeam.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: siteMedia.shops.thunderbirdTeam.position }}
              />
            </div>
            {/* Revenue donut card */}
            <div className="absolute top-2 left-2 card-float px-5 py-4 min-w-[200px]">
              <div className="flex items-center gap-2 text-[11px] text-charcoal/60">
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded-md"
                  style={{ background: "var(--key-blue-soft)", color: "var(--key-blue)" }}
                >
                  <TrendingUp className="h-3 w-3" />
                </span>
                Monthly revenue
              </div>
              <div className="mt-3 flex items-center gap-3">
                <svg viewBox="0 0 40 40" className="h-14 w-14">
                  <circle cx="20" cy="20" r="16" fill="none" stroke="#E7E5DF" strokeWidth="5" />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="var(--navy)"
                    strokeWidth="5"
                    strokeDasharray="100.5"
                    strokeDashoffset="28"
                    transform="rotate(-90 20 20)"
                    strokeLinecap="round"
                  />
                </svg>
                <div>
                  <div className="text-[10px] text-charcoal/60">Revenue</div>
                  <div className="font-display text-lg font-semibold text-charcoal">$182k</div>
                </div>
              </div>
            </div>
            {/* Comparison card */}
            <div className="absolute bottom-4 -right-2 md:right-4 card-float px-4 py-3 min-w-[220px]">
              <div className="flex items-center justify-between text-[10px] text-charcoal/60">
                <span>Channel mix</span>
                <span style={{ color: "var(--green)" }}>+1.4% MoM</span>
              </div>
              <div className="mt-2 flex gap-2 text-[10px] text-charcoal/70">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm" style={{ background: "var(--navy)" }} />
                  Direct mail
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm" style={{ background: "var(--key-blue)" }} />
                  Digital
                </span>
              </div>
              <div className="mt-2 flex items-end gap-1 h-12">
                {[
                  [50, 30], [60, 40], [45, 35], [70, 45], [55, 60], [80, 55],
                ].map(([a, b], i) => (
                  <div key={i} className="flex-1 flex gap-0.5 items-end">
                    <div className="flex-1 rounded-sm" style={{ height: `${a}%`, background: "var(--navy)" }} />
                    <div className="flex-1 rounded-sm" style={{ height: `${b}%`, background: "var(--key-blue)" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————— */
/* 6. TESTIMONIALS                                        */
/* ————————————————————————————————————————————————————— */
function Testimonials() {
  const items = [
    {
      title: "I am already spending money. I just do not know what it is doing.",
      copy:
        "We start by looking at the whole board: vendors, campaigns, invoices, calls, and the parts worth keeping.",
      marker: "Spend clarity",
    },
    {
      title: "More cars is not always better. I need the right cars.",
      copy:
        "The plan has to match capacity, customer quality, advisor follow-through, and the work your shop actually wants.",
      marker: "Controlled demand",
    },
    {
      title: "I need marketing off my plate, but I still want to understand the why.",
      copy:
        "We explain the strategy, own the execution burden, and keep the next move clear without turning it into more homework.",
      marker: "Owner relief",
    },
  ];
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
          <h2 className="display-2 text-balance">
            The pressure behind{" "}
            <span className="text-charcoal/35">the first conversation.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="rounded-[28px] p-8 flex flex-col"
              style={{ background: "var(--off-white)" }}
            >
              <p className="text-xs uppercase tracking-widest text-charcoal/45">
                {t.marker}
              </p>
              <h3 className="font-display text-2xl font-semibold text-charcoal mt-5 leading-tight">
                {t.title}
              </h3>
              <p className="mt-5 text-charcoal/65 leading-relaxed flex-1">
                {t.copy}
              </p>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————— */
/* 7. FEATURES GRID — dark 3-col                          */
/* ————————————————————————————————————————————————————— */
function FeaturesGrid() {
  const features = [
    {
      icon: Target,
      color: "var(--key-blue)",
      title: "Shop-specific strategy",
      copy: "Every plan is built around your bays, your market, and your goals. No recycled templates, no cookie-cutter tactics.",
    },
    {
      icon: Zap,
      color: "var(--green)",
      title: "Weekly execution",
      copy: "We don't just consult. We run the direct mail, ads, GBP, reviews, and CRM every week — you approve, we ship.",
    },
    {
      icon: BarChart3,
      color: "#e8a94b",
      title: "Honest reporting",
      copy: "Monthly reports that tie every dollar to calls, cars, and revenue. Real accountability, no vanity metrics.",
    },
  ];
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <motion.div
          {...fadeUp}
          className="rounded-[36px] p-10 md:p-16"
          style={{ background: "var(--charcoal)", color: "#fff" }}
        >
          <div className="grid gap-10 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title}>
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                  style={{ background: f.color }}
                >
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-2xl font-semibold text-white mt-6">
                  {f.title}
                </h3>
                <p className="mt-3 text-white/60 leading-relaxed">{f.copy}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————— */
/* 8. PRICING                                             */
/* ————————————————————————————————————————————————————— */
function Pricing() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
          <h2 className="display-2 text-balance">Two ways to work with us.</h2>
          <p className="mt-6 text-charcoal/65 text-lg leading-relaxed">
            Whether you need a fractional Director of Marketing or a full-stack
            done-for-you team, we scope the engagement to your shop.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Plan 1 */}
          <div
            className="rounded-[28px] p-8 md:p-10"
            style={{ background: "var(--off-white)" }}
          >
            <div className="font-display text-2xl font-semibold text-charcoal">
              Fractional CMO
            </div>
            <p className="text-charcoal/60 mt-2 text-sm">
              Strategy, oversight, and accountability for shops with in-house
              staff or existing vendors.
            </p>
            <div className="mt-8 flex items-end gap-1">
              <span className="font-display text-5xl font-semibold text-charcoal">
                Custom
              </span>
            </div>
            <a
              href={CONSULTATION_URL}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 font-medium text-sm bg-charcoal text-white hover:opacity-90 transition"
            >
              Talk to us
            </a>
            <ul className="mt-8 space-y-3 text-sm text-charcoal/75">
              {[
                "Quarterly strategy roadmap",
                "Vendor audit & coordination",
                "Monthly reporting reviews",
                "Direct access to our team",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 rounded-full flex-none"
                    style={{ background: "var(--key-blue)" }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Plan 2 — Flagship */}
          <div
            className="rounded-[28px] p-8 md:p-10 relative"
            style={{ background: "var(--navy)", color: "#fff" }}
          >
            <div
              className="absolute -top-3 right-8 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-semibold"
              style={{ background: "var(--green)", color: "var(--charcoal)" }}
            >
              Flagship
            </div>
            <div className="font-display text-2xl font-semibold text-white">
              VIP Marketing Manager
            </div>
            <p className="text-white/70 mt-2 text-sm">
              A full done-for-you marketing department. We own the plan and run
              every piece — you focus on the shop.
            </p>
            <div className="mt-8 flex items-end gap-1">
              <span className="font-display text-5xl font-semibold text-white">
                Custom
              </span>
            </div>
            <a
              href={CONSULTATION_URL}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 font-medium text-sm transition"
              style={{ background: "var(--green)", color: "var(--charcoal)" }}
              onClick={() =>
                track("consultation_cta_click", { placement: "pricing_flagship" })
              }
            >
              Schedule a Consultation
            </a>
            <ul className="mt-8 space-y-3 text-sm text-white/85">
              {[
                "Full marketing team, on retainer",
                "Direct mail, digital, GBP, reviews, CRM",
                "Weekly execution & campaign shipping",
                "Monthly reporting with real accountability",
                "Dedicated marketing manager for your shop",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 rounded-full flex-none"
                    style={{ background: "var(--green)" }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————— */
/* 9. LATEST INSIGHTS                                     */
/* ————————————————————————————————————————————————————— */
function LatestInsights() {
  const posts = [
    {
      date: "Jun 2, 2026",
      tag: "Retention",
      title: "How to reactivate 900+ dormant customers in one quarter",
      color: "linear-gradient(160deg, var(--key-blue-soft) 0%, #cfe1ef 100%)",
      image: siteMedia.graphics.leadGenerator,
    },
    {
      date: "Jun 8, 2026",
      tag: "Direct Mail",
      title: "Why direct mail is quietly outperforming digital for repair shops",
      color: "linear-gradient(160deg, #f0e5d4 0%, #e0d0b8 100%)",
      image: siteMedia.graphics.directMail,
    },
    {
      date: "Jun 9, 2026",
      tag: "Reporting",
      title: "The 4 marketing metrics every shop owner should track monthly",
      color: "linear-gradient(160deg, #dce8d4 0%, #c4d5b8 100%)",
      image: siteMedia.graphics.marketingPlan,
    },
  ];
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <h2 className="display-2 text-balance">Latest insights</h2>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border hairline bg-white text-sm font-medium text-charcoal hover:bg-[var(--off-white)] transition"
          >
            Explore all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="group"
            >
              <div
                className="aspect-[4/3] rounded-[24px] overflow-hidden relative"
                style={{ background: p.color }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent 60%)`,
                  }}
                />
                <img
                  src={p.image.src}
                  alt={p.image.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  style={{ objectPosition: p.image.position }}
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>
              <div className="mt-5 flex items-center gap-3 text-xs text-charcoal/50">
                <span>{p.date}</span>
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium"
                  style={{ background: "var(--key-blue-soft)", color: "var(--key-blue)" }}
                >
                  {p.tag}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-charcoal mt-3 leading-snug group-hover:text-[var(--navy)] transition">
                {p.title}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————— */
/* 10. FAQ                                                */
/* ————————————————————————————————————————————————————— */
function FAQ() {
  const items = [
    { q: "What is the best marketing strategy for an auto repair shop?", a: "The best strategy is a coordinated plan that matches your market, capacity, customer mix, and budget. For most shops, that means Google visibility, reviews, paid search, retention, direct mail, and reporting working together instead of as separate vendor tasks." },
    { q: "How do I get more customers for my auto repair shop?", a: "Start by deciding which customers and jobs you actually want more of. Then connect search, Google Business Profile, reviews, offers, follow-up, and call handling so demand turns into booked appointments." },
    { q: "How can my auto repair shop show up higher on Google Maps?", a: "Google Maps visibility usually improves when your profile, reviews, photos, location signals, website, and local relevance are stronger. No agency can guarantee rankings, but complete shop information, steady review activity, accurate listings, and useful local content give Google clearer trust signals." },
    { q: "Are Google Ads worth it for auto repair shops?", a: "Google Ads can be worth it when campaigns are tied to profitable services, clear geography, call handling, and appointment quality. If ads are only judged by clicks or cheap leads, they can spend money without filling the bays with the right cars." },
    { q: "Does direct mail still work for auto repair shops?", a: "Direct mail can still work when the list, offer, timing, and follow-up are precise. It is strongest for local radius campaigns, second-location growth, customer reactivation, and dense markets where the shop needs a physical reminder." },
    { q: "How do I know if my auto repair marketing is actually working?", a: "Marketing is working when it creates the right calls, booked appointments, returning customers, and customer mix at a cost the shop can defend. The report should explain what to keep, what to fix, what to stop spending on, and what to run next." },
    { q: "What should an auto repair shop track besides leads?", a: "Track calls, booked appointments, close rate, repair order quality, returning customers, source mix, review activity, and capacity. Lead volume by itself can hide whether marketing is helping the shop or just making the front counter busier." },
    { q: "What if I am getting calls but not enough booked appointments?", a: "That usually means the issue is between demand and the schedule, not just more marketing. Call handling, advisor scripts, offer fit, service mix, hours, and follow-up all affect whether a call becomes a car in the bay." },
    { q: "How do I bring back inactive auto repair customers?", a: "Use retention and reactivation campaigns that speak to known customers based on timing, service history, and ownership cycles. Email, SMS, direct mail, and service reminders work best when they are coordinated instead of sent as one-off blasts." },
    { q: "What if my shop does not need more cars right now?", a: "Then marketing should shift from more volume to better control. The plan can focus on retention, higher-fit work, customer quality, reputation, future demand timing, and protecting spend until capacity opens up." },
    { q: "Should I keep my current marketing vendors or replace them?", a: "Keep vendors that are producing clear value and make them part of one accountable plan. Turnkey helps shop owners see what to keep, what to cut, and what needs tighter coordination so the owner is not managing every moving part." },
    { q: "How long does auto repair marketing take to work?", a: "Some cleanup and campaign fixes can show early signals quickly, but dependable growth usually takes months. A practical first 90-120 days should clarify budget, fix tracking, clean up vendors, launch priority campaigns, and set the next moves." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="display-2 text-balance">Frequently asked questions</h2>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                className="rounded-2xl bg-white border hairline overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left px-6 py-5"
                >
                  <span className="font-display text-lg font-semibold text-charcoal pr-8">
                    {item.q}
                  </span>
                  <span
                    className="flex-none inline-flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ background: "var(--off-white)" }}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-charcoal/70 leading-relaxed">
                    {item.a}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————— */
/* 11. FINAL CTA                                          */
/* ————————————————————————————————————————————————————— */
function FinalCTA() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <div
          className="rounded-[36px] py-24 md:py-32 px-6 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #eef4fa 0%, #dfeaf5 60%, #e6ecdb 100%)",
          }}
        >
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs text-charcoal/60">
              <div className="flex" style={{ color: "var(--green)" }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
                ))}
              </div>
              <span>4.9 rated · 300+ shops served</span>
            </div>
            <h2 className="display-1 mt-6 text-balance">
              Grow your shop{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, var(--navy) 0%, var(--key-blue) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                without adding another hat.
              </span>
            </h2>
            <p className="mt-6 text-lg text-charcoal/65 max-w-xl mx-auto">
              30 minutes with our team. No pitch deck. Just a real conversation
              about what is working, what is leaking, and what the next few
              months should realistically focus on.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href={CONSULTATION_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 font-medium text-[0.95rem] text-white transition"
                style={{
                  background: "var(--navy)",
                  boxShadow: "0 14px 34px -12px rgba(35,46,102,0.55)",
                }}
                onClick={() =>
                  track("consultation_cta_click", { placement: "final_cta" })
                }
              >
                Schedule a Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:9137774144"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 font-medium text-[0.95rem] border hairline bg-white text-charcoal hover:bg-white/70 transition"
                onClick={() =>
                  track("phone_click", { placement: "final_cta" })
                }
              >
                <Phone className="h-4 w-4" /> (913) 777-4144
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
