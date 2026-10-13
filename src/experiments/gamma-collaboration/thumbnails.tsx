import type { ReactNode } from "react";

export type GammaCollaborationPreviewKind = "gamma-shared-folders";
const ink = "var(--foreground)";
const muted = "var(--muted-foreground)";
const surface = "var(--card)";
const inset = "var(--surface-sunken)";
const border = "var(--border)";
const outline = "var(--input)";
function Text({
  x,
  y,
  size = 17,
  children,
  dim = false,
  strong = false,
}: {
  x: number;
  y: number;
  size?: number;
  children: ReactNode;
  dim?: boolean;
  strong?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={dim ? muted : ink}
      fontWeight={strong ? 600 : 400}
    >
      {children}
    </text>
  );
}

/** Complete 1440 × 900 source composition in the shared landscape preview. */
export function GammaCollaborationPreview() {
  return (
    <g transform="translate(70.4 24) scale(.568888889)">
      <rect width={1440} height={900} fill="var(--background)" rx={10} />
      <rect width={72} height={900} fill={inset} />
      <path d="M72 0v900M392 0v900" stroke={border} />
      <Text x={25} y={47} size={30} strong>
        G
      </Text>
      {["Home", "Media", "Templates", "Customize", "Settings", "More"].map(
        (label, index) => (
          <g key={label}>
            <rect
              x={27}
              y={84 + index * 71}
              width={18}
              height={18}
              rx={4}
              fill={surface}
              stroke={outline}
            />
            <Text x={9} y={130 + index * 71} size={12} dim>
              {label}
            </Text>
          </g>
        ),
      )}
      <circle cx={36} cy={860} r={17} fill={surface} stroke={outline} />
      <circle cx={108} cy={35} r={16} fill={inset} stroke={outline} />
      <Text x={132} y={34}>
        Workspace
      </Text>
      <Text x={132} y={55} size={14} dim>
        Free
      </Text>
      <rect
        x={84}
        y={70}
        width={295}
        height={38}
        rx={6}
        fill="var(--selected)"
      />
      {[
        "Create",
        "Recent chats",
        "Recent gammas",
        "Search",
        "All",
        "Shared with you",
        "Sites",
        "API Generated",
      ].map((label, index) => (
        <g key={label}>
          <rect
            x={100}
            y={83 + index * 40}
            width={13}
            height={13}
            rx={3}
            fill="none"
            stroke={outline}
          />
          <Text x={128} y={96 + index * 40}>
            {label}
          </Text>
        </g>
      ))}
      <path d="M84 405h295" stroke={border} />
      <Text x={92} y={437} size={14}>
        FOLDERS
      </Text>
      <g className="growth-scope">
        <rect
          x={84}
          y={456}
          width={295}
          height={218}
          rx={8}
          fill={surface}
          stroke={outline}
          strokeDasharray="4 4"
        />
        <rect
          x={98}
          y={470}
          width={267}
          height={42}
          rx={5}
          fill="var(--secondary)"
          stroke={border}
        />
        <Text x={109} y={497} size={13} strong>
          NEW
        </Text>
        <Text x={156} y={497}>
          Manage access →
        </Text>
        <path
          d="M109 536h15v12h-15zM109 566h15v12h-15z"
          fill="none"
          stroke={outline}
        />
        <path
          d="M139 542h164M139 572h114"
          stroke={border}
          strokeWidth={8}
          strokeLinecap="round"
        />
        <Text x={106} y={608} size={16} dim>
          Group related gammas and share
        </Text>
        <Text x={106} y={631} size={16} dim>
          them all at once.
        </Text>
        <Text x={106} y={655} size={16}>
          Create a folder
        </Text>
      </g>
      <Text x={104} y={724}>
        Trash
      </Text>
      <rect
        x={417}
        y={24}
        width={214}
        height={38}
        rx={19}
        fill={surface}
        stroke={outline}
      />
      <Text x={436} y={49}>
        Upgrade for more AI
      </Text>
      <Text x={943} y={50}>
        Use classic generator
      </Text>
      <rect
        x={1131}
        y={24}
        width={177}
        height={38}
        rx={19}
        fill={surface}
        stroke={outline}
      />
      <Text x={1147} y={49}>
        + New from blank
      </Text>
      <rect
        x={1318}
        y={24}
        width={86}
        height={38}
        rx={19}
        fill={surface}
        stroke={outline}
      />
      <Text x={1340} y={49}>
        400
      </Text>
      <rect
        x={849}
        y={163}
        width={126}
        height={96}
        rx={8}
        fill={inset}
        stroke={border}
      />
      <path
        d="m868 237 28-37 27 16 30-33"
        stroke={outline}
        strokeWidth={3}
        fill="none"
      />
      <Text x={737} y={318} size={36} strong>
        Trust the messy draft
      </Text>
      <rect
        x={540}
        y={349}
        width={736}
        height={134}
        rx={18}
        fill={inset}
        stroke={outline}
      />
      <Text x={561} y={389} size={18} dim>
        Describe what you want to create…
      </Text>
      <circle cx={578} cy={448} r={20} fill={surface} stroke={outline} />
      <Text x={571} y={454} size={23}>
        +
      </Text>
      <Text x={1120} y={454} dim>
        Lite⌄
      </Text>
      <circle cx={1240} cy={448} r={20} fill={surface} stroke={outline} />
      {[
        "Presentation",
        "Document",
        "Carousel",
        "Image",
        "Beautify",
        "Import",
      ].map((label, index) => (
        <g key={label}>
          <rect
            x={490 + index * 137}
            y={508}
            width={127}
            height={38}
            rx={19}
            fill={surface}
            stroke={outline}
          />
          <Text x={506 + index * 137} y={533} size={16}>
            {label}
          </Text>
        </g>
      ))}
      <Text x={834} y={599} size={16} dim>
        Suggested templates
      </Text>
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect
            x={418 + i * 166}
            y={619}
            width={153}
            height={84}
            rx={8}
            fill={inset}
            stroke={border}
          />
          <path
            d={`M${430 + i * 166} 640h72m-72 17h110m-110 17h92`}
            stroke={border}
            strokeWidth={5}
          />
          <Text x={418 + i * 166} y={724} size={14} dim>
            Template {i + 1}
          </Text>
        </g>
      ))}
      <rect
        x={836}
        y={745}
        width={146}
        height={33}
        rx={17}
        fill={surface}
        stroke={outline}
      />
      <Text x={851} y={767} size={15}>
        View all templates
      </Text>
    </g>
  );
}
