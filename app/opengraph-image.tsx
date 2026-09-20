import { ImageResponse } from "next/og";
import { cards } from "@/lib/cards";

export const alt = "t2000 prompts · prompts that get real jobs done";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0C0F12";
const PAPER = "#F2F0EC";
const ACCENT = "#FF7A45";
const MUTED = "#646E75";
const MARK = "#E2601F";

/** Pulls one weight of a Google font as binary, the way next/og needs it. */
async function font(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`,
    { headers: { "User-Agent": "Mozilla/5.0 Chrome/119" } }
  ).then((r) => r.text());
  const url = css.match(/src: url\((https:\/\/[^)]+)\)/)?.[1];
  if (!url) throw new Error(`no font file for ${family} ${weight}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const [grotesk, groteskRegular, jet] = await Promise.all([
    font("Space Grotesk", 700),
    font("Space Grotesk", 400),
    font("JetBrains Mono", 400),
  ]);

  const mono = "JetBrains Mono";
  const sans = "Space Grotesk";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: PAPER,
          fontFamily: sans,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -104,
            left: -30,
            display: "flex",
            fontFamily: sans,
            fontWeight: 700,
            fontSize: 420,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "rgba(12,15,18,0.05)",
          }}
        >
          t2
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            padding: "0 96px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 6,
                background: INK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 13,
                color: ACCENT,
              }}
            >
              t2
            </div>
            <div style={{ display: "flex", fontWeight: 700, fontSize: 22, letterSpacing: "-0.03em", color: INK }}>
              t2000
            </div>
            <div style={{ display: "flex", fontFamily: mono, fontSize: 14, letterSpacing: "0.02em", color: MARK }}>
              .prompts
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: mono,
              fontSize: 14,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: MUTED,
              marginBottom: 20,
            }}
          >
            The open marketplace
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontWeight: 700,
              fontSize: 78,
              lineHeight: 1.03,
              letterSpacing: "-0.035em",
              color: INK,
            }}
          >
            <div style={{ display: "flex" }}>Prompts that get</div>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 4,
                    height: 16,
                    background: ACCENT,
                  }}
                />
                <div style={{ display: "flex" }}>real jobs</div>
              </div>
              <div style={{ display: "flex" }}>&nbsp;done.</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              maxWidth: 600,
              fontSize: 19,
              lineHeight: 1.5,
              color: MUTED,
            }}
          >
            {cards.length} fill-in-the-blank prompts, verified before anyone gets paid.
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 30,
              fontFamily: mono,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                display: "flex",
                border: "1px solid rgba(12,15,18,0.14)",
                borderRadius: 999,
                padding: "7px 16px",
                color: INK,
              }}
            >
              {cards.length} prompts
            </div>
            <div
              style={{
                display: "flex",
                borderRadius: 999,
                padding: "7px 16px",
                background: INK,
                color: PAPER,
              }}
            >
              Blanks are safe
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: sans, data: grotesk, weight: 700, style: "normal" },
        { name: sans, data: groteskRegular, weight: 400, style: "normal" },
        { name: mono, data: jet, weight: 400, style: "normal" },
      ],
    }
  );
}
