import { useState } from "react";
import useProject from "../hooks/projectsHook";
import { deleteProject, updateProject } from "../services/projectsService";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

interface ProjectsData {
  nombre: string;
  objetivo: string;
  alcance: string;
  _id: string;
  imgProject: {
    nombre: string;
    data: string;
    type: string;
  };
}

interface ProjectsFetchProps {
  isActive: boolean;
  onToggle: () => void;
  refreshed: boolean;
  onSelectProject: (projectId: string) => void;
}

export default function ProjectsCards({ onToggle, refreshed, onSelectProject }: ProjectsFetchProps) {
  const { register, handleSubmit, reset, setError } = useForm<ProjectsData>();
  const { isLogin } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [projectuse, settheProject] = useState<ProjectsData>();
  const { getProject, setProjects } = useProject(refreshed, !refreshed);

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
        setProjects(getProject.map(p => p._id === projectID ? updatedProject : p));
        setIsOpen(false);
      } else {
        setError("nombre", {
          type: "manual",
          message: "Error: Project ID is required",
        });
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  });

  const handleDelete = async (project: ProjectsData) => {
    const projectID = project?._id;
    try {
      await deleteProject(projectID, isLogin);
      setProjects(getProject.filter(p => p._id !== projectID));
      setIsOpenAlert(false);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const openProject = (projectID: string) => {
    onSelectProject(projectID);
  };

  return (
    <>
      <section>
        <div className="content p-4 m-4 rounded-lg mode border-t-4">
          <div className="flex my-4 justify-between box-border">
            <h1 className="text-2xl">Proyectos</h1>
            <button
              className="rounded-md bg-[#0d6efd] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 py-2"
              onClick={onToggle}
            >
              New project
            </button>
          </div>
          {getProject.length > 0 ? (
            <div className="grid gap-4 gap-y-8 grid-cols-3 pt-6 place-items-end">
              {getProject.map((project, index) => (
                <div key={index} className="p-2 w-full">
                  <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                    <div className="relative p-3 mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                      {project.imgProject?.data ? (
                        <img
                          src={`${project.imgProject.data}`}
                          alt={`${project.nombre}` || "imagen de proyecto"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-white">
                          No Image Available
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {project?.nombre}
                      </h5>
                      <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        {project?.objetivo}
                      </p>
                    </div>
                    <div className="p-6 pt-0 flex justify-between">
                      <button
                        className="px-4 font-bold py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={() => openProject(project?._id)}
                      >
                        Read more
                      </button>
                      <div
                        className="flex items-center inline-block min-w-8 relative cursor-pointer"
                        onClick={() => handleDropdownToggle(index)}
                      >
                        <img src="/options.svg" alt="menu" />
                        {activeDropdown === index && (
                          <div className="absolute mt-28 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
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
                    </div>
                  </div>
                  {isOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                      <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <h2 className="text-2xl font-bold mb-4">Edit project</h2>
                        <form onSubmit={handleUpdate} className="space-y-3">
                          <h4>Project ID</h4>
                          <input
                            type="text"
                            disabled
                            defaultValue={project._id}
                            className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                            {...register("_id")}
                          />
                          <h4>Nombre</h4>
                          <input
                            type="text"
                            defaultValue={project.nombre}
                            {...register("nombre")}
                            className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                          />
                          <h4>Objetivo</h4>
                          <input
                            type="text"
                            defaultValue={project.objetivo}
                            {...register("objetivo")}
                            className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                          />
                          <h4>Alcance</h4>
                          <input
                            type="text"
                            defaultValue={project.alcance}
                            {...register("alcance")}
                            className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                          />
                          <div className="space-x-3 flex justify-end">
                            <button
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                              type="submit"
                            >
                              Save
                            </button>
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                              onClick={closeModal}
                            >
                              Close Modal
                            </button>
                          </div>
                        </form>
                        <button
                          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                          onClick={closeModal}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                  {isOpenAlert && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                      <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <h2 className="text-2xl font-bold mb-4 text-center pb-3">Are you sure?</h2>
                        <div className="space-x-3 flex justify-center">
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            type="submit"
                            onClick={() => handleDelete(project)}
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
                    <div
                      className="flex flex-col bg-neutral-300 w-full animate-pulse rounded-xl p-4 gap-4"
                    >
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
