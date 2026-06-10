import { useState } from "react";

function Documents({ goBack }) {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      document: "Invoice",
      responsible: "Vidya",
      dueDate: "2026-06-15",
      status: "Complete",
    },
    {
      id: 2,
      document: "Purchase Register",
      responsible: "Anas",
      dueDate: "2026-06-18",
      status: "Pending",
    },
  ]);

  const [form, setForm] = useState({
    document: "",
    responsible: "",
    dueDate: "",
    status: "Pending",
  });

  const addDocument = () => {
    if (!form.document || !form.responsible) {
      alert("Document and responsible person are required");
      return;
    }

    const newDocument = {
      id: Date.now(),
      document: form.document,
      responsible: form.responsible,
      dueDate: form.dueDate || "Not Set",
      status: form.status,
    };

    setDocuments([newDocument, ...documents]);

    setForm({
      document: "",
      responsible: "",
      dueDate: "",
      status: "Pending",
    });
  };

  const markComplete = (id) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id
          ? { ...doc, status: "Complete" }
          : doc
      )
    );
  };

  const deleteDocument = (id) => {
    setDocuments(
      documents.filter((doc) => doc.id !== id)
    );
  };

  const pendingCount = documents.filter(
    (doc) => doc.status === "Pending"
  ).length;

  const completeCount = documents.filter(
    (doc) => doc.status === "Complete"
  ).length;

  return (
    <div className="dashboard">
      <button onClick={goBack}>← Back to Dashboard</button>

      <h1>📄 Documents</h1>

      <div className="quality-card">
        <h2>Add Document Task</h2>

        <input
          placeholder="Document Name"
          value={form.document}
          onChange={(e) =>
            setForm({ ...form, document: e.target.value })
          }
        />

        <input
          placeholder="Responsible Person"
          value={form.responsible}
          onChange={(e) =>
            setForm({ ...form, responsible: e.target.value })
          }
        />

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
          }
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option>Pending</option>
          <option>Complete</option>
        </select>

        <button onClick={addDocument}>+ Add Document</button>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Documents</h3>
          <h2>{documents.length}</h2>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <h2>{pendingCount}</h2>
        </div>

        <div className="card">
          <h3>Complete</h3>
          <h2>{completeCount}</h2>
        </div>
      </div>

      <table className="events-table">
        <thead>
          <tr>
            <th>Document</th>
            <th>Responsible</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.document}</td>
              <td>{doc.responsible}</td>
              <td>{doc.dueDate}</td>
              <td>{doc.status}</td>
              <td>
                {doc.status !== "Complete" && (
                  <button onClick={() => markComplete(doc.id)}>
                    Complete
                  </button>
                )}

                <button onClick={() => deleteDocument(doc.id)}>
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

export default Documents;