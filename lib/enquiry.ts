import { SERVICES, PRODUCTS } from './content';

export type EnquiryServiceOption =
  'publication' | 'printing-solutions' | 'digital-studio-setup' | 'digital-marketing' | 'general';

export type ValidatedEnquiry = {
  readonly name: string;
  readonly organization: string;
  readonly email: string;
  readonly phone: string;
  readonly service: EnquiryServiceOption;
  readonly product: string;
  readonly message: string;
  readonly consent: true;
};

export type ValidationResult =
  | { readonly ok: true; readonly data: ValidatedEnquiry }
  | {
      readonly ok: false;
      readonly errors: Partial<Record<keyof ValidatedEnquiry | 'form', string>>;
      readonly spamDetected?: boolean;
    };

const VALID_SERVICES = new Set<string>([...SERVICES.map((s) => s.slug), 'general']);

const VALID_PRODUCTS = new Set<string>(PRODUCTS.map((p) => p.slug));

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d][\d\s()-]{6,19}$/;

function cleanText(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim();
}

export function validateEnquiryPayload(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== 'object') {
    return { ok: false, errors: { form: 'Please provide valid enquiry details.' } };
  }

  const input = raw as Record<string, unknown>;
  const honeypot = cleanText(input.website);
  if (honeypot.length > 0) {
    return {
      ok: false,
      spamDetected: true,
      errors: { form: 'Unable to process this submission.' },
    };
  }

  const name = cleanText(input.name);
  const organization = cleanText(input.organization);
  const email = cleanText(input.email);
  const phone = cleanText(input.phone);
  const rawService = cleanText(input.service) || 'general';
  const rawProduct = cleanText(input.product);
  const message = cleanText(input.message);
  const consent = input.consent === true;

  const errors: Partial<Record<keyof ValidatedEnquiry | 'form', string>> = {};

  if (name.length < 2 || name.length > 120) {
    errors.name = 'Please enter your name (2–120 characters).';
  }

  if (organization.length > 150) {
    errors.organization = 'Organization name must be 150 characters or fewer.';
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 160) {
    errors.email = 'Please enter a valid email address.';
  }

  if (phone.length > 0 && !PHONE_PATTERN.test(phone)) {
    errors.phone = 'Please enter a valid phone number or leave this field blank.';
  }

  if (!VALID_SERVICES.has(rawService)) {
    errors.service = 'Please select a valid service option.';
  }

  if (rawProduct.length > 0 && !VALID_PRODUCTS.has(rawProduct)) {
    errors.product = 'Selected product option is not recognized.';
  }

  if (message.length < 10 || message.length > 3000) {
    errors.message = 'Please share project details (10–3000 characters).';
  }

  if (!consent) {
    errors.consent = 'Please confirm consent so eDataXpress can respond to your enquiry.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      organization,
      email,
      phone,
      service: rawService as EnquiryServiceOption,
      product: rawProduct,
      message,
      consent: true,
    },
  };
}

const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const rateStore = new Map<string, number[]>();

export function checkRateLimit(identifier: string, now = Date.now()): boolean {
  const key = identifier || 'anonymous';
  const recent = (rateStore.get(key) ?? []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX_REQUESTS) {
    rateStore.set(key, recent);
    return false;
  }
  recent.push(now);
  rateStore.set(key, recent);
  return true;
}

export function resetRateLimitStore(): void {
  rateStore.clear();
}
