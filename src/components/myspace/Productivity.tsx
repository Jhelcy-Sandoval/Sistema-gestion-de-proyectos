import useProject from "../../hooks/projectsHook";

export default function Productivity() {
  const { getProject } = useProject(false, false);

  const totalProjects = getProject.length;

  const completedProjects = getProject.filter(
    (project) => project.status === "completed"
  ).length;

  const averageProgress =
    totalProjects > 0
      ? (
          getProject.reduce(
            (sum, project) => sum + project.progress,
            0
          ) / totalProjects
        ).toFixed(1)
      : "0";

  const totalTasks = getProject.reduce(
    (sum, project) => sum + project.metrics.totalTasks,
    0
  );

  const averageTasks =
    totalProjects > 0
      ? (totalTasks / totalProjects).toFixed(1)
      : "0";

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          Productividad
        </h2>

        <p className="text-gray-400">
          Resumen general de tu trabajo
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-400">
            Proyectos
          </p>

          <h3 className="text-3xl font-bold">
            {totalProjects}
          </h3>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-400">
            Completados
          </p>

          <h3 className="text-3xl font-bold text-green-500">
            {completedProjects}
          </h3>
        </div>

        <div className="border rounded-xl p-4 col-span-2">
          <div className="flex justify-between mb-2">
            <span>Avance promedio</span>

            <span>{averageProgress}%</span>
          </div>

          <div className="bg-gray-200 rounded-full h-3">

            <div
              className="bg-blue-600 rounded-full h-3"
              style={{
                width: `${averageProgress}%`,
              }}
            />

          </div>
        </div>

        <div className="border rounded-xl p-4 col-span-2">
          <p className="text-sm text-gray-400">
            Promedio de tareas por proyecto
          </p>

          <h3 className="text-2xl font-bold">
            {averageTasks}
          </h3>
        </div>

      </div>
    </div>
  );
}