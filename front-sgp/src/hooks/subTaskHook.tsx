import { useEffect, useState } from "react";
import { getAllSubTask } from "../services/subTaskService";
import { useAuth } from "../context/AuthContext";
import { SubTask } from "../types/types";

export default function useSubTask (taskID: string | undefined, refreshed:any) {
  const [getSubTask, setSubTask] = useState<SubTask[]>([]);
  const {isLogin} = useAuth();
  const [estado, setEstado] = useState("Pendiente");
  const [progreso, setProgreso] = useState<number>();

  useEffect(() => {
    const fetchSubTask = async() => {
      try {
        if(typeof taskID === 'string'){ 
          const response = await getAllSubTask(taskID, isLogin)
          setSubTask(response)
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }

    if (isLogin && taskID) {
      fetchSubTask();
    }

  }, [taskID, isLogin, refreshed]);

  useEffect(() => {
    const getEstate = () => {
      if (getSubTask.length > 0) {
        const subTaskLength = getSubTask.length;
        const completedTasks = getSubTask.filter(subtask => subtask.hecho).length;

        if (completedTasks === subTaskLength) {
          setEstado("completado");
          setProgreso(100)
        }
        else if (completedTasks > 0) {
          setEstado("en progreso");
          setProgreso(50)
        } 
        else {
          setEstado("pendiente");
          setProgreso(0)
        }
      } else {
        setEstado("pendiente");
        setProgreso(0)
      }
    };

    getEstate();
  }, [getSubTask, refreshed]);

  return {getSubTask, estado, progreso}
}