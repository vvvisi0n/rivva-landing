"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function EmotionalRadarChart() {
  const data = [
    { trait: "Communication", value: 72 },
    { trait: "Attachment Tempo", value: 58 },
    { trait: "Empathy", value: 88 },
    { trait: "Trust", value: 64 },
    { trait: "Romantic Energy", value: 78 },
    { trait: "Balance", value: 69 },
  ];

  return (
    <div className="w-full max-w-xl h-96 mx-auto mt-12">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#d8b4fe" />
          <PolarAngleAxis
            dataKey="trait"
            tick={{ fill: "#6b21a8", fontSize: 12, fontWeight: 600 }}
          />
          <PolarRadiusAxis stroke="#c084fc" />
          <Radar
            name="Emotional Profile"
            dataKey="value"
            stroke="#9333ea"
            fill="#a855f7"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
