import {
  ElevenLabsThumbnail,
  GrowthPreview,
  type ElevenPreviewKind,
} from "./elevenlabs/thumbnails";
import {
  CloudflareThumbnail,
  type CloudflarePreviewKind,
} from "./cloudflare/thumbnails";

import { TallyThumbnail, type TallyPreviewKind } from "./tally/thumbnails";

export type ExperimentPreviewKind =
  | "feature-modal"
  | "discovery-queue"
  | "event-banner"
  | ElevenPreviewKind
  | CloudflarePreviewKind
  | TallyPreviewKind;

const surface = "var(--card)";
const sunken = "var(--surface-sunken)";
const raised = "var(--surface-raised)";
const line = "var(--input)";
const ink = "var(--foreground)";
const muted = "var(--muted-foreground)";

function FeaturePreview() {
  return (
    <GrowthPreview>
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
      <rect
        x="124"
        y="405"
        width="262"
        height="37"
        rx="4"
        fill="var(--primary)"
      />
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
    </GrowthPreview>
  );
}

function DiscoveryPreview() {
  return (
    <GrowthPreview>
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
      <rect
        x="102"
        y="413"
        width="168"
        height="40"
        rx="4"
        fill="var(--primary)"
      />
      <text x="122" y="439" fill="var(--primary-foreground)" fontSize="16">
        Explore queue →
      </text>
    </GrowthPreview>
  );
}

function EventPreview() {
  return (
    <svg
      x="32"
      y="22"
      width="896"
      height="516"
      viewBox="0 0 2048 1179"
      overflow="hidden"
    >
      <rect
        width="2048"
        height="1179"
        rx="16"
        fill="var(--background)"
        stroke="var(--border)"
        strokeWidth="2"
      />
      <path d="M0 76h2048" stroke="var(--border)" strokeWidth="2" />
      <circle cx="88" cy="38" r="18" fill="var(--border)" />
      <path
        d="M128 38h142"
        stroke="var(--border)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <rect x="0" y="76" width="398" height="1103" fill={sunken} />
      <path d="M398 76v1103" stroke="var(--border)" strokeWidth="2" />
      <path
        d="M29 120h164"
        stroke="var(--border)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <rect
        x="29"
        y="146"
        width="340"
        height="38"
        rx="6"
        fill="none"
        stroke="var(--border)"
        strokeWidth="2"
      />
      {[0, 1, 2, 3, 4, 5, 6].map((item) => (
        <g key={item} fill="var(--border)">
          <circle cx="38" cy={215 + item * 35} r="8" />
          <rect x="60" y={210 + item * 35} width="240" height="10" rx="5" />
        </g>
      ))}
      <text x="481" y="155" fill={muted} fontSize="29" fontWeight="600">
        Home
      </text>
      <g fill={sunken} stroke="var(--border)" strokeWidth="2">
        <rect x="481" y="184" width="1067" height="150" rx="15" />
        <rect x="481" y="457" width="1067" height="243" rx="6" />
        <rect x="481" y="719" width="1067" height="500" rx="6" />
        {[
          [617, 105],
          [735, 154],
          [904, 176],
          [1093, 115],
          [1220, 193],
        ].map(([x, width]) => (
          <rect key={x} x={x} y="348" width={width} height="47" rx="15" />
        ))}
      </g>
      <g stroke="var(--border-subtle)" strokeWidth="12" strokeLinecap="round">
        <path d="M502 219h329M567 494h294M567 756h416M502 823h485" />
      </g>
      <g fill={surface} stroke="var(--border)" strokeWidth="2">
        <rect x="493" y="286" width="111" height="38" rx="6" />
        <rect x="614" y="286" width="199" height="38" rx="6" />
        <rect x="824" y="286" width="38" height="38" rx="6" />
      </g>
      <text x="481" y="435" fill={muted} fontSize="18" fontWeight="600">
        Feed
      </text>
      <g fill="var(--border)">
        <circle cx="525" cy="500" r="22" />
        <circle cx="525" cy="762" r="22" />
      </g>
      <rect x="502" y="551" width="1025" height="129" rx="4" fill={surface} />
      <rect x="502" y="892" width="1025" height="327" rx="4" fill={surface} />
      <g stroke="var(--border-subtle)" strokeWidth="12" strokeLinecap="round">
        <path d="M524 585h540M524 624h810M524 932h180M524 985h780M524 1024h710M524 1063h795M524 1102h745" />
      </g>
      <rect
        x="1595"
        y="604"
        width="370"
        height="415"
        rx="15"
        fill={sunken}
        stroke="var(--border)"
        strokeWidth="2"
      />
      <text x="1615" y="643" fill={muted} fontSize="18" fontWeight="600">
        Latest from our changelog
      </text>
      <path d="M1620 675v263" stroke="var(--border)" strokeWidth="2" />
      {[675, 760, 845, 906].map((y) => (
        <g key={y}>
          <circle cx="1620" cy={y} r="5" fill="var(--border)" />
          <path
            d={`M1649 ${y}h78m-78 24h268m-268 24h220`}
            stroke="var(--border-subtle)"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </g>
      ))}
      <GrowthPreview>
        <rect
          x="1595"
          y="122"
          width="370"
          height="462"
          rx="15"
          fill={surface}
          stroke={line}
          strokeWidth="2"
        />
        <text x="1615" y="165" fill={ink} fontSize="32" fontWeight="600">
          UNIVERSE’26
        </text>
        <path d="m1926 150 10 10m0-10-10 10" stroke={muted} strokeWidth="2" />
        <rect x="1596" y="186" width="368" height="146" fill={sunken} />
        <g fill="none" stroke={muted} strokeWidth="2">
          <rect x="1746" y="232" width="68" height="54" rx="5" />
          <circle cx="1767" cy="250" r="6" />
          <path d="m1751 279 19-17 12 10 13-16 14 23" />
        </g>
        <g stroke="var(--border)" strokeWidth="2">
          <path d="M1596 186h368M1596 332h368M1596 392h368M1596 488h368" />
        </g>
        <text x="1615" y="367" fill={muted} fontSize="15">
          OCT 28–29
        </text>
        <text x="1731" y="367" fill={muted} fontSize="15">
          SAN FRANCISCO, CA
        </text>
        <text x="1615" y="436" fill={ink} fontSize="24" fontWeight="600">
          <tspan x="1615">Save $600 with Super Early</tspan>
          <tspan x="1615" dy="29">
            Bird passes through July 8.
          </tspan>
        </text>
        <rect
          x="1615"
          y="508"
          width="330"
          height="56"
          rx="7"
          fill="var(--primary)"
        />
        <text
          x="1780"
          y="544"
          fill="var(--primary-foreground)"
          textAnchor="middle"
          fontSize="20"
          fontWeight="600"
        >
          Register now
        </text>
      </GrowthPreview>
    </svg>
  );
}

const previews = {
  "feature-modal": FeaturePreview,
  "discovery-queue": DiscoveryPreview,
  "event-banner": EventPreview,
};

/** A quiet, recognizable overview of the interaction, independent of live state. */
export function ExperimentPreview({ kind }: { kind: ExperimentPreviewKind }) {
  const Preview =
    kind in previews ? previews[kind as keyof typeof previews] : null;
  return (
    <svg
      viewBox="0 0 960 560"
      className="block h-full w-full"
      aria-hidden="true"
      focusable="false"
      fontFamily="var(--font-sans)"
    >
      {Preview ? (
        <Preview />
      ) : kind.startsWith("tally-") ? (
        <TallyThumbnail kind={kind as TallyPreviewKind} />
      ) : kind.startsWith("cf-") ? (
        <CloudflareThumbnail kind={kind as CloudflarePreviewKind} />
      ) : (
        <ElevenLabsThumbnail kind={kind as ElevenPreviewKind} />
      )}
    </svg>
  );
}
