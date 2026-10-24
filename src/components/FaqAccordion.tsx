"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FAQItem } from "@/data/faqData";
import styles from "./FaqAccordion.module.css";

interface FaqAccordionProps {
  items: FAQItem[];
  intro?: {
    eyebrow: string;
    heading: string;
    supportingText: string;
  };
  showCategories?: boolean;
  isCompact?: boolean;
  viewAllHref?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  intro,
  showCategories = false,
  isCompact = false,
  viewAllHref,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || ""]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category || "").filter(Boolean)))];

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((i) => i.category === selectedCategory);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderAnswer = (text: string) => {
    const phoneGroup = "+91 91640 16999 / +91 91801 95940";
    if (text.includes(phoneGroup)) {
      const parts = text.split(phoneGroup);
      return (
        <>
          {parts[0]}
          <span className={styles.phoneGroup}>{phoneGroup}</span>
          {parts.slice(1).join(phoneGroup)}
        </>
      );
    }
    return text;
  };

  return (
    <section id="faq" className={styles.faqSectionWrapper} aria-labelledby="faq-heading">
      <div className={styles.ambientGlow} />

      <div className="editorial-container">
        {intro && (
          <div className={styles.introBlock}>
            <div className={styles.introGrid}>
              <div className={styles.introColLeft}>
                <span className={styles.eyebrow}>{intro.eyebrow}</span>
                <h2 id="faq-heading" className={styles.sectionHeading}>
                  {intro.heading}
                </h2>
              </div>
              <div className={styles.introColRight}>
                <p className={styles.supportingText}>{intro.supportingText}</p>
              </div>
            </div>
          </div>
        )}

        {showCategories && categories.length > 2 && (
          <div className={styles.filterRow} role="tablist" aria-label="FAQ Categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`${styles.filterBtn} ${
                  selectedCategory === cat ? styles.filterBtnActive : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className={styles.accordionList}>
          {filteredItems.map((item) => {
            const isOpen = openIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`${styles.accordionItem} ${
                  isOpen ? styles.accordionItemOpen : ""
                }`}
              >
                <button
                  type="button"
                  id={`faq-btn-${item.id}`}
                  className={styles.accordionTrigger}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                >
                  <span className={styles.questionText}>{item.question}</span>

                  <div className={styles.iconWrapper} aria-hidden="true">
                    <span className={styles.plusIcon}>+</span>
                  </div>
                </button>

                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className={styles.accordionContent}
                  style={{ display: isOpen ? "block" : "none" }}
                >
                  <p className={styles.answerParagraph}>{renderAnswer(item.answer)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {isCompact && viewAllHref && (
          <div className={styles.viewAllFooter}>
            <span className={styles.viewAllNote}>
              Have more questions regarding architecture or site previews?
            </span>
            <Link href={viewAllHref} className={styles.viewAllLink}>
              <span>View Full Property FAQ ({items.length} Questions)</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
