import { describe, expect, it, vi, beforeEach } from 'vitest';
import { validateEnquiryPayload, checkRateLimit, resetRateLimitStore } from '@/lib/enquiry';
import { POST } from '@/app/api/enquiry/route';

describe('Enquiry payload validation', () => {
  it('accepts a valid enquiry payload and trims fields', () => {
    const result = validateEnquiryPayload({
      name: '  Aarav Mehta  ',
      organization: '  Delhi Public Academy ',
      email: 'aarav@example.org',
      phone: '+91 98110 12345',
      service: 'digital-studio-setup',
      product: 'interactive-flat-panel-65',
      message: 'Need a quote and datasheet for two 65-inch panels for our classrooms.',
      consent: true,
      website: '',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe('Aarav Mehta');
      expect(result.data.organization).toBe('Delhi Public Academy');
      expect(result.data.service).toBe('digital-studio-setup');
      expect(result.data.product).toBe('interactive-flat-panel-65');
    }
  });

  it('rejects missing required fields, invalid email, invalid phone, missing consent, and oversized input', () => {
    const invalid = validateEnquiryPayload({
      name: 'A',
      email: 'not-an-email',
      phone: '123',
      service: 'publication',
      message: 'Hi',
      consent: false,
    });

    expect(invalid.ok).toBe(false);
    if (!invalid.ok) {
      expect(invalid.errors.name).toBeDefined();
      expect(invalid.errors.email).toBeDefined();
      expect(invalid.errors.phone).toBeDefined();
      expect(invalid.errors.message).toBeDefined();
      expect(invalid.errors.consent).toBeDefined();
    }

    const oversized = validateEnquiryPayload({
      name: 'Valid Name',
      email: 'valid@example.com',
      service: 'publication',
      message: 'x'.repeat(3001),
      consent: true,
    });
    expect(oversized.ok).toBe(false);
    if (!oversized.ok) {
      expect(oversized.errors.message).toBeDefined();
    }
  });

  it('flags honeypot spam submissions', () => {
    const spam = validateEnquiryPayload({
      name: 'Bot User',
      email: 'bot@example.com',
      service: 'publication',
      message: 'Automated message for testing spam filter.',
      consent: true,
      website: 'https://spam.example.com',
    });
    expect(spam.ok).toBe(false);
    if (!spam.ok) {
      expect(spam.spamDetected).toBe(true);
    }
  });
});

describe('Rate limiting & /api/enquiry route', () => {
  beforeEach(() => {
    resetRateLimitStore();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('enforces per-identifier request limits', () => {
    for (let i = 0; i < 5; i += 1) {
      expect(checkRateLimit('192.0.2.10', 1000)).toBe(true);
    }
    expect(checkRateLimit('192.0.2.10', 1000)).toBe(false);
    expect(checkRateLimit('192.0.2.10', 1000 + 60 * 60 * 1000)).toBe(true);
  });

  it('returns 400 on invalid POST payload', async () => {
    const request = new Request('http://localhost/api/enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '198.51.100.1' },
      body: JSON.stringify({ name: '', email: 'bad', message: '', consent: false }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.ok).toBe(false);
    expect(json.errors).toBeDefined();
  });

  it('accepts valid POST payload in staging mode and forwards when webhook is configured', async () => {
    const validBody = {
      name: 'Priya Sharma',
      organization: 'Navodaya Learning',
      email: 'priya@example.org',
      phone: '+91 98100 54321',
      service: 'digital-studio-setup',
      product: 'interactive-flat-panel-65',
      message: 'Please share the approved 65-inch interactive panel datasheet and quote.',
      consent: true,
      website: '',
    };

    const stagingReq = new Request('http://localhost/api/enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '198.51.100.2' },
      body: JSON.stringify(validBody),
    });
    const stagingRes = await POST(stagingReq);
    expect(stagingRes.status).toBe(202);
    const stagingJson = await stagingRes.json();
    expect(stagingJson.ok).toBe(true);
    expect(stagingJson.mode).toBe('staging');

    vi.stubEnv('CONTACT_API_URL', 'https://hooks.example.test/enquiry');
    vi.stubEnv('CONTACT_API_KEY', 'secret-test-key');
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ id: 'lead-1' }), { status: 200 }));

    const liveReq = new Request('http://localhost/api/enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '198.51.100.3' },
      body: JSON.stringify(validBody),
    });
    const liveRes = await POST(liveReq);
    expect(liveRes.status).toBe(200);
    const liveJson = await liveRes.json();
    expect(liveJson.ok).toBe(true);
    expect(liveJson.mode).toBe('delivered');
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it('returns 400 on malformed JSON, 429 on rate limit, and 502 on upstream failure', async () => {
    const malformedReq = new Request('http://localhost/api/enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-real-ip': '203.0.113.9' },
      body: '{bad-json',
    });
    const malformedRes = await POST(malformedReq);
    expect(malformedRes.status).toBe(400);

    for (let i = 0; i < 4; i += 1) {
      checkRateLimit('203.0.113.9');
    }
    const limitedRes = await POST(
      new Request('http://localhost/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-real-ip': '203.0.113.9' },
        body: JSON.stringify({}),
      }),
    );
    expect(limitedRes.status).toBe(429);

    vi.stubEnv('CONTACT_API_URL', 'https://hooks.example.test/fail');
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('fail', { status: 500 }));
    const upstreamFailRes = await POST(
      new Request('http://localhost/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-real-ip': '203.0.113.10' },
        body: JSON.stringify({
          name: 'Neha Kapoor',
          email: 'neha@example.org',
          service: 'publication',
          message: 'Requesting editorial layout quote for upcoming textbook series.',
          consent: true,
        }),
      }),
    );
    expect(upstreamFailRes.status).toBe(502);
  });
});
