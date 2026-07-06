import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useUserData from "../../hooks/userHooks";
import { Task } from "../../types/types";
import { getMyTask, getTask } from "../../services/taskService";

export default function GraficoDos() {
  const { isLogin } = useAuth();
  const { userID, userget } = useUserData(false, false);

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        let response: Task[] = [];

        if (userget?.role === "developer") {
          response = await getMyTask(isLogin, userID);
        } else {
          response = await getTask(isLogin, userID);
        }

        setTasks(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (isLogin && userID) {
      fetchTask();
    }
  }, [isLogin, userID, userget]);

  const data = [
    {
      estado: "To Do",
      tareas: tasks.filter((t) => t.status === "todo").length,
      color: "#f232b1",
    },
    {
      estado: "En progreso",
      tareas: tasks.filter((t) => t.status === "in_progress").length,
      color: "#b460c6",
    },
    {
      estado: "Review",
      tareas: tasks.filter((t) => t.status === "review").length,
      color: "#69a5dc",
    },
    {
      estado: "Done",
      tareas: tasks.filter((t) => t.status === "done").length,
      color: "#5ff9fc",
    },
  ];

  return (
    <div className="bg-[--card] border border-slate-200 rounded-xl p-5">
      <h2 className="text-lg font-bold text-gray-700">Estado de las tareas</h2>

      <p className="text-gray-500 mb-4">
        Distribución de tus tareas según su estado actual.
      </p>
      {tasks.length > 0 ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="estado" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar dataKey="tareas" radius={[6, 6, 0, 0]}>
                {data.map((item) => (
                  <Cell key={item.estado} fill={item.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex justify-center items-center h-80">
          <p className="text-gray-500 text-lg">No tienes tareas.</p>
        </div>
      )}
    </div>
  );
}
