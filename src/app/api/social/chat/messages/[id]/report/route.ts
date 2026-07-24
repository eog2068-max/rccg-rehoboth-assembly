import { NextRequest, NextResponse } from "next/server";
import { reportChatMessage } from "@/lib/supabase/social-store";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { channelId, reason, explanation } = body;

    if (!channelId || !reason) {
      return NextResponse.json({ error: "Channel ID and reason required" }, { status: 400 });
    }

    const sessionId = req.headers.get("x-session-id") || `anon_${Date.now()}`;

    // Rate limit reports: max 5 per minute
    const rateCheck = checkRateLimit(`report_${sessionId}`, 5);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: "Too many reports. Please wait." }, { status: 429 });
    }

    const reportReason = `${reason}${explanation ? `: ${explanation}` : ""}`;
    const report = reportChatMessage(id, channelId, sessionId, reportReason);

    return NextResponse.json({ report }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to report message" }, { status: 500 });
  }
}
