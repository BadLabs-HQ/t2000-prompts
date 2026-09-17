"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ACCENT, MONO, SANS } from "./fonts";

export type Page = "home" | "prompts" | "memes";

const navLink = (on: boolean): CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  padding: "5px 10px",
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  textDecoration: "none",
  color: on ? ACCENT : "var(--ink)",
  transition: "color 120ms ease",
});

export function SiteHeader({ page, framed = false }: { page: Page; framed?: boolean }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.body.getAttribute("data-theme") === "dark");
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (next) document.body.setAttribute("data-theme", "dark");
    else document.body.removeAttribute("data-theme");
    try {
      localStorage.setItem("t2k-theme", next ? "dark" : "light");
    } catch {
      // storage unavailable
    }
  };

  return (
    <header
      className="site-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "var(--chrome)",
        borderTop: framed ? "2px solid var(--ink)" : undefined,
        borderBottom: "1px solid var(--ink)",
      }}
    >
      <div
        style={{
          padding: "0 var(--gutter, 20px)",
          minHeight: 56,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            t2000
          </span>
          <span
            className="mark-suffix"
            style={{
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.02em",
              color: "var(--mark-suffix)",
            }}
          >
            .prompts
          </span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Link href="/prompts" className="hv-orange" style={navLink(page === "prompts")}>
            Prompts
          </Link>
          <Link href="/memes" className="hv-orange" style={navLink(page === "memes")}>
            Memes
          </Link>
        </nav>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
          <a
            href="https://t2000.ai"
            target="_blank"
            rel="noreferrer"
            className="hv-orange ext-link"
            style={{
              display: "var(--sm, inline-flex)",
              alignItems: "center",
              gap: 6,
              fontFamily: MONO,
              fontSize: 12,
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            t2000.ai ↗
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hv-both-orange"
            style={{
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",
              border: "1px solid var(--ink)",
              borderRadius: 999,
              background: "transparent",
              padding: "5px 12px",
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink)",
              transition: "color 120ms ease, border-color 120ms ease",
            }}
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}
