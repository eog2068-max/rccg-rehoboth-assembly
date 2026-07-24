import { NextResponse } from "next/server";
import { getChatChannels } from "@/lib/supabase/social-store";

export async function GET() {
  try {
    const channels = getChatChannels();
    return NextResponse.json({ channels });
  } catch {
    return NextResponse.json({ error: "Failed to load channels" }, { status: 500 });
  }
}
