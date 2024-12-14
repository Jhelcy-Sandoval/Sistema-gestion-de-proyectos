import { useEffect, useState } from "react";
import { getAllTask } from "../services/taskService";
import { useAuth } from "../context/AuthContext";
import { Task } from "../types/types";
import { getAllCategories } from "../services/categoriasService";
import { updateProject } from "../services/projectsService";

interface Categorias {
  name: string;
  _id: string;
  projectID: string;
}

export default function useTask (projectID: string, refresh: boolean, refreshed: boolean){
  const [tasks, setGetTasks] = useState<Task[]>([]);
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const [promedios, setPromedio] = useState<Number>()
  const {isLogin} = useAuth();

  useEffect(() => {
    const getTasks = async() => {
      try {
        const response = await getAllTask(projectID, isLogin);
        setGetTasks(response);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
  
    if (isLogin && projectID) {
      getTasks();
    }
  }, [isLogin, projectID, refresh, refreshed]);
  
  useEffect(() => {
    const resumen = async () => {
      try {
        if (tasks && tasks.length > 0) {
          const progresoArray = tasks.map((task) => task.Progreso || 0);
          const sumaprogreso = progresoArray.reduce((sum, progreso) => sum + progreso, 0);
          const getPromedio = sumaprogreso / progresoArray.length;
      
          console.log("Promedio de Progreso:", getPromedio);

          setPromedio(getPromedio)
      
          const projectID =  tasks[0]?.projectID;  
          const countTaks = tasks.length;
          const setPendientes = tasks.filter((task) => task.Estado === "pendiente");
          const getPendientes = setPendientes.length;
          const setEnprogreso = tasks.filter((task) => task.Estado === "en progreso");
          const getEnprogreso = setEnprogreso.length;
          const setCompletada = tasks.filter((tasks) => tasks.Estado === "completado");
          const getCompletada = setCompletada.length;

          const ProjectsData = {
            promedio: getPromedio,
            taks: countTaks,
            pendientes: getPendientes,
            enprogreso: getEnprogreso,
            completada: getCompletada
          }
          
          const response = await updateProject(projectID, ProjectsData, isLogin);  
                    
          return response;
        } else {
          console.log("No hay tareas disponibles para calcular el promedio.");
          return 0;
        }
      } catch (error) {
        console.error("Error al calcular el promedio o al obtener el resumen:", error);
        return 0;
      }
    };
    
    if (tasks && tasks.length > 0) {
      resumen();
    }
  }, [tasks, setPromedio]);
  

  useEffect(() => {
    const getCategorias = async() => {
      try {
        const response = await getAllCategories(isLogin)
        setCategorias(response)
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }

    if (isLogin) {
      getCategorias();
    }
  }, [setCategorias, isLogin, refresh, refreshed])

  return {tasks, categorias, promedios}
}