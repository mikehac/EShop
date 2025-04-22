import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { checkLogin } from "./utils/service";

export type AppContextType = {
  totalItemsInCart: number;
  setTotalItems: (amount: number) => void;
  isAuthenticated: boolean;
  setAuth: (value: boolean) => void;
  loading: boolean;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Cart items state
  const [totalItemsInCart, setTotalItemsInCart] = useState<number>(() => {
    // Retrieve the value from localStorage when the app initializes
    const storedValue = localStorage.getItem("totalItemsInCart");
    return storedValue ? parseInt(storedValue, 10) : 0;
  });

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await checkLogin();
        setIsAuthenticated(response.ok);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Functions to update state
  const setTotalItems = (amount: number) => {
    setTotalItemsInCart(amount);
    localStorage.setItem("totalItemsInCart", amount.toString()); // Persist the value in localStorage
  };

  const setAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  return (
    <AppContext.Provider
      value={{
        totalItemsInCart,
        setTotalItems,
        isAuthenticated,
        setAuth,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use app context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
