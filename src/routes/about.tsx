import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { CONSULTATION_URL } from "@/lib/services";
import { track } from "@/lib/analytics";
import { siteMedia } from "@/lib/site-media";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Turnkey Marketing" },
      {
        name: "description",
        content:
          "Founder-led by Carrie-Lynn Rodenberg. 13+ years helping auto repair shops grow with strategy, execution, and real accountability.",
      },
      { property: "og:title", content: "About Turnkey Marketing" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <SiteShell>
      <section className="border-b hairline">
        <div className="container-page pt-20 md:pt-28 pb-16">
          <p className="eyebrow">About</p>
          <h1 className="display-1 mt-6 max-w-[18ch] text-balance">
            We built Turnkey because shops deserved better than disconnected vendors.
          </h1>
        </div>
      </section>

      <section className="container-page py-20 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--off-white)]">
            <img
              src={siteMedia.about.founder.src}
              alt={siteMedia.about.founder.alt}
              width={687}
              height={900}
              loading="lazy"
              className="h-full w-full -translate-x-2 scale-[1.12] object-cover"
              style={{ objectPosition: siteMedia.about.founder.position }}
            />
          </div>
          <p className="font-display text-xl mt-6">Carrie-Lynn Rodenberg</p>
          <p className="text-sm text-muted-foreground">Founder, Turnkey Marketing</p>
        </div>
        <div className="lg:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            For 13+ years, we've worked alongside auto repair shop owners who
            were tired of piecing together marketing from vendors who didn't
            really know their shop, their brand, or their customers.
          </p>
          <p>
            Turnkey is our answer. We're an auto-repair-specific marketing team
            that comes alongside owners as a real marketing department — owning
            the strategy, managing the execution, and helping shops grow with
            confidence.
          </p>
          <p>
            We're proud to partner with ATI and ShopFix, and to have helped
            300+ shops fill more bays, keep more customers, and make their
            marketing spend work harder.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--off-white)" }}>
        <div className="container-page py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { k: "300+", v: "auto repair shops" },
              { k: "13+", v: "years in the industry" },
              { k: "Founder-led", v: "expertise from Carrie-Lynn" },
            ].map((s) => (
              <div key={s.k} className="border-t hairline pt-6">
                <p className="font-display text-4xl text-charcoal">{s.k}</p>
                <p className="mt-2 text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 overflow-hidden rounded-[28px] bg-[var(--off-white)]">
            <img
              src={siteMedia.about.team.src}
              alt={siteMedia.about.team.alt}
              width={1400}
              height={933}
              loading="lazy"
              className="aspect-[16/10] h-full w-full object-cover"
              style={{ objectPosition: siteMedia.about.team.position }}
            />
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow">Our team</p>
            <h2 className="display-2 mt-5 max-w-[12ch] text-balance">
              Built around the shop owner.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Strategy, creative, reporting, and execution stay connected under
              one roof, so every channel works from the same plan and the same
              understanding of your shop.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-24 text-center">
        <h2 className="display-2 max-w-2xl mx-auto text-balance">
          Come meet the team behind your marketing.
        </h2>
        <a
          href={CONSULTATION_URL}
          target="_blank"
          rel="noopener"
          className="btn-primary mt-8 inline-flex"
          onClick={() => track("consultation_cta_click", { placement: "about" })}
        >
          Schedule a Consultation →
        </a>
      </section>
    </SiteShell>
  );
}
