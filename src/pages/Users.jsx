import { useState } from "react";
import InputSearch from "../components/InputSearch";
import Table from "../components/Table";
import UserModal from "../components/UserModal";

const Users = () => {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice",
      lastname: "Martin",
      email: "alice.martin@mail.com",
      phone: "0601020304",
    },
    {
      id: 2,
      name: "Bob",
      lastname: "Dupont",
      email: "bob.dupont@mail.com",
      phone: "0602030405",
    },
    {
      id: 3,
      name: "Carol",
      lastname: "Bernard",
      email: "carol.bernard@mail.com",
      phone: "0603040506",
    },
    {
      id: 4,
      name: "David",
      lastname: "Petit",
      email: "david.petit@mail.com",
      phone: "0604050607",
    },
    {
      id: 5,
      name: "Emma",
      lastname: "Robert",
      email: "emma.robert@mail.com",
      phone: "0605060708",
    },
    {
      id: 6,
      name: "Fabien",
      lastname: "Richard",
      email: "fabien.richard@mail.com",
      phone: "0606070809",
    },
    {
      id: 7,
      name: "Grace",
      lastname: "Simon",
      email: "grace.simon@mail.com",
      phone: "0607080910",
    },
    {
      id: 8,
      name: "Hugo",
      lastname: "Laurent",
      email: "hugo.laurent@mail.com",
      phone: "0608091011",
    },
    {
      id: 9,
      name: "Iris",
      lastname: "Michel",
      email: "iris.michel@mail.com",
      phone: "0609101112",
    },
    {
      id: 10,
      name: "Julien",
      lastname: "Garcia",
      email: "julien.garcia@mail.com",
      phone: "0610111213",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [showModal, setShowModal] = useState(false);

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
      {showModal && <UserModal user={selectedUser} onClose={hideUserDEtails} />}
    </>
  );
};

export default Users;
