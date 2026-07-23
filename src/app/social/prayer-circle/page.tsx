import type { Metadata } from "next";
import { PrayerCircle } from "@/components/social/prayer-circle";

export const metadata: Metadata = {
  title: "Prayer Circle | RehobothSocial",
  description: "Share your prayer needs and stand in agreement with the church community.",
};

export default function PrayerCirclePage() {
  return <PrayerCircle />;
}
