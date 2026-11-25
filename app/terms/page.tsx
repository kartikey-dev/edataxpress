import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BUSINESS_PROFILE, buildBreadcrumbJsonLd } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `Terms governing use of the ${BUSINESS_PROFILE.name} website, informational materials, and project enquiries.`,
  alternates: { canonical: '/terms' },
  openGraph: {
    title: `Terms of Use | ${BUSINESS_PROFILE.name}`,
    description: `Website terms of use for ${BUSINESS_PROFILE.name}.`,
    url: '/terms',
  },
};

export default function TermsPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Terms of Use', path: '/terms' },
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
            Website Terms
          </div>
          <h1>Terms of Use</h1>
          <p className="lead">
            By accessing this website, you agree to the general terms below regarding informational
            content, quotations, and communications with {BUSINESS_PROFILE.name}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-prose">
          <article className="editorial-card">
            <span className="card-index">01</span>
            <h2>Informational Scope</h2>
            <p>
              Service overviews, configurable Digital Studio Setup concepts, and Interactive Flat
              Panel summaries on this website are provided for general business evaluation. Final
              pricing, print specifications, delivery schedules, installation scope, and hardware
              warranties are governed exclusively by written quotations, approved datasheets, and
              executed agreements.
            </p>
          </article>

          <article className="editorial-card">
            <span className="card-index">02</span>
            <h2>Enquiries &amp; Acceptable Use</h2>
            <p>
              You agree to provide accurate contact information when submitting project or product
              enquiries and not to misuse automated form endpoints, scrape restricted paths, or
              attempt unauthorized access to website infrastructure.
            </p>
          </article>

          <article className="editorial-card">
            <span className="card-index">03</span>
            <h2>Intellectual Property &amp; Third-Party Links</h2>
            <p>
              The {BUSINESS_PROFILE.name} name, logo, and original editorial materials on this site
              belong to {BUSINESS_PROFILE.name} unless otherwise credited. Links to external sites
              such as LinkedIn, X, or Google Maps are provided for convenience and remain subject to
              those platforms&apos; own terms.
            </p>
          </article>

          <article className="editorial-card">
            <span className="card-index">04</span>
            <h2>Contact &amp; Jurisdiction</h2>
            <p>
              Questions regarding these terms may be directed to{' '}
              <a className="text-link" href={`mailto:${BUSINESS_PROFILE.contactChannels.email}`}>
                {BUSINESS_PROFILE.contactChannels.email}
              </a>{' '}
              or via our{' '}
              <Link className="text-link" href="/contact">
                Contact page
              </Link>
              . Matters relating to use of this website are governed by applicable laws in{' '}
              {BUSINESS_PROFILE.city}, {BUSINESS_PROFILE.country}.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
