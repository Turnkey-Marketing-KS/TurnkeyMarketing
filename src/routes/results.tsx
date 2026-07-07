import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { CONSULTATION_URL } from "@/lib/services";
import { siteMedia } from "@/lib/site-media";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Results — Turnkey Marketing" },
      {
        name: "description",
        content:
          "Real outcomes from real auto repair shops — retention wins, direct mail turnarounds, and coordinated vendor spend.",
      },
      { property: "og:title", content: "Results — Turnkey Marketing" },
      { property: "og:url", content: "/results" },
    ],
    links: [{ rel: "canonical", href: "/results" }],
  }),
  component: Results,
});

const cases = [
  {
    tag: "Second location ramp",
    h: "Built demand after the overhead was already real.",
    m: "A coordinated launch across direct mail, GBP, and digital helped a new location grow into its bigger commitment.",
    image: siteMedia.shops.pearsonExterior,
  },
  {
    tag: "Retention leak fixed",
    h: "Reactivated 900+ dormant customers.",
    m: "CRM cleanup, service reminders, and a real follow-up cadence recovered revenue already earned.",
    image: siteMedia.shops.mikes,
  },
  {
    tag: "Direct mail turnaround",
    h: "Doubled response on the same list.",
    m: "Sharper market, message, offer, timing, and tracking turned a tired mail program around.",
    image: siteMedia.graphics.directMail,
  },
  {
    tag: "Vendor spend cleaned up",
    h: "Clarified what to keep, cut, and make work harder.",
    m: "One team owning the scoreboard instead of five vendors defending disconnected line items.",
    image: siteMedia.shops.mmShop,
  },
  {
    tag: "Quality customer strategy",
    h: "Right cars, better timing, stronger fit.",
    m: "Positioning and messaging tuned around customer quality, capacity, and the work the shop actually wants.",
    image: siteMedia.shops.killian,
    imageFit: "contain",
  },
];

function Results() {
  return (
    <SiteShell>
      <section className="border-b hairline">
        <div className="container-page pt-20 md:pt-28 pb-16">
          <p className="eyebrow">Results</p>
          <h1 className="display-1 mt-6 max-w-[16ch] text-balance">
            Proof lives in the bays.
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
            Case studies and stories from shops we've worked alongside. Full
            write-ups coming soon — reach out for details on any of these.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <div
              key={c.tag}
              className="group overflow-hidden rounded-2xl border hairline bg-white transition hover:border-[var(--navy)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[var(--off-white)]">
                <img
                  src={c.image.src}
                  alt={c.image.alt}
                  width={1400}
                  height={933}
                  loading="lazy"
                  className={`h-full w-full transition duration-500 group-hover:scale-[1.03] ${
                    "imageFit" in c && c.imageFit === "contain" ? "object-contain p-8" : "object-cover"
                  }`}
                  style={{ objectPosition: c.image.position }}
                />
              </div>
              <div className="p-8">
                <p className="text-xs uppercase tracking-widest" style={{ color: "var(--key-blue)" }}>
                  {c.tag}
                </p>
                <p className="font-display text-2xl mt-4 text-balance text-charcoal">{c.h}</p>
                <p className="mt-3 text-muted-foreground">{c.m}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-24 text-center">
        <a href={CONSULTATION_URL} target="_blank" rel="noopener" className="btn-primary">
          Talk about your shop →
        </a>
      </section>
    </SiteShell>
  );
}
