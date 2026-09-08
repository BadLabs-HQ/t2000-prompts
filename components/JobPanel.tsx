"use client";

import { useMemo, useState } from "react";
import type { Card, Tab, Values } from "@/lib/types";
import { categories } from "@/lib/types";
import {
  allFields,
  compile,
  emptyValues,
  missingFields,
  totalEscrow,
} from "@/lib/compile";
import { FieldRow } from "./FieldRow";
import { PromptView } from "./PromptView";

const TABS: { id: Tab; label: string; note: string }[] = [
  { id: "post", label: "Post", note: "Escrows the job and stops." },
  {
    id: "settle",
    label: "Settle",
    note: "Grades what came back, then pays or refuses.",
  },
  {
    id: "both",
    label: "Post + settle",
    note: "Clears anything owed first, then posts.",
  },
];

export function JobPanel({ card, onClose }: { card: Card; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("post");
  const [values, setValues] = useState<Values>(emptyValues);

  const fields = allFields(card);
  const missing = missingFields(card, values);
  const total = totalEscrow(card, values);
  const categoryLabel =
    categories.find((c) => c.id === card.category)?.label ?? card.category;

  const prompt = useMemo(
    () => compile(card, values, tab),
    [card, values, tab]
  );

  const [sent, setSent] = useState(false);

  /** Audric's ?q= prefill truncates at 2000 characters and these prompts run to
   *  3500, so the prompt itself cannot travel in the URL. Audric can fetch a
   *  URL, so it gets a short pointer at /p/<id> instead and reads the full
   *  prompt from there. The clipboard copy is a fallback for the case where
   *  the fetch fails. */
  async function openInAudric() {
    const params = new URLSearchParams({ tab });
    for (const [k, v] of Object.entries(values)) {
      if (v && v.trim() !== "") params.set(k, v.trim());
    }
    const promptUrl = `${window.location.origin}/p/${card.id}?${params}`;
    const instruction =
      `Read ${promptUrl} and follow it exactly, start to finish. ` +
      `It is a t2000 marketplace instruction. Do not skip any step and do ` +
      `not spend anything until it tells you to stop and ask me.`;

    try {
      await navigator.clipboard.writeText(prompt);
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch {
      // clipboard unavailable; the pointer below still carries the prompt
    }

    window.open(
      `https://audric.ai/?q=${encodeURIComponent(instruction)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <aside className="flex h-full w-full flex-col border-l border-hairline bg-paper">
      <header className="flex items-start justify-between gap-4 border-b border-hairline px-5 py-4">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {categoryLabel}
          </p>
          <h2 className="mt-1 text-[16px] font-medium leading-snug text-ink">
            {card.name}
          </h2>
          <p className="mt-1.5 max-w-[46ch] text-[12.5px] leading-snug text-muted">
            {card.blurb}
          </p>
          <p className="mt-2 font-mono text-[11.5px] text-muted">
            {card.postingMode === "batch" ? "many workers" : "one worker"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="shrink-0 rounded-md border border-hairline px-2 py-1 text-[12px] text-muted transition hover:border-ink hover:text-ink"
        >
          Close
        </button>
      </header>

      <div role="tablist" className="flex border-b border-hairline">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`relative flex-1 px-3 py-2.5 text-[12.5px] font-medium transition ${
                active ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
              {active ? (
                <span
                  aria-hidden
                  className="absolute inset-x-3 -bottom-px h-px bg-ink"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <p className="border-b border-hairline px-5 py-2 text-[12px] text-muted">
        {TABS.find((t) => t.id === tab)?.note}
      </p>

      <div className="flex min-h-0 flex-1 flex-col">
        {tab !== "settle" ? (
          <section className="max-h-[236px] shrink-0 overflow-y-auto overscroll-contain border-b border-hairline px-5 py-4">
            <div className="flex flex-col gap-3.5">
              {fields.map((f) => (
                <FieldRow
                  key={f.key}
                  field={f}
                  value={values[f.key] ?? ""}
                  onChange={(v) => setValues((s) => ({ ...s, [f.key]: v }))}
                />
              ))}
            </div>
          </section>
        ) : null}

        {tab !== "settle" ? (
          <div className="flex shrink-0 items-baseline justify-between border-b border-hairline px-5 py-2.5">
            <span className="text-[12px] text-muted">
              {card.postingMode === "batch"
                ? "Escrows on posting, budget × people"
                : "Escrows on posting"}
            </span>
            <span className="font-mono text-[15px] tabular-nums text-ink">
              {total === null ? "·" : `$${total.toFixed(2)}`}
            </span>
          </div>
        ) : null}

        <div className="flex min-h-0 flex-1 flex-col px-5 py-3">
          <PromptView
            text={prompt}
            missingCount={tab === "settle" ? 0 : missing.length}
          />
        </div>
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-hairline px-5 py-3">
        <p className="text-[11.5px] leading-snug text-muted">
          {sent
            ? "Opened in Audric. Also copied, in case you need to paste."
            : "Nothing here touches your wallet. Your AI runs it."}
        </p>
        <button
          type="button"
          onClick={openInAudric}
          className="shrink-0 rounded-md border border-hairline px-3 py-1.5 text-[12px] text-ink transition hover:border-ink"
        >
          Open in Audric ↗
        </button>
      </footer>
    </aside>
  );
}
