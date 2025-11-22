/* app/api/og/route.tsx */
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const score = searchParams.get("score") ?? "0";

  const numericScore = Math.min(100, Math.max(0, Number(score) || 0));

  const vibe =
    numericScore >= 80
      ? "Deeply Intuitive Connector"
      : numericScore >= 50
      ? "Balanced Emotional Thinker"
      : "Independent Analytical Soul";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f6f0ff 0%, #d9c7ff 100%)",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#5b21b6",
            letterSpacing: "-1px",
          }}
        >
          Rivva Results
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 44,
            fontWeight: 800,
            color: "#111827",
          }}
        >
          Compatibility Score
        </div>

        <div
          style={{
            marginTop: 30,
            padding: "26px 50px",
            borderRadius: 999,
            background: "white",
            fontSize: 96,
            fontWeight: 900,
            color: "#6d28d9",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          }}
        >
          {numericScore}%
        </div>

        <div
          style={{
            marginTop: 35,
            fontSize: 36,
            fontWeight: 700,
            color: "#4c1d95",
          }}
        >
          {vibe}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 50,
            fontSize: 26,
            color: "#374151",
          }}
        >
          getrivva.com • Emotional intelligence matchmaking
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
