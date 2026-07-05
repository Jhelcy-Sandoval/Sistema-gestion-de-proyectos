import { Link } from "react-router-dom";
import useProject from "../../hooks/projectsHook";

export default function ProjectCards() {
  const { getProject } = useProject(false, false);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-2xl font-bold">
            Mis proyectos
          </h2>

          <p className="text-gray-400">
            Proyectos en los que participas
          </p>
        </div>

        <Link
          to="/projects"
          className="text-blue-500 hover:underline"
        >
          Ver todos
        </Link>
      </div>

      {getProject.length === 0 ? (
        <div className="text-center py-16">
          <img
            src="/folder.svg"
            className="w-16 mx-auto opacity-30"
            alt="Sin proyectos"
          />

          <p className="mt-4 text-gray-400">
            No perteneces a ningún proyecto.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">

          {getProject.map((project) => (

            <div
              key={project._id}
              className="rounded-xl border hover:border-sky-500 transition p-4"
            >
              <div className="flex justify-between">

                <div className="flex gap-3">

                  <img
                    src={project.imgProject.data}
                    alt={project.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />

                  <div>

                    <h3 className="font-bold">
                      {project.name}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      {project.description}
                    </p>

                  </div>

                </div>

                <span
                  className={`
                  text-xs px-2 py-1 rounded-full h-fit
                  ${
                    project.status === "planning"
                      ? "bg-gray-200 text-gray-600"
                      : project.status === "in_progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : project.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
                >
                  {project.status.replace("_", " ")}
                </span>

              </div>

              <div className="mt-5">

                <div className="flex justify-between text-sm">

                  <span>
                    Avance
                  </span>

                  <span>
                    {project.progress}%
                  </span>

                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">

                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />

                </div>

              </div>

              <div className="grid grid-cols-3 mt-6 text-center">

                <div>

                  <p className="font-bold">
                    {project.metrics.totalTasks}
                  </p>

                  <p className="text-xs text-gray-400">
                    Tareas
                  </p>

                </div>

                <div>

                  <p className="font-bold text-yellow-500">
                    {project.metrics.inProgressTasks}
                  </p>

                  <p className="text-xs text-gray-400">
                    En progreso
                  </p>

                </div>

                <div>

                  <p className="font-bold text-green-600">
                    {project.metrics.completedTasks}
                  </p>

                  <p className="text-xs text-gray-400">
                    Completadas
                  </p>

                </div>

              </div>

              <div className="flex justify-end mt-5">

                <Link
                  to={`/projects/${project._id}`}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Abrir proyecto →
                </Link>

              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}