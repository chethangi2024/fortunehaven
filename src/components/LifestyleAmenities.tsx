"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LifestyleAmenities.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AmenityCategory {
  title: string;
  items: { name: string; desc: string }[];
}

const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    title: "ACTIVE LIVING & RECREATION",
    items: [
      { name: "Swimming Pool", desc: "A refreshing space to unwind, stay active and enjoy leisurely moments." },
      { name: "Gymnasium", desc: "A dedicated fitness space for maintaining an active and healthy routine." },
      { name: "Walking & Jogging Track", desc: "A landscaped route for morning walks, evening jogs and movement." },
      { name: "Squash Court", desc: "High-paced active court for sports enthusiasts." },
    ],
  },
  {
    title: "WELLNESS & RELAXATION",
    items: [
      { name: "Jacuzzi", desc: "A private hydro-setting to relax, recharge and let the day slow down." },
      { name: "Sauna", desc: "A warm, calming chamber designed for detoxification and deep wellness." },
      { name: "Yoga & Meditation Setting", desc: "Mindful moments in the fresh foothill air and garden greenery." },
    ],
  },
  {
    title: "SOCIAL, COMMUNITY & GAMES",
    items: [
      { name: "Billiards & Table Tennis", desc: "Refined leisure and games for family and friends across generations." },
      { name: "Chess & Carrom Lounge", desc: "Quiet spaces for strategy, focus, and classic indoor fun." },
      { name: "Clubhouse Restaurant", desc: "A convenient setting for relaxed meals and neighborly camaraderie." },
      { name: "Spiritual Spaces", desc: "Thoughtfully designed spaces for prayer, gathering, and quiet reflection." },
    ],
  },
  {
    title: "EVERYDAY CONVENIENCE & SECURITY",
    items: [
      { name: "Dedicated Work Space", desc: "Focused productivity and study space outside the private villa." },
      { name: "EV Charging Infrastructure", desc: "Dedicated provisions for home charging your electric vehicles." },
      { name: "24/7 CCTV Surveillance", desc: "Comprehensive continuous perimeter monitoring for absolute peace of mind." },
    ],
  },
];

export const LifestyleAmenities: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const focalImgContainerRef = useRef<HTMLDivElement>(null);
  const focalImgInnerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Opening Statement entrance
      const openingTl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.introBlock}`,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      openingTl
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

      // Primary Focal Feature Reveal
      if (focalImgContainerRef.current && focalImgInnerRef.current) {
        gsap.fromTo(
          focalImgContainerRef.current,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: focalImgContainerRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Amenities categories reveal
      if (gridRef.current) {
        gsap.from(`.${styles.categoryBlock}`, {
          y: 28,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
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
      id="clubhouse"
      className={styles.lifestyleSection}
      aria-label="Lifestyle, Clubhouse & Community Amenities"
    >
      {/* Anchor alias to support legacy #amenities references seamlessly */}
      <span id="amenities" style={{ position: "absolute", top: 0, left: 0, visibility: "hidden" }} aria-hidden="true" />
      <div className="editorial-container">
        {/* Section Heading & Intro */}
        <div className={styles.introBlock}>
          <div className={styles.introGrid}>
            <div className={styles.introColLeft}>
              <span className={styles.eyebrow}>LIFESTYLE, CLUBHOUSE & COMMUNITY</span>
              <h2 className={styles.headline}>Beyond Your Villa, Life Opens Up.</h2>
            </div>

            <div className={styles.introColRight}>
              <p className={styles.description}>
                More than a shared space, the clubhouse is a central hub for the Fortune Haven
                community — bringing residents together for wellness, active recreation,
                indoor sports and shared celebrations.
              </p>

              <div className={styles.lifestyleHighlights}>
                <span className={styles.hlItem}>Clubhouse Pavilion</span>
                <span className={styles.hlDot}>•</span>
                <span className={styles.hlItem}>Swimming Pool & Jacuzzi</span>
                <span className={styles.hlDot}>•</span>
                <span className={styles.hlItem}>Squash & Gymnasium</span>
                <span className={styles.hlDot}>•</span>
                <span className={styles.hlItem}>Sauna & Steam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Anchor: The Enclave Clubhouse & Pool Spread */}
        <div className={styles.imagerySpread}>
          <div className={styles.imageryGrid}>
            <div ref={focalImgContainerRef} className={styles.clubhouseFrame}>
              <div ref={focalImgInnerRef} className={styles.imageInner}>
                <Image
                  src="/digital-assets/Villa Images/Clubhouse.png"
                  alt="Fortune Haven Community Clubhouse Pavilion"
                  fill
                  sizes="(max-width: 900px) 100vw, 62vw"
                  className={styles.featureImg}
                  priority={false}
                  quality={92}
                />
              </div>
            </div>

            <div className={styles.poolFrame}>
              <div className={styles.imageInner}>
                <Image
                  src="/digital-assets/Villa Images/Pool 2.png"
                  alt="Fortune Haven Swimming Pool and Sun Deck"
                  fill
                  sizes="(max-width: 900px) 100vw, 38vw"
                  className={styles.featureImg}
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Complete Approved Amenities Matrix (Brochure Pages 06 & 13) */}
        <div ref={gridRef} className={styles.amenitiesSection}>
          <div className={styles.categoriesGrid}>
            {AMENITY_CATEGORIES.map((cat, idx) => (
              <div key={idx} className={styles.categoryBlock}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryNumber}>0{idx + 1}</span>
                  <span className={styles.categorySep}>—</span>
                  <h3 className={styles.categoryTitle}>{cat.title}</h3>
                </div>
                <div className={styles.itemsList}>
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className={styles.amenityItem}>
                      <span className={styles.itemDot} />
                      <div className={styles.itemContent}>
                        <h4 className={styles.itemName}>{item.name}</h4>
                        <p className={styles.itemDesc}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
