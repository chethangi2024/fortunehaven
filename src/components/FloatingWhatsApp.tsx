import React from "react";
import styles from "./FloatingWhatsApp.module.css";

export const FloatingWhatsApp: React.FC = () => {
  // Direct WhatsApp link format for phone number +91 91801 95940 with URL encoded prefilled query
  const whatsappUrl =
    "https://wa.me/919180195940?text=Hello%20Fortune%20Haven%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20the%20villas.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatingBtn}
      aria-label="Chat with Fortune Haven on WhatsApp (+91 91801 95940)"
      title="Chat on WhatsApp (+91 91801 95940)"
    >
      <svg
        viewBox="0 0 24 24"
        className={styles.icon}
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.94 7.37C8.76 7.37 8.46 7.44 8.21 7.71C7.96 7.99 7.25 8.65 7.25 10C7.25 11.35 8.23 12.65 8.37 12.84C8.51 13.03 10.28 15.75 13 16.92C13.65 17.2 14.15 17.37 14.55 17.49C15.2 17.7 15.79 17.67 16.26 17.6C16.78 17.52 17.87 16.94 18.1 16.29C18.33 15.64 18.33 15.08 18.26 14.96C18.19 14.85 18.01 14.78 17.74 14.64C17.47 14.51 16.14 13.85 15.89 13.76C15.65 13.67 15.47 13.62 15.3 13.89C15.12 14.16 14.62 14.74 14.47 14.91C14.32 15.08 14.17 15.1 13.9 14.97C13.63 14.83 12.76 14.55 11.72 13.63C10.91 12.91 10.36 12.02 10.2 11.75C10.05 11.48 10.18 11.33 10.32 11.19C10.44 11.07 10.59 10.88 10.73 10.72C10.87 10.56 10.91 10.44 11 10.26C11.09 10.08 11.05 9.92 10.98 9.79C10.91 9.65 10.36 8.31 10.13 7.76C9.91 7.23 9.68 7.3 9.51 7.29C9.35 7.28 9.17 7.28 8.99 7.28L8.94 7.37Z" />
      </svg>
      <span className={styles.label}>WhatsApp</span>
    </a>
  );
};
