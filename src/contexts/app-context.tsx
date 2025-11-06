"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

interface AppContextType {
  isMock: boolean;
  setIsMock: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [isMock, setIsMock] = useState(true);

  return (
    <AppContext.Provider value={{ isMock, setIsMock }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
