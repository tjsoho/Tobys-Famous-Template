/**
 * Single registry of every public route the admin can pick from in CTA
 * pickers, dropdowns, etc. Add a new public page → add it here once.
 *
 * `popup` is a sentinel value for buttons that should open the
 * "Coming Soon" modal instead of navigating.
 */

export const POPUP_ACTION = "popup" as const;

export const SITE_PAGE_OPTIONS = [
  { value: POPUP_ACTION, label: "Open Popup (Coming Soon)" },
  { value: "/", label: "Home" },
  { value: "/about-us", label: "About Us" },
  { value: "/contact", label: "Contact" },
  { value: "/blog", label: "Blog" },
  { value: "/faqs", label: "FAQs" },
] as const;

export type SitePageValue = (typeof SITE_PAGE_OPTIONS)[number]["value"];

export function isPopupAction(action?: string | null): boolean {
  return action === POPUP_ACTION;
}
