export function extractIssues(remarks) {

  return remarks.map((remark, index) => {

    let priority = "Low";
    let category = "General";

    const text = remark.toLowerCase();

    if (
      text.includes("pending") ||
      text.includes("billing") ||
      text.includes("credit")
    ) {
      priority = "High";
    }

    if (
      text.includes("tank") ||
      text.includes("return")
    ) {
      category = "Inventory";
    }

    if (
      text.includes("billing") ||
      text.includes("credit")
    ) {
      category = "Finance";
    }

    if (
      text.includes("delivery")
    ) {
      category = "Logistics";
    }

    return {
      id: index + 1,
      title: remark,
      priority,
      category,
      date: new Date().toLocaleDateString()
    };
  });
}