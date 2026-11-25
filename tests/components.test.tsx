import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { EnquiryForm } from '@/components/enquiry-form';
import { ProductDetailView } from '@/components/product-detail-view';
import { StudioRoomDiagram } from '@/components/studio-room-diagram';
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

    const servicesButton = screen.getByRole('button', { name: /services/i });
    expect(servicesButton).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(servicesButton);
    expect(servicesButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: /All Services Overview/i })).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(servicesButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders verified footer links, email, and established 2017 fact', () => {
    render(<SiteFooter />);
    expect(screen.getByText(/Est\. 2017/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /enquiry@edataxpress\.com/i })).toHaveAttribute(
      'href',
      'mailto:enquiry@edataxpress.com',
    );
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

    const viewButtons = screen.getAllByRole('button', { name: /View \d+:/i });
    expect(viewButtons.length).toBe(2);
    expect(viewButtons[0]).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(viewButtons[1]);
    expect(viewButtons[1]).toHaveAttribute('aria-pressed', 'true');
  });

  it('switches Digital Studio room schematic concepts interactively', () => {
    render(<StudioRoomDiagram />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Interactive Classroom Layout' }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: /Training & Recording Studio/i }));
    expect(
      screen.getByRole('heading', { level: 3, name: 'Lecture Recording & Training Studio' }),
    ).toBeInTheDocument();
  });

  it('renders grouped specifications table and datasheet download link when verified specs are supplied', () => {
    const baseProduct = getProductBySlug('interactive-flat-panel-65')!;
    render(
      <ProductDetailView
        product={{
          ...baseProduct,
          specStatus: 'datasheet-verified',
          brand: 'ExampleBrand',
          model: 'IFP-65-TEST',
          sku: 'SKU-65',
          datasheetUrl: '/docs/approved-ifp-65.pdf',
          specifications: [
            { group: 'Display', label: 'Diagonal Size', value: '65 inches' },
            { group: 'Warranty', label: 'On-site Support', value: 'As per contract' },
          ],
        }}
      />,
    );

    expect(screen.getByText(/ExampleBrand · IFP-65-TEST · SKU-65/i)).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Display — Diagonal Size')).toBeInTheDocument();
    expect(screen.getByText('65 inches')).toBeInTheDocument();
    const downloadLink = screen.getByRole('link', { name: /Download approved PDF datasheet/i });
    expect(downloadLink).toHaveAttribute('href', '/docs/approved-ifp-65.pdf');
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

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: false,
          errors: { form: 'Upstream enquiry destination is unavailable.' },
        }),
        { status: 502, headers: { 'content-type': 'application/json' } },
      ),
    );
    fireEvent.change(screen.getByLabelText(/Organization/i), {
      target: { value: 'Model School' },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '+91 98111 22334' } });
    fireEvent.change(screen.getByLabelText(/Specific hardware/i), {
      target: { value: 'interactive-flat-panel-65' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /Send enquiry/i }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(
        /Upstream enquiry destination is unavailable/i,
      );
    });
  });
});
