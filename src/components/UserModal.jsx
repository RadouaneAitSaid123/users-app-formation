const UserModal = ({ user, onClose }) => {
  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Details</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p>
              <strong>Name :</strong> {user.name}
            </p>
            <p>
              <strong>Lastname :</strong> {user.lastname}
            </p>
            <p>
              <strong>Email :</strong> {user.email}
            </p>
            <p>
              <strong>Phone :</strong> {user.phone}
            </p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
