"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroScene {
  id: string;
  theme: string;
  eyebrow: string;
  headline: string;
  description: string;
  highlight: string;
  propertyFacts?: readonly string[];
  imageSrc: string;
  altText: string;
  ctaText: string;
  ctaHref: string;
  secondaryText: string;
  secondaryHref: string;
}

/**
 * 4 Approved Brochure Scenes utilizing actual high-res frames from the Hero Section folder.
 * Frame 001: Arrival angle showcasing the four-storey contemporary architectural stature.
 * Frame 075: Elevation focusing on the 4-BHK multi-level vertical living format.
 * Frame 150: Perspective emphasizing private lawns, double balconies & terrace retreats.
 * Frame 225/300: High-angle daylight composition of the 24-villa enclave along Nandi Hills foothills.
 */
const HERO_SCENES: readonly HeroScene[] = [
  {
    id: "scene-1",
    theme: "The First Impression",
    eyebrow: "Devanahalli, Bengaluru",
    headline: "A Brighter Tomorrow Begins with the Right Address.",
    description:
      "An exclusive gated enclave of 24 four-BHK boutique villas in Devanahalli, designed for families who value space, privacy and individuality.",
    propertyFacts: ["4 Storeys", "4,281 Sq. Ft. Built-up Area", "2,800 Sq. Ft. UDS"],
    highlight: "OC Received • BIAAPA Approved • RERA Approved",
    imageSrc: "/digital-assets/Hero Section/ezgif-frame-002.jpg",
    altText:
      "Fortune Haven contemporary four-storey boutique villa architectural facade in Devanahalli",
    ctaText: "Explore The Villas",
    ctaHref: "#experience",
    secondaryText: "Request Brochure",
    secondaryHref: "#enquire",
  },
  {
    id: "scene-2",
    theme: "Space to Live",
    eyebrow: "Four-Storey Format • 4,281 Sq Ft",
    headline: "Room to Live, Grow and Thrive.",
    description:
      "Four thoughtfully planned levels create dedicated spaces for family living, private retreats, work and leisure—giving every member of the family room to call their own.",
    highlight: "4 En-Suite Bedrooms • Private Lift • 3-Car Parking",
    imageSrc: "/digital-assets/Hero Section/ezgif-frame-075.jpg",
    altText:
      "Fortune Haven four-storey villa structural elevation showcasing expansive multi-level living",
    ctaText: "View Floor Plans",
    ctaHref: "#floor-plans",
    secondaryText: "Book Viewing",
    secondaryHref: "#enquire",
  },
  {
    id: "scene-3",
    theme: "Your Private Retreat",
    eyebrow: "Landscape & Outdoor Living",
    headline: "Where the Home Meets the Outdoors.",
    description:
      "Private gardens, four balconies and a spacious rooftop terrace bring outdoor living into everyday life, with views towards the Nandi Hills.",
    highlight: "Private Lawn • 4 Balconies • Terrace Retreat",
    imageSrc: "/digital-assets/Hero Section/ezgif-frame-150.jpg",
    altText:
      "Fortune Haven villa private landscaped garden and cantilevered glass balconies",
    ctaText: "Outdoor Living",
    ctaHref: "#architecture",
    secondaryText: "Request Dossier",
    secondaryHref: "#enquire",
  },
  {
    id: "scene-4",
    theme: "A Life at Fortune Haven",
    eyebrow: "Limited to 24 Families",
    headline: "Life, on Your Own Terms.",
    description:
      "A private community of just 24 villas, complemented by a clubhouse and shared leisure amenities. Visit the completed model villa and experience Fortune Haven in person.",
    highlight: "2,800 Sq Ft UDS • Clubhouse Pavilion • Ready To Move In",
    imageSrc: "/digital-assets/Hero Section/ezgif-frame-225.jpg",
    altText:
      "Fortune Haven gated enclave and private villa row under open skies near Nandi Hills",
    ctaText: "Schedule Private Tour",
    ctaHref: "#enquire",
    secondaryText: "Project Overview",
    secondaryHref: "#experience",
  },
] as const;

export const Hero: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Reduced motion: Show scene 1 statically without scroll scrubbing
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const imageEls = gsap.utils.toArray<HTMLElement>(`.${styles.imageLayer}`);
        const sceneEls = gsap.utils.toArray<HTMLElement>(`.${styles.sceneCard}`);

        imageEls.forEach((img, idx) => {
          gsap.set(img, {
            autoAlpha: idx === 0 ? 1 : 0,
            scale: 1,
            clearProps: "transform",
          });
        });

        sceneEls.forEach((scene, idx) => {
          gsap.set(scene, {
            autoAlpha: idx === 0 ? 1 : 0,
            y: 0,
            clearProps: "transform",
          });
        });
      });

      // Desktop & Mobile Scroll-driven 4-scene sequence (reduced-motion: no-preference)
      mm.add("(prefers-reduced-motion: no-preference)", (context) => {
        const isMobile = window.innerWidth <= 768;
        const imageEls = gsap.utils.toArray<HTMLElement>(`.${styles.imageLayer}`);
        const sceneEls = gsap.utils.toArray<HTMLElement>(`.${styles.sceneCard}`);

        if (imageEls.length === 0 || sceneEls.length === 0) return;

        // Set explicit starting values for all scenes
        gsap.set(imageEls[0], { autoAlpha: 1, scale: 1 });
        gsap.set(sceneEls[0], { autoAlpha: 1, y: 0 });

        for (let i = 1; i < imageEls.length; i++) {
          gsap.set(imageEls[i], { autoAlpha: 0, scale: 1.03 });
          gsap.set(sceneEls[i], { autoAlpha: 0, y: 16 });
        }

        const scrollDistance = isMobile ? 1400 : 1800;

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "hero-trigger",
            trigger: trackRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: stageRef.current,
            pinSpacing: true,
            scrub: isMobile ? 0.6 : 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              const sceneIdx = Math.min(
                HERO_SCENES.length - 1,
                Math.floor(p * HERO_SCENES.length)
              );
              setActiveSceneIndex(sceneIdx);
            },
          },
        });

        // 3 transitions between 4 scenes
        const numTransitions = HERO_SCENES.length - 1;
        const segDuration = 1.0;

        for (let i = 0; i < numTransitions; i++) {
          const curImg = imageEls[i];
          const nextImg = imageEls[i + 1];
          const curScene = sceneEls[i];
          const nextScene = sceneEls[i + 1];
          const stepLabel = `step-${i}`;

          tl.addLabel(stepLabel);

          // 1. Text fades out with slight upward glide
          tl.to(
            curScene,
            {
              autoAlpha: 0,
              y: -14,
              duration: segDuration * 0.35,
              ease: "power1.inOut",
            },
            stepLabel
          );

          // 2. Image crossfade with restrained gentle movement
          tl.to(
            curImg,
            {
              autoAlpha: 0,
              scale: 0.99,
              duration: segDuration * 0.7,
              ease: "sine.inOut",
            },
            `${stepLabel}+=0.08`
          );

          tl.fromTo(
            nextImg,
            { autoAlpha: 0, scale: 1.03 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: segDuration * 0.7,
              ease: "sine.inOut",
            },
            `${stepLabel}+=0.08`
          );

          // 3. Next text glides in gently from below
          tl.fromTo(
            nextScene,
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: segDuration * 0.45,
              ease: "power2.out",
            },
            `${stepLabel}+=0.38`
          );

          // Settle pause so the scene is fully enjoyed before starting next transition
          tl.to({}, { duration: segDuration * 0.3 });
        }
      });

      // Handle intentional reset-hero event (e.g. clicking Home or Logo)
      const handleResetHero = () => {
        setActiveSceneIndex(0);
        const st = ScrollTrigger.getById("hero-trigger");
        if (st && st.animation) {
          st.animation.progress(0);
        }
      };

      window.addEventListener("fortunehaven:reset-hero", handleResetHero);

      return () => {
        window.removeEventListener("fortunehaven:reset-hero", handleResetHero);
        mm.revert();
      };
    },
    { scope: trackRef }
  );

  const handleIndicatorClick = (index: number) => {
    if (!trackRef.current) return;
    const st = ScrollTrigger.getById("hero-trigger");
    if (st && typeof st.start === "number" && typeof st.end === "number") {
      const scrollRange = st.end - st.start;
      const targetScroll = st.start + scrollRange * (index / (HERO_SCENES.length - 1));
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      setActiveSceneIndex(index);
    }
  };

  return (
    <div
      ref={trackRef}
      id="home"
      className={styles.heroTrack}
      aria-label="Fortune Haven Villa Arrival"
    >
      <section ref={stageRef} className={styles.heroStage}>
        {/* Background Image Stack: 4 scenes using the approved Hero Section assets */}
        {HERO_SCENES.map((scene, index) => (
          <div
            key={scene.id}
            className={`${styles.imageLayer} ${
              activeSceneIndex === index ? styles.activeLayer : ""
            }`}
            aria-hidden={activeSceneIndex !== index}
          >
            <Image
              src={scene.imageSrc}
              alt={scene.altText}
              fill
              priority={index <= 1}
              quality={92}
              sizes="100vw"
              className={styles.heroImg}
            />
          </div>
        ))}

        {/* Refined charcoal atmospheric scrim */}
        <div className={styles.scrim} aria-hidden="true" />

        {/* Foreground Content Stack */}
        <div className={styles.contentArea}>
          <div className="editorial-container">
            {/* Synchronized Headline & Narrative Scenes */}
            <div className={styles.sceneContainer}>
              {HERO_SCENES.map((scene, index) => (
                <article
                  key={scene.id}
                  className={`${styles.sceneCard} ${
                    activeSceneIndex === index ? styles.activeCard : ""
                  }`}
                  aria-hidden={activeSceneIndex !== index}
                >
                  <span className={styles.eyebrow}>{scene.eyebrow}</span>
                  <h1 className={styles.headline}>{scene.headline}</h1>
                  <p className={styles.description}>{scene.description}</p>
                  {scene.propertyFacts && scene.propertyFacts.length > 0 && (
                    <div className={styles.propertyFactsList} aria-label="Key Property Facts">
                      {scene.propertyFacts.map((fact, fIdx) => (
                        <span key={fIdx} className={styles.propertyFactItem}>
                          {fact}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className={styles.highlightLine}>
                    <span>{scene.highlight}</span>
                  </div>

                  {/* Actions */}
                  <div className={styles.ctaContainer}>
                    <a href={scene.ctaHref} className={styles.primaryCta}>
                      <span>{scene.ctaText}</span>
                    </a>
                    <a href={scene.secondaryHref} className={styles.secondaryCta}>
                      <span>{scene.secondaryText}</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Restrained Scene Progress Indicator */}
        <nav
          className={styles.progressIndicator}
          aria-label="Hero Scene Progress"
        >
          {HERO_SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              type="button"
              className={`${styles.progressItem} ${
                activeSceneIndex === idx ? styles.active : ""
              }`}
              onClick={() => handleIndicatorClick(idx)}
              aria-label={`Go to scene ${idx + 1}: ${scene.theme}`}
            >
              <span className={styles.progressTrack} />
              <span className={styles.progressLabel}>0{idx + 1}</span>
            </button>
          ))}
        </nav>

        {/* Understated Scroll Cue */}
        <div className={styles.scrollPrompt} aria-hidden="true">
          <span className={styles.scrollDot} />
          <span>SCROLL TO DISCOVER</span>
        </div>
      </section>
    </div>
  );
};
