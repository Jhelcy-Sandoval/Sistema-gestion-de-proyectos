import { Task } from "../../types/types";

interface CalendarProps {
  mytasks: Task[];
  role: string | undefined;
}

export default function Calendar({ mytasks, role }: CalendarProps) {
  const tasks = mytasks;

  const upcomingTasks = tasks
    .filter((task) => task.dueDate)
    .sort(
      (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
    )
    .slice(0, 6);

  const texts = {
    title:
      role === "developer"
        ? "Próximos vencimientos"
        : "Próximos vencimientos del equipo",

    description:
      role === "developer"
        ? "Tus tareas para los próximos días"
        : "Tareas del equipo para los próximos días",

    empty:
      role === "developer"
        ? "No tienes tareas programadas."
        : "No hay tareas programadas para el equipo.",
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">{texts.title}</h2>

        <p className="text-gray-400">{texts.description}</p>
      </div>

      {upcomingTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="mt-4 text-gray-400">{texts.empty}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingTasks.map((task) => {
            const dueDate = new Date(task.dueDate!);
            const today = new Date();

            const diffDays = Math.ceil(
              (dueDate.getTime() - today.getTime()) /
                (1000 * 60 * 60 * 24),
            );

            return (
              <div
                key={task._id}
                className="flex items-center justify-between border rounded-lg p-3 hover:border-sky-500"
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>

                  <p className="text-sm text-gray-400">{task.projectId}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {dueDate.toLocaleDateString("es-CO")}
                  </p>

                  <span
                    className={`text-xs ${
                      diffDays < 0
                        ? "text-red-500"
                        : diffDays <= 2
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  >
                    {diffDays < 0
                      ? "Vencida"
                      : diffDays === 0
                      ? "Hoy"
                      : diffDays === 1
                      ? "Mañana"
                      : `En ${diffDays} días`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}