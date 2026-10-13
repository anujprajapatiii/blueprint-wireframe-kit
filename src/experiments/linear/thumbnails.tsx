export type LinearPreviewKind = "linear-interactive-demo";

const surface = "var(--card)";
const ink = "var(--foreground)";
const muted = "var(--muted-foreground)";
const line = "var(--border)";

/** The complete 1440 × 900 welcome composition, scaled into the index preview. */
export function LinearPreview() {
  return (
    <g
      data-preview="linear-interactive-demo"
      transform="translate(70.4 24) scale(.568888889)"
    >
      <rect
        width={1440}
        height={900}
        rx={10}
        fill="var(--background)"
        stroke="var(--input)"
      />
      <text x={22} y={40} fontSize={16} fill={ink}>
        ◈
      </text>
      <text x={46} y={40} fontSize={16} fill={ink}>
        Linear Demo
      </text>
      <g className="growth-scope">
        <rect
          x={168}
          y={17}
          width={65}
          height={30}
          rx={15}
          fill="var(--secondary)"
        />
        <text
          x={200.5}
          y={37}
          fontSize={13}
          textAnchor="middle"
          fill="var(--secondary-foreground)"
        >
          Sign up
        </text>
      </g>
      {["Inbox", "My issues", "Agent"].map((label, i) => (
        <text key={label} x={22} y={82 + i * 30} fontSize={14} fill={muted}>
          ◇ {label}
        </text>
      ))}
      <text x={22} y={184} fontSize={13} fill={muted}>
        Workspace
      </text>
      {["Initiatives", "Projects", "Views", "Loops", "More"].map((label, i) => (
        <text key={label} x={22} y={214 + i * 29} fontSize={14} fill={muted}>
          ◇ {label}
        </text>
      ))}
      <text x={22} y={377} fontSize={13} fill={muted}>
        Favorites
      </text>
      <rect
        x={12}
        y={388}
        width={220}
        height={30}
        rx={6}
        fill="var(--selected)"
      />
      <text x={22} y={409} fontSize={14} fill="var(--selected-foreground)">
        ▤ Welcome to Linear…
      </text>
      <text x={22} y={439} fontSize={14} fill={muted}>
        ▤ Weekly Metrics Review
      </text>
      <text x={22} y={485} fontSize={13} fill={muted}>
        Your teams
      </text>
      <text x={22} y={517} fontSize={14} fill={muted}>
        ⚙ Engineering
      </text>
      {[
        "Home",
        "Triage",
        "Issues",
        "Cycles",
        "Current",
        "Upcoming",
        "Initiatives",
        "Projects",
        "Views",
      ].map((label, i) => (
        <text key={label} x={43} y={546 + i * 29} fontSize={14} fill={muted}>
          {label}
        </text>
      ))}
      <rect
        x={11}
        y={834}
        width={221}
        height={57}
        rx={14}
        fill="var(--surface-sunken)"
        stroke={line}
      />
      <text x={24} y={856} fontSize={12} fill={muted}>
        What’s new
      </text>
      <text x={24} y={878} fontSize={14} fill={ink}>
        Stacked pull requests
      </text>
      <g className="growth-scope">
        <rect
          x={244}
          y={8}
          width={1188}
          height={856}
          rx={12}
          fill={surface}
          stroke={line}
        />
        <path d="M244 54H1432" stroke={line} />
        <text x={264} y={38} fontSize={15} fill={ink}>
          Engineering › Documents › Welcome to Linear! [README] ☆
        </text>
        <rect
          x={435}
          y={116}
          width={34}
          height={36}
          rx={6}
          fill="var(--surface-sunken)"
          stroke={line}
        />
        <text x={451} y={141} textAnchor="middle" fontSize={20} fill={ink}>
          ▤
        </text>
        <text x={435} y={185} fontSize={25} fontWeight={600} fill={ink}>
          Welcome to Linear! [README]
        </text>
        {[
          "Linear is the shared workspace for planning, tracking, and delivering product work.",
          "It brings product, design, engineering, and other partners into the same workflow,",
          "so decisions, priorities, and progress stay connected to the work itself.",
        ].map((text, i) => (
          <text key={text} x={435} y={235 + i * 24} fontSize={16} fill={ink}>
            {text}
          </text>
        ))}
        {[
          "Explore this workspace to get familiar with how Linear looks and feels. Some",
          "functionality isn’t present, but it should help you get comfortable with the basics.",
        ].map((text, i) => (
          <text key={text} x={435} y={323 + i * 24} fontSize={16} fill={ink}>
            {text}
          </text>
        ))}
        <text x={435} y={406} fontSize={21} fontWeight={600} fill={ink}>
          How work is organized
        </text>
        {[
          "Workspace: the home for everyone in your organization.",
          "Teams: groups that own a stream of work.",
          "Issues: the individual units of work.",
          "Projects: collections of related work that deliver a larger outcome.",
          "Initiatives: high-level strategic efforts that group related projects.",
          "Cycles: time-boxed planning periods that help teams focus.",
        ].map((text, i) => (
          <text key={text} x={441} y={448 + i * 40} fontSize={16} fill={ink}>
            • {text}
          </text>
        ))}
        <text x={435} y={735} fontSize={21} fontWeight={600} fill={ink}>
          Top keyboard shortcuts
        </text>
        {[
          "Open the command menu: Cmd/Ctrl + K",
          "Navigate issues in a list or board: J / K or ↑ / ↓",
          "Select an issue: X",
        ].map((text, i) => (
          <text key={text} x={441} y={776 + i * 29} fontSize={16} fill={ink}>
            • {text}
          </text>
        ))}
      </g>
    </g>
  );
}
