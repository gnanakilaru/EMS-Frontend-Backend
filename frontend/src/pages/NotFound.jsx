import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        The page you requested does not exist.
      </p>

      <button
        className="primary-button"
        onClick={() =>
          navigate("/dashboard")
        }
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default NotFound;