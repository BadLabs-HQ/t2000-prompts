"use client";

import { useState } from "react";
import { cardById } from "@/lib/cards";
import { compilePost, missingFields } from "@/lib/compile";
import type { Values } from "@/lib/types";

const card = cardById("like-rt-comment")!;

/** Real compiler output, not a mockup. Whatever the compiler does on the
 *  catalog is what this shows. */
const STATES: { id: string; label: string; note: string; values: Values }[] = [
  {
    id: "empty",
    label: "Nothing filled",
    note: "Reads as a guided interview. Every field, with its rule.",
    values: {},
  },
  {
    id: "partial",
    label: "Partly filled",
    note: "The ask block shrinks to only what is still missing.",
    values: {
      postUrl: "https://x.com/funkii/status/2096376467794145607",
      slots: "10",
    },
  },
  {
    id: "full",
    label: "Fully filled",
    note: "A direct command. Nothing left to ask about.",
    values: {
      postUrl: "https://x.com/funkii/status/2096376467794145607",
      price: "0.20",
      slots: "10",
      sla: "12",
      trust: "open",
    },
  },
];

export function PromptStates() {
  const [active, setActive] = useState(1);
  const state = STATES[active];
  const prompt = compilePost(card, state.values);
  const missing = missingFields(card, state.values).length;

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-paper shadow-card">
      <div role="tablist" className="flex border-b border-hairline">
        {STATES.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`relative flex-1 px-3 py-3 text-[12.5px] font-medium transition ${
                on ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {s.label}
              {on ? (
                <span
                  aria-hidden
                  className="absolute inset-x-3 -bottom-px h-px bg-ink"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="flex items-baseline justify-between gap-4 border-b border-hairline px-4 py-2.5">
        <p className="text-[12.5px] text-muted">{state.note}</p>
        <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted">
          {missing === 0 ? "0 blanks" : `${missing} blank${missing === 1 ? "" : "s"}`}
        </span>
      </div>

      <div className="max-h-[340px] overflow-auto overscroll-contain bg-subtle">
        <pre className="whitespace-pre px-4 py-3 font-mono text-[11.5px] leading-[1.6] text-ink">
          <code>{prompt}</code>
        </pre>
      </div>
    </div>
  );
}
