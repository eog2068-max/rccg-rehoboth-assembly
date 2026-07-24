import { NextRequest, NextResponse } from "next/server";
import { reportChatMessage } from "@/lib/supabase/social-store";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { channelId, reason } = body;

    if (!channelId || !reason) {
      return NextResponse.json({ error: "Channel ID and reason required" }, { status: 400 });
    }

    const sessionId = req.headers.get("x-session-id") || `anon_${Date.now()}`;
    const report = reportChatMessage(id, channelId, sessionId, reason);

    return NextResponse.json({ report }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to report message" }, { status: 500 });
  }
}
