import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FAQ_ITEMS, FAQ_INTRO } from "@/data/faqData";
import styles from "@/components/LegalPage.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fortunehaven.com";

export const metadata: Metadata = {
  title: "Property FAQ | Fortune Haven Ultra-Luxury Villas",
  description:
    "Explore essential information about Fortune Haven, its Ultra Luxury Villa architecture, private vertical living spaces, amenities, location, and consultation steps.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: "Property FAQ | Fortune Haven",
    description:
      "Explore essential information about Fortune Haven, its Ultra Luxury Villa architecture, private vertical living spaces, amenities, and consultation steps.",
    url: `${SITE_URL}/faq`,
    type: "website",
  },
};

// Semantic FAQPage structured data generated strictly from visible single-source-of-truth questions and answers
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/faq/#faqpage`,
  name: "Fortune Haven Property FAQ",
  description:
    "Essential questions and answers regarding Fortune Haven's ultra luxury villas in the Nandi Hills foothills.",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer.replace(/\n/g, "<br>"),
    },
  })),
};

export default function FaqPage() {
  return (
    <div className={styles.legalPageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <Header />

      <main className={styles.legalMain} id="main-content">
        <div className={styles.ambientGlow} />

        <div className="editorial-container">
          <div className={styles.legalHeader}>
            <Link href="/" className={styles.backLink}>
              <span>← Back to Fortune Haven</span>
            </Link>

            <div className={styles.eyebrow}>
              <span>{FAQ_INTRO.eyebrow}</span>
            </div>

            <h1 className={styles.pageTitle}>{FAQ_INTRO.heading}</h1>

            <p className={styles.leadParagraph} style={{ maxWidth: "800px", marginBottom: "1.5rem" }}>
              {FAQ_INTRO.supportingText}
            </p>

            <div className={styles.headerMetaRow}>
              <span>Topic: <strong className={styles.metaHighlight}>Architecture, Spatial Specifications & Consultations</strong></span>
              <span className={styles.metaSep}>|</span>
              <span>Total Questions: <strong className={styles.metaHighlight}>{FAQ_ITEMS.length} Questions</strong></span>
              <span className={styles.metaSep}>|</span>
              <span>Enclave: <strong className={styles.metaHighlight}>24 Ultra Luxury Private Residences</strong></span>
            </div>
          </div>
        </div>

        <FaqAccordion
          items={FAQ_ITEMS}
          showCategories={true}
          isCompact={false}
        />
      </main>

      <Footer />
    </div>
  );
}
