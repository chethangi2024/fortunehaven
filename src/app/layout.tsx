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

// Configurable production domain (default: https://fortunehavens.com)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fortunehavens.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fortune Haven | Ultra Luxury Villas in Devanahalli, North Bengaluru",
    template: "%s | Fortune Haven",
  },
  description:
    "Discover Fortune Haven, an exclusive gated enclave of 24 ultra luxury 4-BHK private residences in Devanahalli, North Bengaluru along NH-207. 4,281 sq ft built-up area with 2,800 sq ft UDS, developed by Cannas Lily Infrastructure.",
  keywords: [
    "Fortune Haven luxury villas",
    "Luxury villas in Devanahalli",
    "Ultra luxury villas North Bengaluru",
    "4 BHK luxury villas Bangalore",
    "Villas near NH-207",
    "Cannas Lily Infrastructure",
    "JCN Group Fortune Haven",
    "Luxury gated community Devanahalli",
    "Villas near Kempegowda International Airport",
    "Nandi Hills luxury villas",
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
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Fortune Haven | Ultra Luxury Villas in Devanahalli, North Bengaluru",
    description:
      "Exclusive gated enclave of 24 ultra luxury 4-BHK private residences in Devanahalli, North Bengaluru along NH-207. 4,281 sq ft built-up area with 2,800 sq ft UDS.",
    url: SITE_URL,
    siteName: "Fortune Haven",
    images: [
      {
        url: "/digital-assets/Villa Images/Upscale_this_image_2K_20261007212944.webp",
        width: 2048,
        height: 1365,
        alt: "Fortune Haven Ultra Luxury Villa Contemporary Architectural Facade in Devanahalli",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortune Haven | Ultra Luxury Villas in Devanahalli, North Bengaluru",
    description:
      "Exclusive gated enclave of 24 ultra luxury 4-BHK private residences in Devanahalli, North Bengaluru along NH-207.",
    images: ["/digital-assets/Villa Images/Upscale_this_image_2K_20261007212944.webp"],
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
      alternateName: "JCN Group",
      url: SITE_URL,
      logo: `${SITE_URL}/digital-assets/Main Company of the Builder/Cannas Lily Infrastructure Pvt. Ltd..png`,
      description:
        "Developer and promoter of Fortune Haven ultra luxury residential enclave in Devanahalli, Bengaluru North.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91 91640 16999",
        contactType: "sales",
        email: "sales@fortunehavens.com",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Kannada"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Fortune Haven",
      description:
        "Official website for Fortune Haven, a private collection of 24 ultra luxury 4-BHK private villas in Devanahalli, Bengaluru North along NH-207.",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "Residence",
      "@id": `${SITE_URL}/#residence`,
      name: "Fortune Haven Ultra Luxury Villas",
      description:
        "Exclusive gated enclave of twenty-four Ultra Luxury 4-BHK private residences in Devanahalli, Bengaluru North, developed by Cannas Lily Infrastructure Pvt. Ltd. (JCN Group). Each villa features four thoughtfully planned levels with 4,281 sq ft built-up area and 2,800 sq ft undivided land share (UDS).",
      url: SITE_URL,
      numberOfRooms: 4,
      occupancy: {
        "@type": "QuantitativeValue",
        value: 24,
        unitText: "Residences",
      },
      floorSize: {
        "@type": "QuantitativeValue",
        value: 4281,
        unitCode: "FTK",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "NH-207, Adjacent to Fortune Haven",
        addressLocality: "Devanahalli, Bengaluru North",
        addressRegion: "Karnataka",
        postalCode: "562110",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "13.2575",
        longitude: "77.7097",
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
