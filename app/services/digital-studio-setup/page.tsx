import type { Metadata } from 'next';
import { ServicePage } from '@/components/service-page';
import { getServiceBySlug } from '@/lib/content';

const service = getServiceBySlug('digital-studio-setup')!;

export const metadata: Metadata = {
  title: service.seo.title,
  description: service.seo.description,
  alternates: { canonical: `/services/${service.slug}` },
  openGraph: {
    title: service.seo.title,
    description: service.seo.description,
    url: `/services/${service.slug}`,
  },
};

const ROOM_CONCEPTS = [
  {
    title: 'Interactive Classroom',
    description:
      'Configurable setup centred on a large-format interactive flat panel for school, college, and coaching instruction.',
  },
  {
    title: 'Lecture Recording & Training Studio',
    description:
      'Structured teaching environment coordinating display, camera framing, presenter audio, and studio lighting.',
  },
  {
    title: 'Hybrid Collaboration Room',
    description:
      'Meeting and training room layout tailored for shared presentations, workshops, and remote participation.',
  },
];

export default function DigitalStudioSetupPage() {
  return (
    <ServicePage service={service}>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-rule" />
                Configurable Room Concepts
              </div>
              <h2>
                Solution architecture matched
                <br />
                to <em>how your space is used.</em>
              </h2>
            </div>
            <p>
              Presented as adaptable room setups rather than rigid fixed packages. Component
              selection and scope are finalized after room assessment.
            </p>
          </div>

          <div className="grid-3">
            {ROOM_CONCEPTS.map((concept, index) => (
              <article key={concept.title} className="editorial-card">
                <span className="card-index">CONCEPT {String(index + 1).padStart(2, '0')}</span>
                <h3>{concept.title}</h3>
                <p>{concept.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ServicePage>
  );
}
