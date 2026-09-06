export type CategoryId =
  | "social"
  | "onchain"
  | "research"
  | "testing"
  | "sourcing"
  | "content"
  | "growth";

export type Category = {
  id: CategoryId;
  label: string;
};

export const categories: Category[] = [
  { id: "social", label: "Social & Community" },
  { id: "onchain", label: "On-chain" },
  { id: "research", label: "Research" },
  { id: "testing", label: "Testing & QA" },
  { id: "sourcing", label: "Lists & Sourcing" },
  { id: "content", label: "Content" },
  { id: "growth", label: "Growth" },
];

export type FieldType = "text" | "url" | "textarea" | "money" | "int" | "select";

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  /** The validation rule. Shown under the input, and quoted verbatim in the ask block. */
  help?: string;
  options?: { value: string; label: string }[];
};

/** How the delivery gets verified. Drives the settle prompt. */
export type ProofType = "url" | "digest" | "handle" | "text" | "evidence";

export type Card = {
  id: string;
  category: CategoryId;
  /** Row label in the catalog. */
  name: string;
  /** Job title as it appears on the public board. */
  title: string;
  blurb: string;
  postingMode: "single" | "batch";
  proofType: ProofType;
  /** Brief body with {{key}} slots. Posted verbatim. */
  brief: string;
  /** Card-specific fields. The four common ones are added by the compiler. */
  fields: Field[];
  /** Extra checks the settle prompt should run for this job shape. */
  settleChecks: string[];
};

export type Values = Record<string, string>;

export type Tab = "post" | "settle" | "both";
