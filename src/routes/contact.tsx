import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Calendar } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { CONSULTATION_URL } from "@/lib/services";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Turnkey Marketing" },
      {
        name: "description",
        content:
          "Schedule a consultation, call, or email the Turnkey Marketing team.",
      },
      { property: "og:title", content: "Contact Turnkey Marketing" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteShell>
      <section className="border-b hairline">
        <div className="container-page pt-20 md:pt-28 pb-16">
          <p className="eyebrow">Contact</p>
          <h1 className="display-1 mt-6 max-w-[16ch] text-balance">
            Let's talk about your shop.
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
            30 minutes. No pitch deck. Just a real conversation about what is
            working, what is leaking, and what the first 90-120 days should
            realistically focus on.
          </p>
        </div>
      </section>

      <section className="container-page py-20 grid gap-6 md:grid-cols-3">
        <a
          href={CONSULTATION_URL}
          target="_blank"
          rel="noopener"
          className="rounded-2xl p-8 group transition hover:-translate-y-0.5"
          style={{ background: "var(--navy)", color: "#fff" }}
          onClick={() => track("consultation_cta_click", { placement: "contact_card" })}
        >
          <Calendar className="h-5 w-5" style={{ color: "var(--green)" }} />
          <p className="font-display text-2xl mt-6 text-white">Schedule a Consultation</p>
          <p className="mt-2 text-white/70 text-sm">Pick a time that works. We'll look at the whole board.</p>
        </a>
        <a
          href="tel:9137774144"
          className="rounded-2xl border hairline p-8 hover:border-[var(--navy)] transition"
          onClick={() => track("phone_click", { placement: "contact_card" })}
        >
          <Phone className="h-5 w-5" style={{ color: "var(--navy)" }} />
          <p className="font-display text-2xl mt-6 text-charcoal">(913) 777-4144</p>
          <p className="mt-2 text-muted-foreground text-sm">Call the team directly with what is on your plate.</p>
        </a>
        <a
          href="mailto:hello@turnkeyautomarketing.com"
          className="rounded-2xl border hairline p-8 hover:border-[var(--navy)] transition"
          onClick={() => track("email_click", { placement: "contact_card" })}
        >
          <Mail className="h-5 w-5" style={{ color: "var(--navy)" }} />
          <p className="font-display text-xl mt-6 text-charcoal break-all">
            hello@turnkeyautomarketing.com
          </p>
          <p className="mt-2 text-muted-foreground text-sm">Email us what you are trying to sort out.</p>
        </a>
      </section>
    </SiteShell>
  );
}
