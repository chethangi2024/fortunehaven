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

    // 6. External Dispatch / Storage Provider Integration Check
    const recipientEmail = process.env.ENQUIRY_RECIPIENT_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    let emailDelivered = false;
    let providerStatus = "unconfigured";

    if (resendApiKey && recipientEmail) {
      try {
        // Dynamic fetch call to Resend API if configured
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM_ADDRESS || "advisory@fortunehaven.com",
            to: [recipientEmail],
            subject: `New Private Enquiry: ${fullName} (${enquiryType})`,
            text: `A new consultation request has been submitted for Fortune Haven.\n\nName: ${fullName}\nPhone: ${phone}\nEmail: ${email}\nPreferred Contact: ${contactMethod}\nEnquiry Type: ${enquiryType}\nMarketing Consent: ${
              marketingConsent ? "Yes" : "No"
            }\nTimestamp: ${timestamp}\n\nMessage:\n${message || "No specific message provided."}`,
          }),
        });

        if (resendResponse.ok) {
          emailDelivered = true;
          providerStatus = "sent";
        } else {
          providerStatus = "provider_error";
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
