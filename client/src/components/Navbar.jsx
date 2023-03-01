import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <header>
      <nav>
        {!user ? (
          <>
            <Link to="/">Home</Link> <Link to="/login">Login</Link>{" "}
            <Link to="/signup">Signup</Link>{" "}
          </>
        ) : (
          <>
            <Link to="/">Home</Link> <Link to="/user">Account</Link>{" "}
            <span>{user.email}</span> <button onClick={logout}>Log out</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
