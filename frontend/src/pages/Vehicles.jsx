import { useState } from "react";

function Vehicles({ goBack }) {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      number: "KL07AB1234",
      driver: "Anas",
      insuranceExpiry: "2026-08-10",
      serviceDue: "2026-07-15",
      status: "Active",
    },
    {
      id: 2,
      number: "KL05CD5678",
      driver: "Arun",
      insuranceExpiry: "2026-06-20",
      serviceDue: "2026-06-25",
      status: "Service Due",
    },
  ]);

  const [form, setForm] = useState({
    number: "",
    driver: "",
    insuranceExpiry: "",
    serviceDue: "",
    status: "Active",
  });

  const addVehicle = () => {
    if (!form.number || !form.driver) {
      alert("Vehicle number and driver are required");
      return;
    }

    const newVehicle = {
      id: Date.now(),
      number: form.number,
      driver: form.driver,
      insuranceExpiry: form.insuranceExpiry || "Not Set",
      serviceDue: form.serviceDue || "Not Set",
      status: form.status,
    };

    setVehicles([newVehicle, ...vehicles]);

    setForm({
      number: "",
      driver: "",
      insuranceExpiry: "",
      serviceDue: "",
      status: "Active",
    });
  };

  const markServiced = (id) => {
    setVehicles(
      vehicles.map((vehicle) =>
        vehicle.id === id
          ? { ...vehicle, status: "Active" }
          : vehicle
      )
    );
  };

  const deleteVehicle = (id) => {
    setVehicles(
      vehicles.filter((vehicle) => vehicle.id !== id)
    );
  };

  const activeCount = vehicles.filter(
    (vehicle) => vehicle.status === "Active"
  ).length;

  const dueCount = vehicles.filter(
    (vehicle) => vehicle.status !== "Active"
  ).length;

  return (
    <div className="dashboard">
      <button onClick={goBack}>← Back to Dashboard</button>

      <h1>🚚 Vehicles</h1>

      <div className="quality-card">
        <h2>Add Vehicle</h2>

        <input
          placeholder="Vehicle Number"
          value={form.number}
          onChange={(e) =>
            setForm({ ...form, number: e.target.value })
          }
        />

        <input
          placeholder="Driver"
          value={form.driver}
          onChange={(e) =>
            setForm({ ...form, driver: e.target.value })
          }
        />

        <input
          type="date"
          value={form.insuranceExpiry}
          onChange={(e) =>
            setForm({
              ...form,
              insuranceExpiry: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={form.serviceDue}
          onChange={(e) =>
            setForm({
              ...form,
              serviceDue: e.target.value,
            })
          }
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option>Active</option>
          <option>Service Due</option>
          <option>Insurance Due</option>
          <option>Repair Needed</option>
        </select>

        <button onClick={addVehicle}>+ Add Vehicle</button>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Vehicles</h3>
          <h2>{vehicles.length}</h2>
        </div>

        <div className="card">
          <h3>Active</h3>
          <h2>{activeCount}</h2>
        </div>

        <div className="card">
          <h3>Needs Attention</h3>
          <h2>{dueCount}</h2>
        </div>
      </div>

      <table className="events-table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Insurance Expiry</th>
            <th>Service Due</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.number}</td>
              <td>{vehicle.driver}</td>
              <td>{vehicle.insuranceExpiry}</td>
              <td>{vehicle.serviceDue}</td>
              <td>{vehicle.status}</td>
              <td>
                {vehicle.status !== "Active" && (
                  <button
                    onClick={() => markServiced(vehicle.id)}
                  >
                    Mark OK
                  </button>
                )}

                <button
                  onClick={() => deleteVehicle(vehicle.id)}
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

export default Vehicles;