import { Link } from "react-router-dom";
import { Task } from "../../types/types";

interface tasksProps {
  mytasks:Task[]
}

export default function TaskList({mytasks}:tasksProps) {

  const myTasks = mytasks

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-2xl font-bold">Mis tareas</h2>
          <p className="text-gray-400">Tareas asignadas a ti</p>
        </div>

        <Link to="/projects" className="text-blue-500 hover:underline">
          Ver todas
        </Link>
      </div>

      {myTasks.length === 0 ? (
        <div className="text-center py-16">
          <p className="mt-4 text-gray-400">
            No tienes tareas asignadas.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {myTasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center p-4 rounded-xl border hover:border-sky-500 transition"
            >
              <div className="flex items-center gap-4">
                <div>
                  {task.status === "todo" && (
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                  )}

                  {task.status === "in_progress" && (
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  )}

                  {task.status === "review" && (
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                  )}

                  {task.status === "done" && (
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold">{task.title}</h3>

                  <p className="text-sm text-gray-400">
                    {task.projectId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.priority}
                </span>

                <span className="text-sm text-gray-400">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString("es-CO")
                    : "--"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}