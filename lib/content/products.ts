export type ProductSpecGroup =
  | 'Display'
  | 'Touch'
  | 'System'
  | 'Connectivity'
  | 'Audio'
  | 'Physical'
  | 'Accessories'
  | 'Compliance'
  | 'Warranty';

export type ProductSpecification = {
  readonly group: ProductSpecGroup;
  readonly label: string;
  readonly value: string;
};

export type ProductDetail = {
  readonly slug: 'interactive-flat-panel-65';
  readonly categorySlug: 'digital-studio-setup';
  readonly title: string;
  readonly shortLabel: string;
  readonly specStatus: 'pending-owner-datasheet' | 'datasheet-verified';
  readonly brand?: string;
  readonly model?: string;
  readonly sku?: string;
  readonly summary: string;
  readonly availabilityNote: string;
  readonly datasheetUrl?: string;
  readonly warranty?: string;
  readonly sourceDocument?: string;
  readonly images: readonly {
    readonly src: string;
    readonly alt: string;
  }[];
  readonly highlights: readonly string[];
  readonly useCases: readonly {
    readonly title: string;
    readonly description: string;
  }[];
  readonly consultationChecklist: readonly string[];
  readonly specifications: readonly ProductSpecification[];
  readonly seo: {
    readonly title: string;
    readonly description: string;
  };
};

export const PRODUCTS: readonly ProductDetail[] = [
  {
    slug: 'interactive-flat-panel-65',
    categorySlug: 'digital-studio-setup',
    title: 'Interactive Flat Panel 65-Inch',
    shortLabel: 'Interactive Flat Panel 65"',
    specStatus: 'pending-owner-datasheet',
    summary:
      'Large-format 65-inch interactive display solution offered as part of eDataXpress Digital Studio Setup for classrooms, training rooms, and hybrid presentation spaces.',
    availabilityNote:
      'Exact model, configuration options, current approved datasheet, installation scope, and commercial quote are shared upon enquiry.',
    images: [
      {
        src: '/images/digital-studio-interactive-panel-65.webp',
        alt: 'Large-format interactive flat panel mounted on a floor stand with side whiteboard wings in a classroom',
      },
      {
        src: '/images/digital-studio-setup.webp',
        alt: 'Dual large-format displays and conferencing audio bar installed in a modern meeting and studio room',
      },
    ],
    highlights: [
      'Sized at 65 inches for small-to-medium classrooms, seminar rooms, and studio teaching setups.',
      'Available as a standalone display enquiry or integrated within a complete Digital Studio Setup.',
      'Scoped around room sightlines, wall or mobile-stand mounting, and audio-visual peripherals.',
      'Detailed model datasheet and formal quotation provided directly for procurement evaluation.',
    ],
    useCases: [
      {
        title: 'Digital Classrooms',
        description:
          'Interactive teaching, lesson annotation, and visual demonstrations for schools and colleges.',
      },
      {
        title: 'Lecture Recording & Training Studios',
        description:
          'Structured educator studio workflow paired with cameras, microphones, and studio lighting.',
      },
      {
        title: 'Corporate & Hybrid Meeting Rooms',
        description:
          'Collaborative presentations, workshops, and team briefings across office environments.',
      },
    ],
    consultationChecklist: [
      'Room size and approximate viewer distance',
      'Wall-mount or mobile-stand installation preference',
      'Whether camera, microphone, or studio lighting integration is also needed',
      'Number of units and target delivery timeline',
    ],
    specifications: [],
    seo: {
      title: 'Interactive Flat Panel 65-Inch — Digital Studio Setup Solution',
      description:
        'Explore the Interactive Flat Panel 65-inch display solution from eDataXpress for digital classrooms, training studios, and hybrid collaboration rooms in Delhi.',
    },
  },
];

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function hasConfirmedSpecifications(product: ProductDetail): boolean {
  return product.specifications.length > 0;
}
