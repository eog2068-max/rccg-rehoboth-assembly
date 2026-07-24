import { NextRequest, NextResponse } from "next/server";
import { addReactionToChatMessage } from "@/lib/supabase/social-store";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { reaction } = body;

    if (!reaction) {
      return NextResponse.json({ error: "Reaction type required" }, { status: 400 });
    }

    const allowed = ["❤️", "🙏", "🙌", "🔥", "👍"];
    if (!allowed.includes(reaction)) {
      return NextResponse.json({ error: "Invalid reaction" }, { status: 400 });
    }

    const msg = addReactionToChatMessage(id, reaction);
    if (!msg) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ reactions: msg.reactions });
  } catch {
    return NextResponse.json({ error: "Failed to add reaction" }, { status: 500 });
  }
}
