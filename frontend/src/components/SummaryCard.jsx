function SummaryCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="summary-card">
      <div className="summary-icon">
        {icon}
      </div>

      <div>
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
    </div>
  );
}

export default SummaryCard;