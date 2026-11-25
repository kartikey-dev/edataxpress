import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChapterGraphic } from '@/components/chapter-graphic';
import {
  BUSINESS_PROFILE,
  SERVICES,
  buildLocalBusinessJsonLd,
  getProductBySlug,
} from '@/lib/content';

export const metadata: Metadata = {
  title: `${BUSINESS_PROFILE.name} — Publication, Printing, Digital Studio Setup & Marketing`,
  description:
    'Delhi-based B2B partner for Publication, Printing Solutions, Digital Studio Setup (including Interactive Flat Panel 65-inch), and Digital Marketing.',
  alternates: { canonical: '/' },
  openGraph: {
    title: `${BUSINESS_PROFILE.name} — ${BUSINESS_PROFILE.tagline}`,
    description:
      'Publication, Printing Solutions, Digital Studio Setup, and Digital Marketing in Delhi, India.',
    url: '/',
  },
};

export default function HomePage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd();
  const ifpProduct = getProductBySlug('interactive-flat-panel-65');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-animate">
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              PUBLICATION · PRINTING · DIGITAL STUDIO · MARKETING
            </div>
            <h1>
              Crafted for print.
              <br />
              Built for <em>modern rooms.</em>
            </h1>
            <p className="lead">
              {BUSINESS_PROFILE.name} partners with institutions, publishers, and organizations in{' '}
              {BUSINESS_PROFILE.city} across four connected pillars: Publication, Printing
              Solutions, Digital Studio Setup, and Digital Marketing.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/services">
                Explore services <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/contact">
                Discuss a project <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="hero-meta">
              <div>
                <strong>Est. {BUSINESS_PROFILE.foundedYear}</strong>
                {BUSINESS_PROFILE.city}, {BUSINESS_PROFILE.country}
              </div>
              <div>
                <strong>Open Daily</strong>
                {BUSINESS_PROFILE.hours.display}
              </div>
              <div>
                <strong>{BUSINESS_PROFILE.tagline}</strong>
                B2B editorial, print &amp; studio solutions
              </div>
            </div>
          </div>

          <div className="hero-media hero-animate hero-animate-delay">
            <Image
              src="/images/publishing-studio.webp"
              alt="Publishing specialist reviewing printed page proofs and editorial layouts"
              fill
              priority
              sizes="(max-width: 820px) 100vw, 46vw"
            />
            <div className="hero-media-overlay">
              <div>
                <span>EDITION ONE · DELHI</span>
                <br />
                <strong>From manuscript &amp; print to interactive classrooms</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="folio-strip" aria-label="Core business pillars">
        <div className="container folio-strip-inner">
          <span className="folio-strip-label">FOUR INTEGRATED CHAPTERS</span>
          <div>
            <b>01</b> Editorial &amp; Print Production
          </div>
          <div>
            <b>02</b> Digital Studio &amp; 65&quot; Display Setup
          </div>
          <div>
            <b>03</b> Audience &amp; Campaign Outreach
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-rule" />
                Service Chapters
              </div>
              <h2>
                Four pillars under
                <br />
                <em>one practical roof.</em>
              </h2>
            </div>
            <p>
              Each service operates with clear scope, verified specifications, and direct
              coordination from initial brief through delivery.
            </p>
          </div>

          <div className="pillar-grid">
            {SERVICES.map((service) => (
              <Link key={service.slug} className="pillar-card" href={`/services/${service.slug}`}>
                <div className="pillar-card-top">
                  <span>
                    {service.chapter} / {service.shortLabel}
                  </span>
                  <span className="pillar-card-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <div className="pillar-card-media">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 580px) 92vw, (max-width: 1024px) 46vw, 23vw"
                  />
                </div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ChapterGraphic slug={service.slug} />
                <span className="pillar-card-link">
                  Explore chapter <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container studio-spotlight">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Featured Solution · Chapter 03
            </div>
            <h2>
              Digital Studio Setup &amp;
              <br />
              <em>Interactive Displays.</em>
            </h2>
            <p className="lead">
              For schools, coaching institutes, and corporate training rooms, we plan interactive
              display rooms and recording environments tailored to room layout and usage goals.
            </p>
            <ul className="studio-feature-list">
              <li>
                <strong>Interactive Classrooms</strong>
                Planned around teacher sightlines and mounting geometry.
              </li>
              <li>
                <strong>Training Studios</strong>
                Coordinated display, audio, camera, and lighting workflows.
              </li>
              <li>
                <strong>Hybrid Meeting Rooms</strong>
                Structured setup for collaborative presentations and workshops.
              </li>
              <li>
                <strong>Site-Specific Quotes</strong>
                Commercial proposals prepared from confirmed room needs.
              </li>
            </ul>
            <div className="hero-actions">
              <Link className="button button-primary" href="/services/digital-studio-setup">
                Explore Digital Studio Setup <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/contact?service=digital-studio-setup">
                Request room consultation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {ifpProduct ? (
            <div className="studio-panel-card">
              <div className="studio-panel-image">
                <Image
                  src={ifpProduct.images[0].src}
                  alt={ifpProduct.images[0].alt}
                  fill
                  sizes="(max-width: 820px) 92vw, 38vw"
                />
              </div>
              <div className="eyebrow">Featured Hardware Solution</div>
              <h3>{ifpProduct.title}</h3>
              <p>{ifpProduct.summary}</p>
              <div className="hero-actions">
                <Link className="button button-secondary" href={`/products/${ifpProduct.slug}`}>
                  View 65&quot; panel details <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <div className="bookplate">
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Editorial Discipline
            </div>
            <h2>
              Clarity before production.
              <br />
              <em>Care in delivery.</em>
            </h2>
            <p className="lead">
              Whether preparing a multi-chapter textbook, coordinating a print run, or setting up an
              interactive teaching studio, we document specifications clearly before execution.
            </p>
            <div className="bookplate-rule">
              <strong>Est. {BUSINESS_PROFILE.foundedYear}</strong>
              <span>
                Independent B2B partner in {BUSINESS_PROFILE.city}, {BUSINESS_PROFILE.country}
              </span>
            </div>
          </div>

          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              How We Work
            </div>
            <h2>
              Structured from first brief
              <br />
              <em>to handover.</em>
            </h2>
            <div className="faq-list">
              <article className="faq-item">
                <h3>01 · Scope &amp; Assessment</h3>
                <p>
                  We clarify publication format, print specifications, studio room requirements, or
                  campaign objectives before quoting.
                </p>
              </article>
              <article className="faq-item">
                <h3>02 · Documented Proposal</h3>
                <p>
                  Share clear deliverables, approved hardware datasheets, and schedules suited to
                  your institution or organization.
                </p>
              </article>
              <article className="faq-item">
                <h3>03 · Coordinated Execution</h3>
                <p>
                  Move smoothly from proofs, print runs, or room setup to final delivery and team
                  handover.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bottom-cta">
        <div className="container bottom-cta-inner">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Start a conversation
            </div>
            <h2>
              Planning a publication, print run,
              <br />
              or <em>digital studio?</em>
            </h2>
          </div>
          <Link className="button button-paper" href="/contact">
            Discuss your project <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
