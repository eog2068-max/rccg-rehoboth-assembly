import { NextRequest, NextResponse } from "next/server";
import { getAmenWallPosts, addAmenWallPost } from "@/lib/supabase/social-store";
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
    const posts = getAmenWallPosts();
    return NextResponse.json(
      { posts },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  } catch (error) {
    console.error("[Amen GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve amen wall posts." },
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
    const { message } = body as {
      message?: string;
      sessionId?: string;
    };

    if (!message) {
      return NextResponse.json(
        { error: "Missing required field: message." },
        { status: 400 }
      );
    }

    if (message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    if (message.length > 200) {
      return NextResponse.json(
        { error: "Message must be 200 characters or fewer." },
        { status: 400 }
      );
    }

    const post = addAmenWallPost(message.trim(), sessionId);
    return NextResponse.json(
      { post },
      {
        status: 201,
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  } catch (error) {
    console.error("[Amen POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to add amen wall post." },
      { status: 500 }
    );
  }
}
