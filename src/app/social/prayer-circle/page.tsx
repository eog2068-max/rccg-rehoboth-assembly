"use client";

import { useState } from "react";
import { FeatureLandingPage } from "@/components/social/feature-landing-page";
import { PrayerCircle } from "@/components/social/prayer-circle";
import { socialFeatures } from "@/components/social/social-data";

export default function PrayerCirclePage() {
  const [entered, setEntered] = useState(false);

  if (entered) return <PrayerCircle />;

  const feature = socialFeatures.find((f) => f.id === "prayer-circle")!;

  return (
    <FeatureLandingPage feature={feature} onEnter={() => setEntered(true)}>
      {/* Prayer categories preview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
        {[
          { emoji: "🏥", name: "Healing" },
          { emoji: "👨‍👩‍👧", name: "Family" },
          { emoji: "💰", name: "Finances" },
          { emoji: "🧭", name: "Guidance" },
          { emoji: "🕊️", name: "Spiritual Growth" },
          { emoji: "⚡", name: "Deliverance" },
          { emoji: "✝️", name: "Salvation" },
          { emoji: "🙏", name: "Other" },
        ].map((cat) => (
          <div
            key={cat.name}
            className="bg-gray-50 rounded-lg p-2.5 border border-gray-100 text-center"
          >
            <span className="text-lg">{cat.emoji}</span>
            <p className="text-[10px] font-medium text-gray-600 mt-0.5">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </FeatureLandingPage>
  );
}
