import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { SubTask, TaskStatus } from "../types/types";
import { getAllSubTask, getSubTask } from "../services/subTaskService";

export default function useSubTask(
  refreshed: boolean,
  taskID?: string | undefined,
  userID?: string | undefined,
) {
  const [getSubtask, setSubTask] = useState<SubTask[]>([]);
  const [getAllSubtask, setAllSubTask] = useState<SubTask[]>([]);
  const { isLogin } = useAuth();
  const [estado, setEstado] = useState<TaskStatus>("todo");
  const [progreso, setProgreso] = useState<number>();

  useEffect(() => {
    const fetchSubTask = async () => {
      try {
        if (typeof taskID === "string") {
          const response = await getSubTask(taskID, isLogin);
          setSubTask(response);
        }
      } catch (error) {
        console.error("Error fetching subtasks:", error);
      }
    };

    if (isLogin && taskID) {
      fetchSubTask();
    }
  }, [taskID, isLogin, refreshed]);

  useEffect(() => {
    const fetchAllSubtasks = async () => {
      try {
        if (!userID) return;
        const response = await getAllSubTask(userID, isLogin);
        setAllSubTask(response);
      } catch (error) {
        console.error("Error fetching all subtasks:", error);
      }
    };

    if (isLogin && userID) {
      fetchAllSubtasks();
    }
  }, [isLogin, userID]);

  useEffect(() => {
    if (getSubtask.length === 0) {
      setEstado("todo");
      setProgreso(0);
      return;
    }

    const totalSubtasks = getSubtask.length;

    const completedSubtasks = getSubtask.filter(
      (subtask) => subtask.status === "done",
    ).length;

    const porcentaje = Math.round((completedSubtasks / totalSubtasks) * 100);

    setProgreso(porcentaje);

    if (porcentaje === 100) {
      setEstado("done");
    } else if (porcentaje > 0) {
      setEstado("in_progress");
    } else {
      setEstado("todo");
    }
  }, [getSubtask]);

  return { getSubtask, estado, progreso, getAllSubtask };
}
