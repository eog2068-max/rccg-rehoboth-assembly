import { NextRequest, NextResponse } from "next/server";
import { getLiveSession, addLiveReaction } from "@/lib/supabase/social-store";
import { checkRateLimit } from "@/lib/rate-limit";

const VALID_LIVE_REACTIONS = ["worship", "prayer", "love", "fire"] as const;

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
    const session = getLiveSession();
    return NextResponse.json(
      { session },
      { headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.resetAt) } }
    );
  } catch (error) {
    console.error("[Live GET] Error:", error);
    return NextResponse.json({ error: "Failed to retrieve live session." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const sessionId = request.headers.get("x-session-id") || "anonymous";
  const rateLimit = checkRateLimit(sessionId, 60);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "X-RateLimit-Remaining": "0", "X-RateLimit-Reset": String(rateLimit.resetAt) } }
    );
  }

  try {
    const body = await request.json();
    const { type } = body as { type?: string; sessionId?: string };

    if (!type || !VALID_LIVE_REACTIONS.includes(type as any)) {
      return NextResponse.json(
        { error: "Invalid reaction type. Must be one of: worship, prayer, love, fire." },
        { status: 400 }
      );
    }

    const counts = addLiveReaction(type as any);
    return NextResponse.json(
      { reactionCounts: counts },
      { headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.resetAt) } }
    );
  } catch (error) {
    console.error("[Live POST] Error:", error);
    return NextResponse.json({ error: "Failed to add live reaction." }, { status: 500 });
  }
}
