import type { Metadata } from "next";
import { TodaysQuestion } from "@/components/social/todays-question";

export const metadata: Metadata = {
  title: "Today's Question | RehobothSocial",
  description: "Answer today's community question and connect with your church family.",
};

export default function TodaysQuestionPage() {
  return <TodaysQuestion />;
}
