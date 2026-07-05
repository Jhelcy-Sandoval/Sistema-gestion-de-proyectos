import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import { Task } from "../../types/types";
import { getMyTask, getTask } from "../../services/taskService";
import { useEffect, useState } from "react";
import useUserData from "../../hooks/userHooks";

export default function Grafica() {
  const { isLogin } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { userID, userget } = useUserData(false, false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        let response: Task[] = [];

        if (userget?.role === "developer") {
          response = await getMyTask(isLogin, userID);
        } else {
          response = await getTask(isLogin, userID);
        }

        const priorityOrder = {
          high: 3,
          medium: 2,
          low: 1,
        };

        const orderedTasks = response
          .sort((a, b) => {
            const priority =
              priorityOrder[b.priority] - priorityOrder[a.priority];

            if (priority !== 0) return priority;

            const dateA = a.dueDate
              ? new Date(a.dueDate).getTime()
              : Number.MAX_SAFE_INTEGER;

            const dateB = b.dueDate
              ? new Date(b.dueDate).getTime()
              : Number.MAX_SAFE_INTEGER;

            return dateA - dateB;
          })
          .slice(0, 6);

        setTasks(orderedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (isLogin && userID) {
      fetchTask();
    }
  }, [isLogin, userID, userget]);

  const data = tasks.map((task) => ({
    name: task.title,
    progress: task.progress,
    priority: task.priority,
  }));

  return (
    <div className="bg-[--card] border border-slate-200 p-5 rounded-xl text-sm min-h-[400px]">
      <h1 className="text-lg p-2 text-gray-600 font-bold">
        Tareas prioritarias
      </h1>
      <p className="text-gray-500 p-2 mb-3">
        Se muestran el progreso de las 6 tareas más importantes, según prioridad
        y fecha de vencimiento.
      </p>

      {tasks.length > 0 ? (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 20,
              }}
              barSize={25}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                angle={-20}
                textAnchor="end"
                interval={0}
                tickFormatter={(value) =>
                  value.length > 12 ? `${value.substring(0, 12)}...` : value
                }
              />

              <YAxis domain={[0, 100]} />

              <Tooltip />

              <Bar
                dataKey="progress"
                name="Progreso (%)"
                fill="#8884d8"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex justify-center items-center h-80">
          <p className="text-gray-500 text-lg">No tienes tareas asignadas.</p>
        </div>
      )}
    </div>
  );
}
