import { useEffect, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "../components/kit";
import type { SearchResult } from "./contracts";

const storageKey = "blueprint.search-feedback.v1";
const maxEntries = 50;
const maxNoteLength = 400;

type Feedback = {
  query: string;
  expectedExperimentId: string;
  note: string;
  model: string;
  catalogVersion: string;
  savedAt: string;
};

type FeedbackStore = { entries: Feedback[]; unreadable: boolean };

export type SearchFeedbackProps = {
  query: string;
  result: SearchResult;
  experiments: readonly {
    id: string;
    title: string;
    sourceName: string;
  }[];
};

function boundedString(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function readFeedback(): FeedbackStore {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return { entries: [], unreadable: false };
    if (stored.length > 200_000) throw new Error("Feedback is too large");
    const parsed: unknown = JSON.parse(stored);
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("version" in parsed) ||
      parsed.version !== 1 ||
      !("entries" in parsed) ||
      !Array.isArray(parsed.entries)
    )
      throw new Error("Unknown feedback format");

    const entries: Feedback[] = [];
    for (const value of parsed.entries.slice(0, maxEntries)) {
      if (!value || typeof value !== "object") continue;
      const entry: Feedback = {
        query: boundedString(value.query, 300),
        expectedExperimentId: boundedString(value.expectedExperimentId, 160),
        note: boundedString(value.note, maxNoteLength),
        model: boundedString(value.model, 100),
        catalogVersion: boundedString(value.catalogVersion, 160),
        savedAt: boundedString(value.savedAt, 30),
      };
      if (
        entry.query &&
        entry.expectedExperimentId &&
        entry.model &&
        entry.catalogVersion &&
        Number.isFinite(Date.parse(entry.savedAt))
      )
        entries.push(entry);
    }
    return { entries, unreadable: false };
  } catch {
    return { entries: [], unreadable: true };
  }
}

/** Nothing is saved until the user explicitly submits a suggestion. */
export function SearchFeedback({
  query,
  result,
  experiments,
}: SearchFeedbackProps) {
  const id = useId();
  const [expectedId, setExpectedId] = useState("");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState<FeedbackStore>(readFeedback);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setExpectedId("");
    setNote("");
    setMessage("");
  }, [query, result.model, result.catalogVersion]);

  const canSave = Boolean(
    query.trim() && experiments.some(({ id }) => id === expectedId),
  );

  function saveFeedback() {
    if (!canSave) return;
    const current = readFeedback();
    if (current.unreadable) {
      setSaved(current);
      setMessage(
        "This browser couldn’t read saved feedback. Your note is still here.",
      );
      return;
    }
    const entry: Feedback = {
      query: boundedString(query, 300),
      expectedExperimentId: boundedString(expectedId, 160),
      note: boundedString(note, maxNoteLength),
      model: boundedString(result.model, 100),
      catalogVersion: boundedString(result.catalogVersion, 160),
      savedAt: new Date().toISOString(),
    };
    const entries = [entry, ...current.entries].slice(0, maxEntries);
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ version: 1, entries }),
      );
      setSaved({ entries, unreadable: false });
      setExpectedId("");
      setNote("");
      setMessage("Feedback saved in this browser.");
    } catch {
      setMessage(
        "This browser couldn’t save feedback. Your note is still here.",
      );
    }
  }

  function clearFeedback() {
    try {
      window.localStorage.removeItem(storageKey);
      setSaved({ entries: [], unreadable: false });
      setMessage("Saved feedback cleared.");
    } catch {
      setMessage("This browser couldn’t clear saved feedback.");
    }
  }

  function downloadFeedback() {
    let url: string | undefined;
    try {
      const file = new Blob(
        [JSON.stringify({ version: 1, entries: saved.entries }, null, 2)],
        { type: "application/json" },
      );
      url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "blueprint-search-feedback.json";
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      setMessage("Download started.");
    } catch {
      setMessage("The download couldn’t start. Please try again.");
    } finally {
      if (url) {
        const downloadUrl = url;
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1_000);
      }
    }
  }

  return (
    <details className="group/feedback mt-6 min-w-0 text-sm">
      <summary className="flex min-h-11 w-fit max-w-full list-none items-center gap-2 rounded-sm text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
        Missing a result?
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 group-open/feedback:rotate-180"
        />
      </summary>
      <div className="mt-2 max-w-xl space-y-4 rounded-md border border-border bg-surface-sunken p-4 text-foreground">
        <p id={`${id}-privacy`} className="text-muted-foreground">
          Save the search and your suggestion in this browser. Download saved
          feedback when you want it reviewed.
        </p>
        <div className="space-y-2">
          <Label htmlFor={`${id}-expected`}>Expected experiment</Label>
          <Select value={expectedId} onValueChange={setExpectedId}>
            <SelectTrigger
              id={`${id}-expected`}
              className="w-full"
              aria-describedby={`${id}-privacy`}
            >
              <SelectValue placeholder="Choose an experiment" />
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]">
              {experiments.map((experiment) => (
                <SelectItem key={experiment.id} value={experiment.id}>
                  {experiment.sourceName} — {experiment.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-note`}>Note (optional)</Label>
          <Textarea
            id={`${id}-note`}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            maxLength={maxNoteLength}
            rows={3}
            placeholder="What did you expect to find?"
          />
        </div>
        <Button onClick={saveFeedback} disabled={!canSave} size="sm">
          Save feedback
        </Button>
        <p role="status" className="text-muted-foreground empty:hidden">
          {message ||
            (saved.unreadable
              ? "Saved feedback couldn’t be read in this browser."
              : "")}
        </p>
        {(saved.entries.length > 0 || saved.unreadable) && (
          <div className="space-y-2 border-t border-border pt-3">
            {saved.entries.length > 0 && (
              <p className="text-muted-foreground">
                {saved.entries.length} saved. Keeps the latest {maxEntries}.
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {saved.entries.length > 0 && (
                <Button onClick={downloadFeedback} variant="outline" size="sm">
                  Download feedback
                </Button>
              )}
              <Button onClick={clearFeedback} variant="ghost" size="sm">
                Clear saved feedback
              </Button>
            </div>
          </div>
        )}
      </div>
    </details>
  );
}
