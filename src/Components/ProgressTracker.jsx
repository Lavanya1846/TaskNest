export default function ProgressTracker({ tasks }) {
  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const percent = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div className="dashboard">
      <div className="card">
        <h2>{total}</h2>
        <p>Total Tasks</p>
      </div>

      <div className="card">
        <h2>{completed}</h2>
        <p>Completed</p>
      </div>

      <div className="card">
        <h2>{Math.round(percent)}%</h2>
        <p>Progress</p>
      </div>
    </div>
  );
}