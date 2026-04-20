import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsloading(true);
    setError(null);

    fetch("http://localhost:5051/api/users")
      .then((res) => res.json())
      .then((res) => setUsers(res))
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
