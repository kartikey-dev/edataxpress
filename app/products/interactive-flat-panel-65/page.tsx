import type { Metadata } from 'next';
import { ProductDetailView } from '@/components/product-detail-view';
import { getProductBySlug } from '@/lib/content';

const product = getProductBySlug('interactive-flat-panel-65')!;

export const metadata: Metadata = {
  title: product.seo.title,
  description: product.seo.description,
  alternates: { canonical: `/products/${product.slug}` },
  openGraph: {
    title: product.seo.title,
    description: product.seo.description,
    url: `/products/${product.slug}`,
  },
};

export default function InteractiveFlatPanel65Page() {
  return <ProductDetailView product={product} />;
}
