import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for may have moved or is no longer available. Return to the homepage to discover Fortune Haven's ultra luxury villas in Devanahalli, Bengaluru North.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className={styles.notFoundWrapper}>
      <Header />

      <main className={styles.notFoundMain} id="main-content">
        <div className={styles.ambientGlow} />

        <div className={styles.notFoundContent}>
          <div>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              <span>FORTUNE HAVEN • 404 ERROR</span>
            </div>

            <div className={styles.numericCode}>404</div>

            <h1 className={styles.mainHeading}>Page Not Found</h1>

            <p className={styles.supportingText}>
              The page you are looking for may have moved, been renamed, or is no longer available.
              Let us help you return to our ultra luxury villa enclave.
            </p>

            <div className={styles.actionsGroup}>
              <Link href="/" className={styles.primaryCta}>
                <span>Return to Homepage</span>
                <span>→</span>
              </Link>
              <Link href="/#experience" className={styles.secondaryCta}>
                <span>Explore The Villas</span>
              </Link>
              <Link href="/faq" className={styles.secondaryCta}>
                <span>Property FAQ</span>
              </Link>
            </div>
          </div>

          <div className={styles.imageFrame}>
            <Image
              src="/digital-assets/Villa Images/Straight view.webp"
              alt="Fortune Haven Villa Architectural Perspective in Devanahalli"
              width={1536}
              height={1024}
              priority
              className={styles.architecturalImage}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
