function DeleteModal({
  employee,
  onCancel,
  onConfirm,
  loading,
}) {
  if (!employee) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-icon">
          ⚠️
        </div>

        <h2>Delete Employee</h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>
            {employee.name}
          </strong>
          ?
        </p>

        <div className="modal-actions">
          <button
            className="secondary-button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="danger-button"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;