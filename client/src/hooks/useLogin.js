import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const baseURL = "https://capstone-backend-lu6u.onrender.com";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${baseURL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(result.error);
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(result));

      // update the auth context
      dispatch({ type: "LOGIN", payload: result });

      // update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
