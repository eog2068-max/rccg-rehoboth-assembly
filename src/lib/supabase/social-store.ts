// RehobothSocial In-Memory Data Store
// This is a mock data layer that simulates Supabase.
// When Supabase is connected, replace these functions with actual Supabase queries.
// All data resets on server restart (intentional for mock mode).

import {
  SocialQuestion,
  QuestionResponse,
  PublicPrayerRequest,
  PrivatePrayerRequest,
  AmenWallPost,
  WeeklyChallenge,
  LiveSession,
  AttendanceIntention,
  PresenceRecord,
  ModerationLogEntry,
} from "./types";

// --- Presence ---
const presenceStore = new Map<string, number>(); // sessionId -> lastSeen timestamp

export function getPresenceCount(): number {
  const now = Date.now();
  const threshold = 5 * 60 * 1000; // 5 minutes
  let count = 0;
  presenceStore.forEach((ts) => {
    if (now - ts < threshold) count++;
  });
  // Add a base count to simulate real activity
  return count + Math.floor(Math.random() * 15) + 20;
}

export function recordPresence(sessionId: string): void {
  presenceStore.set(sessionId, Date.now());
  // Clean up old entries
  const now = Date.now();
  const threshold = 10 * 60 * 1000;
  presenceStore.forEach((ts, key) => {
    if (now - ts > threshold) presenceStore.delete(key);
  });
}

// --- Today's Question ---
const questions: SocialQuestion[] = [
  {
    id: "q1",
    question: "What are you thanking God for today?",
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalResponses: 47,
  },
  {
    id: "q2",
    question: "What are you trusting God for this week?",
    status: "published",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    totalResponses: 32,
  },
];

const questionResponses: QuestionResponse[] = [
  {
    id: "qr1",
    questionId: "q1",
    response: "For life, health, and my family. God has been so faithful!",
    displayName: "Anonymous",
    sessionId: "s1",
    status: "approved",
    reactions: { love: 12, praying: 8, amen: 15, fire: 5 },
    createdAt: new Date().toISOString(),
  },
  {
    id: "qr2",
    questionId: "q1",
    response: "God just opened a new door for me at work. Glory!",
    displayName: "Anonymous",
    sessionId: "s2",
    status: "approved",
    reactions: { love: 9, praying: 5, amen: 11, fire: 8 },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "qr3",
    questionId: "q1",
    response: "My son passed his exams. Thank You, Jesus!",
    displayName: "Anonymous",
    sessionId: "s3",
    status: "approved",
    reactions: { love: 18, praying: 12, amen: 20, fire: 6 },
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export function getCurrentQuestion(): SocialQuestion | null {
  return questions.find((q) => q.status === "published") || null;
}

export function getQuestionResponses(questionId: string): QuestionResponse[] {
  return questionResponses.filter(
    (r) => r.questionId === questionId && r.status === "approved"
  );
}

export function addQuestionResponse(
  questionId: string,
  response: string,
  sessionId: string,
  autoApprove: boolean = true
): QuestionResponse {
  const resp: QuestionResponse = {
    id: `qr_${Date.now()}`,
    questionId,
    response: response.substring(0, 200),
    displayName: "Anonymous",
    sessionId,
    status: autoApprove ? "approved" : "pending",
    reactions: { love: 0, praying: 0, amen: 0, fire: 0 },
    createdAt: new Date().toISOString(),
  };
  questionResponses.unshift(resp);
  const q = questions.find((q) => q.id === questionId);
  if (q) q.totalResponses++;
  return resp;
}

export function addReactionToResponse(
  responseId: string,
  type: "love" | "praying" | "amen" | "fire"
): QuestionResponse | null {
  const resp = questionResponses.find((r) => r.id === responseId);
  if (resp) {
    resp.reactions[type]++;
    return resp;
  }
  return null;
}

// --- Prayer Circle ---
const publicPrayers: PublicPrayerRequest[] = [
  {
    id: "pr1",
    request: "Please pray for my mother's health. She is going through surgery next week.",
    displayName: "Anonymous",
    category: "healing",
    sessionId: "s10",
    status: "approved",
    prayerCount: 27,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "pr2",
    request: "Pray for wisdom as I prepare for my final exams this month.",
    displayName: "Anonymous",
    category: "guidance",
    sessionId: "s11",
    status: "approved",
    prayerCount: 15,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: "pr3",
    request: "Standing in faith for a financial breakthrough for my family.",
    displayName: "Anonymous",
    category: "finances",
    sessionId: "s12",
    status: "approved",
    prayerCount: 34,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export function getPublicPrayerRequests(): PublicPrayerRequest[] {
  return publicPrayers.filter((p) => p.status === "approved");
}

export function addPublicPrayerRequest(
  request: string,
  category: string,
  sessionId: string,
 autoApprove: boolean = true
): PublicPrayerRequest {
  const prayer: PublicPrayerRequest = {
    id: `pr_${Date.now()}`,
    request: request.substring(0, 500),
    displayName: "Anonymous",
    category,
    sessionId,
    status: autoApprove ? "approved" : "pending",
    prayerCount: 0,
    createdAt: new Date().toISOString(),
  };
  publicPrayers.unshift(prayer);
  return prayer;
}

export function incrementPrayerCount(prayerId: string): PublicPrayerRequest | null {
  const prayer = publicPrayers.find((p) => p.id === prayerId);
  if (prayer) {
    prayer.prayerCount++;
    return prayer;
  }
  return null;
}

// --- Private Prayer Requests (Admin-only access) ---
const privatePrayers: PrivatePrayerRequest[] = [];

export function addPrivatePrayerRequest(
  request: string,
  category: string,
  fullName?: string,
  email?: string,
  phone?: string,
  isUrgent: boolean = false
): PrivatePrayerRequest {
  const prayer: PrivatePrayerRequest = {
    id: `priv_pr_${Date.now()}`,
    request: request.substring(0, 1000),
    fullName: fullName || undefined,
    email: email || undefined,
    phone: phone || undefined,
    category,
    isUrgent,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  privatePrayers.unshift(prayer);
  return prayer;
}

// Admin-only: retrieve all private prayers
export function getPrivatePrayerRequests(): PrivatePrayerRequest[] {
  return [...privatePrayers];
}

// Admin-only: mark as reviewed
export function markPrivatePrayerReviewed(prayerId: string): boolean {
  const prayer = privatePrayers.find((p) => p.id === prayerId);
  if (prayer) {
    prayer.status = "reviewed";
    return true;
  }
  return false;
}

// --- Moderation Queue ---
const moderationQueue: ModerationLogEntry[] = [];

export function getModerationQueue(): ModerationLogEntry[] {
  return [...moderationQueue];
}

export function addToModerationQueue(entry: Omit<ModerationLogEntry, "id" | "createdAt">): ModerationLogEntry {
  const logEntry: ModerationLogEntry = {
    ...entry,
    id: `mod_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  moderationQueue.unshift(logEntry);
  return logEntry;
}

export function approveModerationItem(id: string, targetCollection: "publicPrayers" | "amenPosts" | "questionResponses"): boolean {
  // Find in moderation queue and update status
  const item = moderationQueue.find((m) => m.id === id);
  if (!item) return false;
  item.action = "approved";

  // Find and approve in the target collection
  switch (targetCollection) {
    case "publicPrayers": {
      const prayer = publicPrayers.find((p) => p.id === item.targetId);
      if (prayer) prayer.status = "approved";
      break;
    }
    case "amenPosts": {
      const post = amenPosts.find((p) => p.id === item.targetId);
      if (post) post.status = "approved";
      break;
    }
    case "questionResponses": {
      const resp = questionResponses.find((r) => r.id === item.targetId);
      if (resp) resp.status = "approved";
      break;
    }
  }
  return true;
}

export function hideModerationItem(id: string, targetCollection: "publicPrayers" | "amenPosts" | "questionResponses"): boolean {
  const item = moderationQueue.find((m) => m.id === id);
  if (!item) return false;
  item.action = "hidden";

  switch (targetCollection) {
    case "publicPrayers": {
      const prayer = publicPrayers.find((p) => p.id === item.targetId);
      if (prayer) prayer.status = "hidden";
      break;
    }
    case "amenPosts": {
      const post = amenPosts.find((p) => p.id === item.targetId);
      if (post) post.status = "hidden";
      break;
    }
    case "questionResponses": {
      const resp = questionResponses.find((r) => r.id === item.targetId);
      if (resp) resp.status = "hidden";
      break;
    }
  }
  return true;
}

// --- Social Admin Overview Stats ---
export function getSocialOverviewStats() {
  return {
    presenceCount: getPresenceCount(),
    currentQuestion: getCurrentQuestion(),
    totalPublicPrayers: publicPrayers.filter((p) => p.status === "approved").length,
    totalPrivatePrayers: privatePrayers.length,
    pendingPrivatePrayers: privatePrayers.filter((p) => p.status === "new").length,
    totalAmenPosts: amenPosts.filter((p) => p.status === "approved").length,
    totalQuestionResponses: questionResponses.filter((r) => r.status === "approved").length,
    currentChallenge: getCurrentChallenge(),
    liveSession: getLiveSession(),
    moderationQueueSize: moderationQueue.filter((m) => m.action === "pending").length,
    totalAttendanceIntentions: attendanceIntentions.length,
  };
}

// --- Amen Wall ---
const amenPosts: AmenWallPost[] = [
  {
    id: "aw1",
    message: "God has been faithful to my family. Thank You, Lord!",
    displayName: "Anonymous",
    sessionId: "s20",
    status: "approved",
    reactions: { praying: 8, love: 12, amen: 15, fire: 3 },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "aw2",
    message: "Thank You, Jesus! My testimony is coming soon.",
    displayName: "Anonymous",
    sessionId: "s21",
    status: "approved",
    reactions: { praying: 5, love: 9, amen: 18, fire: 7 },
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "aw3",
    message: "Praying for everyone going through a difficult season. God is with you!",
    displayName: "Anonymous",
    sessionId: "s22",
    status: "approved",
    reactions: { praying: 20, love: 14, amen: 10, fire: 4 },
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
];

export function getAmenWallPosts(): AmenWallPost[] {
  return amenPosts.filter((p) => p.status === "approved");
}

export function addAmenWallPost(
  message: string,
  sessionId: string,
  autoApprove: boolean = true
): AmenWallPost {
  const post: AmenWallPost = {
    id: `aw_${Date.now()}`,
    message: message.substring(0, 200),
    displayName: "Anonymous",
    sessionId,
    status: autoApprove ? "approved" : "pending",
    reactions: { praying: 0, love: 0, amen: 0, fire: 0 },
    createdAt: new Date().toISOString(),
  };
  amenPosts.unshift(post);
  return post;
}

export function addReactionToAmenPost(
  postId: string,
  type: "praying" | "love" | "amen" | "fire"
): AmenWallPost | null {
  const post = amenPosts.find((p) => p.id === postId);
  if (post) {
    post.reactions[type]++;
    return post;
  }
  return null;
}

// --- Weekly Challenge ---
const challenges: WeeklyChallenge[] = [
  {
    id: "ch1",
    title: "Encourage one person who needs hope",
    description:
      "This week, reach out to at least one person who is going through a tough time. Send them a message of encouragement, share a scripture, or simply let them know you are praying for them. A small act of kindness can change someone's entire week.",
    status: "published",
    scheduledDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    participationCount: 126,
    createdAt: new Date().toISOString(),
  },
];

const challengeParticipations = new Set<string>();

export function getCurrentChallenge(): WeeklyChallenge | null {
  const now = new Date();
  return (
    challenges.find(
      (c) =>
        c.status === "published" &&
        new Date(c.scheduledDate) <= now &&
        new Date(c.endDate) >= now
    ) || null
  );
}

export function joinChallenge(
  challengeId: string,
  sessionId: string
): { joined: boolean; total: number } {
  const key = `${challengeId}:${sessionId}`;
  if (challengeParticipations.has(key)) {
    return { joined: false, total: challenges[0]?.participationCount || 0 };
  }
  challengeParticipations.add(key);
  const challenge = challenges.find((c) => c.id === challengeId);
  if (challenge) challenge.participationCount++;
  return { joined: true, total: challenge?.participationCount || 0 };
}

// --- Live Together ---
const liveSession: LiveSession = {
  id: "ls1",
  title: "Sunday Worship Service",
  status: "scheduled",
  youtubeUrl: "https://www.youtube.com/embed/live_stream?channel=CHANNEL_ID",
  viewerCount: 0,
};

export function getLiveSession(): LiveSession {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour * 60 + minute;

  // Sunday 7:00 AM - 10:00 AM
  if (day === 0 && time >= 420 && time <= 600) {
    liveSession.status = "live";
    liveSession.title = "Sunday Worship Service";
    liveSession.viewerCount = Math.floor(Math.random() * 200) + 150;
  }
  // Tuesday 5:30 PM - 7:00 PM
  else if (day === 2 && time >= 1050 && time <= 1140) {
    liveSession.status = "live";
    liveSession.title = "Tuesday Digging Deep";
    liveSession.viewerCount = Math.floor(Math.random() * 100) + 50;
  }
  // Thursday 5:30 PM - 7:00 PM
  else if (day === 4 && time >= 1050 && time <= 1140) {
    liveSession.status = "live";
    liveSession.title = "Thursday Faith Clinic";
    liveSession.viewerCount = Math.floor(Math.random() * 100) + 50;
  } else {
    liveSession.status = "scheduled";
    liveSession.viewerCount = 0;
  }

  return { ...liveSession };
}

const liveReactionCounts = { worship: 0, prayer: 0, love: 0, fire: 0 };

export function addLiveReaction(
  type: "worship" | "prayer" | "love" | "fire"
): Record<string, number> {
  liveReactionCounts[type]++;
  return { ...liveReactionCounts };
}

export function getLiveReactionCounts(): Record<string, number> {
  return { ...liveReactionCounts };
}

// --- Who's Coming? ---
const attendanceIntentions: AttendanceIntention[] = [];

export function addAttendanceIntention(
  eventId: string,
  sessionId: string,
  type: "self" | "family" | "friend"
): { counts: { self: number; family: number; friend: number; total: number } } {
  const key = `${eventId}:${sessionId}`;
  const existing = attendanceIntentions.find((a) => a.sessionId === sessionId && a.eventId === eventId);
  if (existing) {
    existing.type = type;
  } else {
    attendanceIntentions.push({
      id: `att_${Date.now()}`,
      eventId,
      sessionId,
      type,
      createdAt: new Date().toISOString(),
    });
  }
  return getAttendanceCounts(eventId);
}

export function getAttendanceCounts(eventId: string): {
  self: number;
  family: number;
  friend: number;
  total: number;
} {
  const eventIntentions = attendanceIntentions.filter((a) => a.eventId === eventId);
  const self = eventIntentions.filter((a) => a.type === "self").length;
  const family = eventIntentions.filter((a) => a.type === "family").length;
  const friend = eventIntentions.filter((a) => a.type === "friend").length;
  return { self, family, friend, total: self + family + friend };
}

// Seed some mock attendance data
addAttendanceIntention("ev1", "mock_s1", "self");
addAttendanceIntention("ev1", "mock_s2", "self");
addAttendanceIntention("ev1", "mock_s3", "family");
addAttendanceIntention("ev1", "mock_s4", "self");
addAttendanceIntention("ev1", "mock_s5", "friend");
