export function getScore(c: any): number {
  return (
    c?.totalScore ??
    (typeof c?.score === "number"
      ? c.score
      : c?.score?.total ??
        c?.score?.overall ??
        0)
  );
}
