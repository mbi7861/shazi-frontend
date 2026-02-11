import { Outfit } from "next/font/google";
import "./globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AppProvider } from "@/context/AppProvider";
import { Toaster } from "react-hot-toast";
import WhatsappWidget from "@/components/social/WhatsappWidget";
import Script from "next/script";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Dilawar Traders",
  description: "Your safety is our best priority",
  icons: {
    icon: [
      { url: "/assets/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/assets/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={outfit.className}>
        
      <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
      />
        <AppProvider>
          {children}
          <WhatsappWidget phoneNumber="923035444220" />
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}