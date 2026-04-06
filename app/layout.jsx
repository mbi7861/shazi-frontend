// app/layout.jsx
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AppProvider } from "@/context/AppProvider";
import { Toaster } from "react-hot-toast";
import WhatsappWidget from "@/components/social/WhatsappWidget";
import SearchContainer from "@/components/search/SearchContainer";
import Script from "next/script";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// ✅ Meaningful, keyword-rich description (150–160 chars ideal)
export const metadata = {
  title: {
    default: "Shazi Jewels — Handcrafted Gold & Silver Jewellery",
    template: "%s | Shazi Jewels",
  },
  description:
    "Shop handcrafted gold and silver jewellery at Shazi Jewels. Explore rings, necklaces, earrings and bracelets — crafted with care and delivered across Pakistan.",
  keywords: [
    "jewellery",
    "gold jewellery",
    "silver jewellery",
    "handcrafted jewellery Pakistan",
    "rings",
    "necklaces",
    "earrings",
  ],
  metadataBase: new URL("https://shazijewels.com"), // ✅ required for absolute OG URLs
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://shazijewels.com",
    title: "Shazi Jewels — Handcrafted Gold & Silver Jewellery",
    description:
      "Shop handcrafted gold and silver jewellery at Shazi Jewels. Rings, necklaces, earrings and bracelets crafted with care.",
    images: [
      {
        url: "/og-image.jpg", // add a 1200x630 image to /public
        width: 1200,
        height: 630,
        alt: "Shazi Jewels collection",
      },
    ],
    locale: "en_PK",
    siteName: "Shazi Jewels",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shazi Jewels — Handcrafted Jewellery",
    description:
      "Shop handcrafted gold and silver jewellery. Rings, necklaces, earrings and bracelets.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/assets/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.className}`}>
      <body>
        <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" />
        <AppProvider>
          {children}
          <SearchContainer />
          <WhatsappWidget phoneNumber="+923105045353" />
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}