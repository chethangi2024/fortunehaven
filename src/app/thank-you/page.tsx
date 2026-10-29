import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "./thank-you.module.css";

export const metadata: Metadata = {
  title: "Thank You — Private Consultation",
  description:
    "Thank you for contacting the Fortune Haven advisory desk. Your private consultation request has been received.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className={styles.thankYouWrapper}>
      <Header />

      <main className={styles.thankYouMain}>
        <div className="editorial-container">
          <div className={styles.cardContainer}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span>ENQUIRY RECEIVED</span>
            </div>

            <h1 className={styles.title}>Thank You for Reaching Out.</h1>

            <p className={styles.message}>
              Your private consultation request has been successfully registered with the Fortune
              Haven development advisory team. A dedicated representative will reach out to you
              shortly using your preferred contact channel.
            </p>

            <div className={styles.detailsBox}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Development</span>
                <span className={styles.detailValue}>Fortune Haven Boutique Villas</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Direct Advisory Desk</span>
                <span className={styles.detailValue}>+91 91640 16999 / +91 91801 95940</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Official Correspondence</span>
                <span className={styles.detailValue}>sales@fortunehavens.com</span>
              </div>
            </div>

            <Link href="/" className={styles.backHomeBtn}>
              <span>Return to Homepage</span>
              <span className={styles.btnArrow}>→</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
