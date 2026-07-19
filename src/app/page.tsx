import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1A237E] to-[#0D1557] p-6">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="relative w-40 h-40 mx-auto">
          <Image
            src="/rccg-logo.png"
            alt="RCCG Rehoboth Assembly Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Church Name */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            RCCG Rehoboth Assembly
          </h1>
          <p className="text-lg md:text-xl text-blue-200/80">
            The Redeemed Christian Church of God
          </p>
          <div className="w-24 h-1 bg-[#D32F2F] mx-auto rounded-full" />
        </div>

        {/* Address */}
        <div className="space-y-2 text-blue-100/70 text-sm md:text-base">
          <p>Silla-Zeka Plaza, Adebayo Adedeji Street</p>
          <p>Utako, FCT, Abuja, Nigeria</p>
        </div>

        {/* PWA Badge */}
        <div className="pt-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm border border-white/20">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Progressive Web App Ready
          </span>
        </div>
      </div>
    </div>
  );
}