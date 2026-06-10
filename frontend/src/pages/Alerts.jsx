function Alerts({ goBack }) {
  const alerts = [
    {
      severity: "High",
      message: "11 Pending Issues require manager attention",
      module: "Pending Issues",
    },
    {
      severity: "Medium",
      message: "7 Defective Goods awaiting resolution",
      module: "Defective Goods",
    },
    {
      severity: "High",
      message: "Vehicle insurance/service follow-up required",
      module: "Vehicles",
    },
    {
      severity: "Low",
      message: "4 Documents missing or pending filing",
      module: "Documents",
    },
  ];

  return (
    <div className="dashboard">
      <button onClick={goBack}>← Back to Dashboard</button>

      <h1>🚨 Alerts Center</h1>

      {alerts.map((alert, index) => (
        <div className="quality-card" key={index}>
          <h3>{alert.severity} Priority</h3>
          <p>{alert.message}</p>
          <p>
            <strong>Module:</strong> {alert.module}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Alerts;