import { useEffect, useState } from "react"
import { getOneProject, updateProject } from "../services/projectsService"
import { useAuth } from "../context/AuthContext"
import { useForm } from "react-hook-form"
import ProjectTaks from "./projectTask"
import TaskForm from "./tasks/taskForm"
import TaskGet from './tasks/taskGet';
import { Task } from "../types/types"

interface ProjectsFetchProps {
  selectedProject: string
  setSelectedProject: any
}

interface ProjectsData {
  imgProject: {
    nombre: string
    data: string
    type: string
  }
  _id: string
  nombre: string
  objetivo: string
  alcance: string
  userID: string
  createdAt: string
  updatedAt: string
}

export default function ProjectGet({
  selectedProject,
  setSelectedProject,
}: ProjectsFetchProps) {
  const [oneProject, setOneProject] = useState<ProjectsData | undefined>(undefined);
  const { register, handleSubmit } = useForm();
  const { isLogin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>(); 
  
  const closeToggle = () => {
    setSelectedProject(null)
  }
  
  const openModal = () => {
    setIsOpen(true);    
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdate = handleSubmit(async (values) => {
    try {
      if(typeof oneProject?._id === 'string'){
        await updateProject(oneProject._id, values, isLogin)
      }
      setIsOpen(false)
    } catch (error) {
      console.error("Error fetching files:", error)
    }
  })

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getOneProject(selectedProject, isLogin)
        setOneProject(response)
      } catch (error) {
        console.error("Error fetching files:", error)
      }
    }

    if (isLogin) {
      fetchProject()
    }
  }, [isLogin, selectedProject]) 

  const ToggleForm = () => {
    setIsActive(!isActive)
    setRefresh(!refresh)
  }

  const handleTaskSelect = (task: Task | undefined) => {
    setSelectedTask(task);
    console.log(selectedTask);
  };

  const handleTaskClose = (task:undefined) => {
    setSelectedTask(task)
    console.log(selectedTask);
    
  }

  return (
    <>
      {oneProject && 
        <div className="p-4">
          <div className="flex p-4 bg-gradient-to-r from-blue-900 to-cyan-500 items-center">
            {oneProject.imgProject?.data ? (
              <button 
              className="w-1/6 rounded-full overflow-hidden relative group aspect-square max-w-[150px] max-h-[150px]"
              onClick={openModal}>
                <img 
                  className="w-full h-full object-cover rounded-full transition-opacity duration-300 ease-in-out group-hover:opacity-0" 
                  src={`${oneProject.imgProject.data}`} 
                  alt={`${oneProject.imgProject.nombre}`} 
                />
                <div className="w-full h-full bg-white rounded-full absolute top-0 left-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-70">
                  <img src="/subir-archivo.svg" alt="icono de subir archivo" />
                </div>
            </button>
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                <img className="rounded-full" src="/logo.webp" alt="foto user" />
              </div>
            )}
            {isOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center">
                <div className="mode rounded-lg shadow-lg max-w-lg w-full p-6 relative z-50">
                  <h2 className="text-2xl font-bold text-center pb-3">Change the picture?</h2>
                  <div>                     
                    <h4 className="text-xl"></h4>  
                    <div className=" flex justify-center">
                      <form onSubmit={handleUpdate} className="space-y-3">
                        <div className="my-2">
                          <input 
                            type="file" 
                            id="foto"
                            {...register("foto")}
                            className='flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium'/>
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
            <div className="p-4 ">
              {typeof oneProject?.nombre === 'string' ? (
                <p className="text-5xl">{oneProject.nombre}</p>
              ) : (
                <p className="text-5xl">No valid username available</p>
              )}
            </div>
          </div>
          <div className="my-4">
            <h2 className="text-2xl pb-1">Datos generales</h2>
            <div>
              <div className="px-3">
                <span className="font-bold">Alcanse: </span>
                  <p>{oneProject.alcance} </p>
                <span className="font-bold">Objetivo: </span>
                  <p>{oneProject.objetivo}</p>
              </div>
              <section className='flex flex-row'>
                {!selectedTask &&
                <div className='flex flex-row w-full'>
                  <div className='flex-1 w-full'>
                    <div className="content p-4 mt-4 rounded-lg mode border-t-4">
                      <div className="flex my-4 justify-between box-border">
                        <h1 className="text-2xl">Tareas</h1>
                        <div className="grid grid-cols-2 gap-1 place-items-end">
                          <button 
                            className="rounded-md bg-[#0d6efd] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 py-2"
                            onClick={ToggleForm}
                          >
                            Nueva tarea
                          </button>
                          <button
                            className="bg-white text-center w-full h-full rounded-md relative text-black text-xl font-semibold group"
                            onClick={closeToggle}
                          >
                            <div className="bg-[#0d6efd] rounded-md w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-24 duration-500">
                              <img src="/atras.svg" alt="atras" />
                            </div>
                            <p className="translate-x-2">Atras</p>
                          </button>
                        </div>
                      </div>
                      <div>
                        {oneProject && <ProjectTaks oneProject={oneProject._id} refresh={refresh} onTaskSelect={handleTaskSelect} />}
                      </div>
                    </div>
                  </div>
                </div>
              }
                <div className={`${isActive ? 'w-1/3' : 'flex-none'}`}>
                  {isActive && <TaskForm onToggle={ToggleForm} isActive={isActive} oneProject={oneProject._id}/>}
                </div>
              </section>
                <div>
                  {selectedTask && <TaskGet showTask={selectedTask} onTaskSelect={handleTaskClose} getProjectID={oneProject._id}/>}
                </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
