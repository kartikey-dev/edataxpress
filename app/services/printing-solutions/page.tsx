import type { Metadata } from 'next';
import { ServicePage } from '@/components/service-page';
import { getServiceBySlug } from '@/lib/content';

const service = getServiceBySlug('printing-solutions')!;

export const metadata: Metadata = {
  title: service.seo.title,
  description: service.seo.description,
  alternates: { canonical: `/services/${service.slug}` },
  openGraph: {
    title: service.seo.title,
    description: service.seo.description,
    url: `/services/${service.slug}`,
  },
};

export default function PrintingSolutionsPage() {
  return <ServicePage service={service} />;
}
