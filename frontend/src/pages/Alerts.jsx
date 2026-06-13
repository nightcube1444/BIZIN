function Alerts({ goBack, report }) {
  const pendingIssues =
    report?.kpis?.pending_items || 0;

  const defectiveGoods =
    report?.events?.filter(
      (event) =>
        event.event_type === "defective_goods"
    ).length || 0;

  const creditExceedsSales =
    (report?.kpis?.credit_notes || 0) >
    (report?.kpis?.sales || 0);

  let alertCount = 0;

  if (pendingIssues > 0) alertCount++;
  if (defectiveGoods > 0) alertCount++;
  if (creditExceedsSales) alertCount++;

  return (
    <div className="dashboard">
      <button
        onClick={goBack}
        style={{
          padding: "10px 15px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>🚨 Alerts Center</h1>

      <div className="quality-card">
        <h2>Alert Summary</h2>

        <h1>{alertCount}</h1>

        <p>Total Active Alerts</p>
      </div>

      <div className="quality-card">
        <h2>Critical Alerts</h2>

        {pendingIssues > 0 && (
          <p>
            🚨 {pendingIssues} Pending Issues
            require action
          </p>
        )}

        {defectiveGoods > 0 && (
          <p>
            ⚠ {defectiveGoods} Defective Goods
            reported
          </p>
        )}

        {creditExceedsSales && (
          <p>
            🚨 Credit Notes exceed Sales
          </p>
        )}

        {alertCount === 0 && (
          <p>✅ No active alerts</p>
        )}
      </div>

      <div className="quality-card">
        <h2>Management Action Required</h2>

        {pendingIssues > 0 && (
          <p>
            Review all pending customer issues
          </p>
        )}

        {defectiveGoods > 0 && (
          <p>
            Verify defective goods and supplier
            returns
          </p>
        )}

        {creditExceedsSales && (
          <p>
            Review high credit note activity
          </p>
        )}

        {alertCount === 0 && (
          <p>
            Business operations appear normal
          </p>
        )}
      </div>

      <div className="quality-card">
        <h2>Business Health</h2>

        <h1>
          {Math.max(100 - alertCount * 10, 70)}%
        </h1>

        <p>
          Health score based on current
          operational alerts.
        </p>
      </div>
    </div>
  );
}

export default Alerts;