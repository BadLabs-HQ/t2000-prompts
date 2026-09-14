import Link from "next/link";
import { ACCENT, GEIST, GEIST_MONO } from "./fonts";

export function SiteHeader({ variant }: { variant: "home" | "catalog" }) {
  const home = variant === "home";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "#fff",
        borderBottom: "1px solid #E5E5E5",
      }}
    >
      <div
        style={{
          padding: "0 18px",
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 7,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: GEIST,
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            t2000
          </span>
          <span
            style={{
              fontFamily: GEIST_MONO,
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            prompts
          </span>
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginLeft: 12,
          }}
        >
          <Link
            href="/prompts"
            className={home ? "hv-peach" : "hv-bright"}
            style={{
              fontFamily: GEIST,
              padding: "8px 16px",
              borderRadius: 999,
              fontSize: 15.5,
              fontWeight: home ? 500 : 600,
              textDecoration: "none",
              background: ACCENT,
              color: home ? "#2B1006" : "#fff",
              transition: "background 120ms ease",
            }}
          >
            Prompts
          </Link>
        </nav>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <a
            href="https://t2000.ai"
            target="_blank"
            rel="noreferrer"
            className="hv-orange"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: GEIST_MONO,
              fontSize: 12,
              color: "#0A0A0A",
              textDecoration: "none",
            }}
          >
            t2000.ai ↗
          </a>
          <a
            href="https://t2000.ai"
            target="_blank"
            rel="noreferrer"
            className="hv-orange"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: GEIST,
              fontSize: 14,
              fontWeight: 500,
              color: home ? "#0A0A0A" : ACCENT,
              textDecoration: "none",
            }}
          >
            Sign in
          </a>
        </div>
      </div>
    </header>
  );
}
