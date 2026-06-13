import { useState } from "react";

function AgingAnalysis({ goBack }) {
  const issues = [
    { company: "Astral", days: 18 },
    { company: "ST Thomas", days: 12 },
    { company: "Menco", days: 35 },
    { company: "KB Trading", days: 5 },
    { company: "Popular", days: 22 },
  ];

  const under7 = issues.filter(i => i.days <= 7).length;
  const under15 = issues.filter(i => i.days > 7 && i.days <= 15).length;
  const under30 = issues.filter(i => i.days > 15 && i.days <= 30).length;
  const over30 = issues.filter(i => i.days > 30).length;

  return (
    <div className="dashboard">
      <button onClick={goBack}>
        ← Back to Dashboard
      </button>

      <h1>⏳ Aging Analysis</h1>

      <div className="cards">

        <div className="card">
          <h3>0 - 7 Days</h3>
          <h2>{under7}</h2>
        </div>

        <div className="card">
          <h3>8 - 15 Days</h3>
          <h2>{under15}</h2>
        </div>

        <div className="card">
          <h3>16 - 30 Days</h3>
          <h2>{under30}</h2>
        </div>

        <div className="card">
          <h3>30+ Days</h3>
          <h2>{over30}</h2>
        </div>

      </div>

      <table className="events-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Days Open</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((issue, index) => (
            <tr key={index}>
              <td>{issue.company}</td>
              <td>{issue.days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AgingAnalysis;