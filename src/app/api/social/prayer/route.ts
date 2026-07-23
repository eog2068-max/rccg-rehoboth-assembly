import { NextRequest, NextResponse } from 'next/server';
import { getPublicPrayerRequests, addPublicPrayerRequest } from '@/lib/supabase/social-store';
import { checkRateLimit } from '@/lib/rate-limit';

const VALID_CATEGORIES = ['healing', 'guidance', 'finances', 'family', 'career', 'salvation', 'other'] as const;

export async function GET(request: NextRequest) {
  const sessionId = request.headers.get('x-session-id') || 'anonymous';
  const rateLimit = checkRateLimit(sessionId, 60);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimit.resetAt),
        },
      }
    );
  }

  try {
    const prayers = getPublicPrayerRequests();
    return NextResponse.json(
      { prayers },
      {
        headers: {
          'X-RateLimit-Remaining': String(rateLimit.remaining),
          'X-RateLimit-Reset': String(rateLimit.resetAt),
        },
      }
    );
  } catch (error) {
    console.error('[Prayer GET] Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve prayer requests.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const sessionId = request.headers.get('x-session-id') || 'anonymous';
  const rateLimit = checkRateLimit(sessionId, 10);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimit.resetAt),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const { request: prayerRequest, category } = body as {
      request?: string;
      category?: string;
      sessionId?: string;
    };

    if (!prayerRequest) {
      return NextResponse.json(
        { error: 'Missing required field: request.' },
        { status: 400 }
      );
    }

    if (prayerRequest.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prayer request cannot be empty.' },
        { status: 400 }
      );
    }

    if (prayerRequest.length > 500) {
      return NextResponse.json(
        { error: 'Prayer request must be 500 characters or fewer.' },
        { status: 400 }
      );
    }

    const selectedCategory = category && VALID_CATEGORIES.includes(category as any)
      ? category
      : 'other';

    const prayer = addPublicPrayerRequest(
      prayerRequest.trim(),
      selectedCategory,
      sessionId
    );

    return NextResponse.json(
      { prayer },
      {
        status: 201,
        headers: {
          'X-RateLimit-Remaining': String(rateLimit.remaining),
          'X-RateLimit-Reset': String(rateLimit.resetAt),
        },
      }
    );
  } catch (error) {
    console.error('[Prayer POST] Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit prayer request.' },
      { status: 500 }
    );
  }
}
