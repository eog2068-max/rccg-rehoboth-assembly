// Content Moderation & Anti-Spam Layer
// Server-side only — never expose this logic to the client

// Basic profanity/toxicity word list (expandable)
const PROFANITY_LIST = [
  "damn", "hell", "ass", "bastard", "crap", "shit", "fuck", "dick",
  "bitch", "whore", "slut", "nigger", "nigga", "fag", "faggot",
  "piss", "cock", "pussy", "twat", "wanker",
];

// Spam detection patterns
const SPAM_PATTERNS = [
  /(.)\1{3,}/g,           // Repeated characters (3+ of same char)
  /^[\s\d]*$/,            // Only numbers/spaces
  /https?:\/\/\S+/gi,     // URL patterns
  /[\w.-]+@[\w.-]+\.\w{2,}/gi, // Email addresses
  /\+?[\d\s-]{10,}/g,    // Phone numbers
];

// Duplicate submission tracking
const recentSubmissions = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 30_000; // 30 seconds
const MAX_RECENT_SUBMISSIONS = 100;

// Clean up old submissions periodically
setInterval(() => {
  const now = Date.now();
  recentSubmissions.forEach((ts, key) => {
    if (now - ts > DUPLICATE_WINDOW_MS) recentSubmissions.delete(key);
  });
  if (recentSubmissions.size > MAX_RECENT_SUBMISSIONS) {
    const entries = Array.from(recentSubmissions.entries()).sort((a, b) => a[1] - b[1]);
    entries.slice(0, entries.length - MAX_RECENT_SUBMISSIONS).forEach(([key]) => recentSubmissions.delete(key));
  }
}, 60_000);

export function containsProfanity(text: string): boolean {
  const words = text.toLowerCase().split(/\s+/);
  return words.some((word) => {
    const cleaned = word.replace(/[^a-z]/g, "");
    return cleaned.length > 2 && PROFANITY_LIST.includes(cleaned);
  });
}

export function matchesSpamPatterns(text: string): boolean {
  return SPAM_PATTERNS.some((pattern) => {
    pattern.lastIndex = 0;
    return pattern.test(text);
  });
}

export function sanitizeText(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;\s]+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function isDuplicateSubmission(sessionId: string, content: string): boolean {
  const key = `${sessionId}:${content.toLowerCase().trim().slice(0, 100)}`;
  const existing = recentSubmissions.get(key);
  if (existing && Date.now() - existing < DUPLICATE_WINDOW_MS) return true;
  recentSubmissions.set(key, Date.now());
  return false;
}

export interface ModerationResult {
  allowed: boolean;
  sanitized: string;
  reason?: string;
}

export function moderateContent(
  text: string,
  sessionId: string,
  options: { maxLength?: number; minLength?: number } = {}
): ModerationResult {
  const { maxLength = 500, minLength = 1 } = options;
  const sanitized = sanitizeText(text);

  if (sanitized.length < minLength) {
    return { allowed: false, sanitized: "", reason: `Content must be at least ${minLength} character(s).` };
  }
  if (sanitized.length > maxLength) {
    return { allowed: false, sanitized: "", reason: `Content must be ${maxLength} characters or fewer.` };
  }
  if (isDuplicateSubmission(sessionId, sanitized)) {
    return { allowed: false, sanitized: "", reason: "Duplicate submission detected. Please wait a moment." };
  }
  if (containsProfanity(sanitized)) {
    return { allowed: false, sanitized: "", reason: "Your message contains inappropriate language. Please revise and try again." };
  }
  if (matchesSpamPatterns(sanitized)) {
    return { allowed: false, sanitized: "", reason: "Your message appears to contain spam content. Links, emails, and repeated text are not allowed." };
  }

  return { allowed: true, sanitized };
}
