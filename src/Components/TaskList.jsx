export default function TaskList({ tasks, updateTask, deleteTask }) {
  const toggleComplete = (index) => {
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
    updateTask(updatedTask, index);
    if (!tasks[index].completed) {
      alert("Successfully Completed!");
    } else {
      alert("Marked as Incomplete!");
    }
  };

  const handleDelete = (index) => {
    deleteTask(index);
    alert("Deleted Successfully!");
  };
 return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index} className={task.completed ? "completed" : ""}>
          <div>
            <span>{task.text}</span>
            </div>
             <div>
            <small className={`priority ${task.priority}`}>
              {task.priority}
            </small>
            <small className={`category ${task.category}`}>
              {task.category}
            </small>
           <button onClick={() => toggleComplete(index)}className="complete-btn">
      {task.completed ? "Undo" : "Complete"}
     </button>

<button onClick={() => handleDelete(index)}className="delete-btn">Delete</button>

          </div>
        </li>
      ))}
    </ul>
  );
}

