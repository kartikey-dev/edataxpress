'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const links = [
  ['Home', '/'], ['About', '/about'], ['Publishing', '/services/publishing'],
  ['Printing', '/services/printing'], ['Marketing', '/services/marketing'],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link className="brand" href="/" aria-label="eDataXpress home"><Image className="brand-logo" src="/assets/edataxpress-logo-wide.png" alt="eDataXpress — Connecting businesses globally" width={200} height={84} priority/></Link>
    <button className="menu-toggle" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>Menu <span>☰</span></button>
    <nav id="primary-nav" className={`nav${open ? ' open' : ''}`}>
      {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>Let’s talk <span>↗</span></Link>
    </nav>
  </header>;
}
