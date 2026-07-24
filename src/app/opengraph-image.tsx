import { ImageResponse } from "next/og";

export const alt = "SPIDER//VERSE, premium Spider-Man apparel and collectibles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brutalist social card. Rendered on demand, no external assets.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#f4f1e9",
          padding: 44,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: "10px solid #0a0a0a",
            padding: "56px 64px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                backgroundColor: "#f5d90a",
                border: "6px solid #0a0a0a",
                padding: "12px 24px",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 4,
                color: "#0a0a0a",
                textTransform: "uppercase",
              }}
            >
              New Collection 2026
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 156,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: -6,
                color: "#0a0a0a",
                textTransform: "uppercase",
              }}
            >
              Spider
              <span style={{ color: "#e5121f" }}>//</span>
              Verse
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: 44,
                fontWeight: 700,
                letterSpacing: 3,
                color: "#0a0a0a",
                textTransform: "uppercase",
              }}
            >
              Suit up like a hero
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 3,
              color: "#0a0a0a",
              textTransform: "uppercase",
            }}
          >
            Premium Spider-Man apparel and collectibles
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
