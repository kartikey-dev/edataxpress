'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, SERVICES } from '@/lib/content';
import { validateEnquiryPayload, type EnquiryServiceOption } from '@/lib/enquiry';

type FieldErrors = Partial<
  Record<
    | 'name'
    | 'organization'
    | 'email'
    | 'phone'
    | 'service'
    | 'product'
    | 'message'
    | 'consent'
    | 'form',
    string
  >
>;

export function EnquiryForm({
  initialService,
  initialProduct,
}: {
  initialService?: EnquiryServiceOption;
  initialProduct?: string;
}) {
  const searchParams = useSearchParams();
  const queryService = searchParams.get('service') ?? undefined;
  const queryProduct = searchParams.get('product') ?? undefined;

  const defaultService =
    initialService ?? (queryService as EnquiryServiceOption | undefined) ?? 'general';
  const defaultProduct = initialProduct ?? queryProduct ?? '';

  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState<string>(defaultService);
  const [product, setProduct] = useState<string>(defaultProduct);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage(null);

    const payload = {
      name,
      organization,
      email,
      phone,
      service,
      product,
      message,
      consent,
      website,
    };

    const clientCheck = validateEnquiryPayload(payload);
    if (!clientCheck.ok) {
      setErrors(clientCheck.errors);
      setStatusMessage({
        type: 'error',
        text: clientCheck.errors.form ?? 'Please review the highlighted fields below.',
      });
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setStatusMessage({
          type: 'error',
          text:
            result.errors?.form ??
            'Could not submit your enquiry. Please review the form and try again.',
        });
        return;
      }

      setStatusMessage({
        type: 'success',
        text: result.message ?? 'Your enquiry has been received.',
      });
      setName('');
      setOrganization('');
      setEmail('');
      setPhone('');
      setMessage('');
      setConsent(false);
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Network error while submitting your enquiry. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="enquiry-website">Website</label>
        <input
          id="enquiry-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="enquiry-name">Your name *</label>
          <input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            placeholder="Full name"
          />
          {errors.name ? (
            <p className="field-error" id="error-name">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="enquiry-organization">Organization / Institution</label>
          <input
            id="enquiry-organization"
            name="organization"
            autoComplete="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? 'error-organization' : undefined}
            placeholder="School, institute, or company (optional)"
          />
          {errors.organization ? (
            <p className="field-error" id="error-organization">
              {errors.organization}
            </p>
          ) : null}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="enquiry-email">Email address *</label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            placeholder="you@organization.com"
          />
          {errors.email ? (
            <p className="field-error" id="error-email">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="enquiry-phone">Phone / WhatsApp</label>
          <input
            id="enquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'error-phone' : undefined}
            placeholder="+91 ... (optional)"
          />
          {errors.phone ? (
            <p className="field-error" id="error-phone">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="enquiry-service">Service interest *</label>
          <select
            id="enquiry-service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? 'error-service' : undefined}
          >
            <option value="general">General enquiry</option>
            {SERVICES.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p className="field-error" id="error-service">
              {errors.service}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="enquiry-product">Specific hardware (optional)</label>
          <select
            id="enquiry-product"
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            <option value="">Not specific / Service only</option>
            {PRODUCTS.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="enquiry-message">Project details *</label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
          placeholder="Tell us about your book, print specifications, studio room requirements, or campaign goals..."
        />
        {errors.message ? (
          <p className="field-error" id="error-message">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div>
        <label className="consent-row" htmlFor="enquiry-consent">
          <input
            id="enquiry-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'error-consent' : undefined}
          />
          <span>
            I consent to eDataXpress using these details solely to respond to my enquiry, as
            described in our{' '}
            <Link className="text-link" href="/privacy-policy">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p className="field-error" id="error-consent">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div>
        <button className="button button-primary" type="submit" disabled={submitting}>
          {submitting ? 'Sending enquiry...' : 'Send enquiry'} <span aria-hidden="true">↗</span>
        </button>
      </div>

      {statusMessage ? (
        <p
          role="status"
          aria-live="polite"
          className={`form-status ${
            statusMessage.type === 'success' ? 'form-status-success' : 'form-status-error'
          }`}
        >
          {statusMessage.text}
        </p>
      ) : null}
    </form>
  );
}
