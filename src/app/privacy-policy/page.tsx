import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "@/components/LegalPage.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Fortune Haven",
  description:
    "Privacy Policy and Data Protection Notice for Fortune Haven, detailing data collection practices, purpose limitations, and individual rights under applicable Indian laws including the DPDP framework.",
};

const TOC_SECTIONS = [
  { id: "operator", title: "1. Data Fiduciary & Operator" },
  { id: "collection", title: "2. Personal Data Collected" },
  { id: "purpose", title: "3. Purposes of Processing" },
  { id: "consent", title: "4. Notice & Consent Architecture" },
  { id: "sharing", title: "5. Data Sharing & Service Providers" },
  { id: "retention", title: "6. Retention & Disposal Schedule" },
  { id: "security", title: "7. Technical Safeguards & Breaches" },
  { id: "rights", title: "8. Individual Rights & Grievance Redressal" },
  { id: "children", title: "9. Protection of Children's Personal Data" },
  { id: "updates", title: "10. Updates & Policy Versions" },
];

export default function PrivacyPolicyPage() {
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
              <span>LEGAL READINESS & PRIVACY BY DESIGN</span>
            </div>

            <h1 className={styles.pageTitle}>Privacy Policy & Data Notice</h1>

            <div className={styles.headerMetaRow}>
              <span>Effective Date: <strong className={styles.metaHighlight}>Subject to Launch Confirmation</strong></span>
              <span className={styles.metaSep}>|</span>
              <span>Regulatory Basis: <strong className={styles.metaHighlight}>Digital Personal Data Protection Act, 2023 (India)</strong></span>
              <span className={styles.metaSep}>|</span>
              <span>Version: <strong className={styles.metaHighlight}>Draft 1.0 (Pre-Production)</strong></span>
            </div>
          </div>

          {/* Content Layout */}
          <div className={styles.legalContentLayout}>
            {/* Table of Contents Column */}
            <aside className={styles.tocCol} aria-label="Table of Contents">
              <span className={styles.tocTitle}>Index</span>
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
              <div className={styles.alertNotice}>
                <span className={styles.alertTitle}>LEGAL NOTICE & COMMENCEMENT CONTEXT</span>
                <p className={styles.alertBody}>
                  This Privacy Notice is structured in alignment with the Digital Personal Data Protection Act, 2023 (DPDP Act) and the DPDP Rules, 2025 as officially notified by the Ministry of Electronics and Information Technology (MeitY), Government of India. As statutory provisions follow staggered commencement schedules, this document establishes privacy-by-design standards ahead of public commercial launch.
                </p>
              </div>

              {/* 1. Operator */}
              <section id="operator" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>01</span>
                  <h2 className={styles.sectionTitle}>Data Fiduciary & Website Operator</h2>
                </div>
                <p className={styles.sectionText}>
                  This website provides information regarding Fortune Haven, a private collection of 24 ultra luxury villas situated along the NH-207 corridor in the foothills of Nandi Hills. The entity operating this platform and acting as the prospective Data Fiduciary is identified below:
                </p>
                <div className={styles.entityInfoBox}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>DEVELOPER / PROMOTER BRAND:</span>
                    <span className={styles.infoVal}>Cannas Lily Infrastructure Pvt. Ltd.</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>REGISTERED OPERATOR ENTITY:</span>
                    <span className={styles.infoVal}>
                      <span className={styles.placeholderTag}>[Pending Final Corporate Confirmation]</span>
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>REGISTERED OFFICE ADDRESS:</span>
                    <span className={styles.infoVal}>
                      <span className={styles.placeholderTag}>[Pending Legal Entity Address Confirmation]</span>
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>DEDICATED PRIVACY CONTACT:</span>
                    <span className={styles.infoVal}>
                      <span className={styles.placeholderTag}>[privacy@fortunehaven.com — Pending Setup]</span>
                    </span>
                  </div>
                </div>
              </section>

              {/* 2. Personal Data Collected */}
              <section id="collection" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>02</span>
                  <h2 className={styles.sectionTitle}>Personal Data Collected</h2>
                </div>
                <p className={styles.sectionText}>
                  Fortune Haven operates on a strict principle of data minimization. We collect only personal data that visitors voluntarily provide through implemented interaction points:
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span><strong>Private Consultation & Tour Form:</strong> Full name, phone number, email address, preferred contact method (Phone Call or WhatsApp), enquiry category (Property Details, Floor Plans, Site Visit, or General Enquiry), and optional message content.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span><strong>Brochure Request Interface:</strong> Full name, telephone number, and email address required to verify access to the architectural monograph.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span><strong>Technical Metadata:</strong> Standard HTTP server transmission headers (IP address, user agent) essential for network routing and security firewalls. No tracking cookies or behavioral advertising pixels are currently deployed on this platform.</span>
                  </li>
                </ul>
              </section>

              {/* 3. Purposes of Processing */}
              <section id="purpose" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>03</span>
                  <h2 className={styles.sectionTitle}>Purposes of Processing</h2>
                </div>
                <p className={styles.sectionText}>
                  Personal data collected through this website is processed strictly for specified, lawful, and reasonable purposes directly tied to the visitor’s explicit request:
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>Responding directly to property inquiries and scheduling requested private appointments.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>Transmitting the official Fortune Haven architectural brochure once compiled.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>Preventing denial-of-service abuse, rate-limit violations, and automated spam submissions.</span>
                  </li>
                </ul>
                <p className={styles.sectionText}>
                  <em>Important Notice:</em> Requesting a brochure or submitting a general inquiry is never treated as blanket consent to unrelated marketing broadcasts or third-party syndication.
                </p>
              </section>

              {/* 4. Notice & Consent */}
              <section id="consent" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>04</span>
                  <h2 className={styles.sectionTitle}>Notice & Consent Architecture</h2>
                </div>
                <p className={styles.sectionText}>
                  In accordance with the DPDP framework:
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span><strong>Unbundled Choice:</strong> Optional marketing communications are kept strictly separate from the core service of answering an inquiry. Declining marketing never prevents you from receiving property details.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span><strong>No Deceptive Patterns:</strong> We do not employ pre-ticked consent checkboxes or covert tracking mechanisms.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span><strong>Ease of Withdrawal:</strong> Where processing is anchored in consent, you retain the statutory right to withdraw consent as easily as it was granted by contacting the privacy desk.</span>
                  </li>
                </ul>
              </section>

              {/* 5. Sharing */}
              <section id="sharing" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>05</span>
                  <h2 className={styles.sectionTitle}>Data Sharing & Service Providers</h2>
                </div>
                <p className={styles.sectionText}>
                  We do not sell, license, or trade prospective buyer details. When production backend pipelines are activated, data will only be shared with verified data processors under strict contractual safeguards:
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span><strong>Infrastructure & Hosting Providers:</strong> Cloud servers ensuring high-availability web delivery.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span><strong>Communication Relays:</strong> Secure email and telephony dispatch services required to transmit requested information.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span><strong>Statutory & Regulatory Authorities:</strong> Only when strictly mandated under enforceable Indian judicial or legal orders.</span>
                  </li>
                </ul>
              </section>

              {/* 6. Retention */}
              <section id="retention" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>06</span>
                  <h2 className={styles.sectionTitle}>Retention & Disposal Schedule</h2>
                </div>
                <p className={styles.sectionText}>
                  Personal data will be retained only for as long as necessary to fulfill the inquiry purpose or comply with applicable legal recordkeeping requirements. Upon conclusion of an inquiry cycle—or upon a validated erasure request—records will be securely purged or anonymized, subject to developer legal confirmation.
                </p>
              </section>

              {/* 7. Security */}
              <section id="security" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>07</span>
                  <h2 className={styles.sectionTitle}>Technical Safeguards & Incident Escalation</h2>
                </div>
                <p className={styles.sectionText}>
                  We implement privacy-by-design engineering principles including strict TLS encryption in transit (HTTPS), server-side input validation, shielded environment variables, and absence of client-exposed secrets. A formal personal data breach response procedure will be activated prior to commercial launch in accordance with MeitY guidelines.
                </p>
              </section>

              {/* 8. Rights */}
              <section id="rights" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>08</span>
                  <h2 className={styles.sectionTitle}>Individual Rights & Grievance Redressal</h2>
                </div>
                <p className={styles.sectionText}>
                  Under the Indian DPDP regulatory framework, data principals are entitled to:
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>Right to access a summary of personal data processed and identities of data fiduciaries/processors.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>Right to correction of inaccurate or misleading records.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>Right to erasure of personal data that is no longer necessary for the specified purpose.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>Right to readily accessible grievance redressal.</span>
                  </li>
                </ul>
                <p className={styles.sectionText}>
                  To submit a rights request, contact: <span className={styles.placeholderTag}>[Grievance Officer Contact — Pending Operational Setup]</span>.
                </p>
              </section>

              {/* 9. Children */}
              <section id="children" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>09</span>
                  <h2 className={styles.sectionTitle}>Protection of Children&apos;s Personal Data</h2>
                </div>
                <p className={styles.sectionText}>
                  Fortune Haven is an ultra-luxury real estate development intended exclusively for prospective adult buyers and investors. We do not knowingly solicit, collect, or process personal data of children (individuals under eighteen years of age).
                </p>
              </section>

              {/* 10. Updates */}
              <section id="updates" className={styles.legalSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>10</span>
                  <h2 className={styles.sectionTitle}>Updates & Policy Versions</h2>
                </div>
                <p className={styles.sectionText}>
                  This policy will be updated as the substantive provisions of the DPDP Act and Rules come into full statutory force and upon confirmation of the developer entity&apos;s operational details.
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
