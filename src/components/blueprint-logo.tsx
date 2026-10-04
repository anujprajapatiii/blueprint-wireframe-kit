/** Shared library identity for the kit, directory, and experiment workspace. */
export function BlueprintLogo() {
  return (
    <a
      href="?"
      className="inline-flex shrink-0 items-center gap-3 rounded-sm text-lg font-semibold tracking-tight"
      aria-label="Blueprint home"
    >
      <span
        className="grid size-9 grid-cols-2 gap-1 rounded-sm border border-input p-1.5"
        aria-hidden="true"
      >
        <span className="border border-input" />
        <span className="border border-input" />
        <span className="col-span-2 border border-input" />
      </span>
      <span>blueprint</span>
    </a>
  );
}
