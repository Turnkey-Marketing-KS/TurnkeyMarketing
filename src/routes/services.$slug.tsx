import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { services, getService, CONSULTATION_URL } from "@/lib/services";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.service;
    const title = s ? `${s.name} — Turnkey Marketing` : "Service — Turnkey Marketing";
    const desc = s?.summary ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/services/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
    };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-page py-32 text-center">
        <h1 className="display-2">Service not found</h1>
        <Link to="/services" className="btn-primary mt-8 inline-flex">Back to services</Link>
      </div>
    </SiteShell>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <SiteShell>
      <section className="border-b hairline">
        <div className="container-page pt-16 md:pt-24 pb-20">
          <Link to="/services" className="text-sm text-muted-foreground hover:text-charcoal">
            ← All services
          </Link>
          <div className="mt-6 grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow">
                {service.featured ? "Flagship offer" : "Service"}
              </p>
              <h1 className="display-1 mt-6 text-balance">{service.name}</h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {service.tagline}
              </p>
            </div>
            <div className="lg:col-span-4">
              <a
                href={CONSULTATION_URL}
                target="_blank"
                rel="noopener"
                className="btn-primary w-full"
                onClick={() =>
                  track("service_cta_click", { slug: service.slug, placement: "service_hero" })
                }
              >
                Talk about {service.name} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Overview</p>
          <h2 className="display-3 mt-4 text-balance">What you actually get.</h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg text-muted-foreground leading-relaxed">{service.summary}</p>
          <ul className="mt-10 grid gap-4">
            {service.outcomes.map((o: string) => (
              <li key={o} className="flex items-start gap-4 border-b hairline pb-4">
                <span
                  className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full"
                  style={{ background: "var(--green)" }}
                >
                  <Check className="h-3 w-3" style={{ color: "var(--charcoal)" }} />
                </span>
                <span className="text-charcoal">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ background: "var(--off-white)" }}>
        <div className="container-page py-20">
          <p className="eyebrow">How we work</p>
          <div className="mt-8 grid gap-px md:grid-cols-3 bg-[var(--hairline)] rounded-2xl overflow-hidden">
            {[
              { n: "01", t: "Learn the shop", d: "Interviews, audits, and a real look at your goals and market." },
              { n: "02", t: "Build the plan", d: "Strategy first. Then the tactics that actually fit your shop." },
              { n: "03", t: "Run it, report it", d: "Weekly execution and honest monthly reporting you can act on." },
            ].map((step) => (
              <div key={step.n} className="bg-white p-8">
                <p className="text-xs tracking-widest text-muted-foreground">{step.n}</p>
                <p className="font-display text-xl mt-4 text-charcoal">{step.t}</p>
                <p className="mt-2 text-muted-foreground">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2 className="display-3">Explore related services</h2>
          <Link to="/services" className="btn-ghost">All services →</Link>
        </div>
        <div className="mt-10 border-t hairline">
          {related.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group grid grid-cols-12 gap-6 border-b hairline py-6 items-baseline hover:bg-[var(--off-white)] transition px-2 -mx-2 rounded-md"
            >
              <span className="col-span-11 md:col-span-4 font-display text-2xl text-charcoal">{s.name}</span>
              <span className="col-span-11 md:col-span-7 text-muted-foreground col-start-2 md:col-start-auto">{s.tagline}</span>
              <span className="col-span-1 justify-self-end"><ArrowUpRight className="h-5 w-5" /></span>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
