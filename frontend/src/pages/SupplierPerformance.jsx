function SupplierPerformance({ goBack, report }) {
  const defectiveEvents =
    report?.events?.filter(
      (event) =>
        event.event_type === "defective_goods" &&
        event.company &&
        event.company !== "Unknown"
    ) || [];

  const supplierMap = defectiveEvents.reduce((acc, event) => {
    const supplier = event.company;

    if (!acc[supplier]) {
      acc[supplier] = {
        supplier,
        defectiveCount: 0,
        totalValue: 0,
      };
    }

    acc[supplier].defectiveCount += 1;
    acc[supplier].totalValue += event.amount || 0;

    return acc;
  }, {});

  const suppliers = Object.values(supplierMap).sort(
    (a, b) => b.defectiveCount - a.defectiveCount
  );

  return (
    <div className="dashboard">
      <button onClick={goBack}>← Back to Dashboard</button>

      <h1>🏭 Supplier Performance</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Suppliers</h3>
          <h2>{suppliers.length}</h2>
        </div>

        <div className="card">
          <h3>Total Defects</h3>
          <h2>{defectiveEvents.length}</h2>
        </div>

        <div className="card">
          <h3>Highest Risk Supplier</h3>
          <h2>{suppliers[0]?.supplier || "N/A"}</h2>
        </div>
      </div>

      <table className="events-table">
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Defective Count</th>
            <th>Total Value</th>
            <th>Risk Level</th>
            <th>Recommended Action</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((item, index) => (
              <tr key={index}>
                <td>{item.supplier}</td>
                <td>{item.defectiveCount}</td>
                <td>₹{item.totalValue.toLocaleString()}</td>
                <td>
                  {item.defectiveCount >= 2 ? "High" : "Medium"}
                </td>
                <td>
                  {item.defectiveCount >= 2
                    ? "Review supplier quality"
                    : "Monitor"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Upload report to view supplier performance.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SupplierPerformance;