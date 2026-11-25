import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { EnquiryForm } from '@/components/enquiry-form';
import { ProductDetailView } from '@/components/product-detail-view';
import { getProductBySlug } from '@/lib/content';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('SiteHeader & SiteFooter', () => {
  it('renders transparent logo and toggles mobile menu via button and Escape', () => {
    render(<SiteHeader />);
    const logo = screen.getByAltText(/eDataXpress/i);
    expect(logo.getAttribute('src')).toContain('edataxpress-logo-transparent.png');

    const toggle = screen.getByRole('button', { name: /menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders verified footer links and established 2017 fact', () => {
    render(<SiteFooter />);
    expect(screen.getByText(/Est\. 2017/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Digital Studio Setup/i })).toHaveAttribute(
      'href',
      '/services/digital-studio-setup',
    );
    expect(screen.getByRole('link', { name: /Interactive Flat Panel 65/i })).toHaveAttribute(
      'href',
      '/products/interactive-flat-panel-65',
    );
  });
});

describe('ProductDetailView', () => {
  it('omits specification table when datasheet specs are pending and passes product context to CTA', () => {
    const product = getProductBySlug('interactive-flat-panel-65')!;
    render(<ProductDetailView product={product} />);

    expect(
      screen.getByRole('heading', { level: 1, name: /Interactive Flat Panel 65-Inch/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();

    const enquiryLinks = screen.getAllByRole('link', {
      name: /request.*datasheet|request.*quote/i,
    });
    expect(enquiryLinks.length).toBeGreaterThanOrEqual(1);
    expect(enquiryLinks[0]).toHaveAttribute(
      'href',
      '/contact?service=digital-studio-setup&product=interactive-flat-panel-65',
    );
  });
});

describe('EnquiryForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('preselects service/product context, validates client input, and submits to /api/enquiry', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: true,
          mode: 'staging',
          message: 'Enquiry received in staging mode.',
        }),
        { status: 202, headers: { 'content-type': 'application/json' } },
      ),
    );

    render(
      <EnquiryForm
        initialService="digital-studio-setup"
        initialProduct="interactive-flat-panel-65"
      />,
    );

    const serviceSelect = screen.getByLabelText(/Service interest/i) as HTMLSelectElement;
    expect(serviceSelect.value).toBe('digital-studio-setup');

    fireEvent.change(screen.getByLabelText(/Your name/i), { target: { value: 'Rohan Verma' } });
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'rohan@example.org' },
    });
    fireEvent.change(screen.getByLabelText(/Project details/i), {
      target: { value: 'Looking for a 65-inch interactive flat panel quotation for 3 rooms.' },
    });
    fireEvent.click(screen.getByLabelText(/I consent/i));
    fireEvent.submit(screen.getByRole('button', { name: /Send enquiry/i }).closest('form')!);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        '/api/enquiry',
        expect.objectContaining({ method: 'POST' }),
      );
      expect(screen.getByRole('status')).toHaveTextContent(/received/i);
    });
  });

  it('shows accessible field validation errors and handles server failure gracefully', async () => {
    render(<EnquiryForm />);

    fireEvent.submit(screen.getByRole('button', { name: /Send enquiry/i }).closest('form')!);
    expect(screen.getByRole('status')).toHaveTextContent(/highlighted fields/i);
    expect(screen.getByLabelText(/Your name/i)).toHaveAttribute('aria-invalid', 'true');

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network down'));
    fireEvent.change(screen.getByLabelText(/Your name/i), { target: { value: 'Kiran Nair' } });
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'kiran@example.org' },
    });
    fireEvent.change(screen.getByLabelText(/Project details/i), {
      target: { value: 'Enquiring about print production specs for 500 copies.' },
    });
    fireEvent.click(screen.getByLabelText(/I consent/i));
    fireEvent.submit(screen.getByRole('button', { name: /Send enquiry/i }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/network error/i);
    });
  });
});
