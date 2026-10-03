export type ExperimentPreviewKind =
  "feature-modal" | "discovery-queue" | "event-banner";

const surface = "var(--card)";
const sunken = "var(--surface-sunken)";
const raised = "var(--surface-raised)";
const line = "var(--input)";
const ink = "var(--foreground)";
const muted = "var(--muted-foreground)";

function FeaturePreview() {
  return (
    <>
      <rect
        x="88"
        y="48"
        width="784"
        height="464"
        rx="10"
        fill={surface}
        stroke={line}
      />
      <text x="124" y="104" fill={ink} fontSize="28" fontWeight="600">
        We’ve been cooking!
      </text>
      <path d="m834 73 10 10m0-10-10 10" stroke={muted} strokeWidth="2" />
      <rect x="124" y="140" width="262" height="96" rx="5" fill={raised} />
      <text x="144" y="172" fill={ink} fontSize="19" fontWeight="600">
        HTML blocks
      </text>
      <text x="144" y="199" fill={muted} fontSize="16">
        Interactive visuals in any page
      </text>
      {["Skills", "MCP", "Routines"].map((title, index) => (
        <g key={title}>
          <text x="144" y={274 + index * 48} fill={muted} fontSize="18">
            {title}
          </text>
          <path
            d={`m359 ${262 + index * 48} 6 6-6 6`}
            fill="none"
            stroke={muted}
            strokeWidth="2"
          />
          {index < 2 && (
            <path d={`M124 ${291 + index * 48}H386`} stroke="var(--border)" />
          )}
        </g>
      ))}
      <rect x="124" y="405" width="262" height="37" rx="4" fill={ink} />
      <text
        x="255"
        y="430"
        fill="var(--primary-foreground)"
        fontSize="16"
        textAnchor="middle"
      >
        Try for free →
      </text>
      <text x="255" y="475" fill={muted} fontSize="16" textAnchor="middle">
        Save for later
      </text>
      <rect x="414" y="140" width="422" height="336" rx="6" fill={sunken} />
      <svg
        x="414"
        y="140"
        width="422"
        height="336"
        viewBox="0 0 422 336"
        overflow="hidden"
      >
        <rect
          x="30"
          y="107"
          width="237"
          height="260"
          rx="5"
          fill="var(--surface-deep)"
          stroke={line}
        />
        <rect
          x="102"
          y="65"
          width="237"
          height="260"
          rx="5"
          fill={sunken}
          stroke={line}
        />
        <rect
          x="180"
          y="27"
          width="237"
          height="275"
          rx="5"
          fill={surface}
          stroke={line}
        />
        <text x="200" y="64" fill={muted} fontSize="16">
          ROI Notes
        </text>
        <path
          d="M200 99h76m-76 34h53m-53 65h53"
          stroke="var(--border)"
          strokeWidth="6"
        />
        <rect
          x="200"
          y="147"
          width="82"
          height="27"
          rx="3"
          fill="none"
          stroke={line}
        />
        <path d="M310 236h82" stroke={line} />
        <path
          d="M323 233v-46m26 46v-72m26 72v-104"
          stroke={muted}
          strokeWidth="17"
        />
        <path
          d="M121 104h30m-30 27h42M48 149h27m-27 30h27"
          stroke="var(--border)"
          strokeWidth="5"
        />
      </svg>
    </>
  );
}

function DiscoveryPreview() {
  return (
    <>
      <rect
        x="64"
        y="62"
        width="832"
        height="144"
        rx="8"
        fill={surface}
        stroke={line}
      />
      <g transform="translate(104 88)">
        <rect
          x="4"
          y="9"
          width="62"
          height="89"
          rx="7"
          transform="rotate(-13 35 53)"
          fill={sunken}
          stroke={line}
        />
        <rect
          x="100"
          y="9"
          width="62"
          height="89"
          rx="7"
          transform="rotate(13 131 53)"
          fill={sunken}
          stroke={line}
        />
        <rect
          x="52"
          y="0"
          width="62"
          height="96"
          rx="7"
          fill={raised}
          stroke={line}
        />
        <path
          d="m83 25 7 16 17 2-13 12 4 18-15-9-15 9 4-18-13-12 17-2Z"
          fill="none"
          stroke={ink}
          strokeWidth="2"
        />
        <circle
          cx="32"
          cy="57"
          r="13"
          fill="none"
          stroke={muted}
          strokeWidth="2"
        />
        <path
          d="m130 40 13 16-13 16-13-16Z"
          fill="none"
          stroke={muted}
          strokeWidth="2"
        />
      </g>
      <text x="322" y="117" fill={ink} fontSize="25" fontWeight="600">
        Earn free stickers
      </text>
      <text x="322" y="150" fill={muted} fontSize="18">
        Complete your discovery queue.
      </text>
      <text x="322" y="179" fill={muted} fontSize="15">
        Now through Oct 8
      </text>
      <rect
        x="64"
        y="230"
        width="832"
        height="268"
        rx="8"
        fill={surface}
        stroke={line}
      />
      <svg
        x="420"
        y="231"
        width="475"
        height="266"
        viewBox="0 0 475 266"
        overflow="hidden"
      >
        <g transform="translate(44 -23) rotate(18 160 130)">
          {[0, 1, 2, 3].map((index) => (
            <g
              key={index}
              transform={`translate(${(index % 2) * 196} ${Math.floor(index / 2) * 158})`}
            >
              <rect
                width="179"
                height="140"
                rx="5"
                fill={index % 2 ? sunken : raised}
                stroke={line}
              />
              <rect
                x="15"
                y="15"
                width="149"
                height="85"
                rx="3"
                fill="var(--surface-deep)"
              />
              <path
                d="m62 51 30 16-30 16Z"
                fill="none"
                stroke={muted}
                strokeWidth="2"
              />
              <path d="M16 120h92" stroke={muted} strokeWidth="5" />
            </g>
          ))}
        </g>
      </svg>
      <rect x="65" y="231" width="377" height="266" rx="7" fill={surface} />
      <text x="102" y="303" fill={ink} fontSize="28" fontWeight="600">
        Explore your
      </text>
      <text x="102" y="340" fill={ink} fontSize="28" fontWeight="600">
        discovery queue
      </text>
      <text x="102" y="379" fill={muted} fontSize="17">
        Find your next game.
      </text>
      <rect x="102" y="413" width="168" height="40" rx="4" fill={ink} />
      <text x="122" y="439" fill="var(--primary-foreground)" fontSize="16">
        Explore queue →
      </text>
    </>
  );
}

function EventPreview() {
  return (
    <>
      <g fill={sunken} stroke="var(--border-subtle)">
        <rect x="54" y="48" width="376" height="76" rx="8" />
        <rect x="54" y="152" width="376" height="148" rx="8" />
        <rect x="54" y="324" width="376" height="188" rx="8" />
      </g>
      <g stroke="var(--border-subtle)" strokeWidth="9" strokeLinecap="round">
        <path d="M78 82h148M78 184h98M78 216h322M78 244h242M78 357h118M78 389h322M78 418h290M78 447h202" />
      </g>
      <rect
        x="492"
        y="48"
        width="414"
        height="464"
        rx="10"
        fill={surface}
        stroke={line}
      />
      <text x="516" y="92" fill={ink} fontSize="30" fontWeight="600">
        UNIVERSE’26
      </text>
      <path d="m864 72 12 12m0-12-12 12" stroke={muted} strokeWidth="2" />
      <rect x="493" y="112" width="412" height="152" fill={sunken} />
      <g fill="none" stroke={muted} strokeWidth="2">
        <rect x="665" y="158" width="68" height="54" rx="5" />
        <circle cx="686" cy="176" r="6" />
        <path d="m670 205 19-17 12 10 13-16 14 23" />
      </g>
      <g stroke="var(--border)">
        <path d="M493 112h412M493 264h412M493 322h412M493 423h412" />
      </g>
      <text x="516" y="299" fill={muted} fontSize="16">
        OCT 28–29
      </text>
      <text x="650" y="299" fill={muted} fontSize="16">
        SAN FRANCISCO, CA
      </text>
      <text x="516" y="361" fill={ink} fontSize="23" fontWeight="600">
        <tspan x="516">Save $600 with Super Early</tspan>
        <tspan x="516" dy="31">
          Bird passes through July 8.
        </tspan>
      </text>
      <rect x="516" y="443" width="366" height="48" rx="5" fill={ink} />
      <text
        x="699"
        y="475"
        fill="var(--primary-foreground)"
        textAnchor="middle"
        fontSize="20"
        fontWeight="600"
      >
        Register now
      </text>
    </>
  );
}

const previews = {
  "feature-modal": FeaturePreview,
  "discovery-queue": DiscoveryPreview,
  "event-banner": EventPreview,
};

/** A quiet, recognizable overview of the interaction, independent of live state. */
export function ExperimentPreview({ kind }: { kind: ExperimentPreviewKind }) {
  const Preview = previews[kind];
  return (
    <svg
      viewBox="0 0 960 560"
      className="block h-full w-full"
      aria-hidden="true"
      focusable="false"
      fontFamily="var(--font-sans)"
    >
      <Preview />
    </svg>
  );
}
