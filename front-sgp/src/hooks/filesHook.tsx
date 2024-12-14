import { useEffect, useState } from "react";
import { getFiles } from "../services/filesService";
import { useAuth } from "../context/AuthContext";
import useUserData from "./userHooks";

interface FileData {
  nombre: string;
  data: string;
  tipo: string;
  user: string;
  projects: string;
  _id: string;
  taskID:string;
}

export default function useFiles ( refreshed: boolean) {
  const [filesget, setFiles] = useState<FileData[]>([]);
  const [refresh, setRefresh] = useState(false); 
  const {isLogin} = useAuth();
  const {userID} = useUserData(refresh);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const userFiles = await getFiles(isLogin, userID);
        setFiles(userFiles);
      } catch (error: unknown) {
        console.error('Error fetching files:', error);
      }
    };
  
    if (isLogin && userID) {
      fetchFiles();
    }
  }, [isLogin, userID, refresh, refreshed, setRefresh]);
  
  return{filesget, setFiles}
}