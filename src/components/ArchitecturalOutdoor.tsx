"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ArchitecturalOutdoor.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface OutdoorFeature {
  number: string;
  title: string;
  description: string;
}

const OUTDOOR_FEATURES: OutdoorFeature[] = [
  {
    number: "01",
    title: "PRIVATE GARDEN",
    description:
      "A personal green space for quiet mornings, family time and relaxed evenings.",
  },
  {
    number: "02",
    title: "FRONT & BACKYARD LANDSCAPE",
    description:
      "Landscaped outdoor areas that give the villa a sense of openness and privacy.",
  },
  {
    number: "03",
    title: "4 PRIVATE BALCONIES",
    description:
      "Featuring three bedrooms with their own private balconies, plus an expansive 500 sq. ft. balcony on the second floor.",
  },
  {
    number: "04",
    title: "SPACIOUS TERRACE",
    description:
      "An elevated outdoor retreat for entertaining, relaxing and enjoying the views.",
  },
];

export const ArchitecturalOutdoor: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header entrance
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

      // Hero Landscape image reveal
      if (heroImageRef.current && heroInnerRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: heroImageRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Feature items entrance
      if (featuresRef.current) {
        gsap.from(`.${styles.featureItem}`, {
          y: 22,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 84%",
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
      id="architecture"
      className={styles.outdoorSection}
      aria-label="Architecture and Outdoor Living"
    >
      <div className="editorial-container">
        {/* Section Heading & Intro */}
        <div className={styles.introBlock}>
          <div className={styles.introGrid}>
            <div className={styles.introColLeft}>
              <span className={styles.eyebrow}>ARCHITECTURE & OUTDOOR LIVING</span>
              <h2 className={styles.headline}>Where the Home Meets the Outdoors.</h2>
            </div>

            <div className={styles.introColRight}>
              <p className={styles.description}>
                At Fortune Haven, outdoor space becomes an extension of your home. Private indoor
                and outdoor gardens, balconies and a spacious terrace create places to unwind,
                entertain and enjoy the changing surroundings. With views towards Nandi Hills,
                the outdoors brings a greater sense of openness to everyday living.
              </p>
            </div>
          </div>
        </div>

        {/* Panoramic Anchor: Villa Stature & Landscape Integration */}
        <div className={styles.heroMediaWrapper}>
          <div ref={heroImageRef} className={styles.heroFrame}>
            <div ref={heroInnerRef} className={styles.imageInner}>
              <Image
                src="/digital-assets/Villa Images/Villa.webp"
                alt="Fortune Haven Contemporary Villa Architecture Harmonized with Private Gardens"
                fill
                sizes="(max-width: 768px) 100vw, 1440px"
                className={styles.heroImg}
                quality={92}
                priority={false}
              />
            </div>
          </div>
        </div>

        {/* 4 Outdoor Living Features from Brochure Page 04 as Clean Typographic Architecture Grid */}
        <div ref={featuresRef} className={styles.featuresSection}>
          <div className={styles.featuresGrid}>
            {OUTDOOR_FEATURES.map((item) => (
              <div key={item.number} className={styles.featureItem}>
                <div className={styles.featureHeader}>
                  <span className={styles.featureNumber}>{item.number}</span>
                  <span className={styles.featureSep}>—</span>
                  <h3 className={styles.featureTitle}>{item.title}</h3>
                </div>
                <p className={styles.featureDesc}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
