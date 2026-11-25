import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { BUSINESS_PROFILE, getSiteUrl } from '@/lib/content';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${BUSINESS_PROFILE.name} — Publication, Printing, Digital Studio Setup & Marketing`,
    template: `%s | ${BUSINESS_PROFILE.name}`,
  },
  description:
    'eDataXpress in Delhi offers Publication, Printing Solutions, Digital Studio Setup (including Interactive Flat Panel 65-inch), and Digital Marketing.',
  openGraph: {
    type: 'website',
    siteName: BUSINESS_PROFILE.name,
    locale: 'en_IN',
  },
  icons: {
    icon: '/assets/favicon.png',
    shortcut: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-IN" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
