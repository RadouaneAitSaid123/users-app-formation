import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

import useUser from "../../hooks/useUser";

const UserDetails = () => {
  const { id } = useParams();
  const { user, error, isLoading } = useUser(id);

  const navigate = useNavigate();

  const goToUsersPage = () => navigate("/users");

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading data ....
      </div>
    );

  return (
    <div style={{}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Details</h5>
            <button className="btn-close"></button>
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
            <button onClick={goToUsersPage} className="btn btn-secondary">
              go to user list
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
