import { NextRequest, NextResponse } from "next/server";
import { addReactionToAmenPost } from "@/lib/supabase/social-store";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ReactionPayload } from "@/lib/supabase/types";

const VALID_REACTION_TYPES = ["praying", "love", "amen", "fire"] as const;

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
    const body = await request.json();
    const { type } = body as Partial<ReactionPayload>;

    if (!type || !VALID_REACTION_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `Invalid reaction type. Must be one of: ${VALID_REACTION_TYPES.join(", ")}.` },
        { status: 400 }
      );
    }

    const updated = addReactionToAmenPost(id, type);

    if (!updated) {
      return NextResponse.json(
        { error: "Amen post not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { post: updated },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  } catch (error) {
    console.error("[Amen React POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to add reaction." },
      { status: 500 }
    );
  }
}
