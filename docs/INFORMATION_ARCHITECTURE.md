# Information architecture and page requirements

| Route                                 | Purpose                                                 | Primary CTA                 |
| ------------------------------------- | ------------------------------------------------------- | --------------------------- |
| `/`                                   | Positioning, service discovery, credibility, conversion | Discuss a project           |
| `/about`                              | Business story, approach, team/owner (verified only)    | Contact eDataXpress         |
| `/services`                           | Overview of all four service pillars                    | Explore a service           |
| `/services/publication`               | Publication capability and deliverables                 | Enquire about publication   |
| `/services/printing-solutions`        | Print formats, production and fulfilment scope          | Request a print quote       |
| `/services/digital-studio-setup`      | End-to-end studio/interactive display solution          | Request a consultation/demo |
| `/services/digital-marketing`         | Digital marketing capabilities and engagement model     | Discuss marketing           |
| `/products/interactive-flat-panel-65` | Detailed product page for confirmed 65-inch model       | Request product quote       |
| `/contact`                            | Enquiry form and verified contact channels              | Send enquiry                |
| `/privacy-policy`                     | Explain actual collection/use of submitted data         | N/A                         |

Optional routes:

- `/insights`, `/insights/[slug]`: only build if the owner will publish and maintain useful content.
- `/projects/[slug]`: only when approved case studies and evidence are supplied.

## Navigation

Primary: Home, About, Services (mega-menu or grouped dropdown), Insights (optional), Contact.
Digital Studio Setup should be discoverable from Services and featured on the homepage.
Avoid exposing every product as a top-level nav item as the catalogue grows.

## Reusable components

- SiteHeader, MobileNavigation, SiteFooter
- Breadcrumbs, ChapterEyebrow, PageHero, SectionHeading
- ServiceCard, ServicePageTemplate, ProcessSteps
- ProductGallery, ProductHighlights, SpecificationTable, DatasheetDownload
- EnquiryForm, ContactCTA, SocialLinks
- FAQAccordion (only when FAQ content is approved)

## Content rules

Every route must have a unique H1, title, meta description, canonical, clear next action, and at least one relevant internal link. No orphan pages.
