export type SearchManifest = {
  catalogVersion: string;
  catalogCount: number;
  promptVersion: string;
};

export type SearchStatus = SearchManifest & {
  configured: boolean;
  model: string;
};

export type SearchResult = SearchManifest & {
  query: string;
  model: string;
  /** Probability that this is a meaningful match; not measured design impact. */
  matches: { id: string; score: number }[];
  usage?: { input_tokens?: number; output_tokens?: number };
};

export type SearchEntry = {
  id: string;
  title: string;
  summary: string;
  sourceName: string;
  type: string;
  focus: string[];
  goals: string[];
  mechanisms: string[];
  format: string;
};
