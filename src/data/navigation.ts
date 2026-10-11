export interface NavItem {
  label: string;
  href: string;
}

/**
 * Primary Navigation Order (Source of Truth for Header, Mobile Menu & Footer):
 * 1. Home
 * 2. Experience
 * 3. Architecture
 * 4. Interiors
 * 5. Clubhouse
 * 6. Floor Plans
 * 7. Location
 * 8. Why Us
 * 9. Enquire
 */
export const PRIMARY_NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/#experience" },
  { label: "Architecture", href: "/#architecture" },
  { label: "Interiors", href: "/#interiors" },
  { label: "Clubhouse", href: "/#clubhouse" },
  { label: "Floor Plans", href: "/#floor-plans" },
  { label: "Location", href: "/#location" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Enquire", href: "/#enquire" },
] as const;

/**
 * Header menu links: displays items 1 through 8 in horizontal bar,
 * while item 9 (Enquire) is highlighted as the primary Call To Action button.
 */
export const HEADER_NAV_ITEMS: readonly NavItem[] = PRIMARY_NAV_ITEMS.filter(
  (item) => item.label !== "Enquire"
);

/**
 * Mobile drawer items: displays the complete primary navigation sequence (1 through 9).
 */
export const MOBILE_NAV_ITEMS: readonly NavItem[] = PRIMARY_NAV_ITEMS;

/**
 * Footer primary menu: exact primary navigation order (1 through 9).
 */
export const FOOTER_NAV_ITEMS: readonly NavItem[] = PRIMARY_NAV_ITEMS;

/**
 * Additional Footer Secondary / Discovery links
 */
export const FOOTER_ADDITIONAL_ITEMS: readonly NavItem[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Gallery", href: "/#gallery" },
] as const;

/**
 * Footer Legal & Compliance links
 */
export const FOOTER_LEGAL_ITEMS: readonly NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-and-conditions" },
] as const;
