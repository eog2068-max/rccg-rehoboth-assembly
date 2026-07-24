import type { Metadata } from "next";
import { SocialAdminDashboard } from "@/components/admin/social-admin-dashboard";

export const metadata: Metadata = {
  title: "RehobothSocial Admin",
  description: "Manage RehobothSocial features, moderation, and content.",
};

export default function SocialAdminPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FF]">
      <SocialAdminDashboard />
    </div>
  );
}
