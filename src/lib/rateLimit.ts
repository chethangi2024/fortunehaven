// Server-side sliding-window in-memory rate limiter for serverless route handlers
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // Clean up stale records periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetAt < now) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || record.resetAt < now) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetInSec: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInSec: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetInSec: Math.ceil((record.resetAt - now) / 1000),
  };
}

// Input sanitizer: strips potential script/HTML tags and trims whitespace
export function sanitizeString(input: unknown, maxLength: number = 500): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // basic tag neutralizer
    .trim()
    .slice(0, maxLength);
}
