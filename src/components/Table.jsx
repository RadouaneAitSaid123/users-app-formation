const RowTable = ({ user, deleteUser, showUserDetails }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.lastname}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm me-2"
          onClick={() => deleteUser(user.id)}
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

const Table = ({ search, users, deleteUser, showModal }) => {
  const filteredList = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((user) => (
              <RowTable
                key={user.id}
                user={user}
                deleteUser={deleteUser}
                showUserDetails={showModal}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
