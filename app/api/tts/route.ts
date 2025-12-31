import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  text: string;
  voice?: string; // e.g. "alloy"
  format?: "mp3" | "wav";
  instructions?: string;
};

export async function POST(req: Request) {
  const { text, voice = "alloy", format = "mp3", instructions }: Body =
    await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
  }

  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }

  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice,
      format,
      input: text,
      // gpt-4o-mini-tts supports style control via instructions
      instructions:
        instructions ??
        "Warm, calm, emotionally intelligent dating coach. Natural pacing, gentle pauses. Not robotic.",
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return NextResponse.json({ error: errText }, { status: 500 });
  }

  const audioBuffer = await res.arrayBuffer();

  return new NextResponse(audioBuffer, {
    status: 200,
    headers: {
      "Content-Type": format === "wav" ? "audio/wav" : "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
