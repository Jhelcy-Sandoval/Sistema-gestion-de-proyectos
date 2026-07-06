import useSubTask from "../../hooks/subTaskHook";
import useUserData from "../../hooks/userHooks";

interface ActivityProps {
  role: string | undefined;
}

export default function Activity({ role }: ActivityProps) {
  const { userID } = useUserData(false, false);
  const { getAllSubtask } = useSubTask(false, undefined, userID);

  const texts = {
    title:
      role === "developer"
        ? "Actividad reciente"
        : "Actividad reciente del equipo",

    description:
      role === "developer"
        ? "Últimas subtareas creadas o actualizadas."
        : "Últimas subtareas creadas o actualizadas por el equipo.",

    empty:
      role === "developer"
        ? "No hay actividad reciente."
        : "No hay actividad reciente del equipo.",
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">{texts.title}</h2>

        <p className="text-gray-400">
          {texts.description}
        </p>
      </div>

      {getAllSubtask.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 mt-4">{texts.empty}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {getAllSubtask.map((subtask) => (
            <div
              key={subtask._id}
              className="flex gap-4 border rounded-lg p-3 hover:border-sky-500"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                  subtask.status === "done"
                    ? "bg-green-100"
                    : subtask.status === "in_progress"
                    ? "bg-yellow-100"
                    : "bg-blue-100"
                }`}
              >
                {subtask.status === "done" && "✅"}
                {subtask.status === "in_progress" && "🚧"}
                {subtask.status === "todo" && "📋"}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{subtask.name}</h3>

                {subtask.description && (
                  <p className="text-sm text-gray-400">
                    {subtask.description}
                  </p>
                )}

                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span>Prioridad: {subtask.priority}</span>
                  <span>Progreso: {subtask.progress}%</span>
                </div>

                <span className="text-xs text-gray-400 block mt-2">
                  {new Date(subtask.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}