export function extractFromClosingSheet(events) {

  const remarks = [];

  events.forEach((event) => {

    const text =
      event.description?.toLowerCase() || "";

    if (
      text.includes("pending") ||
      text.includes("billing") ||
      text.includes("credit")
    ) {
      remarks.push(event.description);
    }

  });

  return remarks;
}