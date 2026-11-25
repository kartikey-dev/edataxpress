import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = { title: 'Contact eDataXpress — Delhi Publishing & Printing', description: 'Contact eDataXpress about publishing, printing or marketing. Visit our Madangir, Delhi studio, open daily 7:00 am to 11:45 pm.', alternates: { canonical: '/contact' }, openGraph: { title: 'Contact eDataXpress', description: 'Tell us about your book project. We’re in Madangir, Delhi.' } };

export default function ContactPage() {
  return <>
    <section className="contact-hero"><div className="eyebrow">Your next chapter starts here</div><h1>Tell us what<br/>you’re <em>imagining.</em></h1><p>A book in progress, a print project taking shape or a question about what we do? We’d love to hear about it.</p></section>
    <section className="contact-grid"><div className="contact-card"><div className="eyebrow">Find us in Delhi</div><h2>Come say<br/><em>hello.</em></h2><address>PN92A, 2nd Floor,<br/>Madangir Police Station,<br/>Lal Bahadur Shastri Marg,<br/>Madangir, Delhi–110062</address><a className="text-link" target="_blank" rel="noopener noreferrer" href="https://maps.google.com/?q=PN92A%2C+2nd+Floor%2C+Madangir+Police+Station%2C+Lal+Bahadur+Shastri+Marg%2C+Madangir%2C+Delhi+110062">Get directions <span>↗</span></a><div className="contact-hours"><span>OPEN EVERY DAY</span><strong>7:00 am – 11:45 pm</strong></div></div><div className="contact-form-wrap"><div className="eyebrow">A note is a good beginning</div><h2>Let’s talk <em>books.</em></h2><ContactForm/></div></section>
    <section className="social-proof"><span>FIND US AROUND THE WEB</span><a href="https://in.linkedin.com/company/edataxpress" target="_blank" rel="noopener noreferrer">LinkedIn <span>↗</span></a><a href="https://x.com/edataxpress" target="_blank" rel="noopener noreferrer">X <span>↗</span></a><a href="https://www.justdial.com/Delhi/EDATAXPRESS-NEET-PUBLICATION-Madangir-Police-Station-Madangir/011PXX11-XX11-240712163111-E8C8_BZDET" target="_blank" rel="noopener noreferrer">Justdial <span>↗</span></a><a href="https://internshala.com/company/edataxpress-1645567516/" target="_blank" rel="noopener noreferrer">Internshala <span>↗</span></a></section>
  </>;
}
