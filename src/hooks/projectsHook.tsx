import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProjects } from "../services/projectsService";
import useUserData from "./userHooks";
import { ProjectsData } from "../types/types";

export default function useProject (refreshed: boolean, refresh: boolean){
  const { userID } = useUserData(false, false);
  const { isLogin } = useAuth();
  const [ getProject, setProjects] = useState<ProjectsData[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userProjects = await getProjects(userID, isLogin);
        setProjects(userProjects);
      } catch (error: unknown) {
        console.error('Error fetching files:', error);
      }
    }

    if (isLogin && userID) {
      fetchProjects();
    }
  }, [isLogin, refreshed, userID, refresh]);

  return {getProject, setProjects}
}