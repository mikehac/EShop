import { useState, useEffect } from "react";
import { checkLogin } from "../utils/service";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await checkLogin();

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return { isAuthenticated, loading, checkAuth };
}
