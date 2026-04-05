import { useState } from "react";

export default function TaskList({ tasks, updateTask, deleteTask }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const toggleComplete = (index) => {
    const updated = { ...tasks[index], completed: !tasks[index].completed };
    updateTask(updated, index);
  };

  const startEdit = (index, text) => {
    setEditIndex(index);
    setEditText(text);
  };

  const saveEdit = (index) => {
    const updated = { ...tasks[index], text: editText };
    updateTask(updated, index);
    setEditIndex(null);
  };

  return (
    <div className="task-grid">
      {tasks.map((task, index) => (
        <div key={index} className={`task-card ${task.completed ? "done" : ""} ${task.priority}`}>

          {editIndex === index ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <h3>{task.text}</h3>
          )}

          <div className="badges">
            <span className={`priority ${task.priority}`}>{task.priority}</span>
            <span className={`category ${task.category}`}>{task.category}</span>
          </div>

          <div className="actions">

            {editIndex === index ? (
              <button onClick={() => saveEdit(index)}>Save</button>
            ) : (
              <button onClick={() => startEdit(index, task.text)}>Edit</button>
            )}

            <button onClick={() => toggleComplete(index)}>
              {task.completed ? "Undo" : "Done"}
            </button>

            <button className="delete" onClick={() => deleteTask(index)}>
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}