"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { cards } from "@/lib/cards";
import { categories, categoryLabel, type Card, type CategoryId } from "@/lib/types";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { JobDrawer } from "./JobDrawer";
import { ACCENT, MONO, PANEL_SHADOW, SANS } from "./fonts";

const TAB_UNDERLINE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 100 6'%3E%3Cpath d='M1 4.4 Q 50 2.4 99 4' fill='none' stroke='%23FF7A45' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\")";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

const REMOTE_PILL: CSSProperties = {
  flexShrink: 0,
  border: "1px solid var(--ink)",
  borderRadius: 999,
  background: ACCENT,
  padding: "4px 10px",
  fontFamily: MONO,
  fontSize: 11.5,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--on-ember)",
};

const ELLIPSIS: CSSProperties = {
  minWidth: 0,
  flex: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export function Catalog() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [catFilter, setCatFilter] = useState<CategoryId | null>(null);
  const [railOpen, setRailOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [hotTab, setHotTab] = useState<string | null>(null);
  const [hotRail, setHotRail] = useState<string | null>(null);
  const [hotView, setHotView] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const open = useCallback((id: string) => {
    clearTimeout(closeTimer.current);
    setOpenId(id);
    setShown(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  }, []);

  const close = useCallback(() => {
    setShown(false);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), 280);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const onChange = (e: MediaQueryListEvent) => setNarrow(e.matches);
    setNarrow(mq.matches);
    mq.addEventListener("change", onChange);

    // Deep link: /prompts?open=<card id> or /prompts#<card id> opens that card.
    const want =
      new URLSearchParams(window.location.search).get("open") ||
      window.location.hash.replace("#", "");
    if (want && cards.some((c) => c.id === want)) open(want);

    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  const visible = useMemo(() => {
    const active = catFilter || filter;
    let out = active === "all" ? cards : cards.filter((c) => c.category === active);
    const q = search.trim().toLowerCase();
    if (q) out = out.filter((c) => c.name.toLowerCase().includes(q));
    return out;
  }, [search, filter, catFilter]);

  const catPage = !!catFilter;
  const openCard = cards.find((c) => c.id === openId) ?? null;
  const countText = `${visible.length} ${visible.length === 1 ? "prompt" : "prompts"}`;

  const groups: { label: string; items: Card[] }[] = categories
    .map((cat) => ({ label: cat.label, items: visible.filter((c) => c.category === cat.id) }))
    .filter((g) => g.items.length > 0);

  const railButton = (on: boolean, hot: boolean): CSSProperties => ({
    display: "flex",
    width: "100%",
    height: 34,
    alignItems: "center",
    gap: 10,
    boxSizing: "border-box",
    border: 0,
    cursor: "pointer",
    borderRadius: 999,
    padding: "0 12px",
    textAlign: "left",
    fontSize: 14,
    background: on ? ACCENT : "transparent",
    color: on ? "var(--on-ember)" : hot ? ACCENT : "var(--ink)",
    fontWeight: on ? 500 : 400,
    transition: "border-color 120ms ease, color 120ms ease, background 120ms ease",
  });

  const railCount = (on: boolean, hot: boolean): CSSProperties => ({
    flexShrink: 0,
    fontSize: 12.5,
    color: on ? "var(--surface)" : hot ? ACCENT : "var(--muted)",
  });

  const viewButton = (on: boolean, hot: boolean): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 26,
    boxSizing: "border-box",
    border: `1px solid ${on ? "var(--ink)" : "transparent"}`,
    borderRadius: 6,
    cursor: "pointer",
    background: on ? ACCENT : "transparent",
    color: on ? "var(--on-ember)" : hot ? ACCENT : "var(--ink)",
  });

  const cardBox: CSSProperties = {
    width: "100%",
    cursor: "pointer",
    border: "1px solid var(--ink)",
    borderRadius: 12,
    background: "var(--surface)",
    boxShadow: PANEL_SHADOW,
    transition: "border-color 120ms ease",
  };

  return (
    <div
      className="t2k-catalog t2k-vars"
      style={{
        fontFamily: SANS,
        color: "var(--ink)",
        background: "transparent",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            zIndex: 26,
            top: 6,
            left: railOpen ? 164 : narrow ? 4 : 8,
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
            width: railOpen ? 208 : narrow ? 40 : 54,
            flexShrink: 0,
            overflow: "hidden",
            borderRight: `1px solid ${railOpen ? "var(--ink)" : "transparent"}`,
            background: railOpen ? "var(--chrome)" : "transparent",
            padding: "6px 8px 12px",
            display: "grid",
            gap: 3,
            alignContent: "start",
            transition: `width 280ms ${EASE}, border-color 280ms ease-in-out, background 280ms ease-in-out`,
            ...(narrow && railOpen
              ? {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  zIndex: 25,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
                }
              : null),
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 3,
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
              <span style={ELLIPSIS}>All Categories</span>
              <span style={railCount(!catFilter, hotRail === "__all")}>{cards.length}</span>
            </button>
            <hr style={{ margin: "10px 6px", border: 0, borderTop: "1px solid var(--ink)" }} />
            <p
              style={{
                margin: "0 0 2px",
                padding: "0 10px",
                fontSize: 12.5,
                color: "var(--ink)",
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
                  <span style={ELLIPSIS}>{cat.label}</span>
                  <span style={railCount(on, hot)}>
                    {cards.filter((c) => c.category === cat.id).length}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <main style={{ minWidth: 0, flex: 1, padding: "20px var(--gutter) 0" }}>
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              transform: railOpen ? "none" : `translateX(${(narrow ? -40 : -54) / 2}px)`,
            }}
          >
            {!catPage ? (
              <>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    border: "1px solid var(--ink)",
                    borderRadius: 14,
                    background: "var(--surface)",
                    padding: "14px 18px",
                    boxShadow: "0 3px 10px -6px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeWidth={1.4}
                    aria-hidden
                    style={{ stroke: "var(--ink)", width: 18, height: 18, flexShrink: 0 }}
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
                    gap: 6,
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
                          border: on ? "none" : `1px solid ${hot ? ACCENT : "var(--ink)"}`,
                          borderRadius: 999,
                          background: on ? ACCENT : "none",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          padding: on ? "9px 17px" : "8px 16px",
                          fontSize: 13,
                          fontWeight: on ? 600 : 400,
                          color: on ? "var(--on-ember)" : hot ? ACCENT : "var(--ink)",
                          transition: "color 120ms ease, border-color 120ms ease, background 120ms ease",
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
                  <p style={{ margin: 0, fontSize: 13, color: "var(--ink)" }}>{countText}</p>
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
                    fontSize: "var(--h1)",
                    fontWeight: 600,
                    letterSpacing: "-0.025em",
                    color: "var(--ink)",
                  }}
                >
                  {categoryLabel(catFilter!)}
                </h1>
                <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "var(--muted)" }}>{countText}</p>
                <div
                  style={{
                    marginTop: 22,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
                    gap: 12,
                  }}
                >
                  {visible.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => open(c.id)}
                      className="tile hv-border-orange"
                      style={{ ...cardBox, display: "block", padding: 14 }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span
                          className="tile-name"
                          style={{
                            ...ELLIPSIS,
                            textAlign: "left",
                            fontSize: 14.5,
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                            color: "var(--ink)",
                            transition: "color 120ms ease",
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
                          color: "var(--ink)",
                        }}
                      >
                        {c.blurb}
                      </span>
                      <span
                        className="tile-rule"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: 12,
                          borderTop: "1px solid var(--ink)",
                          paddingTop: 12,
                          transition: "border-color 120ms ease",
                        }}
                      >
                        <span className="remote-pill" style={REMOTE_PILL}>
                          Remote
                        </span>
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
                      className="row hv-border-orange"
                      style={{
                        ...cardBox,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 14px",
                      }}
                    >
                      <span
                        style={{ minWidth: 0, flex: 1, display: "grid", gap: 3, textAlign: "left" }}
                      >
                        <span
                          style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 8 }}
                        >
                          <span
                            className="tile-name"
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              letterSpacing: "-0.01em",
                              color: "var(--ink)",
                              transition: "color 120ms ease",
                            }}
                          >
                            {c.name}
                          </span>
                          <span style={{ fontSize: 12.5, color: "var(--muted)" }}>
                            {categoryLabel(c.category)}
                          </span>
                        </span>
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontSize: 13,
                            lineHeight: 1.4,
                            color: "var(--ink)",
                          }}
                        >
                          {c.blurb}
                        </span>
                      </span>
                      <span className="remote-pill" style={REMOTE_PILL}>
                        Remote
                      </span>
                      <span aria-hidden style={{ flexShrink: 0, color: "var(--ink)", fontSize: 15 }}>
                        ›
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            {!catPage && view === "grid" ? (
              <div
                style={{
                  marginTop: 28,
                  columnCount: "var(--cols)" as unknown as number,
                  columnGap: 6,
                }}
              >
                {groups.map((g) => (
                  <section
                    key={g.label}
                    style={{
                      border: "1px solid var(--ink)",
                      borderRadius: 12,
                      background: "var(--surface)",
                      breakInside: "avoid",
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "13px 16px 11px",
                      }}
                    >
                      <h2
                        style={{
                          margin: 0,
                          fontFamily: SANS,
                          fontWeight: 700,
                          fontSize: 13,
                          letterSpacing: "-0.02em",
                          color: "var(--ink)",
                        }}
                      >
                        {g.label}
                      </h2>
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: 11,
                          letterSpacing: "0.04em",
                          color: ACCENT,
                        }}
                      >
                        {g.items.length}
                      </span>
                    </div>
                    <ul style={{ listStyle: "none", margin: 0, padding: "4px 0", display: "grid", gap: 0 }}>
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
                              padding: "7px 16px",
                              textAlign: "left",
                              fontSize: 14,
                              lineHeight: 1.45,
                              color: "var(--ink)",
                              transition: "color 120ms ease, background 120ms ease",
                            }}
                          >
                            <span style={ELLIPSIS}>{c.name}</span>
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

      <SiteFooter compact centerLogo />

      {openCard ? (
        <JobDrawer key={openCard.id} card={openCard} shown={shown} onClose={close} solidTabs />
      ) : null}
    </div>
  );
}
