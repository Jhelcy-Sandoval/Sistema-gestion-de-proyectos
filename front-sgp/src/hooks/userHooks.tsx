import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { getOneUser } from "../services/userService";
import { User } from "../types/types";
import { useAuth } from "../context/AuthContext";

interface CustomJwtPayload extends JwtPayload {
  id: string; 
}

export default function useUserData() {
  const [userData, setUserData] = useState<CustomJwtPayload | undefined>(undefined);
  const [userget, setUserget] = useState<User | null>(null);
  const [userID, setUserID] = useState<string>('');
  const {isLogin, user} = useAuth();

  useEffect(() => {
    const userDecode = () => {
      try {
        const decode = jwtDecode<CustomJwtPayload>(user.token);         
        setUserData(decode); 
      } catch (error) {
        console.error('Invalid token provided.');
        setUserData(undefined);
      }
    };

    if (user.token) {
      userDecode(); 
    }
  }, [user.token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usuario = userData?.id; 
        if (usuario) {
          const getUser = await getOneUser(usuario, isLogin); 
          setUserget(getUser); 
          if (typeof usuario === "string") {
            setUserID(usuario)
          } else {
            setUserID('no Id')
          }
        } else {
          console.error('User ID not found in token.');
        }
      } catch (error) {
        console.error('Invalid token provided.', error);
      }
    };

    if (userData) {
      fetchUser(); 
    }
  }, [userData, isLogin]);

  return { userData, userget, userID };
}
