import InputSearch from "../../components/InputSearch";
import UserList from "../../components/UserList";
import { useNavigate } from "react-router";

const Users = ({
  search,
  setSearch,
  users,
  deleteUser,
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
        <button className="btn btn-primary" onClick={goToAddUser}>Add user</button>
      </div>
      <div className="mt-5">
        <UserList
          search={search}
          users={users}
          deleteUser={deleteUser}
        />
      </div>
    </>
  );
};

export default Users;
