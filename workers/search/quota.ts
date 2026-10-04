import { SearchError } from "../../scripts/search-core.ts";
import type { SearchStorage } from "./runtime.ts";

const MINUTE = 60_000;
const DAY = 86_400_000;
const MAX_COUNTERS = 4097;

export class SearchLimitError extends SearchError {
  readonly retryAfter: number;
  constructor(code: string, message: string, retryAfter: number) {
    super(429, code, message);
    this.retryAfter = Math.max(1, Math.ceil(retryAfter));
  }
}

export function dailyLimit(value?: string): number {
  if (value === undefined) return 100;
  const limit = Number(value);
  // A malformed setting fails closed instead of silently removing the cap.
  if (
    !/^\d+$/.test(value) ||
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > 1000
  )
    throw new SearchError(
      503,
      "configuration_error",
      "Jev Search needs a configuration update. Use keyword search for now.",
    );
  return limit;
}

/** All instances use one named Durable Object: counters are global, not per edge. */
export class SearchQuota {
  readonly storage: SearchStorage;
  readonly limit: number;
  constructor(storage: SearchStorage, limit: number) {
    this.storage = storage;
    this.limit = limit;
    storage.sql.exec(
      "CREATE TABLE IF NOT EXISTS counters (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL)",
    );
  }

  cleanup(now: number): void {
    this.storage.sql.exec("DELETE FROM counters WHERE expires_at <= ?", now);
  }

  nextExpiry(): number | undefined {
    return (
      this.storage.sql
        .exec<{ expiry: number | null }>(
          "SELECT MIN(expires_at) AS expiry FROM counters",
        )
        .toArray()[0]?.expiry ?? undefined
    );
  }

  private count(key: string): number {
    return (
      this.storage.sql
        .exec<{ count: number }>(
          "SELECT count FROM counters WHERE key = ?",
          key,
        )
        .toArray()[0]?.count ?? 0
    );
  }

  private increment(key: string, expiresAt: number): void {
    this.storage.sql.exec(
      "INSERT INTO counters (key, count, expires_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count = count + 1",
      key,
      expiresAt,
    );
  }

  admitClient(client: string, now: number): void {
    if (!/^[a-f0-9]{64}$/.test(client))
      throw new SearchError(
        403,
        "client_unavailable",
        "Search could not verify this connection.",
      );
    this.storage.transactionSync(() => {
      this.cleanup(now);
      const minuteEnd = (Math.floor(now / MINUTE) + 1) * MINUTE;
      const dayEnd = (Math.floor(now / DAY) + 1) * DAY;
      const minuteKey = `minute:${client}:${minuteEnd}`;
      const dayKey = `client:${client}:${dayEnd}`;
      const minuteCount = this.count(minuteKey);
      const dayCount = this.count(dayKey);
      if (minuteCount >= 6)
        throw new SearchLimitError(
          "client_rate_limit",
          "Please wait a minute before searching again. Keyword search is still available.",
          (minuteEnd - now) / 1000,
        );
      if (dayCount >= 30)
        throw new SearchLimitError(
          "client_daily_limit",
          "You have reached today's Jev Search limit. Keyword search is still available.",
          (dayEnd - now) / 1000,
        );
      const rows = this.storage.sql
        .exec<{ count: number }>("SELECT COUNT(*) AS count FROM counters")
        .toArray()[0].count;
      if (
        rows + Number(minuteCount === 0) + Number(dayCount === 0) >
        MAX_COUNTERS
      )
        throw new SearchLimitError(
          "search_capacity",
          "Jev Search is busy. Try again later or use keyword search.",
          60,
        );
      this.increment(minuteKey, minuteEnd);
      this.increment(dayKey, dayEnd);
    });
  }

  /** Must be called immediately before EVERY external fetch, including retries. */
  reserveUpstream(now: number): void {
    this.storage.transactionSync(() => {
      this.cleanup(now);
      const dayEnd = (Math.floor(now / DAY) + 1) * DAY;
      const key = `upstream:${dayEnd}`;
      if (this.count(key) >= this.limit)
        throw new SearchLimitError(
          "daily_limit",
          "Jev Search has reached today's shared limit. Keyword search is still available.",
          (dayEnd - now) / 1000,
        );
      this.increment(key, dayEnd);
    });
  }
}
