import { useEffect, useState } from "react";
import useUserData from "./userHooks";
import { getOneRole } from "../services/RoleService";
import { Roles } from "../types/types";
import { useAuth } from "../context/AuthContext";

export default function useRole() {
  const {userget} = useUserData()
  const [roleget, setRole] = useState<object | undefined>(undefined)
  const [hasFetchedRole, setHasFetchedRole] = useState(false);
  const [getRole, setgetRole] = useState<Roles | undefined>(undefined);
  const {isLogin} = useAuth();
  
  useEffect(() => {
    const role = userget?.rol[0]
    setRole(role)
    const fetchRole = async () => {
      try {
        if (roleget && !hasFetchedRole) { 
          const userRole = await getOneRole(roleget, isLogin);
          setHasFetchedRole(true);  
          setgetRole(userRole);
        } 
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    if (roleget && !hasFetchedRole) {
      fetchRole();
    }
  }, [roleget, isLogin, hasFetchedRole]);

  return {roleget, getRole, setHasFetchedRole, setRole};
}