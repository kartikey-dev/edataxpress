import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow">
          <span className="eyebrow-rule" />
          Page Not Found · 404
        </div>
        <h1>
          This chapter could
          <br />
          not be <em>located.</em>
        </h1>
        <p className="lead">
          The page you requested may have moved to a new service route or no longer exists.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/">
            Return home <span aria-hidden="true">↗</span>
          </Link>
          <Link className="button button-secondary" href="/services">
            Browse all services
          </Link>
          <Link className="text-link" href="/contact">
            Contact eDataXpress <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
