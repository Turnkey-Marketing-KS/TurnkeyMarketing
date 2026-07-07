import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Star } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { services, CONSULTATION_URL } from "@/lib/services";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Turnkey Marketing" },
      {
        name: "description",
        content:
          "A coordinated marketing ecosystem for auto repair shops — VIP Marketing Manager, direct mail, digital, retention, and more.",
      },
      { property: "og:title", content: "Services — Turnkey Marketing" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const vip = services.find((s) => s.featured)!;
  const rest = services.filter((s) => !s.featured);
  return (
    <SiteShell>
      <section className="border-b hairline">
        <div className="container-page pt-20 md:pt-28 pb-16">
          <p className="eyebrow">Services</p>
          <h1 className="display-1 mt-6 max-w-[18ch] text-balance">
            One team. Every channel. One coordinated plan.
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
            You don't need more vendors. You need one marketing team that sees
            the whole board and moves it forward every week.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <Link
          to="/services/$slug"
          params={{ slug: vip.slug }}
          className="group block rounded-3xl overflow-hidden p-10 md:p-14 relative"
          style={{ background: "var(--navy)", color: "#fff" }}
          onClick={() => track("service_cta_click", { slug: vip.slug, placement: "services_hero" })}
        >
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" style={{ color: "var(--green)" }} />
            <p className="text-xs uppercase tracking-widest text-white/60">Flagship</p>
          </div>
          <h2 className="display-2 text-white mt-4 max-w-2xl text-balance">{vip.name}</h2>
          <p className="mt-4 text-white/80 text-lg max-w-xl">{vip.tagline}</p>
          <span className="inline-flex items-center gap-2 mt-8 text-white border-b border-white/30 pb-1">
            Explore VIP Marketing Manager
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      </section>

      <section className="container-page pb-24">
        <div className="border-t hairline">
          {rest.map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group grid grid-cols-12 gap-6 border-b hairline py-8 items-baseline hover:bg-[var(--off-white)] transition px-2 md:px-4 -mx-2 md:-mx-4 rounded-md"
              onClick={() => track("service_cta_click", { slug: s.slug })}
            >
              <span className="col-span-1 text-xs text-muted-foreground tabular-nums pt-2">
                {String(i + 2).padStart(2, "0")}
              </span>
              <span className="col-span-11 md:col-span-4 font-display text-2xl md:text-3xl text-charcoal">
                {s.name}
              </span>
              <span className="col-span-11 md:col-span-6 text-muted-foreground col-start-2 md:col-start-auto">
                {s.tagline}
              </span>
              <span className="col-span-1 justify-self-end pt-2">
                <ArrowUpRight className="h-5 w-5 text-charcoal transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={CONSULTATION_URL}
            target="_blank"
            rel="noopener"
            className="btn-primary"
            onClick={() => track("consultation_cta_click", { placement: "services_index" })}
          >
            Schedule a Consultation →
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
