import { NextRequest, NextResponse } from "next/server";
import { incrementPrayerCount } from "@/lib/supabase/social-store";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionId = request.headers.get("x-session-id") || "anonymous";
  const rateLimit = checkRateLimit(sessionId, 30);

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
    const { id } = await params;
    const updated = incrementPrayerCount(id);

    if (!updated) {
      return NextResponse.json(
        { error: "Prayer request not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { prayer: updated },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  } catch (error) {
    console.error("[Prayer Pray POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to update prayer count." },
      { status: 500 }
    );
  }
}
