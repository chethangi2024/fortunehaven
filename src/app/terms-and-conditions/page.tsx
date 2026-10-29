import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "@/components/LegalPage.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fortunehavens.com";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for using the Fortune Haven website and inquiring about our ultra luxury 4-BHK private villas in Devanahalli, Bengaluru North.",
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
  openGraph: {
    title: "Terms & Conditions | Fortune Haven Ultra Luxury Villas",
    description:
      "Terms and Conditions for using the Fortune Haven website and inquiring about our ultra luxury villas in Devanahalli, Bengaluru North.",
    url: `${SITE_URL}/terms-and-conditions`,
    type: "website",
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${SITE_URL}/terms-and-conditions/#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Terms & Conditions",
      item: `${SITE_URL}/terms-and-conditions`,
    },
  ],
};

const TOC_TERMS = [
  { id: "website-info", title: "Website Information" },
  { id: "property-details", title: "Property Details" },
  { id: "enquiries-visits", title: "Enquiries and Site Visits" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "external-links", title: "External Links" },
  { id: "website-use", title: "Website Use" },
  { id: "changes-terms", title: "Changes to These Terms" },
  { id: "contact-us", title: "Contact Us" },
];

export default function TermsAndConditionsPage() {
  return (
    <div className={styles.legalPageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Header />

      <main className={styles.legalMain}>
        <div className="editorial-container">
          {/* Header */}
          <div className={styles.legalHeader}>
            <Link href="/" className={styles.backLink}>
              <span>← Back to Fortune Haven</span>
            </Link>

            <div className={styles.eyebrow}>
              <span>TERMS OF ENGAGEMENT & PLATFORM USE</span>
            </div>

            <h1 className={styles.pageTitle}>Terms & Conditions</h1>

            <div className={styles.headerMetaRow}>
              <span>
                Last updated: <strong className={styles.metaHighlight}>October 2026</strong>
              </span>
            </div>
          </div>

          {/* Content Layout */}
          <div className={styles.legalContentLayout}>
            {/* Table of Contents Column */}
            <aside className={styles.tocCol} aria-label="Table of Contents">
              <span className={styles.tocTitle}>Contents</span>
              <ul className={styles.tocList}>
                {TOC_TERMS.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`} className={styles.tocLink}>
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Article Body */}
            <article className={styles.legalArticle}>
              <p className={styles.sectionText}>
                By using the Fortune Haven website, you agree to these terms.
              </p>

              {/* 1. Website Information */}
              <section id="website-info" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>01</span>
                  <h2 className={styles.sectionTitle}>Website Information</h2>
                </div>
                <p className={styles.sectionText}>
                  This website provides general information about Fortune Haven, its villas, amenities, floor plans, location, and connectivity. Information and images are provided for guidance and may be updated from time to time.
                </p>
              </section>

              {/* 2. Property Details */}
              <section id="property-details" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>02</span>
                  <h2 className={styles.sectionTitle}>Property Details</h2>
                </div>
                <p className={styles.sectionText}>
                  Specifications, layouts, amenities, distances, availability, and other project details should be confirmed with the authorized project representative before making a purchase decision. Illustrations and photographs may not represent every final detail.
                </p>
              </section>

              {/* 3. Enquiries and Site Visits */}
              <section id="enquiries-visits" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>03</span>
                  <h2 className={styles.sectionTitle}>Enquiries and Site Visits</h2>
                </div>
                <p className={styles.sectionText}>
                  Submitting an enquiry or requesting a site visit does not constitute a booking, allotment, or purchase agreement. Any purchase is subject to the applicable official documents and agreements.
                </p>
              </section>

              {/* 4. Intellectual Property */}
              <section id="intellectual-property" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>04</span>
                  <h2 className={styles.sectionTitle}>Intellectual Property</h2>
                </div>
                <p className={styles.sectionText}>
                  Website text, photographs, graphics, logos, and other materials may not be copied, reproduced, or used commercially without appropriate authorization.
                </p>
              </section>

              {/* 5. External Links */}
              <section id="external-links" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>05</span>
                  <h2 className={styles.sectionTitle}>External Links</h2>
                </div>
                <p className={styles.sectionText}>
                  The website may link to third-party services or websites. Fortune Haven is not responsible for their content, availability, or privacy practices.
                </p>
              </section>

              {/* 6. Website Use */}
              <section id="website-use" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>06</span>
                  <h2 className={styles.sectionTitle}>Website Use</h2>
                </div>
                <p className={styles.sectionText}>
                  You agree not to misuse the website, interfere with its operation, or submit false or misleading information.
                </p>
              </section>

              {/* 7. Changes to These Terms */}
              <section id="changes-terms" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>07</span>
                  <h2 className={styles.sectionTitle}>Changes to These Terms</h2>
                </div>
                <p className={styles.sectionText}>
                  We may update these terms when necessary. The latest version will be published on this page.
                </p>
              </section>

              {/* 8. Contact Us */}
              <section id="contact-us" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>08</span>
                  <h2 className={styles.sectionTitle}>Contact Us</h2>
                </div>
                <p className={styles.sectionText}>
                  For questions about these terms, email{" "}
                  <a href="mailto:sales@fortunehavens.com" className={styles.tocLink} style={{ color: "var(--color-gold)", textDecoration: "underline" }}>
                    sales@fortunehavens.com
                  </a>
                  .
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
