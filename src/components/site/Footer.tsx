import { Link } from "@tanstack/react-router";
import { services, CONSULTATION_URL } from "@/lib/services";
import { track } from "@/lib/analytics";

export function Footer() {
  return (
    <footer style={{ background: "var(--navy)", color: "#fff" }}>
      <div className="container-page py-20">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-white/60">Turnkey Marketing</p>
            <h2 className="display-2 text-white mt-4 text-balance">
              One plan. Clearer spend. Fuller bays.
            </h2>
            <a
              href={CONSULTATION_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 mt-8 px-6 py-4 rounded-full font-medium"
              style={{ background: "var(--green)", color: "var(--charcoal)" }}
              onClick={() => track("consultation_cta_click", { placement: "footer" })}
            >
              Schedule a Consultation →
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Company</p>
              <ul className="space-y-3">
                <li><Link to="/about" className="hover:text-[var(--green)]">About</Link></li>
                <li><Link to="/results" className="hover:text-[var(--green)]">Results</Link></li>
                <li><Link to="/resources" className="hover:text-[var(--green)]">Resources</Link></li>
                <li><Link to="/contact" className="hover:text-[var(--green)]">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Services</p>
              <ul className="space-y-3">
                {services.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="hover:text-[var(--green)]"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Contact</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:9137774144"
                    className="hover:text-[var(--green)]"
                    onClick={() => track("phone_click", { placement: "footer" })}
                  >
                    (913) 777-4144
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@turnkeyautomarketing.com"
                    className="hover:text-[var(--green)]"
                    onClick={() => track("email_click", { placement: "footer" })}
                  >
                    hello@turnkeyautomarketing.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Turnkey Marketing. Built for auto repair shops.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-[var(--green)]">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-[var(--green)]">
              Terms of Service
            </Link>
            <span>Trusted by 300+ shops · 13+ years · ATI & ShopFix partners</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
