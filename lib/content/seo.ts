import type { MetadataRoute } from 'next';
import { BUSINESS_PROFILE, getSiteUrl } from './business';
import { INDEXABLE_ROUTES } from './navigation';
import { PRODUCTS } from './products';
import { SERVICES, type ServicePillar } from './services';

export type BreadcrumbItem = {
  readonly name: string;
  readonly path: string;
};

export function buildLocalBusinessJsonLd(siteUrl = getSiteUrl()) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_PROFILE.name,
    description: `${BUSINESS_PROFILE.name} — ${BUSINESS_PROFILE.tagline}. Publication, Printing Solutions, Digital Studio Setup, and Digital Marketing in Delhi, India.`,
    email: BUSINESS_PROFILE.contactChannels.email,
    url: `${siteUrl}/`,
    foundingDate: String(BUSINESS_PROFILE.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_PROFILE.address.streetAddress,
      addressLocality: BUSINESS_PROFILE.address.locality,
      postalCode: BUSINESS_PROFILE.address.postalCode,
      addressCountry: BUSINESS_PROFILE.address.countryCode,
    },
    openingHours: BUSINESS_PROFILE.hours.schema,
    sameAs: [
      BUSINESS_PROFILE.social.linkedinCompany,
      BUSINESS_PROFILE.social.x,
      BUSINESS_PROFILE.social.justdial,
      BUSINESS_PROFILE.social.internshala,
    ],
  };
}

export function buildServiceJsonLd(service: ServicePillar, siteUrl = getSiteUrl()) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seo.description,
    url: `${siteUrl}/services/${service.slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_PROFILE.name,
      url: `${siteUrl}/`,
    },
    areaServed: {
      '@type': 'Country',
      name: BUSINESS_PROFILE.country,
    },
  };
}

export function buildBreadcrumbJsonLd(items: readonly BreadcrumbItem[], siteUrl = getSiteUrl()) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path === '/' ? `${siteUrl}/` : `${siteUrl}${item.path}`,
    })),
  };
}

export function buildSitemapEntries(siteUrl = getSiteUrl()): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

export function buildRobotsConfig(siteUrl = getSiteUrl()): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

export function buildLlmsText(siteUrl = getSiteUrl()): string {
  const serviceLines = SERVICES.map(
    (service) => `- ${service.title}: ${siteUrl}/services/${service.slug}`,
  );
  const productLines = PRODUCTS.map(
    (product) => `- ${product.title}: ${siteUrl}/products/${product.slug}`,
  );

  return [
    `# ${BUSINESS_PROFILE.name}`,
    '',
    `> ${BUSINESS_PROFILE.name} ("${BUSINESS_PROFILE.tagline}") is a Delhi-based B2B partner established in ${BUSINESS_PROFILE.foundedYear} offering Publication, Printing Solutions, Digital Studio Setup, and Digital Marketing.`,
    '',
    '## Official website',
    `- Home: ${siteUrl}/`,
    `- About: ${siteUrl}/about`,
    `- Services overview: ${siteUrl}/services`,
    ...serviceLines,
    ...productLines,
    `- Contact and location: ${siteUrl}/contact`,
    `- Privacy Policy: ${siteUrl}/privacy-policy`,
    `- Terms of Use: ${siteUrl}/terms`,
    '',
    '## Business facts',
    `- Email: ${BUSINESS_PROFILE.contactChannels.email}`,
    `- Address: ${BUSINESS_PROFILE.address.full}`,
    `- Hours provided by the business: ${BUSINESS_PROFILE.hours.display} daily.`,
    `- Established: ${BUSINESS_PROFILE.foundedYear}.`,
    `- Co-founder profile: ${BUSINESS_PROFILE.coFounder.linkedinUrl}`,
    `- LinkedIn: ${BUSINESS_PROFILE.social.linkedinCompany}`,
    `- X: ${BUSINESS_PROFILE.social.x}`,
    `- Justdial: ${BUSINESS_PROFILE.social.justdial}`,
    `- Internshala: ${BUSINESS_PROFILE.social.internshala}`,
    '',
    'For current service scope, product datasheets, and enquiries, refer to the official pages above.',
  ].join('\n');
}
