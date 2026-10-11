# Fortune Haven — Privacy & DPDP Act 2023 Readiness Checklist
*Internal Implementation Document — Not for Public Display*

This document provides a privacy-by-design baseline for Fortune Haven in alignment with the **Digital Personal Data Protection Act, 2023 (India)** and the **DPDP Rules, 2025** officially notified by the Ministry of Electronics and Information Technology (MeitY).

---

## 1. Data Inventory & Form Flow Analysis

| Form Field | Form Location | Purpose of Processing | Lawful Basis | Target Storage (Production) | Retention Baseline |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Full Name** | Consultation / Brochure | Verification of inquirer & personalization of advisory | Consent (Itemized) | Encrypted CRM / Postgres DB | Duration of active dialogue + statutory limit |
| **Phone Number** | Consultation / Brochure | Direct telephonic or WhatsApp consultation as requested | Consent (Itemized) | Encrypted CRM / Postgres DB | Duration of active dialogue |
| **Email Address** | Consultation / Brochure | Delivery of brochure & written advisory records | Consent (Itemized) | Encrypted CRM / Postgres DB | Duration of active dialogue |
| **Contact Method** | Consultation | Recording user preference (Call vs WhatsApp) | Consent (Itemized) | CRM metadata | Retained with inquiry |
| **Enquiry Type** | Consultation | Routing inquiry to appropriate sales or architectural desk | Legitimate use / Consent | CRM metadata | Retained with inquiry |
| **Message** | Consultation | Optional notes regarding specific villa needs | Consent | CRM notes | Retained with inquiry |
| **Marketing Opt-In**| Both Forms | *Optional* future residential updates | Explicit Unbundled Consent | Consent Log (Auditable) | Purged immediately on withdrawal |

---

## 2. Technical Form Processing & Security Checklist

- [x] **No Client-Side Secrets**: All form handling strictly decoupled from hardcoded API tokens.
- [x] **Strict Input Validation**: Client-side regex for international/Indian phone formats (7–15 digits) and standard email validation.
- [ ] **Server-Side Sanitization & Validation**: Must be mirrored on the server route handler before database insertion. *(Pending backend route creation)*.
- [ ] **HTTPS Enforcement**: TLS 1.3 encryption on production edge with HSTS headers.
- [ ] **Rate Limiting & Spam Shield**: Implementation of IP-based token bucket or honeypot fields to prevent denial-of-service and bot spam.
- [ ] **No Personal Data in Query Parameters**: Ensure GET redirects never contain phone numbers or names.
- [ ] **Console Log Hygiene**: No sensitive form contents dumped into `console.log` in production builds.

---

## 3. Consent & Notice Architecture (DPDP Rules 2025)

- [x] **Notice Accompanying or Preceding Consent**: Every form displays an itemized notice explaining why data is collected and linking to `/privacy-policy`.
- [x] **Unbundled Marketing**: Optional promotional consent is separated into a distinct, unchecked checkbox. Submitting the primary inquiry never forces marketing consent.
- [x] **Audit Trail Architecture**: Backend must log: `data_principal_id`, `consent_type`, `version_timestamp`, and `ip_hash` to prove valid consent.
- [ ] **Ease of Withdrawal**: Build a dedicated self-service or one-click email unsubscribe/withdrawal route (`/api/privacy/withdraw`).

---

## 4. Rights of Data Principals & Grievance Mechanism

Under the DPDP framework, data principals possess statutory rights that must be operationalized:
1. **Right to Access Information**: Ability to retrieve a summary of personal data processed.
2. **Right to Correction & Erasure**: Mechanism to update outdated phone/email details or erase records once an inquiry terminates.
3. **Right of Grievance Redressal**: Must designate an accessible Grievance Officer whose name and contact email are published.
4. **Response Timelines**: Operational SLA to respond to data principal grievances within the statutory window specified by DPDP Rules.

---

## 5. Third-Party Processors & Cross-Border Data Transfers

- **Current State**: Zero third-party analytics (Google Analytics, Meta Pixel, etc.) or tracking scripts exist in `package.json` or `layout.tsx`.
- **Infrastructure**: Next.js deployed on modern edge/Vercel or AWS Mumbai region (`ap-south-1`).
- **Vendor Due Diligence**: Any future CRM (HubSpot, Salesforce, Zoho) or transactional mailer (Resend, AWS SES) must execute a Data Processing Agreement (DPA) under the DPDP Act.

---

## 6. Pre-Launch Legal Confirmation Checklist

Before commencing commercial operations, the following must be formally approved by an Indian legal practitioner:
1. Exact legal name of the entity collecting enquiries (confirming whether it is Cannas Lily Infrastructure Pvt. Ltd. or a dedicated project LLP/SPV).
2. Physical registered address and corporate identification number (CIN/LLPIN).
3. Formal appointment and contact details of the Grievance Officer.
4. Official RERA registration certificate details once sanctioned.
5. Final data retention schedule approved by management.
