import type { ReactNode } from "react";

export type CloudflarePreviewKind =
  | "cf-agent-onboarding"
  | "cf-workers-plans"
  | "cf-containers-gate"
  | "cf-event-promotion";

const surface = "var(--card)";
const inset = "var(--surface-sunken)";
const raised = "var(--surface-raised)";
const border = "var(--border)";
const outline = "var(--input)";
const ink = "var(--foreground)";
const muted = "var(--muted-foreground)";

function Text({
  x,
  y,
  children,
  size = 13,
  strong = false,
  dim = false,
  center = false,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  strong?: boolean;
  dim?: boolean;
  center?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={strong ? 600 : 400}
      fill={dim ? muted : ink}
      textAnchor={center ? "middle" : "start"}
    >
      {children}
    </text>
  );
}

function Button({
  x,
  y,
  width,
  children,
  primary = false,
}: {
  x: number;
  y: number;
  width: number;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={28}
        rx={4}
        fill={primary ? "var(--primary)" : raised}
        stroke={outline}
      />
      <text
        x={x + width / 2}
        y={y + 18}
        fill={primary ? "var(--primary-foreground)" : ink}
        fontSize={12}
        textAnchor="middle"
      >
        {children}
      </text>
    </g>
  );
}

function Shell({
  selected,
  children,
}: {
  selected: "Account home" | "Workers plans" | "Containers";
  children: ReactNode;
}) {
  const navigation =
    selected === "Account home"
      ? [
          "Account home",
          "Recents",
          "Domains",
          "Observability",
          "Build",
          "Compute",
          "AI",
          "Storage & databases",
          "Images & Stream",
          "Realtime",
          "Protect & connect",
          "Application security",
          "Zero Trust",
          "Networking",
        ]
      : [
          "Account home",
          "Recents",
          "Domains",
          "Observability",
          "Build",
          "Compute",
          "Workers & Pages",
          "Observability",
          "Workers for Platforms",
          "Containers",
          "Durable Objects",
          "Queues",
          "Workflows",
          "Workers plans",
        ];
  return (
    <g>
      <rect
        x={32}
        y={24}
        width={896}
        height={512}
        rx={6}
        fill={surface}
        stroke={outline}
      />
      <path d="M216 24V536M32 65H928" stroke={border} />
      <Text x={48} y={49} strong>
        Cloudflare
      </Text>
      <Text x={781} y={49} size={11} dim>
        Ask AI
      </Text>
      <Text x={848} y={49} size={11} dim>
        Support
      </Text>
      <rect
        x={44}
        y={75}
        width={160}
        height={25}
        rx={4}
        fill={inset}
        stroke={border}
      />
      <Text x={55} y={92} size={11} dim>
        Quick search…
      </Text>
      {navigation.map((name, i) => (
        <g key={`${name}-${i}`}>
          {name === selected && (
            <rect
              x={42}
              y={110 + i * 28}
              width={163}
              height={25}
              rx={4}
              fill={raised}
            />
          )}
          <Text
            x={i > 5 && selected !== "Account home" ? 64 : 52}
            y={127 + i * 28}
            size={11}
            strong={name === selected}
            dim={name === "Build" || name === "Protect & connect"}
          >
            {name}
          </Text>
        </g>
      ))}
      {children}
    </g>
  );
}

function HomePreview({ eventFocus = false }: { eventFocus?: boolean }) {
  return (
    <Shell selected="Account home">
      <g className={eventFocus ? undefined : "growth-scope"}>
        <rect
          x={452}
          y={96}
          width={238}
          height={26}
          rx={13}
          fill={surface}
          stroke={outline}
        />
        <Text x={571} y={113} size={12} center>
          Onboard your agent to Cloudflare
        </Text>
      </g>
      <Text x={572} y={161} size={25} strong center>
        {eventFocus ? "What's on the agenda?" : "Let's get to work."}
      </Text>
      <rect
        x={240}
        y={191}
        width={664}
        height={37}
        rx={7}
        fill={raised}
        stroke={outline}
      />
      <Text x={255} y={215} size={13} dim>
        Search
      </Text>
      {["Domains", "Workers", "Recents"].map((heading, column) => (
        <g key={heading}>
          <Text x={240 + column * 227} y={258} size={12} dim>
            {heading}
          </Text>
          {[0, 1, ...(column === 2 ? [2, 3] : [])].map((row) => (
            <g key={row}>
              <Text x={245 + column * 227} y={291 + row * 32} size={12}>
                {column === 0
                  ? `Example domain ${row + 1}`
                  : column === 1
                    ? `Example worker ${row + 1}`
                    : [
                        "Workers & Pages",
                        "Workers plans",
                        "Containers",
                        "Domains",
                      ][row]}
              </Text>
              <path
                d={`M${240 + column * 227} ${302 + row * 32}h208`}
                stroke={border}
              />
            </g>
          ))}
        </g>
      ))}
      <g className={eventFocus ? "growth-scope" : undefined}>
        <rect
          x={240}
          y={eventFocus ? 415 : 421}
          width={664}
          height={eventFocus ? 68 : 62}
          rx={6}
          fill={surface}
          stroke={outline}
        />
        <rect
          x={240}
          y={eventFocus ? 415 : 421}
          width={68}
          height={eventFocus ? 68 : 62}
          rx={6}
          fill={inset}
        />
        <Text x={323} y={eventFocus ? 437 : 445} size={13} strong>
          Meet the Agentic Internet Builders IRL
        </Text>
        {eventFocus ? (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <circle
                key={i}
                cx={613 + i * 9}
                cy={433}
                r={7}
                fill={raised}
                stroke={outline}
              />
            ))}
            <Text x={664} y={437} size={12}>
              ↗
            </Text>
            <Text x={323} y={455} size={10} dim>
              Connect brings the Cloudflare community together once a year to
              learn,
            </Text>
            <Text x={323} y={471} size={10} dim>
              collaborate, and shape what comes next. Oct 19–21, San Francisco.
            </Text>
          </>
        ) : (
          <Text x={323} y={466} size={11} dim>
            Connect with the Cloudflare community.
          </Text>
        )}
        <Button x={800} y={438} width={88}>
          Learn more
        </Button>
      </g>
      <Text x={240} y={514} strong>
        Analytics
      </Text>
      <path d="M240 529H561M583 529H904" stroke={outline} />
    </Shell>
  );
}

function PlansPreview() {
  return (
    <Shell selected="Workers plans">
      <Text x={240} y={106} size={25} strong>
        Workers plans
      </Text>
      <Text x={256} y={140} size={14} strong>
        Free
      </Text>
      <Text x={256} y={166} size={23} strong>
        $0
      </Text>
      <Text x={256} y={190} size={12} dim>
        For personal use and simple applications
      </Text>
      <Button x={256} y={205} width={632}>
        Current plan
      </Button>
      <g className="growth-scope">
        <rect
          x={240}
          y={250}
          width={664}
          height={152}
          rx={6}
          fill={surface}
          stroke={outline}
        />
        <Text x={256} y={274} size={14} strong>
          Paid
        </Text>
        <Text x={256} y={303} size={23} strong>
          $5
        </Text>
        <Text x={295} y={300} size={12} dim>
          / month + usage
        </Text>
        <Text x={256} y={327} size={12}>
          For business use and scaling applications
        </Text>
        <Text x={256} y={348} size={11} dim>
          10 million requests included monthly · Containers · Email sending
        </Text>
        <Button x={256} y={362} width={632} primary>
          Upgrade
        </Button>
      </g>
      <Text x={256} y={431} size={14} strong>
        Enterprise
      </Text>
      <Text x={256} y={458} size={23} strong>
        Let's talk
      </Text>
      <Text x={256} y={481} size={12} dim>
        For mission-critical applications at scale
      </Text>
      <Button x={256} y={495} width={632}>
        Contact us ↗
      </Button>
    </Shell>
  );
}

function ContainersPreview() {
  return (
    <Shell selected="Containers">
      <Text x={240} y={105} size={21} strong>
        Containers
      </Text>
      <Text x={358} y={105} size={11} dim>
        View docs
      </Text>
      <Text x={240} y={132} size={13} dim>
        Enhance your Workers with serverless containers.
      </Text>
      <path d="M216 153H928" stroke={border} />
      <g className="growth-scope">
        <rect
          x={240}
          y={174}
          width={664}
          height={256}
          rx={7}
          fill={surface}
          stroke={outline}
        />
        <path
          d="m557 224 15-4 15 4v22l-15 4-15-4zm15-4v30m-15-26 15 4 15-4"
          fill="none"
          stroke={ink}
          strokeWidth={2}
        />
        <Text x={572} y={287} size={21} strong center>
          Enable Containers
        </Text>
        <Text x={572} y={320} size={13} center>
          Containers is included in the Workers Paid plan. To start using
          Containers,
        </Text>
        <Text x={572} y={340} size={13} center>
          upgrade your Workers plan.
        </Text>
        <Button x={438} y={369} width={169} primary>
          Purchase Workers Paid
        </Button>
        <Button x={615} y={369} width={94}>
          View pricing
        </Button>
      </g>
      <path d="M216 501H928" stroke={border} />
      <Text x={572} y={522} size={10} dim center>
        Support　 System Status　 Terms of Use　 Privacy Policy
      </Text>
    </Shell>
  );
}

/** Static SVG children for the shared 960 × 560 thumbnail; never mounts live flows. */
export function CloudflareThumbnail({ kind }: { kind: CloudflarePreviewKind }) {
  switch (kind) {
    case "cf-agent-onboarding":
      return <HomePreview />;
    case "cf-event-promotion":
      return <HomePreview eventFocus />;
    case "cf-workers-plans":
      return <PlansPreview />;
    case "cf-containers-gate":
      return <ContainersPreview />;
  }
}
