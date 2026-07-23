"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, CheckCircle2, Shield } from "lucide-react";
import { BackToSocial } from "./back-to-social";

interface PrayerRequest {
  id: string;
  request: string;
  displayName: string;
  category: string;
  prayerCount: number;
  createdAt: string;
}

const categories = [
  { value: "healing", label: "Healing" },
  { value: "family", label: "Family" },
  { value: "finances", label: "Finances" },
  { value: "guidance", label: "Guidance" },
  { value: "spiritual", label: "Spiritual Growth" },
  { value: "deliverance", label: "Deliverance" },
  { value: "salvation", label: "Salvation" },
  { value: "other", label: "Other" },
];

export function PrayerCircle() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [newRequest, setNewRequest] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).slice(2)}`);

  const fetchPrayers = async () => {
    try {
      const res = await fetch("/api/social/prayer");
      if (res.ok) setPrayers(await res.json());
    } catch { /* silent */ }
  };

  useEffect(() => { fetchPrayers(); }, []);

  const handleSubmit = async () => {
    if (!newRequest.trim() || !category) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/social/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-session-id": sessionId },
        body: JSON.stringify({ request: newRequest.trim(), category, isPublic }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (isPublic) fetchPrayers();
      }
    } catch { /* silent */ }
    setSubmitting(false);
  };

  const handlePray = async (prayerId: string) => {
    try {
      const res = await fetch(`/api/social/prayer/${prayerId}/pray`, {
        method: "POST",
        headers: { "x-session-id": sessionId },
      });
      if (res.ok) {
        const updated = await res.json();
        setPrayers((prev) => prev.map((p) => (p.id === prayerId ? updated : p)));
      }
    } catch { /* silent */ }
  };

  if (submitted && !isPublic) {
    return (
      <div className="min-h-screen bg-[#F8FAFF]">
        <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
          <BackToSocial />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="size-10 text-[#2E7D32]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A237E] mb-2">Private Prayer Request Received</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Your prayer request has been received. It will only be seen by our pastoral team. We are standing with you in prayer.
            </p>
            <button onClick={() => { setSubmitted(false); setNewRequest(""); setCategory(""); }} className="mt-6 bg-[#1A237E] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0D1557]">
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <BackToSocial />

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🙏</span>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1A237E]">Prayer Circle</h1>
          </div>
          <p className="text-gray-500">Share your prayer needs and stand in agreement with others.</p>
        </motion.div>

        {/* Submit Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
          {/* Privacy toggle */}
          <div className="flex gap-3 mb-4">
            <button onClick={() => setIsPublic(true)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isPublic ? "bg-[#1A237E] text-white" : "bg-gray-100 text-gray-600"}`}>
              🌐 Public
            </button>
            <button onClick={() => setIsPublic(false)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!isPublic ? "bg-[#1A237E] text-white" : "bg-gray-100 text-gray-600"}`}>
              🔒 Private
            </button>
          </div>

          <textarea
            value={newRequest}
            onChange={(e) => setNewRequest(e.target.value.slice(0, 500))}
            placeholder="Share your prayer request..."
            rows={4}
            className="w-full rounded-xl border border-gray-200 p-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#D32F2F]/30 focus:ring-2 focus:ring-[#D32F2F]/10 resize-none"
          />

          {/* Category */}
          <div className="flex flex-wrap gap-2 mt-3 mb-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${category === cat.value ? "bg-[#D32F2F] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {!isPublic && (
            <div className="flex items-start gap-2 text-xs text-gray-400 mb-3">
              <Shield className="size-3.5 mt-0.5 shrink-0" />
              <p>Private requests are only visible to our pastoral team.</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">{newRequest.length}/500</p>
            <button onClick={handleSubmit} disabled={!newRequest.trim() || !category || submitting} className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40">
              <Heart className="size-4" />
              {submitting ? "Sending..." : "Submit Prayer Request"}
            </button>
          </div>
        </motion.div>

        {/* Public Prayer Requests */}
        <h2 className="text-lg font-bold text-[#1A237E] mb-4">Community Prayers</h2>
        <div className="space-y-4">
          {prayers.map((prayer, i) => (
            <motion.div
              key={prayer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <p className="text-gray-800 text-sm leading-relaxed mb-4">{prayer.request}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 capitalize">{prayer.category}</span>
                <button
                  onClick={() => handlePray(prayer.id)}
                  className="inline-flex items-center gap-2 bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#D32F2F] px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                >
                  🙏 I&apos;m Praying With You
                  <span className="bg-[#D32F2F]/10 px-2 py-0.5 rounded-md text-xs font-bold">{prayer.prayerCount}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
