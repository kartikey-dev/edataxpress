import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from './breadcrumbs';
import {
  buildBreadcrumbJsonLd,
  hasConfirmedSpecifications,
  type ProductDetail,
} from '@/lib/content';

export function ProductDetailView({ product }: { product: ProductDetail }) {
  const enquiryHref = `/contact?service=${product.categorySlug}&product=${product.slug}`;
  const hasSpecs = hasConfirmedSpecifications(product);
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Digital Studio Setup', path: '/services/digital-studio-setup' },
    { name: product.shortLabel, path: `/products/${product.slug}` },
  ];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className="has-sticky-cta">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="page-hero">
        <div className="container product-layout">
          <div>
            <Breadcrumbs items={breadcrumbs} />
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Digital Studio Setup · Hardware Solution
            </div>
            <h1>{product.title}</h1>
            {product.brand || product.model || product.sku ? (
              <p className="lead">
                {[product.brand, product.model, product.sku].filter(Boolean).join(' · ')}
              </p>
            ) : null}
            <p className="lead">{product.summary}</p>
            <p>{product.availabilityNote}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href={enquiryHref}>
                Request quote &amp; approved datasheet <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/services/digital-studio-setup">
                Back to Digital Studio Setup <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="product-gallery">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              priority
              sizes="(max-width: 820px) 100vw, 46vw"
            />
            <span className="page-hero-stamp">65-INCH INTERACTIVE DISPLAY</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Key Highlights
            </div>
            <h2>Why organizations choose a 65-inch display.</h2>
            <ul className="check-list">
              {product.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Room Readiness Checklist
            </div>
            <h2>What helps us prepare an accurate quote.</h2>
            <ul className="check-list">
              {product.consultationChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-rule" />
                Applications
              </div>
              <h2>Where a 65-inch panel fits best.</h2>
            </div>
          </div>
          <div className="grid-3">
            {product.useCases.map((useCase, index) => (
              <article key={useCase.title} className="editorial-card">
                <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-rule" />
                Technical Documentation
              </div>
              <h2>Specifications &amp; datasheet.</h2>
            </div>
          </div>

          {hasSpecs ? (
            <div className="spec-table-wrap">
              <table className="spec-table">
                <tbody>
                  {product.specifications.map((spec) => (
                    <tr key={`${spec.group}-${spec.label}`}>
                      <th scope="row">
                        {spec.group} — {spec.label}
                      </th>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="spec-note-box">
              <h3>Model-specific specifications provided with approved datasheet</h3>
              <p>
                Hardware configurations vary by selected model and room requirements. To avoid
                generic or outdated figures, eDataXpress provides the current manufacturer
                datasheet, warranty terms, and mounting/installation scope directly with your
                consultation.
              </p>
              <Link className="button button-primary" href={enquiryHref}>
                Request current 65&quot; panel datasheet <span aria-hidden="true">↗</span>
              </Link>
            </div>
          )}

          {product.datasheetUrl ? (
            <div className="hero-actions">
              <a
                className="button button-secondary"
                href={product.datasheetUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download approved PDF datasheet for {product.title}{' '}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bottom-cta">
        <div className="container bottom-cta-inner">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Ready to plan your classroom or studio?
            </div>
            <h2>
              Get a room-specific 65-inch
              <br />
              <em>panel proposal.</em>
            </h2>
          </div>
          <Link className="button button-paper" href={enquiryHref}>
            Request product quote <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <div className="sticky-mobile-cta">
        <span>
          <strong>{product.shortLabel}</strong>
        </span>
        <Link className="button button-primary" href={enquiryHref}>
          Request quote <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
