import { useEffect } from "react";
import useUser from "../../hooks/useUser";

const UserDetails = ({ id }) => {
  const { user, error, isLoading } = useUser(id);

  console.log({ user, error, isLoading, id });

  return (
    <div>
      <h1>User details</h1>
    </div>
  );
};

export default UserDetails;
