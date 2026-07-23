import { NextRequest, NextResponse } from "next/server";
import { getAttendanceCounts, addAttendanceIntention } from "@/lib/supabase/social-store";
import { checkRateLimit } from "@/lib/rate-limit";

const VALID_TYPES = ["self", "family", "friend"] as const;

export async function GET(request: NextRequest) {
  const sessionId = request.headers.get("x-session-id") || "anonymous";
  const rateLimit = checkRateLimit(sessionId, 60);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "X-RateLimit-Remaining": "0", "X-RateLimit-Reset": String(rateLimit.resetAt) } }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { error: "Missing required query parameter: eventId." },
        { status: 400 }
      );
    }

    const counts = getAttendanceCounts(eventId);
    return NextResponse.json(
      { eventId, counts },
      { headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.resetAt) } }
    );
  } catch (error) {
    console.error("[Attendance GET] Error:", error);
    return NextResponse.json({ error: "Failed to retrieve attendance counts." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const sessionId = request.headers.get("x-session-id") || "anonymous";
  const rateLimit = checkRateLimit(sessionId, 10);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "X-RateLimit-Remaining": "0", "X-RateLimit-Reset": String(rateLimit.resetAt) } }
    );
  }

  try {
    const body = await request.json();
    const { eventId, type } = body as { eventId?: string; sessionId?: string; type?: string };

    if (!eventId) {
      return NextResponse.json({ error: "Missing required field: eventId." }, { status: 400 });
    }

    if (!type || !VALID_TYPES.includes(type as any)) {
      return NextResponse.json(
        { error: "Invalid attendance type. Must be one of: self, family, friend." },
        { status: 400 }
      );
    }

    const result = addAttendanceIntention(eventId, sessionId, type as any);
    return NextResponse.json(
      { eventId, counts: result.counts },
      { status: 201, headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.resetAt) } }
    );
  } catch (error) {
    console.error("[Attendance POST] Error:", error);
    return NextResponse.json({ error: "Failed to record attendance." }, { status: 500 });
  }
}
