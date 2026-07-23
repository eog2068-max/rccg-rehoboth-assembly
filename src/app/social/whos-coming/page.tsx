import type { Metadata } from "next";
import { WhosComing } from "@/components/social/whos-coming";

export const metadata: Metadata = {
  title: "Who's Coming? | RehobothSocial",
  description: "See who's planning to attend upcoming church events.",
};

export default function WhosComingPage() {
  return <WhosComing />;
}
