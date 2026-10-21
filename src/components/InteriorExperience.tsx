"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./InteriorExperience.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const InteriorExperience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);

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

      // Scene rows gentle reveal
      gsap.utils.toArray<HTMLElement>(`.${styles.sceneRow}`).forEach((row) => {
        gsap.from(row, {
          y: 28,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Retreat cards reveal
      gsap.from(`.${styles.retreatCard}`, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.retreatSection}`,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="interiors"
      className={styles.interiorSection}
      aria-label="Fortune Haven Villa Interior Spaces"
    >
      <div className="editorial-container">
        {/* Section Heading & Intro */}
        <div className={styles.introBlock}>
          <div className={styles.introGrid}>
            <div className={styles.introColLeft}>
              <span className={styles.eyebrow}>INTERIORS & LIVING SPACES</span>
              <h2 className={styles.headline}>Spaces That Feel Like Home.</h2>
            </div>

            <div className={styles.introColRight}>
              <p className={styles.description}>
                Thoughtfully planned around how families gather and unwind, each room balances generous proportions,
                warm tactile materials and abundant natural light to create an inviting interior environment from morning to evening.
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================================
            MOMENT 1: DOUBLE-HEIGHT LIVING (Brochure Page 07)
            Image Left / Text Right
            =================================================================== */}
        <div className={styles.sceneRow}>
          <div className={styles.sceneMedia}>
            <div ref={heroImageRef} className={styles.sceneFrameLandscape}>
              <div ref={heroInnerRef} className={styles.imageInner}>
                <Image
                  src="/digital-assets/Villa Images/Livning Room 2.png"
                  alt="Fortune Haven Double-Height Living Space with soaring ceiling clearances"
                  fill
                  sizes="(max-width: 900px) 100vw, 55vw"
                  className={styles.sceneImg}
                  quality={92}
                  priority={false}
                />
              </div>
            </div>
            <p className={styles.imageCaption}>Model villa showing in optional furnishing</p>
          </div>

          <div className={styles.sceneContent}>
            <span className={styles.sceneCategory}>LIVING SPACES // GROUND LEVEL</span>
            <h3 className={styles.sceneTitle}>Warm, Welcoming and Perfectly Proportioned.</h3>
            <p className={styles.sceneText}>
              Designed to accommodate everyday family life as well as larger gatherings. Layered
              lighting, selected wall panel surfaces, and honed flooring combine to establish an
              inviting environment filled with natural illumination from morning to evening.
            </p>
            <div className={styles.sceneSpecs}>
              <span className={styles.specLabel}>KEY HIGHLIGHTS:</span>
              <span className={styles.specVal}>Double-Height Ceiling • Full-Height Glazing • Garden Vista</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            MOMENT 2: CULINARY SUITE (Brochure Page 08)
            Text Left / Image Right
            =================================================================== */}
        <div className={`${styles.sceneRow} ${styles.sceneReverse}`}>
          <div className={styles.sceneMedia}>
            <div className={styles.sceneFrameStandard}>
              <Image
                src="/digital-assets/Villa Images/Kitchen.png"
                alt="Fortune Haven Kitchen designed for cooking and made for gathering"
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                className={styles.sceneImg}
                quality={90}
              />
            </div>
          </div>

          <div className={styles.sceneContent}>
            <span className={styles.sceneCategory}>CULINARY SUITE // HEART OF THE HOME</span>
            <h3 className={styles.sceneTitle}>Designed for Cooking. Made for Gathering.</h3>
            <p className={styles.sceneText}>
              A kitchen should work effortlessly every day — while remaining inviting enough to
              become a place where people naturally gather. Combining durable refined surfaces,
              functional movement planning, integrated storage, and a warm material palette.
            </p>
            <div className={styles.sceneSpecs}>
              <span className={styles.specLabel}>KEY HIGHLIGHTS:</span>
              <span className={styles.specVal}>Durable Countertops • Modular Storage • Breakfast Island</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            MOMENT 3: BEDROOM RETREAT (Brochure Page 09)
            Image Left / Text Right
            =================================================================== */}
        <div className={styles.sceneRow}>
          <div className={styles.sceneMedia}>
            <div className={styles.sceneFrameStandard}>
              <Image
                src="/digital-assets/Villa Images/Room with wooden floor.png"
                alt="Fortune Haven Bedroom Suite with warm wooden flooring and private balcony"
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                className={styles.sceneImg}
                quality={90}
              />
            </div>
          </div>

          <div className={styles.sceneContent}>
            <span className={styles.sceneCategory}>BEDROOMS // PRIVATE RETREATS</span>
            <h3 className={styles.sceneTitle}>Quiet Sanctuary and Personal Space.</h3>
            <p className={styles.sceneText}>
              Each bedroom suite is planned for individual comfort, featuring generous proportions,
              warm wooden flooring, dedicated wardrobe niches, study areas and direct access to private balconies.
            </p>
            <div className={styles.sceneSpecs}>
              <span className={styles.specLabel}>KEY HIGHLIGHTS:</span>
              <span className={styles.specVal}>Plush Wooden Flooring • Walk-In Dressing • Private Balcony</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            MOMENT 4: SECOND-FLOOR RETREAT & HOME THEATRE (Brochure Page 10)
            Duo composition of Living Room 4 and Home Theatre
            =================================================================== */}
        <div className={styles.retreatSection}>
          <div className={styles.retreatHeader}>
            <span className={styles.sceneCategory}>SECOND-FLOOR RETREAT // LEISURE & ENTERTAINMENT</span>
            <h3 className={styles.retreatTitle}>Above the Everyday.</h3>
            <p className={styles.retreatDesc}>
              The second floor brings a different rhythm to the home. An informal family lounge opening out
              onto an open-sky terrace, complemented by an optional private bar counter or home theatre setup.
            </p>
          </div>

          <div className={styles.retreatGrid}>
            <div className={styles.retreatCard}>
              <div className={styles.retreatFrame}>
                <Image
                  src="/digital-assets/Villa Images/Livning Room 4.png"
                  alt="Fortune Haven Second Floor Informal Family Lounge"
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className={styles.sceneImg}
                  quality={90}
                />
              </div>
              <div className={styles.retreatCardBody}>
                <h4 className={styles.retreatCardTitle}>Informal Family Lounge</h4>
                <p className={styles.retreatCardText}>
                  A relaxed setting for unhurried weekends and conversations with friends, extending
                  directly onto the elevated terrace overlooking open greenery.
                </p>
              </div>
            </div>

            <div className={styles.retreatCard}>
              <div className={styles.retreatFrame}>
                <Image
                  src="/digital-assets/Villa Images/Home theatre.png"
                  alt="Fortune Haven Private Bar Counter or Home Theatre Setup"
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className={styles.sceneImg}
                  quality={90}
                />
              </div>
              <div className={styles.retreatCardBody}>
                <h4 className={styles.retreatCardTitle}>Home Theatre & Bar Option</h4>
                <p className={styles.retreatCardText}>
                  A dedicated venue for intimate gatherings, immersive movie nights, and private
                  entertaining away from the ground-floor living quarters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
