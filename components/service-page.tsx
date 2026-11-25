import Link from 'next/link';
import type { ReactNode } from 'react';
import Image from 'next/image';

export type ServicePageData = {
  number: string; title: ReactNode; intro: string; action: string; className: string;
  image: string; imageAlt: string;
  heading: ReactNode; subheading: string; details: [string, string][];
  stepsTitle: string; steps: [string, string][]; ctaEyebrow: string; ctaTitle: ReactNode;
};

export function ServicePage({ data }: { data: ServicePageData }) {
  return <>
    <section className={`service-hero service-hero-${data.className}`}>
      <div className="service-hero-copy"><div className="eyebrow">{data.number} / {data.className.toUpperCase()}</div><h1>{data.title}</h1><p>{data.intro}</p><Link className="button button-dark" href="/contact">{data.action} <span>↗</span></Link></div>
      <div className={`service-hero-art ${data.className}-hero-art`}><Image src={data.image} alt={data.imageAlt} fill sizes="(max-width: 680px) 100vw, 48vw"/><span className="service-photo-tag">eDATAXPRESS · {data.className.toUpperCase()}</span><span className="service-art-stamp">{data.className === 'publishing' ? 'FROM MANUSCRIPT TO SHELF' : data.className === 'printing' ? 'INK · PAPER · FINISH' : 'IDEAS INTO READERS’ HANDS'}</span><span className={`service-art-mark service-art-mark-${data.className}`} aria-hidden="true">{data.className === 'publishing' ? 'Aa' : data.className === 'printing' ? 'CMYK' : '↗'}</span></div>
    </section>
    <section className="service-details section"><div className="section-heading"><div><div className="eyebrow">Our {data.className} support</div><h2>{data.heading}</h2></div><p>{data.subheading}</p></div><div className="detail-grid">{data.details.map(([title, text], i) => <article key={title}><span>{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="process"><div className="eyebrow">{data.stepsTitle}</div><div className="process-steps">{data.steps.map(([title, text], i) => <div key={title}><b>{String(i + 1).padStart(2, '0')}</b><h3>{title}</h3><p>{text}</p></div>)}</div></section>
    <section className="bottom-cta"><div><div className="eyebrow">{data.ctaEyebrow}</div><h2>{data.ctaTitle}</h2></div><Link className="button button-cream" href="/contact">Start a conversation <span>↗</span></Link><span className="cta-flower">✳</span></section>
  </>;
}
