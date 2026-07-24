import { NextRequest, NextResponse } from "next/server";
import { getCurrentQuestion } from "@/lib/supabase/social-store";
import { checkRateLimit } from "@/lib/rate-limit";

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
    const question = getCurrentQuestion();
    if (!question) {
      return NextResponse.json(
        { question: null, message: "No question is currently published." },
        {
          headers: {
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": String(rateLimit.resetAt),
          },
        }
      );
    }

    return NextResponse.json(
      { question },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  } catch (error) {
    console.error("[Question GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve current question." },
      { status: 500 }
    );
  }
}
