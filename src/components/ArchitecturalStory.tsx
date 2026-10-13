"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ArchitecturalStory.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExperiencePillar {
  number: string;
  title: string;
  description: string;
}

const PILLARS: ExperiencePillar[] = [
  {
    number: "01",
    title: "PRIVATE LIVING",
    description:
      "Spacious bedrooms and personal spaces designed for quiet comfort away from everyday movement.",
  },
  {
    number: "02",
    title: "FAMILY LIVING",
    description:
      "Generous double-height living and dining spaces created for everyday shared moments and gathering.",
  },
  {
    number: "03",
    title: "PERSONAL SPACE",
    description:
      "Private study and flexible corners tailored for work, reading, learning and individual pursuits.",
  },
  {
    number: "04",
    title: "PRIVATE LEISURE",
    description:
      "A dedicated Second floor retreat featuring a standard or an optional bar counter, home theatre and view-framing terrace.",
  },
];

const SIGNATURE_BADGES = [
  "4-Storey Private Living",
  "Nandi Hills Vistas",
  "24 Gated Boutique Residences",
  "4,281 Sq Ft Built-up Area",
  "2,800 Sq Ft Undivided Land Share",
  "Individual Lift for Each Villa",
  "3-Car Parking & EV Provision",
  "OC Received • BIAAPA & RERA Approved",
];

export const ArchitecturalStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImageContainerRef = useRef<HTMLDivElement>(null);
  const mainImageInnerRef = useRef<HTMLDivElement>(null);
  const secondaryImageContainerRef = useRef<HTMLDivElement>(null);
  const secondaryImageInnerRef = useRef<HTMLDivElement>(null);
  const pillarsListRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Text reveals
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      textTl
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
        )
        .from(
          `.${styles.factsLine}`,
          {
            y: 12,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Primary Image reveal & gentle drift
      if (mainImageContainerRef.current && mainImageInnerRef.current) {
        gsap.fromTo(
          mainImageContainerRef.current,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: mainImageContainerRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          mainImageInnerRef.current,
          { scale: 1.05, yPercent: -3 },
          {
            scale: 1.0,
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: mainImageContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // Secondary Image entrance
      if (secondaryImageContainerRef.current) {
        gsap.fromTo(
          secondaryImageContainerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: secondaryImageContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Pillars staggered entrance
      if (pillarsListRef.current) {
        gsap.from(`.${styles.factCard}`, {
          y: 20,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pillarsListRef.current,
            start: "top 85%",
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
      id="experience"
      className={styles.architecturalStorySection}
      aria-label="The Fortune Haven Experience"
    >
      <div className="editorial-container">
        {/* 1 & 2. Balanced Two-Column Introduction: Eyebrow + Headline on left, Description + Facts line on right */}
        <div className={styles.introBlock}>
          <div className={styles.introGrid}>
            {/* Left Column: Eyebrow and Headline */}
            <div className={styles.introColLeft}>
              <span className={styles.eyebrow}>THE FORTUNE HAVEN EXPERIENCE</span>
              <h2 className={styles.headline}>A World of Your Own.</h2>
            </div>

            {/* Right Column: Approved Brochure Description and Clean Typographic Facts Line */}
            <div className={styles.introColRight}>
              <p className={styles.description}>
                A gated enclave of 24 four-BHK Boutique Villas in Devanahalli, with a built-up area of
                4,281 sq ft each. At Fortune Haven, the four-storey format creates a natural
                separation between everyday living, private spaces, personal pursuits and leisure.
                Gather together when you want to. Retreat when you need to.
              </p>

              {/* Simple typographic facts line — not inside a box */}
              <div className={styles.factsLine}>
                <span className={styles.factPart}>24 Boutique Villas</span>
                <span className={styles.factDot}>•</span>
                <span className={styles.factPart}>4 Storeys</span>
                <span className={styles.factDot}>•</span>
                <span className={styles.factPart}>4,281 Sq Ft Built-up</span>
                <span className={styles.factDot}>•</span>
                <span className={styles.factPart}>2,800 Sq Ft UDS</span>
                <span className={styles.factDot}>•</span>
                <span className={styles.factPart}>Individual Lift</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Architectural Imagery: Wide dominant on left, portrait on right with balanced gap and no bordered frames */}
        <div className={styles.imageryComposition}>
          <div className={styles.imageryGrid}>
            {/* Left: Wide dominant architectural photograph */}
            <div
              ref={mainImageContainerRef}
              className={styles.dominantImageContainer}
            >
              <div ref={mainImageInnerRef} className={styles.dominantImageInner}>
                <Image
                  src="/digital-assets/Villa Images/Straight view.png"
                  alt="Fortune Haven Boutique Villa Elevation and Forecourt"
                  fill
                  sizes="(max-width: 900px) 100vw, 68vw"
                  className={styles.architecturalImg}
                  priority={false}
                  quality={92}
                />
              </div>
            </div>

            {/* Right: Portrait-oriented architectural photograph without bordered white frame */}
            <div
              ref={secondaryImageContainerRef}
              className={styles.portraitImageContainer}
            >
              <div ref={secondaryImageInnerRef} className={styles.portraitImageInner}>
                <Image
                  src="/digital-assets/Villa Images/Brochure opening.png"
                  alt="Fortune Haven Contemporary Villa Architecture Framed by Nature"
                  fill
                  sizes="(max-width: 900px) 100vw, 32vw"
                  className={styles.architecturalImg}
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Living: Brochure Page 02 */}
        <div ref={pillarsListRef} className={styles.factsSection}>
          <div className={styles.pillarsGrid}>
            {PILLARS.map((pillar) => (
              <div key={pillar.number} className={styles.factCard}>
                <div className={styles.pillarHeader}>
                  <span className={styles.pillarNumber}>{pillar.number}</span>
                  <span className={styles.pillarDash}>—</span>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                </div>
                <p className={styles.pillarDescription}>{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* Quiet Status Row */}
          <div className={styles.verifiedStatusLine}>
            <span className={styles.statusLabel}>VERIFIED STATUS:</span>
            <span className={styles.statusDetails}>
              Occupancy Certificate (OC) Received • BIAAPA Approved • RERA Approved • Model Villa Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
