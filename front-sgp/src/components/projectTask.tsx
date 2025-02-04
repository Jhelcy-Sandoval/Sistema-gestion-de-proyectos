import { useState } from "react";
import useTask from "../hooks/taskHook";
import { deleteCategoria } from "../services/categoriasService";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Task } from '../types/types';
import { createNewTask } from "../services/taskService";
import TaskModel from "./tasks/taskModel";
import useUserData from "../hooks/userHooks";

interface ProjectTaksProps {
  oneProject: string; 
  refresh: boolean;
  onTaskSelect: (task: Task ) => void
}

interface Categorias {
  name: string;
  _id: string;
  projectID: string;
}

export default function ProjectTask({ oneProject, refresh, onTaskSelect}: ProjectTaksProps) {
  const {isLogin} = useAuth();
  const {register, handleSubmit, reset} = useForm<Task & Categorias>();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null); 
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [oneCategorie, setCategorie] = useState<Categorias>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [fetchTask, setTask] = useState<Task>();
  const [refreshed, setRefreshed] = useState(false);
  const {tasks, categorias} = useTask(oneProject, refresh, refreshed);
  const {userID} = useUserData(false);

  const openModal = (categoria: Categorias) => {
    setIsOpen(true);
    setCategorie(categoria)
  };

  const closeModal = () => {
    setIsOpen(false);
    reset()
  };

  const openModalDelete = (task: Task) => {
    setIsOpenDelete(true)
    setTask(task)
  }

  const closeModalDelete = () => {
    setIsOpenDelete(false);
    setRefreshed(!refreshed);
  }

  const openModalAlert = (categoria: Categorias) => {
    setIsOpenAlert(true);
    setCategorie(categoria)
  };

  const closeModalAlert = () => {
    setIsOpenAlert(false);
  };

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  }

  const handleDelete = async() => {
    try {
      const categoriaID = oneCategorie?._id;
      
      if(typeof categoriaID === 'string'){
        await deleteCategoria(categoriaID, isLogin)
        setIsOpenAlert(false);
        setRefreshed(!refresh)
      }
    } catch (error) {
      console.error("Error fetching files:", error)
    }
  }

  const addTask = handleSubmit(async (data) => {
    try {
      const categoriaName = oneCategorie?.name || "sin categoria";
      const dataForm = {
        Título: data.Título || "",  
        Descripción: data.Descripción || "",  
        Categoría: [categoriaName],  
        Responsable: data.Responsable || "",  
        projectID: oneProject,
        Prioridad: data.Prioridad || "", 
        FechaVencimiento: data.FechaVencimiento ? data.FechaVencimiento.toString() : "",
        userID: userID 
      };
  
      await createNewTask(dataForm, isLogin);      
      setIsOpen(false);
      reset();
      setRefreshed(!refresh);
  
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  });

  const getOneTask = async (task:Task) => {
    onTaskSelect(task);
  }
  
  return (
    <>
      <section className="gap-4 grid-cols-1	grid">
      {categorias && categorias.length > 0 ? (
        categorias
          .filter((categoria) => categoria.projectID === oneProject) 
          .map((categoria, categoriaIndex) => (
            <div key={categoriaIndex} className="bg-white border border-slate-200 p-2 rounded-xl text-sm">
              <div className="flex justify-between">
                <h1 className="font-bold text-gray-500 text-xl text-wrap truncate	">{categoria.name}</h1>
                <div className="flex space-x-2">
                  <button className="w-4" onClick={() => handleDropdownToggle(categoriaIndex)}>
                    {activeDropdown === categoriaIndex ? (
                      <img src="/flecha-hacia-arriba.svg" alt="close"/>
                    ) : (
                      <img src="/open-dropdown.svg" alt="menu" />
                    )}
                  </button>
                  <button className="w-4">
                    <img src="/mas.svg" alt="add task" onClick={() => openModal(categoria)}/>
                  </button>
                  <button className="w-4"  onClick={() => openModalAlert(categoria)} >
                    <img src="/basura.svg" alt="basura" />
                  </button>
                </div>
              </div>
              {isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                  <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                    <h2 className="text-2xl font-bold mb-4"> Add Task</h2>
                    <div >
                      <form className="space-y-2" action="" onSubmit={addTask}>
                        <h4>Título</h4>
                        <input 
                          type="text" 
                          className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                          {...register("Título")}/>

                         <h4>Descripción</h4>
                        <input 
                          type="text" 
                          className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                          {...register("Descripción")}/>

                         <h4>Responsable</h4>
                        <input 
                          type="text" 
                          className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                          {...register("Responsable")}/> 

                        <h4>Prioridad</h4>
                        <div
                          className="flex space-x-2 border-[3px] border-sky-500 rounded-xl select-none"
                        >
                          <label
                            className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer"
                          >
                            <input
                              type="radio"
                              value="baja"
                              className="peer hidden"
                              {...register("Prioridad")}
                            />
                            <p className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#0d6efd] peer-checked:to-[#0d6efd] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">Baja</p>
                          </label>

                          <label
                            className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer"
                          >
                            <input 
                              type="radio"  
                              value="media" 
                              className="peer hidden"
                              {...register("Prioridad")} />
                            <p className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#0d6efd] peer-checked:to-[#0d6efd] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">Media</p> 
                          </label>

                          <label
                            className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer"
                          >
                            <input 
                              type="radio" 
                              value="alta" 
                             className="peer hidden" 
                              {...register("Prioridad")}/>
                            <p className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#0d6efd] peer-checked:to-[#0d6efd] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">Alta</p>
                          </label>
                        </div>

                        <h4>Fecha vencimiento</h4>
                        <input 
                          type="date"
                          {...register("FechaVencimiento")}
                          className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"/>

                        <div className="space-x-3 p-2 flex justify-end">
                          <button 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            type="submit"
                            > save
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
                    <div>                     
                      <h4 className="text-xl"></h4>  
                      <div className="space-x-3 flex justify-center">
                        <button 
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                          type="submit"
                          onClick={() => handleDelete()}
                          > Delete
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

              {activeDropdown === categoriaIndex && (
                <div  className="border px-2 rounded-lg bg-slate-200">
                  {tasks && tasks.length > 0 ? (
                    tasks
                      .filter((task) => Array.isArray(task.Categoría) && task.Categoría.includes(categoria._id)) 
                      .map((task, taskIndex) => (
                        <div key={taskIndex} className="bg-white p-2 my-2 rounded-xl flex justify-between border hover:border-sky-500">
                          <div onClick={() => getOneTask(task)} className="w-full cursor-pointer">
                            <h1 className="font-bold text-gray-500 text-xl text-wrap truncate	">{task.Título}</h1>
                            <p className="text-gray-500">{task.Descripción}</p>
                          </div>
                          <div className="w-32 flex items-center ">
                            <div className="bg-gray-400 rounded-full mx-auto w-28  h-4" >
                              <div className="bg-blue-800 rounded-full h-4 text-center px-1" style={{ width: `${task.Progreso}%` }}>{task.Progreso}%</div>
                            </div>
                            <div>
                              <button className="w-4"  onClick={() => openModalDelete(task)} >
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
                      <TaskModel onToggle={closeModalDelete} getTask={fetchTask}/>
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
