import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import { SectionWrapper, SectionTitle } from "./section-wrapper";

const photoSlots = [
  { bg: "from-[#1A237E]/15 to-[#1A237E]/5", label: "Worship Service" },
  { bg: "from-[#D32F2F]/15 to-[#D32F2F]/5", label: "Church Events" },
  { bg: "from-[#2E7D32]/15 to-[#2E7D32]/5", label: "Bible Study" },
  { bg: "from-[#6A1B9A]/15 to-[#6A1B9A]/5", label: "Youth Activities" },
  { bg: "from-[#E65100]/15 to-[#E65100]/5", label: "Outreach" },
  { bg: "from-[#1A237E]/10 to-[#3949AB]/10", label: "Fellowship" },
];

export function PhotoGalleryPreview() {
  return (
    <SectionWrapper className="bg-[#F0F4FF] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle title="Photo Gallery" subtitle="Moments from our church family" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photoSlots.map((slot, index) => (
            <div
              key={index}
              className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${slot.bg} flex flex-col items-center justify-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer border border-white/50`}
            >
              <Camera className="size-8 text-gray-400/60" />
              <span className="text-xs text-gray-400 font-medium">{slot.label}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-[#D32F2F] font-semibold hover:gap-2.5 transition-all text-sm"
          >
            View Full Gallery
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}