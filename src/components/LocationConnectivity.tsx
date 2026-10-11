"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LocationConnectivity.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DistanceNode {
  category: string;
  items: { destination: string; distance: string }[];
}

/**
 * Verified Client-Approved Brochure Distances (Brochure p. 14)
 * Neutralized leisure destination label ("JW Marriott Prestige Golfshire") to eliminate the word "resort"
 * while retaining 100% verified location data.
 */
const DISTANCE_NODES: DistanceNode[] = [
  {
    category: "AIRPORT & CONNECTIVITY",
    items: [
      { destination: "NH-207 Arterial", distance: "Adjacent to Fortune Haven" },
      { destination: "NH-44 Expressway", distance: "200 m" },
      { destination: "STRR (Satellite Town Ring Road)", distance: "1 km" },
      { destination: "Kempegowda International Airport", distance: "15 km" },
      { destination: "Yelahanka", distance: "20 km" },
      { destination: "Doddaballapura", distance: "23 km" },
      { destination: "Hebbal Flyover", distance: "30 km" },
    ],
  },
  {
    category: "BUSINESS & TECH CORRIDORS",
    items: [
      { destination: "Prestige Tech Cloud", distance: "11 km" },
      { destination: "Puravankara Aerocity", distance: "14 km" },
      { destination: "Foxconn Assembly Campus", distance: "15 km" },
      { destination: "Aerospace Industry Hub", distance: "15 km" },
      { destination: "Hardware Park / KIADB IT SEZ", distance: "20 km" },
      { destination: "KWIN City (Proposed)", distance: "60 km" },
    ],
  },
  {
    category: "EDUCATION & HEALTHCARE",
    items: [
      { destination: "Ramaiah Leena Hospital", distance: "2 km" },
      { destination: "Shri Shirdi Sai Hospital", distance: "3 km" },
      { destination: "Akash Institute of Medical Sciences", distance: "4 km" },
      { destination: "Harrow International School", distance: "10 km" },
      { destination: "Chanakya University", distance: "10 km" },
      { destination: "Amity International School & University", distance: "11 km" },
      { destination: "Cambridge Institute of Technology", distance: "14 km" },
    ],
  },
  {
    category: "HERITAGE, LEISURE & RETREATS",
    items: [
      { destination: "Devanahalli Fort & Town", distance: "2 km" },
      { destination: "JW Marriott Prestige Golfshire", distance: "7 km" },
      { destination: "Prestige High-End Mall (Upcoming)", distance: "10 km" },
      { destination: "Nandi Hills Lookout", distance: "20 km" },
      { destination: "Skandagiri Hills Trekking Base", distance: "22 km" },
      { destination: "Isha Foundation Chikkaballapura", distance: "32 km" },
    ],
  },
];

/**
 * Key immediate highlights shown in the right-column summary card
 */
const KEY_NEARBY_HIGHLIGHTS = [
  { destination: "NH-44 Airport Expressway", distance: "200 m" },
  { destination: "STRR (Satellite Town Ring Road)", distance: "1 km" },
  { destination: "Devanahalli Fort & Town", distance: "2 km" },
  { destination: "Prestige Tech Cloud", distance: "11 km" },
  { destination: "Kempegowda International Airport (BLR)", distance: "15 km" },
  { destination: "Nandi Hills Foothills & Sanctuary", distance: "15 km" },
];

export const LocationConnectivity: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);
  const contentColRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entrance for Two-Column Section (Map + Content)
      if (mapCardRef.current && contentColRef.current) {
        gsap.from(mapCardRef.current, {
          y: 28,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapCardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(contentColRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentColRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Connectivity Matrix reveal
      if (matrixRef.current) {
        gsap.from(`.${styles.matrixCol}`, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: matrixRef.current,
            start: "top 86%",
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
      id="location"
      className={styles.locationSection}
      aria-label="Location and Regional Connectivity"
    >
      <div className="editorial-container">
        {/* 1. Main Two-Column Layout: Responsive Embedded Map (Left) & Context / Proximities (Right) */}
        <div className={styles.mainTwoColLayout}>
          {/* Left Column: Supplied Google Maps Responsive Embed */}
          <div ref={mapCardRef} className={styles.mapCol}>
            <div className={styles.mapCard}>
              <iframe
                title="Fortune Haven Ultra Luxury Four Storey Villas - Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.4870540505685!2d77.7097017!3d13.257475399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb1e30017f8509f%3A0x36a7fc699f356f9!2sFORTUNE%20HAVEN%20-%20Ultra%20Luxury%20Four%20Storey%20Villas!5e0!3m2!1sen!2sin!4v1791712465965!5m2!1sen!2sin"
                className={styles.mapIframe}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Heading, Brochure Narrative & Key Proximate Nodes */}
          <div ref={contentColRef} className={styles.contentCol}>
            <div>
              <span className={styles.eyebrow}>LOCATION & CONNECTIVITY</span>
              <h2 className={styles.headline}>Connected to What Matters.</h2>
              <p className={styles.description}>
                Fortune Haven places you within easy reach of North Bengaluru’s key landmarks, education
                hubs, healthcare, business corridors, and the international airport. Situated directly on
                NH-207 and just 200 metres from the 6-lane NH-44 Airport Expressway, the enclave balances
                restful foothill seclusion with seamless urban access.
              </p>

              {/* Quick Proximity Pill Badges */}
              <div className={styles.quickPills}>
                <div className={styles.pillBadge}>
                  <span className={styles.pillDot} />
                  <span>NH-44 Expressway:</span>
                  <span className={styles.pillValue}>200 m</span>
                </div>
                <div className={styles.pillBadge}>
                  <span className={styles.pillDot} />
                  <span>KIA Airport (BLR):</span>
                  <span className={styles.pillValue}>15 km</span>
                </div>
                <div className={styles.pillBadge}>
                  <span className={styles.pillDot} />
                  <span>Aerospace Park:</span>
                  <span className={styles.pillValue}>15 km</span>
                </div>
                <div className={styles.pillBadge}>
                  <span className={styles.pillDot} />
                  <span>Nandi Hills:</span>
                  <span className={styles.pillValue}>20 km</span>
                </div>
              </div>

              {/* Key Nearby Highlights List */}
              <ul className={styles.keyHighlightsList} aria-label="Key Nearby Destinations">
                {KEY_NEARBY_HIGHLIGHTS.map((item, idx) => (
                  <li key={idx} className={styles.keyHighlightItem}>
                    <span className={styles.keyDestName}>{item.destination}</span>
                    <span className={styles.keyDestDist}>{item.distance}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Address Box */}
            <div className={styles.verifiedAddressCard}>
              <span className={styles.verifiedAddressTag}>REGISTERED PROJECT ADDRESS</span>
              <address className={styles.verifiedAddressBody}>
                195/59/60/5, Ward No. 9, Doddaballapura Road / NH-207,
                <br />
                Devanahalli Town, Bengaluru Rural — 562110
              </address>
            </div>
          </div>
        </div>

        {/* 2. Grouped Restrained Connectivity Matrix: 4 Clean Columns Below */}
        <div ref={matrixRef} className={styles.connectivityMatrixSection}>
          <div className={styles.matrixHeader}>
            <div>
              <span className={styles.matrixTag}>REGIONAL CONNECTIVITY MATRIX</span>
              <h3 className={styles.matrixTitle}>Verified Proximities from Fortune Haven</h3>
            </div>
            <span className={styles.matrixNote}>
              *Distances directly transcribed from client-approved brochure page 14 (subject to route verification).
            </span>
          </div>

          <div className={styles.matrixGrid}>
            {DISTANCE_NODES.map((group, idx) => (
              <div key={idx} className={styles.matrixCol}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryNumber}>0{idx + 1}</span>
                  <h4 className={styles.categoryHeading}>{group.category}</h4>
                </div>

                <ul className={styles.destinationList}>
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx} className={styles.destinationItem}>
                      <span className={styles.destTitle}>{item.destination}</span>
                      <span className={styles.destDistance}>{item.distance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
