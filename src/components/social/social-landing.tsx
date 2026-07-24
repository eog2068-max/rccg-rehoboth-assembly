"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Heart,
  Flame,
  Radio,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Users,
  Sparkles,
} from "lucide-react";
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
  "family-chat": MessageCircle,
  "prayer-circle": Heart,
  "todays-question": MessageCircle,
  "amen-wall": Heart,
  "live-together": Radio,
};

export function SocialLandingPage() {
  const [presenceCount, setPresenceCount] = useState(0);

  useEffect(() => {
    fetch("/api/social/presence")
      .then((r) => r.json())
      .then((d) => setPresenceCount(d.count))
      .catch(() => {});
  }, []);

  const familyChatFeature = socialFeatures.find((f) => f.id === "family-chat");
  const otherFeatures = socialFeatures.filter((f) => f.id !== "family-chat");

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D1557] via-[#1A237E] to-[#283593] pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.12) 1px, transparent 1px),
                               radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-5xl md:text-6xl mb-6"
          >
            💬
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4"
          >
            RehobothSocial
          </motion.h1>

          {/* === THE DOMINANT SLOGAN === */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-white leading-snug">
              I Remain Connected To My Church Family Throughout The Week.
            </p>
          </motion.div>

          {/* === SECONDARY PROMISE === */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-base text-blue-100/60 mb-8 max-w-lg mx-auto leading-relaxed"
          >
            You Don&rsquo;t Have To Wait Until The Next Church Service To Feel
            Connected To Your Church Family.
          </motion.p>

          {/* Presence indicator */}
          {presenceCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-blue-100/80">
                <span className="font-bold text-white">{presenceCount}</span>{" "}
                people connected right now
              </span>
            </motion.div>
          )}

          {/* Hero CTAs — FamilyChat is primary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/social/family-chat"
              className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-lg text-base"
            >
              <MessageCircle className="size-5" />
              Enter FamilyChat
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/social/prayer-circle"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors text-sm"
            >
              🙏 Prayer Circle
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FAMILYCHAT — THE HEARTBEAT (Featured) ===== */}
      <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-20 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#1A237E] to-[#283593] p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                💬
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  FamilyChat
                </h2>
                <p className="text-sm text-blue-100/70">
                  The heartbeat of RehobothSocial
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              FamilyChat is your church family&rsquo;s digital gathering place.
              Connect through meaningful conversations in dedicated channels
              — share prayer requests, discuss Scripture, encourage one another,
              and stay updated on church life. No account needed. Just come as
              you are.
            </p>

            {/* Channel previews */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                { emoji: "🏠", name: "General Family", desc: "Everyday conversation" },
                { emoji: "🙏", name: "Prayer & Encouragement", desc: "Spiritual support" },
                { emoji: "📖", name: "Bible & Faith", desc: "Bible discussions" },
                { emoji: "👨‍👩‍👧", name: "Family & Marriage", desc: "Relationships" },
                { emoji: "🎉", name: "Church Life", desc: "Activities & events" },
                { emoji: "📢", name: "Announcements", desc: "Official updates" },
              ].map((ch) => (
                <div
                  key={ch.name}
                  className="bg-gray-50 rounded-xl p-3 border border-gray-100"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{ch.emoji}</span>
                    <span className="text-xs font-semibold text-gray-700 truncate">
                      {ch.name}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400">{ch.desc}</p>
                </div>
              ))}
            </div>

            <Link
              href="/social/family-chat"
              className="inline-flex items-center gap-2 bg-[#1A237E] hover:bg-[#283593] text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm"
            >
              <MessageCircle className="size-4" />
              Open FamilyChat
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ===== OTHER FEATURES GRID ===== */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A237E] mb-3">
            Explore the Ecosystem
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Four ways to participate, connect, and grow together
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {otherFeatures.map((feature) => {
            const IconComp = iconMap[feature.id] || Sparkles;
            return (
              <motion.div key={feature.id} variants={itemVariants}>
                <Link href={feature.href} className="block group h-full">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 h-full hover:-translate-y-1">
                    <div
                      className={`bg-gradient-to-r ${feature.color} p-4 relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-y-8 translate-x-8" />
                      <div className="relative flex items-center justify-between">
                        <span className="text-3xl">{feature.emoji}</span>
                        <IconComp className="size-6 text-white/40 group-hover:text-white/70 transition-colors" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-8 h-8 rounded-lg ${feature.iconBg} flex items-center justify-center`}
                        >
                          <IconComp className="size-4 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#1A237E] transition-colors">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-xs text-[#1A237E] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Open <ArrowRight className="size-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ===== HOW THE ECOSYSTEM WORKS ===== */}
      <section className="bg-white border-y border-gray-100 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A237E] mb-3">
              How It Works Together
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              One family, five ways to connect
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: "Discover",
                emoji: "🔍",
                desc: "Browse FamilyChat channels, today's question, and the Amen Wall.",
              },
              {
                step: "Participate",
                emoji: "💬",
                desc: "Send a message, share a prayer request, or answer the question.",
              },
              {
                step: "Connect",
                emoji: "❤️",
                desc: "React, reply, encourage, and build relationships.",
              },
              {
                step: "Return",
                emoji: "🔄",
                desc: "Come back daily. Fellowship doesn't end after Sunday.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A237E] to-[#283593] flex items-center justify-center mx-auto mb-3 text-xl">
                  {item.emoji}
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">
                  {item.step}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST & SAFETY ===== */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Safe & Moderated",
                desc: "All content is reviewed. Our pastoral team ensures a healthy, Christ-honouring environment.",
              },
              {
                icon: Zap,
                title: "Instant Access",
                desc: "No registration, no login, no waiting. Join the conversation immediately.",
              },
              {
                icon: Globe,
                title: "Open to All",
                desc: "Members, visitors, and newcomers are all welcome. Everyone belongs here.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#F8FAFF] flex items-center justify-center mx-auto mb-3">
                  <item.icon className="size-6 text-[#1A237E]" />
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="bg-gradient-to-r from-[#0D1557] to-[#1A237E] py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-4xl mb-4 block">👋</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Connect?
            </h2>
            <p className="text-blue-200/70 mb-2 text-sm max-w-md mx-auto leading-relaxed">
              I Remain Connected To My Church Family Throughout The Week.
            </p>
            <p className="text-blue-200/50 mb-8 text-xs max-w-md mx-auto">
              You don&rsquo;t have to wait until the next church service.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/social/family-chat"
                className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg text-sm"
              >
                <MessageCircle className="size-4" />
                Enter FamilyChat
              </Link>
              <Link
                href="/social/todays-question"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-colors text-sm"
              >
                💬 Today&rsquo;s Question
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
