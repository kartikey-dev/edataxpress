import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS_PROFILE, FOOTER_LINKS } from '@/lib/content';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link className="footer-logo-plate" href="/" aria-label="eDataXpress home">
            <Image
              className="brand-logo"
              src={BUSINESS_PROFILE.logo.src}
              alt={BUSINESS_PROFILE.name}
              width={BUSINESS_PROFILE.logo.width}
              height={BUSINESS_PROFILE.logo.height}
            />
          </Link>
          <p className="footer-tagline">{BUSINESS_PROFILE.tagline}.</p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer-bottom">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {BUSINESS_PROFILE.name} · Est.{' '}
            {BUSINESS_PROFILE.foundedYear}
          </span>
          <span>
            <a href={`mailto:${BUSINESS_PROFILE.contactChannels.email}`}>
              {BUSINESS_PROFILE.contactChannels.email}
            </a>{' '}
            ·{' '}
            <a
              href={BUSINESS_PROFILE.social.linkedinCompany}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{' '}
            ·{' '}
            <a href={BUSINESS_PROFILE.social.x} target="_blank" rel="noopener noreferrer">
              X
            </a>{' '}
            ·{' '}
            <a
              href={BUSINESS_PROFILE.coFounder.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Co-founder
            </a>
          </span>
          <span>
            {BUSINESS_PROFILE.city}, {BUSINESS_PROFILE.country} · {BUSINESS_PROFILE.hours.display}
          </span>
        </div>
      </div>
    </footer>
  );
}
