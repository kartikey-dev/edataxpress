import type { ServiceSlug } from '@/lib/content';

export function ChapterGraphic({ slug }: { slug: ServiceSlug }) {
  switch (slug) {
    case 'publication':
      return (
        <svg className="chapter-graphic" viewBox="0 0 120 44" fill="none" aria-hidden="true">
          <rect x="6" y="4" width="52" height="36" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <rect
            x="62"
            y="4"
            width="52"
            height="36"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <line x1="15" y1="14" x2="46" y2="14" stroke="#c4121a" strokeWidth="1.6" />
          <line
            x1="15"
            y1="22"
            x2="49"
            y2="22"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.3"
          />
          <line
            x1="15"
            y1="29"
            x2="42"
            y2="29"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.3"
          />
          <line
            x1="71"
            y1="14"
            x2="105"
            y2="14"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.3"
          />
          <line
            x1="71"
            y1="22"
            x2="99"
            y2="22"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.3"
          />
          <circle cx="98" cy="30" r="3" fill="#c4121a" />
        </svg>
      );
    case 'printing-solutions':
      return (
        <svg className="chapter-graphic" viewBox="0 0 120 44" fill="none" aria-hidden="true">
          <rect
            x="14"
            y="10"
            width="44"
            height="28"
            rx="1.5"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.3"
          />
          <rect
            x="20"
            y="6"
            width="44"
            height="28"
            rx="1.5"
            fill="#ffffff"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <circle cx="92" cy="22" r="12" stroke="currentColor" strokeWidth="1.3" />
          <line x1="92" y1="6" x2="92" y2="38" stroke="#c4121a" strokeWidth="1.3" />
          <line x1="76" y1="22" x2="108" y2="22" stroke="#c4121a" strokeWidth="1.3" />
          <circle cx="92" cy="22" r="3.5" fill="#c4121a" />
        </svg>
      );
    case 'digital-studio-setup':
      return (
        <svg className="chapter-graphic" viewBox="0 0 120 44" fill="none" aria-hidden="true">
          <rect
            x="10"
            y="5"
            width="60"
            height="32"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line x1="40" y1="37" x2="40" y2="42" stroke="currentColor" strokeWidth="1.5" />
          <line x1="28" y1="42" x2="52" y2="42" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="40" cy="21" r="4.5" fill="#c4121a" />
          <circle
            className="svg-pulse"
            cx="40"
            cy="21"
            r="9"
            stroke="#c4121a"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
          <path
            d="M84 14C91 18 91 26 84 30"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M93 9C103 16 103 28 93 35"
            stroke="#c4121a"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'digital-marketing':
      return (
        <svg className="chapter-graphic" viewBox="0 0 120 44" fill="none" aria-hidden="true">
          <circle
            cx="34"
            cy="22"
            r="16"
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeWidth="1.3"
          />
          <circle
            cx="34"
            cy="22"
            r="10"
            stroke="currentColor"
            strokeOpacity="0.55"
            strokeWidth="1.3"
          />
          <circle cx="34" cy="22" r="4" fill="#c4121a" />
          <path
            className="svg-dash"
            d="M52 28L74 18L88 22L106 10"
            stroke="#c4121a"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="98,10 106,10 106,18"
            stroke="#c4121a"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
