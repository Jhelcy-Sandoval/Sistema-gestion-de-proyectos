import { useContext, createContext, useState, useEffect, Children  } from "react"

interface AuthProviderProps {
  children: React.ReactNode; 
};

const AuthContext = createContext ({
  isAuthenticated: (false),
});

export default function AuthProvider ({children}: AuthProviderProps) {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value = {{isAuthenticated}}>
      {children}
    </AuthContext.Provider>

  )
};

export const useAuth = () => useContext(AuthContext);