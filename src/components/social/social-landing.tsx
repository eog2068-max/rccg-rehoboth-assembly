"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users, Heart, MessageCircle, Flame, Radio, CalendarCheck, Sparkles,
  ArrowRight, Shield, Zap, Globe,
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
            className="flex flex-wrap justify-center gap-3 mb-8"
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

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/social/im-here"
              className="inline-flex items-center gap-2 bg-white text-[#1A237E] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              👋 Say I&apos;m Here
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/social/prayer-circle"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
            >
              🙏 Prayer Circle
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A237E] mb-3">
            How It Works
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Three simple steps to connect with your church family
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "1", emoji: "👋", title: "Check In", desc: "Tap \"I'm Here\" to let others know you're present. See who else is online right now." },
            { step: "2", emoji: "💬", title: "Participate", desc: "Answer today's question, share a prayer request, post on the Amen Wall, or join the weekly challenge." },
            { step: "3", emoji: "🙏", title: "Connect", desc: "React to others' posts, pray for someone, and encourage the community. Come back daily!" },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1A237E] to-[#283593] flex items-center justify-center mx-auto mb-4 text-2xl">
                {item.emoji}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A237E] mb-3">
            Explore RehobothSocial
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Choose how you want to engage with the community
          </p>
        </motion.div>

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
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 h-full hover:-translate-y-1">
                    {/* Card header gradient */}
                    <div className={`bg-gradient-to-r ${feature.color} p-4 relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-y-8 translate-x-8" />
                      <div className="relative flex items-center justify-between">
                        <span className="text-3xl">{feature.emoji}</span>
                        <IconComp className="size-6 text-white/40 group-hover:text-white/70 transition-colors" />
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

      {/* Trust & Safety */}
      <section className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Safe & Moderated", desc: "All content is monitored. Our pastoral team reviews private requests personally." },
              { icon: Zap, title: "Instant Access", desc: "No registration, no login, no waiting. Join the conversation immediately." },
              { icon: Globe, title: "Open to All", desc: "Members, visitors, and newcomers are all welcome. Everyone belongs here." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#F8FAFF] flex items-center justify-center mx-auto mb-3">
                  <item.icon className="size-6 text-[#1A237E]" />
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-[#0D1557] to-[#1A237E] py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-4xl mb-4 block">👋</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Connect?</h2>
            <p className="text-blue-200/70 mb-8 text-sm max-w-md mx-auto">
              Join your church family in prayer, encouragement, and fellowship. No account needed. Your church family is waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/social/im-here"
                className="inline-flex items-center gap-2 bg-white text-[#1A237E] px-8 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg text-sm"
              >
                👋 Say I&apos;m Here
              </Link>
              <Link
                href="/social/todays-question"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-colors text-sm"
              >
                💬 Answer Today&apos;s Question
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
