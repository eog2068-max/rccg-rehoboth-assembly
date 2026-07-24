import { NextRequest, NextResponse } from "next/server";
import { getCurrentChallenge, joinChallenge } from "@/lib/supabase/social-store";
import { checkRateLimit } from "@/lib/rate-limit";

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
    const challenge = getCurrentChallenge();
    if (!challenge) {
      return NextResponse.json(
        { challenge: null, message: "No challenge is currently active." },
        { headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.resetAt) } }
      );
    }
    return NextResponse.json(
      { challenge },
      { headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.resetAt) } }
    );
  } catch (error) {
    console.error("[Challenge GET] Error:", error);
    return NextResponse.json({ error: "Failed to retrieve challenge." }, { status: 500 });
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
    const { challengeId } = body as { challengeId?: string; sessionId?: string };

    if (!challengeId) {
      return NextResponse.json({ error: "Missing required field: challengeId." }, { status: 400 });
    }

    const result = joinChallenge(challengeId, sessionId);
    return NextResponse.json(
      { joined: result.joined, totalParticipants: result.total },
      { status: result.joined ? 201 : 200, headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.resetAt) } }
    );
  } catch (error) {
    console.error("[Challenge POST] Error:", error);
    return NextResponse.json({ error: "Failed to join challenge." }, { status: 500 });
  }
}
