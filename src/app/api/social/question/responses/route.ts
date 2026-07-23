import { NextRequest, NextResponse } from "next/server";
import {
  getQuestionResponses,
  addQuestionResponse,
} from "@/lib/supabase/social-store";
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
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get("questionId");

    if (!questionId) {
      return NextResponse.json(
        { error: "Missing required query parameter: questionId." },
        { status: 400 }
      );
    }

    const responses = getQuestionResponses(questionId);
    return NextResponse.json(
      { responses },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  } catch (error) {
    console.error("[Question Responses GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve question responses." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const sessionId = request.headers.get("x-session-id") || "anonymous";
  const rateLimit = checkRateLimit(sessionId, 20);

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
    const { questionId, response } = body as {
      questionId?: string;
      response?: string;
      sessionId?: string;
    };

    if (!questionId || !response) {
      return NextResponse.json(
        { error: "Missing required fields: questionId and response." },
        { status: 400 }
      );
    }

    if (response.trim().length === 0) {
      return NextResponse.json(
        { error: "Response cannot be empty." },
        { status: 400 }
      );
    }

    if (response.length > 200) {
      return NextResponse.json(
        { error: "Response must be 200 characters or fewer." },
        { status: 400 }
      );
    }

    const newResponse = addQuestionResponse(questionId, response.trim(), sessionId);
    return NextResponse.json(
      { response: newResponse },
      {
        status: 201,
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  } catch (error) {
    console.error("[Question Responses POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to add response." },
      { status: 500 }
    );
  }
}
