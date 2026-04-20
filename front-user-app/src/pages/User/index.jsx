import { useNavigate, useParams } from "react-router";

import useUser from "../../hooks/useUser";

const UserDetails = () => {
  const { id } = useParams();
  const { user, isLoading } = useUser(id);

  const navigate = useNavigate();

  const goToUsersPage = () => navigate("/users");
  const goToEditUser = () => navigate(`/users/edit/${id}`);

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">User Details</h4>
            </div>

            <div className="card-body">
              <div className="mb-3">
                <label className="text-muted small">Name</label>
                <p className="fs-5 fw-bold">{user.name}</p>
              </div>
              <hr />
              <div className="mb-3">
                <label className="text-muted small">Lastname</label>
                <p className="fs-5 fw-bold">{user.lastName}</p>
              </div>
              <hr />
              <div className="mb-3">
                <label className="text-muted small">Email</label>
                <p className="fs-5 fw-bold">{user.email}</p>
              </div>
              <hr />
              <div className="mb-4">
                <label className="text-muted small">Phone</label>
                <p className="fs-5 fw-bold">{user.phone}</p>
              </div>
            </div>

            <div className="card-footer bg-light">
              <div className="d-flex gap-2">
                <button onClick={goToEditUser} className="btn btn-success flex-grow-1">
                  <i className="bi bi-pen me-2"></i>Edit User
                </button>
                <button onClick={goToUsersPage} className="btn btn-secondary flex-grow-1">
                  <i className="bi bi-arrow-left me-2"></i>Back to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
