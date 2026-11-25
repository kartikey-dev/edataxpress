import Link from 'next/link';
import Image from 'next/image';

export function SiteFooter() {
  return <footer className="footer">
    <Link className="brand brand-light" href="/" aria-label="eDataXpress home"><Image className="brand-logo" src="/assets/edataxpress-logo-wide.png" alt="eDataXpress" width={200} height={84}/></Link>
    <p>Good ideas deserve a beautiful book.</p>
    <div className="footer-links"><Link href="/about">About</Link><Link href="/services/publishing">Publishing</Link><Link href="/services/printing">Printing</Link><Link href="/services/marketing">Marketing</Link><Link href="/contact">Contact</Link></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} eDataXpress · Est. 2017</span><span><a href="https://in.linkedin.com/company/edataxpress" rel="noopener noreferrer">LinkedIn</a> · <a href="https://x.com/edataxpress" rel="noopener noreferrer">X</a></span><span>Made with care in Delhi, India</span></div>
  </footer>;
}
