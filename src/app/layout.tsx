import type { Metadata, Viewport } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F7F5F0",
  width: "device-width",
  initialScale: 1,
};

// Configurable production domain (fallback for metadataBase)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fortunehaven.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Fortune Haven | Ultra Luxury Villas",
  description:
    "Discover Fortune Haven, a private collection of ultra luxury villas near the Nandi Hills region, designed around space, architecture and considered living.",
  keywords: [
    "Fortune Haven luxury villas",
    "Luxury villas near Nandi Hills",
    "Ultra Luxury villas",
    "Luxury villas near Bengaluru",
    "Villas near NH-207",
    "Cannas Lily Infrastructure",
    "Ultra-luxury villas Bangalore",
  ],
  authors: [{ name: "Fortune Haven" }],
  creator: "Fortune Haven",
  publisher: "Cannas Lily Infrastructure Pvt. Ltd.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/digital-assets/Logo/Fevicon.png",
    shortcut: "/digital-assets/Logo/Fevicon.png",
    apple: "/digital-assets/Logo/Fevicon.png",
  },
  openGraph: {
    title: "Fortune Haven | Ultra Luxury Villas",
    description:
      "Discover Fortune Haven, a private collection of ultra luxury villas near the Nandi Hills region, designed around space, architecture and considered living.",
    url: "/",
    siteName: "Fortune Haven",
    images: [
      {
        url: "/digital-assets/Villa Images/Upscale_this_image_2K_20261007212944.jpg",
        width: 2048,
        height: 1365,
        alt: "Fortune Haven Architectural Stature and Contemporary Villa Facade",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortune Haven | Ultra Luxury Villas",
    description:
      "Discover Fortune Haven, a private collection of ultra luxury villas near the Nandi Hills region, designed around space, architecture and considered living.",
    images: ["/digital-assets/Villa Images/Upscale_this_image_2K_20261007212944.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Safe structured data representing verified public project information
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Cannas Lily Infrastructure Pvt. Ltd.",
      url: SITE_URL,
      logo: `${SITE_URL}/digital-assets/Main Company of the Builder/Cannas Lily Infrastructure Pvt. Ltd..png`,
      description: "Developer and promoter of Fortune Haven luxury residences.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Fortune Haven",
      description:
        "Official website for Fortune Haven, a private collection of 24 ultra luxury villas along the NH-207 corridor in the Nandi Hills foothills.",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "RealEstateListing",
      "@id": `${SITE_URL}/#residence`,
      name: "Fortune Haven Luxury Villas",
      description:
        "Twenty-four limited-edition Ultra Luxury private villas featuring vertical living, private landscaped terraces, and foothill views near Nandi Hills.",
      url: SITE_URL,
      containedInPlace: {
        "@type": "Place",
        name: "Nandi Hills Foothills",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru Rural",
          addressRegion: "Karnataka",
          addressCountry: "IN",
          streetAddress: "NH-207 Corridor",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "13.3702",
          longitude: "77.6835",
        },
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${lato.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
