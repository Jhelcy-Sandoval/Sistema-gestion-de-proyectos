import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTask } from "../../services/taskService";
import { Task } from "../../types/types";
import useUserData from "../../hooks/userHooks";

export default function TaskList () {
  const {isLogin} = useAuth();
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

  const taskAlta = getTasks.filter((task) => task.Prioridad === 'alta' && task.userID === userID);
  const taskMedia = getTasks.filter((task) => task.Prioridad === 'media' && task.userID === userID);
  const taskBaja = getTasks.filter((task) => task.Prioridad === 'baja' && task.userID === userID);

  return (
    <>
      <div className="bg-white border border-slate-200 p-4 rounded-xl text-sm">
        <h1 className="text-lg p-2 text-gray-600 font-bold">Lista de tareas por prioridad</h1>
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-red-400 border-t-8 rounded-xl bg-red-200 p-2 space-y-2">
            <p className="text-red-600 font-bold">Prioridad alta</p>
            {taskAlta.length > 0 ? (
              taskAlta.map((task, index) => (
              <div key={index} className="bg-white rounded-xl p-2">
                <p className="text-gray-600">{task.Título}</p>
              </div>
            ))
              ):(
                <p className="text-center text-gray-500">No hay tareas de Prioridad alta</p>
              )}
          </div>
          <div className="border border-amber-400 border-t-8 rounded-xl bg-amber-200 p-2 space-y-2">
            <p className="text-amber-600 font-bold">Prioridad media</p> 
            {taskMedia.length > 0 ? (
              taskMedia.map((task, index) => (
              <div key={index} className="bg-white rounded-xl p-2">
                <p className="text-gray-600">{task.Título}</p>
              </div>
            ))
            ):(
              <p className="text-center text-gray-500">No hay tareas de Prioridad media</p>
            )}
          </div>
          <div className="border border-green-400 border-t-8 rounded-xl bg-green-200 p-2 space-y-2">
            <p className="text-green-600 font-bold">Prioridad baja</p> 
            {taskBaja.length > 0 ? (
              taskBaja.map((task, index) => ( 
              <div key={index} className="bg-white rounded-xl p-2">
                <p className="text-gray-600">{task.Título}</p>
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