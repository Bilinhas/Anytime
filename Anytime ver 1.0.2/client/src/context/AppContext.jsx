//app context - estados globais e requisições

import { createContext, useContext, useState } from "react";
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const clearError = () => setError(null);
  const value = {
    isLoading,
    searchQuery,
    error,
    setIsLoading,
    setSearchQuery,
    setError,
    clearError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de AppProvider");
  }

  return context;
}

export default AppContext;
