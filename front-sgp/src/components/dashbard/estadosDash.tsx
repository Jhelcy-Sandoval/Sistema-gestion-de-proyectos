import useProject from "../../hooks/projectsHook";

export default function EstadoDash() {
  const { getProject } = useProject(false, false);

  // Filtra y calcula el número de tareas en progreso y el promedio
  const totalTasks = getProject.reduce((total, project) => total + (project.taks || 0), 0);
  const totalInProgress = getProject.reduce((sum, project) => sum + (project.enprogreso || 0), 0);
  const promedioEnProgreso = totalTasks > 0 ? (totalInProgress / totalTasks) * 100 : 0;

  // Calcula otras métricas como completado, pendiente, etc.
  const totalCompletado = getProject.reduce((sum, project) => sum + (project.completada || 0), 0);
  const promedioCompletado = totalTasks > 0 ? (totalCompletado / totalTasks) * 100 : 0;

  const totalPendiente = getProject.reduce((sum, project) => sum + (project.pendientes || 0), 0);
  const promedioPendiente = totalTasks > 0 ? (totalPendiente / totalTasks) * 100 : 0;

  return (
    <div className="bg-white p-2 my-2 rounded-xl flex justify-between border hover:border-sky-500">
      <div className="grid grid-cols-4 gap-3 w-full">
        <div className="bg-blue-200 rounded-xl m-2 p-2 border border-blue-500">
          <h1 className="font-bold text-blue-500 text-xl text-wrap truncate">Total Tareas</h1>
          <p className="text-blue-500 font-bold">{totalTasks}</p>
        </div>
        <div className="bg-green-400 rounded-xl m-2 p-2 border border-green-700">
          <h1 className="font-bold text-green-700 text-xl text-wrap truncate">Completado</h1>
          <p className="text-green-700 font-bold">{promedioCompletado.toFixed(2)}%</p>
        </div>
        <div className="bg-red-300 rounded-xl m-2 p-2 border border-red-500">
          <h1 className="font-bold text-red-500 text-xl text-wrap truncate">Pendiente</h1>
          <p className="text-red-500 font-bold">{promedioPendiente.toFixed(2)}%</p>
        </div>
        <div className="bg-amber-200 rounded-xl m-2 p-2 border border-amber-400">
          <h1 className="font-bold text-amber-400 text-xl text-wrap truncate">En progreso</h1>
          <p className="text-amber-400 font-bold">{promedioEnProgreso.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}
