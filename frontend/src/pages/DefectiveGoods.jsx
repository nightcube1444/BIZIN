import { useState } from "react";

function DefectiveGoods({ goBack }) {
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

  const pendingCount = items.filter(
    (item) => item.status === "Pending"
  ).length;

  const resolvedCount = items.filter(
    (item) => item.status === "Resolved"
  ).length;

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
          <h2>{items.length}</h2>
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

      <table className="events-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Date Returned</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.product}</td>
              <td>{item.supplier}</td>
              <td>{item.quantity}</td>
              <td>{item.dateReturned}</td>
              <td>{item.status}</td>
              <td>
                {item.status !== "Resolved" && (
                  <button onClick={() => resolveItem(item.id)}>
                    Resolve
                  </button>
                )}

                <button onClick={() => deleteItem(item.id)}>
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

export default DefectiveGoods;