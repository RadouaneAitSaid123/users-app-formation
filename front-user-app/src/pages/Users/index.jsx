import { useEffect, useState } from "react";

import Users from "./UsersView";
import useUsers from "../../hooks/useUsers";
import { useAlert } from "../../context/AlertContext";
import ConfirmModal from "../../components/ConfirmModal";

const UsersContainer = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);

  const { users: allUsers, isLoading, error } = useUsers();
  const { showAlert } = useAlert();

  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  const requestDelete = (id) => {
    const user = users.find((u) => u.id === id);
    setPendingDelete(user ?? { id });
  };

  const confirmDelete = () => {
    const { id } = pendingDelete;
    setPendingDelete(null);
    fetch(`http://localhost:5051/api/users/${id}`, { method: "DELETE" })
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        showAlert("User deleted successfully.", "success");
      })
      .catch(() => showAlert("Failed to delete user. Please try again.", "danger"));
  };

  if (isLoading)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        Loading data ....
      </div>
    );

  if (error) return <div>{error}</div>;

  return (
    <>
      <Users
        search={search}
        setSearch={setSearch}
        users={users}
        deleteUser={requestDelete}
      />
      <ConfirmModal
        show={!!pendingDelete}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
        userName={
          pendingDelete
            ? `${pendingDelete.name ?? ""} ${pendingDelete.lastName ?? ""}`.trim() || "this user"
            : ""
        }
      />
    </>
  );
};

export default UsersContainer;
