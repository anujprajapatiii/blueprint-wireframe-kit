import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Home,
  Layers3,
  UserRound,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  Skeleton,
  cn,
} from "../../components/kit";

import { growthTarget } from "../../components/growth-education";

export const billingPatternIds = [
  "el-plan-value-ladder",
  "el-annual-cadence-framing",
  "el-annual-upgrade-intercept",
];

type BillingDialog = "annual" | "confirm" | null;
type Cadence = "monthly" | "yearly";

const creativePlans = [
  {
    name: "Free",
    monthly: "0",
    yearly: "0",
    features: [
      "10k credits /mo",
      "5 Studio Projects",
      "Access to Speech to Text, Sound Effects, Voice Design, Music, Productions, Image & Video",
      "API access",
    ],
  },
  {
    name: "Starter",
    monthly: "528",
    yearly: "440",
    features: [
      "30k credits /mo",
      "20 Studio Projects",
      "Clone your own voice with Instant Voice Cloning",
      "Access to Dubbing studio",
      "Commercial License for Speech and Music",
    ],
  },
  {
    name: "Creator",
    monthly: "1,936",
    yearly: "1,613.04",
    features: [
      "121k credits /mo",
      "1,000 Studio Projects",
      "Professional Voice Cloning",
      "192kbps quality audio",
      "Additional credits through Pay as you go",
    ],
  },
  {
    name: "Pro",
    monthly: "8,712",
    yearly: "7,260",
    features: [
      "600k credits /mo",
      "3,000 Studio Projects",
      "44.1kHz PCM audio output via API",
    ],
  },
  {
    name: "Scale",
    monthly: "26,312",
    yearly: null,
    features: [
      "1.8M credits /mo",
      "20,000 Studio Projects",
      "3 Workspace seats",
      "Team Collaboration",
    ],
  },
];

const agentFeatures = [
  ["15 minutes of calls included", "4 Concurrent Calls", "API access"],
  [
    "75 minutes of calls included",
    "6 Concurrent Calls",
    "Text messages",
    "Commercial License",
  ],
  [
    "275 minutes of calls included",
    "10 Concurrent Calls",
    "Additional Minutes",
  ],
  ["1,238 minutes of calls included", "20 Concurrent Calls"],
  [
    "3,738 minutes of calls included",
    "30 Concurrent Calls",
    "3 Workspace seats",
  ],
];

function Boundary({ children }: { children: ReactNode }) {
  return (
    <div
      role="status"
      className="rounded-md border border-border bg-surface-sunken p-3 text-sm leading-6 text-muted-foreground"
    >
      {children}
    </div>
  );
}

function ContextShell({
  children,
  title = "Subscription",
  sidebar = true,
  fitViewport = false,
}: {
  children: ReactNode;
  title?: string;
  sidebar?: boolean;
  fitViewport?: boolean;
}) {
  return (
    <section
      aria-label={`${title} wireframe`}
      className={cn(
        "bg-background text-foreground",
        fitViewport ? "min-h-dvh" : "min-h-[740px]",
      )}
    >
      <div className={cn("flex", fitViewport ? "min-h-dvh" : "min-h-[740px]")}>
        {sidebar && (
          <aside
            aria-label="Layout context"
            className="hidden w-[14.8%] min-w-28 shrink-0 border-r border-border bg-surface-sunken px-3 py-6 md:block"
          >
            <div className="mb-7 flex items-center gap-2 text-sm font-medium">
              <Layers3 aria-hidden="true" className="size-4" />
              Workspace
            </div>
            <div className="space-y-5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Home aria-hidden="true" className="size-4" />
                Home
              </p>
              <p>Voices</p>
              <p>Studio</p>
              <p>Flows</p>
              <p>Assets</p>
            </div>
            <div className="mt-12 space-y-5" aria-hidden="true">
              <Skeleton className="h-2 w-4/5" />
              <Skeleton className="h-2 w-3/5" />
              <Skeleton className="h-2 w-4/5" />
              <Skeleton className="h-2 w-1/2" />
            </div>
          </aside>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex h-14 items-center justify-between border-b border-border px-4 text-sm text-muted-foreground sm:px-6">
            <span>{title}</span>
            <span className="flex items-center gap-2">
              <UserRound aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">My workspace</span>
            </span>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

function UpgradeFlow({
  state,
  setState,
  restoreFocus,
}: {
  state: BillingDialog;
  setState: (state: BillingDialog) => void;
  restoreFocus: () => void;
}) {
  const [boundary, setBoundary] = useState("");
  const cancelReview = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (state === "confirm") cancelReview.current?.focus();
  }, [state]);
  return (
    <Dialog
      open={state !== null}
      onOpenChange={(open) => {
        if (!open) {
          setState(null);
          setBoundary("");
        }
      }}
    >
      <DialogContent
        className="growth-scope max-w-[512px] gap-5 p-5"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          restoreFocus();
        }}
      >
        <DialogTitle className="pr-7">
          {state === "annual"
            ? "Pay less with annual billing"
            : "Subscription upgrade"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {state === "annual"
            ? "Choose whether to continue your upgrade with yearly or monthly billing."
            : "Review the plan change and immediate charge. This local prototype does not submit a payment."}
        </DialogDescription>
        {state === "annual" ? (
          <>
            <Card
              {...growthTarget({
                id: "annual-savings",
                title: "Show the yearly saving",
                description:
                  "After you choose a monthly upgrade, the offer shows two months free, giving you a reason to consider paying yearly.",
                order: 1,
              })}
              className="flex overflow-hidden"
            >
              <div className="flex w-[28%] shrink-0 items-center justify-center border-r border-border bg-surface-sunken p-3 text-foreground">
                <CircleDollarSign className="size-8" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold">
                    Subscribe to yearly plan
                  </h3>
                  <Badge className="text-xs">2 months free</Badge>
                </div>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  All annual plans get 16% discount compared to monthly plans
                </p>
              </div>
            </Card>
            <DialogFooter
              {...growthTarget({
                id: "annual-choice",
                title: "Keep both options open",
                description:
                  "Yearly and monthly stay available together, so you can consider the saving without losing the monthly option you first chose.",
                order: 2,
              })}
              className="relative grid grid-cols-1 gap-2 sm:grid-cols-2"
            >
              <Button
                variant="outline"
                onClick={() =>
                  setBoundary(
                    "The yearly branch was not inspected. This prototype stops before an annual commitment.",
                  )
                }
              >
                Continue yearly
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBoundary("");
                  setState("confirm");
                }}
              >
                Continue monthly
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div
              {...growthTarget({
                id: "upgrade-commitment",
                title: "Review the charge",
                description:
                  "The old plan, new plan and amount due now appear together, so you can check the change before paying.",
                order: 1,
              })}
              className="space-y-3 text-sm leading-6"
            >
              <p>
                You&apos;re about to change your current subscription plan. It
                will change from{" "}
                <strong className="font-semibold">Starter (Monthly)</strong> to{" "}
                <strong className="font-semibold">Creator (Monthly)</strong>.
              </p>
              <p>
                You will be charged{" "}
                <strong className="font-semibold">₹1,936</strong> now.
              </p>
              <p>
                If your payment fails during the upgrade, you&apos;ll
                temporarily lose access to your subscription features until
                payment is successful.
              </p>
            </div>
            <DialogFooter
              {...growthTarget({
                id: "upgrade-control",
                title: "Confirm or cancel",
                description:
                  "Cancel sits beside Confirm, giving you a clear way to back out after reviewing the plan change and charge.",
                order: 2,
              })}
            >
              <DialogClose asChild>
                <Button ref={cancelReview} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={() =>
                  setBoundary(
                    "Payment was not submitted. The observed flow ends at this confirmation.",
                  )
                }
              >
                Confirm
              </Button>
            </DialogFooter>
            <p className="text-xs text-muted-foreground">
              Prototype only. Nothing will be charged.
            </p>
          </>
        )}
        {boundary && <Boundary>{boundary}</Boundary>}
      </DialogContent>
    </Dialog>
  );
}

function Plans({
  initiallyYearly = false,
  initialDialog = null,
}: {
  initiallyYearly?: boolean;
  initialDialog?: BillingDialog;
}) {
  const [cadence, setCadence] = useState<Cadence>(
    initiallyYearly ? "yearly" : "monthly",
  );
  const [product, setProduct] = useState<"creative" | "agents">("creative");
  const [dialog, setDialog] = useState<BillingDialog>(initialDialog);
  const [boundary, setBoundary] = useState("");
  const track = useRef<HTMLDivElement>(null);
  const upgradeTrigger = useRef<HTMLButtonElement>(null);
  const reviewTrigger = useRef<HTMLButtonElement>(null);
  function choosePlan(name: string) {
    if (name === "Creator" && cadence === "monthly" && product === "creative") {
      setBoundary("");
      setDialog("annual");
    } else {
      setBoundary(
        `${name} ${cadence} was not followed through checkout. No subscription has changed.`,
      );
    }
  }
  return (
    <ContextShell>
      <div className="mx-auto w-full max-w-[1152px] px-4 py-8 sm:w-[84%] sm:px-0 md:w-[78.2%] md:py-14">
        <h2 className="flex items-center gap-2 text-xl font-medium">
          Subscription
        </h2>
        <div
          className="mt-3 flex gap-1 border-b border-border pb-2"
          aria-label="Subscription product"
        >
          <Button
            size="sm"
            variant={product === "creative" ? "secondary" : "ghost"}
            aria-pressed={product === "creative"}
            onClick={() => {
              setProduct("creative");
              setBoundary("");
            }}
          >
            ElevenCreative
          </Button>
          <Button
            size="sm"
            variant={product === "agents" ? "secondary" : "ghost"}
            aria-pressed={product === "agents"}
            onClick={() => {
              setProduct("agents");
              setCadence("monthly");
              setBoundary("");
            }}
          >
            ElevenAgents
          </Button>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Card className="p-4">
            <p className="text-sm">Credits used</p>
            <div
              className="mt-3 h-2 rounded-full border border-border bg-surface-sunken"
              aria-label="Personal usage omitted"
            />
            <p className="sr-only">Personal credit usage is omitted.</p>
          </Card>
          <Card className="flex items-center gap-3 p-4">
            <CreditCard
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-sm">You&apos;re currently on Starter plan</p>
          </Card>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div
            {...growthTarget({
              id: "billing-cadence",
              title: "Compare yearly and monthly",
              description:
                "The yearly option highlights the saving and shows the monthly equivalent, so you can compare costs before choosing how to pay.",
              order: 1,
            })}
            className="growth-scope inline-flex max-w-full items-center gap-1 rounded-md border border-border bg-surface-sunken p-1 text-foreground"
            aria-label="Billing cadence"
          >
            <Button
              size="sm"
              variant={cadence === "monthly" ? "secondary" : "ghost"}
              aria-pressed={cadence === "monthly"}
              className="px-2 text-xs"
              onClick={() => {
                setCadence("monthly");
                setBoundary("");
              }}
            >
              Monthly
            </Button>
            <Button
              size="sm"
              variant={cadence === "yearly" ? "secondary" : "ghost"}
              aria-pressed={cadence === "yearly"}
              className="px-2 text-xs"
              onClick={() => {
                if (product === "agents") {
                  setBoundary(
                    "The Agents yearly comparison was not captured. The observed monthly prices remain visible.",
                  );
                } else {
                  setCadence("yearly");
                  setBoundary("");
                }
              }}
            >
              Yearly (save 2 months)
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setBoundary(
                  "The Talk to Sales entry was observed. A sales inquiry was not opened or submitted.",
                )
              }
            >
              Talk to Sales
            </Button>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Previous plans"
              onClick={() =>
                track.current?.scrollBy({
                  left: -280,
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                })
              }
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              aria-label="More plans"
              onClick={() =>
                track.current?.scrollBy({
                  left: 280,
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                })
              }
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </div>
        {boundary && (
          <div className="mt-4">
            <Boundary>{boundary}</Boundary>
          </div>
        )}
        <div
          {...growthTarget({
            id: "plan-ladder",
            title: "See what more buys",
            description:
              "Each plan shows its price and added features beside the others, making it easier to decide whether an upgrade is useful.",
            order: 2,
          })}
          ref={track}
          role="region"
          aria-label="Subscription plans"
          tabIndex={0}
          className="mt-5 flex snap-x snap-proximity items-start gap-3 overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {creativePlans.map((plan, index) => (
            <Card
              key={plan.name}
              {...(plan.name === "Creator"
                ? growthTarget({
                    id: "recommended-plan",
                    title: "Highlight a suggested plan",
                    description:
                      "The Popular badge and stronger button draw your attention to Creator, giving you a starting point for comparing the plans.",
                    order: 3,
                  })
                : {})}
              className="growth-scope w-[22%] min-w-[190px] shrink-0 snap-start overflow-hidden"
            >
              <div className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h3 className="text-sm font-medium">{plan.name}</h3>
                  {plan.name === "Creator" && (
                    <span className="inline-flex items-center gap-1">
                      <Badge className="text-xs">Popular</Badge>
                    </span>
                  )}
                </div>
                <p className="mt-3 flex flex-wrap items-baseline gap-1">
                  {cadence === "yearly" && index > 0 && (
                    <s className="text-xs text-muted-foreground">
                      ₹{plan.monthly}
                    </s>
                  )}
                  <span className="text-xl font-semibold">
                    {cadence === "yearly" && !plan.yearly
                      ? "—"
                      : `₹${cadence === "yearly" ? plan.yearly : plan.monthly}`}
                  </span>
                  <span className="text-xs text-muted-foreground">/mo</span>
                </p>
                <p className="mt-1 min-h-5 text-xs text-muted-foreground">
                  {cadence === "yearly" && index > 0
                    ? plan.yearly
                      ? "Billed annually"
                      : "Annual price not captured"
                    : "\u00a0"}
                </p>
                <Button
                  ref={plan.name === "Creator" ? upgradeTrigger : undefined}
                  className="mt-5 w-full"
                  size="sm"
                  variant={plan.name === "Creator" ? "default" : "outline"}
                  disabled={
                    index === 0 || (index === 1 && cadence === "monthly")
                  }
                  onClick={() => choosePlan(plan.name)}
                >
                  {index === 0 ? (
                    <>
                      <Check aria-hidden="true" />
                      Subscribed
                    </>
                  ) : index === 1 && cadence === "monthly" ? (
                    <>
                      <Check aria-hidden="true" />
                      Current plan
                    </>
                  ) : (
                    "Upgrade"
                  )}
                </Button>
              </div>
              <div className="border-t border-border bg-surface-sunken p-4 text-foreground">
                <ul className="space-y-3 text-xs leading-5">
                  {(product === "agents"
                    ? agentFeatures[index]
                    : plan.features
                  ).map((feature) => (
                    <li key={feature} className="flex items-start gap-1.5">
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-3 shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {index > 0 && (
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    + Everything in {creativePlans[index - 1].name}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
        {initialDialog && (
          <div className="mt-5">
            <Button
              ref={reviewTrigger}
              onClick={() => setDialog(initialDialog)}
            >
              Reopen{" "}
              {initialDialog === "annual" ? "annual offer" : "upgrade review"}
            </Button>
          </div>
        )}
      </div>
      <UpgradeFlow
        state={dialog}
        setState={setDialog}
        restoreFocus={() =>
          (initialDialog
            ? reviewTrigger.current
            : upgradeTrigger.current
          )?.focus()
        }
      />
    </ContextShell>
  );
}

export function BillingWireframe({ patternId }: { patternId: string }) {
  switch (patternId) {
    case "el-plan-value-ladder":
      return <Plans />;
    case "el-annual-cadence-framing":
      return <Plans initiallyYearly />;
    case "el-annual-upgrade-intercept":
      return <Plans initialDialog="annual" />;
    default:
      return (
        <section className="p-8">
          <p>This billing experiment could not be found.</p>
          <Button asChild variant="outline" className="mt-4">
            <a href="?view=experiments" target="_top">
              Browse experiments
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </section>
      );
  }
}
