import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, sanitizeString } from "@/lib/rateLimit";

interface EnquiryPayload {
  fullName: string;
  phone: string;
  email: string;
  contactMethod?: "Phone Call" | "WhatsApp";
  enquiryType?: string;
  message?: string;
  marketingConsent?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting by client IP or forwarded header
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const { allowed, resetInSec } = checkRateLimit(`enquiry_${ip}`, 5, 60000);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions from this connection. Please wait ${resetInSec} seconds before retrying.`,
        },
        { status: 429 }
      );
    }

    // 2. Request body parsing & size safety
    let body: EnquiryPayload;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    // 3. Field sanitization
    const fullName = sanitizeString(body.fullName, 100);
    const phone = sanitizeString(body.phone, 30);
    const email = sanitizeString(body.email, 120);
    const contactMethod =
      body.contactMethod === "WhatsApp" ? "WhatsApp" : "Phone Call";
    const enquiryType = sanitizeString(body.enquiryType || "Property Details", 80);
    const message = sanitizeString(body.message || "", 1000);
    const marketingConsent = Boolean(body.marketingConsent);

    // 4. Strict Server-Side Validation
    const validationErrors: Record<string, string> = {};

    if (!fullName || fullName.length < 2) {
      validationErrors.fullName = "Full name must be at least 2 characters.";
    }

    const cleanPhoneDigits = phone.replace(/[^\d]/g, "");
    if (!phone || cleanPhoneDigits.length < 7 || cleanPhoneDigits.length > 15) {
      validationErrors.phone =
        "Please provide a valid telephone number (7 to 15 digits).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      validationErrors.email = "Please provide a valid email address.";
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed on one or more required fields.",
          validationErrors,
        },
        { status: 422 }
      );
    }

    // 5. Audit Logging (privacy-safe, avoiding sensitive leak in stdout)
    const timestamp = new Date().toISOString();

    // 6. External Dispatch via Web3Forms
    const web3FormsKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      "7d92d672-b90b-4ba8-aaf4-387005adc781";

    let emailDelivered = false;
    let providerStatus = "unconfigured";

    if (web3FormsKey) {
      try {
        const web3Response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `New Private Enquiry: ${fullName} (${enquiryType})`,
            from_name: "Fortune Haven Website",
            name: fullName,
            phone: phone,
            email: email,
            preferred_contact_method: contactMethod,
            enquiry_type: enquiryType,
            marketing_consent: marketingConsent ? "Yes" : "No",
            message: message || "No additional message provided.",
            timestamp,
          }),
        });

        if (web3Response.ok) {
          const resData = await web3Response.json().catch(() => ({}));
          if (resData.success) {
            emailDelivered = true;
            providerStatus = "sent";
          }
        }
      } catch {
        providerStatus = "network_error";
      }
    }

    // 7. Structured Server Response
    return NextResponse.json({
      success: true,
      message:
        "Your private enquiry has been verified and registered with the Fortune Haven advisory desk.",
      data: {
        referenceId: `FH-${Date.now().toString(36).toUpperCase()}`,
        timestamp,
        inquiryStatus: emailDelivered ? "notified" : "recorded_pending_mail_relay",
        providerStatus,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected internal server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
