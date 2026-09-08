"use client";

import { useEffect, useMemo, useState } from "react";
import { cards } from "@/lib/cards";
import { categories, proofLabels, type CategoryId } from "@/lib/types";
import { JobPanel } from "./JobPanel";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";

const RAIL_KEY = "t2000:rail:expanded";

const STOPWORDS = new Set([
  "and", "the", "for", "with", "you", "your", "from", "that", "this", "have",
  "get", "want", "need", "some", "who", "can", "will", "them", "their", "are",
  "how", "one", "job", "jobs", "please", "would", "someone", "there",
]);

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

  // The open job lives in the URL, so a card can be linked and shared.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      setOpenId(cards.some((c) => c.id === id) ? id : null);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  function show(id: string | null) {
    setOpenId(id);
    const url = id ? `#${id}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }

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
      if (e.key === "Escape") show(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  const visible = useMemo(() => {
    const inFilter =
      filter === "all" ? cards : cards.filter((c) => c.category === filter);

    const words = query
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w));

    if (words.length === 0) return inFilter;

    // The box invites a sentence, so score on words rather than matching the
    // whole string, "get people to join my telegram" matches nothing verbatim.
    return inFilter
      .map((c) => {
        const label =
          categories.find((cat) => cat.id === c.category)?.label ?? "";
        const strong = `${c.name} ${c.blurb} ${label}`.toLowerCase();
        const all = `${strong} ${c.title} ${c.brief}`.toLowerCase();
        let score = 0;
        for (const w of words) {
          if (strong.includes(w)) score += 3;
          else if (all.includes(w)) score += 1;
        }
        return { c, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.c);
  }, [query, filter]);

  const searching = query.trim().length > 0;

  // Ranked results are ordered by match quality, so regrouping them by
  // category would throw that away. Sections are for browsing only.
  const grouped = searching
    ? [{ cat: { id: "results", label: "Best match first" }, items: visible }]
    : categories
        .map((cat) => ({
          cat,
          items: visible.filter((c) => c.category === cat.id),
        }))
        .filter((g) => g.items.length > 0);

  const open = cards.find((c) => c.id === openId) ?? null;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-hairline bg-paper">
        <TopNav />

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
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={expanded}
            title={expanded ? "Collapse" : "Expand"}
            className={`mb-2 flex h-8 items-center gap-2 rounded-md text-muted transition hover:bg-subtle hover:text-ink ${
              expanded ? "px-2.5" : "justify-center px-0"
            }`}
          >
            <ToggleIcon
              expanded={expanded}
              className="h-[17px] w-[17px] shrink-0"
            />
            <span
              className={`overflow-hidden whitespace-nowrap font-mono text-[10.5px] uppercase tracking-wider transition-[opacity,max-width] duration-200 ${
                expanded ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              Browse
            </span>
          </button>

          <RailItem
            label="All jobs"
            count={cards.length}
            active={filter === "all"}
            expanded={expanded}
            onClick={() => setFilter("all")}
          />

          {expanded ? (
            <p className="mb-1 mt-4 px-2.5 font-mono text-[10.5px] uppercase tracking-wider text-muted">
              Categories
            </p>
          ) : (
            <div role="separator" className="my-1.5 h-px bg-hairline" />
          )}

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

          <div
            className={`mt-auto pt-3 ${expanded ? "px-2.5" : "text-center"}`}
          >
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted">
              {expanded ? "BadLabs" : "BL"}
            </span>
          </div>
        </nav>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">
          <div className="rounded-xl border border-hairline bg-subtle p-4">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={2}
              placeholder="Describe what you need done, e.g. “get 20 people to join my Telegram and prove it”"
              className="w-full resize-none bg-transparent text-[14px] leading-relaxed text-ink outline-none placeholder:text-muted/80"
            />
            {query.trim() ? (
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-muted">
                  {visible.length} match
                </span>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="shrink-0 rounded-md border border-hairline bg-paper px-2.5 py-1 font-mono text-[11px] text-muted transition hover:border-ink hover:text-ink"
                >
                  Clear
                </button>
              </div>
            ) : null}
          </div>

          <p className="mt-5 max-w-[62ch] text-[13.5px] leading-relaxed text-muted">
            Pick a job, fill in what you know, copy the prompt. Blanks are
            fine. The prompt carries instructions for your AI to ask you for
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
                        onClick={() => show(c.id)}
                        className="group flex w-full items-baseline gap-3 rounded-md px-2 py-1.5 text-left transition hover:bg-subtle"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hairline transition group-hover:bg-ink"
                        />
                        <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink">
                          {c.name}
                        </span>
                        <span className="shrink-0 font-mono text-[10.5px] text-muted opacity-0 transition group-hover:opacity-100">
                          {proofLabels[c.proofType]}
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

        </main>
      </div>

      <Footer />

      {open ? (
        <>
          <div
            aria-hidden
            onClick={() => show(null)}
            className="fixed inset-0 z-30 bg-ink/10"
          />
          <div className="fixed inset-y-0 right-0 z-40 w-full max-w-[580px] shadow-cardHover">
            <JobPanel card={open} onClose={() => show(null)} />
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
