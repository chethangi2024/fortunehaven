"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./InteractiveFloorPlans.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FloorLevel {
  id: string;
  number: string;
  tabLabel: string;
  levelTitle: string;
  area: string;
  subtitle: string;
  imageSrc: string;
  altText: string;
  highlights: string[];
}

const FLOOR_LEVELS: FloorLevel[] = [
  {
    id: "site-plan",
    number: "01",
    tabLabel: "SITE PLAN",
    levelTitle: "MASTER SITE PLAN",
    area: "24 VILLAS",
    subtitle: "Gated Enclave • Private Layout • Verdant Buffer",
    imageSrc: "/digital-assets/Floor Plane and Site Plan/Master Plan.png",
    altText: "Fortune Haven Master Site Plan Layout showing 24 gated boutique villas and internal avenue",
    highlights: [
      "Master layout encompassing 24 boutique four-storey villas.",
      "Dedicated internal circulation avenues and wide tree-lined access.",
      "Strategic orientation framing open views toward Nandi Hills.",
      "Lush perimeter landscaping and gated security perimeter.",
      "Generous private garden buffers between each residence.",
    ],
  },
  {
    id: "basement",
    number: "02",
    tabLabel: "BASEMENT",
    levelTitle: "BASEMENT & PARKING",
    area: "1,086 SQ FT",
    subtitle: "Park • Work • Charge • Connect • Breathe",
    imageSrc: "/digital-assets/Floor Plane and Site Plan/Basement Plan.png",
    altText: "Fortune Haven Basement Floor Architectural Plan showing 3-car parking, EV charging, and home office",
    highlights: [
      "Spacious parking for three cars.",
      "Dedicated EV charging point provision.",
      "Flexible home office / utility space.",
      "Individual private lift access connecting all villa levels.",
      "Dedicated staircase connecting every level.",
      "Dedicated tree provision bringing greenery and fresh air closer.",
    ],
  },
  {
    id: "ground",
    number: "03",
    tabLabel: "GROUND FLOOR",
    levelTitle: "GROUND FLOOR LIVING",
    area: "1,226 SQ FT",
    subtitle: "Welcome • Live • Gather",
    imageSrc: "/digital-assets/Floor Plane and Site Plan/Ground Floor Plan.png",
    altText: "Fortune Haven Ground Floor Architectural Plan showing living, dining, kitchen, and lawn",
    highlights: [
      "Spacious living area for family time and entertaining.",
      "Dining area designed for shared meals and memorable moments.",
      "Thoughtful kitchen for everyday cooking and convenience.",
      "Comfortable ground-floor bedroom with easy accessibility.",
      "Private lawn extending the home outdoors.",
      "Private yard and quiet sit-out to enjoy fresh air with the garden.",
    ],
  },
  {
    id: "first",
    number: "04",
    tabLabel: "FIRST FLOOR",
    levelTitle: "FIRST FLOOR SUITES",
    area: "1,226 SQ FT",
    subtitle: "Rest • Relax • Connect",
    imageSrc: "/digital-assets/Floor Plane and Site Plan/First Floor Plan.png",
    altText: "Fortune Haven First Floor Architectural Plan showing two bedrooms with attached dressing and TV lounge",
    highlights: [
      "Two spacious bedrooms for restful living.",
      "Dedicated attached dressing space for added convenience.",
      "Private attached bathrooms connected to each bedroom.",
      "Central bedroom TV lounge with wall-mounted cabinet setup.",
      "Private balconies connecting directly with open views.",
      "Open dining void adding dramatic visual spaciousness.",
    ],
  },
  {
    id: "second",
    number: "05",
    tabLabel: "SECOND FLOOR",
    levelTitle: "SECOND FLOOR RETREAT",
    area: "743 SQ FT",
    subtitle: "Retreat • Unwind • Look Out",
    imageSrc: "/digital-assets/Floor Plane and Site Plan/Second Floor Plan.png",
    altText: "Fortune Haven Second Floor Architectural Plan showing master bedroom, family lounge, and spacious terrace",
    highlights: [
      "Master bedroom sanctuary with dedicated dressing area and attached toilet.",
      "Family lounge for movie nights, private bar, reading, or relaxing.",
      "Spacious balcony terrace for outdoor living, entertaining and open views.",
      "Individual private lift access serving this retreat level.",
    ],
  },
];

interface MaterialSpecification {
  category: string;
  specification: string;
  detail: string;
}

const MATERIALS_SPECS: MaterialSpecification[] = [
  {
    category: "BEDROOMS",
    specification: "Wooden Flooring",
    detail: "Warmth and comfort underfoot for a private, intimate bedroom environment.",
  },
  {
    category: "LIVING SPACES",
    specification: "Vitrified Flooring",
    detail: "A clean, durable, and refined finish designed for everyday family life and entertaining.",
  },
  {
    category: "BATHROOMS",
    specification: "Premium Sanitaryware & Fixtures",
    detail: "Carefully specified branded bathroom fittings and concealed fixtures for lasting quality.",
  },
  {
    category: "ELECTRICAL",
    specification: "Legrand Fittings",
    detail: "Selected premium electrical modular switches and conduits for everyday reliability.",
  },
  {
    category: "LIGHTING",
    specification: "Layered Illumination",
    detail: "Ambient, task, and accent lighting designed to create warmth and atmosphere across every level.",
  },
  {
    category: "VERTICAL ACCESS",
    specification: "Individual Private Elevator",
    detail: "Dedicated private lift installed in each villa serving all four floors from basement to rooftop.",
  },
];

export const InteractiveFloorPlans: React.FC = () => {
  const [activeLevelIndex, setActiveLevelIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const planDisplayRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);

  const activeLevel = FLOOR_LEVELS[activeLevelIndex];

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
    },
    { scope: sectionRef }
  );

  const handleSelectLevel = (index: number) => {
    if (index === activeLevelIndex) return;
    if (planDisplayRef.current && detailsPanelRef.current) {
      gsap.to([planDisplayRef.current, detailsPanelRef.current], {
        opacity: 0.2,
        y: 6,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          setActiveLevelIndex(index);
          gsap.to([planDisplayRef.current, detailsPanelRef.current], {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          });
        },
      });
    } else {
      setActiveLevelIndex(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="floor-plans"
      className={styles.floorPlansSection}
      aria-label="Floor Planning and Materials"
    >
      <div className="editorial-container">
        {/* Section Heading & Intro */}
        <div className={styles.introBlock}>
          <div className={styles.introGrid}>
            <div className={styles.introColLeft}>
              <span className={styles.eyebrow}>FLOOR PLANS & SPECIFICATIONS</span>
              <h2 className={styles.headline}>Designed for Individuality.</h2>
            </div>

            <div className={styles.introColRight}>
              <p className={styles.description}>
                Total Built-up Area: 4,281 Sq Ft with 2,800 Sq Ft Undivided Land Share.
                Each level is planned with dedicated function — from basement convenience and ground-floor
                family gathering, to first-floor sleeping suites and a second-floor retreat under the open sky.
              </p>

              <div className={styles.scaleMetrics}>
                <span className={styles.metricItem}>4 Levels</span>
                <span className={styles.metricDot}>•</span>
                <span className={styles.metricItem}>4,281 Sq Ft Built-up</span>
                <span className={styles.metricDot}>•</span>
                <span className={styles.metricItem}>2,800 Sq Ft UDS</span>
                <span className={styles.metricDot}>•</span>
                <span className={styles.metricItem}>Private Lift Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Level Selector */}
        <div className={styles.selectorWrapper}>
          <nav
            className={styles.selectorRow}
            aria-label="Floor Level Tabs"
            role="tablist"
          >
            {FLOOR_LEVELS.map((level, idx) => {
              const isActive = idx === activeLevelIndex;
              return (
                <button
                  key={level.id}
                  role="tab"
                  id={`tab-${level.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${level.id}`}
                  className={`${styles.levelTab} ${isActive ? styles.activeTab : ""}`}
                  onClick={() => handleSelectLevel(idx)}
                >
                  <span className={styles.tabNumber}>{level.number}</span>
                  <span className={styles.tabDivider}>/</span>
                  <span className={styles.tabText}>{level.tabLabel}</span>
                  <span className={styles.tabArea}>({level.area})</span>
                  {isActive && <span className={styles.activeHairline} />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Active Floor Plan Stage */}
        <div
          id={`panel-${activeLevel.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeLevel.id}`}
          className={styles.planStageGrid}
        >
          {/* Plan Drawing Display */}
          <div ref={planDisplayRef} className={styles.planDisplayCol}>
            <div className={styles.planCard}>
              <div
                className={styles.planImageFrame}
                onClick={() => setIsModalOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }
                }}
                aria-label={`View larger ${activeLevel.levelTitle} floor plan`}
                title="Click to view larger floor plan"
              >
                <Image
                  src={activeLevel.imageSrc}
                  alt={activeLevel.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 980px"
                  className={styles.planImg}
                  priority={activeLevelIndex === 0}
                  quality={92}
                />
                <div className={styles.planClickHint} aria-hidden="true">
                  <span className={styles.hintIcon}>⤢</span>
                  <span className={styles.hintText}>Click to enlarge</span>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights & Floor Breakdown */}
          <div ref={detailsPanelRef} className={styles.detailsCol}>
            <div className={styles.detailsCard}>
              <div className={styles.detailsHeader}>
                <div className={styles.detailsBadge}>
                  <span className={styles.badgeIndex}>LEVEL 0{activeLevel.number}</span>
                  <span className={styles.badgeArea}>{activeLevel.area}</span>
                </div>
                <h3 className={styles.detailsTitle}>{activeLevel.levelTitle}</h3>
                <p className={styles.detailsSubtitle}>{activeLevel.subtitle}</p>
              </div>

              <div className={styles.detailsDivider} />

              <div className={styles.highlightsBlock}>
                <span className={styles.highlightsTag}>LEVEL ALLOCATIONS</span>
                <ul className={styles.highlightsList}>
                  {activeLevel.highlights.map((highlight, index) => (
                    <li key={index} className={styles.highlightItem}>
                      <span className={styles.highlightBullet} />
                      <span className={styles.highlightText}>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Materials & Finishes Section */}
        <div className={styles.materialsSection}>
          <div className={styles.materialsHeaderLine}>
            <div>
              <span className={styles.materialsTag}>MATERIALS & SPECIFICATIONS</span>
              <h3 className={styles.materialsTitle}>The Details You Live With Every Day.</h3>
            </div>
          </div>

          <div className={styles.materialsGrid}>
            {MATERIALS_SPECS.map((spec, idx) => (
              <div key={idx} className={styles.materialCard}>
                <span className={styles.materialCategory}>{spec.category}</span>
                <h4 className={styles.materialSpec}>{spec.specification}</h4>
                <p className={styles.materialDetail}>{spec.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Enlarged Plan Modal */}
      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view of ${activeLevel.levelTitle}`}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleBlock}>
                <span className={styles.modalBadge}>LEVEL 0{activeLevel.number} • {activeLevel.area}</span>
                <h4 className={styles.modalTitle}>{activeLevel.levelTitle}</h4>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close enlarged drawing"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className={styles.modalImageContainer}>
              <Image
                src={activeLevel.imageSrc}
                alt={activeLevel.altText}
                fill
                sizes="95vw"
                className={styles.modalImg}
                quality={95}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
