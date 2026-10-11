"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HEADER_NAV_ITEMS, MOBILE_NAV_ITEMS } from "@/data/navigation";
import styles from "./Header.module.css";

interface HeaderProps {
  onTourClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onTourClick }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    if (pathname === "/") {
      e.preventDefault();
      // Remove any trailing hash from URL without reloading
      if (window.location.hash) {
        window.history.pushState(null, "", "/");
      }
      // Immediate scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      // Notify hero component to reset timeline to scene 1
      window.dispatchEvent(new CustomEvent("fortunehaven:reset-hero"));
    }
    // If on another route, Next.js Link navigates to "/" and page scroll handles resetting to top
  };

  const handleLinkClick = (href: string, e?: React.MouseEvent) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    if (href === "/") {
      if (pathname === "/") {
        if (e) e.preventDefault();
        if (window.location.hash) {
          window.history.pushState(null, "", "/");
        }
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        window.dispatchEvent(new CustomEvent("fortunehaven:reset-hero"));
      }
    }
  };

  const handleEnquireAction = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    if (onTourClick) {
      onTourClick();
    } else {
      const enquireElement = document.getElementById("enquire");
      if (enquireElement) {
        enquireElement.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/#enquire");
      }
    }
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
        role="banner"
      >
        <div className={styles.headerContainer}>
          {/* Brand Logo: Seamless dual rendering for transparent (light) and scrolled (dark) surfaces */}
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="Fortune Haven Home"
            onClick={handleHomeClick}
          >
            <div className={styles.logoWrapper}>
              <Image
                src="/digital-assets/Logo/Logo 1.png"
                alt="Fortune Haven Ultra Luxury Four-Storey Villas"
                width={2000}
                height={359}
                priority
                className={`${styles.logoImage} ${styles.logoLight}`}
              />
              <Image
                src="/digital-assets/Logo/Logo.png"
                alt="Fortune Haven Ultra Luxury Four-Storey Villas"
                width={2000}
                height={359}
                priority
                className={`${styles.logoImage} ${styles.logoDark}`}
              />
            </div>
          </Link>

          {/* Editorial Desktop Navigation: items 1-8 */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <ul className={styles.navList}>
              {HEADER_NAV_ITEMS.map((item) => (
                <li key={item.label} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    onClick={(e) => handleLinkClick(item.href, e)}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Area: Item 9 (Enquire) Call to Action */}
          <div className={styles.actionArea}>
            <button
              type="button"
              className={styles.ctaButton}
              onClick={handleEnquireAction}
              aria-label="Enquire for Fortune Haven Private Villas"
            >
              <span className={styles.ctaText}>Enquire</span>
              <span className={styles.ctaIndicator} />
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              className={`${styles.menuTrigger} ${
                mobileMenuOpen ? styles.menuActive : ""
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu: All 9 primary items */}
      <div
        className={`${styles.mobileDrawer} ${
          mobileMenuOpen ? styles.drawerOpen : ""
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className={styles.drawerBackdrop} onClick={() => setMobileMenuOpen(false)} />
        <div className={styles.drawerContent}>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerEyebrow}>FORTUNE HAVEN</span>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <ul className={styles.mobileNavList}>
            {MOBILE_NAV_ITEMS.map((item, index) => (
              <li key={item.label} className={styles.mobileNavItem}>
                <Link
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={(e) => handleLinkClick(item.href, e)}
                >
                  <span className={styles.mobileNavIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.drawerFooter}>
            <button
              type="button"
              className={styles.drawerCtaBtn}
              onClick={handleEnquireAction}
            >
              Request A Private Tour
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
