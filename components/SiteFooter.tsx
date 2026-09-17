import { MONO, SANS } from "./fonts";

/**
 * framed: Home and Memes close the page with a 2px rule.
 * compact: no vertical padding (framed pages and the catalog).
 * centerLogo: the catalog centres the wordmark instead of baseline aligning it.
 */
export function SiteFooter({
  framed = false,
  compact = framed,
  centerLogo = false,
}: {
  framed?: boolean;
  compact?: boolean;
  centerLogo?: boolean;
}) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--ink)",
        borderBottom: framed ? "2px solid var(--ink)" : undefined,
        background: "var(--chrome)",
      }}
    >
      <div
        style={{
          padding: compact ? "0 var(--gutter, 18px)" : "14px var(--gutter, 18px)",
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
        <span style={{ display: "flex", alignItems: centerLogo ? "center" : "baseline", gap: 6 }}>
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
