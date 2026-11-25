import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import AboutPage from '@/app/about/page';
import ServicesOverviewPage from '@/app/services/page';
import PublicationServicePage from '@/app/services/publication/page';
import PrintingSolutionsPage from '@/app/services/printing-solutions/page';
import DigitalStudioSetupPage from '@/app/services/digital-studio-setup/page';
import DigitalMarketingPage from '@/app/services/digital-marketing/page';
import InteractiveFlatPanel65Page from '@/app/products/interactive-flat-panel-65/page';
import ContactPage from '@/app/contact/page';
import PrivacyPolicyPage from '@/app/privacy-policy/page';
import TermsPage from '@/app/terms/page';
import NotFoundPage from '@/app/not-found';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('App Router Server Component pages', () => {
  it('renders HomePage with H1, four service chapters, and LocalBusiness JSON-LD', () => {
    const { container } = render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Crafted for print/i);
    expect(screen.getByRole('link', { name: /Publication/i })).toHaveAttribute(
      'href',
      '/services/publication',
    );
    expect(screen.getByRole('link', { name: /Printing Solutions/i })).toHaveAttribute(
      'href',
      '/services/printing-solutions',
    );
    expect(screen.getByRole('link', { name: /Explore Digital Studio Setup/i })).toHaveAttribute(
      'href',
      '/services/digital-studio-setup',
    );
    expect(screen.getByRole('link', { name: /Digital Marketing/i })).toHaveAttribute(
      'href',
      '/services/digital-marketing',
    );
    const ldJson = container.querySelector('script[type="application/ld+json"]');
    expect(ldJson?.textContent).toContain('"LocalBusiness"');
    expect(ldJson?.textContent).toContain('"foundingDate":"2017"');
  });

  it('renders AboutPage with verified co-founder and 2017 history', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Built around clarity/i);
    expect(screen.getByRole('heading', { name: /Ayan Sarkar/i })).toBeInTheDocument();
  });

  it('renders ServicesOverviewPage and all four service landing pages', () => {
    const { unmount: unmountOverview } = render(<ServicesOverviewPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Four pillars/i);
    unmountOverview();

    const { unmount: unmountPub } = render(<PublicationServicePage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Publication' })).toBeInTheDocument();
    unmountPub();

    const { unmount: unmountPrint } = render(<PrintingSolutionsPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Printing Solutions' }),
    ).toBeInTheDocument();
    unmountPrint();

    const { unmount: unmountStudio } = render(<DigitalStudioSetupPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Digital Studio Setup' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Interactive Classroom Layout' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Interactive Flat Panel 65/i })).toHaveAttribute(
      'href',
      '/products/interactive-flat-panel-65',
    );
    unmountStudio();

    render(<DigitalMarketingPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Digital Marketing' }),
    ).toBeInTheDocument();
  });

  it('renders InteractiveFlatPanel65Page, ContactPage, and NotFoundPage', () => {
    const { unmount: unmountProduct } = render(<InteractiveFlatPanel65Page />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Interactive Flat Panel 65-Inch/i }),
    ).toBeInTheDocument();
    unmountProduct();

    const { unmount: unmountContact } = render(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Tell us what you are/i);
    expect(screen.getAllByText(/Madangir, Delhi/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole('link', { name: /enquiry@edataxpress\.com/i })).toHaveAttribute(
      'href',
      'mailto:enquiry@edataxpress.com',
    );
    const mapFrame = screen.getByTitle(/Google Map showing eDataXpress office/i);
    expect(mapFrame).toHaveAttribute('loading', 'lazy');
    expect(mapFrame.getAttribute('src')).toContain('output=embed');
    unmountContact();

    render(<NotFoundPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/not be/i);
    expect(screen.getByRole('link', { name: /Return home/i })).toHaveAttribute('href', '/');
  });

  it('renders PrivacyPolicyPage and TermsPage with verified governance details', () => {
    const { unmount: unmountPrivacy } = render(<PrivacyPolicyPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /enquiry@edataxpress\.com/i })).toHaveAttribute(
      'href',
      'mailto:enquiry@edataxpress.com',
    );
    unmountPrivacy();

    render(<TermsPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Terms of Use' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact page/i })).toHaveAttribute('href', '/contact');
  });
});
