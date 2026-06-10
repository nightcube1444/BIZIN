import { useState } from "react";

function PendingIssues({ goBack }) {
  const [issues, setIssues] = useState([
    {
      id: 1,
      company: "Astral",
      issue: "Tank Borrowed",
      assignedTo: "Arun",
      priority: "High",
      status: "Pending",
      daysOpen: 18,
    },
    {
      id: 2,
      company: "ST Thomas Metals",
      issue: "Billing Error",
      assignedTo: "Anas",
      priority: "Medium",
      status: "Pending",
      daysOpen: 12,
    },
  ]);

  const [form, setForm] = useState({
    company: "",
    issue: "",
    assignedTo: "",
    priority: "Medium",
    daysOpen: 0,
  });

  const addIssue = () => {
    if (!form.company || !form.issue) {
      alert("Company and issue are required");
      return;
    }

    const newIssue = {
      id: Date.now(),
      company: form.company,
      issue: form.issue,
      assignedTo: form.assignedTo || "Unassigned",
      priority: form.priority,
      status: "Pending",
      daysOpen: Number(form.daysOpen) || 0,
    };

    setIssues([newIssue, ...issues]);

    setForm({
      company: "",
      issue: "",
      assignedTo: "",
      priority: "Medium",
      daysOpen: 0,
    });
  };

  const resolveIssue = (id) => {
    setIssues(
      issues.map((item) =>
        item.id === id
          ? { ...item, status: "Resolved" }
          : item
      )
    );
  };

  const deleteIssue = (id) => {
    setIssues(issues.filter((item) => item.id !== id));
  };

  return (
    <div className="dashboard">
      <button onClick={goBack}>← Back to Dashboard</button>

      <h1>🚨 Pending Issues</h1>

      <div className="quality-card">
        <h2>Add New Issue</h2>

        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
        />

        <input
          placeholder="Issue"
          value={form.issue}
          onChange={(e) =>
            setForm({ ...form, issue: e.target.value })
          }
        />

        <input
          placeholder="Assigned To"
          value={form.assignedTo}
          onChange={(e) =>
            setForm({ ...form, assignedTo: e.target.value })
          }
        />

        <select
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: e.target.value })
          }
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="number"
          placeholder="Days Open"
          value={form.daysOpen}
          onChange={(e) =>
            setForm({ ...form, daysOpen: e.target.value })
          }
        />

        <button onClick={addIssue}>+ Add Issue</button>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Issues</h3>
          <h2>{issues.length}</h2>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <h2>
            {
              issues.filter(
                (item) => item.status === "Pending"
              ).length
            }
          </h2>
        </div>

        <div className="card">
          <h3>Resolved</h3>
          <h2>
            {
              issues.filter(
                (item) => item.status === "Resolved"
              ).length
            }
          </h2>
        </div>
      </div>

      <table className="events-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Issue</th>
            <th>Assigned To</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Days Open</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((item) => (
            <tr key={item.id}>
              <td>{item.company}</td>
              <td>{item.issue}</td>
              <td>{item.assignedTo}</td>
              <td>{item.priority}</td>
              <td>{item.status}</td>
              <td>{item.daysOpen}</td>
              <td>
                {item.status !== "Resolved" && (
                  <button
                    onClick={() => resolveIssue(item.id)}
                  >
                    Resolve
                  </button>
                )}

                <button
                  onClick={() => deleteIssue(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PendingIssues;