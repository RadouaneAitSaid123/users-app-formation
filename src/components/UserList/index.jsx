import { useMemo } from "react";

import UserRow from "./UserRow";

const Table = ({ search, users, deleteUser }) => {
  const filteredList = useMemo(
    () =>
      users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, users],
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
            {filteredList.map((user, index) => (
              <UserRow
                key={user.id}
                user={user}
                deleteUser={deleteUser}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;