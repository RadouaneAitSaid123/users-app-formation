import { useEffect, useState } from "react";

import InputSearch from "../../components/InputSearch";
import UserList from "../../components/userList";
import UserModal from "../../components/userModal";
import Users from "./component";
import useUsers from "../../hooks/useUsers";

const UsersContainer = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { users: allUsers, isLoading, error } = useUsers();

  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const showUserDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const hideUserDEtails = () => {
    setShowModal(false);
    setSelectedUser(null);
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
      showUserDetails={showUserDetails}
      showModal={showModal}
      selectedUser={selectedUser}
      hideUserDEtails={hideUserDEtails}
    />
  );
};

export default UsersContainer;
