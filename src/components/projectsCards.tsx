import { useState } from "react";
import useProject from "../hooks/projectsHook";
import { deleteProject, updateProject } from "../services/projectsService";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import useUserData from "../hooks/userHooks";
import { ProjectsData } from "../types/types";

interface ProjectsFetchProps {
  isActive: boolean;
  onToggle: () => void;
  refreshed: boolean;
  onSelectProject: (projectId: string) => void;
}

export default function ProjectsCards({
  onToggle,
  refreshed,
  onSelectProject,
}: ProjectsFetchProps) {
  const { register, handleSubmit, reset, setError } = useForm<ProjectsData>();
  const { isLogin, user } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [projectuse, settheProject] = useState<ProjectsData>();
  const { getProject, setProjects } = useProject(refreshed, !refreshed);
  const { usersDevelopers } = useUserData(false, isOpen);

  const openModal = (project: ProjectsData) => {
    setIsOpen(true);
    settheProject(project);
    reset(project);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalAlert = (project: ProjectsData) => {
    setIsOpenAlert(true);
    settheProject(project);
    reset(project);
  };

  const closeModalAlert = () => {
    setIsOpenAlert(false);
  };

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleUpdate = handleSubmit(async (data: ProjectsData) => {
    try {
      const projectID = projectuse?._id;
      if (projectID) {
        const updatedProject = await updateProject(projectID, data, isLogin);
        setProjects(
          getProject.map((p) => (p._id === projectID ? updatedProject : p)),
        );
        setIsOpen(false);
      } else {
        setError("name", {
          type: "manual",
          message: "Error: Project ID is required",
        });
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  });

  const handleDelete = async () => {
    if (!projectuse) return;

    try {
      await deleteProject(projectuse._id, isLogin);

      setProjects((prev) => prev.filter((p) => p._id !== projectuse._id));

      setIsOpenAlert(false);
      settheProject(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const openProject = (projectID: string) => {
    onSelectProject(projectID);
  };

  return (
    <>
      <section >
        <div className="content h-full p-4 m-4 rounded-lg mode border-t-4">
          <div className="flex my-4 justify-between box-border">
            <h1 className="text-2xl">Proyectos</h1>
            {user.user.role !== "developer" && (
              <button
                className="rounded-md bg-[--primary] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[--primary-hover]"
                onClick={onToggle}
              >
                New project
              </button>
            )}
          </div>
          {getProject.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-6">
              {getProject.map((project, index) => (
                <div key={index} className="p-2 w-full h-full">
                  <div className="relative h-full flex flex-col rounded-xl bg-[--card] bg-clip-border text-gray-700 shadow-md">
                    <div className="relative flex p-3 mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                      {project.imgProject?.data ? (
                        <img
                          src={`${project.imgProject.data}`}
                          alt={`${project.name}` || "imagen de proyecto"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-white">
                          No Image Available
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col h-full justify-between">
                      <div className="p-6">
                        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                          {project?.name}
                        </h5>
                        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                          {project?.description}
                        </p>
                      </div>
                      <div className="p-6 pt-0 flex justify-between">
                        <button
                          className="px-4 font-bold py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                          onClick={() => openProject(project._id)}
                        >
                          Read more
                        </button>

                        {user.user.role !== "developer" && (
                          <div
                            className="flex items-center inline-block min-w-8 relative cursor-pointer"
                            onClick={() => handleDropdownToggle(index)}
                          >
                            <img src="/options.svg" alt="menu" />

                            {activeDropdown === index && (
                              <div className="absolute mt-28 w-48 bg-[--card] border border-gray-200 rounded-md shadow-lg z-20">
                                <div className="py-1">
                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => openModal(project)}
                                  >
                                    Edit
                                  </button>

                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => openModalAlert(project)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                      <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">
                          Edit project
                        </h2>

                        <form onSubmit={handleUpdate} className="space-y-4">
                          <div>
                            <label className="block mb-1 font-medium">
                              Project ID
                            </label>

                            <input
                              type="text"
                              disabled
                              defaultValue={project._id}
                              {...register("_id")}
                              className="w-full rounded-md border p-2 bg-gray-100"
                            />
                          </div>

                          <div>
                            <label className="block mb-1 font-medium">
                              Project name
                            </label>

                            <input
                              type="text"
                              defaultValue={project.name}
                              {...register("name")}
                              className="w-full rounded-md border p-2"
                            />
                          </div>

                          <div>
                            <label className="block mb-1 font-medium">
                              Description
                            </label>

                            <textarea
                              rows={4}
                              defaultValue={project.description}
                              {...register("description")}
                              className="w-full rounded-md border p-2"
                            />
                          </div>

                          <div>
                            <label className="block mb-1 font-medium">
                              Status
                            </label>

                            <select
                              defaultValue={project.status}
                              {...register("status")}
                              className="w-full rounded-md border p-2"
                            >
                              <option value="planning">Planning</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>

                          <div>
                            <label className="block mb-1 font-medium">
                              Priority
                            </label>

                            <select
                              defaultValue={project.priority}
                              {...register("priority")}
                              className="w-full rounded-md border p-2"
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block mb-1 font-medium">
                                Start date
                              </label>

                              <input
                                type="date"
                                defaultValue={project.startDate?.split("T")[0]}
                                {...register("startDate")}
                                className="w-full rounded-md border p-2"
                              />
                            </div>

                            <div>
                              <label className="block mb-1 font-medium">
                                End date
                              </label>

                              <input
                                type="date"
                                defaultValue={project.endDate?.split("T")[0]}
                                {...register("endDate")}
                                className="w-full rounded-md border p-2"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block mb-2 font-medium">
                              Assigned developers
                            </label>

                            <div className="max-h-44 overflow-y-auto border rounded-md p-3 space-y-2">
                              {usersDevelopers.map((developer) => (
                                <label
                                  key={developer._id}
                                  className="flex items-center gap-3 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    value={developer._id}
                                    defaultChecked={project.developersIds.some(
                                      (d) => d._id === developer._id,
                                    )}
                                    {...register("developersIds")}
                                  />

                                  <div>
                                    <p className="font-medium">
                                      {developer.name}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                      {developer.email}
                                    </p>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-end gap-3 pt-2">
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                              Save
                            </button>

                            <button
                              type="button"
                              onClick={closeModal}
                              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>

                        <button
                          type="button"
                          className="absolute top-3 right-3 text-xl"
                          onClick={closeModal}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                  {isOpenAlert && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                      <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <h2 className="text-2xl font-bold mb-4 text-center pb-3">
                          Are you sure?
                        </h2>
                        <div className="space-x-3 flex justify-center">
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            type="submit"
                            onClick={handleDelete}
                          >
                            Delete
                          </button>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            onClick={closeModalAlert}
                          >
                            Close Modal
                          </button>
                        </div>
                        <button
                          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                          onClick={closeModalAlert}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="p-2">No hay proyectos para mostrar</p>
              <div className="grid gap-4 gap-y-8 grid-cols-3 pt-6 place-items-end">
                <div className="flex flex-col bg-neutral-300 w-full animate-pulse rounded-xl p-4 gap-4">
                  <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                    <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                    <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                    <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
