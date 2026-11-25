import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ChapterGraphic } from '@/components/chapter-graphic';
import { SERVICES, buildBreadcrumbJsonLd, getProductBySlug } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Services — Publication, Printing, Digital Studio Setup & Marketing',
  description:
    'Explore the four core service pillars at eDataXpress in Delhi: Publication, Printing Solutions, Digital Studio Setup, and Digital Marketing.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | eDataXpress',
    description:
      'Publication, Printing Solutions, Digital Studio Setup, and Digital Marketing in Delhi.',
    url: '/services',
  },
};

export default function ServicesOverviewPage() {
  const ifpProduct = getProductBySlug('interactive-flat-panel-65');
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
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
            Service Catalogue
          </div>
          <h1>
            Four pillars designed to work
            <br />
            <em>together cleanly.</em>
          </h1>
          <p className="lead">
            From shaping a manuscript and running print production to equipping interactive
            classrooms and launching outreach campaigns, explore how each chapter supports your
            organization.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container pillar-grid">
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
                View {service.shortLabel} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {ifpProduct ? (
        <section className="section section-muted">
          <div className="container split-grid">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-rule" />
                Featured Product
              </div>
              <h2>{ifpProduct.title}</h2>
              <p className="lead">{ifpProduct.summary}</p>
              <div className="hero-actions">
                <Link className="button button-primary" href={`/products/${ifpProduct.slug}`}>
                  Explore 65&quot; panel page <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  className="text-link"
                  href="/contact?service=digital-studio-setup&product=interactive-flat-panel-65"
                >
                  Request quote &amp; datasheet <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="page-hero-media">
              <Image
                src={ifpProduct.images[0].src}
                alt={ifpProduct.images[0].alt}
                fill
                sizes="(max-width: 820px) 100vw, 45vw"
              />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
