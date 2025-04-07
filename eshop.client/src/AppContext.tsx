import { createContext, ReactNode, useState } from "react";

export type AppContextType = {
  totalItemsInCart: number;
  setTotalItems: (amount: number) => void;
};
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [totalItemsInCart, setTotalItemsInCart] = useState<number>(() => {
    // Retrieve the value from localStorage when the app initializes
    const storedValue = localStorage.getItem("totalItemsInCart");
    return storedValue ? parseInt(storedValue, 10) : 0;
  });
  const setTotalItems = (amount: number) => {
    setTotalItemsInCart(amount);
    localStorage.setItem("totalItemsInCart", amount.toString()); // Persist the value in localStorage
  };
  return <AppContext.Provider value={{ totalItemsInCart, setTotalItems }}>{children}</AppContext.Provider>;
};
