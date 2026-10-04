import type { ReferenceAsset } from "../experiments/reference-manifest";
import type { GrowthIntent } from "../growth/taxonomy";

/** An observed reference, kept separate from an implemented wireframe. */
export interface CollectionPattern {
  id: string;
  title: string;
  summary: string;
  collectionId: string;
  sourceName: string;
  /** Original addition date in the user's local calendar (YYYY-MM-DD). */
  addedAt: string;
  flow: string;
  flowGroup: string;
  growth: GrowthIntent;
  trigger: string;
  observed: string;
  nextState: string;
  limit: string;
  copy: string[];
  evidenceIds: string[];
  sourceUrl: string;
  relatedUrls?: string[];
}

export interface CollectionEvidence extends ReferenceAsset {
  fileName: string;
  width: number;
  height: number;
  observedAt: string;
  /** Private account screenshots are served only by the local development server. */
  private: boolean;
  /** Checksum of the unmodified original file. */
  sha256: string;
}

export interface CollectionCoverage {
  flow: string;
  observed: string;
  stoppingPoint: string;
  status: string;
}

export interface PatternCollection {
  id: string;
  title: string;
  description: string;
  sourceName: string;
  addedAt: string;
  patterns: CollectionPattern[];
  /** Optional local-only archive, served alongside private reference media. */
  downloadSrc?: string;
  assets: CollectionEvidence[];
  coverage: CollectionCoverage[];
}
