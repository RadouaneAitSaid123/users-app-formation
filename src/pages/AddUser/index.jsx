// gestion d'etat
// cliquer sur "ajouter" => go to users page

import { useState } from "react";
import { useNavigate } from "react-router";

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
    navigate("/users");
  };

  return (
    <div>
      <h1>Add user form</h1>

      <div>
        <div>
          <label>Name: </label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div>
          <label>Lastname: </label>
          <input type="text" name="lastName" onChange={handleChange} />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <button onClick={addUser}>Add</button>
      </div>
    </div>
  );
};

export default AddUser;
