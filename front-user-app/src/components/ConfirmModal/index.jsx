import "./ConfirmModal.css";

const ConfirmModal = ({ show, onConfirm, onCancel, userName }) => {
  if (!show) return null;

  return (
    <div
      className="confirm-backdrop"
      onClick={onCancel}
      data-testid="confirm-backdrop"
    >
      <div className="confirm-card" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon-wrap">
          <i className="bi bi-trash3-fill confirm-icon"></i>
        </div>
        <h5 className="confirm-title">Delete User</h5>
        <p className="confirm-message">
          Are you sure you want to delete <strong>{userName}</strong>? This
          action cannot be undone.
        </p>
        <div className="confirm-actions">
          <button className="btn btn-outline-secondary" onClick={onCancel}>
            <i className="bi bi-x-lg me-1"></i> Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            <i className="bi bi-trash3 me-1"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
