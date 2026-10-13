"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PropertyGallery.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type GalleryCategory =
  | "ALL"
  | "ARCHITECTURE"
  | "INTERIORS"
  | "OUTDOORS & RECREATION";

export interface GalleryItem {
  id: string;
  title: string;
  category: "ARCHITECTURE" | "INTERIORS" | "OUTDOORS & RECREATION";
  caption: string;
  src: string;
  alt: string;
  spanClass: "anchorLarge" | "medium" | "tall" | "standard";
}

// 7 Carefully curated primary photographs covering all facets
const CURATED_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "straight-view",
    title: "VILLA ARRIVAL & ARCHITECTURAL STATURE",
    category: "ARCHITECTURE",
    caption: "The commanding four-storey elevation viewed from the landscaped approach",
    src: "/digital-assets/Villa Images/Straight view.png",
    alt: "Fortune Haven Villa Approach and Stature",
    spanClass: "anchorLarge", // Visual Anchor (8 cols on desktop)
  },
  {
    id: "rooftop-panorama",
    title: "SUNLIT ROOFTOP LOOKOUT TERRACE",
    category: "OUTDOORS & RECREATION",
    caption: "Perched lookout opening out towards the tranquil Nandi foothills",
    src: "/digital-assets/Villa Images/Sunlit Rooftop Terrace with Mountain Views.png",
    alt: "Sunlit rooftop terrace overlooking the hills",
    spanClass: "tall", // 4 cols tall
  },
  {
    id: "living-room-grand",
    title: "DOUBLE-HEIGHT LIVING SALON",
    category: "INTERIORS",
    caption: "Soaring vertical volumes flooded with ambient natural illumination",
    src: "/digital-assets/Villa Images/Livning Room 2.png",
    alt: "Double-height living space with expansive glazing",
    spanClass: "medium", // 4 cols
  },
  {
    id: "pool-sanctuary",
    title: "RESIDENTIAL SWIMMING POOL ENCLAVE",
    category: "OUTDOORS & RECREATION",
    caption: "Stone sun-deck alongside shimmering reflection waters",
    src: "/digital-assets/Villa Images/Pool 2.png",
    alt: "Enclave swimming pool with sun deck and greenery",
    spanClass: "medium", // 4 cols
  },
  {
    id: "home-theatre-cinema",
    title: "PRIVATE ENTERTAINMENT CINEMA",
    category: "INTERIORS",
    caption: "Upper-tier acoustic media lounge for private film screenings",
    src: "/digital-assets/Villa Images/Home theatre.png",
    alt: "Private home theatre with acoustic panels and ambient lighting",
    spanClass: "medium", // 4 cols
  },
  {
    id: "clubhouse-pavilion",
    title: "COMMUNITY CLUBHOUSE SOCIAL PAVILION",
    category: "OUTDOORS & RECREATION",
    caption: "A welcoming venue for shared recreation and neighbourly camaraderie",
    src: "/digital-assets/Villa Images/Clubhouse.png",
    alt: "Clubhouse social pavilion at Fortune Haven",
    spanClass: "standard", // 6 cols
  },
  {
    id: "culinary-kitchen",
    title: "GOURMET CULINARY KITCHEN",
    category: "INTERIORS",
    caption: "Streamlined flush cabinetry and intuitive island preparation",
    src: "/digital-assets/Villa Images/Kitchen.png",
    alt: "Contemporary culinary kitchen with island",
    spanClass: "standard", // 6 cols
  },
];

// Additional folio photographs accessible through Lightbox or full folio
const ADDITIONAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "aerial-enclave",
    title: "ENCLAVE SETTING & FOOTHILL HARMONY",
    category: "ARCHITECTURE",
    caption: "Aerial perspective revealing the low-density master plan",
    src: "/digital-assets/Villa Images/FH Aerial View.png",
    alt: "Aerial view of Fortune Haven enclave against Nandi Hills",
    spanClass: "standard",
  },
  {
    id: "rooftop-sunset",
    title: "DUSK ENTERTAINING LOUNGE",
    category: "OUTDOORS & RECREATION",
    caption: "Evenings unhurried beneath the amber skies of Nandi foothills",
    src: "/digital-assets/Villa Images/Luxury Rooftop Terrace at Sunset.png",
    alt: "Sunset open-air entertaining terrace",
    spanClass: "standard",
  },
  {
    id: "master-bedroom",
    title: "PRIMARY SANCTUARY SUITE",
    category: "INTERIORS",
    caption: "Understated timber flooring and soft acoustic stillness",
    src: "/digital-assets/Villa Images/Room with wooden floor.png",
    alt: "Master bedroom suite with natural wood flooring",
    spanClass: "standard",
  },
  {
    id: "private-study",
    title: "CONTEMPLATIVE STUDY & LIBRARY",
    category: "INTERIORS",
    caption: "A quiet alcove designed for deep thought and focused pursuits",
    src: "/digital-assets/Villa Images/Private study.png",
    alt: "Private study and library room with custom joinery",
    spanClass: "standard",
  },
  {
    id: "bedroom-balcony",
    title: "BEDROOM VERANDAH & PRIVATE GARDENS",
    category: "OUTDOORS & RECREATION",
    caption: "Shaded personal balcony framing manicured courtyard greenery",
    src: "/digital-assets/Villa Images/Balcony.png",
    alt: "Private balcony overlooking lush landscaped grounds",
    spanClass: "standard",
  },
  {
    id: "wardrobes-dressing",
    title: "CUSTOM DRESSING WARDROBES",
    category: "INTERIORS",
    caption: "Precision fitted joinery with integrated ambient lighting",
    src: "/digital-assets/Villa Images/Wardrobes.png",
    alt: "Walk-in wardrobe and dressing area",
    spanClass: "standard",
  },
];

const ALL_ITEMS = [...CURATED_GALLERY_ITEMS, ...ADDITIONAL_GALLERY_ITEMS];

const CATEGORIES: GalleryCategory[] = [
  "ALL",
  "ARCHITECTURE",
  "INTERIORS",
  "OUTDOORS & RECREATION",
];

export const PropertyGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("ALL");
  const [isExpandedFolio, setIsExpandedFolio] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const galleryGridRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  // Active items based on category and expanded state
  const activeBaseList = isExpandedFolio ? ALL_ITEMS : CURATED_GALLERY_ITEMS;
  const displayItems =
    selectedCategory === "ALL"
      ? activeBaseList
      : activeBaseList.filter((item) => item.category === selectedCategory);

  // Lightbox pool
  const lightboxPool =
    selectedCategory === "ALL"
      ? ALL_ITEMS
      : ALL_ITEMS.filter((item) => item.category === selectedCategory);

  // GSAP scroll trigger entrance
  useGSAP(
    () => {
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.introBlock}`,
          start: "top 82%",
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

      // Gallery grid items reveal
      gsap.from(`.${styles.galleryCard}`, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryGridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  // Open Lightbox with background scroll locking
  const openLightbox = (item: GalleryItem) => {
    const idx = lightboxPool.findIndex((p) => p.id === item.id);
    scrollPositionRef.current = window.scrollY;
    setLightboxIndex(idx >= 0 ? idx : 0);
    document.body.style.overflow = "hidden";
  };

  // Close Lightbox and restore scroll
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
    window.scrollTo(0, scrollPositionRef.current);
  }, []);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + lightboxPool.length) % lightboxPool.length
    );
  }, [lightboxIndex, lightboxPool.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % lightboxPool.length
    );
  }, [lightboxIndex, lightboxPool.length]);

  // Keyboard navigation & accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext, closeLightbox]);

  const currentLightboxItem =
    lightboxIndex !== null ? lightboxPool[lightboxIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className={styles.gallerySection}
      aria-label="Cinematic Property Gallery"
    >
      <div className="editorial-container">
        {/* Section Heading & Intro */}
        <div className={styles.introBlock}>
          <div className={styles.introGrid}>
            <div className={styles.introColLeft}>
              <span className={styles.eyebrow}>PROPERTY GALLERY</span>
              <h2 className={styles.headline}>Every Detail. A Different Perspective.</h2>
            </div>

            <div className={styles.introColRight}>
              <p className={styles.description}>
                Explore the architecture, considered interiors, private outdoor
                spaces and lifestyle experiences that shape the Fortune Haven
                vision.
              </p>

              <div className={styles.galleryMetaLine}>
                <span className={styles.metaHighlight}>Curated Folio</span>
                <span className={styles.metaDot}>•</span>
                <span className={styles.metaHighlight}>24 Boutique Villas</span>
                <span className={styles.metaDot}>•</span>
                <span className={styles.metaHighlight}>Architectural Visualization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Navigation */}
        <div className={styles.filterWrapper}>
          <nav
            className={styles.categoryNav}
            aria-label="Filter property gallery by category"
            role="tablist"
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat === selectedCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.filterBtn} ${isActive ? styles.activeFilter : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span>{cat}</span>
                  {isActive && <span className={styles.filterHairline} />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Compact Asymmetrical Editorial Composition Grid */}
        <div ref={galleryGridRef} className={styles.galleryGrid}>
          {displayItems.map((item) => (
            <article
              key={item.id}
              className={`${styles.galleryCard} ${styles[item.spanClass]}`}
              onClick={() => openLightbox(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(item);
                }
              }}
              aria-label={`View photograph: ${item.title}`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className={styles.galleryImg}
                />
                <div className={styles.hoverOverlay} />
                <div className={styles.expandTrigger} aria-hidden="true">
                  <span className={styles.expandIcon}>+</span>
                </div>
              </div>

              <div className={styles.cardMeta}>
                <div className={styles.cardMetaLeft}>
                  <span className={styles.cardCategory}>{item.category}</span>
                  <span className={styles.metaDot}>•</span>
                  <span className={styles.cardTitle}>{item.title}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Toggle View More / View Less */}
        <div className={styles.galleryActionRow}>
          <button
            type="button"
            className={styles.viewMoreBtn}
            onClick={() => setIsExpandedFolio(!isExpandedFolio)}
            aria-expanded={isExpandedFolio}
          >
            <span>{isExpandedFolio ? "View less" : "View more"}</span>
            <span className={styles.btnArrow}>
              {isExpandedFolio ? "↑" : "↓"}
            </span>
          </button>
        </div>
      </div>

      {/* Accessible Fullscreen Lightbox */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div
          className={styles.lightboxBackdrop}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox Viewer"
        >
          {/* Top Bar */}
          <div
            className={styles.lightboxTopBar}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.lightboxInfo}>
              <span className={styles.lightboxCategory}>
                {currentLightboxItem.category}
              </span>
              <span className={styles.lightboxDivider}>|</span>
              <span className={styles.lightboxCounter}>
                {lightboxIndex + 1} OF {lightboxPool.length}
              </span>
            </div>

            <button
              type="button"
              className={styles.lightboxCloseBtn}
              onClick={closeLightbox}
              aria-label="Close Lightbox (Press Escape)"
            >
              <span>CLOSE</span>
              <span className={styles.closeIcon}>✕</span>
            </button>
          </div>

          {/* Lightbox Center Stage */}
          <div
            className={styles.lightboxStage}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={handlePrev}
              aria-label="Previous photograph"
            >
              ‹
            </button>

            <div className={styles.lightboxImageContainer}>
              <Image
                src={currentLightboxItem.src}
                alt={currentLightboxItem.alt}
                fill
                priority
                sizes="100vw"
                className={styles.lightboxImg}
              />
            </div>

            <button
              type="button"
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={handleNext}
              aria-label="Next photograph"
            >
              ›
            </button>
          </div>

          {/* Bottom Bar */}
          <div
            className={styles.lightboxBottomBar}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.lightboxCaptionBlock}>
              <h3 className={styles.lightboxTitle}>
                {currentLightboxItem.title}
              </h3>
              <p className={styles.lightboxCaption}>
                {currentLightboxItem.caption}
              </p>
            </div>

            <span className={styles.lightboxKeyHint}>
              Use Arrow Keys to Navigate • ESC to Close
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
