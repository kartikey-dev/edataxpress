import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { EnquiryForm } from '@/components/enquiry-form';
import { BUSINESS_PROFILE, buildBreadcrumbJsonLd } from '@/lib/content';

export const metadata: Metadata = {
  title: `Contact ${BUSINESS_PROFILE.name} — Delhi Publishing, Printing & Digital Studio Setup`,
  description: `Contact ${BUSINESS_PROFILE.name} in Madangir, Delhi for Publication, Printing Solutions, Digital Studio Setup, Interactive Flat Panel 65-inch quotes, or Digital Marketing.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact ${BUSINESS_PROFILE.name}`,
    description: `Start a project or request a Digital Studio Setup consultation in Delhi.`,
    url: '/contact',
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
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
            Enquiries &amp; Location
          </div>
          <h1>
            Tell us what you are
            <br />
            <em>planning next.</em>
          </h1>
          <p className="lead">
            Whether scoping a publication, print production run, 65-inch Interactive Flat Panel room
            setup, or digital marketing campaign, share a few details below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <aside className="contact-card">
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Find Us in {BUSINESS_PROFILE.city}
            </div>
            <h2>Studio &amp; Office</h2>
            <address>
              {BUSINESS_PROFILE.address.lines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </address>
            <a
              className="text-link"
              href={BUSINESS_PROFILE.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions on Maps <span aria-hidden="true">↗</span>
            </a>

            <div className="contact-hours">
              <span>EMAIL ENQUIRIES</span>
              <strong>
                <a className="text-link" href={`mailto:${BUSINESS_PROFILE.contactChannels.email}`}>
                  {BUSINESS_PROFILE.contactChannels.email} <span aria-hidden="true">↗</span>
                </a>
              </strong>
            </div>

            <div className="contact-hours">
              <span>OPEN EVERY DAY</span>
              <strong>{BUSINESS_PROFILE.hours.display}</strong>
            </div>
          </aside>

          <div className="enquiry-panel">
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Project &amp; Product Enquiry
            </div>
            <h2>Request a quote or consultation.</h2>
            <Suspense fallback={<p>Loading enquiry form...</p>}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="section section-muted" aria-labelledby="office-map-heading">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-rule" />
                Location Map
              </div>
              <h2 id="office-map-heading">
                Visit our Madangir,
                <br />
                <em>Delhi office.</em>
              </h2>
            </div>
            <p>{BUSINESS_PROFILE.address.full}</p>
          </div>

          <div className="contact-map-frame">
            <iframe
              title="Google Map showing eDataXpress office in Madangir, Delhi"
              src={BUSINESS_PROFILE.address.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
