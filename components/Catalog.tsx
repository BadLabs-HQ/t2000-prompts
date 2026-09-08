"use client";

import { useEffect, useMemo, useState } from "react";
import { cards } from "@/lib/cards";
import { categories, type CategoryId } from "@/lib/types";
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
  const [describe, setDescribe] = useState("");
  const [search, setSearch] = useState("");
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
    window.history.replaceState(null, "", id ? `#${id}` : window.location.pathname);
  }

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
    let out = filter === "all" ? cards : cards.filter((c) => c.category === filter);

    // Describe ranks on intent. The box invites a sentence, so it scores on
    // words rather than matching the whole string.
    const words = describe
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w));

    if (words.length > 0) {
      out = out
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
    }

    // Search is a plain literal narrowing on top.
    const q = search.trim().toLowerCase();
    if (q) out = out.filter((c) => c.name.toLowerCase().includes(q));

    return out;
  }, [describe, search, filter]);

  const ranking = describe.trim().length > 0;
  const grouped = categories
    .map((cat) => ({ cat, items: visible.filter((c) => c.category === cat.id) }))
    .filter((g) => g.items.length > 0);

  const open = cards.find((c) => c.id === openId) ?? null;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-hairline bg-paper">
        <TopNav
          railExpanded={expanded}
          onToggleRail={() => setExpanded((v) => !v)}
        />
      </header>

      <div className="flex min-h-0 flex-1">
        {expanded ? (
          <nav
            aria-label="Categories"
            className="hidden w-52 shrink-0 flex-col border-r border-hairline px-2 py-4 md:flex"
          >
            <p className="mb-1 px-2.5 font-mono text-[10.5px] uppercase tracking-wider text-muted">
              Categories
            </p>
            <RailItem
              label="All jobs"
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            {categories.map((cat) => (
              <RailItem
                key={cat.id}
                label={cat.label}
                active={filter === cat.id}
                onClick={() => setFilter(cat.id)}
              />
            ))}
            <span className="mt-auto px-2.5 pt-3 font-mono text-[10.5px] uppercase tracking-wider text-muted">
              BadLabs
            </span>
          </nav>
        ) : null}

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="w-full rounded-xl border border-hairline bg-subtle p-4 text-left">
              <textarea
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
                rows={2}
                placeholder="Describe what you need done, e.g. “get 20 people to join my Telegram and prove it”"
                className="w-full resize-none bg-transparent text-center text-[14px] leading-relaxed text-ink outline-none placeholder:text-muted/80"
              />
            </div>

            <label className="mt-3 flex w-full max-w-xl items-center gap-2 rounded-md border border-hairline px-3 py-1.5 focus-within:border-ink">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                aria-hidden
                className="h-[14px] w-[14px] shrink-0 text-muted"
              >
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L14 14" strokeLinecap="round" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${cards.length} prompts`}
                className="w-full bg-transparent text-center text-[13px] text-ink outline-none placeholder:text-muted/70"
              />
            </label>

            <nav
              aria-label="Filter by category"
              className="mt-6 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2"
            >
              <CatLink
                label="All"
                active={filter === "all"}
                onClick={() => setFilter("all")}
              />
              {categories.map((cat) => (
                <CatLink
                  key={cat.id}
                  label={cat.label}
                  active={filter === cat.id}
                  onClick={() => setFilter(cat.id)}
                />
              ))}
            </nav>

            <div className="mt-9 w-full">
              {visible.length === 0 ? (
                <p className="text-[13px] text-muted">
                  Nothing matches. Try engagement, research, testing, leads, or
                  on-chain.
                </p>
              ) : ranking ? (
                <section>
                  <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Best match first
                  </h2>
                  <ul className="mt-3 grid grid-cols-1 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((c) => (
                      <JobRow key={c.id} name={c.name} onClick={() => show(c.id)} />
                    ))}
                  </ul>
                </section>
              ) : (
                <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                  {grouped.map(({ cat, items }) => (
                    <section key={cat.id}>
                      <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted">
                        {cat.label}
                      </h2>
                      <ul className="mt-3 flex flex-col gap-1">
                        {items.map((c) => (
                          <JobRow
                            key={c.id}
                            name={c.name}
                            onClick={() => show(c.id)}
                          />
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              )}
            </div>
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

function JobRow({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-md px-2 py-1.5 text-[13.5px] text-ink transition hover:bg-subtle"
      >
        {name}
      </button>
    </li>
  );
}

function CatLink({
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
      className={`whitespace-nowrap text-[12.5px] transition ${
        active
          ? "text-ink underline decoration-ink underline-offset-[6px]"
          : "text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function RailItem({
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
      className={`flex h-8 w-full items-center rounded-md px-2.5 text-left text-[13px] transition ${
        active
          ? "bg-subtle text-ink"
          : "text-muted hover:bg-subtle hover:text-ink"
      }`}
    >
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </button>
  );
}
