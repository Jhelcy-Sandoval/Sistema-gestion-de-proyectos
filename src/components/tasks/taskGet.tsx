import { useEffect, useState } from "react";
import { SubTask, Task } from "../../types/types";
import useSubTask from "../../hooks/subTaskHook";
import { useForm } from "react-hook-form";
import {
  deleteSubTask,
  updateSubTask,
  UpdateSubTaskDTO,
} from "../../services/subTaskService";
import { useAuth } from "../../context/AuthContext";
import { updateTask } from "../../services/taskService";
import useFiles from "../../hooks/filesHook";
import FilesForm from "../files/filesForm";
import SubtaskForm from "../subtask/subtaskForm";
import EditeFile from "../files/editFile";
import DeleteFile from "../files/deleteFile";

interface TaskProps {
  showTask: Task;
  onTaskSelect: (task: undefined) => void;
  getProjectID: string;
}

interface FileData {
  nombre: string;
  data: string;
  tipo: string;
  user: string;
  projects: string;
  _id: string;
}

export default function TaskGet({
  showTask,
  onTaskSelect,
  getProjectID,
}: TaskProps) {
  const [oneTask, setOneTask] = useState<Task>();
  const { isLogin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFile, setIsOpenFile] = useState(false);
  const [isOpenFileEdite, setIsOpenFileEdite] = useState(false);
  const [isOpenFileDrop, setIsOpenFileDrop] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [getoneSubTask, setoneSubtask] = useState<SubTask>();
  const [refreshed, setRefreshed] = useState(false);
  const { getSubtask, estado, progreso } = useSubTask(refreshed, oneTask?._id,);
  const { reset } = useForm<SubTask>();
  const { filesget } = useFiles(refreshed, showTask._id);
  const [oneFile, setOneFile] = useState<FileData>();
  const [getDate, setDate] = useState("");

  const openModal = () => {
    const subtaskNum = getSubtask.length;
    setIsOpen(true);
    console.log(subtaskNum);
  };

  const closeModal = () => {
    setIsOpen(false);
    setRefreshed(!refreshed);
    reset();
  };

  const openModalFile = () => {
    setIsOpenFile(true);
  };

  const closeModalFile = () => {
    setIsOpenFile(false);
    setRefreshed(!refreshed);
    reset();
  };

  const openModalFileEdite = (file: FileData) => {
    setOneFile(file);
    setIsOpenFileEdite(true);
  };

  const closeModalFileDrop = () => {
    setIsOpenFileDrop(false);
    setRefreshed(!refreshed);
    reset();
  };

  const openModalFileDrop = (file: FileData) => {
    setOneFile(file);
    setIsOpenFileDrop(true);
  };

  const closeModalFileEdite = () => {
    setIsOpenFileEdite(false);
    setRefreshed(!refreshed);
    reset();
  };

  const openModalAlert = (subTask: SubTask) => {
    setoneSubtask(subTask);
    setIsOpenAlert(true);
  };

  const closeModalAlert = () => {
    setIsOpenAlert(false);
    reset();
  };

  useEffect(() => {
    const fetchOneTask = () => {
      if (showTask) {
        setOneTask(showTask);
      }
    };

    const updateEstate = async () => {
      try {
        const taskID = showTask?._id;

        if (!taskID) {
          console.error("Error: El ID de la tarea es indefinido.");
          return;
        }

        const formTask = {
          status: estado,
          progress: progreso,
        };

        await updateTask(taskID, formTask, isLogin);
      } catch (error) {
        console.error("Error actualizando el estado de la tarea:", error);
      }
    };

    const showDate = async () => {
      try {
        const oneDate = oneTask?.dueDate;
        if (oneDate) {
          const dateInMillis = new Date(oneDate).getTime();
          const now = Date.now();
          const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000;
          if (dateInMillis < now) {
            setDate("danger");
          } else if (
            dateInMillis >= now &&
            dateInMillis <= now + threeDaysInMillis
          ) {
            setDate("riesgo");
          } else {
            setDate("good");
          }
        } else {
          setDate("good");
        }
      } catch (error) {
        console.error("Error al obtener archivos:", error);
      }
    };

    fetchOneTask();
    updateEstate();
    showDate();
  }, [
    showTask,
    setOneTask,
    estado,
    isLogin,
    refreshed,
    setDate,
    oneTask?.dueDate,
    progreso,
  ]);

  const handleDelete = async () => {
    try {
      const subTaskID = getoneSubTask?._id;
      if (typeof subTaskID === "string") {
        await deleteSubTask(subTaskID, isLogin);
      }
      setIsOpenAlert(false);
      setRefreshed(!refreshed);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const chequed = async (subTask: SubTask) => {
    try {
      const subtaskID = subTask._id;

      if (!subtaskID) return;

      const isDone = subTask.status === "done";

      const subTaskForm: UpdateSubTaskDTO = {
        status: isDone ? "todo" : "done",
        progress: isDone ? 0 : 100,
        completedAt: isDone ? null : new Date(),
      };

      await updateSubTask(subtaskID, subTaskForm, isLogin);

      setRefreshed((prev) => !prev);
    } catch (error) {
      console.error("Error updating subtask:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row f">
        <div className="flex-1 w-full">
          <div className="content p-4 mt-4 rounded-lg mode border-t-4">
            <div className="flex my-4 justify-between box-border">
              <h1 className="text-2xl">Información de la tarea</h1>
              <div className="grid gap-1 place-items-end w-28">
                <button
                  className="bg-[--card] text-center w-full h-full rounded-md relative text-black text-xl font-semibold group"
                  onClick={() => onTaskSelect(undefined)}
                >
                  <div className="bg-[--primary] rounded-md w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-24 duration-500">
                    <img src="/atras.svg" alt="atras" />
                  </div>
                  <p className="translate-x-2">Atras</p>
                </button>
              </div>
            </div>
            <div>
              {typeof oneTask !== "undefined" ? (
                <div className="bg-[--card] border border-slate-200 p-2 rounded-xl text-sm">
                  <p className="font-bold text-gray-500 text-xl text-wrap truncate p-2">
                    {oneTask.title}
                  </p>
                  <div className="border p-2 rounded-lg bg-slate-200 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-2">
                      <div className="bg-[--card] p-2 rounded-xl h-32">
                        <h1 className=" text-gray-600 font-bold	">
                          Descripción
                        </h1>
                        <p className=" text-gray-500">{oneTask.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 h-32">
                        <div className="bg-[--card] p-2 rounded-xl">
                          <h1 className="text-gray-600 font-bold	">
                            Fecha de inicio
                          </h1>
                          <p className=" text-gray-500">
                            {oneTask?.startDate
                              ? new Date(oneTask.startDate).toLocaleDateString()
                              : "No date available"}
                          </p>
                        </div>
                        <div
                          className={`bg-[--card] p-2 rounded-xl 
                            ${getDate === "danger" ? "border-2 border-red-500" : ""}
                            ${getDate === "riesgo" ? "border-2 border-yellow-500" : ""}
                            ${getDate === "good" ? "border-2 border-green-600" : ""}`}
                        >
                          <h1 className=" text-gray-600 font-bold	">
                            Fecha de vencimiento
                          </h1>
                          <p className=" text-gray-500">
                            {oneTask?.dueDate
                              ? new Date(oneTask.dueDate).toLocaleDateString()
                              : "No date available"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 gap-2 h-full max-h-24">
                          <div className="bg-[--card] p-2 rounded-xl">
                            <h1 className=" text-gray-600 font-bold	">
                              Responsable
                            </h1>
                            <p className="text-gray-500">
                              {typeof oneTask.assignedTo === "string"
                                ? oneTask.assignedTo
                                : oneTask.assignedTo?.name || "Sin asignar"}
                            </p>
                          </div>
                          <div className="bg-[--card] p-2 rounded-xl">
                            <h1 className=" text-gray-600 font-bold	">
                              Prioridad
                            </h1>
                            <p className=" text-gray-500">{oneTask.priority}</p>
                          </div>
                          <div
                            className={`bg-[--card] p-2 rounded-xl 
                            ${estado === "done" ? "border-2 border-green-600" : ""} 
                            ${estado === "in_progress" ? "border-2 border-yellow-500" : ""}
                            ${estado === "todo" ? "border-2 border-red-500" : ""}`}
                          >
                            <h1 className=" text-gray-600 font-bold	">Estado</h1>
                            <p className=" text-gray-500">{estado}</p>
                          </div>
                        </div>
                        <div className="bg-[--card] p-2 rounded-xl">
                          <div className="flex justify-between border-b pb-1">
                            <div>
                              <h1 className="text-gray-600 font-bold">
                                Archivos
                              </h1>
                            </div>
                            <div>
                              <button className="w-4">
                                <img
                                  src="/mas.svg"
                                  alt="add file"
                                  onClick={openModalFile}
                                />
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-1 p-2">
                            {filesget && filesget.length > 0 ? (
                              filesget
                                .filter((file) => file.taskID === oneTask._id)
                                .map((file, fileindex) => (
                                  <div
                                    key={fileindex}
                                    className="bg-[--card] border border-slate-200 gap-2 rounded-xl text-sm"
                                  >
                                    <div className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600 flex justify-center">
                                      {file.tipo?.startsWith("image/") ? (
                                        <div className="bg-slate-100 text-slate-600 aspect-w-16 aspect-h-9">
                                          <img
                                            className="max-w-full max-h-full object-contain"
                                            src={`${file.data}`}
                                            alt={file.nombre}
                                          />
                                        </div>
                                      ) : (
                                        <a
                                          href={`${file.data}`}
                                          download={file.nombre}
                                        >
                                          <img
                                            className="max-w-full max-h-full object-contain"
                                            src="../../public/descarga.png"
                                            alt=""
                                          />
                                        </a>
                                      )}
                                    </div>
                                    <div className="flex p-3 justify-between">
                                      <div className="w-full">
                                        <h1 className="font-bold text-gray-500 text-xl text-wrap truncate	">
                                          {file.nombre}
                                        </h1>
                                      </div>
                                      <div>
                                        <button className="w-4">
                                          <img
                                            src="/lapiz.svg"
                                            alt="edit file"
                                            onClick={() =>
                                              openModalFileEdite(file)
                                            }
                                          />
                                        </button>
                                        <button
                                          className="w-4"
                                          onClick={() =>
                                            openModalFileDrop(file)
                                          }
                                        >
                                          <img src="/basura.svg" alt="basura" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))
                            ) : (
                              <p className="text-gray-500">No hay archivos</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="bg-[--card] p-2 rounded-xl row-span-2">
                        <div className="flex justify-between border-b pb-1">
                          <div>
                            <h1 className="text-gray-600 font-bold">
                              Subtareas
                            </h1>
                          </div>
                          <div>
                            <button className="w-4">
                              <img
                                src="/mas.svg"
                                alt="add task"
                                onClick={() => openModal()}
                              />
                            </button>
                          </div>
                        </div>
                        {getSubtask && getSubtask.length > 0 ? (
                          getSubtask.map((subtask, subTaskIndex) => (
                            <div
                              key={subTaskIndex}
                              className="py-2 flex justify-between items-center"
                            >
                              <div>
                                <p
                                  className={
                                    subtask.status === "done"
                                      ? "line-through text-gray-500"
                                      : "text-gray-500"
                                  }
                                >
                                  {subtask.name}
                                </p>
                              </div>

                              <div className="space-x-2 flex items-center">
                                <button
                                  className="w-4"
                                  onClick={() => chequed(subtask)}
                                >
                                  {subtask.status === "done" ? (
                                    <img
                                      src="/cheque.svg"
                                      alt="Subtarea completada"
                                    />
                                  ) : (
                                    <img
                                      src="/exclamacion.svg"
                                      alt="Subtarea pendiente"
                                    />
                                  )}
                                </button>

                                <button
                                  className="w-4"
                                  onClick={() => openModalAlert(subtask)}
                                >
                                  <img
                                    src="/basura.svg"
                                    alt="Eliminar subtarea"
                                  />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No hay subtareas</p>
                        )}
                      </div>
                    </div>
                    {isOpen && (
                      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                          <SubtaskForm onToggle={closeModal} onTask={oneTask} />
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
                                onClick={handleDelete}
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
                    {isOpenFile && (
                      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                          <FilesForm
                            onTogle={closeModalFile}
                            getTaskID={oneTask._id}
                            oneProjectID={getProjectID}
                          />
                        </div>
                      </div>
                    )}
                    {isOpenFileEdite && (
                      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                          <EditeFile
                            onTogle={closeModalFileEdite}
                            onFile={oneFile}
                          />
                        </div>
                      </div>
                    )}
                    {isOpenFileDrop && (
                      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                          <DeleteFile
                            onTogle={closeModalFileDrop}
                            onFile={oneFile}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p>error</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
