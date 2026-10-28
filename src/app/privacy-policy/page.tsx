import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "@/components/LegalPage.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Fortune Haven",
  description:
    "Privacy Policy for Fortune Haven. Learn how we handle your personal information responsibly in accordance with applicable data protection laws.",
};

const TOC_SECTIONS = [
  { id: "information-collected", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Your Information" },
  { id: "sharing-security", title: "Sharing and Security" },
  { id: "cookies-data", title: "Cookies and Website Data" },
  { id: "privacy-rights", title: "Your Privacy Rights" },
  { id: "data-retention", title: "Data Retention" },
  { id: "contact-us", title: "Contact Us" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.legalPageWrapper}>
      <Header />

      <main className={styles.legalMain}>
        <div className="editorial-container">
          {/* Header */}
          <div className={styles.legalHeader}>
            <Link href="/" className={styles.backLink}>
              <span>← Back to Fortune Haven</span>
            </Link>

            <div className={styles.eyebrow}>
              <span>DATA PROTECTION & PRIVACY</span>
            </div>

            <h1 className={styles.pageTitle}>Privacy Policy</h1>

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
                {TOC_SECTIONS.map((sec) => (
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
                Fortune Haven respects your privacy and is committed to handling your personal information responsibly.
              </p>

              {/* 1. Information We Collect */}
              <section id="information-collected" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>01</span>
                  <h2 className={styles.sectionTitle}>Information We Collect</h2>
                </div>
                <p className={styles.sectionText}>
                  When you submit an enquiry or request a property visit, we may collect your name, email address, phone number, contact preferences, and any information you choose to provide.
                </p>
              </section>

              {/* 2. How We Use Your Information */}
              <section id="how-we-use" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>02</span>
                  <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
                </div>
                <p className={styles.sectionText}>
                  We use your information to respond to enquiries, arrange property visits, share requested project details, and communicate with you about Fortune Haven.
                </p>
              </section>

              {/* 3. Sharing and Security */}
              <section id="sharing-security" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>03</span>
                  <h2 className={styles.sectionTitle}>Sharing and Security</h2>
                </div>
                <p className={styles.sectionText}>
                  We do not sell your personal information. Information may be shared with authorized service providers when necessary to respond to your enquiry or operate our website. We take reasonable measures to protect the information we handle.
                </p>
              </section>

              {/* 4. Cookies and Website Data */}
              <section id="cookies-data" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>04</span>
                  <h2 className={styles.sectionTitle}>Cookies and Website Data</h2>
                </div>
                <p className={styles.sectionText}>
                  Our website may use cookies or similar technologies to support functionality and understand website usage. Where required, we will provide appropriate information and choices.
                </p>
              </section>

              {/* 5. Your Privacy Rights */}
              <section id="privacy-rights" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>05</span>
                  <h2 className={styles.sectionTitle}>Your Privacy Rights</h2>
                </div>
                <p className={styles.sectionText}>
                  Subject to applicable law, you may request access to, correction or deletion of your personal information, withdraw consent where processing relies on consent, or raise a privacy concern.
                </p>
              </section>

              {/* 6. Data Retention */}
              <section id="data-retention" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>06</span>
                  <h2 className={styles.sectionTitle}>Data Retention</h2>
                </div>
                <p className={styles.sectionText}>
                  We retain personal information only for as long as reasonably necessary for the purposes described above, or as required by law.
                </p>
              </section>

              {/* 7. Contact Us */}
              <section id="contact-us" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>07</span>
                  <h2 className={styles.sectionTitle}>Contact Us</h2>
                </div>
                <p className={styles.sectionText}>
                  For privacy-related questions or requests, email{" "}
                  <a href="mailto:sales@fortunehavens.com" className={styles.tocLink} style={{ color: "var(--color-gold)", textDecoration: "underline" }}>
                    sales@fortunehavens.com
                  </a>
                  .
                </p>
                <p className={styles.sectionText}>
                  We may update this policy when our practices or applicable legal requirements change.
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
