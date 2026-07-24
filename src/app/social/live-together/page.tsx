import type { Metadata } from "next";
import { LiveTogether } from "@/components/social/live-together";

export const metadata: Metadata = {
  title: "Live Together | RehobothSocial",
  description: "Worship together during live church services.",
};

export default function LiveTogetherPage() {
  return <LiveTogether />;
}
