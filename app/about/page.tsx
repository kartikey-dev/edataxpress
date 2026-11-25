import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BUSINESS_PROFILE, buildBreadcrumbJsonLd } from '@/lib/content';

export const metadata: Metadata = {
  title: `About ${BUSINESS_PROFILE.name} — Established ${BUSINESS_PROFILE.foundedYear}`,
  description: `Learn about ${BUSINESS_PROFILE.name}, a Delhi-based B2B partner established in ${BUSINESS_PROFILE.foundedYear} offering Publication, Printing Solutions, Digital Studio Setup, and Digital Marketing.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About ${BUSINESS_PROFILE.name}`,
    description: `${BUSINESS_PROFILE.tagline} — Publication, Printing Solutions, Digital Studio Setup, and Digital Marketing in Delhi.`,
    url: '/about',
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="page-hero">
        <div className="container page-hero-grid">
          <div>
            <Breadcrumbs
              items={[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
              ]}
            />
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              About {BUSINESS_PROFILE.name}
            </div>
            <h1>
              Built around clarity, craft,
              <br />
              and <em>practical delivery.</em>
            </h1>
            <p className="lead">
              Established in {BUSINESS_PROFILE.foundedYear} in {BUSINESS_PROFILE.city},{' '}
              {BUSINESS_PROFILE.name} supports institutions, publishers, and businesses across print
              publishing, production, digital studio environments, and outreach.
            </p>
          </div>

          <div className="page-hero-media">
            <Image
              src="/images/book-finishing.webp"
              alt="Finished publications and production materials in the eDataXpress studio"
              fill
              priority
              sizes="(max-width: 820px) 100vw, 45vw"
            />
            <span className="page-hero-stamp">
              EST. {BUSINESS_PROFILE.foundedYear} · {BUSINESS_PROFILE.city.toUpperCase()}
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Our Approach
            </div>
            <h2>
              Four disciplines connected
              <br />
              for <em>institutional clarity.</em>
            </h2>
          </div>
          <div>
            <p className="lead">
              Organizations frequently need more than a single vendor: a book needs structured
              typesetting before press; an educational institute needs both printed courseware and
              an interactive teaching studio; a release needs targeted outreach.
            </p>
            <p>
              By bringing Publication, Printing Solutions, Digital Studio Setup, and Digital
              Marketing together under one B2B roof, we keep specifications clear and handoffs
              dependable.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-rule" />
                Working Principles
              </div>
              <h2>
                How every engagement
                <br />
                is <em>structured.</em>
              </h2>
            </div>
          </div>
          <div className="grid-3">
            <article className="editorial-card">
              <span className="card-index">01</span>
              <h3>Verified Specifications</h3>
              <p>
                Every print run and studio hardware quote is grounded in confirmed formats, approved
                datasheets, and room needs.
              </p>
            </article>
            <article className="editorial-card">
              <span className="card-index">02</span>
              <h3>Clear Scope &amp; Communication</h3>
              <p>
                We separate supply, installation, configuration, and ongoing support clearly so
                procurement teams know what is included.
              </p>
            </article>
            <article className="editorial-card">
              <span className="card-index">03</span>
              <h3>Consistent Attention to Detail</h3>
              <p>
                From typographic pacing and paper finishing to classroom sightlines, details shape
                how people experience the finished work.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container founder-grid">
          <div className="founder-frame">
            <Image
              src={BUSINESS_PROFILE.coFounder.photoSrc}
              alt={`${BUSINESS_PROFILE.coFounder.name}, ${BUSINESS_PROFILE.coFounder.role} at ${BUSINESS_PROFILE.name}`}
              width={615}
              height={615}
            />
            <span className="founder-badge">{BUSINESS_PROFILE.coFounder.role}</span>
          </div>
          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Leadership
            </div>
            <h2>{BUSINESS_PROFILE.coFounder.name}</h2>
            <p className="lead">
              Co-founder of {BUSINESS_PROFILE.name}, working with institutions, publishers, and
              organizations from Delhi across publishing, printing, and digital studio setups.
            </p>
            <a
              className="text-link"
              href={BUSINESS_PROFILE.coFounder.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bottom-cta">
        <div className="container bottom-cta-inner">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Work with us
            </div>
            <h2>
              Have a project or studio
              <br />
              requirement in <em>mind?</em>
            </h2>
          </div>
          <Link className="button button-paper" href="/contact">
            Contact {BUSINESS_PROFILE.name} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
