export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_INTRO = {
  eyebrow: "YOUR QUESTIONS, CONSIDERED",
  heading: "A Few Things Worth Knowing.",
  supportingText:
    "Explore essential information about Fortune Haven, its architecture, spaces and the next steps in discovering the property.",
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "what-is-fortune-haven",
    question: "What is Fortune Haven?",
    answer:
      "Fortune Haven is an exclusive gated residential enclave developed by Cannas Lily Infrastructure Pvt. Ltd., featuring twenty-four bespoke four-storey private residences thoughtfully envisioned for a life shaped by vertical space, calm seclusion, and refined architectural distinction.",
    category: "Project & Vision",
  },
  {
    id: "location",
    question: "Where is Fortune Haven located?",
    answer:
      "Fortune Haven is positioned along the NH-207 arterial corridor in the serene foothills of the Nandi Hills region, Bengaluru Rural, Karnataka. The setting combines natural foothill tranquility with direct regional connectivity to the NH-7 / Airport Expressway, Kempegowda International Airport (BLR), and North Bengaluru.",
    category: "Location",
  },
  {
    id: "villa-count",
    question: "How many villas are planned at Fortune Haven?",
    answer:
      "The enclave is deliberately limited to twenty-four (24) private residences, preserving acoustic privacy, expansive site buffers, and an intimate community atmosphere.",
    category: "Project & Vision",
  },
  {
    id: "distinctive-features",
    question: "What makes the villas distinctive?",
    answer:
      "Each residence is conceived as a multi-tier vertical sanctuary spanning four levels (G+3 elevation). Key architectural signatures include double-height living salons, private elevator access across all floors, expansive rooftop viewing terraces, private gardens, and generous glass openings framing verdant foothill horizons.",
    category: "Architecture",
  },
  {
    id: "floor-levels",
    question: "What are the different floor levels?",
    answer:
      "The villas are organized into four dedicated tiers:\n• Level 01 (Basement/Stilt): Covered multi-vehicle parking bay, private home office/utility studio, arrival garden, and elevator core.\n• Level 02 (Ground Floor): Double-height living salon, dining area, open gourmet kitchen, guest suite, and private yard.\n• Level 03 (First Floor): Primary master bedroom sanctuary with dressing room and ensuite, family lounge, and private planter terrace.\n• Level 04 (Second Floor): Two ensuite bedroom suites, secondary TV lounge, view-framing balconies, and double-height architectural overlook.",
    category: "Architecture",
  },
  {
    id: "outdoor-spaces",
    question: "Do the villas include private outdoor spaces?",
    answer:
      "Yes. Every villa incorporates multiple private open-air settings, including landscaped entrance gardens, private ground-level yards, deep shaded bedroom balconies, open mid-level planter terraces, and a private rooftop lookout terrace with open views toward the Nandi Hills and Skandagiri ridgelines.",
    category: "Architecture",
  },
  {
    id: "lifestyle-amenities",
    question: "What lifestyle amenities are shown in the project?",
    answer:
      "Confirmed project amenities include a swimming pool with shallow lounging shelf and stone sun deck, a resident social clubhouse, a dedicated quiet library/study sanctum, landscaped perimeter pathways, and private rooftop entertaining zones.",
    category: "Lifestyle",
  },
  {
    id: "explore-floor-plans",
    question: "How can I explore the floor plans?",
    answer:
      "You can explore the interactive floor plans directly on the homepage in the 'Interactive Floor Plans' section, which allows you to toggle through all four levels and examine detailed spatial layouts and architectural specifications.",
    category: "Exploration",
  },
  {
    id: "request-brochure",
    question: "How can I request the property brochure?",
    answer:
      "You can request the comprehensive architectural monograph via the 'Request Brochure' button located in the navigation header, brochure section, or footer. After submitting your verified contact details, an instant access link to the high-resolution PDF document is provided.",
    category: "Exploration",
  },
  {
    id: "site-visit",
    question: "Can I arrange a site visit?",
    answer:
      "Private previews and on-site consultations are coordinated individually through the Private Enquiry form. Because Fortune Haven is an exclusive private enclave with ongoing site preparations, visits are scheduled by appointment only. Our advisory team will confirm arrangements upon reviewing your inquiry.",
    category: "Enquiry & Visits",
  },
  {
    id: "contact-team",
    question: "How can I contact the Fortune Haven team?",
    answer:
      "You can connect directly with our advisory team through the Private Enquiry form on this website or by submitting a formal brochure request. Our representatives will respond with bespoke guidance regarding architectural details and consultation scheduling.",
    category: "Enquiry & Visits",
  },
  {
    id: "more-information",
    question: "Where can I find more information about the project?",
    answer:
      "Detailed visual galleries, architectural narratives, connectivity maps, and legal disclosures are published across this website. For statutory queries or specific architectural queries not yet published, please submit an enquiry to receive official documentation directly from Cannas Lily Infrastructure Pvt. Ltd.",
    category: "Enquiry & Visits",
  },
];
