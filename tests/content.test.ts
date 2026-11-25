import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import sitemapRoute from '@/app/sitemap';
import robotsRoute from '@/app/robots';
import {
  BUSINESS_PROFILE,
  getSiteUrl,
  SERVICES,
  getServiceBySlug,
  PRODUCTS,
  getProductBySlug,
  hasConfirmedSpecifications,
  PRIMARY_NAV,
  FOOTER_LINKS,
  LEGACY_REDIRECTS,
  INDEXABLE_ROUTES,
  buildLocalBusinessJsonLd,
  buildServiceJsonLd,
  buildBreadcrumbJsonLd,
  buildSitemapEntries,
  buildLlmsText,
} from '@/lib/content';

describe('Business profile & confirmed facts', () => {
  it('contains verified eDataXpress identity, address, hours, and social links', () => {
    expect(BUSINESS_PROFILE.name).toBe('eDataXpress');
    expect(BUSINESS_PROFILE.tagline).toBe('Connecting Businesses Globally');
    expect(BUSINESS_PROFILE.foundedYear).toBe(2017);
    expect(BUSINESS_PROFILE.city).toBe('Delhi');
    expect(BUSINESS_PROFILE.country).toBe('India');
    expect(BUSINESS_PROFILE.address.postalCode).toBe('110062');
    expect(BUSINESS_PROFILE.address.full).toContain('Madangir');
    expect(BUSINESS_PROFILE.hours.display).toBe('7:00 am – 11:45 pm');
    expect(BUSINESS_PROFILE.coFounder.name).toBe('Ayan Sarkar');
    expect(BUSINESS_PROFILE.coFounder.linkedinUrl).toBe('https://in.linkedin.com/in/dmayan');
    expect(BUSINESS_PROFILE.social.linkedinCompany).toBe(
      'https://in.linkedin.com/company/edataxpress',
    );
    expect(BUSINESS_PROFILE.social.x).toBe('https://x.com/edataxpress');
  });

  it('resolves canonical site URL cleanly with or without NEXT_PUBLIC_SITE_URL', () => {
    expect(getSiteUrl('')).toBe('https://www.edataxpress.com');
    expect(getSiteUrl('https://edataxpress.in/')).toBe('https://edataxpress.in');
  });
});

describe('Four service pillars', () => {
  it('defines all four required pillars with unique slugs, chapter numbers, and SEO metadata', () => {
    const slugs = SERVICES.map((service) => service.slug);
    expect(slugs).toEqual([
      'publication',
      'printing-solutions',
      'digital-studio-setup',
      'digital-marketing',
    ]);
    expect(new Set(SERVICES.map((service) => service.chapter)).size).toBe(4);
    for (const service of SERVICES) {
      expect(service.title.length).toBeGreaterThan(3);
      expect(service.audience.length).toBeGreaterThanOrEqual(2);
      expect(service.deliverables.length).toBeGreaterThanOrEqual(3);
      expect(service.process.length).toBeGreaterThanOrEqual(3);
      expect(service.seo.title).toBeTruthy();
      expect(service.seo.description).toBeTruthy();
    }
  });

  it('does not include unverified superlatives in service copy', () => {
    const forbidden = /\b(best|no\.?\s*1|number one|leading|guaranteed)\b/i;
    for (const service of SERVICES) {
      expect(service.summary).not.toMatch(forbidden);
      expect(service.intro).not.toMatch(forbidden);
      for (const item of service.deliverables) {
        expect(item.description).not.toMatch(forbidden);
      }
    }
  });

  it('retrieves services by slug and returns undefined for unknown slugs', () => {
    expect(getServiceBySlug('digital-studio-setup')?.title).toBe('Digital Studio Setup');
    expect(getServiceBySlug('unknown')).toBeUndefined();
  });
});

describe('Interactive Flat Panel 65-inch product model', () => {
  it('includes the 65-inch IFP product without fabricating unconfirmed model or competitor specs', () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(1);
    const ifp = getProductBySlug('interactive-flat-panel-65');
    expect(ifp).toBeDefined();
    expect(ifp?.title).toContain('65');
    expect(ifp?.categorySlug).toBe('digital-studio-setup');
    expect(ifp?.useCases.length).toBeGreaterThanOrEqual(2);
    // Owner has not yet supplied exact brand/SKU/datasheet specs; must not invent competitor specs
    const serialized = JSON.stringify(ifp);
    expect(serialized).not.toMatch(/Android\s*14/i);
    expect(serialized).not.toMatch(/20-point/i);
    expect(hasConfirmedSpecifications(ifp!)).toBe(Boolean(ifp?.specifications.length));
  });
});

describe('Navigation, redirects, and SEO generators', () => {
  it('exposes clean primary navigation, footer links, and legacy redirects', () => {
    const navHrefs = PRIMARY_NAV.map((item) => item.href);
    expect(navHrefs).toContain('/');
    expect(navHrefs).toContain('/about');
    expect(navHrefs).toContain('/services');
    expect(navHrefs).toContain('/contact');

    expect(FOOTER_LINKS.some((link) => link.href === '/services/digital-studio-setup')).toBe(true);
    expect(FOOTER_LINKS.some((link) => link.href === '/products/interactive-flat-panel-65')).toBe(
      true,
    );

    expect(LEGACY_REDIRECTS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: '/services/publishing',
          destination: '/services/publication',
          permanent: true,
        }),
        expect.objectContaining({
          source: '/services/printing',
          destination: '/services/printing-solutions',
          permanent: true,
        }),
        expect.objectContaining({
          source: '/services/marketing',
          destination: '/services/digital-marketing',
          permanent: true,
        }),
      ]),
    );
  });

  it('generates consistent JSON-LD, sitemap entries, and llms.txt from the single source of truth', () => {
    const businessLd = buildLocalBusinessJsonLd();
    expect(businessLd['@type']).toBe('LocalBusiness');
    expect(businessLd.foundingDate).toBe('2017');
    expect(businessLd.openingHours).toBe('Mo-Su 07:00-23:45');

    const studioService = getServiceBySlug('digital-studio-setup')!;
    const serviceLd = buildServiceJsonLd(studioService);
    expect(serviceLd['@type']).toBe('Service');
    expect(serviceLd.name).toBe('Digital Studio Setup');

    const breadcrumbLd = buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]);
    expect(breadcrumbLd.itemListElement).toHaveLength(2);
    expect(breadcrumbLd.itemListElement[0].position).toBe(1);

    const sitemap = buildSitemapEntries();
    expect(sitemap.length).toBe(INDEXABLE_ROUTES.length);
    expect(sitemap.some((entry) => entry.url.endsWith('/services/digital-studio-setup'))).toBe(
      true,
    );
    expect(sitemap.some((entry) => entry.url.endsWith('/products/interactive-flat-panel-65'))).toBe(
      true,
    );

    const llms = buildLlmsText();
    expect(llms).toContain('/services/publication');
    expect(llms).toContain('/services/digital-studio-setup');
    expect(llms).toContain('/products/interactive-flat-panel-65');
    expect(llms).not.toContain('.html');

    const publicLlms = readFileSync(resolve(process.cwd(), 'public/llms.txt'), 'utf8').trim();
    expect(publicLlms).toBe(llms.trim());

    expect(sitemapRoute()).toEqual(sitemap);
    expect(robotsRoute()).toEqual({
      rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
      sitemap: 'https://www.edataxpress.com/sitemap.xml',
    });
  });
});
