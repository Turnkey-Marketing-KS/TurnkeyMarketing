type EventName =
  | "consultation_cta_click"
  | "phone_click"
  | "email_click"
  | "service_cta_click";

type W = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

export function track(event: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, ...params });
    w.gtag?.("event", event, params);
    w.fbq?.("trackCustom", event, params);
  } catch {
    /* noop */
  }
}
