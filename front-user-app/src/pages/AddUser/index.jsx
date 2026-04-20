import { useState } from "react";
import { useNavigate } from "react-router";
import UserForm from "../../components/UserForm";
import { useAlert } from "../../context/AlertContext";

const AddUser = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

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
      .then(() => {
        showAlert("User added successfully!", "success");
        navigate("/users");
      })
      .catch(() => showAlert("Failed to add user. Please try again.", "danger"));
  };

  return (
    <div>
      <h1>Add user form</h1>
      <UserForm handleChange={handleChange} handleSubmit={addUser} user={user} label="Add" />
    </div>
  );
};

export default AddUser;
