import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/content';

export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.path}>
            {index > 0 ? <span aria-hidden="true"> / </span> : null}
            {isLast ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.path}>{item.name}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
