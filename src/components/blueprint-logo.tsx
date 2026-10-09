import "./blueprint-logo.css";

/** Shared library identity; the blueprint becomes a little face on interaction. */
export function BlueprintLogo() {
  return (
    <a
      href="?"
      className="blueprint-logo inline-flex min-h-11 shrink-0 items-center gap-3 rounded-sm text-lg font-semibold tracking-tight"
      aria-label="Blueprint home"
    >
      <svg
        className="blueprint-logo-mark size-9 shrink-0"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          className="blueprint-logo-frame"
          x="0.5"
          y="0.5"
          width="35"
          height="35"
          rx="3.5"
        />
        <g className="blueprint-logo-plan">
          <rect x="7.5" y="7.5" width="8.5" height="8.5" />
          <rect x="20" y="7.5" width="8.5" height="8.5" />
          <rect x="7.5" y="20" width="21" height="8.5" />
        </g>
        <g className="blueprint-logo-face">
          <rect
            className="blueprint-logo-eye"
            x="10.5"
            y="11"
            width="4"
            height="5"
            rx="1"
          />
          <rect
            className="blueprint-logo-eye blueprint-logo-wink"
            x="21.5"
            y="11"
            width="4"
            height="5"
            rx="1"
          />
          <path className="blueprint-logo-smile" d="M10.5 22 Q18 29 25.5 22" />
        </g>
      </svg>
      <span>blueprint</span>
    </a>
  );
}
