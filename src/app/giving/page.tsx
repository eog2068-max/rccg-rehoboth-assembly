import { PageBanner } from "@/components/layout/page-banner";
import { GivingMain } from "@/components/giving/giving-main";
import { GivingCTA } from "@/components/giving/giving-cta";

export default function GivingPage() {
  return (
    <div className="bg-[#F8FAFF] min-h-screen">
      <PageBanner
        title="Give"
        subtitle="Your generous giving advances the Kingdom of God and impacts lives for eternity"
        breadcrumbs={[{ label: "Giving" }]}
      />
      <GivingMain />
      <GivingCTA />
    </div>
  );
}
