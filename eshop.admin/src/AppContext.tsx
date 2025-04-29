import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type AppContextType = {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const isTokenExist = () => {
    const token = localStorage.getItem("jwtToken");
    return !!token;
  };
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return isTokenExist();
  });

  useEffect(() => {
    const tokenFound = isTokenExist();
    setIsLoggedIn(!!tokenFound);
  }, []);

  const setLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };
  return <AppContext.Provider value={{ isLoggedIn, setLoggedIn }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
