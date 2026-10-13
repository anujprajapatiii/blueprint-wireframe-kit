import type { ReactNode } from "react";

export type GammaPreviewKind =
  | "gamma-feature-tour"
  | "gamma-credit-upsell"
  | "gamma-referral-credits"
  | "gamma-plan-comparison";

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
  size = 20,
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
        height={40}
        rx={20}
        fill={primary ? "var(--primary)" : raised}
        stroke={outline}
      />
      <text
        x={x + width / 2}
        y={y + 26}
        textAnchor="middle"
        fontSize={17}
        fontWeight={500}
        fill={primary ? "var(--primary-foreground)" : ink}
      >
        {children}
      </text>
    </g>
  );
}

function Shell({
  children,
  dim = false,
}: {
  children: ReactNode;
  dim?: boolean;
}) {
  return (
    <g transform="translate(70.4 24) scale(.568888889)">
      <rect width={1440} height={900} rx={10} fill={surface} stroke={outline} />
      <path d="M72 0V900M392 0V900" stroke={border} />
      <rect
        x={21}
        y={23}
        width={30}
        height={30}
        rx={7}
        fill={raised}
        stroke={outline}
      />
      {["Home", "Media", "Templates", "Customize", "Settings", "More"].map(
        (label, index) => (
          <g key={label}>
            {index === 0 && (
              <rect x={14} y={72} width={44} height={44} rx={7} fill={raised} />
            )}
            <rect
              x={28}
              y={84 + index * 70}
              width={16}
              height={16}
              rx={4}
              fill="none"
              stroke={outline}
            />
            <Text x={36} y={126 + index * 70} size={13} center dim>
              {label}
            </Text>
          </g>
        ),
      )}
      <circle cx={36} cy={860} r={17} fill={raised} stroke={outline} />
      <circle cx={108} cy={35} r={16} fill={raised} stroke={outline} />
      <Text x={132} y={34} size={18}>
        Workspace
      </Text>
      <Text x={132} y={54} size={15} dim>
        Free
      </Text>
      <rect x={84} y={69} width={295} height={38} rx={6} fill={raised} />
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
            y={82 + index * 40}
            width={12}
            height={12}
            rx={3}
            fill="none"
            stroke={outline}
          />
          <Text x={128} y={94 + index * 40} size={18}>
            {label}
          </Text>
        </g>
      ))}
      <path d="M84 405H379" stroke={border} />
      <Text x={92} y={436} size={15} dim>
        FOLDERS
      </Text>
      <rect
        x={84}
        y={456}
        width={295}
        height={218}
        rx={8}
        fill={inset}
        stroke={border}
        strokeDasharray="4 4"
      />
      <rect
        x={98}
        y={470}
        width={266}
        height={40}
        rx={5}
        fill={raised}
        stroke={border}
      />
      <Text x={112} y={496} size={17}>
        Manage access →
      </Text>
      <path
        d="M110 537H303M110 567H250"
        stroke={border}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <Text x={106} y={607} size={17} dim>
        Group related gammas and share
      </Text>
      <Text x={106} y={631} size={17} dim>
        them all at once.
      </Text>
      <Text x={106} y={656} size={17}>
        Create a folder
      </Text>
      <Text x={104} y={725} size={18} dim>
        Trash
      </Text>
      <Button x={418} y={24} width={214}>
        Upgrade for more AI
      </Button>
      <Text x={959} y={50} size={18}>
        Use classic generator
      </Text>
      <Button x={1147} y={24} width={173}>
        + New from blank
      </Button>
      <Button x={1330} y={24} width={85}>
        400
      </Button>
      <rect
        x={853}
        y={163}
        width={126}
        height={93}
        rx={8}
        fill={inset}
        stroke={border}
      />
      <path
        d="m870 234 31-43 25 21 30-31"
        fill="none"
        stroke={outline}
        strokeWidth={3}
      />
      <Text x={918} y={319} size={36} strong center>
        No magic words required
      </Text>
      <rect
        x={550}
        y={348}
        width={734}
        height={134}
        rx={18}
        fill={inset}
        stroke={outline}
      />
      <Text x={572} y={389} size={19} dim>
        Describe what you want to create…
      </Text>
      <circle cx={587} cy={447} r={20} fill={raised} stroke={outline} />
      <Text x={587} y={453} size={23} center>
        +
      </Text>
      <Text x={1120} y={454} size={18} dim>
        Lite⌄
      </Text>
      <circle cx={1247} cy={447} r={20} fill={raised} stroke={outline} />
      <Text x={1247} y={453} size={21} center>
        ↑
      </Text>
      {[
        "Presentation",
        "Document",
        "Carousel",
        "Image",
        "Beautify",
        "Import",
      ].map((label, index) => (
        <Button key={label} x={500 + index * 137} y={506} width={127}>
          {label}
        </Button>
      ))}
      <Text x={918} y={597} size={17} center dim>
        Suggested templates
      </Text>
      {Array.from({ length: 6 }, (_, index) => (
        <g key={index}>
          <rect
            x={420 + index * 168}
            y={618}
            width={153}
            height={84}
            rx={8}
            fill={inset}
            stroke={border}
          />
          <path
            d={`M${432 + index * 168} 638h68m-68 16h110m-110 16h89`}
            stroke={border}
            strokeWidth={5}
          />
          <Text x={420 + index * 168} y={725} size={14} dim>
            Template {index + 1}
          </Text>
        </g>
      ))}
      <Button x={845} y={744} width={144}>
        View all templates
      </Button>
      {dim && (
        <rect
          width={1440}
          height={900}
          rx={10}
          fill="var(--overlay)"
          opacity={0.55}
        />
      )}
      {children}
    </g>
  );
}

function FeatureTour() {
  return (
    <Shell dim>
      <g className="growth-scope">
        <rect
          x={200}
          y={120}
          width={1040}
          height={660}
          rx={18}
          fill={surface}
          stroke={outline}
        />
        <rect
          x={695}
          y={254}
          width={50}
          height={28}
          rx={6}
          fill={raised}
          stroke={border}
        />
        <Text x={720} y={273} size={15} strong center>
          NEW
        </Text>
        <Text x={720} y={377} size={76} strong center>
          GAMMA 5
        </Text>
        <Text x={720} y={449} size={32} strong center>
          Our biggest update ever
        </Text>
        <Text x={720} y={493} size={21} center>
          We rebuilt how Gamma thinks, designs, and edits.
        </Text>
        <Text x={720} y={521} size={21} center>
          Your best ideas deserve better.
        </Text>
        <Button x={613} y={555} width={214} primary>
          See what’s new
        </Button>
        <Text x={720} y={751} size={17} center dim>
          You can still use Gamma Classic.
        </Text>
      </g>
    </Shell>
  );
}

function CreditUpsell() {
  return (
    <Shell>
      <g className="growth-scope">
        <rect
          x={1136}
          y={72}
          width={279}
          height={252}
          rx={12}
          fill={surface}
          stroke={outline}
        />
        <Text x={1153} y={97} size={17} strong>
          Free plan
        </Text>
        <path d="M1153 111H1399" stroke={border} />
        <Text x={1153} y={141} size={20} strong>
          400
        </Text>
        <Text x={1301} y={141} size={15} dim>
          Credit balance
        </Text>
        <Text x={1153} y={171} size={15}>
          Credits let you create and edit with AI.
        </Text>
        <Text x={1153} y={191} size={15}>
          Upgrade for more credits that refresh
        </Text>
        <Text x={1153} y={210} size={15}>
          monthly.
        </Text>
        <Button x={1153} y={221} width={246} primary>
          Upgrade
        </Button>
        <path d="M1136 277H1415" stroke={border} />
        <Text x={1276} y={307} size={16} center>
          Refer a friend · Invite teammate
        </Text>
      </g>
    </Shell>
  );
}

function ReferralCredits() {
  return (
    <Shell dim>
      <g className="growth-scope">
        <rect
          x={496}
          y={324}
          width={448}
          height={252}
          rx={14}
          fill={surface}
          stroke={outline}
        />
        <Text x={520} y={363} size={23} strong>
          Refer a friend
        </Text>
        <Text x={916} y={355} size={24} center>
          ×
        </Text>
        <Text x={520} y={410} size={17}>
          Give 200 credits and earn 200 credits for each new
        </Text>
        <Text x={520} y={432} size={17}>
          referral who signs up for Gamma.
        </Text>
        <rect
          x={520}
          y={448}
          width={400}
          height={48}
          rx={6}
          fill={inset}
          stroke={outline}
        />
        <Text x={536} y={478} size={18}>
          example.com/invite
        </Text>
        <Button x={807} y={452} width={107}>
          Copy link
        </Button>
        <Button x={846} y={520} width={74} primary>
          Done
        </Button>
      </g>
    </Shell>
  );
}

function Plans() {
  const plans = [
    {
      name: "Plus",
      price: "₹400",
      total: "₹4,800",
      benefits: [
        "1,000 monthly credits",
        "100 slides per prompt",
        "Remove Gamma branding",
        "Advanced AI image models",
      ],
    },
    {
      name: "Pro",
      price: "₹950",
      total: "₹11,400",
      benefits: [
        "4,000 monthly credits",
        "Premium AI image models",
        "Custom branding",
        "Analytics & sharing",
        "10 custom domains",
        "API access",
      ],
    },
    {
      name: "Ultra",
      price: "₹7,833.25",
      total: "₹93,999",
      benefits: [
        "20,000 monthly credits",
        "Advanced AI models",
        "100 custom domains",
        "Early access to features",
      ],
    },
  ];
  return (
    <Shell dim>
      <g className="growth-scope">
        <rect
          x={144}
          y={16}
          width={1152}
          height={884}
          rx={14}
          fill={surface}
          stroke={outline}
        />
        <Text x={1268} y={48} size={24} center>
          ×
        </Text>
        <Text x={720} y={77} size={35} strong center>
          Choose the plan that’s right for you
        </Text>
        <rect
          x={541}
          y={108}
          width={180}
          height={46}
          rx={8}
          fill={raised}
          stroke={outline}
        />
        <Text x={631} y={139} size={22} strong center>
          Individual
        </Text>
        <Text x={812} y={139} size={22} center dim>
          Business
        </Text>
        <Text x={720} y={193} size={18} center>
          Save up to 26% with annual billing
        </Text>
        <rect
          x={600}
          y={211}
          width={240}
          height={44}
          rx={22}
          fill={inset}
          stroke={outline}
        />
        <rect x={722} y={215} width={112} height={36} rx={18} fill={raised} />
        <Text x={662} y={239} size={17} center dim>
          Pay monthly
        </Text>
        <Text x={778} y={239} size={17} strong center>
          Pay annually
        </Text>
        {plans.map((plan, index) => (
          <g key={plan.name}>
            <rect
              x={224 + index * 336}
              y={279}
              width={320}
              height={504}
              rx={10}
              fill={surface}
              stroke={outline}
              strokeWidth={index === 1 ? 3 : 1}
            />
            {index === 1 && (
              <g>
                <rect
                  x={774}
                  y={297}
                  width={88}
                  height={24}
                  rx={5}
                  fill={raised}
                  stroke={border}
                />
                <Text x={818} y={314} size={14} strong center>
                  Most popular
                </Text>
              </g>
            )}
            <Text x={241 + index * 336} y={356} size={38} strong>
              {plan.name}
            </Text>
            <Text x={241 + index * 336} y={385} size={15} dim>
              {
                [
                  "Extra AI power and no Gamma branding",
                  "Premium models and customization",
                  "More AI usage and advanced models",
                ][index]
              }
            </Text>
            <Text x={241 + index * 336} y={455} size={46} strong>
              {plan.price}
            </Text>
            <Text x={241 + index * 336} y={482} size={17} dim>
              / seat / month
            </Text>
            <Text x={241 + index * 336} y={508} size={15} dim>
              {plan.total} per seat, billed annually
            </Text>
            <path d={`M${224 + index * 336} 533h320`} stroke={border} />
            <Button
              x={241 + index * 336}
              y={560}
              width={286}
              primary={index === 1}
            >
              Upgrade to {plan.name}
            </Button>
            <Text x={241 + index * 336} y={631} size={15} dim>
              Everything in{" "}
              {index === 0 ? "Free" : index === 1 ? "Plus" : "Pro"}, and:
            </Text>
            {plan.benefits.map((benefit, row) => (
              <Text
                key={benefit}
                x={241 + index * 336}
                y={654 + row * 22}
                size={16}
              >
                ✓ {benefit}
              </Text>
            ))}
          </g>
        ))}
        <Text x={720} y={840} size={15} center dim>
          Prices are subject to tax depending on your location.
        </Text>
      </g>
    </Shell>
  );
}

/** Full 1440 × 900 composition scaled into the shared 960 × 560 preview. */
export function GammaPreview({ kind }: { kind: GammaPreviewKind }) {
  switch (kind) {
    case "gamma-feature-tour":
      return <FeatureTour />;
    case "gamma-credit-upsell":
      return <CreditUpsell />;
    case "gamma-referral-credits":
      return <ReferralCredits />;
    case "gamma-plan-comparison":
      return <Plans />;
  }
}
