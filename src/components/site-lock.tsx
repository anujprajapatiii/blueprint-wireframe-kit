import { LockKeyhole } from "lucide-react";
import { Button } from "./kit";

export function SiteLock() {
  if (import.meta.env.VITE_PRIVATE_REFERENCES_ENABLED !== "true") return null;
  return (
    <form method="post" action="/logout">
      <Button type="submit" variant="outline" size="sm" aria-label="Lock site">
        <LockKeyhole aria-hidden="true" />
        <span className="sr-only sm:not-sr-only">Lock site</span>
      </Button>
    </form>
  );
}
