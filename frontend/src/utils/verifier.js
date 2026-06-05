export function verifyReport(report) {
  const salesEvents = report.events
    .filter((e) => e.event_type === "sales")
    .reduce((sum, e) => sum + (e.amount || 0), 0);

  const creditEvents = report.events
    .filter((e) => e.event_type === "credit_note")
    .reduce((sum, e) => sum + (e.amount || 0), 0);

  const salesMatch =
    Math.abs(salesEvents - report.kpis.sales) < 1;

  const creditMatch =
    Math.abs(
      creditEvents - report.kpis.credit_notes
    ) < 1;

  let score = 100;

  if (!salesMatch) score -= 25;
  if (!creditMatch) score -= 25;

  return {
    salesEvents,
    creditEvents,
    salesMatch,
    creditMatch,
    score,
  };
}