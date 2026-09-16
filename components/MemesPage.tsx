"use client";

import { useCallback, useRef, useState } from "react";
import { compilePost } from "@/lib/compile";
import { memeCards } from "@/lib/memes";
import { categoryLabel, memeCategories, proofLabels, type CategoryId } from "@/lib/types";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { JobDrawer } from "./JobDrawer";
import { ACCENT, MONO, PANEL_SHADOW, SANS } from "./fonts";

const TAB_UNDERLINE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 100 6'%3E%3Cpath d='M1 4.4 Q 50 2.4 99 4' fill='none' stroke='%23FF7A45' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\")";

export function MemesPage() {
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const visible = filter === "all" ? memeCards : memeCards.filter((c) => c.category === filter);
  const openCard = memeCards.find((c) => c.id === openId) ?? null;

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

  return (
    <div
      className="t2k-catalog"
      style={{
        fontFamily: SANS,
        color: "var(--ink)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SiteHeader page="memes" />

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
          boxSizing: "border-box",
          padding: "28px 24px 56px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: MONO,
            fontSize: 11.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: ACCENT,
          }}
        >
          memecoin community
        </p>
        <h1 style={{ margin: "8px 0 0", fontSize: 30, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
          Memes
        </h1>
        <p style={{ margin: "10px 0 0", maxWidth: 520, fontSize: 13.5, lineHeight: 1.5, color: "var(--muted)" }}>
          Community prompts for a memecoin launch. Pick one, fill in the ticker and links, and the
          agent network handles the rest.
        </p>

        <nav
          aria-label="Filter by category"
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 30px", marginTop: 18 }}
        >
          {[{ id: "all" as const, label: "All" }, ...memeCategories].map((t) => {
            const on = filter === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilter(t.id)}
                className="hv-orange"
                style={{
                  border: 0,
                  background: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  padding: "12px 0",
                  fontSize: 15,
                  fontWeight: on ? 500 : 400,
                  color: on ? "var(--ink)" : "var(--muted)",
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

        <ul
          style={{
            listStyle: "none",
            margin: "22px 0 0",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
            gap: 14,
          }}
        >
          {visible.map((c) => (
            <li key={c.id} style={{ minWidth: 0 }}>
              <article
                onClick={() => open(c.id)}
                className="hv-border-orange"
                style={{
                  height: "100%",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  background: "var(--surface)",
                  border: "1px solid var(--ink)",
                  borderRadius: 18,
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  boxShadow: PANEL_SHADOW,
                  transition: "border-color 120ms ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10.5,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: ACCENT,
                    }}
                  >
                    {categoryLabel(c.category)}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontFamily: MONO,
                      fontSize: 11,
                      color: "var(--muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {proofLabels[c.proofType]}
                  </span>
                </div>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.25 }}>
                  {c.name}
                </h2>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.45 }}>{c.blurb}</p>
                <p style={{ margin: "2px 0 0", fontFamily: MONO, fontSize: 11, color: "var(--muted)" }}>
                  remote · many people
                </p>
                <div
                  style={{
                    display: "flex",
                    marginTop: "auto",
                    borderTop: "1px solid var(--ink)",
                    paddingTop: 12,
                  }}
                >
                  <a
                    href={`https://audric.ai/?draft=${encodeURIComponent(compilePost(c, {}))}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hv-bright"
                    style={{
                      marginLeft: "auto",
                      border: "1px solid var(--ink)",
                      padding: "7px 14px",
                      borderRadius: 999,
                      background: ACCENT,
                      fontFamily: MONO,
                      fontSize: 12,
                      fontWeight: 500,
                      color: "var(--on-ember)",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    audric ↗
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>

      <SiteFooter />

      {openCard ? (
        <JobDrawer key={openCard.id} card={openCard} shown={shown} onClose={close} />
      ) : null}
    </div>
  );
}
