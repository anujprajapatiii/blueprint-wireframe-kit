import { useEffect, useState } from "react";
import { DesignControls } from "../tuning/design-controls";
import { SteamGrowthBanners } from "./steam-growth-banners";
import { savedSteamDesign, type SteamDesign } from "./steam-design";
import { steamTuningFields, validateSteamDesign } from "./steam-tuning-schema";
import "../tuning/workbench.css";

const draftKey = "blueprint:steam-growth-banners:design-draft:v1";
function recoverDraft(): SteamDesign {
  try {
    const cached = JSON.parse(sessionStorage.getItem(draftKey) || "null");
    // A draft from a different source revision must not silently replace it.
    if (cached?.base === JSON.stringify(savedSteamDesign))
      return validateSteamDesign(cached.values);
  } catch {
    /* Browser storage is optional. */
  }
  return savedSteamDesign;
}

export default function SteamWorkbench({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [open, setOpen] = useState(
    new URLSearchParams(location.search).has("tune"),
  );
  const [saved, setSaved] = useState(savedSteamDesign);
  const [draft, setDraft] = useState(recoverDraft);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  useEffect(() => {
    try {
      sessionStorage.setItem(
        draftKey,
        JSON.stringify({ base: JSON.stringify(saved), values: draft }),
      );
    } catch {
      /* Saving to project still works. */
    }
  }, [draft, saved]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const settings = validateSteamDesign(draft);
      const response = await fetch(
        `${import.meta.env.BASE_URL}__blueprint/tuning/steam-growth-banners`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Blueprint-Design": "1",
          },
          body: JSON.stringify(settings),
        },
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Could not save the project.");
      setSaved(settings);
      setMessage("Saved to project. The published site is unchanged.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not save. Your preview changes are still here.",
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className={open ? "design-workbench is-open" : "design-workbench"}>
      <div className="min-w-0">
        <SteamGrowthBanners
          embedded={embedded}
          design={draft}
          onTune={() => setOpen(!open)}
          tuningOpen={open}
        />
      </div>
      {open && (
        <DesignControls
          fields={steamTuningFields}
          values={draft}
          dirty={dirty}
          saving={saving}
          message={message}
          onChange={(key, value) => {
            setDraft((current) => ({ ...current, [key]: value }));
            setMessage("");
          }}
          onSave={save}
          onRevert={() => {
            setDraft(saved);
            setMessage("Reverted to saved project settings.");
          }}
          onClose={() => {
            setOpen(false);
            document.getElementById("open-design-controls")?.focus();
          }}
        />
      )}
    </div>
  );
}
