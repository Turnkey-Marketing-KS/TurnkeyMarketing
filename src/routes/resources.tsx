import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { siteMedia } from "@/lib/site-media";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Turnkey Marketing" },
      {
        name: "description",
        content:
          "Guides, articles, and tools built for auto repair shop owners who want their marketing to work harder.",
      },
      { property: "og:title", content: "Resources — Turnkey Marketing" },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: Resources,
});

const items = [
  {
    cat: "Guide",
    t: "What to keep, cut, and make work harder",
    d: "A clearer way to look at vendors, spend, calls, and next moves.",
    image: siteMedia.graphics.marketingPlan,
  },
  {
    cat: "Article",
    t: "Why disconnected vendors cost more than money",
    d: "The hidden drag of managing five people without one view of the board.",
    image: siteMedia.graphics.problems,
  },
  {
    cat: "Playbook",
    t: "Direct mail that pulls its weight",
    d: "Lists, offers, timing, and follow-up that turn mail into useful calls.",
    image: siteMedia.graphics.directMail,
  },
  {
    cat: "Guide",
    t: "When the growth bet is already made",
    d: "How to think about demand after the lease, move, hire, or second location.",
    image: siteMedia.shops.thunderbirdTeam,
  },
  {
    cat: "Article",
    t: "The retention leak most shops miss",
    d: "Why the customers you already earned need a real second-visit plan.",
    image: siteMedia.graphics.leadGenerator,
  },
  {
    cat: "Playbook",
    t: "Controlled demand for a soft schedule",
    d: "Practical moves for open bays without creating chaos at the counter.",
    image: siteMedia.shops.tommys,
  },
];

function Resources() {
  return (
    <SiteShell>
      <section className="border-b hairline">
        <div className="container-page pt-20 md:pt-28 pb-16">
          <p className="eyebrow">Resources</p>
          <h1 className="display-1 mt-6 max-w-[18ch] text-balance">
            Built for shop owners who want to make smarter marketing decisions.
          </h1>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3 bg-[var(--hairline)] rounded-2xl overflow-hidden">
          {items.map((r) => (
            <article key={r.t} className="bg-white p-6 flex flex-col min-h-[360px]">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-[var(--off-white)]">
                <img
                  src={r.image.src}
                  alt={r.image.alt}
                  width={1000}
                  height={750}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: r.image.position }}
                />
              </div>
              <div className="mt-6 flex flex-1 flex-col justify-between">
                <p className="text-xs uppercase tracking-widest" style={{ color: "var(--key-blue)" }}>
                  {r.cat}
                </p>
                <div className="mt-5">
                  <p className="font-display text-xl text-charcoal text-balance">{r.t}</p>
                  <p className="mt-2 text-muted-foreground text-sm">{r.d}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Full resource library launching soon.
        </p>
      </section>
    </SiteShell>
  );
}
