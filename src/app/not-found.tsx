import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "A Different Path | Fortune Haven",
  description:
    "The page you're looking for may have moved or may no longer be available. Return home to discover Fortune Haven's ultra-luxury four-storey villas.",
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
              <span>FORTUNE HAVEN</span>
            </div>

            <div className={styles.numericCode}>404</div>

            <h1 className={styles.mainHeading}>A Different Path.</h1>

            <p className={styles.supportingText}>
              The page you&apos;re looking for may have moved or may no longer be available.
              Let&apos;s help you find your way back.
            </p>

            <div className={styles.actionsGroup}>
              <Link href="/" className={styles.primaryCta}>
                <span>Return Home</span>
                <span>→</span>
              </Link>
              <Link href="/#architecture" className={styles.secondaryCta}>
                <span>Explore the Property</span>
              </Link>
            </div>
          </div>

          <div className={styles.imageFrame}>
            <Image
              src="/digital-assets/Villa Images/Straight view.png"
              alt="Fortune Haven Villa Architectural Perspective"
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
