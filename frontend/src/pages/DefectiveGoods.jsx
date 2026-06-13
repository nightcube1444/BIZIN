import { useState } from "react";

function DefectiveGoods({ goBack, report }) {
  const [items, setItems] = useState([
    {
      id: 1,
      product: "RCCB 40A",
      supplier: "Sat Agencies",
      quantity: 5,
      dateReturned: "2026-06-10",
      status: "Pending",
    },
    {
      id: 2,
      product: "FUO 63",
      supplier: "Swamy & Co",
      quantity: 2,
      dateReturned: "2026-06-08",
      status: "Resolved",
    },
  ]);

  const [form, setForm] = useState({
    product: "",
    supplier: "",
    quantity: 1,
    dateReturned: "",
  });

  const reportDefectiveItems =
    report?.events
      ?.filter((event) => event.event_type === "defective_goods")
      ?.map((event, index) => ({
        id: `report-${index}`,
        product: event.company || "Unknown",
        supplier: event.company || "Unknown",
        quantity: event.amount || 0,
        dateReturned: event.date,
        status: "From Report",
      })) || [];

  const allItems = [...reportDefectiveItems, ...items];

  const addItem = () => {
    if (!form.product || !form.supplier || !form.dateReturned) {
      alert("Product, supplier, and date are required");
      return;
    }

    const newItem = {
      id: Date.now(),
      product: form.product,
      supplier: form.supplier,
      quantity: Number(form.quantity) || 1,
      dateReturned: form.dateReturned,
      status: "Pending",
    };

    setItems([newItem, ...items]);

    setForm({
      product: "",
      supplier: "",
      quantity: 1,
      dateReturned: "",
    });
  };

  const resolveItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, status: "Resolved" }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const pendingCount = allItems.filter(
    (item) => item.status === "Pending"
  ).length;

  const resolvedCount = allItems.filter(
    (item) => item.status === "Resolved"
  ).length;

  const reportCount = reportDefectiveItems.length;

  return (
    <div className="dashboard">
      <button onClick={goBack}>← Back to Dashboard</button>

      <h1>⚠ Defective Goods</h1>

      <div className="quality-card">
        <h2>Add Defective Product</h2>

        <input
          placeholder="Product"
          value={form.product}
          onChange={(e) =>
            setForm({ ...form, product: e.target.value })
          }
        />

        <input
          placeholder="Supplier"
          value={form.supplier}
          onChange={(e) =>
            setForm({ ...form, supplier: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />

        <input
          type="date"
          value={form.dateReturned}
          onChange={(e) =>
            setForm({ ...form, dateReturned: e.target.value })
          }
        />

        <button onClick={addItem}>+ Add Defective Item</button>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Defective</h3>
          <h2>{allItems.length}</h2>
        </div>

        <div className="card">
          <h3>From Report</h3>
          <h2>{reportCount}</h2>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <h2>{pendingCount}</h2>
        </div>

        <div className="card">
          <h3>Resolved</h3>
          <h2>{resolvedCount}</h2>
        </div>
      </div>
      <div className="quality-card">
  <h2>Defective Goods Summary</h2>

  <p>
    Imported from report: {reportCount}
  </p>

  <p>
    Manually added: {items.length}
  </p>

  <p>
    Pending manual cases: {pendingCount}
  </p>

  <p>
    Resolved manual cases: {resolvedCount}
  </p>
</div>
      <table className="events-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Supplier</th>
            <th>Quantity / Amount</th>
            <th>Date Returned</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {allItems.map((item) => (
            <tr key={item.id}>
              <td>{item.product}</td>
              <td>{item.supplier}</td>
              <td>{item.quantity}</td>
              <td>{item.dateReturned}</td>
              <td>{item.status}</td>
              <td>
                {item.status !== "Resolved" &&
                  item.status !== "From Report" && (
                    <button onClick={() => resolveItem(item.id)}>
                      Resolve
                    </button>
                  )}

                {item.status !== "From Report" && (
                  <button onClick={() => deleteItem(item.id)}>
                    Delete
                  </button>
                )}

                {item.status === "From Report" && (
                  <span>Imported</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DefectiveGoods;