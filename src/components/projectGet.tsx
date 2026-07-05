import { useEffect, useState } from "react";
import { getOneProject, updateProject } from "../services/projectsService";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import ProjectTaks from "./projectTask";
import TaskForm from "./tasks/taskForm";
import TaskGet from "./tasks/taskGet";
import { ProjectsData, ProjectsFetchProps, Task } from "../types/types";
import CategoryForm from "./categorie/categoryForm";

export default function ProjectGet({
  selectedProject,
  setSelectedProject,
}: ProjectsFetchProps) {
  const [oneProject, setOneProject] = useState<ProjectsData | undefined>(
    undefined,
  );
  const { register, handleSubmit } = useForm();
  const { isLogin, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setIsActive] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const closeToggle = () => {
    setSelectedProject(null);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdate = handleSubmit(async (values) => {
    try {
      if (typeof oneProject?._id === "string") {
        await updateProject(oneProject._id, values, isLogin);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getOneProject(selectedProject, isLogin);
        setOneProject(response);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (isLogin) {
      fetchProject();
    }
  }, [isLogin, selectedProject]);

  const ToggleForm = () => {
    setIsActive(!newCategory);
    setRefresh(!refresh);
  };

  const ToggleFormTask = () => {
    setNewTask(!newTask);
    setRefresh(!refresh);
  };

  const handleTaskSelect = (task: Task | undefined) => {
    setSelectedTask(task);
  };

  const handleTaskClose = (task: undefined) => {
    setSelectedTask(task);
  };

  return (
    <>
      {oneProject && (
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-8 p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-sky-700 to-cyan-500 shadow-xl border border-white/10">
            {oneProject.imgProject?.data ? (
              <button
                onClick={openModal}
                className=" p-2 w-40 h-40 rounded-2xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <img
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-50"
                  src={`${oneProject.imgProject.data}`}
                  alt={oneProject.imgProject.nombre}
                />

                <div className=" flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <img
                    src="/subir-archivo.svg"
                    alt="Cambiar imagen"
                    className="w-10 h-10 mb-2"
                  />

                  <span className="text-white text-sm font-medium">
                    Change image
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={openModal}
                className="p-2 w-40 h-40 rounded-2xl bg-slate-800 flex items-center justify-center shadow-xl hover:bg-slate-700 transition-all"
              >
                <img className="w-24" src="/logo.webp" alt="Project" />
              </button>
            )}

            {isOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center">
                <div className="mode rounded-lg shadow-lg max-w-lg w-full p-6 relative z-50">
                  <h2 className="text-2xl font-bold text-center pb-3">
                    Change the picture?
                  </h2>
                  <div>
                    <h4 className="text-xl"></h4>
                    <div className=" flex justify-center">
                      <form onSubmit={handleUpdate} className="space-y-3">
                        <div className="my-2">
                          <input
                            type="file"
                            id="foto"
                            {...register("foto")}
                            className="flex h-10 w-full rounded-md border border-input bg-[--card] px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                          />
                        </div>
                        <div className="flex space-x-3">
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            type="submit"
                          >
                            Update
                          </button>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            onClick={closeModal}
                          >
                            Close Modal
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
            <div className="p-4 truncate">
              {typeof oneProject?.name === "string" ? (
                <p className="text-5xl text-wrap">{oneProject.name}</p>
              ) : (
                <p className="text-5xl">No valid name available</p>
              )}
            </div>
          </div>
          <div className="my-4">
            <div className="mt-8">
              <h2 className="text-3xl font-bold mb-6">General Information</h2>

              <div className="flex flex-wrap gap-4">
                <div className="mode rounded-xl border border-slate-700 p-3 shadow-lg flex-auto">
                  <p className="text-sm text-gray-400">Status</p>

                  <span className="inline-flex mt-3 rounded-full bg-blue-500/20 px-3 py-1 text-sm font-semibold text-blue-400 capitalize">
                    {oneProject.status.replace("_", " ")}
                  </span>
                </div>

                <div className="mode rounded-xl border border-slate-700 p-3 shadow-lg flex-auto">
                  <p className="text-sm text-gray-400">Priority</p>

                  <span
                    className={`inline-flex mt-3 rounded-full px-3 py-1 text-sm font-semibold
                      ${
                        oneProject.priority === "high"
                          ? "bg-red-500/20 text-red-400"
                          : oneProject.priority === "medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                      }`}
                  >
                    {oneProject.priority}
                  </span>
                </div>

                <div className="mode rounded-xl border border-slate-700 p-3 shadow-lg flex-auto">
                  <p className="text-sm text-gray-400">Start Date</p>

                  <p className="mt-3 font-semibold">
                    {oneProject.startDate
                      ? new Date(oneProject.startDate).toLocaleDateString()
                      : "Sin fecha"}
                  </p>
                </div>

                <div className="mode rounded-xl border border-slate-700 p-3 shadow-lg flex-auto">
                  <p className="text-sm text-gray-400">End Date</p>

                  <p className="mt-3 font-semibold">
                    {oneProject.endDate
                      ? new Date(oneProject.endDate).toLocaleDateString()
                      : "Sin fecha"}
                  </p>
                </div>
              </div>

              {/* Descripción */}

              <div className="mode p-3 rounded-xl shadow-lg mt-4">
                <h3 className="text-xl font-semibold mb-4">Description</h3>

                <p className="leading-7 text-gray-300">
                  {oneProject.description}
                </p>
              </div>
            </div>
            <section className="flex flex-row">
              {!selectedTask && (
                <div className="flex flex-row w-full">
                  <div className="flex-1 w-full">
                    <div className="content p-4 mt-4 rounded-lg mode border-t-4">
                      <div className="flex flex-wrap my-4 justify-between box-border">
                        <h1 className="text-2xl">Tareas</h1>
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          {user.user.role !== "developer" && (
                            <div className="flex flex-wrap gap-3">
                              <button
                                className="rounded-lg bg-[--primary] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 transition"
                                onClick={ToggleForm}
                              >
                                + Nueva categoría
                              </button>

                              <button
                                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-500 transition"
                                onClick={ToggleFormTask}
                              >
                                + Nueva tarea
                              </button>
                            </div>
                          )}

                          <button
                            className="relative overflow-hidden rounded-lg border border-gray-300 bg-[--card] px-4 py-2 font-semibold text-black transition group"
                            onClick={closeToggle}
                          >
                            <span className="absolute left-0 top-0 h-full w-0 bg-[--primary] transition-all duration-300 group-hover:w-full"></span>

                            <span className="relative flex items-center gap-2 group-hover:text-white">
                              <img
                                src="/atras.svg"
                                alt="Atrás"
                                className="w-4 h-4"
                              />
                              Atrás
                            </span>
                          </button>
                        </div>
                      </div>
                      <div>
                        {oneProject && (
                          <ProjectTaks
                            oneProject={oneProject}
                            refresh={refresh}
                            onTaskSelect={handleTaskSelect}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className={`${newCategory ? "w-1/3" : "flex-none"}`}>
                {newCategory && (
                  <CategoryForm
                    onToggle={ToggleForm}
                    newCategory={newCategory}
                    oneProject={oneProject._id}
                  />
                )}
              </div>
              <div className={`${newTask ? "w-1/3" : "flex-none"}`}>
                {newTask && (
                  <TaskForm
                    onToggle={ToggleFormTask}
                    newTask={newTask}
                    oneProject={oneProject._id}
                  />
                )}
              </div>
            </section>
            <div>
              {selectedTask && (
                <TaskGet
                  showTask={selectedTask}
                  onTaskSelect={handleTaskClose}
                  getProjectID={oneProject._id}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
