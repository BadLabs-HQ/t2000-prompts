"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { allFields, compile, missingFields } from "@/lib/compile";
import { categoryLabel, type Card, type Tab, type Values } from "@/lib/types";
import { ACCENT, MONO, SANS } from "./fonts";
import { PromptLines } from "./PromptLines";

const PANEL_TABS: { id: Tab; label: string }[] = [
  { id: "post", label: "Post" },
  { id: "settle", label: "Review & settle" },
];

const INPUT: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid var(--ink)",
  borderRadius: 14,
  background: "var(--surface)",
  padding: "13px 16px",
  fontSize: 15,
  color: "var(--ink)",
};

const PANEL_TAB: CSSProperties = {
  position: "relative",
  flex: 1,
  overflow: "hidden",
  cursor: "pointer",
  whiteSpace: "nowrap",
  border: "1px solid var(--ink)",
  borderRadius: 999,
  background: "var(--surface)",
  padding: "8px 12px",
  fontFamily: SANS,
  fontSize: 13,
  fontWeight: 500,
  color: "var(--ink)",
};

const MONO_LABEL: CSSProperties = {
  fontFamily: MONO,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ink)",
};

export function JobDrawer({
  card,
  shown,
  onClose,
}: {
  card: Card;
  shown: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("post");
  const [values, setValues] = useState<Values>({});
  const [copied, setCopied] = useState(false);
  const [fillOpen, setFillOpen] = useState(false);
  const [hotChip, setHotChip] = useState<string | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (fillOpen) {
        setFillOpen(false);
        return;
      }
      onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fillOpen, onClose]);

  const setValue = (key: string, v: string) => {
    setValues((s) => ({ ...s, [key]: v }));
    setCopied(false);
  };

  const fields = allFields(card);
  const missing = missingFields(card, values);
  const text = compile(card, values, tab);
  const filled = fields.filter((f) => (values[f.key] || "").trim() !== "").length;
  const pct = fields.length ? Math.round((filled / fields.length) * 100) : 0;
  const fillSummary = `${filled} of ${fields.length} filled`;

  const blanksNote =
    tab === "settle" || missing.length === 0
      ? "complete, paste and it runs"
      : `${missing.length} blank${missing.length === 1 ? "" : "s"}. Safe to copy, your AI will ask`;

  function copy() {
    try {
      navigator.clipboard.writeText(text);
    } catch {
      // clipboard unavailable
    }
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1600);
  }

  // ?draft= fills the Audric chat box without sending. Unlike ?q= it is not cut at 2000 chars.
  function openAudric() {
    window.open(
      `https://audric.ai/?draft=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  const orangeButton: CSSProperties = {
    flexShrink: 0,
    border: "1px solid var(--ink)",
    borderRadius: 999,
    background: ACCENT,
    color: "var(--on-ember)",
    cursor: "pointer",
    transition: "border-color 120ms ease",
  };

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 30,
          background: "rgba(10,10,10,0.12)",
          opacity: shown ? 1 : 0,
          transition: "opacity 220ms ease-in-out",
        }}
      />

      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          width: "100%",
          maxWidth: "var(--drawer)",
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid var(--line)",
          background: "var(--surface)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.03)",
          transform: shown ? "translateX(0)" : "translateX(100%)",
          transition: "transform 280ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            padding: "20px var(--pad) 16px",
          }}
        >
          <div style={{ minWidth: 0, paddingTop: 14 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 500, lineHeight: 1.3 }}>{card.name}</h2>
            <p style={{ ...MONO_LABEL, margin: "5px 0 0", fontSize: 11, color: "var(--muted)" }}>
              {categoryLabel(card.category)}
            </p>
            <p
              style={{
                margin: "6px 0 0",
                maxWidth: "46ch",
                fontSize: 12.5,
                lineHeight: 1.5,
                color: "var(--muted)",
              }}
            >
              {card.blurb}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="hv-close"
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              border: "1px solid var(--ink)",
              borderRadius: 999,
              background: "var(--surface)",
              fontSize: 26,
              fontWeight: 400,
              lineHeight: 1,
              color: "var(--ink)",
              cursor: "pointer",
              transition: "border-color 120ms ease, color 120ms ease, font-weight 120ms ease",
            }}
          >
            &times;
          </button>
        </header>

        <div role="tablist" style={{ display: "flex", gap: 8, margin: "4px var(--pad) 8px" }}>
          {PANEL_TABS.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTab(t.id);
                  setCopied(false);
                }}
                className="hv-both-orange"
                style={on ? { ...PANEL_TAB, border: "none", padding: "9px 13px" } : PANEL_TAB}
              >
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: -1,
                    borderRadius: 999,
                    boxSizing: "border-box",
                    background: on ? ACCENT : "transparent",
                    border: on ? `1px solid ${ACCENT}` : 0,
                  }}
                />
                <span style={{ position: "relative", color: on ? "var(--on-ember)" : "inherit" }}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        {tab !== "settle" ? (
          <section
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "22px var(--pad)",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: 3,
                minWidth: 0,
                border: "1px solid transparent",
                borderRadius: 14,
                padding: "10px 16px",
                background: `linear-gradient(var(--surface), var(--surface)) padding-box, conic-gradient(from 180deg at 50% 50%, ${ACCENT} 0%, ${ACCENT} ${pct}%, var(--line) ${pct}%, var(--line) 100%) border-box`,
                transition: "background 200ms ease",
              }}
            >
              <span style={{ ...MONO_LABEL, fontSize: 12.5 }}>Inputs</span>
              <span style={{ fontSize: 12.5, color: "var(--ink)" }}>{fillSummary}</span>
            </div>
            <button
              type="button"
              onClick={() => setFillOpen(true)}
              className="hv-border-orange"
              style={{
                ...orangeButton,
                padding: "7px 16px",
                fontSize: 12.5,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Fill inputs
            </button>
          </section>
        ) : null}

        <div
          style={{
            display: "flex",
            minHeight: 0,
            flex: 1,
            flexDirection: "column",
            padding: "12px var(--pad)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              paddingBottom: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                minWidth: 0,
                border: "1px solid var(--ink)",
                borderRadius: 14,
                padding: "10px 16px",
              }}
            >
              <span style={{ ...MONO_LABEL, fontSize: 11 }}>Prompt</span>
              <span style={{ fontSize: 12, color: "var(--ink)" }}>{blanksNote}</span>
            </div>
            <button
              type="button"
              onClick={copy}
              className="hv-both-orange"
              style={{
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                border: "1px solid var(--ink)",
                borderRadius: 999,
                background: "var(--surface)",
                padding: "6px 16px",
                fontFamily: MONO,
                fontSize: 12,
                color: "var(--ink)",
              }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div
            className="code-well"
            style={{
              minHeight: 0,
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              border: "1px solid var(--ink)",
              borderRadius: 10,
              background: "var(--surface)",
            }}
          >
            <pre
              style={{
                margin: 0,
                boxSizing: "border-box",
                maxWidth: "100%",
                padding: "12px 18px 14px 16px",
                fontFamily: MONO,
                fontSize: 12,
                lineHeight: 1.55,
                color: "var(--ink)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              <PromptLines text={text} />
            </pre>
          </div>
        </div>

        <footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "8px var(--pad) 20px",
          }}
        >
          <span
            style={{
              flex: 1,
              alignSelf: "center",
              lineHeight: 1,
              textAlign: "left",
              fontFamily: MONO,
              fontSize: 11.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink)",
            }}
          >
            Remote
          </span>
          <button
            type="button"
            onClick={openAudric}
            className="hv-border-orange"
            style={{ ...orangeButton, padding: "7px 16px", fontSize: 12, fontWeight: 600 }}
          >
            Open in Audric ↗
          </button>
        </footer>
      </aside>

      {fillOpen ? (
        <>
          <div
            aria-hidden
            onClick={() => setFillOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(10,10,10,0.28)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          />
          <div
            role="dialog"
            aria-label="Fill inputs"
            style={{
              position: "fixed",
              zIndex: 51,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              width: "calc(100% - 28px)",
              maxWidth: 560,
              maxHeight: "calc(100% - 56px)",
              border: "1px solid var(--line)",
              borderRadius: 26,
              background: "var(--surface)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.18)",
            }}
          >
            <header
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
                padding: "28px var(--pad) 0",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: SANS,
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                }}
              >
                Fill inputs
              </h3>
              <button
                type="button"
                onClick={() => setFillOpen(false)}
                aria-label="Close"
                className="hv-border-orange"
                style={{
                  ...orangeButton,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  fontSize: 15,
                  lineHeight: 1,
                }}
              >
                &times;
              </button>
            </header>

            <div style={{ display: "flex", gap: 10, padding: "18px var(--pad) 0" }}>
              {fields.map((f) => (
                <span
                  key={f.key}
                  style={{
                    height: 3,
                    flex: 1,
                    borderRadius: 999,
                    background: (values[f.key] || "").trim() !== "" ? ACCENT : "var(--line)",
                  }}
                />
              ))}
            </div>

            <div style={{ padding: "26px var(--pad) 0" }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: MONO,
                  fontSize: 11.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {categoryLabel(card.category)}
              </p>
              <h4
                style={{
                  margin: "10px 0 0",
                  fontFamily: SANS,
                  fontSize: 27,
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  textWrap: "pretty",
                }}
              >
                {card.name}
              </h4>
            </div>

            <div
              className="code-well"
              style={{ minHeight: 0, flex: 1, overflowY: "auto", padding: "24px var(--pad) 4px" }}
            >
              <div style={{ display: "grid", gap: 22 }}>
                {fields.map((f) => {
                  const v = values[f.key] || "";
                  const mono = f.type === "money" || f.type === "int";
                  return (
                    <div key={f.key} style={{ display: "grid", gap: 10 }}>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          gap: 12,
                        }}
                      >
                        <span style={{ fontSize: 15, color: "var(--ink)" }}>{f.label}</span>
                        {v.trim() === "" ? (
                          <span
                            style={{
                              fontFamily: MONO,
                              fontSize: 11,
                              letterSpacing: "0.06em",
                              textTransform: "lowercase",
                              color: "var(--ink)",
                            }}
                          >
                            blank
                          </span>
                        ) : null}
                      </span>

                      {f.type === "select" ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                          {(f.options || []).map((o) => {
                            const chipKey = `${f.key}|${o.value}`;
                            const picked = v === o.value;
                            const hot = hotChip === chipKey;
                            return (
                              <button
                                key={o.value}
                                type="button"
                                onClick={() => setValue(f.key, picked ? "" : o.value)}
                                onMouseEnter={() => setHotChip(chipKey)}
                                onMouseLeave={() => setHotChip(null)}
                                style={{
                                  cursor: "pointer",
                                  borderRadius: 999,
                                  padding: "10px 20px",
                                  fontSize: 14.5,
                                  fontFamily: SANS,
                                  border: `1px solid ${hot ? ACCENT : "var(--ink)"}`,
                                  background: picked ? ACCENT : "var(--surface)",
                                  filter: picked && hot ? "brightness(1.12)" : "none",
                                  color: picked ? "var(--surface)" : hot ? ACCENT : "var(--ink)",
                                }}
                              >
                                {o.label}
                              </button>
                            );
                          })}
                        </div>
                      ) : f.type === "textarea" ? (
                        <textarea
                          value={v}
                          onChange={(e) => setValue(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="hv-border-orange fc-border-orange"
                          style={{
                            ...INPUT,
                            minHeight: 120,
                            resize: "vertical",
                            lineHeight: 1.55,
                            fontFamily: SANS,
                          }}
                        />
                      ) : (
                        <input
                          value={v}
                          onChange={(e) => setValue(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="hv-border-orange fc-border-orange"
                          style={mono ? { ...INPUT, fontFamily: MONO } : INPUT}
                        />
                      )}

                      {f.help ? (
                        <span
                          style={{
                            fontFamily: MONO,
                            fontSize: 11.5,
                            lineHeight: 1.5,
                            color: "var(--ink)",
                          }}
                        >
                          {f.help}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <footer
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "22px var(--pad) 28px",
              }}
            >
              <button
                type="button"
                onClick={() => setFillOpen(false)}
                className="hv-border-orange"
                style={{
                  ...orangeButton,
                  padding: "14px 30px",
                  fontFamily: SANS,
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Done
              </button>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12.5,
                  whiteSpace: "nowrap",
                  color: "var(--ink)",
                }}
              >
                {fillSummary}
              </span>
            </footer>
          </div>
        </>
      ) : null}
    </>
  );
}
