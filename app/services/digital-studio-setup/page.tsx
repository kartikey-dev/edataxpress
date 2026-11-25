import type { Metadata } from 'next';
import { ServicePage } from '@/components/service-page';
import { StudioRoomDiagram } from '@/components/studio-room-diagram';
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
              Switch between room concepts to inspect how display placement, audio pickup, and
              lighting adapt to your site requirements.
            </p>
          </div>

          <StudioRoomDiagram />
        </div>
      </section>
    </ServicePage>
  );
}
