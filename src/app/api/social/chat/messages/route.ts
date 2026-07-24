import { NextRequest, NextResponse } from "next/server";
import { getChatMessages, addChatMessage, isUserBlocked } from "@/lib/supabase/social-store";
import { moderateContent } from "@/lib/moderation";
import { checkRateLimit } from "@/lib/rate-limit";

// Chat-specific rate limit: 10 messages per 60 seconds
const CHAT_RATE_LIMIT = 10;

// POST /api/social/chat/messages — create a new message
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { channelId, content, replyToId, displayName } = body;

    if (!channelId || !content || !content.trim()) {
      return NextResponse.json({ error: "Channel and message content required" }, { status: 400 });
    }

    const sessionId = req.headers.get("x-session-id") || `anon_${Date.now()}`;
    const name = displayName || "Anonymous";

    // Check if blocked
    if (isUserBlocked(sessionId)) {
      return NextResponse.json({ error: "Access restricted" }, { status: 403 });
    }

    // Chat-specific rate limiting
    const rateCheck = checkRateLimit(`chat_${sessionId}`, CHAT_RATE_LIMIT);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "You're sending messages too quickly. Please wait a moment.", remaining: 0, resetAt: rateCheck.resetAt },
        { status: 429 }
      );
    }

    // Moderate content (pass sessionId for duplicate detection)
    const moderation = moderateContent(content, sessionId, { maxLength: 500, minLength: 1 });
    if (!moderation.allowed) {
      return NextResponse.json(
        { error: moderation.reason || "Message does not meet community guidelines" },
        { status: 422 }
      );
    }

    const message = addChatMessage(
      channelId,
      moderation.sanitized,
      sessionId,
      name,
      replyToId
    );

    return NextResponse.json({ message }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

// GET /api/social/chat/messages?channelId=ch_general&before=timestamp&limit=30
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get("channelId");

    if (!channelId) {
      return NextResponse.json({ error: "Channel ID required" }, { status: 400 });
    }

    const before = searchParams.get("before") || undefined;
    const limit = Math.min(parseInt(searchParams.get("limit") || "30", 10), 50);
    const messages = getChatMessages(channelId, limit, before);

    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Failed to load messages" }, { status: 500 });
  }
}
