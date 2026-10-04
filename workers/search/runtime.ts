/** Narrow structural types for the Cloudflare APIs this Worker actually uses. */
export interface SqlStorage {
  exec<T extends Record<string, unknown> = Record<string, unknown>>(
    query: string,
    ...bindings: (string | number | null)[]
  ): { toArray(): T[] };
}

export interface SearchStorage {
  sql: SqlStorage;
  transactionSync<T>(callback: () => T): T;
  setAlarm(time: number): Promise<void>;
}

export interface SearchState {
  storage: SearchStorage;
}

export interface SearchEnv {
  TYPESAFE_API_KEY?: string;
  TYPESAFE_MODEL?: string;
  DAILY_UPSTREAM_LIMIT?: string;
  SEARCH_COORDINATOR: {
    idFromName(name: string): unknown;
    get(id: unknown): { fetch(request: Request): Promise<Response> };
  };
}
