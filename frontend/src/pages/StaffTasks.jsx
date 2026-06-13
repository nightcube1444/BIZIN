import { useState } from "react";

function StaffTasks({ goBack }) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      staff: "Anas",
      task: "Check pending billing issue",
      module: "Pending Issues",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      staff: "Vidya",
      task: "Complete invoice filing",
      module: "Documents",
      priority: "Medium",
      status: "Pending",
    },
  ]);

  const [form, setForm] = useState({
    staff: "",
    task: "",
    module: "Pending Issues",
    priority: "Medium",
  });

  const addTask = () => {
    if (!form.staff || !form.task) {
      alert("Staff and task are required");
      return;
    }

    const newTask = {
      id: Date.now(),
      staff: form.staff,
      task: form.task,
      module: form.module,
      priority: form.priority,
      status: "Pending",
    };

    setTasks([newTask, ...tasks]);

    setForm({
      staff: "",
      task: "",
      module: "Pending Issues",
      priority: "Medium",
    });
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: "Completed" }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const pendingCount = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="dashboard">
      <button onClick={goBack}>← Back to Dashboard</button>

      <h1>👥 Staff Responsibilities</h1>

      <div className="quality-card">
        <h2>Assign New Task</h2>

        <input
          placeholder="Staff Name"
          value={form.staff}
          onChange={(e) =>
            setForm({ ...form, staff: e.target.value })
          }
        />

        <input
          placeholder="Task"
          value={form.task}
          onChange={(e) =>
            setForm({ ...form, task: e.target.value })
          }
        />

        <select
          value={form.module}
          onChange={(e) =>
            setForm({ ...form, module: e.target.value })
          }
        >
          <option>Pending Issues</option>
          <option>Defective Goods</option>
          <option>Vehicles</option>
          <option>Documents</option>
          <option>Alerts</option>
        </select>

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

        <button onClick={addTask}>+ Assign Task</button>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Tasks</h3>
          <h2>{tasks.length}</h2>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <h2>{pendingCount}</h2>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <h2>{completedCount}</h2>
        </div>
      </div>

      <table className="events-table">
        <thead>
          <tr>
            <th>Staff</th>
            <th>Task</th>
            <th>Module</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.staff}</td>
              <td>{task.task}</td>
              <td>{task.module}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                {task.status !== "Completed" && (
                  <button onClick={() => completeTask(task.id)}>
                    Complete
                  </button>
                )}

                <button onClick={() => deleteTask(task.id)}>
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

export default StaffTasks;