export type BusinessProfile = {
  readonly name: 'eDataXpress';
  readonly tagline: 'Connecting Businesses Globally';
  readonly foundedYear: 2017;
  readonly city: 'Delhi';
  readonly country: 'India';
  readonly logo: {
    readonly src: '/assets/edataxpress-logo-transparent.png';
    readonly width: 200;
    readonly height: 73;
    readonly alt: string;
  };
  readonly address: {
    readonly lines: readonly string[];
    readonly full: string;
    readonly streetAddress: string;
    readonly locality: string;
    readonly postalCode: string;
    readonly countryCode: 'IN';
    readonly mapsUrl: string;
    readonly embedUrl: string;
  };
  readonly hours: {
    readonly display: string;
    readonly schema: string;
  };
  readonly coFounder: {
    readonly name: string;
    readonly role: string;
    readonly photoSrc: string;
    readonly linkedinUrl: string;
  };
  readonly social: {
    readonly linkedinCompany: string;
    readonly x: string;
    readonly justdial: string;
    readonly internshala: string;
  };
  readonly contactChannels: {
    readonly email: string;
    readonly phone: string | undefined;
    readonly whatsappUrl: string | undefined;
  };
};

const DEFAULT_SITE_URL = 'https://www.edataxpress.com';

export function getSiteUrl(override?: string): string {
  const candidate = (override ?? process.env.NEXT_PUBLIC_SITE_URL ?? '').trim();
  if (!candidate) return DEFAULT_SITE_URL;
  return candidate.replace(/\/+$/, '');
}

export const BUSINESS_PROFILE: BusinessProfile = {
  name: 'eDataXpress',
  tagline: 'Connecting Businesses Globally',
  foundedYear: 2017,
  city: 'Delhi',
  country: 'India',
  logo: {
    src: '/assets/edataxpress-logo-transparent.png',
    width: 200,
    height: 73,
    alt: 'eDataXpress — Connecting Businesses Globally',
  },
  address: {
    lines: [
      'PN92A, 2nd Floor,',
      'Madangir Police Station,',
      'Lal Bahadur Shastri Marg,',
      'Madangir, Delhi–110062',
    ],
    full: 'PN92A, 2nd Floor, Madangir Police Station, Lal Bahadur Shastri Marg, Madangir, Delhi–110062, India',
    streetAddress: 'PN92A, 2nd Floor, Madangir Police Station, Lal Bahadur Shastri Marg, Madangir',
    locality: 'Delhi',
    postalCode: '110062',
    countryCode: 'IN',
    mapsUrl:
      'https://maps.google.com/?q=PN92A%2C+2nd+Floor%2C+Madangir+Police+Station%2C+Lal+Bahadur+Shastri+Marg%2C+Madangir%2C+Delhi+110062',
    embedUrl:
      'https://maps.google.com/maps?q=PN92A%2C+2nd+Floor%2C+Madangir+Police+Station%2C+Lal+Bahadur+Shastri+Marg%2C+Madangir%2C+Delhi+110062&z=16&output=embed',
  },
  hours: {
    display: '7:00 am – 11:45 pm',
    schema: 'Mo-Su 07:00-23:45',
  },
  coFounder: {
    name: 'Ayan Sarkar',
    role: 'Co-Founder',
    photoSrc: '/assets/cofounder-ayan-sarkar.jpg',
    linkedinUrl: 'https://in.linkedin.com/in/dmayan',
  },
  social: {
    linkedinCompany: 'https://in.linkedin.com/company/edataxpress',
    x: 'https://x.com/edataxpress',
    justdial:
      'https://www.justdial.com/Delhi/EDATAXPRESS-NEET-PUBLICATION-Madangir-Police-Station-Madangir/011PXX11-XX11-240712163111-E8C8_BZDET',
    internshala: 'https://internshala.com/company/edataxpress-1645567516/',
  },
  contactChannels: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'enquiry@edataxpress.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || undefined,
    whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || undefined,
  },
};
