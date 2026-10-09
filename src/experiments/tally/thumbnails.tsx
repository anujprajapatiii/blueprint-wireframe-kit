import type { ReactNode } from "react";

export type TallyPreviewKind =
  | "tally-referral-reward"
  | "tally-plan-comparison"
  | "tally-custom-domain-gate"
  | "tally-office-hours"
  | "tally-review-request";

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
  size = 12,
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
        height={25}
        rx={4}
        fill={primary ? "var(--primary)" : raised}
        stroke={primary ? "var(--primary)" : outline}
      />
      <text
        x={x + width / 2}
        y={y + 16}
        textAnchor="middle"
        fontSize={10}
        fontWeight={500}
        fill={primary ? "var(--primary-foreground)" : ink}
      >
        {children}
      </text>
    </g>
  );
}
function Globe({ x, y, size = 30 }: { x: number; y: number; size?: number }) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      fill="none"
      stroke={muted}
      strokeWidth={2}
    >
      <circle r={size / 2} />
      <ellipse rx={size / 5} ry={size / 2} />
      <path d={`M${-size / 2} 0h${size}`} />
    </g>
  );
}
function Shell({
  selected = "Home",
  children,
}: {
  selected?: string;
  children: ReactNode;
}) {
  const navigation = [
    "Home",
    "Search",
    "Members",
    "Domains",
    "Settings",
    "Upgrade plan",
    "Workspaces",
    "Product",
    "Templates",
    "What's new",
    "Roadmap",
    "Feature requests",
    "Rewards",
    "Trash",
    "Help",
    "Get started",
    "How-to guides",
    "Help center",
    "Contact support",
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
      <path d="M208 24V536M208 55H928" stroke={border} />
      <circle cx={49} cy={40} r={6} fill={raised} stroke={outline} />
      <Text x={62} y={44} size={11} strong>
        Account⌄
      </Text>
      <Text x={222} y={45} size={11}>
        {selected === "Domains" || selected === "What's new"
          ? "✳ / Domains"
          : "✳"}
      </Text>
      <Text x={750} y={44} size={10} dim>
        {selected === "Home" || selected === "Rewards" ? "New workspace" : ""}
      </Text>
      <Button x={837} y={29} width={78}>
        {selected === "Domains" || selected === "What's new"
          ? "+ Add domain"
          : "+ New form"}
      </Button>
      {navigation.map((label, index) => (
        <g key={label}>
          {label === selected && (
            <rect
              x={39}
              y={60 + index * 21}
              width={161}
              height={20}
              rx={3}
              fill={raised}
            />
          )}
          {!["Workspaces", "Product", "Help"].includes(label) && (
            <rect
              x={44}
              y={66 + index * 21}
              width={7}
              height={7}
              rx={2}
              fill="none"
              stroke={outline}
            />
          )}
          <Text
            x={["Workspaces", "Product", "Help"].includes(label) ? 44 : 59}
            y={74 + index * 21}
            size={10}
            dim={["Workspaces", "Product", "Help"].includes(label)}
            strong={label === selected}
          >
            {label}
          </Text>
        </g>
      ))}
      <Text x={44} y={519} size={10} dim>
        Give Feedback
      </Text>
      {children}
    </g>
  );
}
function DomainContent({ growth = false }: { growth?: boolean }) {
  return (
    <g className={growth ? "growth-scope" : undefined}>
      {growth && (
        <rect x={365} y={227} width={405} height={170} rx={7} fill={surface} />
      )}
      <Globe x={568} y={260} size={34} />
      <Text x={552} y={306} size={14} strong center>
        No custom domains yet
      </Text>
      <rect x={639} y={294} width={29} height={17} rx={7} fill={raised} />
      <Text x={654} y={306} size={9} center>
        Pro
      </Text>
      <Text x={568} y={329} size={11} dim center>
        Personalize the form links with your own domain.
      </Text>
      <Text x={568} y={348} size={10} dim center>
        Learn about custom domains.
      </Text>
      <Button x={522} y={360} width={92} primary>
        + Add domain
      </Button>
    </g>
  );
}
function ReferralPreview() {
  return (
    <Shell selected="Rewards">
      <Text x={568} y={292} strong center>
        No forms yet
      </Text>
      <Text x={568} y={315} size={11} dim center>
        Roll up your sleeves and let’s get started.
      </Text>
      <rect
        x={32}
        y={24}
        width={896}
        height={512}
        rx={6}
        fill="var(--overlay)"
        opacity={0.55}
      />
      <g className="growth-scope">
        <rect
          x={325}
          y={159}
          width={310}
          height={281}
          rx={14}
          fill={surface}
          stroke={outline}
        />
        <Text x={344} y={187} size={10} strong>
          Invite
        </Text>
        <Text x={383} y={187} size={10} dim>
          Rewards
        </Text>
        <Text x={585} y={187} size={11} dim>
          ⓘ
        </Text>
        <Text x={613} y={187} size={14} dim>
          ×
        </Text>
        <path d="M344 198H616" stroke={border} />
        <g>
          <Text x={344} y={228} size={13} strong>
            Give 50% off. Get up to $150.
          </Text>
          <Text x={344} y={250} size={10}>
            Invite your friends to Tally and give them 50% off
          </Text>
          <Text x={344} y={265} size={10}>
            for 3 months on any plan. Earn 20% of their
          </Text>
          <Text x={344} y={280} size={10}>
            subscription cost, up to $150 per referral.
          </Text>
          <rect
            x={344}
            y={294}
            width={272}
            height={40}
            rx={5}
            fill={raised}
            stroke={border}
          />
          <Text x={355} y={309} size={9} dim>
            Invite link
          </Text>
          <Text x={355} y={325} size={11}>
            example.com/invite
          </Text>
          <Button x={344} y={344} width={272} primary>
            Copy invite link
          </Button>
        </g>
        {["X", "✉", "in", "▦"].map((label, i) => (
          <g key={label}>
            <circle
              cx={438 + i * 28}
              cy={390}
              r={10}
              fill={raised}
              stroke={border}
            />
            <Text x={438 + i * 28} y={394} size={10} center>
              {label}
            </Text>
          </g>
        ))}
        <Text x={480} y={423} size={8} dim center>
          Share with cello
        </Text>
      </g>
    </Shell>
  );
}
function PlansPreview() {
  const proBenefits = [
    "Remove Tally branding",
    "Custom domains",
    "Collaboration",
    "Partial submissions",
    "Advanced customization",
    "Custom CSS",
    "Email notifications",
    "Custom email domains",
    "Customize link preview",
    "Workspaces & folders",
  ];
  const businessBenefits = [
    "Everything in Pro",
    "Control data retention",
    "Verify emails",
    "Version history",
    "More to come",
  ];
  return (
    <g className="growth-scope">
      <rect
        x={32}
        y={24}
        width={896}
        height={512}
        rx={6}
        fill={surface}
        stroke={outline}
      />
      <Text x={46} y={46} size={11} dim>
        ← Back
      </Text>
      <Text x={908} y={46} size={14} dim>
        ×
      </Text>
      <Text x={135} y={100} size={23} strong>
        Do more with Tally
      </Text>
      <Text x={135} y={123} size={13}>
        Upgrade to access advanced features
      </Text>
      <Text x={135} y={142} size={13}>
        designed for growing teams and creators.
      </Text>
      <rect
        x={651}
        y={67}
        width={164}
        height={75}
        rx={6}
        fill={inset}
        stroke={border}
      />
      <path
        d="m689 114 25-27 27 27 25-36 21 36"
        fill="none"
        stroke={outline}
        strokeWidth={2}
      />
      <g>
        <rect x={129} y={160} width={282} height={28} rx={5} fill={surface} />
        <Text x={140} y={179} size={11} strong>
          Pay monthly
        </Text>
        <rect
          x={221}
          y={168}
          width={26}
          height={14}
          rx={7}
          fill={raised}
          stroke={outline}
        />
        <circle cx={228} cy={175} r={5} fill={ink} />
        <Text x={260} y={179} size={11} dim>
          Pay yearly
        </Text>
        <rect x={330} y={165} width={73} height={19} rx={9} fill={raised} />
        <Text x={366} y={178} size={10} center>
          2 months off
        </Text>
        <rect
          x={135}
          y={199}
          width={400}
          height={316}
          rx={7}
          fill={surface}
          stroke={outline}
        />
        <Text x={154} y={232} size={14} strong>
          Pro
        </Text>
        <Text x={481} y={233} size={25} strong>
          $29
        </Text>
        <Text x={480} y={251} size={10} dim>
          per month
        </Text>
        <Button x={154} y={270} width={362} primary>
          Upgrade to Pro
        </Button>
        <Text x={335} y={313} size={10} dim center>
          Pay $29 Every Month
        </Text>
        {proBenefits.map((label, i) => (
          <g key={label}>
            <rect
              x={154 + (i % 2) * 185}
              y={329 + Math.floor(i / 2) * 35}
              width={8}
              height={8}
              rx={2}
              fill={raised}
              stroke={outline}
            />
            <Text
              x={154 + (i % 2) * 185}
              y={349 + Math.floor(i / 2) * 35}
              size={10}
              strong
            >
              {label}
            </Text>
          </g>
        ))}
        <rect
          x={556}
          y={199}
          width={268}
          height={316}
          rx={7}
          fill={surface}
          stroke={outline}
        />
        <Text x={575} y={232} size={14} strong>
          Business
        </Text>
        <Text x={769} y={233} size={25} strong>
          $89
        </Text>
        <Text x={769} y={251} size={10} dim>
          per month
        </Text>
        <Button x={575} y={270} width={230} primary>
          Upgrade to Business
        </Button>
        <Text x={690} y={313} size={10} dim center>
          Pay $89 Every Month
        </Text>
        {businessBenefits.map((label, i) => (
          <g key={label}>
            <rect
              x={575}
              y={329 + i * 35}
              width={8}
              height={8}
              rx={2}
              fill={raised}
              stroke={outline}
            />
            <Text x={575} y={349 + i * 35} size={10} strong>
              {label}
            </Text>
          </g>
        ))}
      </g>
    </g>
  );
}
function CommunityPreview({ reviewFocus }: { reviewFocus: boolean }) {
  return (
    <Shell selected="What's new">
      <DomainContent />
      <rect
        x={500}
        y={54}
        width={423}
        height={475}
        rx={13}
        fill={surface}
        stroke={outline}
      />
      <Text x={516} y={78} size={12} strong>
        What's new
      </Text>
      <Text x={902} y={78} size={13} dim>
        ×
      </Text>
      <path d="M500 93H923" stroke={border} />
      <g className="growth-scope">
        <rect
          x={515}
          y={102}
          width={393}
          height={151}
          rx={5}
          fill={raised}
          stroke={border}
        />
        <g>
          <rect x={523} y={108} width={377} height={61} rx={4} fill={raised} />
          <Text x={530} y={123} size={10}>
            Tally is a bootstrapped company and grows through the support
          </Text>
          <Text x={530} y={138} size={10}>
            of amazing customers like you. If you love using Tally, the best
          </Text>
          <Text x={530} y={153} size={10}>
            way to support us is by leaving a quick review ♡
          </Text>
          {reviewFocus && <path d="M641 156H803" stroke={ink} />}
        </g>
        <g>
          <rect x={523} y={170} width={377} height={76} rx={4} fill={raised} />
          <Text x={530} y={185} size={10}>
            We also host monthly office hours — a free, open session
          </Text>
          <Text x={530} y={200} size={10}>
            where you can ask Marie and Filip anything directly. Come say
          </Text>
          <Text x={530} y={215} size={10}>
            hi, share feedback, or get help with your forms.
          </Text>
          <Text x={530} y={235} size={10} strong>
            Join our next office hours →
          </Text>
        </g>
      </g>
      <Text x={515} y={286} size={16} dim>
        September 11, 2026 —
      </Text>
      <Text x={515} y={309} size={18} strong>
        Faster search and a dashboard redesign
      </Text>
      <rect
        x={515}
        y={327}
        width={393}
        height={131}
        rx={3}
        fill={inset}
        stroke={border}
      />
      <rect
        x={532}
        y={340}
        width={359}
        height={106}
        rx={4}
        fill={surface}
        stroke={outline}
      />
      <path d="M585 340V446M532 355H891" stroke={border} />
      <rect
        x={644}
        y={362}
        width={176}
        height={71}
        rx={5}
        fill={raised}
        stroke={outline}
      />
      <Text x={655} y={380} size={9} dim>
        Search forms and help
      </Text>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M655 ${393 + i * 12}H807`} stroke={border} />
      ))}
      <Text x={515} y={482} size={15} strong>
        Faster search
      </Text>
      <Text x={515} y={503} size={10} dim>
        Find forms, workspaces, folders and help with a partial name.
      </Text>
    </Shell>
  );
}

/** Static source-context summaries for the shared 960 × 560 index preview. */
export function TallyThumbnail({ kind }: { kind: TallyPreviewKind }) {
  switch (kind) {
    case "tally-referral-reward":
      return <ReferralPreview />;
    case "tally-plan-comparison":
      return <PlansPreview />;
    case "tally-custom-domain-gate":
      return (
        <Shell selected="Domains">
          <DomainContent growth />
        </Shell>
      );
    case "tally-office-hours":
      return <CommunityPreview reviewFocus={false} />;
    case "tally-review-request":
      return <CommunityPreview reviewFocus />;
  }
}
