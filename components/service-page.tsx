import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { Breadcrumbs } from './breadcrumbs';
import { ChapterGraphic } from './chapter-graphic';
import {
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
  getProductBySlug,
  type ServicePillar,
} from '@/lib/content';

export function ServicePage({
  service,
  children,
}: {
  service: ServicePillar;
  children?: ReactNode;
}) {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
  ];
  const serviceJsonLd = buildServiceJsonLd(service);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  const relatedProducts = (service.relatedProducts ?? [])
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="hero-animate">
            <Breadcrumbs items={breadcrumbs} />
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Chapter {service.chapter} / {service.shortLabel}
            </div>
            <h1>{service.title}</h1>
            <p className="lead">{service.intro}</p>
            <ChapterGraphic slug={service.slug} />
            <div className="hero-actions">
              <Link className="button button-primary" href={`/contact?service=${service.slug}`}>
                {service.ctaLabel} <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/services">
                All services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="page-hero-media hero-animate hero-animate-delay">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              priority
              sizes="(max-width: 820px) 100vw, 46vw"
            />
            <span className="page-hero-stamp">{service.image.stamp}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-rule" />
                Scope &amp; Deliverables
              </div>
              <h2>{service.deliverablesHeading}</h2>
            </div>
            <p>{service.deliverablesSubheading}</p>
          </div>

          <div className="grid-4">
            {service.deliverables.map((item, index) => (
              <article key={item.title} className="editorial-card">
                <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container split-grid">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Who We Serve
            </div>
            <h2>Built for teams with real deadlines.</h2>
            <ul className="check-list">
              {service.audience.map((group) => (
                <li key={group}>{group}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Engagement Process
            </div>
            <h2>{service.processHeading}</h2>
            <div className="faq-list">
              {service.process.map((step, index) => (
                <article key={step.title} className="faq-item">
                  <h3>
                    {String(index + 1).padStart(2, '0')} · {step.title}
                  </h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {children}

      {relatedProducts.length > 0 ? (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-rule" />
                  Related Hardware Solution
                </div>
                <h2>Explore dedicated display options.</h2>
              </div>
            </div>
            <div className="grid-2">
              {relatedProducts.map((product) => (
                <article key={product.slug} className="editorial-card">
                  <span className="card-index">PRODUCT DETAIL</span>
                  <h3>{product.title}</h3>
                  <p>{product.summary}</p>
                  <div className="hero-actions">
                    <Link className="button button-primary" href={`/products/${product.slug}`}>
                      View {product.shortLabel} <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.faqs.length > 0 ? (
        <section className="section section-muted">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-rule" />
                  Common Questions
                </div>
                <h2>Practical details before you enquire.</h2>
              </div>
            </div>
            <div className="faq-list">
              {service.faqs.map((faq) => (
                <article key={faq.question} className="faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bottom-cta">
        <div className="container bottom-cta-inner">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              {service.ctaBand.eyebrow}
            </div>
            <h2>{service.ctaBand.title}</h2>
          </div>
          <Link className="button button-paper" href={`/contact?service=${service.slug}`}>
            {service.ctaLabel} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
