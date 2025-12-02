import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask({ text: task, priority, category, completed: false });
    setTask("");
    setPriority("Medium");
    setCategory("General");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Input and Add Task button */}
      <div id="inp">
        <input
          type="text"
          placeholder="Enter the task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </div>

      {/* Dropdowns for Priority and Category */}
      <div id="btns">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
    </form>
  );
}
