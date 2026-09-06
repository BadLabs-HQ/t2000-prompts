"use client";

import { useEffect, useMemo, useState } from "react";
import { cards } from "@/lib/cards";
import { categories, type CategoryId } from "@/lib/types";
import { JobPanel } from "./JobPanel";

const RAIL_KEY = "t2000:rail:expanded";

export function Catalog() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(RAIL_KEY);
    if (stored !== null) setExpanded(stored === "true");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(RAIL_KEY, String(expanded));
  }, [expanded, hydrated]);

  // The panel layers over the page, so the page behind it must not scroll.
  useEffect(() => {
    if (!openId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openId]);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && filter === "all") return cards;
    return cards.filter((c) => {
      if (filter !== "all" && c.category !== filter) return false;
      if (!q) return true;
      const label =
        categories.find((cat) => cat.id === c.category)?.label ?? "";
      return (
        c.name.toLowerCase().includes(q) ||
        c.blurb.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.brief.toLowerCase().includes(q) ||
        label.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  const grouped = categories
    .map((cat) => ({ cat, items: visible.filter((c) => c.category === cat.id) }))
    .filter((g) => g.items.length > 0);

  const open = cards.find((c) => c.id === openId) ?? null;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-hairline bg-paper">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-5">
          <span className="hidden shrink-0 items-baseline gap-2 sm:flex">
            <span className="text-[14px] font-medium text-ink">
              t2000 prompts
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              BadLabs
            </span>
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you need done…"
            className="w-full max-w-md rounded-md border border-hairline bg-paper px-3 py-1.5 text-[13px] text-ink outline-none transition placeholder:text-muted/70 focus:border-ink sm:ml-2"
          />
          <span className="ml-auto hidden shrink-0 font-mono text-[11px] text-muted sm:block">
            {cards.length} jobs
          </span>
        </div>

        <div className="flex gap-1 overflow-x-auto border-t border-hairline px-4 py-2 md:hidden">
          <Chip
            label="All"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          {categories.map((cat) => {
            const count = cards.filter((c) => c.category === cat.id).length;
            if (count === 0) return null;
            return (
              <Chip
                key={cat.id}
                label={cat.label}
                active={filter === cat.id}
                onClick={() => setFilter(cat.id)}
              />
            );
          })}
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <nav
          aria-label="Categories"
          className={`hidden shrink-0 flex-col border-r border-hairline px-2 py-3 transition-[width] duration-200 ease-out md:flex ${
            expanded ? "w-52" : "w-14"
          }`}
        >
          <RailItem
            label="All jobs"
            count={cards.length}
            active={filter === "all"}
            expanded={expanded}
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
                expanded={expanded}
                onClick={() => setFilter(cat.id)}
              />
            );
          })}

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={expanded}
            title={expanded ? undefined : "Expand"}
            className={`mt-auto flex h-9 items-center gap-3 rounded-md text-[13px] text-muted transition hover:bg-subtle hover:text-ink ${
              expanded ? "px-2.5" : "justify-center px-0"
            }`}
          >
            <ToggleIcon
              expanded={expanded}
              className="h-[18px] w-[18px] shrink-0"
            />
            <span
              className={`overflow-hidden whitespace-nowrap transition-[opacity,max-width] duration-200 ${
                expanded ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              Collapse
            </span>
          </button>
        </nav>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">
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
                <ul className="mt-2.5 grid grid-cols-1 gap-x-8 gap-y-0.5 lg:grid-cols-2 2xl:grid-cols-3">
                  {items.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => setOpenId(c.id)}
                        className="group flex w-full items-baseline gap-3 rounded-md px-2 py-1.5 text-left transition hover:bg-subtle"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hairline transition group-hover:bg-ink"
                        />
                        <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink">
                          {c.name}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {grouped.length === 0 ? (
              <p className="text-[13px] text-muted">
                Nothing matches “{query}”. Try engagement, research, testing,
                leads, or on-chain.
              </p>
            ) : null}
          </div>

          <p className="mt-10 font-mono text-[11px] leading-relaxed text-muted">
            Escrow, deadlines and the review window are on-chain clocks. Read
            the brief before you post — it is public.
          </p>
        </main>
      </div>

      {open ? (
        <>
          <div
            aria-hidden
            onClick={() => setOpenId(null)}
            className="fixed inset-0 z-30 bg-ink/10"
          />
          <div className="fixed inset-y-0 right-0 z-40 w-full max-w-[580px] shadow-cardHover">
            <JobPanel card={open} onClose={() => setOpenId(null)} />
          </div>
        </>
      ) : null}
    </div>
  );
}

function ToggleIcon({
  expanded,
  className,
}: {
  expanded: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M9.5 4.5v15" />
      {expanded ? <path d="M15 9l-3 3 3 3" /> : <path d="M13 9l3 3-3 3" />}
    </svg>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-md border px-2.5 py-1 text-[12px] transition ${
        active
          ? "border-ink text-ink"
          : "border-hairline text-muted hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function RailItem({
  label,
  count,
  active,
  expanded,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={expanded ? undefined : `${label} (${count})`}
      className={`flex h-8 w-full items-center gap-2 rounded-md text-[13px] transition ${
        expanded ? "px-2.5" : "justify-center px-0"
      } ${
        active
          ? "bg-subtle text-ink"
          : "text-muted hover:bg-subtle hover:text-ink"
      }`}
    >
      {expanded ? (
        <>
          <span className="min-w-0 flex-1 truncate text-left">{label}</span>
          <span className="font-mono text-[11px] tabular-nums text-muted">
            {count}
          </span>
        </>
      ) : (
        <span className="font-mono text-[11px] tabular-nums">{count}</span>
      )}
    </button>
  );
}
