// Simple in-memory rate limiter per session ID
// Tracks request counts within a sliding window

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000; // 1 minute window
const MAX_REQUESTS = 60; // requests per window (generous for social features)

// Periodic cleanup to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  rateLimitStore.forEach((entry, key) => {
    if (now >= entry.resetAt) {
      rateLimitStore.delete(key);
    }
  });
}, 60_000);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(sessionId: string, limit = MAX_REQUESTS): RateLimitResult {
  const now = Date.now();
  let entry = rateLimitStore.get(sessionId);

  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    rateLimitStore.set(sessionId, entry);
  }

  entry.count++;

  if (entry.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  return {
    allowed: true,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
  };
}
