import { analyzeMessage } from "@/lib/safety";

export type ModerationDecision =
  | { action: "allow" }
  | { action: "warn"; note: string }
  | { action: "block"; note: string };

export function moderateOutgoing(text: string): ModerationDecision {
  const scan = analyzeMessage(text);

  if (scan.severity === "block") {
    return { action: "block", note: scan.message ?? "Not allowed." };
  }

  if (scan.severity === "warn") {
    return {
      action: "warn",
      note:
        scan.message ??
        "This may violate safety rules. Consider rewriting before sending.",
    };
  }

  return { action: "allow" };
}
