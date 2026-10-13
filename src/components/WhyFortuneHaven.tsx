"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WhyFortuneHaven.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ReasonItem {
  number: string;
  title: string;
  description: string;
}

const REASONS: ReasonItem[] = [
  {
    number: "01",
    title: "FOUR-STOREY VILLA FORMAT",
    description: "More space for living, retreating and entertaining across dedicated vertical levels.",
  },
  {
    number: "02",
    title: "SPACIOUS 4 BHK CONFIGURATION",
    description: "4,281 sq ft built-up area and 2,800 sq ft undivided land share for contemporary living.",
  },
  {
    number: "03",
    title: "FULLY FURNISHED MODEL VILLA",
    description: "A completed model home on-site prepared for you to inspect and experience in person.",
  },
  {
    number: "04",
    title: "INDIVIDUAL PRIVATE LIFT",
    description: "Private elevator access connecting all villa levels from basement parking to rooftop.",
  },
  {
    number: "05",
    title: "SPACIOUS 3-CAR PARKING",
    description: "Dedicated basement parking bays for your family's vehicles with EV provision.",
  },
  {
    number: "06",
    title: "INDOOR & OUTDOOR SPACES",
    description: "Front and backyard gardens, four private balconies and a spacious view-framing terrace.",
  },
  {
    number: "07",
    title: "NANDI HILLS VIEWS",
    description: "A distinctive natural backdrop framing everyday life with fresh air and open skies.",
  },
  {
    number: "08",
    title: "EV CHARGING PROVISION",
    description: "Dedicated charging points installed at each villa for modern electric vehicle convenience.",
  },
  {
    number: "09",
    title: "MODERN INFRASTRUCTURE",
    description: "100% power backup, rainwater harvesting systems, and treated continuous water supply.",
  },
  {
    number: "10",
    title: "READY TO MOVE IN",
    description: "Completed boutique enclave with OC received, BIAAPA approval, and RERA Approved.",
  },
];

export const WhyFortuneHaven: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.introBlock}`,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      headerTl
        .from(`.${styles.eyebrow}`, {
          y: 14,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          `.${styles.headline}`,
          {
            y: 20,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          `.${styles.description}`,
          {
            y: 16,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );

      if (gridRef.current) {
        gsap.from(`.${styles.reasonItem}`, {
          y: 22,
          opacity: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className={styles.whySection}
      aria-label="Why Fortune Haven"
    >
      {/* Anchor alias to support legacy #why-fortune-haven references seamlessly */}
      <span id="why-fortune-haven" style={{ position: "absolute", top: 0, left: 0, visibility: "hidden" }} aria-hidden="true" />
      <div className="editorial-container">
        {/* Section Heading & Intro */}
        <div className={styles.introBlock}>
          <div className={styles.introGrid}>
            <div className={styles.introColLeft}>
              <span className={styles.eyebrow}>WHY FORTUNE HAVEN</span>
              <h2 className={styles.headline}>Why Fortune Haven?</h2>
            </div>

            <div className={styles.introColRight}>
              <p className={styles.description}>
                A private four-storey villa brings together space, independence and the freedom to shape
                every level around your lifestyle. Live at Fortune Haven, where success, privacy and
                elegance come together.
              </p>

              <div className={styles.reasonsSummary}>
                <span className={styles.sumItem}>24 Boutique Villas</span>
                <span className={styles.sumDot}>•</span>
                <span className={styles.sumItem}>4,281 Sq Ft Layout</span>
                <span className={styles.sumDot}>•</span>
                <span className={styles.sumItem}>2,800 Sq Ft UDS</span>
                <span className={styles.sumDot}>•</span>
                <span className={styles.sumItem}>OC Received</span>
              </div>
            </div>
          </div>
        </div>

        {/* 10 Reasons Clean Typographic Architectural Grid */}
        <div ref={gridRef} className={styles.reasonsList}>
          {REASONS.map((item) => (
            <div key={item.number} className={styles.reasonItem}>
              <div className={styles.reasonHeader}>
                <span className={styles.reasonNumber}>{item.number}</span>
                <span className={styles.reasonSep}>—</span>
                <h3 className={styles.reasonTitle}>{item.title}</h3>
              </div>
              <p className={styles.reasonDescription}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Developer Accreditation Banner */}
        <div className={styles.developerBanner}>
          <div className={styles.devColLeft}>
            <span className={styles.devTag}>ABOUT THE DEVELOPER</span>
            <h4 className={styles.devTitle}>Cannas Lily Infrastructure Pvt. Ltd. (JCN Group)</h4>
            <p className={styles.devDesc}>
              One of Bengaluru’s premium real-estate developers, JCN has been instrumental in developing
              quality residential projects in and around Bengaluru. Our objective has always been to create
              living spaces that balance experience and aesthetics, with ultimate customer satisfaction as our
              focal point.
            </p>
          </div>
          <div className={styles.devColRight}>
            <div className={styles.devStat}>
              <span className={styles.statVal}>24</span>
              <span className={styles.statLabel}>Boutique Residences Only</span>
            </div>
            <div className={styles.devStat}>
              <span className={styles.statVal}>4,281</span>
              <span className={styles.statLabel}>Sq Ft Built-Up Area Each</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
