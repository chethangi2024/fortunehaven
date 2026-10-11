"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PrivateEnquiry.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  contactMethod: "Phone Call" | "WhatsApp";
  enquiryType: "Property Details" | "Floor Plans" | "Site Visit" | "General Enquiry";
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
}

export const PrivateEnquiry: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
    contactMethod: "Phone Call",
    enquiryType: "Property Details",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "validation_preview"
  >("idle");

  // GSAP Entrance
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

      // Staggered reveal for two columns
      gsap.from(leftColRef.current, {
        y: 35,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(formCardRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formCardRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    // Phone validation: allows Indian 10-digit mobile (+91 optional) or general international numbers (7-15 digits)
    const phoneClean = form.phone.replace(/[\s\-\(\)\+]/g, "");
    if (!form.phone.trim()) {
      newErrors.phone = "Please provide your phone number.";
    } else if (!/^\d{7,15}$/.test(phoneClean)) {
      newErrors.phone = "Please enter a valid phone number (7 to 15 digits).";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Please provide your email address.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please provide a valid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionResponse, setSubmissionResponse] = useState<{
    referenceId?: string;
    timestamp?: string;
    inquiryStatus?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setSubmissionStatus("submitting");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(
          data.error || "Failed to submit enquiry. Please verify details and try again."
        );
        setSubmissionStatus("idle");
        return;
      }

      setSubmissionResponse(data.data || null);
      setSubmissionStatus("validation_preview");
    } catch {
      setServerError("Network error communicating with enquiry server. Please retry.");
      setSubmissionStatus("idle");
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.enquirySection}
      aria-label="Private Property Enquiry"
      id="enquire"
    >
      {/* Ambient Atmospheric Sheen */}
      <div className={styles.transitionGlow} />

      <div className="editorial-container">
        {/* Section Heading & Intro */}
        <div className={styles.introBlock}>
          <div className={styles.introGrid}>
            <div className={styles.introColLeft}>
              <span className={styles.eyebrow}>BOOK A PRIVATE VIEWING</span>
              <h2 className={styles.headline}>Book a Private Viewing.</h2>
            </div>

            <div className={styles.introColRight}>
              <p className={styles.description}>
                Discover the experience of a fully furnished four-storey model villa in Devanahalli,
                ready for inspection. Schedule a private guided walk-through or request detailed
                specifications directly from our development team.
              </p>

              <div className={styles.viewingChannels}>
                <span className={styles.chanItem}>Model Villa Ready</span>
                <span className={styles.chanDot}>•</span>
                <span className={styles.chanItem}>Call/WhatsApp: +91 91640 16999</span>
                <span className={styles.chanDot}>•</span>
                <span className={styles.chanItem}>sales@fortunehavens.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Consultation Layout */}
        <div className={styles.enquiryLayoutGrid}>
          {/* Notes / Contact Information Column */}
          <div ref={leftColRef} className={styles.leftCol}>
            <div className={styles.leftColNotes}>
              <div className={styles.noteItem}>
                <span className={styles.noteNumber}>01</span>
                <div className={styles.noteTextGroup}>
                  <h4 className={styles.noteTitle}>SCHEDULE A PRIVATE VISIT</h4>
                  <p className={styles.noteDesc}>
                    Fully furnished model villa ready for inspection at Devanahalli Town.
                    Experience all four levels, private lift, and rooftop views first-hand.
                  </p>
                </div>
              </div>

              <div className={styles.noteItem}>
                <span className={styles.noteNumber}>02</span>
                <div className={styles.noteTextGroup}>
                  <h4 className={styles.noteTitle}>DIRECT CALL & WHATSAPP</h4>
                  <p className={styles.noteDesc}>
                    Reach our advisory desk directly at{" "}
                    <a href="tel:+919164016999" className={styles.contactLink}>
                      +91 91640 16999
                    </a>{" "}
                    or{" "}
                    <a href="tel:+919180195940" className={styles.contactLink}>
                      +91 91801 95940
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className={styles.noteItem}>
                <span className={styles.noteNumber}>03</span>
                <div className={styles.noteTextGroup}>
                  <h4 className={styles.noteTitle}>OFFICIAL PROJECT EMAIL</h4>
                  <p className={styles.noteDesc}>
                    Inquiries and documentation:{" "}
                    <a href="mailto:sales@fortunehavens.com" className={styles.contactLink}>
                      sales@fortunehavens.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.desktopImageCard}>
              <div className={styles.imageInner}>
                <Image
                  src="/digital-assets/Villa Images/Sunlit Rooftop Terrace with Mountain Views.png"
                  alt="Fortune Haven Private Sunlit Rooftop Terrace Overlooking Nandi Hills"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 680px"
                  className={styles.editorialImg}
                  quality={92}
                />
              </div>

              <div className={styles.imageOverlayTag}>
                <span className={styles.overlayDot} />
                <span className={styles.overlayText}>NANDI HILLS FOOTHILLS • NH-207</span>
              </div>
            </div>
          </div>

          {/* Right Column: Integrated Editorial Form */}
          <div ref={formCardRef} className={styles.rightCol}>
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Request a Private Consultation</h3>
                <p className={styles.formSubtitle}>
                  Please complete the form below to receive personalized assistance.
                </p>
              </div>

              {submissionStatus === "validation_preview" ? (
                /* Verified Submission Card backed by /api/enquiry */
                <div className={styles.pendingNoticeCard} role="status">
                  <div className={styles.noticeBadge}>ENQUIRY REGISTERED • {submissionResponse?.referenceId || "REF RECORDED"}</div>
                  <h4 className={styles.noticeTitle}>
                    Thank You, {form.fullName.split(" ")[0]}
                  </h4>
                  <p className={styles.noticeBody}>
                    Your private enquiry has been verified and logged with the Fortune Haven advisory desk under reference{" "}
                    <strong>{submissionResponse?.referenceId}</strong>.
                    {submissionResponse?.inquiryStatus === "recorded_pending_mail_relay" && (
                      <span> Note: In local development, the submission has been validated and recorded on the server; external email transmission remains pending mail provider API key configuration.</span>
                    )}
                  </p>
                  <div className={styles.summaryBox}>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryKey}>Reference ID:</span>
                      <span className={styles.summaryVal}>{submissionResponse?.referenceId}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryKey}>Preferred Contact:</span>
                      <span className={styles.summaryVal}>
                        {form.contactMethod} ({form.phone})
                      </span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryKey}>Enquiry Type:</span>
                      <span className={styles.summaryVal}>{form.enquiryType}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryKey}>Registered Email:</span>
                      <span className={styles.summaryVal}>{form.email}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.resetBtn}
                    onClick={() => {
                      setSubmissionStatus("idle");
                      setForm({
                        fullName: "",
                        phone: "",
                        email: "",
                        contactMethod: "Phone Call",
                        enquiryType: "Property Details",
                        message: "",
                      });
                    }}
                  >
                    Edit / Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form
                  className={styles.enquiryForm}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Full Name */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="fullName" className={styles.fieldLabel}>
                      FULL NAME <span className={styles.requiredAsterisk}>*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={form.fullName}
                      onChange={(e) => {
                        setForm({ ...form, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      placeholder="e.g. Alexander Wright"
                      className={`${styles.inputField} ${errors.fullName ? styles.inputError : ""}`}
                      aria-required="true"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    />
                    {errors.fullName && (
                      <span id="fullName-error" className={styles.errorMessage}>
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone & Email Row */}
                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="phone" className={styles.fieldLabel}>
                        PHONE NUMBER <span className={styles.requiredAsterisk}>*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={(e) => {
                          setForm({ ...form, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder="+91 98765 43210"
                        className={`${styles.inputField} ${errors.phone ? styles.inputError : ""}`}
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {errors.phone && (
                        <span id="phone-error" className={styles.errorMessage}>
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="email" className={styles.fieldLabel}>
                        EMAIL ADDRESS <span className={styles.requiredAsterisk}>*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="alexander@domain.com"
                        className={`${styles.inputField} ${errors.email ? styles.inputError : ""}`}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <span id="email-error" className={styles.errorMessage}>
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>PREFERRED CONTACT METHOD</span>
                    <div className={styles.radioGroup} role="radiogroup" aria-label="Preferred Contact Method">
                      <label
                        className={`${styles.radioCard} ${
                          form.contactMethod === "Phone Call" ? styles.radioSelected : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value="Phone Call"
                          checked={form.contactMethod === "Phone Call"}
                          onChange={() => setForm({ ...form, contactMethod: "Phone Call" })}
                          className={styles.radioInput}
                        />
                        <span className={styles.radioDot} />
                        <span className={styles.radioText}>Phone Call</span>
                      </label>

                      <label
                        className={`${styles.radioCard} ${
                          form.contactMethod === "WhatsApp" ? styles.radioSelected : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value="WhatsApp"
                          checked={form.contactMethod === "WhatsApp"}
                          onChange={() => setForm({ ...form, contactMethod: "WhatsApp" })}
                          className={styles.radioInput}
                        />
                        <span className={styles.radioDot} />
                        <span className={styles.radioText}>WhatsApp</span>
                      </label>
                    </div>
                  </div>

                  {/* Enquiry Type */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="enquiryType" className={styles.fieldLabel}>
                      ENQUIRY TYPE
                    </label>
                    <div className={styles.selectWrapper}>
                      <select
                        id="enquiryType"
                        name="enquiryType"
                        value={form.enquiryType}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            enquiryType: e.target.value as FormState["enquiryType"],
                          })
                        }
                        className={styles.selectField}
                      >
                        <option value="Property Details">Property Details</option>
                        <option value="Floor Plans">Floor Plans & Architectural Dossier</option>
                        <option value="Site Visit">Private Site Visit</option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                      <span className={styles.selectArrow}>▾</span>
                    </div>
                  </div>

                  {/* Message (Optional) */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="message" className={styles.fieldLabel}>
                      MESSAGE <span className={styles.optionalTag}>(OPTIONAL)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share any specific requirements or preferred timing for a conversation..."
                      className={styles.textareaField}
                    />
                  </div>

                  {/* Privacy Notice */}
                  <p className={styles.privacyNotice}>
                    Your submitted details will be used solely to respond to your
                    enquiry. Read our{" "}
                    <Link href="/privacy-policy" className={styles.privacyLink}>
                      Privacy Policy
                    </Link>
                    .
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submissionStatus === "submitting"}
                    className={styles.submitBtn}
                  >
                    <span>
                      {submissionStatus === "submitting"
                        ? "VERIFYING DETAILS..."
                        : "SUBMIT PRIVATE ENQUIRY"}
                    </span>
                    <span className={styles.btnArrow}>→</span>
                  </button>
                </form>
              )}
            </div>

            {/* Mobile Supporting Image: Positioned below form on mobile */}
            <div className={styles.mobileImageCard}>
              <div className={styles.imageInner}>
                <Image
                  src="/digital-assets/Villa Images/Sunlit Rooftop Terrace with Mountain Views.png"
                  alt="Fortune Haven Private Sunlit Rooftop Terrace Overlooking Nandi Hills"
                  fill
                  sizes="(max-width: 768px) 100vw, 680px"
                  className={styles.editorialImg}
                  quality={92}
                />
              </div>

              <div className={styles.imageOverlayTag}>
                <span className={styles.overlayDot} />
                <span className={styles.overlayText}>NANDI HILLS FOOTHILLS • NH-207</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
