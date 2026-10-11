import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fortunehaven.com";

  const content = `# Fortune Haven — Ultra-Luxury Four-Storey Villas
> A private collection of 24 ultra-luxury four-storey villas nestled in the tranquil foothills of Nandi Hills along the NH-207 corridor.

## Project Overview
Fortune Haven is an exclusive gated residential enclave developed by Cannas Lily Infrastructure Pvt. Ltd. The development features twenty-four bespoke four-storey private residences thoughtfully envisioned for a life shaped by space, privacy, and architectural distinction.

- **Typology**: 4-Storey Private Residences (G+3 Elevations)
- **Scale**: Limited enclave of 24 residences
- **Location**: NH-207 Corridor, Foothills of Nandi Hills, Bengaluru Rural, Karnataka, India
- **Geographic Coordinates**: 13.3702 deg N, 77.6835 deg E
- **Regional Connectivity**: Direct access along the NH-207 corridor with rapid arterial connectivity to the NH-7 / Airport Expressway, Kempegowda International Airport (BLR), Yelahanka, and North Bengaluru.

## Architectural Levels & Floor Distribution
- **Level 01 (Basement / Stilt Floor)**: Arrival forecourt, three-car covered parking bay, six two-wheeler slots, dedicated home office / utility room, private central lift shaft, internal staircase, and landscaped entrance garden.
- **Level 02 (Ground Floor)**: Private lawn and driveway, entrance porch, double-height living salon, dining room, gourmet kitchen with breakfast island, guest bedroom suite with attached bathroom, and rear private yard.
- **Level 03 (First Floor)**: Primary master sanctuary suite with private dressing area and ensuite, intimate family lounge, central lift access, and private open terrace framed by perimeter planters.
- **Level 04 (Second Floor)**: Two additional bedroom suites with dressing areas and ensuite bathrooms, secondary TV lounge, private balconies, and an architectural double-height opening overlooking the dining area below.

## Private Outdoor Living & Enclave Amenities
- **Sunlit Rooftop Lookout Terrace**: Panoramic open-air terrace perched atop each villa offering unobstructed vistas of the Nandi Hills and Skandagiri foothill contours.
- **Dusk Entertaining Lounge**: Open-sky rooftop leisure zone crafted for unhurried evenings.
- **Enclave Swimming Pool**: Residential aquatic sanctuary with landscaped stone sun deck and integrated shallow water section.
- **Community Clubhouse**: Dedicated social pavilion for neighborly recreation and casual gatherings.
- **Private Study & Library**: Quiet internal sanctum tailored for intellectual focus and acoustic seclusion.
- **Balconies & Courtyards**: Deep shaded overhangs and private bedroom verandahs framing manicured gardens.

## Official Public Pages
- Homepage & Villa Tour: ${baseUrl}/
- Architectural Manifesto: ${baseUrl}/#architecture
- Villa Interiors: ${baseUrl}/#interiors
- Lifestyle & Open Horizons: ${baseUrl}/#lifestyle
- Location & Connectivity: ${baseUrl}/#location
- Interactive Floor Plans: ${baseUrl}/#floor-plans
- Photographic Gallery: ${baseUrl}/#gallery
- Private Consultation Enquiry: ${baseUrl}/#enquire
- Brochure Monograph Request: ${baseUrl}/#brochure
- Property FAQ: ${baseUrl}/faq
- Privacy Policy & Data Notice: ${baseUrl}/privacy-policy
- Terms & Conditions: ${baseUrl}/terms-and-conditions

## Notes on Usage & Accuracy
This document provides factual, verified information about Fortune Haven sourced directly from approved project schematics and visible website content. It contains no unverified investment projections, pricing claims, or artificial specifications.
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
