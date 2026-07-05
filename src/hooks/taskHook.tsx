import { useEffect, useState } from "react";
import { getAllTask, getMyTask } from "../services/taskService";
import { useAuth } from "../context/AuthContext";
import { Categoria, Task } from "../types/types";
import { getAllCategories } from "../services/categoriasService";
import { updateProject } from "../services/projectsService";

export default function useTask(
  refresh: boolean,
  refreshed: boolean,
  projectID?: string,
  userId?: string,
) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mytasks, setMyTasks] = useState<Task[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [promedio, setPromedio] = useState(0);

  const { isLogin } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!projectID) return;
        const response = await getAllTask(projectID, isLogin);
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (isLogin && projectID) {
      fetchTasks();
    }
  }, [projectID, isLogin, refresh, refreshed]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!userId) return;
        const response = await getMyTask(isLogin, userId);
        setMyTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (isLogin && userId) {
      fetchTasks();
    }
  }, [isLogin, refresh, refreshed, userId]);

  useEffect(() => {
    const updateResume = async () => {
      if (!tasks.length || !projectID) return;

      try {
        const progressMap = {
          todo: 0,
          in_progress: 50,
          review: 80,
          done: 100,
        } as const;

        const progress =
          tasks.reduce((sum, task) => sum + progressMap[task.status], 0) /
          tasks.length;

        setPromedio(progress);

        const pendingTasks = tasks.filter(
          (task) => task.status === "todo",
        ).length;

        const inProgressTasks = tasks.filter(
          (task) => task.status === "in_progress",
        ).length;

        const reviewTasks = tasks.filter(
          (task) => task.status === "review",
        ).length;

        const completedTasks = tasks.filter(
          (task) => task.status === "done",
        ).length;

        const estimatedHours = tasks.reduce(
          (sum, task) => sum + (task.estimatedHours ?? 0),
          0,
        );

        const actualHours = tasks.reduce(
          (sum, task) => sum + (task.actualHours ?? 0),
          0,
        );

        const overdueTasks = tasks.filter((task) => {
          if (!task.dueDate || task.status === "done") return false;

          return new Date(task.dueDate) < new Date();
        }).length;

        const projectData = {
          progress,

          metrics: {
            totalTasks: tasks.length,

            pendingTasks,

            inProgressTasks,

            reviewTasks,

            completedTasks,

            totalCategories: categorias.length,

            totalSubTasks: 0,

            estimatedHours,

            actualHours,

            overdueTasks,
          },
        };

        await updateProject(projectID, projectData, isLogin);
      } catch (error) {
        console.error("Error actualizando métricas:", error);
      }
    };

    updateResume();
  }, [tasks, categorias, projectID, isLogin]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        if (!projectID) return;
        const response = await getAllCategories(isLogin, projectID);
        setCategorias(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (isLogin) {
      fetchCategorias();
    }
  }, [isLogin, refresh, refreshed, projectID]);

  return {
    tasks,
    categorias,
    promedio,
    mytasks,
  };
}
