import { useState } from "react";

import InputSearch from "../../components/InputSearch";
import UserList from "../../components/userList";
import UserModal from "../../components/userModal";
import UserDetails from "../user";

const Users = ({
  search,
  setSearch,
  users,
  deleteUser,
  showUserDetails,
  showModal,
  selectedUser,
  hideUserDEtails,
}) => (
  <>
    <InputSearch value={search} onChange={(e) => setSearch(e.target.value)} />
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

export default Users;
