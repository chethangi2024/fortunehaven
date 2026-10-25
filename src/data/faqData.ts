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
      "Fortune Haven is an exclusive gated enclave of twenty-four Ultra Luxury private residences in Devanahalli, Bengaluru Rural, developed by Cannas Lily Infrastructure Pvt. Ltd. (JCN Group). Each villa features four thoughtfully planned levels with a built-up area of 4,281 sq ft and an undivided land share (UDS) of 2,800 sq ft.",
    category: "Project & Vision",
  },
  {
    id: "approvals-status",
    question: "What approvals does Fortune Haven have, and is it ready to move in?",
    answer:
      "Fortune Haven has obtained building plan approval and Occupancy Certificate (OC) from BIAAPA. The project is RERA-approved, and individual villa Khata documentation is ready. The residences are ready to move in, and a fully furnished model villa is available on-site for prospective buyers to inspect.",
    category: "Project & Vision",
  },
  {
    id: "location-connectivity",
    question: "Where is Fortune Haven located and what is the connectivity?",
    answer:
      "Fortune Haven is situated adjacent to NH-207 and just 200 m from NH-44 in Devanahalli Town, Bengaluru North (Pin: 562110). It is 1 km from the STRR (Satellite Town Ring Road), 15 km from Kempegowda International Airport, 15 km from the Aerospace Industry Hub, and 20 km from Nandi Hills.",
    category: "Location",
  },
  {
    id: "floor-levels",
    question: "What are the different floor levels?",
    answer:
      "Level 01 — Basement: Covered three-car parking, EV charging point, home office / utility room, private lift, staircase.\n\nLevel 02 — Ground Floor: Double-height living, dining area, kitchen, one bedroom, private lawn, private yard, sit-out.\n\nLevel 03 — First Floor: Two bedrooms with attached dressing areas and bathrooms, central TV lounge, private balconies.\n\nLevel 04 — Second Floor: Master bedroom with dressing area and attached bathroom, family lounge, spacious balcony.",
    category: "Architecture",
  },
  {
    id: "amenities",
    question: "What shared clubhouse and enclave amenities are provided?",
    answer:
      "Fortune Haven provides a dedicated clubhouse and community amenities including a swimming pool, jacuzzi, sauna, gymnasium, squash court, billiards & table tennis, chess & carrom lounge, restaurant, spiritual spaces, dedicated work space, EV charging infrastructure, and 24/7 CCTV surveillance.",
    category: "Lifestyle",
  },
  {
    id: "outdoor-spaces",
    question: "What private outdoor spaces does each villa have?",
    answer:
      "Each Ultra Luxury Villa includes a private front lawn, a landscaped backyard garden, a quiet sit-out, four private balconies, and a spacious open-air rooftop balcony terrace framing views of the Nandi Hills.",
    category: "Architecture",
  },
  {
    id: "parking-lift",
    question: "Is there private elevator access and dedicated car parking?",
    answer:
      "Yes. Every villa includes an individual private lift serving all four levels from basement to the second floor, as well as a spacious 3-car basement parking bay with EV charging provision.",
    category: "Architecture",
  },
  {
    id: "site-visit",
    question: "Can I visit the property and inspect the model villa?",
    answer:
      "Yes. A fully furnished Ultra Luxury model villa is ready on-site in Devanahalli. You can schedule a private viewing by submitting the enquiry form on this website or by contacting the sales team at +91 91640 16999 / +91 91801 95940.",
    category: "Enquiry & Visits",
  },
  {
    id: "request-brochure",
    question: "How can I obtain the official Fortune Haven brochure?",
    answer:
      "You can request the brochure through the 'Request Brochure' button in the navigation header or by submitting your contact details in the brochure request form on this website.",
    category: "Enquiry & Visits",
  },
];
