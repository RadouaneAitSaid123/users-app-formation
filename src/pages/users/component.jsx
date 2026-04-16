import { useState } from "react";

import InputSearch from "../../components/InputSearch";
import UserList from "../../components/userList";
import UserModal from "../../components/userModal";
import UserDetails from "../user";
import { useNavigate } from "react-router";

const Users = ({
  search,
  setSearch,
  users,
  deleteUser,
  showUserDetails,
  showModal,
  selectedUser,
  hideUserDEtails,
}) => {
  const navigate = useNavigate();
  const goToAddUser = () => navigate("add-user");

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <InputSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={goToAddUser}>Add user</button>
      </div>
      <div className="mt-5">
        <UserList
          search={search}
          users={users}
          deleteUser={deleteUser}
          showModal={showUserDetails}
        />
      </div>
      {showModal && <UserModal user={selectedUser} onClose={hideUserDEtails} />}
    </>
  );
};

export default Users;
