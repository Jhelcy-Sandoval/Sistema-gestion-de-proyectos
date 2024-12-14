import { useEffect, useState } from "react"
import { getAllCategories } from "../services/categoriasService"
import { useAuth } from "../context/AuthContext"
import { Categoria, Task } from '../types/types';
import { getTask } from "../services/taskService";
import useUserData from "./userHooks";

interface Proyecto {
  categoria: string,
  numTareas: number
}

export default function useCategorias (){
  const {isLogin} = useAuth();
  const [getCategories, setCategories] = useState<Categoria[]>([])
  const [getnumTask, setnumTask] = useState<Proyecto[]>([]);
  const [getTasks, setTasks] = useState<Task[]>([]);
  const {userID} = useUserData(false);

  useEffect(() => {
    const fetchTask = async() => {
      try {
        const response = await getTask(isLogin)
        setTasks(response);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }

    fetchTask();
  }, [isLogin, setTasks]);

  useEffect(() => {
    const fetchCategries = async() => {
      try {
        const response = await getAllCategories(isLogin);
        setCategories(response)
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }

    fetchCategries()
  },[])

  useEffect(() => {
    if (getCategories.length === 0 || getTasks.length === 0) return;
  
    const taskCounts = getCategories
      .filter((categoria) => categoria.userID === userID)
      .map((categoria) => {
        const filteredTasks = getTasks.filter((task) =>
          task.Categoría?.includes(categoria._id)
        );
        return {
          categoria: categoria.name,
          numTareas: filteredTasks.length,
        };
      });
  
    setnumTask(taskCounts);
  }, [getTasks, getCategories, userID]);
  

  return{getCategories, getnumTask}
}