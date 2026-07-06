import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTask } from "../../services/taskService";
import { Task } from "../../types/types";
import useUserData from "../../hooks/userHooks";

export default function TaskList () {
  const {isLogin} = useAuth();
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

  const taskAlta = getTasks.filter((task) => task.priority === 'high' && task.userId === userID);
  const taskMedia = getTasks.filter((task) => task.priority === 'medium' && task.userId === userID);
  const taskBaja = getTasks.filter((task) => task.priority === 'low' && task.userId === userID);

  return (
    <>
      <div className="bg-[--card] border border-slate-200 p-4 rounded-xl text-sm">
        <h1 className="text-lg p-2 text-gray-600 font-bold">Lista de tareas por prioridad</h1>
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-[--danger] border-t-8 rounded-xl bg-[--danger-soft] p-2 space-y-2">
            <p className="text-[--danger] font-bold">Prioridad alta</p>
            {taskAlta.length > 0 ? (
              taskAlta.map((task, index) => (
              <div key={index} className="bg-[--card] rounded-xl p-2">
                <p className="text-gray-600">{task.title}</p>
              </div>
            ))
              ):(
                <p className="text-center text-gray-500">No hay tareas de Prioridad alta</p>
              )}
          </div>
          <div className="border border-[--warning] border-t-8 rounded-xl bg-[--warning-soft] p-2 space-y-2">
            <p className="text-[--warning] font-bold">Prioridad media</p> 
            {taskMedia.length > 0 ? (
              taskMedia.map((task, index) => (
              <div key={index} className="bg-[--card] rounded-xl p-2">
                <p className="text-gray-600">{task.title}</p>
              </div>
            ))
            ):(
              <p className="text-center text-gray-500">No hay tareas de Prioridad media</p>
            )}
          </div>
          <div className="border border-[--success] border-t-8 rounded-xl bg-[--success-soft] p-2 space-y-2">
            <p className="text-[--success] font-bold">Prioridad baja</p> 
            {taskBaja.length > 0 ? (
              taskBaja.map((task, index) => ( 
              <div key={index} className="bg-[--card] rounded-xl p-2">
                <p className="text-gray-600">{task.title}</p>
              </div>
            ))
            ):(
              <p className="text-center text-gray-500">No hay tareas de Prioridad baja</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}