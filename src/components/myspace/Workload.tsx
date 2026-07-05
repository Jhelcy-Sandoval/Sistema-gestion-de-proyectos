import { Task } from "../../types/types";

interface workloadProps {
  mytasks:Task[]
}

export default function Workload({mytasks}:workloadProps) {

  const tasks = mytasks

  const estimatedHours = tasks.reduce(
    (sum, task) => sum + (task.estimatedHours ?? 0),
    0
  );

  const actualHours = tasks.reduce(
    (sum, task) => sum + (task.actualHours ?? 0),
    0
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "done"
  ).length;

  const progress =
    estimatedHours > 0
      ? Math.min((actualHours / estimatedHours) * 100, 100)
      : 0;

  return (
    <div>

      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          Mi carga de trabajo
        </h2>

        <p className="text-gray-400">
          Resumen de tus horas y tareas
        </p>
      </div>

      {/* Horas */}

      <div className="space-y-5">

        <div>

          <div className="flex justify-between mb-2">
            <span>Horas trabajadas</span>

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

        {/* Estadísticas */}

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="rounded-lg border p-4">

            <p className="text-sm text-gray-400">
              Pendientes
            </p>

            <h3 className="text-3xl font-bold text-red-500">
              {pendingTasks}
            </h3>

          </div>

          <div className="rounded-lg border p-4">

            <p className="text-sm text-gray-400">
              Completadas
            </p>

            <h3 className="text-3xl font-bold text-green-500">
              {completedTasks}
            </h3>

          </div>

          <div className="rounded-lg border p-4">

            <p className="text-sm text-gray-400">
              Horas estimadas
            </p>

            <h3 className="text-3xl font-bold">
              {estimatedHours}
            </h3>

          </div>

          <div className="rounded-lg border p-4">

            <p className="text-sm text-gray-400">
              Horas reales
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