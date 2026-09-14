import { ACCENT, GEIST, GEIST_MONO } from "./fonts";

export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid #E5E5E5", background: "#fff" }}>
      <div
        style={{
          padding: "0 18px",
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: 24,
          fontFamily: GEIST_MONO,
          fontSize: 11,
          color: "#6B7280",
        }}
      >
        <span style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
          <span
            style={{
              fontFamily: GEIST,
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#0A0A0A",
            }}
          >
            t2000
          </span>
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            prompts
          </span>
        </span>
        <span
          className="hv-orange"
          style={{
            marginLeft: "auto",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
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
