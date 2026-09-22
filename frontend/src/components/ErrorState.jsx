function ErrorState({
  message,
  onRetry,
}) {
  return (
    <div className="error-box">
      <span>
        {message ||
          "Something went wrong"}
      </span>

      {onRetry && (
        <button onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;