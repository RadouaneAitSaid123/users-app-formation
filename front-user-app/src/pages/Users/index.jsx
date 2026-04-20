import { useEffect, useState } from "react";

import Users from "./UsersView";
import useUsers from "../../hooks/useUsers";

const UsersContainer = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const { users: allUsers, isLoading, error } = useUsers();

  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  const deleteUser = (id) => {
    fetch(`http://localhost:5051/api/users/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((err) => console.log({ err }));
  };

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        Loading data ....
      </div>
    );

  if (error) return <div>{error}</div>;

  return (
    <Users
      search={search}
      setSearch={setSearch}
      users={users}
      deleteUser={deleteUser}
    />
  );
};

export default UsersContainer;
