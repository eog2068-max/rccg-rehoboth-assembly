import type { Metadata } from "next";
import { WeeklyChallenge } from "@/components/social/weekly-challenge";

export const metadata: Metadata = {
  title: "Weekly Challenge | RehobothSocial",
  description: "Accept this week's community challenge and grow together.",
};

export default function WeeklyChallengePage() {
  return <WeeklyChallenge />;
}
