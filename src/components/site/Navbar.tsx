import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X, Star, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { services, CONSULTATION_URL } from "@/lib/services";
import { track } from "@/lib/analytics";

const LOGO_SRC = "/turnkey-logo.png";

const primaryNav = [
  { label: "Services", to: "/services" },
  { label: "Results", to: "/results" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
] as const;

export function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const vip = services.find((s) => s.featured)!;
  const rest = services.filter((s) => !s.featured);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none bg-white border-b hairline">
      <div className="container-page">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto flex h-[80px] md:h-[88px] items-center justify-between px-0"
        >
          <Link to="/" className="flex items-center" aria-label="Turnkey Marketing home">
            <img
              src={LOGO_SRC}
              alt="Turnkey Marketing"
              width={1110}
              height={271}
              className="h-12 md:h-16 w-auto"
            />
          </Link>


          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                to="/services"
                className="flex items-center gap-1 px-4 py-2 text-[0.92rem] text-charcoal/80 hover:text-charcoal transition rounded-full"
              >
                Services
                <ChevronDown className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-4 w-[720px]"
                  >
                    <div className="rounded-3xl border hairline bg-white shadow-[0_30px_80px_-20px_rgba(20,22,28,0.25)] p-5">
                      <Link
                        to="/services/$slug"
                        params={{ slug: vip.slug }}
                        className="group flex items-start gap-4 rounded-2xl p-4 hover:bg-[var(--off-white)] transition"
                      >
                        <span
                          className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                          style={{ background: "var(--navy)", color: "#fff" }}
                        >
                          <Star className="h-4 w-4" />
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-display text-[1.1rem] text-charcoal font-semibold">
                              {vip.name}
                            </span>
                            <span
                              className="text-[0.6rem] uppercase tracking-widest px-1.5 py-0.5 rounded"
                              style={{ background: "var(--green)", color: "var(--charcoal)" }}
                            >
                              Flagship
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{vip.tagline}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-charcoal/40 group-hover:text-charcoal transition" />
                      </Link>
                      <div className="my-3 border-t hairline" />
                      <div className="grid grid-cols-2 gap-1">
                        {rest.map((s) => (
                          <Link
                            key={s.slug}
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            className="rounded-xl px-4 py-2.5 hover:bg-[var(--off-white)] transition"
                          >
                            <div className="text-[0.95rem] text-charcoal font-medium">{s.name}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {s.tagline}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {primaryNav.slice(1).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-4 py-2 text-[0.92rem] text-charcoal/80 hover:text-charcoal transition rounded-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={CONSULTATION_URL}
              target="_blank"
              rel="noopener"
              className="btn-primary !py-2.5 !px-5 text-sm"
              onClick={() => track("consultation_cta_click", { placement: "navbar" })}
            >
              Book a Call
            </a>
          </div>

          <button
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-[var(--off-white)]"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto fixed inset-0 z-50 bg-white flex flex-col"
          >
            <div className="container-page flex h-[72px] items-center justify-between border-b hairline">
              <span className="font-display text-lg font-semibold">Menu</span>
              <button
                className="inline-flex items-center justify-center h-10 w-10 rounded-full"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="container-page py-8 overflow-y-auto flex-1">
              <nav className="flex flex-col divide-y hairline border-y">
                {primaryNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="py-5 font-display text-2xl text-charcoal font-semibold"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6">
                <p className="eyebrow mb-3">All Services</p>
                <ul className="grid gap-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-charcoal"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={CONSULTATION_URL}
                target="_blank"
                rel="noopener"
                className="btn-primary w-full mt-8"
                onClick={() => track("consultation_cta_click", { placement: "mobile_menu" })}
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
