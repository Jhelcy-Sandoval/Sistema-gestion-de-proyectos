import { useEffect, useState } from "react";
import { getTask } from "../../services/taskService";
import { useAuth } from "../../context/AuthContext";
import { Task } from "../../types/types";
import useUserData from "../../hooks/userHooks";

export default function DateProject() {
  const { isLogin } = useAuth();
  const [getTasks, setTasks] = useState<Task[]>([]);
  const { userID } = useUserData(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(isLogin);
        console.log('Tareas obtenidas:', response);
        setTasks(response);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }

    fetchTask();
  }, [isLogin, setTasks]);

  const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000;
  const currentDate = Date.now();

  // Tareas filtradas por usuario
  const tasksFilteredByUser = getTasks.filter((task) => task.userID === userID);

  // Tareas que no han vencido
  const dateNotExpired = tasksFilteredByUser.filter((task) => {
    const taskDueDate = new Date(task.FechaVencimiento).getTime();
    return taskDueDate > currentDate + threeDaysInMillis;
  });

  // Tareas próximas a vencer (en los próximos 3 días)
  const dateUpcoming = tasksFilteredByUser.filter((task) => {
    const taskDueDate = new Date(task.FechaVencimiento).getTime();
    return taskDueDate >= currentDate && taskDueDate <= currentDate + threeDaysInMillis;
  });

  // Tareas vencidas
  const dateExpired = tasksFilteredByUser.filter((task) => {
    const taskDueDate = new Date(task.FechaVencimiento).getTime();
    return taskDueDate < currentDate;
  });

  return (
    <>
      <h1 className="text-lg p-2 text-gray-600 font-bold">Lista de actividades por fecha</h1>
      <div className="space-y-2">
        <div className="border border-red-400 border-t-8 rounded-xl bg-red-200 p-2 space-y-2">
          <p className="text-red-600 font-bold">Vencidos</p>
          {dateExpired.length > 0 ? (
            dateExpired.map((task, index) => (
              <div key={index} className="bg-white p-2 rounded-xl">
                <p className="text-gray-600 font-bold text-center">{task.Título}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No hay tareas vencidas</p>
          )}
        </div>
        <div className="border border-amber-400 border-t-8 rounded-xl bg-amber-200 p-2 space-y-2">
          <p className="text-amber-600 font-bold">Próximos a vencer</p>
          {dateUpcoming.length > 0 ? (
            dateUpcoming.map((task, index) => (
              <div key={index} className="bg-white p-2 rounded-xl">
                <p className="text-gray-600 font-bold text-center">{task.Título}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No hay tareas próximas a vencer</p>
          )}
        </div>
        <div className="border border-green-400 border-t-8 rounded-xl bg-green-200 p-2 space-y-2">
          <p className="text-green-600 font-bold">Aún no vencen</p>
          {dateNotExpired.length > 0 ? (
            dateNotExpired.map((task, index) => (
              <div key={index} className="bg-white p-2 rounded-xl">
                <p className="text-gray-600 font-bold text-center">{task.Título}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No hay tareas pendientes</p>
          )}
        </div>
      </div>
    </>
  );
}
