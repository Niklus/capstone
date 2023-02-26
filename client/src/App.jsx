import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import User from "./pages/User";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

const App = () => {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/user"
          element={user ? <User /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/user" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/user" /> : <Signup />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
