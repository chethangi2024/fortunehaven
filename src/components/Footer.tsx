"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FOOTER_NAV_ITEMS,
  FOOTER_ADDITIONAL_ITEMS,
  FOOTER_LEGAL_ITEMS,
} from "@/data/navigation";
import styles from "./Footer.module.css";

interface FooterProps {
  onBrochureClick?: () => void;
}

// All 11 navigation links: Home, Experience, Architecture, Interiors, Clubhouse, Floor Plans, Location, Why Us, Enquire, FAQ, Gallery
const EXPLORE_ITEMS = [...FOOTER_NAV_ITEMS, ...FOOTER_ADDITIONAL_ITEMS];

export const Footer: React.FC<FooterProps> = () => {
  const currentYear = 2026;
  const pathname = usePathname();

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      if (window.location.hash) {
        window.history.pushState(null, "", "/");
      }
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("fortunehaven:reset-hero"));
    }
  };

  const handleLinkClick = (href: string, e?: React.MouseEvent) => {
    if (href === "/" && pathname === "/") {
      if (e) e.preventDefault();
      if (window.location.hash) {
        window.history.pushState(null, "", "/");
      }
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("fortunehaven:reset-hero"));
    }
  };

  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Site Footer">
      <div className="editorial-container">
        {/* Three-Column Editorial Monograph Grid */}
        <div className={styles.footerGrid}>
          {/* Column 1: Brand */}
          <div className={styles.brandCol}>
            <Link
              href="/"
              className={styles.logoLink}
              aria-label="Return to top of Fortune Haven"
              onClick={handleHomeClick}
            >
              <div className={styles.logoWrapper}>
                <Image
                  src="/digital-assets/Logo/Logo 1.png"
                  alt="Fortune Haven Ultra Luxury Villas"
                  width={2000}
                  height={359}
                  className={styles.logoImg}
                />
              </div>
            </Link>

            <p className={styles.closingStatement}>
              “A more considered way of living, shaped by vertical space, architecture, and
              the quiet presence of the Nandi Hills foothills.”
            </p>

            <div className={styles.coordinatesBlock}>
              <span className={styles.coordText}>13.3702° N, 77.6835° E • NH-207 ARTERIAL CORRIDOR</span>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className={styles.navCol}>
            <span className={styles.colTitle}>EXPLORE</span>
            <ul className={styles.exploreList} aria-label="Explore Fortune Haven navigation links">
              {EXPLORE_ITEMS.map((item) => (
                <li key={item.label} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    onClick={(e) => handleLinkClick(item.href, e)}
                  >
                    <span className={styles.linkArrow}>›</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Brochure & Enquiries */}
          <div className={styles.actionCol}>
            <span className={styles.colTitle}>ARCHITECTURAL DOSSIER</span>
            <p className={styles.actionDesc}>
              Access the high-resolution monograph detailing elevations, floor plan
              distributions, and spatial specifications.
            </p>

            <a
              href="https://drive.google.com/file/d/1S53qSMtEWk8EcJMRrPClwETjxDD1E5mS/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.brochureBtn}
              aria-label="Download the Fortune Haven Architectural Brochure in a new tab"
            >
              <span>DOWNLOAD BROCHURE</span>
              <span className={styles.btnArrow}>→</span>
            </a>

            <div className={styles.supportNote}>
              <span>ENQUIRIES MANAGED DIRECTLY BY THE DEVELOPER</span>
            </div>
          </div>
        </div>

        {/* Subtle Divider between main footer content and bottom content */}
        <div className={styles.footerDivider} aria-hidden="true" />

        {/* Property Disclaimer */}
        <div className={styles.propertyDisclaimer}>
          <p className={styles.disclaimerParagraph}>
            <strong>Disclaimer:</strong> Architectural renderings, visualisations, model villa representations, and interior furnishings shown across this website are artistic impressions and indicative for illustrative purposes only. Villa specifications, dimensions, amenities, layouts, and materials are subject to the applicable approved architectural plans and sanction documents. Distances, travel times, and regional connectivity metrics are approximate and may vary depending on routes, traffic conditions, and infrastructural developments. Prospective purchasers are advised to verify all project details directly with the developer before entering into any transaction.
          </p>
        </div>

        {/* Bottom Legal & Regulatory Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyrightRow}>
            <span>
              © {currentYear} Fortune Haven. All rights reserved.
            </span>
          </div>

          <div className={styles.legalLinks}>
            {FOOTER_LEGAL_ITEMS.map((item, idx) => (
              <React.Fragment key={item.label}>
                {idx > 0 && <span className={styles.legalSep}>•</span>}
                <Link href={item.href} className={styles.legalLink}>
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
