import { MONO, SANS } from "./fonts";

export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--ink)", background: "var(--chrome)" }}>
      <div
        style={{
          padding: "14px var(--gutter, 18px)",
          minHeight: 56,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px 24px",
          fontFamily: MONO,
          fontSize: 11,
          color: "var(--muted)",
        }}
      >
        <span style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
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
          <span style={{ fontSize: 12, letterSpacing: "0.02em", color: "var(--mark-suffix)" }}>
            .prompts
          </span>
        </span>
        <span
          className="hv-orange"
          style={{
            marginLeft: "auto",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink)",
            cursor: "default",
            transition: "color 120ms ease",
          }}
        >
          BadLabs
        </span>
      </div>
    </footer>
  );
}
