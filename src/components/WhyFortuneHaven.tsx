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
    title: "FOUR-STOREY VILLA",
    description: "More space for living, retreating and entertaining.",
  },
  {
    number: "02",
    title: "4 BHK",
    description: "A spacious configuration designed for contemporary family living.",
  },
  {
    number: "03",
    title: "FULLY FURNISHED MODEL VILLA",
    description: "A home prepared for you to inspect and make your own.",
  },
  {
    number: "04",
    title: "INDIVIDUAL LIFT",
    description: "Private lift access designed for everyday convenience.",
  },
  {
    number: "05",
    title: "3-CAR PARKING",
    description: "Dedicated parking for your family's vehicles.",
  },
  {
    number: "06",
    title: "INDOOR & OUTDOOR SPACES",
    description: "Front and backyard gardens, balconies and a spacious terrace.",
  },
  {
    number: "07",
    title: "NANDI HILLS VIEWS",
    description: "A distinctive natural backdrop from the villa.",
  },
  {
    number: "08",
    title: "EV CHARGING",
    description: "Charging provision for your electric vehicle.",
  },
  {
    number: "09",
    title: "MODERN INFRASTRUCTURE",
    description: "Power backup, water systems and rainwater harvesting.",
  },
  {
    number: "10",
    title: "READY TO MOVE IN",
    description: "Step into a completed home designed for immediate living.",
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
              premium living spaces that balance experience and aesthetics, with ultimate customer satisfaction
              as our focal point.
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
