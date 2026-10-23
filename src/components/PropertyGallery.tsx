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

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  ratioClass: "ratioWide" | "ratioStandard" | "ratioSquare" | "ratioTall";
}

// 16 Curated Photographs Exclusively From digital-assets/Villa Images
// Arranged in the exact viewing sequence:
// 1. Villa exteriors and overall architecture
// 2. Living room
// 3. Kitchen
// 4. Bedrooms
// 5. Balconies
// 6. Second-floor balcony
// 7. Elevator
// 8. Bar counter
// 9. Home theatre
// 10. Terrace
const GALLERY_ITEMS: GalleryItem[] = [
  // 1. Villa exteriors and overall architecture
  {
    id: "ext-straight-view",
    title: "VILLA ARRIVAL & ARCHITECTURAL STATURE",
    caption: "The commanding elevation viewed from the landscaped entrance approach",
    src: "/digital-assets/Villa Images/Straight view.png",
    alt: "Fortune Haven Villa Approach and Stature",
    ratioClass: "ratioWide",
  },
  {
    id: "ext-villa-facade",
    title: "CONTEMPORARY VILLA FACADE",
    caption: "Sculptural architectural lines harmonized with manicured landscaping",
    src: "/digital-assets/Villa Images/Villa.png",
    alt: "Modern Villa Architectural Facade",
    ratioClass: "ratioTall",
  },
  {
    id: "ext-villa-row",
    title: "ENCLAVE ARCHITECTURAL ROW",
    caption: "Low-density streetscape showcasing cohesive boutique villa design",
    src: "/digital-assets/Villa Images/Villa Row Image.jpg",
    alt: "Fortune Haven Villa Row Enclave",
    ratioClass: "ratioStandard",
  },
  {
    id: "ext-pool",
    title: "RESIDENTIAL SWIMMING POOL ENCLAVE",
    caption: "Stone sun deck framed by tranquil reflection waters and verdant greens",
    src: "/digital-assets/Villa Images/Pool 2.png",
    alt: "Enclave Swimming Pool and Sun Deck",
    ratioClass: "ratioSquare",
  },
  {
    id: "ext-aerial",
    title: "MASTER ENCLAVE ARCHITECTURE & AERIAL PERSPECTIVE",
    caption: "Comprehensive aerial view revealing the boutique architectural layout",
    src: "/digital-assets/Villa Images/Aerial View.png",
    alt: "Fortune Haven Master Aerial Architecture",
    ratioClass: "ratioStandard",
  },

  // 2. Living room
  {
    id: "lr-grand-salon",
    title: "DOUBLE-HEIGHT LIVING SALON",
    caption: "Volumetric vertical living space flooded with natural daylight",
    src: "/digital-assets/Villa Images/Livning Room.png",
    alt: "Double Height Living Room Salon",
    ratioClass: "ratioTall",
  },
  {
    id: "lr-evening-ambiance",
    title: "LIVING SALON EVENING ILLUMINATION",
    caption: "Architectural lighting creating a warm and refined evening atmosphere",
    src: "/digital-assets/Villa Images/Livning Room 4.png",
    alt: "Living Salon with Ambient Evening Lighting",
    ratioClass: "ratioSquare",
  },

  // 3. Kitchen
  {
    id: "kit-culinary",
    title: "GOURMET CULINARY KITCHEN",
    caption: "Precision flush cabinetry and intuitive center island preparation",
    src: "/digital-assets/Villa Images/Kitchen.png",
    alt: "Contemporary Gourmet Culinary Kitchen",
    ratioClass: "ratioStandard",
  },

  // 4. Bedrooms
  {
    id: "bed-master-suite",
    title: "PRIMARY SANCTUARY BEDROOM",
    caption: "Natural timber flooring and tranquil acoustic stillness for deep rest",
    src: "/digital-assets/Villa Images/Room with wooden floor.png",
    alt: "Master Bedroom Suite with Natural Wood Flooring",
    ratioClass: "ratioSquare",
  },
  {
    id: "bed-wardrobes",
    title: "CUSTOM DRESSING WARDROBES",
    caption: "Precision fitted walk-in joinery with integrated subtle illumination",
    src: "/digital-assets/Villa Images/Wardrobes.png",
    alt: "Walk-in Wardrobe and Dressing Area",
    ratioClass: "ratioStandard",
  },

  // 5. Balconies
  {
    id: "balcony-primary",
    title: "BEDROOM VERANDAH & BALCONY",
    caption: "Private shaded personal balcony framing scenic landscaped greenery",
    src: "/digital-assets/Villa Images/Balcony.png",
    alt: "Private Bedroom Balcony Overlooking Gardens",
    ratioClass: "ratioTall",
  },

  // 6. Second-floor balcony
  {
    id: "balcony-second-floor-1",
    title: "SECOND FLOOR BALCONY ELEVATION",
    caption: "Elevated outdoor viewpoint overlooking the foothills and community grounds",
    src: "/digital-assets/Villa Images/Second Floor Balcony.png",
    alt: "Second Floor Balcony View",
    ratioClass: "ratioSquare",
  },
  {
    id: "balcony-second-floor-2",
    title: "SECOND FLOOR BALCONY PANORAMA",
    caption: "Expansive second-tier verandah designed for open-air relaxation",
    src: "/digital-assets/Villa Images/Second Floor Balcony Option 2.png",
    alt: "Second Floor Balcony Panoramic Perspective",
    ratioClass: "ratioTall",
  },

  // 7. Elevator
  {
    id: "int-elevator",
    title: "PRIVATE IN-VILLA ELEVATOR",
    caption: "Seamless vertical connectivity across all villa levels with private elevator access",
    src: "/digital-assets/Villa Images/Elevator.png",
    alt: "Private In-Villa Elevator",
    ratioClass: "ratioTall",
  },

  // 8. Bar counter
  {
    id: "int-bar-counter",
    title: "ENTERTAINMENT BAR COUNTER",
    caption: "Sophisticated bar counter nook crafted for hospitality and private hosting",
    src: "/digital-assets/Villa Images/Bar counter.png",
    alt: "Private Lounge Bar Counter",
    ratioClass: "ratioStandard",
  },

  // 9. Home theatre
  {
    id: "int-home-theatre",
    title: "PRIVATE ENTERTAINMENT CINEMA",
    caption: "Tiered acoustic media lounge engineered for private cinematic screenings",
    src: "/digital-assets/Villa Images/Home theatre.png",
    alt: "Private Home Theatre with Acoustic Paneling",
    ratioClass: "ratioSquare",
  },

  // 10. Terrace
  {
    id: "ext-rooftop-terrace",
    title: "SUNLIT ROOFTOP LOOKOUT TERRACE",
    caption: "Perched lookout opening out towards the serene Nandi foothills horizon",
    src: "/digital-assets/Villa Images/Sunlit Rooftop Terrace with Mountain Views.png",
    alt: "Sunlit Rooftop Terrace Overlooking Mountain Foothills",
    ratioClass: "ratioTall",
  },
];

export const PropertyGallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const galleryGridRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

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
        y: 20,
        opacity: 0,
        duration: 0.75,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryGridRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  // Manage background scroll locking via effect
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Open Lightbox with background scroll locking
  const openLightbox = (item: GalleryItem) => {
    const idx = GALLERY_ITEMS.findIndex((p) => p.id === item.id);
    scrollPositionRef.current = window.scrollY;
    setLightboxIndex(idx >= 0 ? idx : 0);
  };

  // Close Lightbox and restore scroll
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    window.scrollTo(0, scrollPositionRef.current);
  }, []);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  }, [lightboxIndex]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
    );
  }, [lightboxIndex]);

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
    lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className={styles.gallerySection}
      aria-label="Villa Photography Gallery"
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

        {/* Full-Width Aligned Masonry Gallery Grid (No Labels/Badges) */}
        <div ref={galleryGridRef} className={styles.galleryGrid}>
          {GALLERY_ITEMS.map((item) => (
            <article
              key={item.id}
              className={styles.galleryCard}
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
              <div className={`${styles.imageWrapper} ${styles[item.ratioClass]}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className={styles.galleryImg}
                />
                <div className={styles.hoverOverlay} />
                <div className={styles.expandTrigger} aria-hidden="true">
                  <span className={styles.expandIcon}>+</span>
                </div>
              </div>
            </article>
          ))}
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
              <span className={styles.lightboxBadge}>FORTUNE HAVEN FOLIO</span>
              <span className={styles.lightboxDivider}>|</span>
              <span className={styles.lightboxCounter}>
                {lightboxIndex + 1} OF {GALLERY_ITEMS.length}
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
