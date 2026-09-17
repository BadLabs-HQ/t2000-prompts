export type CategoryId =
  | "social"
  | "onchain"
  | "research"
  | "testing"
  | "sourcing"
  | "content"
  | "design"
  | "dev"
  | "data"
  | "support"
  | "events"
  | "local"
  | "growth"
  | "onboarding"
  | "meme-social"
  | "meme-community"
  | "meme-creative"
  | "meme-events"
  | "meme-contests"
  | "meme-culture"
  | "meme-listings"
  | "meme-safety"
  | "meme-guides"
  | "meme-token";

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
  { id: "design", label: "Design" },
  { id: "dev", label: "Dev" },
  { id: "data", label: "Data" },
  { id: "support", label: "Support" },
  { id: "events", label: "Events" },
  { id: "local", label: "Local" },
  { id: "growth", label: "Growth" },
  { id: "onboarding", label: "Onboarding" },
];

export const memeCategories: Category[] = [
  { id: "meme-social", label: "Social" },
  { id: "meme-community", label: "Community" },
  { id: "meme-creative", label: "Creative" },
  { id: "meme-events", label: "Events" },
  { id: "meme-contests", label: "Contests" },
  { id: "meme-culture", label: "Culture" },
  { id: "meme-listings", label: "Listings" },
  { id: "meme-safety", label: "Safety" },
  { id: "meme-guides", label: "Guides" },
  { id: "meme-token", label: "Token" },
];

export const categoryLabel = (id: CategoryId): string =>
  [...categories, ...memeCategories].find((c) => c.id === id)?.label ?? id;

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

/** What a buyer will be checking at settle. Shown on each catalog row. */
export const proofLabels: Record<ProofType, string> = {
  url: "public link",
  digest: "on-chain tx",
  handle: "handle",
  text: "written answer",
  evidence: "evidence",
};

export type Card = {
  id: string;
  category: CategoryId;
  /** Row label in the catalog. */
  name: string;
  /** Job title as it appears on the public board. */
  title: string;
  blurb: string;
  postingMode: "single" | "batch";
  /** Remote unless set. On site jobs need a "where" field. */
  mode?: "remote" | "on-site";
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
