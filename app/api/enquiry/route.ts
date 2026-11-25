import { NextResponse } from 'next/server';
import { checkRateLimit, validateEnquiryPayload } from '@/lib/enquiry';

function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip')?.trim() || 'anonymous';
}

export async function POST(request: Request) {
  const clientId = getClientIdentifier(request);
  if (!checkRateLimit(clientId)) {
    return NextResponse.json(
      {
        ok: false,
        errors: { form: 'Too many enquiries sent recently. Please try again shortly.' },
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: 'Invalid request body.' } },
      { status: 400 },
    );
  }

  const validation = validateEnquiryPayload(body);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
  }

  const apiUrl = process.env.CONTACT_API_URL?.trim();
  const apiKey = process.env.CONTACT_API_KEY?.trim();

  if (apiUrl) {
    try {
      const headers: Record<string, string> = {
        'content-type': 'application/json',
      };
      if (apiKey) {
        headers.authorization = `Bearer ${apiKey}`;
      }

      const upstream = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          source: 'edataxpress-website',
          submittedAt: new Date().toISOString(),
          ...validation.data,
        }),
      });

      if (!upstream.ok) {
        return NextResponse.json(
          {
            ok: false,
            errors: {
              form: 'We could not deliver your enquiry right now. Please try again shortly.',
            },
          },
          { status: 502 },
        );
      }

      return NextResponse.json(
        {
          ok: true,
          mode: 'delivered',
          message: 'Thank you. Your enquiry has been received by the eDataXpress team.',
        },
        { status: 200 },
      );
    } catch {
      return NextResponse.json(
        {
          ok: false,
          errors: {
            form: 'We could not connect to the enquiry destination right now. Please try again later.',
          },
        },
        { status: 502 },
      );
    }
  }

  return NextResponse.json(
    {
      ok: true,
      mode: 'staging',
      message:
        'Enquiry details received in staging mode. Live delivery will activate once the owner confirms the enquiry destination.',
    },
    { status: 202 },
  );
}
