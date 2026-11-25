# Content model and fact validation

## Confirmed from requester

- Brand: eDataXpress.
- Owner/contact person: Ayan.
- Location: Delhi.
- Four service pillars: Publication, Printing Solutions, Digital Studio Setup, Digital Marketing.
- Tagline shown in logo: Connecting Businesses Globally.
- A 65-inch interactive flat panel product detail page is expected as part of Digital Studio Setup.

## External public profile observations (verify with owner)

The company LinkedIn profile describes the organization as New Delhi-based and includes digital services, training, SEO, social media marketing, PPC, Google Ads, affiliate marketing, website creation, and e-commerce. Treat this as a research lead, not an approved current service catalogue.

## Conflicting / unverified facts

- GitHub README refers to 2017 as establishment year.
- Public LinkedIn profile lists Founded 2020.
- Public LinkedIn lists an address in Amar Colony, Lajpat Nagar-4, New Delhi; requester has only confirmed Delhi as location.
  Do not publish founding year or street address until Ayan confirms the correct current details.

## Content schema (suggested)

```ts
type BusinessProfile = {
  name: 'eDataXpress';
  tagline: 'Connecting Businesses Globally';
  city: 'Delhi';
  country: 'India';
  legalName?: string;
  foundedYear?: number;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  social: {
    linkedinCompany: string;
    x: string;
    ownerLinkedIn: string;
  };
};

type Service = {
  slug: string;
  title: string;
  summary: string;
  audience: string[];
  deliverables: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
  seo: { title: string; description: string };
};

type Product = {
  slug: string;
  title: string;
  brand?: string;
  model?: string;
  images: string[];
  highlights: string[];
  specifications: { group: string; label: string; value: string }[];
  datasheetUrl?: string;
  warranty?: string;
  availabilityNote?: string;
  sourceDocument?: string;
};
```

## Copy guidance

- Write in clear business English; avoid unsupported superlatives such as “best”, “No. 1”, “leading”, or “guaranteed”.
- Focus on outcomes, use cases, scope, and how to enquire.
- Do not publish competitor specifications under eDataXpress branding.
- Distinguish “supplied”, “installed”, “configured”, “maintained”, and “supported”; these are different commitments.
