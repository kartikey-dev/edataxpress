import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BUSINESS_PROFILE, buildBreadcrumbJsonLd } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${BUSINESS_PROFILE.name} collects, validates, and uses enquiry information submitted through this website.`,
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: `Privacy Policy | ${BUSINESS_PROFILE.name}`,
    description: `Enquiry data handling and privacy practices for ${BUSINESS_PROFILE.name}.`,
    url: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <div className="eyebrow">
            <span className="eyebrow-rule" />
            Governance &amp; Data Handling
          </div>
          <h1>Privacy Policy</h1>
          <p className="lead">
            This policy explains how {BUSINESS_PROFILE.name} handles personal and business contact
            information submitted through our website enquiry workflow.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-prose">
          <article className="editorial-card">
            <span className="card-index">01</span>
            <h2>Information You Provide</h2>
            <p>
              When you submit the enquiry form on our{' '}
              <Link className="text-link" href="/contact">
                Contact page
              </Link>
              , we collect only the details you enter: your name, optional organization name, email
              address, optional phone or WhatsApp number, selected service or hardware interest,
              project message, and your explicit consent confirmation.
            </p>
          </article>

          <article className="editorial-card">
            <span className="card-index">02</span>
            <h2>How We Use Enquiry Details</h2>
            <p>
              Submitted details are used solely to review your request, share relevant service
              proposals or approved hardware datasheets, and communicate with you about your
              enquiry. We do not sell or rent contact details to third parties.
            </p>
          </article>

          <article className="editorial-card">
            <span className="card-index">03</span>
            <h2>Validation, Security &amp; Cookies</h2>
            <p>
              Our enquiry endpoint validates submitted fields on the server and applies basic
              anti-spam and per-IP rate limiting to protect service availability. This website does
              not currently run advertising trackers or third-party marketing cookies.
            </p>
          </article>

          <article className="editorial-card">
            <span className="card-index">04</span>
            <h2>Contact &amp; Data Requests</h2>
            <p>
              To update, correct, or request deletion of information you previously sent to{' '}
              {BUSINESS_PROFILE.name}, contact us at{' '}
              <a className="text-link" href={`mailto:${BUSINESS_PROFILE.contactChannels.email}`}>
                {BUSINESS_PROFILE.contactChannels.email}
              </a>{' '}
              or write to {BUSINESS_PROFILE.address.full}.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
