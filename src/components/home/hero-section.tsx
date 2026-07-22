"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Radio, MapPin, Heart, UserPlus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background gradient placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1557] via-[#1A237E] to-[#283593]" />

      {/* Decorative overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />
      </div>

      {/* Light beam effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-400/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 mx-auto rounded-full bg-white p-3 shadow-2xl shadow-black/30">
            <Image
              src="/rccg-logo.png"
              alt="Redeemed Christian Church of God Logo"
              fill
              sizes="384px"
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Church Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Redeemed Christian Church of God
          </h1>
          <p className="text-lg md:text-2xl text-blue-100/80 font-medium mt-2 md:mt-3">
            (Rehoboth Assembly Parish)
          </p>
        </motion.div>

        {/* Red divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="h-1 bg-[#D32F2F] mx-auto rounded-full mt-5"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-blue-100/80 leading-relaxed font-light"
        >
          Experience God&rsquo;s presence where His Word transforms lives and worship draws you closer to your divine purpose.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto px-2"
        >
          <Button
            asChild
            size="lg"
            className="col-span-2 sm:col-span-1 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-xl h-12 text-base font-semibold"
          >
            <Link href="/live">
              <Radio className="size-4" />
              Watch Live
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="col-span-2 sm:col-span-1 border-white/30 text-white hover:bg-white/10 hover:text-white rounded-xl h-12 text-base font-semibold"
          >
            <Link href="/contact">
              <MapPin className="size-4" />
              Plan Your Visit
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white rounded-xl h-12 text-base font-semibold"
          >
            <Link href="/prayer">
              <Heart className="size-4" />
              Prayer Request
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white text-[#1A237E] hover:bg-white/90 rounded-xl h-12 text-base font-semibold"
          >
            <Link href="/join-ministry">
              <UserPlus className="size-4" />
              Join Us
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-white/40 text-xs tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}