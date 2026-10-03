export type TuningValues = Record<string, string | number>;
export interface TuningOption {
  value: string | number;
  label: string;
  token: string;
  resolved: string;
  utility?: string;
  swatch?: string;
}
export type TuningField = {
  key: string;
  label: string;
  group: string;
} & (
  | { kind: "token"; options: TuningOption[] }
  | {
      kind: "number";
      min: number;
      max: number;
      step: number;
      unit: string;
      note: string;
    }
);
