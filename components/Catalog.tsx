"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { cards } from "@/lib/cards";
import { categories, type Card, type CategoryId } from "@/lib/types";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { JobDrawer } from "./JobDrawer";
import { ACCENT, MONO, PANEL_SHADOW, SANS } from "./fonts";

const STOPWORDS = new Set([
  "and", "the", "for", "with", "you", "your", "from", "that", "this", "have",
  "get", "want", "need", "some", "who", "can", "will", "them", "their", "are",
  "how", "one", "job", "jobs", "please", "would", "someone", "there",
]);

const TAB_UNDERLINE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 100 6'%3E%3Cpath d='M1 4.4 Q 50 2.4 99 4' fill='none' stroke='%23FF7A45' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\")";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

const CARD_SHADOW = PANEL_SHADOW;

const labelFor = (id: string) => categories.find((c) => c.id === id)?.label ?? "";

export function Catalog() {
  const [describe, setDescribe] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [catFilter, setCatFilter] = useState<CategoryId | null>(null);
  const [railOpen, setRailOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [hotTab, setHotTab] = useState<string | null>(null);
  const [hotRail, setHotRail] = useState<string | null>(null);
  const [hotView, setHotView] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Deep link: /prompts?open=<card id> opens that card on load.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("open");
    if (id && cards.some((c) => c.id === id)) open(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = useMemo(() => {
    const active = catFilter || filter;
    let out = active === "all" ? cards : cards.filter((c) => c.category === active);
    const words = describe
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w));
    if (words.length) {
      out = out
        .map((c) => {
          const strong = `${c.name} ${c.blurb} ${labelFor(c.category)}`.toLowerCase();
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
    const q = search.trim().toLowerCase();
    if (q) out = out.filter((c) => c.name.toLowerCase().includes(q));
    return out;
  }, [describe, search, filter, catFilter]);

  const open = (id: string) => {
    clearTimeout(closeTimer.current);
    setOpenId(id);
    setShown(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  };

  const close = useCallback(() => {
    setShown(false);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), 280);
  }, []);

  const ranking = describe.trim().length > 0;
  const catPage = !!catFilter && !ranking;
  const openCard = cards.find((c) => c.id === openId) ?? null;
  const countText = `${visible.length} ${visible.length === 1 ? "prompt" : "prompts"}`;

  const groups: { label: string; items: Card[] }[] = ranking
    ? [{ label: "Best match first", items: visible }]
    : categories
        .map((cat) => ({
          label: cat.label,
          items: visible.filter((c) => c.category === cat.id),
        }))
        .filter((g) => g.items.length > 0);

  const railButton = (on: boolean, hot: boolean): CSSProperties => ({
    display: "flex",
    width: "100%",
    height: 34,
    alignItems: "center",
    gap: 10,
    border: 0,
    cursor: "pointer",
    borderRadius: 6,
    padding: "0 10px",
    textAlign: "left",
    fontSize: 14,
    background: on ? ACCENT : "transparent",
    color: on ? "var(--on-ember)" : hot ? ACCENT : "var(--muted)",
    fontWeight: on ? 500 : 400,
  });

  const railCount = (on: boolean, hot: boolean): CSSProperties => ({
    flexShrink: 0,
    fontSize: 12.5,
    color: on ? "var(--on-ember)" : hot ? ACCENT : "var(--muted)",
  });

  const viewButton = (on: boolean, hot: boolean): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 26,
    border: 0,
    borderRadius: 6,
    cursor: "pointer",
    background: on ? ACCENT : "transparent",
    color: on ? "var(--on-ember)" : hot ? ACCENT : "var(--muted)",
  });

  const initialBadge = (size: number, radius: number, fontSize: number): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: size,
    height: size,
    borderRadius: radius,
    background: "var(--well)",
    fontFamily: MONO,
    fontSize,
    color: "var(--muted)",
  });

  return (
    <div
      className="t2k-catalog"
      style={{
        fontFamily: SANS,
        color: "var(--ink)",
        background: "transparent",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <svg
        aria-hidden
        preserveAspectRatio="none"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <defs>
          <pattern id="t2kGrid" width="34" height="34" patternUnits="userSpaceOnUse">
            <path
              d="M34 0H0V34"
              fill="none"
              style={{ stroke: "var(--grid)" }}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </pattern>
          <filter id="t2kWobble" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0055 0.0085"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={16}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect
          x="-6%"
          y="-6%"
          width="112%"
          height="112%"
          fill="url(#t2kGrid)"
          filter="url(#t2kWobble)"
        />
      </svg>

      <SiteHeader page="prompts" />

      <div style={{ position: "relative", display: "flex", minHeight: 0, flex: 1 }}>
        <button
          type="button"
          onClick={() => setRailOpen((v) => !v)}
          aria-label={railOpen ? "Collapse sidebar" : "Expand sidebar"}
          title={railOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="hv-subtle"
          style={{
            position: "absolute",
            zIndex: 5,
            top: 6,
            left: railOpen ? 164 : 8,
            display: "flex",
            height: 26,
            width: 26,
            alignItems: "center",
            justifyContent: "center",
            border: 0,
            borderRadius: 6,
            background: "transparent",
            color: "var(--ink)",
            cursor: "pointer",
            transition: `left 280ms ${EASE}`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            style={{ height: 28, width: 28, overflow: "visible" }}
          >
            <path d={railOpen ? "M14 7l-5 5 5 5" : "M10 7l5 5-5 5"} />
          </svg>
        </button>

        <nav
          aria-label="Categories"
          style={{
            width: railOpen ? 208 : 54,
            flexShrink: 0,
            overflow: "hidden",
            borderRight: `1px solid ${railOpen ? "var(--line)" : "transparent"}`,
            background: railOpen ? "var(--surface)" : "transparent",
            padding: "6px 8px 12px",
            display: "grid",
            gap: 3,
            alignContent: "start",
            transition: `width 280ms ${EASE}, border-color 280ms ease-in-out, background 280ms ease-in-out`,
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 3,
              paddingTop: 0,
              width: 192,
              opacity: railOpen ? 1 : 0,
              pointerEvents: railOpen ? "auto" : "none",
              transition: "opacity 200ms ease-in-out",
            }}
          >
            <p
              style={{
                margin: "0 0 2px",
                padding: "0 10px",
                height: 26,
                display: "flex",
                alignItems: "center",
                fontSize: 12.5,
                color: "var(--muted)",
                whiteSpace: "nowrap",
              }}
            >
              Browse
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setCatFilter(null);
              }}
              onMouseEnter={() => setHotRail("__all")}
              onMouseLeave={() => setHotRail(null)}
              style={{ ...railButton(!catFilter, hotRail === "__all"), fontWeight: 500 }}
            >
              <span
                style={{
                  minWidth: 0,
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                All Categories
              </span>
              <span style={railCount(!catFilter, hotRail === "__all")}>{cards.length}</span>
            </button>
            <hr style={{ margin: "10px 6px", border: 0, borderTop: "1px solid var(--line)" }} />
            <p
              style={{
                margin: "0 0 2px",
                padding: "0 10px",
                fontSize: 12.5,
                color: "var(--muted)",
                whiteSpace: "nowrap",
              }}
            >
              Categories
            </p>
            {categories.map((cat) => {
              const on = catFilter === cat.id;
              const hot = hotRail === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCatFilter(cat.id)}
                  onMouseEnter={() => setHotRail(cat.id)}
                  onMouseLeave={() => setHotRail(null)}
                  style={railButton(on, hot)}
                >
                  <span
                    style={{
                      minWidth: 0,
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cat.label}
                  </span>
                  <span style={railCount(on, hot)}>
                    {cards.filter((c) => c.category === cat.id).length}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <main style={{ minWidth: 0, flex: 1, padding: "20px 18px 0" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            {!catPage ? (
              <>
                <div
                  style={{
                    border: "1px solid var(--ink)",
                    borderRadius: 14,
                    background: "var(--surface)",
                    padding: "10px 14px 8px",
                    boxShadow: CARD_SHADOW,
                  }}
                >
                  <textarea
                    rows={3}
                    value={describe}
                    onChange={(e) => setDescribe(e.target.value)}
                    placeholder="Describe what you need done, e.g. “get 20 people to join my Telegram and prove it”"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      resize: "none",
                      border: 0,
                      background: "transparent",
                      fontSize: 15.5,
                      lineHeight: 1.6,
                      color: "var(--ink)",
                    }}
                  />
                </div>

                <label
                  style={{
                    marginTop: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    border: "1px solid var(--ink)",
                    borderRadius: 14,
                    background: "var(--surface)",
                    padding: "14px 18px",
                    boxShadow: CARD_SHADOW,
                  }}
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeWidth={1.4}
                    aria-hidden
                    style={{ stroke: "var(--muted)", width: 18, height: 18, flexShrink: 0 }}
                  >
                    <circle cx="7" cy="7" r="4.5" />
                    <path d="M10.5 10.5L14 14" strokeLinecap="round" />
                  </svg>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search prompts…"
                    style={{
                      width: "100%",
                      border: 0,
                      background: "transparent",
                      fontSize: 15.5,
                      color: "var(--ink)",
                    }}
                  />
                </label>

                <nav
                  aria-label="Filter by category"
                  style={{
                    marginTop: 20,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "4px 30px",
                  }}
                >
                  {[{ id: "all" as const, label: "All" }, ...categories].map((t) => {
                    const on = filter === t.id;
                    const hot = hotTab === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setFilter(t.id);
                          setCatFilter(null);
                        }}
                        onMouseEnter={() => setHotTab(t.id)}
                        onMouseLeave={() => setHotTab(null)}
                        style={{
                          position: "relative",
                          border: 0,
                          background: "none",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          padding: "12px 0",
                          fontSize: 15,
                          fontWeight: on ? 500 : 400,
                          color: hot ? ACCENT : on ? "var(--ink)" : "var(--muted)",
                          backgroundImage: on ? TAB_UNDERLINE : "none",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "left bottom",
                          backgroundSize: "100% 6px",
                        }}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </nav>

                {visible.length === 0 ? (
                  <p style={{ marginTop: 28, fontSize: 13, color: "var(--muted)" }}>
                    Nothing matches. Try engagement, research, testing, leads, or on chain.
                  </p>
                ) : null}

                <div
                  style={{
                    marginTop: 26,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>
                    {countText}
                  </p>
                  <div
                    role="group"
                    aria-label="View"
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      border: "1px solid var(--ink)",
                      borderRadius: 8,
                      background: "var(--surface)",
                      padding: 2,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setView("list")}
                      onMouseEnter={() => setHotView("list")}
                      onMouseLeave={() => setHotView(null)}
                      aria-label="List view"
                      title="List view"
                      style={viewButton(view === "list", hotView === "list")}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        aria-hidden
                        style={{ width: 15, height: 15 }}
                      >
                        <path d="M2 4h1M2 8h1M2 12h1M6 4h8M6 8h8M6 12h8" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setView("grid")}
                      onMouseEnter={() => setHotView("grid")}
                      onMouseLeave={() => setHotView(null)}
                      aria-label="Grid view"
                      title="Grid view"
                      style={viewButton(view === "grid", hotView === "grid")}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        aria-hidden
                        style={{ width: 15, height: 15 }}
                      >
                        <rect x="2.2" y="2.2" width="4.6" height="4.6" rx="1.2" />
                        <rect x="9.2" y="2.2" width="4.6" height="4.6" rx="1.2" />
                        <rect x="2.2" y="9.2" width="4.6" height="4.6" rx="1.2" />
                        <rect x="9.2" y="9.2" width="4.6" height="4.6" rx="1.2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : null}

            {catPage ? (
              <section style={{ marginTop: 26 }}>
                <h1
                  style={{
                    margin: 0,
                    fontFamily: SANS,
                    fontSize: 30,
                    fontWeight: 600,
                    letterSpacing: "-0.025em",
                    color: "var(--ink)",
                  }}
                >
                  {labelFor(catFilter!)}
                </h1>
                <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "var(--muted)" }}>{countText}</p>
                <div
                  style={{
                    marginTop: 22,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                    gap: 12,
                  }}
                >
                  {visible.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => open(c.id)}
                      className="hv-border-orange"
                      style={{
                        display: "block",
                        width: "100%",
                        cursor: "pointer",
                        border: "1px solid var(--ink)",
                        borderRadius: 12,
                        background: "var(--surface)",
                        padding: 14,
                        transition: "border-color 120ms ease",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span aria-hidden style={initialBadge(22, 6, 11)}>
                          {c.name.charAt(0).toUpperCase()}
                        </span>
                        <span
                          style={{
                            minWidth: 0,
                            flex: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                            fontSize: 14.5,
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                            color: "var(--ink)",
                          }}
                        >
                          {c.name}
                        </span>
                      </span>
                      <span
                        style={{
                          display: "block",
                          marginTop: 10,
                          textAlign: "left",
                          fontSize: 13,
                          lineHeight: 1.45,
                          color: "var(--muted)",
                        }}
                      >
                        {c.blurb}
                      </span>
                      <span
                        style={{
                          display: "block",
                          marginTop: 12,
                          textAlign: "left",
                          fontFamily: MONO,
                          fontSize: 11.5,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                        }}
                      >
                        Remote
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            {!catPage && view === "list" ? (
              <ul
                style={{
                  listStyle: "none",
                  margin: "22px 0 0",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {visible.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => open(c.id)}
                      className="hv-border-orange"
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                        border: "1px solid var(--ink)",
                        borderRadius: 12,
                        background: "var(--surface)",
                        padding: "12px 14px",
                        transition: "border-color 120ms ease",
                      }}
                    >
                      <span aria-hidden style={initialBadge(30, 8, 12)}>
                        {c.name.charAt(0).toUpperCase()}
                      </span>
                      <span
                        style={{
                          minWidth: 0,
                          flex: 1,
                          display: "grid",
                          gap: 3,
                          textAlign: "left",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "baseline",
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              letterSpacing: "-0.01em",
                              color: "var(--ink)",
                            }}
                          >
                            {c.name}
                          </span>
                          <span style={{ fontSize: 12.5, color: "var(--muted)" }}>
                            {labelFor(c.category)}
                          </span>
                        </span>
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontSize: 13,
                            lineHeight: 1.4,
                            color: "var(--muted)",
                          }}
                        >
                          {c.blurb}
                        </span>
                      </span>
                      <span
                        style={{
                          flexShrink: 0,
                          borderRadius: 999,
                          background: "var(--well)",
                          padding: "4px 10px",
                          fontFamily: MONO,
                          fontSize: 11.5,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                        }}
                      >
                        Remote
                      </span>
                      <span aria-hidden style={{ flexShrink: 0, color: "var(--muted)", fontSize: 15 }}>
                        ›
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            {!catPage && view === "grid" ? (
              <div
                className="catalog-columns"
                style={{
                  marginTop: 28,
                  columnCount: 3,
                  columnGap: 36,
                  columnFill: "balance",
                  maxWidth: 860,
                  overflowWrap: "break-word",
                }}
              >
                {groups.map((g) => (
                  <section
                    key={g.label}
                    style={
                      {
                        margin: "0 0 24px",
                        breakInside: "avoid",
                        WebkitColumnBreakInside: "avoid",
                        pageBreakInside: "avoid",
                        breakBefore: "auto",
                      } as CSSProperties
                    }
                  >
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: SANS,
                        fontWeight: 500,
                        fontSize: 12,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        lineHeight: 1.4,
                        paddingBottom: 8,
                        borderBottom: "1px solid var(--line)",
                      }}
                    >
                      {g.label}
                    </h2>
                    <ul
                      style={{
                        listStyle: "none",
                        margin: "8px 0 0",
                        padding: 0,
                        display: "grid",
                        gap: 1,
                      }}
                    >
                      {g.items.map((c) => (
                        <li key={c.id}>
                          <button
                            type="button"
                            onClick={() => open(c.id)}
                            className="hv-orange"
                            style={{
                              display: "flex",
                              width: "100%",
                              alignItems: "baseline",
                              gap: 10,
                              border: 0,
                              background: "none",
                              cursor: "pointer",
                              borderRadius: 6,
                              padding: "4px 8px",
                              margin: "0 -8px",
                              textAlign: "left",
                              fontSize: 14,
                              lineHeight: 1.45,
                              color: "var(--ink)",
                              transition: "color 120ms ease",
                            }}
                          >
                            <span
                              style={{
                                minWidth: 0,
                                flex: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {c.name}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : null}
          </div>
        </main>
      </div>

      <SiteFooter />

      {openCard ? (
        <JobDrawer key={openCard.id} card={openCard} shown={shown} onClose={close} />
      ) : null}
    </div>
  );
}
