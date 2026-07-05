import { useState } from "react";
import useTask from "../hooks/taskHook";
import { deleteCategoria } from "../services/categoriasService";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Categoria, ProjectsData, Task } from "../types/types";
import { createNewTask, CreateTaskDTO } from "../services/taskService";
import TaskModel from "./tasks/taskModel";
import useUserData from "../hooks/userHooks";

interface ProjectTaksProps {
  oneProject: ProjectsData;
  refresh: boolean;
  onTaskSelect: (task: Task) => void;
}

export default function ProjectTask({
  oneProject,
  refresh,
  onTaskSelect,
}: ProjectTaksProps) {
  const { isLogin } = useAuth();
  const { register, handleSubmit, reset } = useForm<Task & Categoria>();
  const [activeDropdown, setActiveDropdown] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [oneCategorie, setCategorie] = useState<Categoria>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [fetchTask, setTask] = useState<Task>();
  const [refreshed, setRefreshed] = useState(false);
  const { tasks, categorias } = useTask( refresh, refreshed, oneProject._id,);
  const { userID } = useUserData(false, false);

  const openModal = (categoria: Categoria) => {
    setIsOpen(true);
    setCategorie(categoria);
  };

  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const openModalDelete = (task: Task) => {
    setIsOpenDelete(true);
    setTask(task);
  };

  const closeModalDelete = () => {
    setIsOpenDelete(false);
    setRefreshed(!refreshed);
  };

  const openModalAlert = (categoria: Categoria) => {
    setIsOpenAlert(true);
    setCategorie(categoria);
  };

  const closeModalAlert = () => {
    setIsOpenAlert(false);
  };

  const handleDropdownToggle = (categoryID: string) => {
    setActiveDropdown((prev) => (prev === categoryID ? "" : categoryID));
  };

  const handleDelete = async () => {
    try {
      const categoriaID = oneCategorie?._id;

      if (typeof categoriaID === "string") {
        await deleteCategoria(categoriaID, isLogin);
        setIsOpenAlert(false);
        setRefreshed(!refresh);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const addTask = handleSubmit(async (data) => {
    try {
      const dataForm: CreateTaskDTO = {
        title: data.title,
        description: data.description,

        projectId: oneProject._id,
        categoryId: data.categoryId,

        userId: userID,

        assignedTo:
          typeof data.assignedTo === "string"
            ? data.assignedTo
            : (data.assignedTo?._id ?? null),

        status: data.status,
        priority: data.priority,

        progress: Number(data.progress) || 0,

        estimatedHours: Number(data.estimatedHours) || 0,

        dueDate: data.dueDate || null,
      };

      await createNewTask(dataForm, isLogin, oneProject._id);

      setIsOpen(false);
      reset();
      setRefreshed(!refresh);
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  });

  const getOneTask = async (task: Task) => {
    onTaskSelect(task);
  };

  return (
    <>
      <section className="gap-4 grid-cols-1	grid">
        {categorias && categorias.length > 0 ? (
          categorias.map((categoria, categoriaIndex) => (
            <div
              key={categoriaIndex}
              className="bg-[--card] border border-slate-200 p-2 rounded-xl text-sm"
            >
              <div className="flex justify-between">
                <h1 className="font-bold text-gray-500 text-xl text-wrap truncate	">
                  {categoria.name}
                </h1>
                <div className="flex space-x-2">
                  <button
                    className="w-4"
                    onClick={() => handleDropdownToggle(categoria._id)}
                  >
                    {activeDropdown === categoria._id ? (
                      <img src="/flecha-hacia-arriba.svg" alt="close" />
                    ) : (
                      <img src="/open-dropdown.svg" alt="menu" />
                    )}
                  </button>
                  <button className="w-4">
                    <img
                      src="/mas.svg"
                      alt="add task"
                      onClick={() => openModal(categoria)}
                    />
                  </button>
                  <button
                    className="w-4"
                    onClick={() => openModalAlert(categoria)}
                  >
                    <img src="/basura.svg" alt="basura" />
                  </button>
                </div>
              </div>
              {isOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                  <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-6">New Task</h2>

                    <form onSubmit={addTask} className="space-y-4">
                      <div>
                        <label className="font-semibold">Title</label>
                        <input
                          type="text"
                          {...register("title")}
                          className="mt-1 w-full rounded-md border p-2 text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="font-semibold">Description</label>
                        <textarea
                          rows={4}
                          {...register("description")}
                          className="mt-1 w-full rounded-md border p-2 text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="font-semibold">Category</label>

                        <select
                          {...register("categoryId")}
                          className="mt-1 w-full rounded-md border p-2 text-gray-900"
                        >
                          <option value="">Select a category</option>

                          {categorias.map((categoria) => (
                            <option key={categoria._id} value={categoria._id}>
                              {categoria.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold">Assigned To</label>

                        <select
                          {...register("assignedTo")}
                          className="mt-1 w-full rounded-md border p-2 text-gray-900"
                        >
                          <option value="">Unassigned</option>

                          {oneProject.developersIds.map((developer) => (
                            <option key={developer._id} value={developer._id}>
                              {developer.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold">Status</label>

                        <select
                          {...register("status")}
                          className="mt-1 w-full rounded-md border p-2 text-gray-900"
                        >
                          <option value="todo">Todo</option>
                          <option value="in_progress">In Progress</option>
                          <option value="review">Review</option>
                          <option value="done">Done</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold">Priority</label>

                        <select
                          {...register("priority")}
                          className="mt-1 w-full rounded-md border p-2 text-gray-900"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold">Progress</label>

                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          defaultValue={0}
                          {...register("progress")}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="font-semibold">Estimated Hours</label>

                        <input
                          type="number"
                          min="0"
                          {...register("estimatedHours")}
                          className="mt-1 w-full rounded-md border p-2 text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="font-semibold">Due Date</label>

                        <input
                          type="date"
                          {...register("dueDate")}
                          className="mt-1 w-full rounded-md border p-2 text-gray-900"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Create Task
                        </button>
                      </div>
                    </form>

                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 text-xl"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
              {isOpenAlert && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                  <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                    <h2 className="text-2xl font-bold mb-4 text-center pb-3">
                      Are you sure?
                    </h2>
                    <div>
                      <h4 className="text-xl"></h4>
                      <div className="space-x-3 flex justify-center">
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                          type="submit"
                          onClick={() => handleDelete()}
                        >
                          {" "}
                          Delete
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                          onClick={closeModalAlert}
                        >
                          Close Modal
                        </button>
                      </div>
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

              {activeDropdown === categoria._id && (
                <div className="border p-4 rounded-lg bg-slate-200">
                  {tasks && tasks.length > 0 ? (
                    tasks
                      .filter((task) => task.categoryId === categoria._id)
                      .map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="bg-[--card] p-2 my-2 rounded-xl flex justify-between border hover:border-sky-500"
                        >
                          <div
                            onClick={() => getOneTask(task)}
                            className="w-full cursor-pointer"
                          >
                            <h1 className="font-bold text-gray-500 text-xl text-wrap truncate	">
                              {task.title}
                            </h1>
                            <p className="text-gray-500">{task.title}</p>
                          </div>
                          <div className="w-32 flex items-center ">
                            <div className="bg-gray-400 rounded-full mx-auto w-28  h-4">
                              <div
                                className="bg-blue-800 rounded-full h-4 text-center px-1"
                                style={{ width: `${task.progress}%` }}
                              >
                                {task.progress}%
                              </div>
                            </div>
                            <div>
                              <button
                                className="w-4"
                                onClick={() => openModalDelete(task)}
                              >
                                <img src="/basura.svg" alt="basura" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p>No tasks available for this category.</p>
                  )}

                  {isOpenDelete && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                      <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <TaskModel
                          onToggle={closeModalDelete}
                          getTask={fetchTask}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </section>
    </>
  );
}
