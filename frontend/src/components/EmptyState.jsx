function EmptyState({
  title = "No Employees Found",
  message = "There are no employees to display.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        👥
      </div>

      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;