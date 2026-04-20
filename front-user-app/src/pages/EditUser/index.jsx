import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useUser from "../../hooks/useUser";
import UserForm from "../../components/UserForm";

const EditUser = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const { user: userById, isLoading } = useUser(id);

    const [user, setUser] = useState({
        name: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        if (userById && userById.name) {
            setUser({
                name: userById.name,
                lastName: userById.lastName,
                email: userById.email,
            });
        }
    }, [userById]);

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };

    const editUser = () => {
        fetch(`http://localhost:5051/api/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then(() => navigate("/users"))
            .catch((err) => console.log({ err }));
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit user form</h1>
            <UserForm handleChange={handleChange} handleSubmit={editUser} user={user} label="Edit" />
        </div>
    );
};

export default EditUser;