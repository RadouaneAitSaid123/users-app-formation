import { useNavigate } from "react-router";

const UserRow = ({ user, deleteUser, showUserDetails }) => {
  const { name, lastName, email, phone, id } = user;

  const navigate = useNavigate();

  const goToDetails = () => navigate(`view/${id}`);

  const goToEdit = () => navigate(`edit/${id}`);

  return (
    <tr>
      <td>{name}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm me-2"
          onClick={() => deleteUser(id)}
        >
          <i className="bi bi-trash"></i>
        </button>
        <button className="btn btn-info btn-sm me-2" onClick={goToDetails}>
          <i className="bi bi-eye"></i>
        </button>
        <button className="btn btn-success btn-sm" onClick={goToEdit}>
          <i className="bi bi-pen"></i>
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
