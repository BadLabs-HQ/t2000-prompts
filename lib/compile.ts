import { commonFields, commonFieldsSingle } from "./cards";
import type { Card, Field, Tab, Values } from "./types";

const RULE = "──────────────────────────────────────";

/** Card-specific fields first, then the four every job needs. */
export function allFields(card: Card): Field[] {
  const common =
    card.postingMode === "batch" ? commonFields : commonFieldsSingle;
  return [...card.fields, ...common];
}

/** Nothing is seeded. Every value is the buyer's to supply. */
export function emptyValues(): Values {
  return {};
}

function has(values: Values, key: string): boolean {
  return typeof values[key] === "string" && values[key].trim() !== "";
}

export function missingFields(card: Card, values: Values): Field[] {
  return allFields(card).filter((f) => !has(values, f.key));
}

/** Substitute {{key}}. Anything still missing renders as an uppercase marker. */
function fill(template: string, card: Card, values: Values): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_m, key: string) => {
    if (has(values, key)) return values[key].trim();
    const field = allFields(card).find((f) => f.key === key);
    return `<${(field?.label ?? key).toUpperCase()}>`;
  });
}

export function jobTitle(card: Card, values: Values): string {
  return fill(card.title, card, values);
}

export function jobBrief(card: Card, values: Values): string {
  return fill(card.brief, card, values);
}

function indent(text: string, spaces = 2): string {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => (line.trim() === "" ? "" : pad + line))
    .join("\n");
}

export function totalEscrow(card: Card, values: Values): number | null {
  const price = Number(values.price);
  if (!Number.isFinite(price) || price <= 0) return null;
  if (card.postingMode === "single") return price;
  const slots = Number(values.slots);
  if (!Number.isInteger(slots) || slots <= 0) return null;
  return Math.round(price * slots * 100) / 100;
}

function money(n: number): string {
  return "$" + n.toFixed(2);
}

function askBlock(card: Card, values: Values): string[] {
  const missing = missingFields(card, values);
  if (missing.length === 0) return [];

  const lines: string[] = [
    "BEFORE YOU START — I HAVE NOT GIVEN YOU EVERYTHING",
    "",
    "Ask me for each item below in ONE message, not one at a time. Do not",
    "guess, do not fall back to defaults, and do not call a single tool",
    "until I have answered all of them.",
    "",
  ];

  missing.forEach((f, i) => {
    lines.push(`  ${i + 1}. ${f.label.toUpperCase()}`);
    if (f.help) {
      wrap(f.help, 66).forEach((l) => lines.push(`     ${l}`));
    }
    if (f.options) {
      lines.push(`     Options: ${f.options.map((o) => o.value).join(" · ")}`);
    }
    lines.push("");
  });

  lines.push("Echo them back to me as a short list before moving on.");
  lines.push("");
  lines.push(RULE);
  lines.push("");
  return lines;
}

function wrap(text: string, width: number): string[] {
  const words = text.split(/\s+/);
  const out: string[] = [];
  let line = "";
  for (const w of words) {
    if (line.length + w.length + 1 > width && line !== "") {
      out.push(line);
      line = w;
    } else {
      line = line === "" ? w : line + " " + w;
    }
  }
  if (line) out.push(line);
  return out;
}

function paramTable(card: Card, values: Values): string[] {
  const rows: [string, string][] = [["maxUsdc", values.price || "<BUDGET>"]];
  if (card.postingMode === "batch") {
    rows.push(["slots", values.slots || "<HOW MANY>"]);
  }
  rows.push(["slaHours", values.sla || "<DEADLINE>"]);
  rows.push(["openHours", "24"]);
  rows.push(["trustRequirement", values.trust || "<WHO CAN CLAIM>"]);
  if (card.postingMode === "batch") {
    rows.push(["maxClaimsPerAgent", "1"]);
  }
  const width = Math.max(...rows.map((r) => r[0].length)) + 2;
  return rows.map(([k, v]) => k.padEnd(width) + v);
}

export function compilePost(card: Card, values: Values): string {
  const batch = card.postingMode === "batch";
  const tool = batch ? "t2000_job_batch_open" : "t2000_job_open";
  const total = totalEscrow(card, values);
  const spend = total === null ? "SPENDS the total below" : `SPENDS ${money(total)}`;
  const totalPhrase =
    total === null
      ? "slots × maxUsdc"
      : `slots × maxUsdc = ${money(total)}`;

  const out: string[] = [
    "POST A JOB ON T2000",
    "",
    "You are posting a paid job to the t2000 public board on my behalf using",
    "the t2000 MCP tools on this session. USDC escrows on-chain the moment you",
    "post. Read all of this before calling anything.",
    "",
    "TOOL SEQUENCE — run in this order, nothing else",
    "  1. t2000_address          free read",
    "  2. t2000_balance          free read",
    "  3. t2000_limit            free read",
    "  4. HALT — show the draft, wait for me to say GO",
    `  5. ${tool.padEnd(23)}${spend}`,
    "",
    RULE,
    "",
    ...askBlock(card, values),
    "title",
    indent(jobTitle(card, values)),
    "",
    "brief",
    indent(jobBrief(card, values)),
    "",
    ...paramTable(card, values),
    "",
    RULE,
    "",
    "AT THE HALT",
    "  Print: passport, spendable USDC, session limits, total cost.",
    "  Then print the title and brief above in a code block, exactly as it",
    "  will read on the board.",
    "  Then wait for GO.",
    "",
    "RULES",
  ];

  if (batch) {
    out.push("- ONE call. Not one per person.");
    out.push(`- maxUsdc is PER JOB. Total escrow is ${totalPhrase}.`);
  } else {
    out.push(`- ONE call. Total escrow is ${total === null ? "maxUsdc" : money(total)}.`);
  }

  out.push(
    "- The per-job limit is checked against maxUsdc, NOT against the total.",
    "  The total is checked against spendable balance and the daily limit."
  );

  if (batch) {
    out.push(
      "- maxClaimsPerAgent 1 is what limits one agent to one slot. Keep it at 1."
    );
  }

  out.push(
    "- Post the brief verbatim. Do not reword it, do not add fields.",
    "- Never pass claimPolicy, minSellerLevel or proven. Removed, any value",
    "  is refused.",
    "",
    "IF SOMETHING GOES WRONG",
    "- TIMEOUT OR NO RESULT: do NOT call again. A second post escrows a",
    `  SECOND ${total === null ? "budget" : money(total)}. Call t2000_jobs { "role": "buyer" },`,
    "  read openings[]. Present → it worked, report it. Absent → tell me",
    "  before retrying.",
    "- 429: response carries Retry-After, about 60s. Wait, retry ONCE, stop.",
    "  Never post in parallel. Never loop on a 429.",
    "- REFUSED FOR LIMITS: report the exact refusal text and",
    "  https://t2000.ai/manage/connections. Do not split the batch to get",
    "  under a cap.",
    "- NOT ENOUGH BALANCE: report the shortfall. Do not reduce slots to fit.",
    "",
    "REPORT",
    batch ? "  batchId" : "  openingId",
    "  total escrowed",
    batch ? "  slots live" : "  status",
    "  board window closes",
    `  https://t2000.ai/jobs/<${batch ? "batchId" : "openingId"}>`
  );

  return out.join("\n");
}

export function compileSettle(card: Card, values: Values): string {
  const out: string[] = [
    "SETTLE DELIVERIES ON T2000",
    "",
    "You are grading work I paid for and releasing or refusing the money.",
    "Settling is irreversible. Rejecting on an open board job returns 100%",
    "to me, so junk earns nothing.",
    "",
    "TOOL SEQUENCE",
    '  1. t2000_jobs { "needsOnly": true, "role": "buyer" }',
    "  2. t2000_job_refund     for any funded row past its deadline",
    "  3. t2000_job_status     on each delivered row",
    "  4. t2000_job_settle     or t2000_job_reject",
    "  5. t2000_job_review     stars, on every graded row",
    "",
    RULE,
    "",
    "STEP 1 — LOAD THE QUEUE",
    '  Call t2000_jobs with BOTH needsOnly: true AND role: "buyer".',
    "  The role is mandatory. Without it the call can report work waiting",
    "  and hand you an empty list.",
    "  Grade from the rows themselves, never from the counters.",
    "",
    "STEP 2 — REFUND LAPSED ROWS FIRST",
    "  Any row still funded with its deliver deadline passed:",
    "  t2000_job_refund { jobId }. Full amount, fee-free.",
    "  Do this before touching delivered rows.",
    "",
    "STEP 3 — GRADE EACH DELIVERY",
    "  Oldest review window first. A lapsed window auto-releases to the",
    "  worker whatever the quality, so clock order beats list order.",
    "",
    "  t2000_job_status { jobId } returns the work order AND the delivery.",
    "  Read them against each other.",
    "",
    `  For this job — ${jobTitle(card, values)} — check:`,
  ];

  card.settleChecks.forEach((c) => out.push(`    - ${c}`));

  out.push(
    "",
    "  Keep a running list of every proof already paid on this posting.",
    "  A repeat is a reject, not a second payment.",
    "",
    "STEP 4 — SETTLE OR REJECT",
    "  Acceptable  → t2000_job_settle { jobId }",
    "  Junk        → t2000_job_reject { jobId }",
    "",
    "  Do not settle on the delivery text alone. If the brief asked for a",
    "  URL, a digest or an id, verify that artifact actually exists.",
    "",
    "STEP 5 — REVIEW",
    "  t2000_job_review { jobId, stars, text } on every row you graded.",
    "",
    "  5  every done-when met, proof verified, nothing padded",
    "  4  all met, proof thin but checkable",
    "  3  met the letter, missed the intent — settle and say what was missing",
    "  2  partial — reject unless the gap is cosmetic",
    "  1  fabricated, recycled from another claim, or self-dealt",
    "",
    "  My stars land on-chain and drive their trust tier. The text is",
    "  off-chain, 1000 characters max. Say what would have earned a 5.",
    "",
    RULE,
    "",
    "RULES",
    "- A rule change applies to NEW postings only. Anyone who claimed under",
    "  the old brief gets graded on the old brief. To enforce a new gate,",
    "  cancel and repost. Never retro-reject.",
    "- Reviews are optional and never block a settle.",
    "- On a timeout, check t2000_job_status before retrying. If the state",
    "  already moved, do not fire again.",
    "",
    "REPORT",
    "  settled, and the total released",
    "  rejected, with the reason for each",
    "  refunded",
    "  anything left in the queue and why"
  );

  return out.join("\n");
}

export function compileBoth(card: Card, values: Values): string {
  const post = compilePost(card, values);
  const settle = compileSettle(card, values);

  const header = [
    "POST AND SETTLE ON T2000",
    "",
    "Two jobs in one prompt. Money already owed to someone outranks new",
    "inventory, so the queue gets cleared BEFORE anything new is posted.",
    "",
    "Run PASS A first, always. If the queue is empty, say so and move on.",
    "",
    RULE,
    "",
    "PASS A — CLEAR WHAT IS OWED",
    "",
  ].join("\n");

  const seam = [
    "",
    RULE,
    "",
    "PASS B — POST THE NEW JOB",
    "",
    "Only after Pass A is finished. Everything below is a fresh spend and",
    "still stops at the GO gate.",
    "",
  ].join("\n");

  return header + settle + seam + post;
}

export function compile(card: Card, values: Values, tab: Tab): string {
  if (tab === "settle") return compileSettle(card, values);
  if (tab === "both") return compileBoth(card, values);
  return compilePost(card, values);
}
