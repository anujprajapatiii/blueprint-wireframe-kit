import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Route, X } from "lucide-react";
import { driver, type Driver, type DriveStep } from "driver.js";
import { Button, cn } from "./kit";
import "driver.js/dist/driver.css";
import "./growth-education.css";

type GrowthDefinition = {
  id: string;
  title: string;
  description: string;
  order?: number;
};

/** Put this on the actual intervention. Styling is intentionally a separate scope. */
export function growthTarget({
  id,
  title,
  description,
  order = 0,
}: GrowthDefinition) {
  return {
    "data-growth": id,
    "data-growth-title": title,
    "data-growth-description": description,
    "data-growth-order": order,
  };
}

export function GrowthLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn("growth-legend", className)}
      aria-label="Wireframe colour key"
    >
      <span>
        <i className="growth-key" aria-hidden="true" />
        Growth pattern
      </span>
      <span>
        <i className="context-key" aria-hidden="true" />
        Product context
      </span>
    </div>
  );
}

const CHANNEL = "blueprint-growth-guide";
export function sendGrowthGuide(
  frame: HTMLIFrameElement | null,
  command: "start" | "stop" | "status",
) {
  frame?.contentWindow?.postMessage(
    { channel: CHANNEL, command },
    location.origin,
  );
}
export function isGrowthGuideMessage(
  event: MessageEvent,
  frame: HTMLIFrameElement | null,
) {
  return (
    event.origin === location.origin &&
    event.source === frame?.contentWindow &&
    event.data?.channel === CHANNEL
  );
}

function availableTargets() {
  const all = Array.from(
    document.querySelectorAll<HTMLElement>("[data-growth]"),
  );
  return all
    .filter((element) => {
      if (element.closest('[hidden], [inert], [aria-hidden="true"]'))
        return false;
      const style = getComputedStyle(element);
      return (
        element.getClientRects().length > 0 &&
        style.visibility !== "hidden" &&
        style.display !== "none"
      );
    })
    .sort(
      (a, b) =>
        Number(a.dataset.growthOrder ?? 0) - Number(b.dataset.growthOrder ?? 0),
    );
}

// Driver accepts HTML. Keep education copy as plain text, including future imports.
function escapeHTML(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

function ModalGuideControl({
  host,
  active,
  onToggle,
}: {
  host: HTMLElement;
  active: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    ref.current?.showPopover?.();
    const element = ref.current;
    return () => {
      if (element?.matches(":popover-open")) element.hidePopover();
    };
  }, [host]);
  return createPortal(
    <div
      ref={ref}
      popover="manual"
      className="growth-context growth-modal-guide"
    >
      <Button
        variant="outline"
        size="sm"
        onPointerDown={(event) => event.preventDefault()}
        onClick={onToggle}
      >
        {active ? <X aria-hidden="true" /> : <Route aria-hidden="true" />}
        {active ? "End guide" : "Guide me"}
      </Button>
    </div>,
    host,
  );
}

/** Runs inside the wireframe document, including its portalled dialogs. */
export function GrowthEducation({ experimentId }: { experimentId: string }) {
  const standalone = window.parent === window;
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [guideHost, setGuideHost] = useState<HTMLElement | null>(null);
  const [tourOpen, setTourOpen] = useState(false);
  const startRef = useRef<() => void>(() => {});
  const stopRef = useRef<() => void>(() => {});
  useEffect(() => {
    let tour: Driver | null = null;
    let guided = false;
    let completedNormally = false;
    let scheduled = 0;
    let startPending = false;
    let previousSignature = "";
    let restoreFocus: HTMLElement | null = null;
    const seen = new Set<string>();
    const announce = (targets = availableTargets()) => {
      setActive(guided);
      setCount(targets.length);
      setTourOpen(Boolean(tour?.isActive()));
      if (standalone) {
        const overlay =
          targets
            .map((element) =>
              element.closest<HTMLElement>(
                '[role="dialog"], [role="alertdialog"], [role="menu"]',
              ),
            )
            .find(Boolean) ?? null;
        setGuideHost(overlay);
      }
      if (!standalone)
        window.parent.postMessage(
          { channel: CHANNEL, active: guided, count: targets.length },
          location.origin,
        );
    };
    const stop = () => {
      guided = false;
      startPending = false;
      completedNormally = false;
      tour?.destroy();
      tour = null;
      announce();
    };
    const startTour = (targets: HTMLElement[]) => {
      if (!targets.length || tour?.isActive()) return;
      completedNormally = false;
      restoreFocus =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      targets.forEach((element) => seen.add(element.dataset.growth!));
      const steps: DriveStep[] = targets.map((element) => ({
        element,
        popover: {
          title: escapeHTML(element.dataset.growthTitle ?? "Growth pattern"),
          description: escapeHTML(element.dataset.growthDescription ?? ""),
          side: "bottom",
          align: "start",
        },
      }));
      tour = driver({
        steps,
        animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        duration: 220,
        smoothScroll: false,
        overlayColor: getComputedStyle(document.documentElement)
          .getPropertyValue("--blue-950")
          .trim(),
        overlayOpacity: 0.55,
        stagePadding: 5,
        stageRadius: 8,
        disableActiveInteraction: true,
        allowClose: true,
        allowKeyboardControl: true,
        popoverClass: "growth-tour",
        showProgress: true,
        progressText: "{{current}} of {{total}}",
        nextBtnText: "Next",
        prevBtnText: "Back",
        doneBtnText: "Explore this flow",
        closeBtnLabel: "End guided walkthrough",
        onHighlighted(element) {
          // Driver decorates its target as a disclosure. A structural region
          // remains a region; only real controls can carry expanded state.
          if (
            element &&
            !element.matches(
              'button, a[href], input, [role="button"], [role="combobox"]',
            )
          ) {
            element.removeAttribute("aria-expanded");
            element.removeAttribute("aria-haspopup");
            element.removeAttribute("aria-controls");
          }
        },
        onPopoverRender(popover, options) {
          // Keep the help within Radix's dialog focus scope. The browser's top
          // layer makes viewport positioning independent of dialog transforms.
          const target = options.driver.getActiveElement();
          const modal = target?.closest(
            '[role="dialog"], [role="alertdialog"], [role="menu"]',
          );
          if (modal) modal.appendChild(popover.wrapper);
          popover.wrapper.setAttribute("popover", "manual");
          popover.wrapper.showPopover?.();
          popover.wrapper.setAttribute("aria-live", "polite");
          if (options.driver.isLastStep()) {
            const note = document.createElement("p");
            note.className = "growth-tour-continuation";
            note.textContent =
              "Continue the wireframe after this step. The guide explains new patterns as you open them.";
            popover.description.appendChild(note);
          }
        },
        onDoneClick(_element, _step, options) {
          completedNormally = true;
          options.driver.destroy();
        },
        onDestroyed() {
          if (!completedNormally) guided = false;
          tour = null;
          announce();
          requestAnimationFrame(() => {
            if (
              restoreFocus?.isConnected &&
              !restoreFocus.closest('[inert], [aria-hidden="true"]')
            )
              restoreFocus.focus({ preventScroll: true });
            else if (!standalone && !guided)
              window.parent.postMessage(
                { channel: CHANNEL, focus: true },
                location.origin,
              );
          });
        },
      });
      tour.drive();
      announce(targets);
    };
    const update = () => {
      scheduled = 0;
      const targets = availableTargets();
      const signature = targets
        .map((element) => element.dataset.growth)
        .join("|");
      if (signature !== previousSignature) {
        previousSignature = signature;
        announce(targets);
        const current = tour?.getActiveElement();
        if (current && !targets.includes(current as HTMLElement)) {
          completedNormally = true;
          tour?.destroy();
        }
      }
      if (guided && !tour?.isActive()) {
        const next = targets.filter(
          (element) => startPending || !seen.has(element.dataset.growth!),
        );
        if (next.length) {
          startPending = false;
          startTour(next);
        }
      }
    };
    const start = () => {
      if (tour?.isActive()) stop();
      guided = true;
      startPending = true;
      seen.clear();
      update();
      announce();
    };
    startRef.current = start;
    stopRef.current = stop;
    const observer = new MutationObserver(() => {
      if (!scheduled) scheduled = requestAnimationFrame(update);
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [
        "hidden",
        "inert",
        "aria-hidden",
        "data-state",
        "data-growth",
      ],
    });
    const receive = (event: MessageEvent) => {
      if (
        event.origin !== location.origin ||
        event.source !== window.parent ||
        event.data?.channel !== CHANNEL
      )
        return;
      if (event.data.command === "start") start();
      if (event.data.command === "stop") stop();
      if (event.data.command === "status") announce();
    };
    const escape = (event: KeyboardEvent) => {
      // Escape closes the lesson, not the source dialog underneath it.
      if (event.key === "Escape" && tour?.isActive()) {
        event.preventDefault();
        event.stopImmediatePropagation();
        stop();
      }
    };
    window.addEventListener("message", receive);
    window.addEventListener("keydown", escape, true);
    update();
    announce();
    return () => {
      guided = false;
      observer.disconnect();
      cancelAnimationFrame(scheduled);
      window.removeEventListener("message", receive);
      window.removeEventListener("keydown", escape, true);
      tour?.destroy();
    };
  }, [experimentId, standalone]);
  if (!standalone) return null;
  if (guideHost)
    return tourOpen ? null : (
      <ModalGuideControl
        host={guideHost}
        active={active}
        onToggle={() => (active ? stopRef.current() : startRef.current())}
      />
    );
  return (
    <div className="growth-standalone-toolbar">
      <GrowthLegend />
      <Button
        variant="outline"
        size="sm"
        onPointerDown={(event) => event.preventDefault()}
        onClick={() => (active ? stopRef.current() : startRef.current())}
        disabled={!count && !active}
      >
        {active ? <X aria-hidden="true" /> : <Route aria-hidden="true" />}
        {active ? "End guide" : "Guide me"}
      </Button>
      {active && (
        <span className="growth-guide-status" role="status">
          Guide on · explore to continue
        </span>
      )}
    </div>
  );
}
