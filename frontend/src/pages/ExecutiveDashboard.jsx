function ExecutiveDashboard({ goBack, report }) {
  const pendingIssues =
    report?.kpis?.pending_items || 0;

  const defectiveGoods =
    report?.events?.filter(
      (e) => e.event_type === "defective_goods"
    ).length || 0;

  const creditNotes =
    report?.kpis?.credit_notes || 0;

  const sales =
    report?.kpis?.sales || 0;

  const alerts =
    (pendingIssues > 0 ? 1 : 0) +
    (defectiveGoods > 0 ? 1 : 0) +
    (creditNotes > sales ? 1 : 0);

  const healthScore =
    Math.max(100 - alerts * 10, 70);

  return (
    <div className="dashboard">
      <button onClick={goBack}>
        ← Back to Dashboard
      </button>

      <h1>📊 Executive Dashboard</h1>

      <div className="quality-card">
        <h2>Business Health Score</h2>
        <h1>{healthScore}%</h1>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Open Alerts</h3>
          <h2>{alerts}</h2>
        </div>

        <div className="card">
          <h3>Pending Issues</h3>
          <h2>{pendingIssues}</h2>
        </div>

        <div className="card">
          <h3>Defective Goods</h3>
          <h2>{defectiveGoods}</h2>
        </div>

        <div className="card">
          <h3>Sales</h3>
          <h2>₹{sales.toLocaleString()}</h2>
        </div>
      </div>

      <div className="quality-card">
        <h2>🚨 Executive Attention</h2>

        {pendingIssues > 0 && (
          <p>
            🚨 {pendingIssues} pending issues need
            follow-up
          </p>
        )}

        {defectiveGoods > 0 && (
          <p>
            ⚠ {defectiveGoods} defective goods reported
          </p>
        )}

        {creditNotes > sales && (
          <p>
            🚨 Credit notes exceed sales
          </p>
        )}

        {alerts === 0 && (
          <p>
            ✅ Business operating normally
          </p>
        )}
      </div>

      <div className="quality-card">
        <h2>Financial Snapshot</h2>

        <p>
          Sales: ₹{sales.toLocaleString()}
        </p>

        <p>
          Credit Notes: ₹{creditNotes.toLocaleString()}
        </p>

        <p>
          Profit: ₹
          {(report?.kpis?.profit_estimate || 0)
            .toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default ExecutiveDashboard;