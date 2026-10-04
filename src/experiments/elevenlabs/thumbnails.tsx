import type { ReactNode } from "react";

export type ElevenPreviewKind =
  | "goal-composer"
  | "model-promotion"
  | "settings-promotion"
  | "model-choice"
  | "balance-upgrade"
  | "plan-ladder"
  | "annual-pricing"
  | "annual-offer"
  | "upgrade-review"
  | "seat-invitation"
  | "voice-pathways"
  | "voice-gate"
  | "voice-prompts"
  | "clone-setup"
  | "voice-library"
  | "studio-template"
  | "studio-assistant"
  | "project-sharing"
  | "flows-intro"
  | "music-discovery"
  | "sound-library"
  | "visual-examples"
  | "dubbing-intro"
  | "audiobook-pathways"
  | "earnings-checklist"
  | "opportunity-table"
  | "affiliate-invitation"
  | "product-switcher"
  | "agent-templates"
  | "api-quickstart"
  | "credit-topup"
  | "automatic-topup"
  | "model-pricing";

const card = "var(--card)";
const inset = "var(--surface-sunken)";
const raised = "var(--surface-raised)";
const line = "var(--input)";
const subtle = "var(--border)";
const ink = "var(--foreground)";
const muted = "var(--muted-foreground)";

/** Keeps focal previews aligned with the live experiment’s semantic color scope. */
export function GrowthPreview({ children }: { children: ReactNode }) {
  return <g className="growth-scope">{children}</g>;
}

function Panel({
  x = 64,
  y = 46,
  width = 832,
  height = 468,
  children,
  fill = card,
  growth = false,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  children?: ReactNode;
  fill?: string;
  growth?: boolean;
}) {
  return (
    <g className={growth ? "growth-scope" : undefined}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="8"
        fill={fill}
        stroke={line}
      />
      {children}
    </g>
  );
}
function Text({
  x,
  y,
  children,
  size = 18,
  strong = false,
  dim = false,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  strong?: boolean;
  dim?: boolean;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fill={dim ? muted : ink}
      fontSize={size}
      fontWeight={strong ? 600 : 400}
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}
function Action({
  x,
  y,
  width,
  children,
  primary = false,
  growth = false,
}: {
  x: number;
  y: number;
  width: number;
  children: ReactNode;
  primary?: boolean;
  growth?: boolean;
}) {
  return (
    <g className={growth ? "growth-scope" : undefined}>
      <rect
        x={x}
        y={y}
        width={width}
        height="38"
        rx="5"
        fill={primary ? "var(--primary)" : raised}
        stroke={primary ? "var(--primary)" : line}
      />
      <text
        x={x + width / 2}
        y={y + 25}
        fill={primary ? "var(--primary-foreground)" : ink}
        fontSize="16"
        fontWeight="500"
        textAnchor="middle"
      >
        {children}
      </text>
    </g>
  );
}
function Rule({
  x,
  y,
  width = 190,
  lines = 1,
}: {
  x: number;
  y: number;
  width?: number;
  lines?: number;
}) {
  return (
    <g stroke={subtle} strokeWidth="5" strokeLinecap="round">
      {Array.from({ length: lines }, (_, i) => (
        <path
          key={i}
          d={`M${x} ${y + i * 19}h${width * (i === lines - 1 && lines > 1 ? 0.72 : 1)}`}
        />
      ))}
    </g>
  );
}
function Media({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="5"
        fill={inset}
        stroke={subtle}
      />
      <path
        d={`m${x + width / 2 - 9} ${y + height / 2 - 14} 23 14-23 14Z`}
        fill="none"
        stroke={muted}
        strokeWidth="2"
      />
    </g>
  );
}
function Wave({ x, y, width = 120 }: { x: number; y: number; width?: number }) {
  return (
    <g stroke={muted} strokeWidth="3" strokeLinecap="round">
      {[7, 15, 10, 23, 30, 17, 12, 24, 17, 8, 15, 5].map((h, i) => (
        <path key={i} d={`M${x + (i * width) / 11} ${y - h / 2}v${h}`} />
      ))}
    </g>
  );
}
function Dialog({
  title,
  children,
  x = 188,
  width = 584,
  y = 60,
  height = 440,
  growth = false,
}: {
  title: string;
  children: ReactNode;
  x?: number;
  width?: number;
  y?: number;
  height?: number;
  growth?: boolean;
}) {
  return (
    <Panel x={x} y={y} width={width} height={height} growth={growth}>
      <Text x={x + 30} y={y + 47} size={25} strong>
        {title}
      </Text>
      <path
        d={`m${x + width - 38} ${y + 28} 10 10m0-10-10 10`}
        stroke={muted}
        strokeWidth="2"
      />
      {children}
    </Panel>
  );
}
function Shell({
  children,
  sidebar = true,
}: {
  children: ReactNode;
  sidebar?: boolean;
}) {
  return (
    <Panel x={35} y={28} width={890} height={504} fill="var(--background)">
      <path d="M35 73H925" stroke={subtle} />
      <Rule x={57} y={51} width={100} />
      {sidebar && (
        <g>
          <rect x="36" y="74" width="148" height="457" fill={inset} />
          <path d="M184 74V531" stroke={subtle} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Rule key={i} x={58} y={109 + i * 38} width={90 - (i % 3) * 10} />
          ))}
        </g>
      )}
      {children}
    </Panel>
  );
}

function PricingPreview({ annual = false }: { annual?: boolean }) {
  const plans = ["Starter", "Creator", "Pro"];
  return (
    <Panel>
      <Text x={96} y={94} size={27} strong>
        Choose your plan
      </Text>
      <Action x={526} y={71} width={112}>
        Monthly
      </Action>
      <Action x={646} y={71} width={217} primary={annual} growth>
        Yearly (save 2 months)
      </Action>
      {plans.map((name, i) => (
        <Panel
          key={name}
          x={96 + i * 261}
          y={144}
          width={245}
          height={337}
          fill={i === 1 ? raised : card}
          growth={i > 0}
        >
          <Text x={118 + i * 261} y={183} size={24} strong>
            {name}
          </Text>
          <Text x={118 + i * 261} y={214} size={15} dim>
            {i === 0
              ? "Current plan"
              : i === 1
                ? "Popular"
                : "Everything in Creator"}
          </Text>
          <Text x={118 + i * 261} y={265} size={30} strong>
            {annual
              ? ["₹440", "₹1,613.04", "₹7,260"][i]
              : ["₹528", "₹1,936", "₹8,712"][i]}
          </Text>
          <Text x={118 + i * 261} y={292} size={15} dim>
            {annual ? "Billed annually" : "per month"}
          </Text>
          <Rule x={118 + i * 261} y={333} width={194} lines={3} />
          <Action x={118 + i * 261} y={410} width={201} primary={i === 1}>
            {i === 0 ? "Current plan" : "Upgrade"}
          </Action>
        </Panel>
      ))}
    </Panel>
  );
}

function VoicePathways({ gated = false }: { gated?: boolean }) {
  const names = [
    "Voice Design",
    "Instant Voice Clone",
    "Professional Voice Clone",
    "Voice Remixing",
  ];
  return (
    <Dialog title="Create voice" x={130} width={700} y={44} height={476}>
      {names.map((name, i) => {
        const x = 160 + (i % 2) * 330;
        const y = 125 + Math.floor(i / 2) * 166;
        return (
          <Panel
            key={name}
            x={x}
            y={y}
            width={310}
            height={147}
            fill={i === 2 && gated ? inset : raised}
            growth={!gated || i === 2}
          >
            <Wave x={x + 22} y={y + 32} width={62} />
            <Text x={x + 22} y={y + 75} size={18} strong>
              {name}
            </Text>
            {i === 2 && gated ? (
              <>
                <Text x={x + 22} y={y + 105} size={14} dim>
                  Creator plan required
                </Text>
                <Text x={x + 282} y={y + 131} size={14} anchor="end">
                  Subscribe →
                </Text>
              </>
            ) : (
              <>
                <Rule x={x + 22} y={y + 101} width={220} />
                <Text x={x + 22} y={y + 129} size={14} dim>
                  {
                    [
                      "Less than a minute",
                      "2 minutes",
                      "5 minutes",
                      "Less than a minute",
                    ][i]
                  }
                </Text>
              </>
            )}
          </Panel>
        );
      })}
      <Text x={480} y={496} anchor="middle" size={16} dim>
        Or find a voice in the Voice Library →
      </Text>
    </Dialog>
  );
}

function Introduction({ variant }: { variant: "flows" | "dubbing" }) {
  const flows = variant === "flows";
  return (
    <Dialog
      growth
      title={flows ? "Introducing Flows" : "Introducing Dubbing v2 alpha"}
      x={108}
      width={744}
      y={66}
      height={428}
    >
      <rect x="140" y="144" width="310" height="253" rx="6" fill={inset} />
      {flows ? (
        <g>
          {[
            [173, 210],
            [303, 169],
            [303, 291],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width="111"
                height="69"
                rx="5"
                fill={raised}
                stroke={line}
              />
              <Rule x={x + 17} y={y + 26} width={70} />
              <Rule x={x + 17} y={y + 46} width={48} />
            </g>
          ))}
          <path
            d="M284 245h9v-42h10m-19 42h9v81h10"
            stroke={muted}
            fill="none"
          />
        </g>
      ) : (
        <>
          <Wave x={173} y={219} width={240} />
          <path d="M173 273h240" stroke={subtle} />
          <Wave x={173} y={326} width={240} />
        </>
      )}
      {(flows
        ? [
            ["Add & connect nodes", "Image, video, and audio"],
            ["Create on an infinite canvas", "Connect your workflow visually"],
            ["All your models in one place", "Without switching tools"],
          ]
        : [
            [
              "Preserve emotion and delivery",
              "Keep the original speaker’s intent",
            ],
            [
              "Natural phrasing in 92 languages",
              "Adapt the way words are spoken",
            ],
            ["Automatic voice cloning and sync", "From the original recording"],
          ]
      ).map(([a, b], i) => (
        <g key={a}>
          <Text x={477} y={168 + i * 88} size={17} strong>
            {a}
          </Text>
          <Text x={477} y={195 + i * 88} size={14} dim>
            {b}
          </Text>
        </g>
      ))}
      {!flows && (
        <Action x={474} y={426} width={153}>
          Play samples
        </Action>
      )}
      <Action x={flows ? 660 : 644} y={426} width={flows ? 159 : 174} primary>
        Get started
      </Action>
    </Dialog>
  );
}

export function ElevenLabsThumbnail({ kind }: { kind: ElevenPreviewKind }) {
  switch (kind) {
    case "goal-composer":
      return (
        <Shell>
          <Text x={550} y={165} size={28} strong anchor="middle">
            What would you like to create?
          </Text>
          <Panel x={244} y={195} width={608} height={139} fill={raised} growth>
            <Text x={267} y={235} size={20} dim>
              Make a podcast intro with music...
            </Text>
            <Action x={741} y={277} width={88} primary>
              Start →
            </Action>
          </Panel>
          {["Speech", "Music", "Voice Clone", "Video"].map((t, i) => (
            <Action key={t} x={243 + i * 153} y={352} width={142} growth>
              {t}
            </Action>
          ))}
          <Text x={244} y={438} strong>
            Quickstarts
          </Text>
          <Text x={372} y={438} dim>
            Recents
          </Text>
          {[0, 1, 2].map((i) => (
            <Panel
              key={i}
              x={244 + i * 207}
              y={458}
              width={194}
              height={55}
              fill={inset}
            >
              <Rule x={263 + i * 207} y={484} width={142} />
            </Panel>
          ))}
        </Shell>
      );
    case "model-promotion":
      return (
        <Shell>
          <Panel x={204} y={95} width={697} height={73} fill={raised} growth>
            <Text x={224} y={124} size={17} strong>
              Eleven v4 is here
            </Text>
            <Text x={224} y={150} size={15} dim>
              Our fastest and most emotive voice model yet.
            </Text>
            <Action x={773} y={113} width={109} primary>
              Try it out
            </Action>
          </Panel>
          <Text x={211} y={216} size={25} strong>
            Text to Speech
          </Text>
          <Panel x={211} y={244} width={436} height={250}>
            <Rule x={234} y={280} width={380} lines={4} />
            <Action x={488} y={434} width={137} primary>
              Generate
            </Action>
          </Panel>
          <Panel x={669} y={244} width={226} height={250} fill={inset} growth>
            <Text x={690} y={280} strong>
              Introducing Eleven v4
            </Text>
            <Rule x={690} y={311} width={170} lines={3} />
            <Action x={689} y={422} width={186}>
              Try v4
            </Action>
          </Panel>
        </Shell>
      );
    case "settings-promotion":
      return (
        <Shell>
          <Text x={211} y={121} size={25} strong>
            Text to Speech
          </Text>
          <Panel x={211} y={154} width={399} height={344}>
            <Rule x={234} y={192} width={345} lines={5} />
            <Action x={440} y={434} width={147} primary>
              Generate
            </Action>
          </Panel>
          <Panel x={631} y={96} width={269} height={400} fill={inset}>
            <Panel
              x={650}
              y={116}
              width={231}
              height={170}
              fill={raised}
              growth
            >
              <Text x={668} y={150} size={16} strong>
                Introducing Image & Video
              </Text>
              <Text x={668} y={177} size={14} dim>
                Generate images, videos
              </Text>
              <Text x={668} y={198} size={14} dim>
                and lipsync in a seamless flow.
              </Text>
              <Media x={668} y={218} width={194} height={50} />
            </Panel>
            <Text x={651} y={333} strong>
              Voice
            </Text>
            <Rule x={651} y={363} width={202} />
            <Text x={651} y={418} strong>
              Model
            </Text>
            <Rule x={651} y={448} width={202} />
          </Panel>
        </Shell>
      );
    case "model-choice":
      return (
        <Dialog title="Select a model" x={155} width={650} y={38} height={484}>
          {["Eleven v4", "Eleven Multilingual v2", "Eleven Flash v2.5"].map(
            (t, i) => (
              <Panel
                key={t}
                x={185}
                y={116 + i * 111}
                width={590}
                height={96}
                fill={i === 1 ? raised : card}
                growth
              >
                <circle
                  cx="210"
                  cy={145 + i * 111}
                  r="8"
                  fill={i === 1 ? ink : "none"}
                  stroke={muted}
                />
                <Text x={231} y={152 + i * 111} size={20} strong>
                  {t}
                </Text>
                <Text x={231} y={181 + i * 111} size={15} dim>
                  {
                    [
                      "Our fastest and most emotive model",
                      "Studio Quality · Recommended for your voice",
                      "Fast generation for everyday use",
                    ][i]
                  }
                </Text>
              </Panel>
            ),
          )}
          <Text x={480} y={494} anchor="middle" size={16}>
            Show all models ↓
          </Text>
        </Dialog>
      );
    case "balance-upgrade":
      return (
        <Shell>
          <Text x={219} y={124} size={24} strong>
            Subscription
          </Text>
          <Rule x={219} y={158} width={556} />
          <Panel x={306} y={195} width={252} height={297} fill={inset}>
            <Text x={330} y={233} strong>
              Creator
            </Text>
            <Rule x={330} y={285} width={192} lines={5} />
          </Panel>
          <Panel x={580} y={195} width={300} height={297} fill={inset}>
            <Text x={604} y={233} strong>
              Pro
            </Text>
            <Rule x={604} y={285} width={234} lines={5} />
          </Panel>
          <Panel x={63} y={128} width={300} height={365} fill={raised}>
            <Text x={87} y={169} size={22} strong>
              Balance
            </Text>
            <Text x={87} y={211} dim>
              Total
            </Text>
            <Text x={87} y={246} dim>
              Remaining
            </Text>
            <Rule x={267} y={205} width={68} />
            <Rule x={267} y={241} width={45} />
            <Action x={86} y={275} width={254} primary growth>
              Upgrade
            </Action>
            <path d="M64 339H362" stroke={line} />
            <Text x={87} y={372} strong>
              Starter plan
            </Text>
            <Text x={87} y={419}>
              Subscription
            </Text>
            <Rule x={87} y={459} width={160} />
          </Panel>
        </Shell>
      );
    case "plan-ladder":
      return <PricingPreview />;
    case "annual-pricing":
      return <PricingPreview annual />;
    case "annual-offer":
      return (
        <Dialog title="Pay less with annual billing" y={88} height={384}>
          <Panel x={219} y={170} width={522} height={157} fill={raised} growth>
            <Text x={246} y={211} size={22} strong>
              Subscribe to yearly plan
            </Text>
            <Text x={246} y={249} strong>
              2 months free
            </Text>
            <Text x={246} y={288} size={16} dim>
              All annual plans get 16% discount
            </Text>
            <Text x={246} y={310} size={16} dim>
              compared to monthly plans
            </Text>
          </Panel>
          <Action x={219} y={352} width={522} primary growth>
            Continue yearly
          </Action>
          <Text x={480} y={432} anchor="middle" size={18}>
            Continue monthly
          </Text>
        </Dialog>
      );
    case "upgrade-review":
      return (
        <Dialog title="Subscription upgrade" y={85} height={390}>
          <Panel x={219} y={161} width={522} height={77} fill={inset} growth>
            <Text x={243} y={205} strong>
              Starter (Monthly)
            </Text>
            <Text x={476} y={205} size={25}>
              →
            </Text>
            <Text x={522} y={205} strong>
              Creator (Monthly)
            </Text>
          </Panel>
          <Text x={219} y={283} size={21} strong>
            You will be charged ₹1,936 now.
          </Text>
          <Text x={219} y={326} size={15} dim>
            If your payment fails, you’ll temporarily lose access
          </Text>
          <Text x={219} y={349} size={15} dim>
            to subscription features until payment is successful.
          </Text>
          <Action x={478} y={407} width={126}>
            Cancel
          </Action>
          <Action x={619} y={407} width={122} primary growth>
            Confirm
          </Action>
        </Dialog>
      );
    case "seat-invitation":
      return (
        <Dialog title="Invite team members" y={52} height={458}>
          <Text x={219} y={137} size={16} dim>
            Bring your team in to collaborate and share your creations.
          </Text>
          <Panel x={219} y={162} width={522} height={105} fill={raised} growth>
            <Text x={239} y={197} size={20} strong>
              Introducing Basic Seats
            </Text>
            <Text x={239} y={229} size={16} dim>
              Invite up to 20 colleagues to collaborate.
            </Text>
            <Text x={239} y={252} size={14} dim>
              They keep their current workspace.
            </Text>
          </Panel>
          <Text x={219} y={311} size={16} strong>
            Email address
          </Text>
          <Panel x={219} y={328} width={522} height={45} fill={inset}>
            <Text x={235} y={357} size={16} dim>
              colleague@example.com
            </Text>
          </Panel>
          <Text x={219} y={405} size={14} dim>
            For additional Full Seats, upgrade to a Scale tier subscription.
          </Text>
          <Action x={617} y={445} width={124} primary growth>
            Invite
          </Action>
        </Dialog>
      );
    case "voice-pathways":
      return <VoicePathways />;
    case "voice-gate":
      return <VoicePathways gated />;
    case "voice-prompts":
      return (
        <Dialog title="Voice Design" y={56} height={448}>
          <Text x={219} y={138} strong>
            Prompt
          </Text>
          <Text x={741} y={138} size={15} dim anchor="end">
            Best practices ↗
          </Text>
          <Panel x={219} y={157} width={522} height={153} fill={inset} growth>
            <Rule x={239} y={187} width={463} lines={5} />
          </Panel>
          {["Evil Ogre", "Little Mouse", "Southern Woman"].map((s, i) => (
            <Action key={s} x={219 + i * 178} y={331} width={165} growth>
              {s}
            </Action>
          ))}
          <Text x={219} y={409} size={16}>
            Randomize
          </Text>
          <Text x={741} y={409} anchor="end" size={16}>
            Settings
          </Text>
          <Action x={480} y={441} width={261} primary growth>
            Generate voice · 171 credits
          </Action>
        </Dialog>
      );
    case "clone-setup":
      return (
        <Dialog
          title="Instant Voice Clone"
          x={104}
          width={752}
          y={57}
          height={446}
        >
          <GrowthPreview>
            <rect x="105" y="131" width="214" height="370" fill={inset} />
            <path d="M319 131V502" stroke={subtle} />
            {["Upload Audio", "Voice Information", "Finish up"].map((s, i) => (
              <g key={s}>
                <circle
                  cx="134"
                  cy={171 + i * 56}
                  r="10"
                  fill={i === 0 ? ink : "none"}
                  stroke={muted}
                />
                <Text x={154} y={177 + i * 56} size={16} strong={i === 0}>
                  {s}
                </Text>
              </g>
            ))}
          </GrowthPreview>
          <GrowthPreview>
            <rect
              x="338"
              y="147"
              width="498"
              height="123"
              rx="5"
              fill={raised}
            />
            <Text x={348} y={171} size={19} strong>
              Upload Audio
            </Text>
            <Text x={348} y={206} size={15} dim>
              Avoid noisy environments
            </Text>
            <Text x={348} y={232} size={15} dim>
              Check microphone quality
            </Text>
            <Text x={348} y={258} size={15} dim>
              Use consistent equipment
            </Text>
          </GrowthPreview>
          <rect
            x="348"
            y="281"
            width="478"
            height="99"
            rx="5"
            fill={inset}
            stroke={line}
            strokeDasharray="6 5"
          />
          <Text x={587} y={323} anchor="middle" size={17}>
            Click to upload, or drag and drop
          </Text>
          <GrowthPreview>
            <rect
              x="433"
              y="334"
              width="308"
              height="28"
              rx="3"
              fill={raised}
            />
            <Text x={587} y={353} anchor="middle" size={14} dim>
              10 seconds of audio required
            </Text>
          </GrowthPreview>
          <Action x={348} y={422} width={149}>
            Record audio
          </Action>
          <Action x={712} y={422} width={114} growth>
            Next
          </Action>
        </Dialog>
      );
    case "voice-library":
      return (
        <Shell>
          <Text x={209} y={121} size={25} strong>
            Explore
          </Text>
          <Text x={333} y={121} dim>
            My Voices
          </Text>
          <Text x={209} y={171} size={19} strong>
            Handpicked for your use case
          </Text>
          {["Great voices for v4", "TikTok voices", "Conversational"].map(
            (s, i) => (
              <Panel
                key={s}
                x={209 + i * 231}
                y={191}
                width={216}
                height={105}
                fill={inset}
                growth
              >
                <Wave x={232 + i * 231} y={226} width={67} />
                <Text x={229 + i * 231} y={271} size={16} strong>
                  {s}
                </Text>
              </Panel>
            ),
          )}
          <Text x={209} y={340} size={20} strong>
            Trending voices
          </Text>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <path d={`M209 ${356 + i * 48}H890`} stroke={subtle} />
              <circle
                cx="228"
                cy={379 + i * 48}
                r="13"
                fill={raised}
                stroke={line}
              />
              <Rule x={257} y={380 + i * 48} width={222 - i * 35} />
              <Wave x={572} y={380 + i * 48} width={136} />
              <Text x={842} y={386 + i * 48} size={16}>
                Add
              </Text>
            </g>
          ))}
        </Shell>
      );
    case "studio-template":
      return (
        <Shell sidebar={false}>
          <Text x={61} y={112} size={23} strong>
            Inspirations
          </Text>
          {["Film trailer", "Explainer video", "Product video"].map((s, i) => (
            <Panel
              key={s}
              x={61}
              y={138 + i * 116}
              width={206}
              height={112}
              growth
            >
              <Media x={61} y={138 + i * 116} width={206} height={80} />
              <Text x={71} y={239 + i * 116} size={16} strong>
                {s}
              </Text>
            </Panel>
          ))}
          <Panel x={288} y={95} width={611} height={411}>
            <Text x={312} y={129} size={23} strong>
              Film trailer (Copy)
            </Text>
            <Media x={437} y={153} width={440} height={208} />
            <Panel x={310} y={153} width={108} height={208} fill={inset}>
              <Rule x={324} y={182} width={70} lines={6} />
            </Panel>
            <path d="M310 391H877" stroke={line} />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect
                  x={311 + i * 16}
                  y={407 + i * 28}
                  width={448 - i * 76}
                  height="19"
                  rx="3"
                  fill={i === 0 ? raised : inset}
                  stroke={line}
                />
              </g>
            ))}
          </Panel>
        </Shell>
      );
    case "studio-assistant":
      return (
        <Shell sidebar={false}>
          <Media x={58} y={96} width={488} height={271} />
          <Panel x={58} y={386} width={488} height={117} fill={inset}>
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={79 + i * 12}
                y={405 + i * 27}
                width={361 - i * 52}
                height="17"
                rx="3"
                fill={raised}
                stroke={line}
              />
            ))}
          </Panel>
          <Panel x={568} y={96} width={333} height={407} growth>
            <Text x={590} y={139} size={23} strong>
              Direct the Studio Agent
            </Text>
            <Text x={590} y={174} size={15} dim>
              Describe what you want.
            </Text>
            <Text x={590} y={198} size={15} dim>
              Think through the project together.
            </Text>
            {[
              "What’s in my library?",
              "Help me plan this project",
              "Suggest a visual style",
            ].map((s, i) => (
              <Action key={s} x={590} y={239 + i * 51} width={289}>
                {s}
              </Action>
            ))}
            <Panel x={590} y={409} width={289} height={74} fill={inset}>
              <Text x={604} y={435} size={14} dim>
                Describe what you want to create...
              </Text>
              <Text x={604} y={465} size={13}>
                Auto under 300 credits
              </Text>
            </Panel>
          </Panel>
        </Shell>
      );
    case "project-sharing":
      return (
        <Dialog title="Share project" y={47} height={467}>
          <Text x={219} y={129} size={16} dim>
            Choose who in your workspace can access this project.
          </Text>
          <Panel x={219} y={151} width={522} height={43} fill={inset}>
            <Text x={236} y={178} size={16} dim>
              Search for users or groups
            </Text>
          </Panel>
          <Panel x={219} y={216} width={522} height={101} fill={raised} growth>
            <Text x={239} y={252} size={19} strong>
              Invite team members
            </Text>
            <Text x={239} y={281} size={15} dim>
              Bring your team in to collaborate
            </Text>
            <Text x={239} y={303} size={15} dim>
              and share your creations.
            </Text>
            <Text x={708} y={258} size={25} anchor="end">
              →
            </Text>
          </Panel>
          <Text x={219} y={364} strong>
            Workspace Access
          </Text>
          <Text x={741} y={364} anchor="end" dim>
            Restricted ↓
          </Text>
          <path d="M219 390H741" stroke={subtle} />
          <Text x={219} y={428} strong>
            Public access
          </Text>
          <Text x={741} y={428} anchor="end" dim>
            No Access ↓
          </Text>
          <Action x={608} y={459} width={133}>
            Done
          </Action>
        </Dialog>
      );
    case "flows-intro":
      return <Introduction variant="flows" />;
    case "dubbing-intro":
      return <Introduction variant="dubbing" />;
    case "music-discovery":
      return (
        <Shell>
          <Text x={210} y={120} size={26} strong>
            Marketplace
          </Text>
          <Text x={210} y={157} size={16} dim>
            Genre Instrument Mood
          </Text>
          {["Corporate", "Cinematic", "Podcasts"].map((s, i) => (
            <Panel
              key={s}
              x={211 + i * 231}
              y={183}
              width={215}
              height={187}
              growth
            >
              <Media x={211 + i * 231} y={183} width={215} height={144} />
              <Text x={223 + i * 231} y={359} strong>
                {s}
              </Text>
            </Panel>
          ))}
          <Panel x={211} y={389} width={676} height={114} fill={raised} growth>
            <Text x={233} y={421} dim>
              Upbeat synthwave
            </Text>
            <Text x={233} y={473} size={15}>
              Music v2.5
            </Text>
            <Action x={646} y={447} width={217} primary>
              Generate · 1,800 credits
            </Action>
          </Panel>
        </Shell>
      );
    case "sound-library":
      return (
        <Shell>
          <Text x={211} y={122} size={25} strong>
            Sound Effects
          </Text>
          <Text x={211} y={164} strong>
            Explore
          </Text>
          <Text x={316} y={164} dim>
            Trending
          </Text>
          {[0, 1, 2].map((i) => (
            <g key={i} className="growth-scope">
              <rect
                x="211"
                y={183 + i * 52}
                width="676"
                height="52"
                fill={card}
              />
              <path d={`M211 ${183 + i * 52}H886`} stroke={subtle} />
              <Text x={225} y={216 + i * 52} size={18}>
                ▷
              </Text>
              <Rule x={254} y={209 + i * 52} width={161 + i * 27} />
              <Wave x={542} y={211 + i * 52} width={182} />
              <Text x={780} y={216 + i * 52} size={14} dim>
                Downloads
              </Text>
            </g>
          ))}
          <Panel x={211} y={359} width={676} height={144} fill={raised} growth>
            <Text x={233} y={392} size={16} dim>
              Object material Surface material Resonance detail
            </Text>
            <path d="M231 418H867" stroke={subtle} />
            <GrowthPreview>
              <Text x={233} y={452} size={14} dim>
                Generations may be shared to Explore for others to download.
              </Text>
              <Text x={233} y={481} size={15}>
                Disable
              </Text>
            </GrowthPreview>
            <Action x={729} y={444} width={137} primary>
              Generate
            </Action>
          </Panel>
        </Shell>
      );
    case "visual-examples":
      return (
        <Shell>
          <Text x={211} y={121} size={25} strong>
            Explore
          </Text>
          <Text x={211} y={158} size={16} dim>
            Image Video
          </Text>
          {["Surreal Landscape", "Steampunk City", "Enchanted Forest"].map(
            (s, i) => (
              <Panel
                key={s}
                x={211 + i * 232}
                y={180}
                width={214}
                height={260 - (i % 2) * 33}
                growth
              >
                <Media
                  x={211 + i * 232}
                  y={180}
                  width={214}
                  height={219 - (i % 2) * 33}
                />
                <Text x={225 + i * 232} y={429 - (i % 2) * 33} size={17} strong>
                  {s}
                </Text>
              </Panel>
            ),
          )}
          <Panel x={231} y={311} width={174} height={68} fill={raised} growth>
            <Text x={246} y={338} size={14}>
              Recreate Reference
            </Text>
            <Text x={246} y={361} size={14}>
              Edit Open Studio
            </Text>
          </Panel>
          <Panel x={211} y={461} width={678} height={44} fill={inset}>
            <Text x={229} y={489} size={16} dim>
              Describe what you want to create...
            </Text>
          </Panel>
        </Shell>
      );
    case "audiobook-pathways":
      return (
        <Panel>
          <Text x={96} y={101} size={27} strong>
            Audiobooks
          </Text>
          {["Create an Audiobook", "Publish to ElevenReader"].map((s, i) => (
            <Panel
              key={s}
              x={96 + i * 396}
              y={153}
              width={374}
              height={318}
              fill={i ? raised : card}
              growth
            >
              <rect
                x={123 + i * 396}
                y="180"
                width="320"
                height="124"
                rx="5"
                fill={inset}
              />
              <path
                d={`M${258 + i * 396} 211h38v62h-38zM${264 + i * 396} 225h25m-25 12h25m-25 12h16`}
                fill="none"
                stroke={muted}
                strokeWidth="2"
              />
              <Text x={123 + i * 396} y={347} size={22} strong>
                {s}
              </Text>
              <Text x={123 + i * 396} y={378} size={15} dim>
                {i
                  ? "Free dynamic narration. Start earning."
                  : "Export and distribute everywhere."}
              </Text>
              <Action x={123 + i * 396} y={412} width={320} primary={i === 0}>
                {i ? "Publish your eBook" : "Create audiobook"}
              </Action>
            </Panel>
          ))}
        </Panel>
      );
    case "earnings-checklist":
      return (
        <Panel>
          <Text x={480} y={111} size={30} strong anchor="middle">
            Record your voice. Get paid.
          </Text>
          <Text x={480} y={148} size={17} dim anchor="middle">
            Publish your voice and earn when paid users use it.
          </Text>
          <Panel x={169} y={187} width={622} height={290} fill={raised} growth>
            <Text x={196} y={225} size={22} strong>
              Get Started
            </Text>
            <Text x={763} y={225} size={16} dim anchor="end">
              0 of 3 complete
            </Text>
            {[
              "Create a Professional Voice Clone",
              "Create Payout Account",
              "Publish Your Voice",
            ].map((s, i) => (
              <g key={s}>
                <path d={`M195 ${250 + i * 68}H765`} stroke={subtle} />
                <circle
                  cx="211"
                  cy={280 + i * 68}
                  r="11"
                  fill="none"
                  stroke={muted}
                />
                <Text x={237} y={286 + i * 68} size={18} strong={i === 0}>
                  {s}
                </Text>
                {i === 0 && (
                  <Text x={756} y={284} anchor="end" size={15}>
                    Create Voice →
                  </Text>
                )}
              </g>
            ))}
          </Panel>
        </Panel>
      );
    case "opportunity-table":
      return (
        <Shell>
          <Text x={211} y={123} size={27} strong>
            Opportunities
          </Text>
          <Text x={211} y={158} size={17} dim>
            Discover voices in high demand and low competition.
          </Text>
          <Panel x={211} y={192} width={679} height={313} growth>
            <rect
              x="212"
              y="193"
              width="677"
              height="53"
              rx="6"
              fill={raised}
            />
            {[
              "Language",
              "Accent",
              "Category",
              "Library voices",
              "Opportunity",
            ].map((s, i) => (
              <Text key={s} x={231 + i * 131} y={225} size={14} strong>
                {s}
              </Text>
            ))}
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <path d={`M212 ${246 + i * 62}H889`} stroke={subtle} />
                {[0, 1, 2].map((j) => (
                  <Rule
                    key={j}
                    x={231 + j * 131}
                    y={278 + i * 62}
                    width={75 + (j % 2) * 17}
                  />
                ))}
                <Rule x={624} y={278 + i * 62} width={39} />
                <GrowthPreview>
                  <rect
                    x="755"
                    y={267 + i * 62}
                    width={70 - i * 12}
                    height="18"
                    rx="3"
                    fill={muted}
                  />
                  <Text x={859} y={282 + i * 62} size={16}>
                    ↑
                  </Text>
                </GrowthPreview>
              </g>
            ))}
          </Panel>
        </Shell>
      );
    case "affiliate-invitation":
      return (
        <Dialog title="ElevenLabs Affiliate Program" y={62} height={436} growth>
          <Text x={219} y={148} size={18} dim>
            Become an affiliate and earn with every recommendation.
          </Text>
          <Text x={219} y={207} size={20} strong>
            Are you an established creator?
          </Text>
          <Text x={219} y={240} size={16} dim>
            If you have a large following, contact us
          </Text>
          <Text x={219} y={265} size={16} dim>
            for exclusive opportunities.
          </Text>
          <Panel x={219} y={299} width={522} height={99} fill={inset}>
            <Text x={240} y={333} size={21} strong>
              PartnerStack
            </Text>
            <Text x={240} y={364} size={15} dim>
              Our affiliate program is managed by PartnerStack.
            </Text>
            <Text x={240} y={387} size={14} dim>
              Review the program details and terms before joining.
            </Text>
          </Panel>
          <Action x={219} y={428} width={522} primary>
            Sign up for the affiliate program
          </Action>
        </Dialog>
      );
    case "product-switcher":
      return (
        <Shell>
          <Rule x={213} y={122} width={505} lines={3} />
          <Panel x={213} y={213} width={310} height={288} fill={inset} />
          <Panel x={545} y={213} width={346} height={288} fill={inset} />
          <Panel x={61} y={84} width={427} height={370} fill={raised} growth>
            {[
              ["ElevenCreative", "Create and localize content"],
              ["ElevenAgents", "Deploy conversational agents"],
              ["ElevenAPI", "Build with audio models"],
            ].map(([a, b], i) => (
              <g key={a}>
                <rect
                  x="83"
                  y={106 + i * 111}
                  width="48"
                  height="48"
                  rx="7"
                  fill={inset}
                  stroke={line}
                />
                <Text x={155} y={132 + i * 111} size={22} strong>
                  {a}
                </Text>
                <Text x={155} y={163 + i * 111} size={16} dim>
                  {b}
                </Text>
                {i < 2 && (
                  <path d={`M84 ${190 + i * 111}H465`} stroke={subtle} />
                )}
              </g>
            ))}
          </Panel>
        </Shell>
      );
    case "agent-templates":
      return (
        <Shell sidebar={false}>
          <Text x={60} y={116} size={25} strong>
            Browse templates
          </Text>
          <Action x={413} y={92} width={166}>
            Create Blank Agent
          </Action>
          <Text x={60} y={162} size={16} dim>
            All templates Customer Support Education
          </Text>
          {[
            "Customer Support",
            "Language Practice Tutor",
            "Sales assistant",
            "Appointment booking",
          ].map((s, i) => (
            <Panel
              key={s}
              x={60 + (i % 2) * 269}
              y={192 + Math.floor(i / 2) * 151}
              width={250}
              height={134}
              growth
            >
              <Rule
                x={79 + (i % 2) * 269}
                y={220 + Math.floor(i / 2) * 151}
                width={79}
              />
              <Text
                x={79 + (i % 2) * 269}
                y={253 + Math.floor(i / 2) * 151}
                size={16}
                strong
              >
                {s}
              </Text>
              <Rule
                x={79 + (i % 2) * 269}
                y={278 + Math.floor(i / 2) * 151}
                width={199}
                lines={2}
              />
            </Panel>
          ))}
          <Panel x={603} y={92} width={298} height={412} fill={inset}>
            <Text x={625} y={134} size={22} strong>
              Architect
            </Text>
            <Text x={625} y={172} size={16} dim>
              Let’s find your starting point.
            </Text>
            <Rule x={625} y={207} width={241} lines={3} />
            <Panel x={625} y={298} width={254} height={113}>
              <rect
                x="668"
                y="318"
                width="166"
                height="27"
                rx="4"
                fill={raised}
                stroke={line}
              />
              <path d="M751 345v19" stroke={muted} />
              <rect
                x="691"
                y="364"
                width="120"
                height="27"
                rx="4"
                fill={raised}
                stroke={line}
              />
            </Panel>
            <Action x={625} y={444} width={254} primary growth>
              Use template
            </Action>
          </Panel>
        </Shell>
      );
    case "api-quickstart":
      return (
        <Shell>
          <Text x={211} y={123} size={26} strong>
            Developer quickstart
          </Text>
          <Panel x={211} y={154} width={466} height={345} fill={inset} growth>
            <Text x={232} y={187} size={16}>
              Python ↓
            </Text>
            <Text x={653} y={187} size={15} anchor="end">
              Copy code
            </Text>
            <path d="M212 206H676" stroke={subtle} />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Rule
                key={i}
                x={237 + (i % 4 > 1 ? 22 : 0)}
                y={234 + i * 27}
                width={[287, 164, 325, 193][i % 4]}
              />
            ))}
            <Text x={232} y={477} size={15}>
              View documentation ↗
            </Text>
          </Panel>
          <Panel x={699} y={154} width={192} height={345}>
            <Text x={720} y={187} size={19} strong>
              Quick links
            </Text>
            {["Create an API Key", "Models", "SDKs", "Pricing"].map((s, i) => (
              <g key={s}>
                <Text x={719} y={236 + i * 60} size={16}>
                  {s}
                </Text>
                <path d={`M718 ${257 + i * 60}H871`} stroke={subtle} />
              </g>
            ))}
          </Panel>
        </Shell>
      );
    case "credit-topup":
      return (
        <Dialog title="Add credits" x={225} width={510} y={64} height={432}>
          <Text x={256} y={148} size={17} strong>
            Top up by
          </Text>
          <Panel x={256} y={169} width={448} height={65} fill={inset} growth>
            <Text x={276} y={211} size={27} strong>
              ₹1,000
            </Text>
            <Text x={685} y={208} size={16} dim anchor="end">
              ₹176 = 10,000 credits
            </Text>
          </Panel>
          {["₹500", "₹1,000", "₹5,000"].map((s, i) => (
            <Action key={s} x={256 + i * 152} y={254} width={144} growth>
              {s}
            </Action>
          ))}
          <Text x={256} y={337} size={17}>
            After top up
          </Text>
          <Rule x={574} y={331} width={129} />
          <Text x={256} y={382} size={14} dim>
            Taxes may apply. Credits can take time to appear.
          </Text>
          <Action x={256} y={428} width={448} primary growth>
            Add credits
          </Action>
        </Dialog>
      );
    case "automatic-topup":
      return (
        <Dialog
          growth
          title="Automatic Top up"
          x={206}
          width={548}
          y={49}
          height={461}
        >
          <Text x={237} y={133} size={16} dim>
            Keep creating when your credit balance runs low.
          </Text>
          <GrowthPreview>
            <Text x={237} y={180} strong>
              Enable automatic top up
            </Text>
            <rect
              x="670"
              y="158"
              width="53"
              height="28"
              rx="14"
              fill={inset}
              stroke={line}
            />
            <circle cx="685" cy="172" r="10" fill={muted} />
            {[
              "Top up amount",
              "When balance falls below",
              "Monthly spend cap",
            ].map((s, i) => (
              <g key={s}>
                <Text x={237} y={225 + i * 71} size={16} dim>
                  {s}
                </Text>
                <rect
                  x="508"
                  y={203 + i * 71}
                  width="215"
                  height="37"
                  rx="4"
                  fill={inset}
                  stroke={subtle}
                />
              </g>
            ))}
          </GrowthPreview>
          <Text x={237} y={403} size={14} dim>
            Leave the monthly cap blank for no limit.
          </Text>
          <Action x={601} y={444} width={122} growth>
            Save
          </Action>
        </Dialog>
      );
    case "model-pricing":
      return (
        <Panel>
          <Text x={96} y={103} size={28} strong>
            Model Pricing
          </Text>
          {["Eleven v4", "Eleven v4 Turbo"].map((s, i) => (
            <Panel
              key={s}
              x={96 + i * 396}
              y={145}
              width={372}
              height={330}
              fill={i === 0 ? raised : card}
              growth
            >
              <Text x={122 + i * 396} y={190} size={25} strong>
                {s}
              </Text>
              <Text x={443 + i * 396} y={187} size={14} anchor="end">
                New
              </Text>
              <Text x={122 + i * 396} y={242} size={28} strong>
                {i ? "₹0.968" : "₹1.936"}
              </Text>
              <Text x={233 + i * 396} y={240} size={16} dim>
                per 1k characters
              </Text>
              <Text x={122 + i * 396} y={282} size={19} strong>
                72% off until Oct 12
              </Text>
              <path d={`M${121 + i * 396} 309h320`} stroke={subtle} />
              <Rule x={122 + i * 396} y={343} width={281} lines={4} />
              <Text x={122 + i * 396} y={448} size={15}>
                View model details →
              </Text>
            </Panel>
          ))}
        </Panel>
      );
  }
}
