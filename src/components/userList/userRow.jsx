
const UserRow = ({ user, deleteUser, showUserDetails }) => {
  const { name, lastname, email, phone, id} = user;
  return (
    <tr>
      <td>{name}</td>
      <td>{lastname}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm me-2"
          onClick={() => deleteUser(id)}
        >
          <i className="bi bi-trash"></i>
        </button>
        <button className="btn btn-info btn-sm" onClick={() => showUserDetails(user)}>
          <i className="bi bi-eye"></i>
        </button>
      </td>
    </tr>
  );
};

export default UserRow