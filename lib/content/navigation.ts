import { SERVICES } from './services';
import { PRODUCTS } from './products';

export type NavItem = {
  readonly label: string;
  readonly href: string;
};

export type RedirectRule = {
  readonly source: string;
  readonly destination: string;
  readonly permanent: true;
};

export type IndexableRoute = {
  readonly path: string;
  readonly changeFrequency: 'monthly' | 'weekly';
  readonly priority: number;
};

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICE_NAV_ITEMS: readonly NavItem[] = SERVICES.map((service) => ({
  label: service.shortLabel,
  href: `/services/${service.slug}`,
}));

export const FOOTER_LINKS: readonly NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'All Services', href: '/services' },
  ...SERVICE_NAV_ITEMS,
  ...PRODUCTS.map((product) => ({
    label: product.shortLabel,
    href: `/products/${product.slug}`,
  })),
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use', href: '/terms' },
];

export const LEGACY_REDIRECTS: readonly RedirectRule[] = [
  { source: '/index.html', destination: '/', permanent: true },
  { source: '/about.html', destination: '/about', permanent: true },
  { source: '/contact.html', destination: '/contact', permanent: true },
  { source: '/services/publishing', destination: '/services/publication', permanent: true },
  { source: '/services/publishing.html', destination: '/services/publication', permanent: true },
  { source: '/services/printing', destination: '/services/printing-solutions', permanent: true },
  {
    source: '/services/printing.html',
    destination: '/services/printing-solutions',
    permanent: true,
  },
  { source: '/services/marketing', destination: '/services/digital-marketing', permanent: true },
  {
    source: '/services/marketing.html',
    destination: '/services/digital-marketing',
    permanent: true,
  },
];

export const INDEXABLE_ROUTES: readonly IndexableRoute[] = [
  { path: '', changeFrequency: 'monthly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.85 },
  ...SERVICES.map((service) => ({
    path: `/services/${service.slug}`,
    changeFrequency: 'monthly' as const,
    priority: service.slug === 'digital-studio-setup' ? 0.9 : 0.8,
  })),
  ...PRODUCTS.map((product) => ({
    path: `/products/${product.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  })),
  { path: '/contact', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/privacy-policy', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'monthly', priority: 0.3 },
];
