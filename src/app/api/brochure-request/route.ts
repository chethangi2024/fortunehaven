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

    // 5. External Dispatch via Web3Forms
    const web3FormsKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      "8a51d082-3c17-4b77-8e65-47519a286e74";

    if (web3FormsKey) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `New Brochure Request: ${fullName} (Fortune Haven)`,
            from_name: "Fortune Haven Website",
            name: fullName,
            phone: phone,
            email: email,
            request_type: "Architectural Brochure & Specifications",
            project: "Fortune Haven — Ultra Luxury Villas",
          }),
        });
      } catch {
        // Silently continue to deliver download URL
      }
    }

    const downloadUrl =
      "https://drive.google.com/file/d/1tTQSJyZFKSLqhDCpfVWPr58PtXvKkzGG/view?usp=sharing";

    return NextResponse.json({
      success: true,
      message:
        "Your brochure request has been validated and registered with the advisory desk.",
      data: {
        referenceId: `BR-${Date.now().toString(36).toUpperCase()}`,
        brochureAvailable: true,
        downloadUrl,
        notice: "Official document ready for secure retrieval.",
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
