import { useEffect, useState } from "react";

const useUser = (userId) => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      setIsloading(true);
      setError(null);

      fetch("https://jsonplaceholder.typicode.com/users" + "/" + userId)
        .then((res) => res.json())
        .then((res) => setUser({ ...res, lastname: res.username }))
        .catch((err) => {
          console.log({ err });
          setError(err.message);
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  }, [userId]);

  return { user, isLoading, error };
};

export default useUser;
