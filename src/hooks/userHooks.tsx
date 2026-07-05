import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

import { getOneUser, getDevelopers } from "../services/userService";

import { User, UserTask } from "../types/types";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export default function useUserData(
  refresh = false,
  developers = false
) {
  const { isLogin, user } = useAuth();

  const [userData, setUserData] = useState<CustomJwtPayload>();
  const [userget, setUserget] = useState<User | null>(null);

  const [usersDevelopers, setUsersDevelopers] = useState<UserTask[]>([]);

  useEffect(() => {
    if (!user?.token) return;

    try {
      const decoded = jwtDecode<CustomJwtPayload>(user.token);
      setUserData(decoded);
    } catch {
      console.error("Invalid token");
    }
  }, [user?.token]);

  useEffect(() => {
    if (!userData?.id) return;

    const fetchUser = async () => {
      try {
        const response = await getOneUser(userData.id, isLogin);
        setUserget(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userData, isLogin, refresh]);

  useEffect(() => {
    if (!developers) return;

    const fetchDevelopers = async () => {
      try {
        const response = await getDevelopers(isLogin);
        setUsersDevelopers(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDevelopers();
  }, [developers, isLogin]);

  return {
    userData,
    userID: userData?.id ?? "",
    userget,
    usersDevelopers,
  };
}