import { useState } from "react";
import "./App.css";

function App() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      if (!data.kpis || !data.events) {
        throw new Error("Invalid API response");
      }

      console.log(data);
      setReport(data);
      setAnswer("");
      setQuestion("");
    } catch (error) {
      console.error(error);
      alert("Upload Failed. Make sure FastAPI backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const topEvents =
    report?.events
      ?.filter((event) => (event.amount || 0) > 0)
      ?.sort((a, b) => (b.amount || 0) - (a.amount || 0))
      ?.slice(0, 10) || [];

  const topCreditNote =
    report?.events
      ?.filter((event) => event.event_type === "credit_note")
      ?.sort((a, b) => (b.amount || 0) - (a.amount || 0))[0];

  let verification = null;

  if (report?.events && report?.kpis) {
    const salesEvents = report.events
      .filter((event) => event.event_type === "sales")
      .reduce((total, event) => total + (event.amount || 0), 0);

    const creditEvents = report.events
      .filter((event) => event.event_type === "credit_note")
      .reduce((total, event) => total + (event.amount || 0), 0);

    const expenseEvents = report.events
      .filter((event) =>
        ["office_expense", "vehicle_expense", "maintenance"].includes(
          event.event_type
        )
      )
      .reduce((total, event) => total + (event.amount || 0), 0);

    const pendingEvents = report.events.filter(
      (event) => event.event_type === "pending_issue"
    ).length;

    const zeroAmountEvents = report.events.filter(
      (event) => (event.amount || 0) === 0
    ).length;

    const calculatedProfit =
      (report.kpis.sales || 0) -
      (report.kpis.purchases || 0) -
      (report.kpis.expenses || 0);

    const salesMatch = salesEvents === (report.kpis.sales || 0);
    const creditMatch = creditEvents === (report.kpis.credit_notes || 0);
    const expenseMatch = expenseEvents === (report.kpis.expenses || 0);
    const profitMatch =
      calculatedProfit === (report.kpis.profit_estimate || 0);
    const pendingMatch = pendingEvents === (report.kpis.pending_items || 0);

    let score = 100;

    if (!salesMatch) score -= 20;
    if (!creditMatch) score -= 20;
    if (!expenseMatch) score -= 20;
    if (!profitMatch) score -= 20;
    if (!pendingMatch) score -= 10;

    if (zeroAmountEvents > report.events.length * 0.5) {
      score -= 10;
    }

    if (score < 0) score = 0;

    verification = {
      salesEvents,
      creditEvents,
      expenseEvents,
      pendingEvents,
      zeroAmountEvents,
      calculatedProfit,
      salesMatch,
      creditMatch,
      expenseMatch,
      profitMatch,
      pendingMatch,
      score,
    };
  }

  const askAI = () => {
    const q = question.toLowerCase();

    if (!report) {
      setAnswer("Please upload a report first.");
      return;
    }

    if (q.includes("sales")) {
      setAnswer(
        `Sales are ₹${(report.kpis.sales || 0).toLocaleString()}. This was verified from sales events.`
      );
    } else if (q.includes("profit")) {
      setAnswer(
        `Profit is ₹${(
          report.kpis.profit_estimate || 0
        ).toLocaleString()}. It is calculated as Sales - Purchases - Expenses.`
      );
    } else if (q.includes("credit")) {
      setAnswer(
        `Credit notes are ₹${(
          report.kpis.credit_notes || 0
        ).toLocaleString()}. The largest credit note is ₹${(
          topCreditNote?.amount || 0
        ).toLocaleString()}.`
      );
    } else if (q.includes("pending")) {
      setAnswer(
        `There are ${report.kpis.pending_items || 0} pending items.`
      );
    } else {
      setAnswer(
        "I can currently answer questions about sales, profit, credit notes, and pending items."
      );
    }
  };const getPartyName = (description) => {
  if (!description) return "Unknown";

  const lines = description
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  for (let line of lines) {
    const cleaned = line
      .replace(/^\d+\./, "")
      .replace(/dated.*$/i, "")
      .replace(/bill not received/i, "")
      .trim();

    if (
      cleaned.length > 2 &&
      !cleaned.toLowerCase().includes("credit notes") &&
      !cleaned.toLowerCase().includes("re selling") &&
      !cleaned.toLowerCase().includes("sales") &&
      !cleaned.toLowerCase().includes("nill") &&
      !/^\d+$/.test(cleaned)
    ) {
      return cleaned;
    }
  }

  return "Unknown";
};

  return (
    <div className="dashboard">
      <h1>BIZTRACK AI</h1>

      <div className="upload-section">
        <input type="file" accept=".xlsx,.xls" onChange={handleUpload} />
      </div>

      {loading && (
        <div className="quality-card">
          <h2>⏳ Processing Report...</h2>
          <p>Please wait while BIZTRACK AI analyzes the file.</p>
        </div>
      )}

      {!report && !loading ? (
        <h2>Upload Report</h2>
      ) : report ? (
        <>
          <h2>{report.filename}</h2>

          <div className="cards">
            <div className="card">
              <h3>Sales</h3>
              <h2>₹{(report.kpis.sales || 0).toLocaleString()}</h2>

              <details>
                <summary>Explain Calculation</summary>

                {report.events
                  ?.filter((event) => event.event_type === "sales")
                  .map((event, index) => (
                    <p key={index}>
                      {event.date} - ₹
                      {(event.amount || 0).toLocaleString()}
                    </p>
                  ))}
              </details>
            </div>

            <div className="card">
              <h3>Profit</h3>
              <h2>
                ₹{(report.kpis.profit_estimate || 0).toLocaleString()}
              </h2>
            </div>

            <div className="card">
              <h3>Pending</h3>
              <h2>{report.kpis.pending_items || 0}</h2>
            </div>

            <div className="card">
              <h3>Credit Notes</h3>
              <h2>₹{(report.kpis.credit_notes || 0).toLocaleString()}</h2>

              <details>
                <summary>Explain Calculation</summary>

                {report.events
                  ?.filter((event) => event.event_type === "credit_note")
                  .sort((a, b) => (b.amount || 0) - (a.amount || 0))
                  .slice(0, 10)
                  .map((event, index) => (
                    <p key={index}>
                        {event.date}
                        {" - "}
                        {getPartyName(event.description)}
                        {" - "}
                        ₹{(event.amount || 0).toLocaleString()}
                      </p>
                  ))}
              </details>
            </div>
          </div>

          <div className="insight-card">
            <h2>🤖 AI Insights</h2>

            <p>Total Sales: ₹{(report.kpis.sales || 0).toLocaleString()}</p>

            <p>
              Estimated Profit: ₹
              {(report.kpis.profit_estimate || 0).toLocaleString()}
            </p>

            <p>Pending Items: {report.kpis.pending_items || 0}</p>

            <p>
              Top Credit Note: ₹
              {(topCreditNote?.amount || 0).toLocaleString()}
            </p>

            {(report.kpis.credit_notes || 0) > (report.kpis.sales || 0) && (
              <p>🚨 Credit Notes exceed Sales</p>
            )}

            {(report.kpis.pending_items || 0) > 10 && (
              <p>🚨 High number of pending items</p>
            )}
          </div>

          {verification && (
            <div className="verify-card">
              <h2>🔍 Verification Engine</h2>

              <p>Sales Events: ₹{verification.salesEvents.toLocaleString()}</p>
              <p>Sales KPI: ₹{(report.kpis.sales || 0).toLocaleString()}</p>
              <p>
                {verification.salesMatch
                  ? "✅ Sales Verified"
                  : "❌ Sales Mismatch"}
              </p>

              <hr />

              <p>
                Credit Events: ₹{verification.creditEvents.toLocaleString()}
              </p>
              <p>
                Credit KPI: ₹
                {(report.kpis.credit_notes || 0).toLocaleString()}
              </p>
              <p>
                {verification.creditMatch
                  ? "✅ Credit Notes Verified"
                  : "❌ Credit Notes Mismatch"}
              </p>

              <hr />

              <p>
                Expense Events: ₹{verification.expenseEvents.toLocaleString()}
              </p>
              <p>
                Expenses KPI: ₹{(report.kpis.expenses || 0).toLocaleString()}
              </p>
              <p>
                {verification.expenseMatch
                  ? "✅ Expenses Verified"
                  : "❌ Expenses Mismatch"}
              </p>

              <hr />

              <p>
                Calculated Profit: ₹
                {verification.calculatedProfit.toLocaleString()}
              </p>
              <p>
                Profit KPI: ₹
                {(report.kpis.profit_estimate || 0).toLocaleString()}
              </p>
              <p>
                {verification.profitMatch
                  ? "✅ Profit Verified"
                  : "❌ Profit Mismatch"}
              </p>

              <hr />

              <p>Pending Events: {verification.pendingEvents}</p>
              <p>Pending KPI: {report.kpis.pending_items || 0}</p>
              <p>
                {verification.pendingMatch
                  ? "✅ Pending Count Verified"
                  : "❌ Pending Count Mismatch"}
              </p>

              <hr />

              <p>
                Zero Amount Events: {verification.zeroAmountEvents} /{" "}
                {report.events.length}
              </p>
            </div>
          )}

          {verification && (
            <>
              <div className="quality-card">
                <h2>📊 Data Quality Score</h2>
                <h1>{verification.score}%</h1>

                <p>
                  Based on sales, credit notes, expenses, profit, pending items,
                  and zero-value event checks.
                </p>
              </div>

              <div className="quality-card">
                <h2>🩺 System Health</h2>

                <p>
                  {verification.salesMatch
                    ? "✅ Sales Verified"
                    : "❌ Sales Failed"}
                </p>

                <p>
                  {verification.creditMatch
                    ? "✅ Credit Notes Verified"
                    : "❌ Credit Notes Failed"}
                </p>

                <p>
                  {verification.expenseMatch
                    ? "✅ Expenses Verified"
                    : "❌ Expenses Failed"}
                </p>

                <p>
                  {verification.profitMatch
                    ? "✅ Profit Verified"
                    : "❌ Profit Failed"}
                </p>

                <p>
                  {verification.pendingMatch
                    ? "✅ Pending Verified"
                    : "❌ Pending Failed"}
                </p>

                <hr />

                <p>⚠ Zero Amount Events: {verification.zeroAmountEvents}</p>
              </div>
            </>
          )}

          <div className="quality-card">
            <h2>🤖 Ask BIZTRACK AI</h2>

            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about sales, profit, credit notes, pending..."
            />

            <button onClick={askAI}>Ask</button>

            {answer && (
              <p>
                <strong>Answer:</strong> {answer}
              </p>
            )}
          </div>

          <h2>🏆 Top Financial Events</h2>

          <table className="events-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Party / Company</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {topEvents?.map((event, index) => (
                <tr key={index}>
                  <td>{event.date}</td>
                  <td>{event.event_type}</td>
                  <td>{event.company || "Unknown"}</td>
                  <td>₹{(event.amount || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
}

export default App;