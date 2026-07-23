import { NextRequest, NextResponse } from "next/server";
import {
  getPublicPrayerRequests,
  addPublicPrayerRequest,
  addPrivatePrayerRequest,
} from "@/lib/supabase/social-store";
import { checkRateLimit } from "@/lib/rate-limit";
import { moderateContent } from "@/lib/moderation";

const VALID_CATEGORIES = [
  "healing", "guidance", "finances", "family", "career",
  "salvation", "spiritual", "deliverance", "other",
] as const;

export async function GET(request: NextRequest) {
  const sessionId = request.headers.get("x-session-id") || "anonymous";
  const rateLimit = checkRateLimit(sessionId, 60);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  }

  try {
    const prayers = getPublicPrayerRequests();
    return NextResponse.json(
      { prayers },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  } catch (error) {
    console.error("[Prayer GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve prayer requests." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const sessionId = request.headers.get("x-session-id") || "anonymous";
  const rateLimit = checkRateLimit(sessionId, 10);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const {
      request: prayerRequest,
      category,
      isPublic = true,
      fullName,
      email,
      phone,
      isUrgent = false,
    } = body as {
      request?: string;
      category?: string;
      isPublic?: boolean;
      fullName?: string;
      email?: string;
      phone?: string;
      isUrgent?: boolean;
    };

    // Validation
    if (!prayerRequest || prayerRequest.trim().length === 0) {
      return NextResponse.json(
        { error: "Prayer request cannot be empty." },
        { status: 400 }
      );
    }

    // Content moderation
    const moderation = moderateContent(prayerRequest, sessionId, {
      maxLength: isPublic ? 500 : 1000,
      minLength: 10,
    });

    if (!moderation.allowed) {
      return NextResponse.json(
        { error: moderation.reason || "Content not allowed." },
        { status: 400 }
      );
    }

    const selectedCategory =
      category && VALID_CATEGORIES.includes(category as any)
        ? category
        : "other";

    if (!isPublic) {
      // PRIVATE prayer request — stored separately, never exposed publicly
      const privatePrayer = addPrivatePrayerRequest(
        moderation.sanitized,
        selectedCategory,
        fullName ? String(fullName).slice(0, 100) : undefined,
        email ? String(email).slice(0, 100) : undefined,
        phone ? String(phone).slice(0, 20) : undefined,
        isUrgent
      );

      return NextResponse.json(
        {
          success: true,
          message:
            "Your prayer request has been received. It will only be seen by our pastoral team. We are standing with you in prayer.",
          id: privatePrayer.id,
        },
        {
          status: 201,
          headers: {
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": String(rateLimit.resetAt),
          },
        }
      );
    }

    // PUBLIC prayer request — visible to community after moderation
    const prayer = addPublicPrayerRequest(
      moderation.sanitized,
      selectedCategory,
      sessionId
    );

    return NextResponse.json(
      { prayer },
      {
        status: 201,
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  } catch (error) {
    console.error("[Prayer POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to submit prayer request." },
      { status: 500 }
    );
  }
}
