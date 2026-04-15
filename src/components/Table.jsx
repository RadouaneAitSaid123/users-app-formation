const RowTable = ({ user, deleteUser, showUserDetails }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm me-2"
          onClick={() => deleteUser(user.id)}
        >
          <i className="bi bi-trash"></i>
        </button>
        <button
          className="btn btn-info btn-sm"
          onClick={() => showUserDetails(user)}
        >
          <i className="bi bi-eye"></i>
        </button>
      </td>
    </tr>
  );
};

const Table = ({ search, users, deleteUser, showModal }) => {
  const filteredList = users.filter((user) => {
    const q = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(q) ||
      user.username.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.phone.toLowerCase().includes(q) 
    );
  });

  return (
    <>
      <div>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-3">
                  Any user find
                </td>
              </tr>
            ) : (
              filteredList.map((user) => (
                <RowTable
                  key={user.id}
                  user={user}
                  deleteUser={deleteUser}
                  showUserDetails={showModal}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
