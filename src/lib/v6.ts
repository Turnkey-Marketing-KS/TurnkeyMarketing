// Shared helpers for the v6 redesign.

export const iconSrc = (name: string) => `/images/icons/noun/${name}.svg`;

// Noun icon for each service
export const serviceIcons: Record<string, string> = {
  "vip-marketing-manager": "vip",
  "directtrack-marketing": "direct",
  "marketing-consulting": "target",
  "direct-mail": "direct-mail",
  "social-media-marketing": "social-media-marketing",
  "retention-marketing": "retention",
  "digital-marketing": "internet",
  "boost-days": "boost",
};

// Headline helper: each word is masked and revealed in sequence. Text content is unchanged for search engines.
export type Seg = { t: string; accent?: boolean };
const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const split = (segs: Seg[]) => {
  let i = 0;
  return segs
    .map((seg) =>
      seg.t
        .split(" ")
        .filter(Boolean)
        .map((word) => `<span class="v6-w${seg.accent ? " v6-accent" : ""}" style="--i:${i++}"><span>${escapeHtml(word)}</span></span>`)
        .join(" "),
    )
    .join(" ");
};

export const arrow = `<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const arrowUp = `<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const chevron = `<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const play = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>`;
export const phoneHref = "tel:+19134270674";
export const phoneLabel = "(913) 427-0674";
