import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "@/components/LegalPage.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions | Fortune Haven",
  description:
    "Website terms and conditions for Fortune Haven, outlining permitted use, status of architectural visuals, non-binding inquiry nature, and intellectual property.",
};

const TOC_TERMS = [
  { id: "purpose", title: "1. Website Purpose & Scope" },
  { id: "visuals", title: "2. Architectural Renderings & Imagery" },
  { id: "plans", title: "3. Plans, Specifications & Dimensions" },
  { id: "inquiries", title: "4. Inquiry Submissions & Consultations" },
  { id: "ip", title: "5. Intellectual Property & Copyright" },
  { id: "liability", title: "6. Limitation of Liability" },
  { id: "governing-law", title: "7. Governing Law & Jurisdiction" },
  { id: "entity", title: "8. Operator Contact & Clarifications" },
];

export default function TermsAndConditionsPage() {
  return (
    <div className={styles.legalPageWrapper}>
      <Header />

      <main className={styles.legalMain}>
        <div className={styles.ambientGlow} />

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
              <span>Status: <strong className={styles.metaHighlight}>Pre-Production Draft for Legal Review</strong></span>
              <span className={styles.metaSep}>|</span>
              <span>Jurisdiction: <strong className={styles.metaHighlight}>Karnataka, India</strong></span>
              <span className={styles.metaSep}>|</span>
              <span>Subject to: <strong className={styles.metaHighlight}>Applicable Indian Consumer & Real Estate Law</strong></span>
            </div>
          </div>

          {/* Content Layout */}
          <div className={styles.legalContentLayout}>
            {/* Table of Contents Column */}
            <aside className={styles.tocCol} aria-label="Table of Contents">
              <span className={styles.tocTitle}>Index</span>
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
              <div className={styles.alertNotice}>
                <span className={styles.alertTitle}>IMPORTANT STATUTORY & LEGAL DISCLAIMER</span>
                <p className={styles.alertBody}>
                  The content, renderings, floor distributions, and descriptions presented on this website are published solely for general informational and conceptual appreciation. Nothing contained herein constitutes an offer of sale, advertisement, prospectus, warranty, or legally binding transaction commitment. Any formal residential acquisition is governed exclusively by bilateral registered agreements.
                </p>
              </div>

              {/* 1. Purpose */}
              <section id="purpose" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>01</span>
                  <h2 className={styles.sectionTitle}>Website Purpose & Scope</h2>
                </div>
                <p className={styles.sectionText}>
                  This website is operated to provide an editorial introduction to Fortune Haven, an enclave of 24 Ultra Luxury residences located along the NH-207 corridor in the foothills of Nandi Hills. By browsing or submitting an inquiry through this site, you agree to comply with these terms.
                </p>
              </section>

              {/* 2. Visuals */}
              <section id="visuals" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>02</span>
                  <h2 className={styles.sectionTitle}>Architectural Renderings, Photography & Visuals</h2>
                </div>
                <p className={styles.sectionText}>
                  All visual representations—including architectural renderings, computer-generated perspectives, interior furnishings, lighting schemes, and landscaping previews—are artistic impressions created to illustrate the design intent. Actual completed finishes, landscaping contours, materials, and elevations may vary in accordance with approvals and architectural execution.
                </p>
              </section>

              {/* 3. Plans */}
              <section id="plans" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>03</span>
                  <h2 className={styles.sectionTitle}>Plans, Specifications & Dimensions</h2>
                </div>
                <p className={styles.sectionText}>
                  Floor plans and spatial layouts displayed on this website represent verified project architectural schematics. However, furniture placements, electrical layouts, and decorative elements shown in plans are indicative. Final dimensions and sanctioned build specifications are defined exclusively in official sanctioned sanction drawings and formal customer agreements.
                </p>
              </section>

              {/* 4. Inquiries */}
              <section id="inquiries" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>04</span>
                  <h2 className={styles.sectionTitle}>Inquiry Submissions & Consultations</h2>
                </div>
                <p className={styles.sectionText}>
                  Submitting a contact form, requesting a site tour, or applying for the architectural brochure initiates a private informational dialogue. It does not:
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>Create a reservation, priority booking, or allotment rights over any villa.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>Guarantee pricing, payment milestones, or delivery schedules.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>Constitute a binding contract between the visitor and the developer entity.</span>
                  </li>
                </ul>
              </section>

              {/* 5. IP */}
              <section id="ip" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>05</span>
                  <h2 className={styles.sectionTitle}>Intellectual Property & Copyright</h2>
                </div>
                <p className={styles.sectionText}>
                  All architectural drawings, branding assets, photographic compositions, typography arrangements, and copy displayed on this website are protected under copyright, trademark, and intellectual property laws of India. Reproduction, commercial reuse, or syndication without prior written permission is strictly prohibited.
                </p>
              </section>

              {/* 6. Liability */}
              <section id="liability" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>06</span>
                  <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
                </div>
                <p className={styles.sectionText}>
                  To the extent permitted by applicable Indian law, the website operator and project promoter shall not be liable for any direct, indirect, incidental, or consequential damages resulting from reliance on website information or temporary platform unavailability. Visitors are encouraged to verify project documentation independently prior to making commercial decisions.
                </p>
              </section>

              {/* 7. Governing Law */}
              <section id="governing-law" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>07</span>
                  <h2 className={styles.sectionTitle}>Governing Law & Legal Review</h2>
                </div>
                <p className={styles.sectionText}>
                  These terms are governed by the laws of India. Any disputes arising in connection with the use of this website shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka.
                </p>
                <p className={styles.sectionText}>
                  <em>Note for Legal Counsel:</em> These draft provisions must be formally reviewed by an Indian legal practitioner familiar with the Real Estate (Regulation and Development) Act, 2016 (RERA), the Consumer Protection Act, 2019, and the DPDP Act, 2023 prior to commercial publication.
                </p>
              </section>

              {/* 8. Entity */}
              <section id="entity" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>08</span>
                  <h2 className={styles.sectionTitle}>Operator Contact & Clarifications</h2>
                </div>
                <p className={styles.sectionText}>
                  For queries regarding these terms or the Fortune Haven website, please direct communications to:
                </p>
                <div className={styles.entityInfoBox}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>PROJECT:</span>
                    <span className={styles.infoVal}>Fortune Haven Luxury Villas</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>DEVELOPER ASSET MENTION:</span>
                    <span className={styles.infoVal}>Cannas Lily Infrastructure Pvt. Ltd.</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>REGISTERED ENTITY:</span>
                    <span className={styles.infoVal}>
                      <span className={styles.placeholderTag}>[Pending Legal Confirmation]</span>
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>LEGAL ENQUIRIES:</span>
                    <span className={styles.infoVal}>
                      <span className={styles.placeholderTag}>[legal@fortunehaven.com — Pending Setup]</span>
                    </span>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
