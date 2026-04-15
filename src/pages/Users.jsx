import { useEffect, useState } from "react";
import InputSearch from "../components/InputSearch";
import Table from "../components/Table";
import UserModal from "../components/UserModal";

const Users = () => {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const showUserDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const hideUserDetails = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <InputSearch value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="mt-5">
        <Table
          search={search}
          users={users}
          deleteUser={deleteUser}
          showModal={showUserDetails}
        />
      </div>
      {showModal && <UserModal user={selectedUser} onClose={hideUserDetails} />}
    </>
  );
};

export default Users;
