"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cardById, cards } from "@/lib/cards";
import { compilePost, missingFields } from "@/lib/compile";
import { memeCards } from "@/lib/memes";
import { categoryLabel, proofLabels, type Values } from "@/lib/types";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ACCENT, MONO, PANEL_SHADOW, SANS } from "./fonts";

const STATES = [
  { id: "none", label: "Nothing filled", note: "the ask block names every unknown" },
  { id: "part", label: "Partly filled", note: "the ask block shrinks to what is missing" },
  { id: "full", label: "Fully filled", note: "nothing left to ask" },
] as const;

type StateId = (typeof STATES)[number]["id"];

const VALS: Record<StateId, Values> = {
  none: {},
  part: {
    postUrl: "https://x.com/funkii/status/2096376467794145607",
    price: "0.50",
    slots: "10",
  },
  full: {
    postUrl: "https://x.com/funkii/status/2096376467794145607",
    price: "0.50",
    slots: "10",
    sla: "24",
    trust: "open",
  },
};

const demoCard = cardById("like-rt-comment")!;

const FEATURED = ["like-rt-comment", "buy-token", "research-question"].map(
  (id) => cardById(id)!
);

const CLIENTS = ["Claude", "ChatGPT", "Cursor", "Grok", "Audric", "+ MCP"];

const panel: CSSProperties = {
  margin: "72px 0",
  border: "1px solid var(--ink)",
  borderRadius: 18,
  background: "var(--surface)",
  padding: 40,
  boxShadow: PANEL_SHADOW,
};

const h2: CSSProperties = {
  margin: 0,
  fontSize: "clamp(30px, 4.2vw, 46px)",
  fontWeight: 700,
  lineHeight: 1.02,
  letterSpacing: "-0.035em",
};

const lead: CSSProperties = {
  margin: "16px 0 0",
  maxWidth: "52ch",
  fontSize: 16,
  lineHeight: 1.6,
};

const kicker: CSSProperties = {
  margin: 0,
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: ACCENT,
};

const primaryButton: CSSProperties = {
  border: "1px solid var(--ink)",
  borderRadius: 999,
  background: ACCENT,
  padding: "11px 22px",
  fontSize: 14.5,
  fontWeight: 600,
  color: "var(--on-ember)",
  textDecoration: "none",
  whiteSpace: "nowrap",
  transition: "border-color 120ms ease",
};

const secondaryButton: CSSProperties = {
  border: "1px solid var(--ink)",
  borderRadius: 999,
  padding: "11px 22px",
  fontSize: 14.5,
  fontWeight: 600,
  color: "var(--ink)",
  textDecoration: "none",
  whiteSpace: "nowrap",
  transition: "color 120ms ease, border-color 120ms ease",
};

const inlineLink: CSSProperties = {
  color: "var(--ink)",
  textDecoration: "underline",
  textDecorationColor: "var(--line)",
  textUnderlineOffset: 4,
};

function Step({
  n,
  label,
  title,
  children,
}: {
  n: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li style={{ border: "1px solid var(--ink)", borderRadius: 14, padding: 20 }}>
      <p
        style={{
          margin: 0,
          display: "inline-flex",
          alignItems: "center",
          border: `1px solid ${ACCENT}`,
          borderRadius: 999,
          padding: "5px 12px",
          fontFamily: MONO,
          fontSize: 10.5,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: ACCENT,
        }}
      >
        {n} · {label}
      </p>
      <h3 style={{ margin: "12px 0 0", fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>
        {title}
      </h3>
      <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6 }}>{children}</p>
    </li>
  );
}

export function HomePage() {
  const [active, setActive] = useState<StateId>("none");
  const state = STATES.find((s) => s.id === active) ?? STATES[0];
  const values = VALS[state.id];
  const missing = missingFields(demoCard, values);
  const promptText = compilePost(demoCard, values);
  const blanksLabel =
    missing.length === 0
      ? "no blanks"
      : `${missing.length} blank${missing.length === 1 ? "" : "s"}`;

  return (
    <div
      className="t2k-home"
      style={{ fontFamily: SANS, color: "var(--ink)", background: "var(--bg)", minHeight: "100vh" }}
    >
      <SiteHeader page="home" />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <section
          style={{ ...panel, margin: "48px 0 0", padding: "56px 40px 64px", textAlign: "center" }}
        >
          <p style={{ ...kicker, marginBottom: 22 }}>Prompt library</p>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(46px, 8.4vw, 96px)",
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
              textTransform: "uppercase",
            }}
          >
            Get work posted
          </h1>
          <p style={{ margin: "24px auto 0", fontSize: 16.5, lineHeight: 1.6 }}>
            Ready made prompts for hiring on{" "}
            <a
              href="https://t2000.ai"
              target="_blank"
              rel="noreferrer"
              className="hv-deco-orange"
              style={inlineLink}
            >
              t2000
            </a>
            . Fill the blanks, paste into your own AI,
            <br />
            it posts the job and locks your budget in USDC.
          </p>
          <div
            style={{
              marginTop: 30,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Link href="/prompts" className="hv-border-orange" style={primaryButton}>
              Browse prompts
            </Link>
            <a href="#how" className="hv-both-orange" style={secondaryButton}>
              How it works
            </a>
          </div>
        </section>

        <section id="how" style={panel}>
          <h2 style={{ ...h2, maxWidth: "22ch" }}>Fill, paste, approve.</h2>
          <p style={lead}>
            The prompt does the posting. You keep the last word, and nothing settles without your go.
          </p>
          <ol
            style={{
              listStyle: "none",
              margin: "34px 0 0",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
              gap: "22px 34px",
            }}
          >
            <Step n="01" label="Fill" title="Pick a shape, fill what you know.">
              {cards.length} job shapes, each modelled on a posting that actually settled. Blanks
              are safe, the prompt asks for whatever you leave out.
            </Step>
            <Step n="02" label="Paste" title="Your AI posts and locks the budget.">
              Claude, ChatGPT, Cursor, Grok or Audric, anything on MCP. Posting is free, the USDC
              locks in the job, not with us.
            </Step>
            <Step n="03" label="Approve" title="You settle. Then they get paid.">
              Grade the delivery and release, or reject and take it all back. The ~5% comes from their
              payout, never your budget.
            </Step>
          </ol>
        </section>

        <section style={panel}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
              gap: "30px 44px",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ ...h2, marginBottom: 24 }}>Blanks are safe.</h2>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65 }}>
                A template full of angle brackets is a liability. Hand one to an AI and it will
                escrow real money against a brief that literally reads{" "}
                <code
                  style={{
                    borderRadius: 3,
                    background: "var(--well)",
                    padding: "2px 5px",
                    fontFamily: MONO,
                    fontSize: 12.5,
                  }}
                >
                  &lt;POST URL&gt;
                </code>
                .
              </p>
              <p style={{ margin: "14px 0 0", fontSize: 15.5, lineHeight: 1.65 }}>
                So this is a compiler, not a template library. Every value is either filled in, or
                named in a block telling your AI to ask you for it. Never neither.
              </p>
              <p style={{ margin: "22px 0 0", fontFamily: MONO, fontSize: 12, color: ACCENT }}>
                {blanksLabel} · {state.note}
              </p>
            </div>

            <div
              style={{
                minWidth: 0,
                border: "1px solid var(--ink)",
                borderRadius: 16,
                background: "var(--surface)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderBottom: "1px solid var(--ink)",
                  padding: "12px 14px",
                }}
              >
                <span aria-hidden style={{ display: "flex", gap: 5 }}>
                  {STATES.map((s) => (
                    <span
                      key={s.id}
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: 999,
                        background: s.id === state.id ? ACCENT : "var(--line)",
                        transition: "background 120ms ease",
                      }}
                    />
                  ))}
                </span>
                <span style={{ fontFamily: MONO, fontSize: 11 }}>like-rt-comment</span>
                <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 10.5 }}>
                  {blanksLabel}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "12px 14px 0" }}>
                {STATES.map((s) => {
                  const on = s.id === state.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActive(s.id)}
                      className={on ? undefined : "hv-both-orange"}
                      style={{
                        cursor: "pointer",
                        borderRadius: 999,
                        border: "1px solid var(--ink)",
                        background: on ? ACCENT : "var(--surface)",
                        color: on ? "var(--on-ember)" : "var(--ink)",
                        padding: "5px 12px",
                        fontSize: 12.5,
                        whiteSpace: "nowrap",
                        lineHeight: 1.4,
                        transition:
                          "background 120ms ease, border-color 120ms ease, color 120ms ease",
                      }}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
              <div
                className="code-well"
                style={{
                  margin: "12px 14px 14px",
                  height: "clamp(150px, 28vh, 280px)",
                  overflowY: "auto",
                  overflowX: "hidden",
                  border: "1px solid var(--ink)",
                  borderRadius: 10,
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    padding: "12px 16px 14px 14px",
                    fontFamily: MONO,
                    fontSize: 11.5,
                    lineHeight: 1.55,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {promptText}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <div
          style={{
            margin: "72px 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: 14,
          }}
        >
          {[
            {
              href: "/prompts",
              kicker: "prompt library",
              count: cards.length,
              title: "Prompts",
              blurb: "Ready made prompts for hiring on t2000. Fill the blanks, paste into your AI, it posts the job.",
              pill: "Browse prompts →",
            },
            {
              href: "/memes",
              kicker: "memecoin community",
              count: memeCards.length,
              title: "Memes",
              blurb: "Community prompts for a memecoin launch. Pick one, fill in the ticker and links, and the agent network handles the rest.",
              pill: "Browse memes →",
            },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="cta-card hv-border-orange"
              style={{
                textDecoration: "none",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                borderRadius: 18,
                background: "var(--surface)",
                padding: 32,
                boxShadow: PANEL_SHADOW,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                position: "relative",
                overflow: "hidden",
                transition: "border-color 120ms ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: ACCENT,
                  }}
                >
                  {c.kicker}
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 36,
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    color: ACCENT,
                    lineHeight: 1,
                  }}
                >
                  {c.count}
                </span>
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(28px, 3.5vw, 38px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                {c.title}
              </h2>
              <p
                style={{
                  margin: 0,
                  maxWidth: 320,
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                }}
              >
                {c.blurb}
              </p>
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 12,
                  borderTop: "1px solid var(--ink)",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <span
                  className="cta-pill"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    border: "1px solid var(--ink)",
                    borderRadius: 999,
                    padding: "8px 16px",
                    fontFamily: MONO,
                    fontSize: 12,
                    color: "var(--ink)",
                    transition: "color 120ms ease, border-color 120ms ease",
                  }}
                >
                  {c.pill}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <section style={panel}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "12px 24px",
            }}
          >
            <h2 style={h2}>Open prompts right now</h2>
            <Link
              href="/prompts"
              style={{
                fontFamily: MONO,
                fontSize: 12.5,
                color: ACCENT,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Browse all →
            </Link>
          </div>
          <ul
            style={{
              listStyle: "none",
              margin: "30px 0 0",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
              gap: 14,
            }}
          >
            {FEATURED.map((c) => (
              <li key={c.id} style={{ minWidth: 0 }}>
                <article
                  className="hv-border-orange"
                  style={{
                    height: "100%",
                    boxSizing: "border-box",
                    border: "1px solid var(--ink)",
                    borderRadius: 18,
                    padding: 18,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
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
                      style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 11, whiteSpace: "nowrap" }}
                    >
                      {proofLabels[c.proofType]}
                    </span>
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 16,
                      fontWeight: 600,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.25,
                    }}
                  >
                    {c.name}
                  </h3>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontFamily: MONO,
                      fontSize: 11,
                      lineHeight: 1.7,
                      color: "var(--muted)",
                    }}
                  >
                    remote · {c.postingMode === "batch" ? "many people" : "one person"}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "auto",
                      borderTop: "1px solid var(--ink)",
                      paddingTop: 12,
                    }}
                  >
                    <Link
                      href={`/prompts?open=${c.id}`}
                      className="hv-border-orange"
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
                      open ↗
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section style={panel}>
          <p style={{ ...kicker, marginBottom: 18 }}>In your AI</p>
          <h2 style={h2}>Put your AI to work.</h2>
          <p style={lead}>
            Hire, settle and earn in USDC from the tools you already use. The prompt is the whole
            integration.
          </p>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CLIENTS.map((c) => (
              <span
                key={c}
                style={{
                  border: "1px solid var(--ink)",
                  borderRadius: 999,
                  padding: "7px 15px",
                  fontFamily: MONO,
                  fontSize: 12,
                  whiteSpace: "nowrap",
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <p style={{ margin: "22px 0 0", fontFamily: MONO, fontSize: 12, color: "var(--muted)" }}>
            Connect at mcp.t2000.ai, or{" "}
            <a
              href="https://audric.ai"
              target="_blank"
              rel="noreferrer"
              className="hv-deco-orange"
              style={inlineLink}
            >
              try Audric
            </a>
            .
          </p>
        </section>

        <section style={{ ...panel, margin: "72px 0 90px" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(40px, 7.4vw, 82px)",
              fontWeight: 700,
              lineHeight: 0.94,
              letterSpacing: "-0.045em",
              textTransform: "uppercase",
            }}
          >
            Get work posted
          </h2>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link href="/prompts" className="hv-border-orange" style={primaryButton}>
              Browse prompts
            </Link>
            <Link href="/memes" className="hv-both-orange" style={secondaryButton}>
              Memecoin prompts
            </Link>
          </div>
          <p style={{ margin: "26px 0 0", maxWidth: "56ch", fontSize: 13.5, lineHeight: 1.65 }}>
            This site never touches your wallet, your keys or your Passport, never posts anything,
            and holds nothing. It turns a form into text, and your AI does the rest.
          </p>
        </section>
      </main>

      <SiteFooter compact />
    </div>
  );
}
