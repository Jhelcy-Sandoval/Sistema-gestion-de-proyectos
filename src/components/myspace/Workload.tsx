import { Task } from "../../types/types";

interface WorkloadProps {
  mytasks: Task[];
  role: string | undefined;
}

export default function Workload({
  mytasks,
  role,
}: WorkloadProps) {
  const estimatedHours = mytasks.reduce(
    (sum, task) => sum + (task.estimatedHours ?? 0),
    0
  );

  const actualHours = mytasks.reduce(
    (sum, task) => sum + (task.actualHours ?? 0),
    0
  );

  const completedTasks = mytasks.filter(
    (task) => task.status === "done"
  ).length;

  const pendingTasks = mytasks.filter(
    (task) => task.status !== "done"
  ).length;

  const progress =
    estimatedHours > 0
      ? Math.min((actualHours / estimatedHours) * 100, 100)
      : 0;

  const texts = {
    title:
      role === "developer"
        ? "Mi carga de trabajo"
        : "Carga de trabajo del equipo",

    description:
      role === "developer"
        ? "Resumen de tus horas y tareas"
        : "Resumen de las horas y tareas del equipo",

    workedHours:
      role === "developer"
        ? "Horas trabajadas"
        : "Horas trabajadas por el equipo",

    pending: "Pendientes",
    completed: "Completadas",

    estimatedHours:
      role === "developer"
        ? "Horas estimadas"
        : "Horas estimadas del equipo",

    actualHours:
      role === "developer"
        ? "Horas reales"
        : "Horas reales del equipo",
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">{texts.title}</h2>

        <p className="text-gray-400">
          {texts.description}
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            <span>{texts.workedHours}</span>

            <span>
              {actualHours} / {estimatedHours} h
            </span>
          </div>

          <div className="bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-400">
              {texts.pending}
            </p>

            <h3 className="text-3xl font-bold text-red-500">
              {pendingTasks}
            </h3>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-400">
              {texts.completed}
            </p>

            <h3 className="text-3xl font-bold text-green-500">
              {completedTasks}
            </h3>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-400">
              {texts.estimatedHours}
            </p>

            <h3 className="text-3xl font-bold">
              {estimatedHours}
            </h3>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-400">
              {texts.actualHours}
            </p>

            <h3 className="text-3xl font-bold">
              {actualHours}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}