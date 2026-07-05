import {useState, createContext, useContext} from "react";
import {Register, Login} from "../Auth/authService"
import { AuthContextType, AuthProviderProps, User, AuthResponseError } from '../types/types';
import axios from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLogin, setIslogin] = useState<any>(null);
  const [error, setError] = useState<AuthResponseError | null>(null)

  const signup = async (user: User) => {
    try {
      const response = await Register(user);  
      setUser(response.data); 
      console.log(user); 
  
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'Ocurrió un error desconocido';
        setError({ body: { error: errorMessage } });
      } else {
        setError({ body: { error: 'Ocurrió un error desconocido' } });
      }
    }
  };
  
  const signin = async (user: User) => {
    try {
      const response = await Login(user); 
      setUser(response);
      if (response) {
        setisAuthenticated(true); 
      } else {
        setisAuthenticated(false)
      }
      setIslogin(response.token);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'Ocurrió un error desconocido';
        setError({ body: { error: errorMessage } });
      } else {
        setError({ body: { error: 'Ocurrió un error desconocido' } });
        console.log(error);
      } 
    }
  }

  const logout = async () => {
    setisAuthenticated(false);
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        isLogin,
        user,
        isAuthenticated,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};