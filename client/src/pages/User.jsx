import { useAuthContext } from "../hooks/useAuthContext";

const User = () => {
  const { user } = useAuthContext();

  return (
    <>
      <div className="user-info">
        <h1>User Page</h1>
        <h2>{user.email}</h2>
      </div>
    </>
  );
};

export default User;
