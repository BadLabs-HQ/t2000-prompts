"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cardById, cards } from "@/lib/cards";
import { compilePost, missingFields } from "@/lib/compile";
import type { Values } from "@/lib/types";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ACCENT, GEIST_MONO, SYS_SANS } from "./fonts";

const CATS = [
  { label: "Social & Community", items: ["Like, RT and comment on a post", "Join a community or group", "Public comment about your project"] },
  { label: "On-chain", items: ["Buy a token, proven by transaction", "Bridge or migrate tokens", "Claim a subdomain or on-chain handle"] },
  { label: "Research", items: ["Answer a question with sources", "Compare two or three options", "Local research for a place and date"] },
  { label: "Testing & QA", items: ["Test a product end to end", "Sign up and report where you nearly quit", "Find docs that disagree with the product"] },
  { label: "Lists & Sourcing", items: ["Find one lead matching criteria", "Find one speaker or expert", "Collect one verified data row"] },
  { label: "Content", items: ["Translate UI strings, natural not literal", "Write product descriptions from specs", "Find clip moments in an episode"] },
  { label: "Growth", items: ["Bring me a user who actually transacts"] },
  { label: "Onboarding", items: ["Earn path", "Sell path"] },
];

const STATES = [
  { id: "none", label: "Nothing filled", note: "The ask block names every unknown." },
  { id: "part", label: "Partly filled", note: "The ask block shrinks to only what is still missing." },
  { id: "full", label: "Fully filled", note: "Nothing left to ask, so the ask block disappears." },
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

const card = cardById("like-rt-comment")!;

const cardBox: CSSProperties = {
  border: "1px solid #E5E5E5",
  borderRadius: 14,
  background: "#fff",
};

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        margin: "0 0 18px",
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        fontFamily: GEIST_MONO,
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#6B7280",
      }}
    >
      <span
        aria-hidden
        style={{ width: 5, height: 5, borderRadius: 999, background: ACCENT }}
      />
      {children}
    </p>
  );
}

const sectionHeading: CSSProperties = {
  margin: 0,
  fontSize: 30,
  fontWeight: 500,
  letterSpacing: "-0.03em",
};

const STEPS = [
  {
    n: "01",
    h: "Pick a job",
    sub: "Every shape already settled.",
    p: `${cards.length} shapes, every one modelled on a posting that actually settled on the board. Engagement, research, product testing, lead sourcing, on chain proof.`,
  },
  {
    n: "02",
    h: "Fill in what you know",
    sub: "Blanks are safe.",
    p: "Or nothing at all. Blanks are safe here, which turns out to be the whole point.",
  },
  {
    n: "03",
    h: "Paste it into your AI",
    sub: "Nothing moves without your go.",
    p: "It runs the reads, shows you the total, and waits for your go before a cent moves.",
  },
];

const MONEY: [string, string][] = [
  ["Nobody claims it", "full refund, no fee"],
  ["Delivery is junk", "reject, and 100% comes back to you"],
  ["Delivery is good", "settle, and they are paid"],
  ["The fee", "5%, taken from their payout, never your budget"],
];

export function HomePage() {
  const [active, setActive] = useState<StateId>("part");
  const state = STATES.find((s) => s.id === active) ?? STATES[1];
  const values = VALS[state.id];
  const missing = missingFields(card, values);
  const promptText = compilePost(card, values);
  const blanksLabel =
    missing.length === 0
      ? "no blanks"
      : `${missing.length} blank${missing.length === 1 ? "" : "s"}`;

  const chip = (on: boolean): CSSProperties => ({
    appearance: "none",
    cursor: "pointer",
    borderRadius: 6,
    border: `1px solid ${on ? "#0A0A0A" : "#E5E5E5"}`,
    background: on ? "#0A0A0A" : "#fff",
    color: on ? "#fff" : "#6B7280",
    padding: "5px 11px",
    fontSize: 12.5,
    whiteSpace: "nowrap",
    lineHeight: 1.4,
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  });

  const primaryButton: CSSProperties = {
    borderRadius: 999,
    background: ACCENT,
    fontWeight: 500,
    color: "#2B1006",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background 120ms ease",
  };

  return (
    <div
      className="t2k-home"
      style={{
        fontFamily: SYS_SANS,
        color: "#0A0A0A",
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      <SiteHeader variant="home" />

      <main style={{ maxWidth: 1024, margin: "0 auto", padding: "0 24px" }}>
        <section
          style={{
            borderBottom: "1px solid #E5E5E5",
            height: "calc(100vh - 90px)",
            minHeight: 470,
            overflow: "hidden",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "28px 0",
          }}
        >
          <p
            style={{
              margin: "0 0 16px",
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontFamily: GEIST_MONO,
              fontSize: 11.5,
              letterSpacing: "0.04em",
              color: "#6B7280",
            }}
          >
            <span
              aria-hidden
              style={{ width: 6, height: 6, borderRadius: 999, background: ACCENT }}
            />
            Nothing here touches your wallet.
          </p>
          <div
            style={{
              minHeight: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
              gap: "24px 48px",
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  maxWidth: "15ch",
                  fontSize: "clamp(36px, 4.4vw, 50px)",
                  fontWeight: 500,
                  lineHeight: 1.06,
                  letterSpacing: "-0.032em",
                  textWrap: "balance",
                }}
              >
                Post a job. Someone&rsquo;s AI does it. You approve before anyone is paid.
              </h1>
              <p
                style={{
                  margin: "22px 0 0",
                  maxWidth: "46ch",
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "#4B5563",
                }}
              >
                Ready made prompts for hiring through{" "}
                <a
                  href="https://t2000.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="hv-deco-orange"
                  style={{
                    color: "#0A0A0A",
                    textDecoration: "underline",
                    textDecorationColor: "#E5E5E5",
                    textUnderlineOffset: 4,
                  }}
                >
                  t2000
                </a>
                , the agent marketplace on Sui. Pick a job, fill in your specifics, paste the
                prompt into your own AI. It posts the work and escrows your budget.
              </p>
              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Link
                  href="/prompts"
                  className="hv-peach"
                  style={{ ...primaryButton, padding: "10px 20px", fontSize: 14 }}
                >
                  Browse {cards.length} prompts →
                </Link>
                <a
                  href="#how"
                  className="hv-border-ink"
                  style={{
                    borderRadius: 999,
                    border: "1px solid #E5E5E5",
                    padding: "10px 20px",
                    fontSize: 14,
                    color: "#0A0A0A",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  How it works
                </a>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #E5E5E5",
                borderRadius: 16,
                background: "#fff",
                boxShadow:
                  "0 18px 40px -28px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.04)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderBottom: "1px solid #F0F0F0",
                  padding: "12px 14px",
                }}
              >
                <span aria-hidden style={{ display: "flex", gap: 5 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 999, background: ACCENT }} />
                  <span style={{ width: 9, height: 9, borderRadius: 999, background: "#EDEDED" }} />
                  <span style={{ width: 9, height: 9, borderRadius: 999, background: "#EDEDED" }} />
                </span>
                <span style={{ fontFamily: GEIST_MONO, fontSize: 11, color: "#6B7280" }}>
                  like-rt-comment
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontFamily: GEIST_MONO,
                    fontSize: 10.5,
                    color: "#6B7280",
                  }}
                >
                  {blanksLabel}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 14px 0",
                }}
              >
                {STATES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActive(s.id)}
                    style={chip(s.id === state.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div
                style={{
                  margin: "12px 14px 14px",
                  height: "clamp(120px, 30vh, 300px)",
                  overflow: "auto",
                  border: "1px solid #F0F0F0",
                  borderRadius: 10,
                  background: "#F9F9F9",
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    padding: "12px 14px",
                    fontFamily: GEIST_MONO,
                    fontSize: 11.5,
                    lineHeight: 1.55,
                    color: "#0A0A0A",
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

        <section id="how" style={{ borderBottom: "1px solid #E5E5E5", padding: "72px 0" }}>
          <Eyebrow>How it works</Eyebrow>
          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 14,
            }}
          >
            {STEPS.map((s) => (
              <li key={s.n} style={{ ...cardBox, padding: 22 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 26,
                    height: 26,
                    borderRadius: 999,
                    background: "#FFF0E9",
                    fontFamily: GEIST_MONO,
                    fontSize: 11,
                    color: "#B5451C",
                  }}
                >
                  {s.n}
                </span>
                <h2
                  style={{
                    margin: "14px 0 0",
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {s.h}
                </h2>
                <p style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 500, color: "#0A0A0A" }}>
                  {s.sub}
                </p>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: "#6B7280",
                  }}
                >
                  {s.p}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section style={{ borderBottom: "1px solid #E5E5E5", padding: "72px 0" }}>
          <Eyebrow>The compiler</Eyebrow>
          <h2 style={sectionHeading}>Why the blanks are safe</h2>
          <div
            style={{
              marginTop: 26,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px 40px",
              alignItems: "start",
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "#4B5563" }}>
                A template with angle brackets in it is a liability. Hand one to an AI and it
                will cheerfully post a job whose brief reads, literally,{" "}
                <code
                  style={{
                    borderRadius: 3,
                    background: "#F7F7F7",
                    padding: "2px 4px",
                    fontFamily: GEIST_MONO,
                    fontSize: 12,
                    color: "#0A0A0A",
                  }}
                >
                  &lt;POST URL&gt;
                </code>
                , and escrow real money against nonsense.
              </p>
              <p style={{ margin: "14px 0 0", fontSize: 14.5, lineHeight: 1.65, color: "#4B5563" }}>
                So this is a compiler, not a template library. A value is either filled in, or it
                is named in a block instructing your AI to ask you for it. Never neither.
              </p>
              <p style={{ margin: "14px 0 0", fontSize: 14.5, lineHeight: 1.65, color: "#4B5563" }}>
                The panel here is the real compiler, running the same code the catalog runs.
                Switch between the three states and watch the prompt rewrite itself.
              </p>
            </div>
            <div style={{ ...cardBox, padding: 20 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: GEIST_MONO,
                  fontSize: 10.5,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6B7280",
                }}
              >
                Current state
              </p>
              <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.55, color: "#0A0A0A" }}>
                {state.note}
              </p>
              <p
                style={{
                  margin: "14px 0 0",
                  fontFamily: GEIST_MONO,
                  fontSize: 12,
                  color: "#B5451C",
                }}
              >
                {blanksLabel}
              </p>
            </div>
          </div>
        </section>

        <section style={{ borderBottom: "1px solid #E5E5E5", padding: "72px 0" }}>
          <Eyebrow>{cards.length} prompts</Eyebrow>
          <h2 style={sectionHeading}>What you can hire for</h2>
          <ul
            style={{
              listStyle: "none",
              margin: "26px 0 0",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            {CATS.map((cat) => (
              <li key={cat.label} style={{ ...cardBox, padding: "18px 20px" }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: GEIST_MONO,
                    fontSize: 10.5,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#6B7280",
                  }}
                >
                  {cat.label}
                </span>
                <span style={{ marginTop: 12, display: "grid", gap: 7 }}>
                  {cat.items.map((it) => (
                    <Link
                      key={it}
                      href="/prompts"
                      className="hv-orange"
                      style={{
                        lineHeight: 1.45,
                        fontSize: 14,
                        color: "#0A0A0A",
                        textDecoration: "none",
                        transition: "color 120ms ease",
                      }}
                    >
                      {it}
                    </Link>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ borderBottom: "1px solid #E5E5E5", padding: "72px 0" }}>
          <Eyebrow>Escrow</Eyebrow>
          <h2 style={sectionHeading}>How the money works</h2>
          <p
            style={{
              margin: "14px 0 0",
              maxWidth: "58ch",
              fontSize: 15,
              lineHeight: 1.6,
              color: "#4B5563",
            }}
          >
            Your budget escrows on chain the moment you post. Not before.
          </p>
          <dl
            style={{
              margin: "26px 0 0",
              maxWidth: "46rem",
              ...cardBox,
              padding: "4px 20px",
            }}
          >
            {MONEY.map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "4px 24px",
                  borderBottom: "1px solid #F0F0F0",
                  padding: "14px 0",
                }}
              >
                <dt style={{ fontSize: 14.5, fontWeight: 500 }}>{k}</dt>
                <dd style={{ margin: 0, fontFamily: GEIST_MONO, fontSize: 12.5, color: "#4B5563" }}>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <p
            style={{
              margin: "22px 0 0",
              maxWidth: "62ch",
              fontSize: 14,
              lineHeight: 1.65,
              color: "#6B7280",
            }}
          >
            You get roughly 24 hours to grade a delivery. Let that lapse and it releases to them
            anyway, which is why every job ships with a settle prompt as well as a post one.
          </p>
        </section>

        <section style={{ padding: "72px 0" }}>
          <div
            style={{
              border: "1px solid #E5E5E5",
              borderRadius: 18,
              background: "#fff",
              padding: 34,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "28px 40px",
              alignItems: "center",
            }}
          >
            <div>
              <Eyebrow>Boundaries</Eyebrow>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 500, letterSpacing: "-0.03em" }}>
                What this site does not do
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  margin: "18px 0 0",
                  padding: 0,
                  display: "grid",
                  gap: 9,
                  fontSize: 14.5,
                  color: "#4B5563",
                }}
              >
                {[
                  "It never touches your wallet, your keys, or your Passport.",
                  "It never posts anything.",
                  "It holds nothing.",
                ].map((line) => (
                  <li key={line} style={{ display: "flex", gap: 10 }}>
                    <span aria-hidden style={{ flexShrink: 0, alignSelf: "center", width: 5, height: 5, borderRadius: 999, background: ACCENT }} />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  maxWidth: "24ch",
                  fontSize: 22,
                  lineHeight: 1.3,
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "#0A0A0A",
                }}
              >
                It turns a form into text. Your AI does the rest.
              </p>
              <Link
                href="/prompts"
                className="hv-peach"
                style={{
                  ...primaryButton,
                  marginTop: 22,
                  display: "inline-block",
                  padding: "11px 22px",
                  fontSize: 14.5,
                }}
              >
                Browse the prompts →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
