export type ServiceSlug =
  'publication' | 'printing-solutions' | 'digital-studio-setup' | 'digital-marketing';

export type ServiceDeliverable = {
  readonly title: string;
  readonly description: string;
};

export type ServiceProcessStep = {
  readonly title: string;
  readonly description: string;
};

export type ServiceFaq = {
  readonly question: string;
  readonly answer: string;
};

export type ServicePillar = {
  readonly slug: ServiceSlug;
  readonly chapter: string;
  readonly title: string;
  readonly shortLabel: string;
  readonly summary: string;
  readonly intro: string;
  readonly ctaLabel: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly stamp: string;
  };
  readonly audience: readonly string[];
  readonly deliverablesHeading: string;
  readonly deliverablesSubheading: string;
  readonly deliverables: readonly ServiceDeliverable[];
  readonly processHeading: string;
  readonly process: readonly ServiceProcessStep[];
  readonly relatedProducts?: readonly string[];
  readonly faqs: readonly ServiceFaq[];
  readonly ctaBand: {
    readonly eyebrow: string;
    readonly title: string;
  };
  readonly seo: {
    readonly title: string;
    readonly description: string;
  };
};

export const SERVICES: readonly ServicePillar[] = [
  {
    slug: 'publication',
    chapter: '01',
    title: 'Publication',
    shortLabel: 'Publication',
    summary: 'Editorial direction, book layout, typesetting, and production planning.',
    intro:
      'From early manuscript structure to print-ready files, we help institutions, educators, and organizations shape publications built to be read clearly.',
    ctaLabel: 'Enquire about publication',
    image: {
      src: '/images/publishing-studio.webp',
      alt: 'Publishing editor reviewing manuscript pages and printed proofs',
      stamp: 'FROM MANUSCRIPT TO SHELF',
    },
    audience: [
      'Educational publishers and coaching institutes',
      'Academic institutions and training organizations',
      'Corporate teams and independent authors',
    ],
    deliverablesHeading: 'Make your content ready to be read.',
    deliverablesSubheading:
      'Structured editorial and layout support tailored to the scope of each book or institutional publication.',
    deliverables: [
      {
        title: 'Editorial direction',
        description:
          'Review manuscript organization, refine chapter flow, and prepare material for clear reading.',
      },
      {
        title: 'Design & typesetting',
        description:
          'Establish readable typographic hierarchy, page grids, and clean interior composition.',
      },
      {
        title: 'Production planning',
        description:
          'Align format, trim size, paper choices, and print quantities with project timelines.',
      },
      {
        title: 'Pre-press readiness',
        description:
          'Prepare verified print-ready files and coordinate proofing milestones before press run.',
      },
    ],
    processHeading: 'A clear path from draft to print',
    process: [
      {
        title: 'Listen',
        description: 'Understand your manuscript, target readers, and publication schedule.',
      },
      {
        title: 'Shape',
        description: 'Develop editorial structure, page layout, and visual formatting.',
      },
      {
        title: 'Deliver',
        description: 'Finalize proofs and hand off production-ready editions.',
      },
    ],
    faqs: [
      {
        question: 'Who is the publication service suited for?',
        answer:
          'We work with educational institutions, publishers, organizations, and authors who need structured editorial, typesetting, and print-readiness support.',
      },
      {
        question: 'Can publication and printing be coordinated together?',
        answer:
          'Yes. Publication workflows connect directly with our Printing Solutions team so formatting, paper selection, and finishing stay aligned.',
      },
    ],
    ctaBand: {
      eyebrow: 'Every publication has a beginning',
      title: 'Let us shape your next edition.',
    },
    seo: {
      title: 'Publication Services — Editorial, Typesetting & Pre-Press',
      description:
        'Editorial direction, book typesetting, layout design, and pre-press planning in Delhi for institutions, publishers, and organizations.',
    },
  },
  {
    slug: 'printing-solutions',
    chapter: '02',
    title: 'Printing Solutions',
    shortLabel: 'Printing Solutions',
    summary: 'Paper selection, book production, finishing, and coordinated print fulfilment.',
    intro:
      'Consistent impression, considered paper stock, and durable finishing for books, study materials, and organizational print runs.',
    ctaLabel: 'Request a print quote',
    image: {
      src: '/images/print-production.webp',
      alt: 'Printing press producing sheets for books in a print workshop',
      stamp: 'INK · PAPER · FINISH',
    },
    audience: [
      'Publishers and educational institutes requiring recurring print runs',
      'Schools and universities producing academic books and manuals',
      'Businesses commissioning corporate print collateral and bound reports',
    ],
    deliverablesHeading: 'Made with care. Built to last.',
    deliverablesSubheading:
      'Practical print production planning covering stock selection, binding, proofing, and fulfilment.',
    deliverables: [
      {
        title: 'Book & manual production',
        description:
          'Plan short or institutional print runs matched to reading context and budget.',
      },
      {
        title: 'Paper & binding choices',
        description:
          'Evaluate paper weights, cover stocks, lamination, and binding styles for everyday durability.',
      },
      {
        title: 'Production quality checks',
        description:
          'Review colour consistency, registration, trim accuracy, and binding finish across runs.',
      },
      {
        title: 'Fulfilment coordination',
        description:
          'Organize schedules, specifications, and delivery steps under one coordinated plan.',
      },
    ],
    processHeading: 'From specification to finished stack',
    process: [
      {
        title: 'Specify',
        description: 'Define dimensions, page count, paper stock, and binding requirements.',
      },
      {
        title: 'Proof',
        description: 'Validate print files, colour profiles, and pre-production checks.',
      },
      {
        title: 'Produce',
        description: 'Complete printing, finishing, inspection, and scheduled dispatch.',
      },
    ],
    faqs: [
      {
        question: 'What details help prepare an accurate print quote?',
        answer:
          'Sharing approximate trim size, page count, black-and-white or colour requirements, binding preference, and estimated quantity helps us scope the job.',
      },
    ],
    ctaBand: {
      eyebrow: 'Craft you can hold',
      title: 'Let us plan your next print run.',
    },
    seo: {
      title: 'Printing Solutions — Book Production, Finishing & Print Coordination',
      description:
        'Book printing, paper and binding selection, quality checks, and coordinated print fulfilment from eDataXpress in Delhi.',
    },
  },
  {
    slug: 'digital-studio-setup',
    chapter: '03',
    title: 'Digital Studio Setup',
    shortLabel: 'Digital Studio Setup',
    summary: 'Interactive classrooms, recording studios, and 65-inch flat panel environments.',
    intro:
      'Structured consultation, hardware supply, and room setup for interactive classrooms, training studios, and hybrid presentation spaces.',
    ctaLabel: 'Request a consultation or demo',
    image: {
      src: '/images/book-finishing.webp',
      alt: 'Prepared studio and workspace setup for organizational and learning teams',
      stamp: 'CLASSROOMS · STUDIOS · DISPLAYS',
    },
    audience: [
      'Schools, colleges, and universities building digital classrooms',
      'Coaching institutes setting up lecture-recording and teaching studios',
      'Corporate training centres and hybrid meeting spaces',
    ],
    deliverablesHeading: 'Configured around your room and teaching workflow.',
    deliverablesSubheading:
      'Every space has distinct acoustics, lighting, and seating sightlines. We scope solutions based on confirmed site requirements.',
    deliverables: [
      {
        title: 'Interactive Flat Panel integration',
        description:
          'Supply and room-planning support for interactive display environments including 65-inch panel setups.',
      },
      {
        title: 'Classroom & studio layout planning',
        description:
          'Assess room dimensions, sightlines, mounting positions, and cabling pathways before installation.',
      },
      {
        title: 'Audio-visual & capture readiness',
        description:
          'Coordinate display, camera, microphone, and lighting considerations suited to lecture capture or hybrid sessions.',
      },
      {
        title: 'Commissioning & handover orientation',
        description:
          'Confirm installation scope, on-site setup, and practical team orientation as agreed in your project proposal.',
      },
    ],
    processHeading: 'How a studio project moves forward',
    process: [
      {
        title: 'Discover & assess',
        description:
          'Review teaching or presentation goals, room dimensions, and power/network readiness.',
      },
      {
        title: 'Propose & supply',
        description:
          'Confirm suitable display model, mounting, and studio components with clear documentation.',
      },
      {
        title: 'Install & hand over',
        description:
          'Complete agreed installation, functional checks, and initial operator walkthrough.',
      },
    ],
    relatedProducts: ['interactive-flat-panel-65'],
    faqs: [
      {
        question: 'Are Digital Studio Setup packages fixed or customizable?',
        answer:
          'Spaces are configured around room size, seating layout, and whether the room is focused on live classroom teaching, lecture recording, or hybrid collaboration.',
      },
      {
        question: 'Where can I review the Interactive Flat Panel 65-inch details?',
        answer:
          'Visit the Interactive Flat Panel 65-inch product page or submit an enquiry for the current approved datasheet and commercial proposal.',
      },
    ],
    ctaBand: {
      eyebrow: 'Built for teaching and presentation',
      title: 'Let us scope your digital studio.',
    },
    seo: {
      title: 'Digital Studio Setup — Interactive Classrooms & Presentation Spaces',
      description:
        'Digital Studio Setup solutions in Delhi for schools, coaching institutes, and organizations, including Interactive Flat Panel 65-inch deployments.',
    },
  },
  {
    slug: 'digital-marketing',
    chapter: '04',
    title: 'Digital Marketing',
    shortLabel: 'Digital Marketing',
    summary: 'Audience positioning, campaign planning, and sustained digital visibility.',
    intro:
      'Clear campaign planning and digital communication designed to help books, educational programmes, and B2B services reach the right audience.',
    ctaLabel: 'Discuss digital marketing',
    image: {
      src: '/images/book-marketing.webp',
      alt: 'Team reviewing campaign strategy and audience materials',
      stamp: 'STRATEGY · REACH · CLARITY',
    },
    audience: [
      'Publishers and authors preparing a book or title series launch',
      'Institutes expanding digital outreach for admissions and courses',
      'B2B organizations strengthening search and social visibility',
    ],
    deliverablesHeading: 'Outreach grounded in clarity.',
    deliverablesSubheading:
      'Focused digital marketing support aligned with your audience, messaging, and measurable business goals.',
    deliverables: [
      {
        title: 'Positioning & messaging',
        description:
          'Clarify who your offer serves and craft clear, consistent messaging across touchpoints.',
      },
      {
        title: 'Campaign planning',
        description:
          'Structure launch calendars and channel priorities suited to your budget and timeline.',
      },
      {
        title: 'Search & social visibility',
        description:
          'Support discoverability across search and professional social channels with steady execution.',
      },
      {
        title: 'Ongoing review',
        description: 'Evaluate campaign signals and refine priorities over time without guesswork.',
      },
    ],
    processHeading: 'A launch with intention',
    process: [
      {
        title: 'Understand',
        description: 'Clarify your offering, target audience, and practical outreach goals.',
      },
      {
        title: 'Plan',
        description: 'Select the channels, creative assets, and cadence that fit the brief.',
      },
      {
        title: 'Refine',
        description: 'Launch campaigns, review performance signals, and iterate steadily.',
      },
    ],
    faqs: [
      {
        question: 'Can digital marketing support print or studio launches?',
        answer:
          'Yes. We regularly pair marketing support with publication releases and institutional outreach.',
      },
    ],
    ctaBand: {
      eyebrow: 'Good work deserves to be found',
      title: 'Let us reach your audience.',
    },
    seo: {
      title: 'Digital Marketing — Campaign Planning & Audience Outreach',
      description:
        'Digital marketing, audience positioning, and launch campaign support from eDataXpress in Delhi.',
    },
  },
];

export function getServiceBySlug(slug: string): ServicePillar | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
