import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import './globals.css';
import './book-experience.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { PageTurnTransition } from '@/components/page-turn-transition';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.edataxpress.com'),
  title: { default: 'eDataXpress — Ideas, printed beautifully', template: '%s | eDataXpress' },
  description: 'Publishing, print production and book marketing in Madangir, Delhi. From first draft to final delivery, we bring the whole journey together.',
  openGraph: { type: 'website', siteName: 'eDataXpress', locale: 'en_IN' },
  icons: { icon: '/assets/favicon.png', shortcut: '/assets/favicon.png', apple: '/assets/favicon.png' },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en-IN"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet"/><Script id="book-intro-state" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `try { const key = 'edataxpress-intro-seen-v7'; const show = location.pathname === '/' && !sessionStorage.getItem(key) && !matchMedia('(prefers-reduced-motion: reduce)').matches; document.documentElement.dataset.bookIntro = show ? 'show' : 'seen'; if (show) sessionStorage.setItem(key, 'true'); } catch { document.documentElement.dataset.bookIntro = location.pathname === '/' ? 'show' : 'seen'; }` }}/></head><body><PageTurnTransition/><a className="skip-link" href="#main">Skip to content</a><SiteHeader/><main id="main">{children}</main><SiteFooter/></body></html>;
}
