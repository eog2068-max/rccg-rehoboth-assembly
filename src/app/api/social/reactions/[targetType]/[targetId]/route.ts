import { NextRequest, NextResponse } from "next/server";
import { addReactionToResponse, addReactionToAmenPost } from "@/lib/supabase/social-store";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ReactionPayload } from "@/lib/supabase/types";

const VALID_RESPONSE_REACTIONS = ["love", "praying", "amen", "fire"] as const;
const VALID_AMEN_REACTIONS = ["praying", "love", "amen", "fire"] as const;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ targetType: string; targetId: string }> }
) {
  const sessionId = request.headers.get("x-session-id") || "anonymous";
  const rateLimit = checkRateLimit(sessionId, 30);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "X-RateLimit-Remaining": "0", "X-RateLimit-Reset": String(rateLimit.resetAt) } }
    );
  }

  try {
    const { targetType, targetId } = await params;
    const body = await request.json();
    const { type } = body as Partial<ReactionPayload>;

    if (!type) {
      return NextResponse.json({ error: "Missing required field: type." }, { status: 400 });
    }

    if (targetType === "response") {
      if (!VALID_RESPONSE_REACTIONS.includes(type)) {
        return NextResponse.json(
          { error: "Invalid reaction type for response. Must be: love, praying, amen, fire." },
          { status: 400 }
        );
      }
      const updated = addReactionToResponse(targetId, type);
      if (!updated) return NextResponse.json({ error: "Response not found." }, { status: 404 });
      return NextResponse.json(
        { targetType: "response", target: updated },
        { headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.resetAt) } }
      );
    } else if (targetType === "amen") {
      if (!VALID_AMEN_REACTIONS.includes(type)) {
        return NextResponse.json(
          { error: "Invalid reaction type for amen post. Must be: praying, love, amen, fire." },
          { status: 400 }
        );
      }
      const updated = addReactionToAmenPost(targetId, type);
      if (!updated) return NextResponse.json({ error: "Amen post not found." }, { status: 404 });
      return NextResponse.json(
        { targetType: "amen", target: updated },
        { headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.resetAt) } }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid target type. Must be 'response' or 'amen'." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("[Reactions POST] Error:", error);
    return NextResponse.json({ error: "Failed to add reaction." }, { status: 500 });
  }
}
