"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BrochureModal.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
}

// Configurable brochure asset path (remains null until approved PDF is compiled)
export const CONFIGURED_BROCHURE_PDF_URL: string | null = null;

export const BrochureSection: React.FC<{ onOpenModal: () => void }> = ({
  onOpenModal,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(`.${styles.bannerContainer}`, {
        y: 35,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={styles.brochureBannerSection}
      id="brochure"
      aria-label="Brochure Presentation and Access"
    >
      <div className="editorial-container">
        <div className={styles.bannerContainer}>
          <div className={styles.bannerVisualCol}>
            <div className={styles.bannerImageFrame}>
              <Image
                src="/digital-assets/Villa Images/Brochure opening.webp"
                alt="Fortune Haven Comprehensive Architectural Brochure Preview"
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className={styles.bannerImg}
                quality={90}
              />
            </div>
            <div className={styles.bannerCornerTopLeft} />
            <div className={styles.bannerCornerBottomRight} />
          </div>

          <div className={styles.bannerContentCol}>
            <div className={styles.bannerEyebrow}>
              <span className={styles.bannerGoldDot} />
              <span className={styles.bannerEyebrowText}>ARCHITECTURAL DOSSIER</span>
            </div>

            <h3 className={styles.bannerTitle}>
              The Fortune Haven Monograph.
            </h3>

            <p className={styles.bannerDesc}>
              A comprehensive volume featuring architectural elevations, spatial
              floor distributions, landscape philosophies, and private specifications
              for the 24 villas.
            </p>

            <div className={styles.bannerActionRow}>
              <button
                type="button"
                className={styles.requestBrochureBtn}
                onClick={onOpenModal}
                aria-haspopup="dialog"
                aria-label="Request the Fortune Haven Brochure"
              >
                <span>REQUEST BROCHURE</span>
                <span className={styles.btnArrow}>→</span>
              </button>

              <span className={styles.bannerFormatTag}>
                FOLIO EDITION • PDF ARCHIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const scrollPosRef = useRef<number>(0);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "validation_preview"
  >("idle");

  const handleModalClose = useCallback(() => {
    setSubmissionStatus("idle");
    setErrors({});
    onClose();
  }, [onClose]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      scrollPosRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation: Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        handleModalClose();
      }
    },
    [isOpen, handleModalClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    const phoneClean = form.phone.replace(/[\s\-\(\)\+]/g, "");
    if (!form.phone.trim()) {
      newErrors.phone = "Please provide your phone number.";
    } else if (!/^\d{7,15}$/.test(phoneClean)) {
      newErrors.phone = "Please enter a valid phone number (7 to 15 digits).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Please provide your email address.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please provide a valid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "8a51d082-3c17-4b77-8e65-47519a286e74";

  const [modalServerError, setModalServerError] = useState<string | null>(null);
  const [modalResponse, setModalResponse] = useState<{
    referenceId?: string;
    brochureAvailable?: boolean;
    downloadUrl?: string | null;
    notice?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalServerError(null);

    if (!validate()) {
      return;
    }

    setSubmissionStatus("submitting");

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Brochure Request: ${form.fullName.trim()} (Fortune Haven)`,
        from_name: "Fortune Haven Website",
        name: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        request_type: "Architectural Brochure & Specifications",
        project: "Fortune Haven — Ultra Luxury Villas",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setModalServerError(
          data.message || "Failed to process brochure request. Please verify and retry."
        );
        setSubmissionStatus("idle");
        return;
      }

      setModalResponse({
        referenceId: `BR-${Date.now().toString(36).toUpperCase()}`,
        brochureAvailable: true,
        downloadUrl: "https://drive.google.com/file/d/1tTQSJyZFKSLqhDCpfVWPr58PtXvKkzGG/view?usp=sharing",
        notice: "Your brochure request has been received and verified. You may now access the architectural brochure.",
      });
      setSubmissionStatus("validation_preview");
    } catch {
      setModalServerError("Network error communicating with the server. Please try again.");
      setSubmissionStatus("idle");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
      onClick={handleModalClose}
    >
      <div
        ref={modalContentRef}
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <span className={styles.modalTag}>DOCUMENT REQUEST</span>
            <h3 id="brochure-modal-title" className={styles.modalTitle}>
              Receive the Fortune Haven Brochure
            </h3>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleModalClose}
            aria-label="Close dialog (Escape)"
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.modalBody}>
          {submissionStatus === "validation_preview" ? (
            <div className={styles.previewNotice} role="status">
              <div className={styles.verifiedBadge}>
                REQUEST REGISTERED • {modalResponse?.referenceId || "REF RECORDED"}
              </div>
              <h4 className={styles.previewTitle}>
                Request Confirmed for {form.fullName.split(" ")[0]}
              </h4>
              <p className={styles.previewBody}>
                {modalResponse?.notice ||
                  "Your brochure request has been validated and recorded on the server."}
              </p>

              {/* Status Notice about Server & PDF Availability */}
              <div className={styles.statusBox}>
                <div className={styles.statusRow}>
                  <span className={styles.statusKey}>Submission:</span>
                  <span className={styles.statusVal}>Verified & Dispatched</span>
                </div>
                <div className={styles.statusRow}>
                  <span className={styles.statusKey}>Document Status:</span>
                  <span className={styles.statusVal}>
                    {modalResponse?.brochureAvailable
                      ? "Official Brochure Ready"
                      : "Pending Approved File Compilation"}
                  </span>
                </div>
              </div>

              <div className={styles.downloadNotice}>
                {modalResponse?.brochureAvailable && modalResponse.downloadUrl ? (
                  <a
                    href={modalResponse.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadLinkBtn}
                  >
                    DOWNLOAD OFFICIAL BROCHURE (PDF)
                  </a>
                ) : (
                  <span className={styles.filePendingNote}>
                    * The official brochure download will be automatically delivered once
                    the approved PDF is compiled into the project archive.
                  </span>
                )}
              </div>

              <button
                type="button"
                className={styles.resetModalBtn}
                onClick={() => {
                  setSubmissionStatus("idle");
                  setForm({ fullName: "", phone: "", email: "" });
                }}
              >
                ← Back to Request Form
              </button>
            </div>
          ) : (
            <form
              className={styles.modalForm}
              onSubmit={handleSubmit}
              noValidate
            >
              {modalServerError && (
                <div className={styles.errorText} role="alert" style={{ marginBottom: "1rem" }}>
                  {modalServerError}
                </div>
              )}
              <p className={styles.formIntro}>
                Please confirm your details to receive access to the architectural
                specifications and high-resolution villa plans.
              </p>

              {/* Full Name */}
              <div className={styles.fieldGroup}>
                <label htmlFor="modal-name" className={styles.fieldLabel}>
                  FULL NAME <span className={styles.asterisk}>*</span>
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  id="modal-name"
                  value={form.fullName}
                  onChange={(e) => {
                    setForm({ ...form, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  placeholder="e.g. Eleanor Vance"
                  className={`${styles.inputField} ${
                    errors.fullName ? styles.inputError : ""
                  }`}
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && (
                  <span className={styles.errorMessage}>{errors.fullName}</span>
                )}
              </div>

              {/* Phone & Email Row */}
              <div className={styles.inputGrid}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="modal-phone" className={styles.fieldLabel}>
                    PHONE NUMBER <span className={styles.asterisk}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="+91 98765 43210"
                    className={`${styles.inputField} ${
                      errors.phone ? styles.inputError : ""
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <span className={styles.errorMessage}>{errors.phone}</span>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="modal-email" className={styles.fieldLabel}>
                    EMAIL ADDRESS <span className={styles.asterisk}>*</span>
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="eleanor@domain.com"
                    className={`${styles.inputField} ${
                      errors.email ? styles.inputError : ""
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <span className={styles.errorMessage}>{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Privacy Notice */}
              <p className={styles.privacyText}>
                Your submitted details will be used solely to respond to your
                brochure request. View our{" "}
                <Link href="/privacy-policy" className={styles.privacyLink}>
                  Privacy Policy
                </Link>
                .
              </p>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submissionStatus === "submitting"}
                className={styles.modalSubmitBtn}
              >
                <span>
                  {submissionStatus === "submitting"
                    ? "VERIFYING DETAILS..."
                    : "SUBMIT & REQUEST BROCHURE"}
                </span>
                <span className={styles.btnArrow}>→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
