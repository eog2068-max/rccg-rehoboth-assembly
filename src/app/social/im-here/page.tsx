import type { Metadata } from "next";
import { ImHere } from "@/components/social/im-here";

export const metadata: Metadata = {
  title: "I'm Here | RehobothSocial",
  description: "Let the church family know you're here right now.",
};

export default function ImHerePage() {
  return <ImHere />;
}
