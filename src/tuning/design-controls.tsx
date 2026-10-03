import { useEffect, useRef, useState } from "react";
import { Copy, RotateCcw, Save, X } from "lucide-react";
import {
  Button,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/kit";
import type { TuningField, TuningValues } from "./types";

interface Props {
  fields: TuningField[];
  values: TuningValues;
  dirty: boolean;
  saving: boolean;
  message: string;
  onChange: (key: string, value: string | number) => void;
  onSave: () => void;
  onRevert: () => void;
  onClose: () => void;
}

export function DesignControls({
  fields,
  values,
  dirty,
  saving,
  message,
  onChange,
  onSave,
  onRevert,
  onClose,
}: Props) {
  const [copyMessage, setCopyMessage] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, []);
  function updateValue(key: string, value: string | number) {
    setCopyMessage("");
    onChange(key, value);
  }
  const groups = [...new Set(fields.map((field) => field.group))];
  async function copySettings() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(values, null, 2));
      setCopyMessage("Settings copied.");
    } catch {
      setCopyMessage(
        "Clipboard unavailable. Use Save to project to keep these settings.",
      );
    }
  }
  return (
    <aside
      id="design-controls"
      aria-label="Design controls"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
      className="design-controls no-print border-b bg-surface-sunken lg:border-b-0 lg:border-l"
    >
      <div className="flex items-start justify-between gap-3 border-b px-5 py-5">
        <div>
          <h2 ref={heading} tabIndex={-1} className="font-semibold">
            Design controls
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Local preview · save now, publish when ready.
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close design controls"
        >
          <X aria-hidden="true" />
        </Button>
      </div>
      <Tabs
        defaultValue={groups[0]}
        className="min-h-0 flex-1 overflow-y-auto p-5"
      >
        <TabsList aria-label="Design settings" className="w-full flex-wrap">
          {groups.map((group) => (
            <TabsTrigger value={group} key={group} className="min-h-10 flex-1">
              {group}
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((group) => (
          <TabsContent value={group} key={group} className="space-y-6 pt-3">
            {fields
              .filter((field) => field.group === group)
              .map((field) => {
                const id = `tune-${field.key}`;
                const current = values[field.key];
                const choice =
                  field.kind === "token"
                    ? field.options.find((option) => option.value === current)
                    : undefined;
                return (
                  <div key={field.key} className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <Label htmlFor={id}>{field.label}</Label>
                      {field.kind === "number" && (
                        <output htmlFor={id} className="font-mono text-xs">
                          {Number(current).toFixed(
                            field.step < 0.01 ? 2 : field.step < 1 ? 1 : 0,
                          )}
                          {field.unit}
                        </output>
                      )}
                    </div>
                    {field.kind === "token" ? (
                      <>
                        <select
                          id={id}
                          value={String(current)}
                          aria-describedby={`${id}-detail`}
                          className="h-control-default w-full rounded-md border border-input bg-background px-3 text-sm"
                          onChange={(event) => {
                            const option = field.options.find(
                              (item) =>
                                String(item.value) === event.target.value,
                            );
                            if (option) updateValue(field.key, option.value);
                          }}
                        >
                          {field.options.map((option) => (
                            <option
                              key={String(option.value)}
                              value={String(option.value)}
                            >
                              {option.label} · {option.resolved}
                            </option>
                          ))}
                        </select>
                        {choice && (
                          <div
                            id={`${id}-detail`}
                            className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                          >
                            {choice.swatch && (
                              <span
                                aria-hidden="true"
                                className="mt-0.5 size-6 shrink-0 rounded-sm border border-input"
                                style={{ background: choice.swatch }}
                              />
                            )}
                            <div className="min-w-0">
                              <code className="break-all text-foreground">
                                {choice.token}
                              </code>
                              <span> → {choice.resolved}</span>
                              <div className="font-mono">{choice.utility}</div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <input
                          id={id}
                          type="range"
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          value={Number(current)}
                          aria-describedby={`${id}-detail`}
                          aria-valuetext={`${Number(current).toFixed(2)}${field.unit}`}
                          onChange={(event) =>
                            updateValue(
                              field.key,
                              event.currentTarget.valueAsNumber,
                            )
                          }
                          className="h-10 w-full cursor-pointer accent-primary"
                        />
                        <p
                          id={`${id}-detail`}
                          className="text-xs leading-relaxed text-muted-foreground"
                        >
                          {field.note}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            <p className="border-t pt-4 text-xs leading-relaxed text-muted-foreground">
              Token choices reuse the kit’s foundations. Custom controls change
              this experiment’s proportions and behavior.
            </p>
          </TabsContent>
        ))}
      </Tabs>
      <div className="space-y-3 border-t bg-surface-sunken p-5">
        <p className="text-xs text-muted-foreground">
          {dirty ? "Unsaved local changes" : "Matches saved project settings"}
        </p>
        <Button
          onClick={() => {
            setCopyMessage("");
            onSave();
          }}
          disabled={!dirty || saving}
          className="w-full"
        >
          <Save aria-hidden="true" />
          {saving ? "Saving…" : "Save to project"}
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setCopyMessage("");
              onRevert();
            }}
            disabled={!dirty || saving}
            className="flex-1"
          >
            <RotateCcw aria-hidden="true" />
            Revert
          </Button>
          <Button variant="ghost" onClick={copySettings} className="flex-1">
            <Copy aria-hidden="true" />
            Copy values
          </Button>
        </div>
        <p
          role="status"
          className="min-h-4 text-xs leading-relaxed text-muted-foreground"
        >
          {copyMessage ||
            message ||
            "Saving updates the local project. It does not publish."}
        </p>
      </div>
    </aside>
  );
}
