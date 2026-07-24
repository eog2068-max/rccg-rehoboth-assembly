import { NextRequest, NextResponse } from "next/server";
import { getChatMessages, addChatMessage, isUserBlocked } from "@/lib/supabase/social-store";
import { moderateContent } from "@/lib/moderation";

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

    // Moderate content
    const moderation = moderateContent(content);
    if (moderation.blocked) {
      return NextResponse.json(
        { error: "Message does not meet community guidelines" },
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

// GET /api/social/chat/messages?channelId=ch_general&before=timestamp
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get("channelId");

    if (!channelId) {
      return NextResponse.json({ error: "Channel ID required" }, { status: 400 });
    }

    const before = searchParams.get("before") || undefined;
    const messages = getChatMessages(channelId, 50, before);

    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Failed to load messages" }, { status: 500 });
  }
}
