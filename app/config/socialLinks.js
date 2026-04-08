/**
 * Social Links Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * Update the `href` values below to point to the real Shazi Jewels accounts.
 * Every component that renders social icons should import from this file so
 * there is a single source of truth.
 *
 * Shape of each entry:
 *   id      – unique key used as React key
 *   label   – accessible aria-label
 *   href    – the destination URL
 *   icon    – inline SVG path data  (viewBox is always "0 0 24 24")
 *   stroked – if true the icon uses stroke instead of fill (e.g. Instagram)
 */

export const socialLinks = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com/shazi_jewels",
    icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    stroked: false,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/shazi_jewels",
    icon: "instagram",
    stroked: true,
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://tiktok.com/@shazi_jewels",
    icon: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z",
    stroked: false,
  },
  {
    id: "pinterest",
    label: "Pinterest",
    href: "https://pinterest.com/shazi_jewels",
    icon: "M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.141-.828 3.329-.236.995.499 1.806 1.48 1.806 1.775 0 3.144-1.872 3.144-4.573 0-2.39-1.718-4.061-4.169-4.061-2.837 0-4.502 2.128-4.502 4.327 0 .857.33 1.775.741 2.276a.3.3 0 0 1 .069.286c-.076.314-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z",
    stroked: false,
  },
];
