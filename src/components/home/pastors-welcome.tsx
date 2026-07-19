import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import { SectionWrapper, SectionTitle } from "./section-wrapper";

export function PastorsWelcome() {
  return (
    <SectionWrapper className="bg-[#F5F7FF] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle title="A Word From Our Pastor" />

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Pastor Photo Placeholder */}
          <div className="shrink-0">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-[#1A237E]/10 to-[#1A237E]/5 border-2 border-[#1A237E]/10 flex flex-col items-center justify-center">
              <span className="text-4xl md:text-5xl font-bold text-[#1A237E]/20">SP</span>
              <Camera className="size-5 text-[#1A237E]/20 mt-1" />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-center md:text-left flex-1">
            <p className="text-gray-700 leading-relaxed mb-4">
              On behalf of the entire Rehoboth Assembly Parish family, I warmly welcome you to our
              church home. We are a vibrant, Spirit-filled community of believers committed to
              worshipping God in spirit and in truth, and to making a positive impact in our world.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether you are taking your very first steps in faith or you have been walking with
              God for many years, there is a place for you here. Our desire is that every person
              who walks through our doors encounters the love of God, finds meaningful fellowship,
              and discovers their God-given purpose.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              We believe that God has brought you here for a reason. As our name &ldquo;Rehoboth&rdquo;
              signifies — meaning &ldquo;room&rdquo; or &ldquo;broad place&rdquo; — we pray that
              you will find ample space to grow, serve, and flourish in the Lord. May the Lord
              bless you abundantly as you connect with us.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-[#D32F2F] font-semibold hover:gap-2.5 transition-all text-sm"
            >
              Read More About Us
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}