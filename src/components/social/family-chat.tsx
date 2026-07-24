"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Flag,
  ChevronLeft,
  Hash,
  Megaphone,
  SmilePlus,
  Reply,
  X,
  Loader2,
} from "lucide-react";
import { BackToSocial } from "./back-to-social";

interface Channel {
  id: string;
  name: string;
  emoji: string;
  description: string;
  isAnnouncement: boolean;
  messageCount: number;
  lastMessageAt?: string;
}

interface Message {
  id: string;
  content: string;
  displayName: string;
  isAnnouncement: boolean;
  replyToId?: string;
  reactions: Record<string, number>;
  createdAt: string;
}

const REACTION_OPTIONS = ["❤️", "🙏", "🙌", "🔥", "👍"];

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

export function FamilyChat() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [reporting, setReporting] = useState<string | null>(null);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionIdRef = useRef(
    typeof window !== "undefined"
      ? sessionStorage.getItem("rs_session") || `user_${Date.now()}`
      : `user_${Date.now()}`
  );

  // Set session ID
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!sessionStorage.getItem("rs_session")) {
        sessionStorage.setItem("rs_session", sessionIdRef.current);
      }
    }
  }, []);

  // Load channels
  useEffect(() => {
    fetch("/api/social/chat/channels")
      .then((r) => r.json())
      .then((d) => {
        setChannels(d.channels || []);
        if (d.channels?.[0]) setActiveChannel(d.channels[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Load messages when channel changes
  const loadMessages = useCallback(
    async (channelId: string) => {
      try {
        const r = await fetch(
          `/api/social/chat/messages?channelId=${channelId}`
        );
        const d = await r.json();
        setMessages(d.messages || []);
      } catch {
        setMessages([]);
      }
    },
    []
  );

  useEffect(() => {
    if (activeChannel) {
      loadMessages(activeChannel.id);
      setReplyingTo(null);
      setShowReactions(null);
      setReporting(null);
    }
  }, [activeChannel, loadMessages]);

  // Poll for new messages
  useEffect(() => {
    if (!activeChannel) return;
    const interval = setInterval(() => {
      loadMessages(activeChannel.id);
    }, 8000);
    return () => clearInterval(interval);
  }, [activeChannel, loadMessages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const sendMessage = async () => {
    if (!inputText.trim() || !activeChannel || sending) return;
    setSending(true);
    try {
      await fetch("/api/social/chat/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionIdRef.current,
        },
        body: JSON.stringify({
          channelId: activeChannel.id,
          content: inputText.trim(),
          replyToId: replyingTo?.id,
        }),
      });
      setInputText("");
      setReplyingTo(null);
      loadMessages(activeChannel.id);
    } catch {
      // Silently fail
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const addReaction = async (messageId: string, reaction: string) => {
    try {
      await fetch(`/api/social/chat/messages/${messageId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction }),
      });
      loadMessages(activeChannel?.id || "");
      setShowReactions(null);
    } catch {
      // Silently fail
    }
  };

  const reportMessage = async (messageId: string) => {
    if (!activeChannel) return;
    setReporting(null);
    try {
      await fetch(`/api/social/chat/messages/${messageId}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionIdRef.current,
        },
        body: JSON.stringify({
          channelId: activeChannel.id,
          reason: "Inappropriate content",
        }),
      });
    } catch {
      // Silently fail
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center">
        <BackToSocial />
        <Loader2 className="size-8 text-[#1A237E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <BackToSocial />

      <div className="flex h-[calc(100vh-60px)] max-w-5xl mx-auto">
        {/* Channel Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-64 md:w-72 bg-white border-r border-gray-100 flex flex-col shrink-0 shadow-sm"
            >
              {/* Sidebar header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💬</span>
                  <h2 className="text-sm font-bold text-[#1A237E]">FamilyChat</h2>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 leading-tight">
                  I Remain Connected To My Church Family Throughout The Week.
                </p>
              </div>

              {/* Channel list */}
              <div className="flex-1 overflow-y-auto py-2">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setActiveChannel(ch);
                      if (window.innerWidth < 768) setShowSidebar(false);
                    }}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                      activeChannel?.id === ch.id
                        ? "bg-[#1A237E]/5 border-l-3 border-[#1A237E]"
                        : "hover:bg-gray-50 border-l-3 border-transparent"
                    }`}
                  >
                    <span className="text-lg shrink-0">{ch.emoji}</span>
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-medium truncate ${
                          activeChannel?.id === ch.id
                            ? "text-[#1A237E]"
                            : "text-gray-700"
                        }`}
                      >
                        {ch.name}
                      </p>
                      <p className="text-[10px] text-gray-400 truncate">
                        {ch.isAnnouncement
                          ? `${ch.messageCount} announcements`
                          : `${ch.messageCount} messages`}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Community guidelines link */}
              <div className="p-3 border-t border-gray-100">
                <p className="text-[9px] text-gray-400 text-center leading-tight">
                  Be kind. Be respectful. Be Christ-like.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 shadow-sm">
            {!showSidebar && (
              <button
                onClick={() => setShowSidebar(true)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="size-5 text-gray-500" />
              </button>
            )}
            {activeChannel ? (
              <>
                <span className="text-xl">{activeChannel.emoji}</span>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    {activeChannel.isAnnouncement && (
                      <Megaphone className="size-3 inline mr-1 text-amber-500" />
                    )}
                    {activeChannel.name}
                  </h3>
                  <p className="text-[10px] text-gray-400">
                    {activeChannel.description}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500">Select a channel</p>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {/* Pinned / Announcement banner */}
            {activeChannel?.isAnnouncement && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 mb-4">
                <Megaphone className="size-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-800">
                    Announcements Channel
                  </p>
                  <p className="text-[10px] text-amber-600 mt-0.5">
                    Official updates from church leadership appear here.
                  </p>
                </div>
              </div>
            )}

            {activeChannel && messages.length === 0 && (
              <div className="text-center py-12">
                <span className="text-4xl mb-3 block">
                  {activeChannel.emoji}
                </span>
                <p className="text-sm text-gray-500">
                  No messages yet in {activeChannel.name}.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Start the conversation!
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className="group relative">
                {/* Announcement style */}
                {msg.isAnnouncement ? (
                  <div className="bg-gradient-to-r from-[#1A237E]/5 to-[#283593]/5 border border-[#1A237E]/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Megaphone className="size-3.5 text-[#1A237E]" />
                      <span className="text-xs font-bold text-[#1A237E]">
                        {msg.displayName}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {formatTimeAgo(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {msg.content}
                    </p>
                    <MessageReactions
                      reactions={msg.reactions}
                      onReact={(r) => addReaction(msg.id, r)}
                      showPicker={showReactions === msg.id}
                      onTogglePicker={() =>
                        setShowReactions(
                          showReactions === msg.id ? null : msg.id
                        )
                      }
                    />
                  </div>
                ) : (
                  <div className="flex gap-2.5">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1A237E] to-[#283593] flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">
                        {msg.displayName.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Name + time */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-semibold text-gray-800">
                          {msg.displayName}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {formatTimeAgo(msg.createdAt)}
                        </span>
                      </div>

                      {/* Reply reference */}
                      {msg.replyToId && (
                        <div className="mt-1 bg-gray-50 border-l-2 border-[#1A237E]/30 rounded-r px-2.5 py-1.5">
                          <p className="text-[10px] text-gray-500 italic">
                            replying to a message in thread
                          </p>
                        </div>
                      )}

                      {/* Content */}
                      <p className="mt-1 text-sm text-gray-700 leading-relaxed break-words">
                        {msg.content}
                      </p>

                      {/* Reactions */}
                      <MessageReactions
                        reactions={msg.reactions}
                        onReact={(r) => addReaction(msg.id, r)}
                        showPicker={showReactions === msg.id}
                        onTogglePicker={() =>
                          setShowReactions(
                            showReactions === msg.id ? null : msg.id
                          )
                        }
                      />

                      {/* Action buttons (hover) */}
                      <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setReplyingTo(msg)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"
                          title="Reply"
                        >
                          <Reply className="size-3" />
                        </button>
                        <button
                          onClick={() => setReporting(msg.id)}
                          className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"
                          title="Report"
                        >
                          <Flag className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          {activeChannel && (
            <div className="bg-white border-t border-gray-100 p-3">
              {/* Replying to indicator */}
              {replyingTo && (
                <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 mb-2 text-xs">
                  <Reply className="size-3 text-[#1A237E]" />
                  <span className="text-gray-600 flex-1 truncate">
                    Replying to: {replyingTo.content.substring(0, 60)}...
                  </span>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              )}

              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message ${activeChannel.name}...`}
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]/20 focus:border-[#1A237E]/30 transition-colors min-h-[42px] max-h-24"
                  style={{ lineHeight: "1.5" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim() || sending}
                  className="shrink-0 w-10 h-10 rounded-xl bg-[#1A237E] hover:bg-[#283593] text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {reporting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setReporting(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Flag className="size-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    Report Message
                  </h3>
                  <p className="text-xs text-gray-500">
                    This will be reviewed by a moderator
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-5 leading-relaxed">
                Are you sure you want to report this message? Reports are
                confidential and will be reviewed by a church moderator.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setReporting(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => reportMessage(reporting)}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-medium text-white transition-colors"
                >
                  Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reactions sub-component
function MessageReactions({
  reactions,
  onReact,
  showPicker,
  onTogglePicker,
}: {
  reactions: Record<string, number>;
  onReact: (r: string) => void;
  showPicker: boolean;
  onTogglePicker: () => void;
}) {
  const totalReactions = Object.values(reactions).reduce((a, b) => a + b, 0);

  return (
    <div className="flex items-center gap-1 mt-1.5 flex-wrap">
      {/* Existing reactions */}
      {Object.entries(reactions)
        .filter(([, count]) => count > 0)
        .map(([emoji, count]) => (
          <button
            key={emoji}
            onClick={() => onReact(emoji)}
            className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-0.5 text-xs transition-colors"
          >
            <span>{emoji}</span>
            <span className="text-gray-500">{count}</span>
          </button>
        ))}

      {/* Add reaction button */}
      <button
        onClick={onTogglePicker}
        className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full px-2 py-0.5 text-xs transition-colors"
        title="Add reaction"
      >
        <SmilePlus className="size-3" />
      </button>

      {/* Reaction picker */}
      {showPicker && (
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm">
          {REACTION_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onReact(emoji)}
              className="hover:scale-125 transition-transform p-0.5"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
