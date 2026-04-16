import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsloading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) =>
        setUsers(
          res.map(({ name, id, username: lastname, phone, email }) => ({
            name,
            id,
            lastname,
            phone,
            email,
          })),
        ),
      )
      .catch((err) => {
        console.log({ err });
        setError(err.message);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return { users, isLoading, error };
};

export default useUsers;
