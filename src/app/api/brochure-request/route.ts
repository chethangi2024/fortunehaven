import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, sanitizeString } from "@/lib/rateLimit";

interface BrochurePayload {
  fullName: string;
  phone: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const { allowed, resetInSec } = checkRateLimit(`brochure_${ip}`, 5, 60000);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Rate limit reached. Please wait ${resetInSec} seconds before re-attempting your brochure request.`,
        },
        { status: 429 }
      );
    }

    // 2. Body parsing
    let body: BrochurePayload;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    // 3. Sanitization
    const fullName = sanitizeString(body.fullName, 100);
    const phone = sanitizeString(body.phone, 30);
    const email = sanitizeString(body.email, 120);

    // 4. Server-Side Validation
    const validationErrors: Record<string, string> = {};

    if (!fullName || fullName.length < 2) {
      validationErrors.fullName = "Full name is required (min 2 characters).";
    }

    const cleanDigits = phone.replace(/[^\d]/g, "");
    if (!phone || cleanDigits.length < 7 || cleanDigits.length > 15) {
      validationErrors.phone =
        "Please provide a valid phone number (7 to 15 digits).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      validationErrors.email = "Please provide a valid email format.";
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed on required fields.",
          validationErrors,
        },
        { status: 422 }
      );
    }

    // 5. Check if real compiled PDF exists or is configured
    // Note: The approved compiled brochure PDF has not yet been placed into the repository
    const brochurePdfAvailable = false;
    const downloadUrl = brochurePdfAvailable
      ? "/digital-assets/Brochure/Fortune_Haven_Monograph.pdf"
      : null;

    return NextResponse.json({
      success: true,
      message:
        "Your brochure request has been validated and registered with the advisory desk.",
      data: {
        referenceId: `BR-${Date.now().toString(36).toUpperCase()}`,
        brochureAvailable: brochurePdfAvailable,
        downloadUrl,
        notice: brochurePdfAvailable
          ? "Official document ready for secure retrieval."
          : "The compiled high-resolution architectural monograph is currently pending final publication release and will be transmitted upon availability.",
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error processing brochure request.",
      },
      { status: 500 }
    );
  }
}
