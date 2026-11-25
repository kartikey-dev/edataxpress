'use client';

import { useState } from 'react';

type RoomConceptId = 'classroom' | 'studio' | 'hybrid';

const CONCEPTS: Record<
  RoomConceptId,
  {
    readonly label: string;
    readonly title: string;
    readonly summary: string;
    readonly zones: readonly string[];
    readonly showCamera: boolean;
    readonly showLighting: boolean;
    readonly seatingLabel: string;
  }
> = {
  classroom: {
    label: 'Interactive Classroom',
    title: 'Interactive Classroom Layout',
    summary:
      'Centred around a 65-inch Interactive Flat Panel positioned for clear front-of-room visibility across student seating rows.',
    zones: [
      '65" Interactive Flat Panel on wall mount or mobile floor stand',
      'Clean cable routing & power drop verification',
      'Sightline-checked seating arrangement',
    ],
    showCamera: false,
    showLighting: false,
    seatingLabel: 'Student Seating Sightline Zone',
  },
  studio: {
    label: 'Training & Recording Studio',
    title: 'Lecture Recording & Training Studio',
    summary:
      'Pairs the interactive teaching panel with presenter audio, camera framing, and diffused room lighting for recorded lessons.',
    zones: [
      '65" Interactive Flat Panel for live annotation',
      'Camera & presenter microphone capture alignment',
      'Balanced studio key & fill lighting placement',
    ],
    showCamera: true,
    showLighting: true,
    seatingLabel: 'Presenter Stage & Capture Zone',
  },
  hybrid: {
    label: 'Hybrid Collaboration Room',
    title: 'Hybrid Collaboration & Meeting Space',
    summary:
      'Configured for in-room workshops alongside remote participants with clear audio pickup and shared visual presentation.',
    zones: [
      '65" Interactive Flat Panel for team whiteboarding',
      'Conference camera & room audio bar alignment',
      'Flexible table layout for local & remote participants',
    ],
    showCamera: true,
    showLighting: false,
    seatingLabel: 'Conference Table & Collaboration Zone',
  },
};

export function StudioRoomDiagram() {
  const [active, setActive] = useState<RoomConceptId>('classroom');
  const concept = CONCEPTS[active];

  return (
    <div className="studio-diagram-shell">
      <div className="studio-diagram-tabs" role="tablist" aria-label="Digital Studio room concepts">
        {(Object.keys(CONCEPTS) as RoomConceptId[]).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active === id}
            className={`studio-tab${active === id ? ' active' : ''}`}
            onClick={() => setActive(id)}
          >
            {CONCEPTS[id].label}
          </button>
        ))}
      </div>

      <div className="studio-diagram-grid" role="tabpanel">
        <div className="studio-schematic-box">
          <svg
            viewBox="0 0 480 280"
            className="studio-schematic-svg"
            role="img"
            aria-label={`${concept.title} conceptual room schematic`}
          >
            <rect
              x="16"
              y="16"
              width="448"
              height="248"
              rx="4"
              fill="#f7f4ee"
              stroke="#cfc6ba"
              strokeWidth="1.5"
            />
            {/* Front display wall */}
            <line x1="120" y1="36" x2="360" y2="36" stroke="#121110" strokeWidth="2" />
            <rect x="165" y="42" width="150" height="16" rx="2" fill="#121110" />
            <rect x="171" y="46" width="138" height="8" rx="1" fill="#c4121a" />
            <text x="240" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill="#121110">
              65&quot; INTERACTIVE FLAT PANEL
            </text>

            {/* Sightline cone */}
            <path
              className="svg-dash"
              d="M170 58 L74 220 L406 220 L310 58"
              fill="rgba(196, 18, 26, 0.05)"
              stroke="#c4121a"
              strokeOpacity="0.45"
              strokeDasharray="5 5"
              strokeWidth="1.3"
            />

            {/* Optional studio lighting */}
            {concept.showLighting ? (
              <g className="fade-swap">
                <circle cx="90" cy="96" r="14" fill="#ffffff" stroke="#c4121a" strokeWidth="1.5" />
                <circle
                  className="svg-pulse"
                  cx="90"
                  cy="96"
                  r="20"
                  stroke="#c4121a"
                  strokeOpacity="0.45"
                  strokeWidth="1.2"
                  fill="none"
                />
                <text x="90" y="130" textAnchor="middle" fontSize="10" fill="#57524c">
                  Studio Light
                </text>
                <circle cx="390" cy="96" r="14" fill="#ffffff" stroke="#c4121a" strokeWidth="1.5" />
                <circle
                  className="svg-pulse"
                  cx="390"
                  cy="96"
                  r="20"
                  stroke="#c4121a"
                  strokeOpacity="0.45"
                  strokeWidth="1.2"
                  fill="none"
                />
                <text x="390" y="130" textAnchor="middle" fontSize="10" fill="#57524c">
                  Studio Light
                </text>
              </g>
            ) : null}

            {/* Optional camera & mic pickup */}
            {concept.showCamera ? (
              <g className="fade-swap">
                <rect x="214" y="114" width="52" height="22" rx="3" fill="#121110" />
                <circle cx="240" cy="125" r="5" fill="#f7f4ee" />
                <text
                  x="240"
                  y="152"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="#121110"
                >
                  Camera &amp; Audio Pickup
                </text>
              </g>
            ) : null}

            {/* Seating / collaboration footprint */}
            <rect
              x="128"
              y="174"
              width="224"
              height="60"
              rx="3"
              fill="#ffffff"
              stroke="#121110"
              strokeWidth="1.3"
            />
            <text x="240" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="#57524c">
              {concept.seatingLabel}
            </text>
          </svg>
        </div>

        <div className="studio-schematic-copy fade-swap" key={active}>
          <span className="card-index">CONFIGURABLE CONCEPT</span>
          <h3>{concept.title}</h3>
          <p className="lead">{concept.summary}</p>
          <ul className="check-list">
            {concept.zones.map((zone) => (
              <li key={zone}>{zone}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
