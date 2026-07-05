import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Categoria, Task } from '../types/types';
import { getTask } from "../services/taskService";
import useUserData from "./userHooks";
import { getCategories } from "../services/categoriasService";

interface Proyecto {
  categoria: string,
  numTareas: number
}


export default function useCategorias (){
  const {isLogin} = useAuth();
  const [categories, setCategories] = useState<Categoria[]>([])
  const [getnumTask, setnumTask] = useState<Proyecto[]>([]);
  const [getTasks, setTasks] = useState<Task[]>([]);
  const {userID} = useUserData(false, false);

  useEffect(() => {
    const fetchTask = async() => {
      try {
        const response = await getTask(isLogin, userID)
        setTasks(response);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }

    if (isLogin && userID) {
      fetchTask();
    }
  }, [isLogin, setTasks, userID]);

  useEffect(() => {
    const fetchCategries = async() => {
      try {
        const response = await getCategories(isLogin);
        setCategories(response)
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }

    fetchCategries()
  },[])

  useEffect(() => {
    if (categories.length === 0 || getTasks.length === 0) return;
  
    const taskCounts = categories
      .filter((categoria) => categoria.userId === userID)
      .map((categoria) => {
        const filteredTasks = getTasks.filter((task) =>
          task.categoryId === categoria._id
        );
        return {
          categoria: categoria.name,
          numTareas: filteredTasks.length,
        };
      });
  
    setnumTask(taskCounts);
  }, [getTasks, categories, userID]);
  

  return{categories, getnumTask}
}