import type { Metadata } from "next";
import { AmenWall } from "@/components/social/amen-wall";

export const metadata: Metadata = {
  title: "Amen Wall | RehobothSocial",
  description: "Post your faith declarations and encourage the community.",
};

export default function AmenWallPage() {
  return <AmenWall />;
}
