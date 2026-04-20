import { useState } from "react";
import { useNavigate } from "react-router";
import UserForm from "../../components/UserForm";

const AddUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const addUser = () => {
    fetch("http://localhost:5051/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(() => navigate("/users"))
      .catch((err) => console.log({ err }));
  };

  return (
    <div>
      <h1>Add user form</h1>
      <UserForm handleChange={handleChange} handleSubmit={addUser} user={user} label="Add" />
    </div>
  );
};

export default AddUser;
