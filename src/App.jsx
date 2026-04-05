import { useEffect, useState } from "react";
import ProgressTracker from "./Components/ProgressTracker";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import "./Style.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    const theme = JSON.parse(localStorage.getItem("theme"));

    if (saved) setTasks(saved);
    if (theme) setDark(theme);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("theme", JSON.stringify(dark));
  }, [tasks, dark]);

  const addTask = (task) => setTasks([...tasks, task]);

  const updateTask = (updatedTask, index) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearTasks = () => setTasks([]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (["High", "Medium", "Low"].includes(filter))
      return task.priority === filter;
    if (["Work", "Personal", "General"].includes(filter))
      return task.category === filter;
    return true;
  });

  // 🔥 COUNTS
  const count = (type, key) =>
    tasks.filter((t) => t[key] === type).length;

  return (
    <div className={dark ? "layout dark" : "layout"}>

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Task Nest</h2>

        <button onClick={() => setDark(!dark)} className="theme-btn">
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

        <p onClick={() => setFilter("All")} className={filter==="All"?"active":""}>
          🏠 All Tasks ({tasks.length})
        </p>

        <h4>Priorities</h4>
        <p onClick={() => setFilter("High")} className={filter==="High"?"active":""}>
          🔴 High ({count("High","priority")})
        </p>
        <p onClick={() => setFilter("Medium")} className={filter==="Medium"?"active":""}>
          🟡 Medium ({count("Medium","priority")})
        </p>
        <p onClick={() => setFilter("Low")} className={filter==="Low"?"active":""}>
          🟢 Low ({count("Low","priority")})
        </p>

        <h4>Categories</h4>
        <p onClick={() => setFilter("Work")} className={filter==="Work"?"active":""}>
          💼 Work ({count("Work","category")})
        </p>
        <p onClick={() => setFilter("Personal")} className={filter==="Personal"?"active":""}>
          👤 Personal ({count("Personal","category")})
        </p>
        <p onClick={() => setFilter("General")} className={filter==="General"?"active":""}>
          📦 General ({count("General","category")})
        </p>

        <h4>Status</h4>
        <p onClick={() => setFilter("Completed")} className={filter==="Completed"?"active":""}>
          ✅ Completed ({tasks.filter(t=>t.completed).length})
        </p>
      </div>

      {/* MAIN */}
      <div className="main">

        <h1 className="page-title">{filter} Tasks</h1>

        {filter === "All" && <ProgressTracker tasks={tasks} />}

        <TaskForm addTask={addTask} />

        {filteredTasks.length === 0 ? (
          <div className="empty">
            ✨ No tasks here! Add something 🚀
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        )}

        {tasks.length > 0 && (
          <button onClick={clearTasks} className="clear-btn">
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
}