import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F4FF] p-6">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="relative w-40 h-40 mx-auto">
          <Image
            src="/rccg-logo.png"
            alt="Redeemed Christian Church of God Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Church Name — Full official name */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1A237E] tracking-tight leading-tight text-center">
            <span className="md:hidden">
              Redeemed Christian Church<br />of God
            </span>
            <span className="hidden md:inline">
              Redeemed Christian Church of God
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#1A237E]/70 font-medium">
            (Rehoboth Assembly Parish)
          </p>
          <div className="w-24 h-1 bg-[#D32F2F] mx-auto rounded-full" />
        </div>

        {/* Address — placeholder, number to be added later */}
        <div className="space-y-2 text-gray-500 text-sm md:text-base">
          <p>Silla-Zeka Plaza, Adebayo Adedeji Street</p>
          <p>Utako, FCT, Abuja, Nigeria</p>
        </div>
      </div>
    </div>
  );
}