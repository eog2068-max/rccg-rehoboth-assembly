"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Heart, MessageCircle, Flame, Radio, CalendarCheck, Sparkles } from "lucide-react";
import { socialFeatures } from "./social-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const iconMap: Record<string, React.ElementType> = {
  "im-here": Users,
  "todays-question": MessageCircle,
  "prayer-circle": Heart,
  "amen-wall": Heart,
  "weekly-challenge": Flame,
  "live-together": Radio,
  "whos-coming": CalendarCheck,
};

export function SocialLandingPage() {
  const [presenceCount, setPresenceCount] = useState(0);

  useEffect(() => {
    fetch("/api/social/presence")
      .then((r) => r.json())
      .then((d) => setPresenceCount(d.count))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D1557] via-[#1A237E] to-[#283593] pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.12) 1px, transparent 1px),
                             radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "50px 50px"
          }} />
        </div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-5xl md:text-6xl mb-6"
          >
            ❤️
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4"
          >
            RehobothSocial
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100/80 font-medium mb-2"
          >
            Connect. Pray. Encourage. Grow. Together.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-blue-200/60 mb-8 max-w-lg mx-auto"
          >
            A place where your church family gathers. No account needed. Just come as you are.
          </motion.p>

          {/* Presence indicator */}
          {presenceCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-blue-100/80">
                <span className="font-bold text-white">{presenceCount}</span> people are here right now
              </span>
            </motion.div>
          )}

          {/* No account needed badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { emoji: "🔓", text: "No login required" },
              { emoji: "⚡", text: "Join instantly" },
              { emoji: "🔒", text: "Privacy protected" },
              { emoji: "🌍", text: "Open to everyone" },
            ].map((badge) => (
              <span
                key={badge.text}
                className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1.5 text-xs text-blue-100/70"
              >
                <span>{badge.emoji}</span>
                {badge.text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 pb-16 relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {socialFeatures.map((feature) => {
            const IconComp = iconMap[feature.id] || Sparkles;
            return (
              <motion.div key={feature.id} variants={itemVariants}>
                <Link href={feature.href} className="block group">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 h-full">
                    {/* Card header gradient */}
                    <div className={`bg-gradient-to-r ${feature.color} p-4 relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-y-8 translate-x-8" />
                      <div className="relative">
                        <span className="text-3xl">{feature.emoji}</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-lg ${feature.iconBg} flex items-center justify-center`}>
                          <IconComp className="size-4 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#1A237E] transition-colors">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-[#0D1557] to-[#1A237E] py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Connect?</h2>
          <p className="text-blue-200/70 mb-6 text-sm">
            Join your church family in prayer, encouragement, and fellowship. No account needed.
          </p>
          <Link
            href="/social/im-here"
            className="inline-flex items-center gap-2 bg-white text-[#1A237E] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            👋 Say I&apos;m Here
          </Link>
        </div>
      </section>
    </div>
  );
}
