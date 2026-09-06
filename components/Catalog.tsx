"use client";

import { useMemo, useState } from "react";
import { cards } from "@/lib/cards";
import { categories, type CategoryId } from "@/lib/types";
import { JobPanel } from "./JobPanel";

export function Catalog() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [openId, setOpenId] = useState<string | null>("like-rt-comment");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter((c) => {
      if (filter !== "all" && c.category !== filter) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.blurb.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  const grouped = categories
    .map((cat) => ({
      cat,
      items: visible.filter((c) => c.category === cat.id),
    }))
    .filter((g) => g.items.length > 0);

  const open = cards.find((c) => c.id === openId) ?? null;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-hairline bg-paper">
        <div className="flex h-14 items-center gap-4 px-5">
          <div className="flex items-baseline gap-2">
            <span className="text-[14px] font-medium text-ink">
              t2000 prompts
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              BadLabs
            </span>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs — engagement, research, testing, leads…"
            className="ml-2 w-full max-w-md rounded-md border border-hairline bg-paper px-3 py-1.5 text-[13px] text-ink outline-none transition placeholder:text-muted/70 focus:border-ink"
          />
          <span className="ml-auto hidden font-mono text-[11px] text-muted sm:block">
            {cards.length} jobs
          </span>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <nav
          aria-label="Categories"
          className="hidden w-52 shrink-0 border-r border-hairline px-2 py-3 md:block"
        >
          <RailItem
            label="All jobs"
            count={cards.length}
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <div role="separator" className="my-1.5 h-px bg-hairline" />
          {categories.map((cat) => {
            const count = cards.filter((c) => c.category === cat.id).length;
            if (count === 0) return null;
            return (
              <RailItem
                key={cat.id}
                label={cat.label}
                count={count}
                active={filter === cat.id}
                onClick={() => setFilter(cat.id)}
              />
            );
          })}
        </nav>

        <main className="min-w-0 flex-1 overflow-y-auto px-6 py-6">
          <p className="max-w-[62ch] text-[13.5px] leading-relaxed text-muted">
            Pick a job, fill in what you know, copy the prompt. Blanks are fine
            — the prompt carries instructions for your AI to ask you for
            anything you left out. Nothing here touches your wallet.
          </p>

          <div className="mt-7 flex flex-col gap-7">
            {grouped.map(({ cat, items }) => (
              <section key={cat.id}>
                <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {cat.label}
                </h2>
                <ul className="mt-2.5 grid grid-cols-1 gap-x-8 gap-y-0.5 lg:grid-cols-2">
                  {items.map((c) => {
                    const active = c.id === openId;
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          onClick={() => setOpenId(c.id)}
                          className={`group flex w-full items-baseline gap-3 rounded-md px-2 py-1.5 text-left transition ${
                            active ? "bg-subtle" : "hover:bg-subtle"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition ${
                              active ? "bg-ink" : "bg-hairline group-hover:bg-muted"
                            }`}
                          />
                          <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink">
                            {c.name}
                          </span>
                          <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted">
                            {c.priceBand.split(" to ")[0]}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}

            {grouped.length === 0 ? (
              <p className="text-[13px] text-muted">
                Nothing matches “{query}”. Try engagement, research, testing, or
                leads.
              </p>
            ) : null}
          </div>

          <p className="mt-10 font-mono text-[11px] text-muted">
            Escrow, deadlines and the review window are on-chain clocks. Read
            the brief before you post — it is public.
          </p>
        </main>

        {open ? (
          <div className="fixed inset-y-0 right-0 z-30 w-full max-w-[580px] shadow-cardHover xl:static xl:z-auto xl:w-[580px] xl:shadow-none">
            <JobPanel card={open} onClose={() => setOpenId(null)} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function RailItem({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-8 w-full items-center gap-2 rounded-md px-2.5 text-[13px] transition ${
        active ? "bg-subtle text-ink" : "text-muted hover:bg-subtle hover:text-ink"
      }`}
    >
      <span className="min-w-0 flex-1 truncate text-left">{label}</span>
      <span className="font-mono text-[11px] tabular-nums text-muted">
        {count}
      </span>
    </button>
  );
}
