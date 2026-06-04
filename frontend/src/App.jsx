import "./App.css";

import closingReport from "./data/closingReport";
import { extractIssues } from "./utils/issueExtractor";

function App() {

  const issues = extractIssues(closingReport.remarks);

  const data = {
    sales: closingReport.sales || 0,
    profit: closingReport.profit || 0,
    pending: closingReport.pendingItems || 0,
    creditNotes: closingReport.creditNotes || 0,
  };

  return (
    <div className="dashboard">

      <h1>BIZTRACK AI</h1>

      <div className="cards">

        <div className="card">
          <h3>Total Sales</h3>
          <h2>₹{data.sales.toLocaleString()}</h2>
        </div>

        <div className="card">
          <h3>Profit Estimate</h3>
          <h2>₹{data.profit.toLocaleString()}</h2>
        </div>

        <div className="card">
          <h3>Pending Items</h3>
          <h2>{data.pending}</h2>
        </div>

        <div className="card">
          <h3>Credit Notes</h3>
          <h2>₹{data.creditNotes.toLocaleString()}</h2>
        </div>

      </div>

      <div className="attention-section">

        <h2>🚨 Attention Center</h2>

        <div className="priority high">
          <h3>High Priority</h3>

          <ul>
            {issues
              .filter(issue => issue.priority === "High")
              .map(issue => (
                <li key={issue.id}>{issue.title}</li>
              ))}
          </ul>
        </div>

        <div className="priority medium">
          <h3>Medium Priority</h3>

          <ul>
            {issues
              .filter(issue => issue.priority === "Medium")
              .map(issue => (
                <li key={issue.id}>{issue.title}</li>
              ))}
          </ul>
        </div>

        <div className="priority low">
          <h3>Low Priority</h3>

          <ul>
            {issues
              .filter(issue => issue.priority === "Low")
              .map(issue => (
                <li key={issue.id}>{issue.title}</li>
              ))}
          </ul>
        </div>

      </div>

      <h2>📋 Recent Issues</h2>

      <div className="issues-grid">

        {issues.map(issue => (

          <div
            key={issue.id}
            className="issue-card"
          >

            <h3>{issue.title}</h3>

            <p>
              <strong>Priority:</strong> {issue.priority}
            </p>

            <p>
              <strong>Category:</strong> {issue.category}
            </p>

            <p>
              <strong>Date:</strong> {issue.date}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;