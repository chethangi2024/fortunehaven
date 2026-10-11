"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ArchitecturalStory } from "@/components/ArchitecturalStory";
import { ArchitecturalOutdoor } from "@/components/ArchitecturalOutdoor";
import { InteriorExperience } from "@/components/InteriorExperience";
import { LifestyleAmenities } from "@/components/LifestyleAmenities";
import { InteractiveFloorPlans } from "@/components/InteractiveFloorPlans";
import { LocationConnectivity } from "@/components/LocationConnectivity";
import { PropertyGallery } from "@/components/PropertyGallery";
import { WhyFortuneHaven } from "@/components/WhyFortuneHaven";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FAQ_ITEMS, FAQ_INTRO } from "@/data/faqData";
import { PrivateEnquiry } from "@/components/PrivateEnquiry";
import { BrochureModal } from "@/components/BrochureModal";
import { Footer } from "@/components/Footer";

/**
 * Fortune Haven — Primary Homepage
 *
 * Approved Brochure Narrative Architecture:
 * 1. Hero: Fortune Haven identity and approved project introduction.
 * 2. The Fortune Haven Experience: Brochure p. 2 (4-BHK living, 4,281 sq ft, privacy, family spaces, approvals).
 * 3. Architecture & Outdoor Living: Brochure pp. 3–4 (contemporary facade, private gardens, 4 balconies, terrace).
 * 4. Interiors: Brochure pp. 7–10 (living spaces, kitchen, bedrooms, 2nd-floor retreat).
 * 5. Lifestyle, Clubhouse & Community: Brochure pp. 5–6 & 13 (clubhouse, pool, recreational amenities).
 * 6. Floor Plans & Materials: Brochure pp. 11–12 (4 levels, 4,281 sq ft, 2,800 sq ft UDS, specifications matrix).
 * 7. Location & Connectivity: Brochure p. 14 (exact distances, NH-207, NH-44, airport, business corridors).
 * 8. Property Gallery: Curated visual gallery of the actual estate.
 * 9. Why Fortune Haven?: Brochure p. 15 (10 approved reasons & developer credibility).
 * 10. Book a Private Viewing: Brochure p. 16 (Model villa ready, official phones/WhatsApp, enquiry form).
 * 11. Useful FAQs & Footer.
 */
export default function Home() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const handleEnquireScroll = () => {
    const el = document.getElementById("enquire");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* Navigation */}
      <Header onTourClick={handleEnquireScroll} />

      {/* 1. Hero: Approved identity & intro */}
      <Hero />

      {/* 2. The Fortune Haven Experience (Brochure p. 2) */}
      <ArchitecturalStory />

      {/* 3. Architecture & Outdoor Living (Brochure pp. 3–4) */}
      <ArchitecturalOutdoor />

      {/* 4. Interiors (Brochure pp. 7–10) */}
      <InteriorExperience />

      {/* 5. Lifestyle, Clubhouse & Community (Brochure pp. 5–6, 13) */}
      <LifestyleAmenities />

      {/* 6. Floor Plans & Materials (Brochure pp. 11–12) */}
      <InteractiveFloorPlans />

      {/* 7. Location & Connectivity (Brochure p. 14) */}
      <LocationConnectivity />

      {/* Curated Gallery */}
      <PropertyGallery />

      {/* 8. Why Fortune Haven? (Brochure p. 15) */}
      <WhyFortuneHaven />

      {/* 9. Book a Private Viewing (Brochure p. 16) */}
      <PrivateEnquiry />

      {/* FAQs */}
      <FaqAccordion
        items={FAQ_ITEMS.slice(0, 5)}
        intro={FAQ_INTRO}
        isCompact={true}
        viewAllHref="/faq"
      />

      {/* Footer */}
      <Footer onBrochureClick={() => setIsBrochureOpen(true)} />

      {/* Brochure Request Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />
    </main>
  );
}
