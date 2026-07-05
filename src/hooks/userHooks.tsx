import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getOneUser } from "../services/userService";
import { Roles, User } from "../types/types";
import { useAuth } from "../context/AuthContext";
import { getOneRole } from "../services/RoleService";
import { getDevelopers } from "../services/userService";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

interface Developer {
  _id: string;
  name: string;
  email: string;
}

export default function useUserData(refresh: boolean, developers: boolean) {
  const [userData, setUserData] = useState<CustomJwtPayload | undefined>(
    undefined,
  );
  const [userget, setUserget] = useState<User | null>(null);
  const [userID, setUserID] = useState<string>("");
  const [getRole, setgetRole] = useState<Roles | undefined>(undefined);
  const [roleget, setRole] = useState<object | undefined>(undefined);
  const [hasFetchedRole, setHasFetchedRole] = useState(false);
  const [usersDevelopers, setUsersDevelopers] = useState<Developer[]>([]);
  const { isLogin, user } = useAuth();

  useEffect(() => {
    const userDecode = () => {
      try {
        const decode = jwtDecode<CustomJwtPayload>(user.token);
        setUserData(decode);
      } catch (error) {
        console.error("Invalid token provided.");
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
            setUserID(usuario);
          } else {
            setUserID("no Id");
          }
        } else {
          console.error("User ID not found in token.");
        }
      } catch (error) {
        console.error("Invalid token provided.", error);
      }
    };

    if (userData) {
      fetchUser();
    }
  }, [userData, isLogin, refresh]);

  useEffect(() => {
    if (!userget) return;

    const role = userget?.rol?.[0];
    setRole(role);

    const fetchRole = async () => {
      try {
        const userRole = await getOneRole(roleget ?? "", isLogin);
        setgetRole(userRole);
      } catch (error) {
        console.error("Error fetching role:", error);
      } finally {
        setHasFetchedRole(true);
      }
    };

    if (roleget && !hasFetchedRole) {
      fetchRole();
    }
  }, [userget, roleget, isLogin, hasFetchedRole]);

  useEffect(() => {
    if (!developers) return;

    const fetchDevelopers = async () => {
      try {
        const users = await getDevelopers(isLogin);
        setUsersDevelopers(users);
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    };

    fetchDevelopers();
  }, [developers, isLogin]);
  return { userData, userget, userID, roleget, usersDevelopers, getRole };
}
