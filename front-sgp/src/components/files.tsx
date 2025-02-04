import { useState } from "react";
import { deleteFile, updateFile } from "../services/filesService";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import useProject from "../hooks/projectsHook";
import useFiles from "../hooks/filesHook";

interface FileData {
  nombre: string;
  data: string;
  tipo: string;
  user: string;
  projects: string;
  _id: string;
}

interface FilesFetchProps {
  isActive: boolean;
  onToggle: () => void;
  refreshed: boolean
}

export default function FilesFetch({ onToggle, refreshed }: FilesFetchProps){
  const {register, handleSubmit , reset} = useForm<FileData>();
  const {isLogin} = useAuth();
  const {getProject} = useProject(refreshed, false);
  const {filesget, setFiles} = useFiles(refreshed)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null); 
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [fileuse, setFile] = useState<FileData>()
  const [refresh, setRefresh] = useState(false);

  const openModal = (file: FileData) => {
    setIsOpen(true);
    setFile(file)
    reset(file);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalAlert = (file: FileData) => {
    setIsOpenAlert(true);
    setFile(file)
    reset(file);
  };

  const closeModalAlert = () => {
    setIsOpenAlert(false);
  };

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const updatefile = async (data:FileData) => {
    try {
      const fileID = fileuse?._id; 
      if (fileID){
        await updateFile(fileID, data, isLogin)
        setRefresh(!refresh);
        setIsOpen(false)
      } else {
        console.log('error file is required');      
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  const handleDelete = async () => {
    try {
      const fileID = fileuse?._id; 
      if(fileID){
        await deleteFile(fileID, isLogin);
        setIsOpenAlert(false)      
        setFiles(filesget.filter(f => f._id !== fileID));
        setRefresh(!refresh);
      } else {
        console.log('error file is required');      
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  
  return (
    <>
      <div className="content p-4 m-4 rounded-lg mode border-t-4">
        <div className="flex my-4 justify-between box-border">
          <h1 className="text-2xl ">Documents</h1>
          <button className="rounded-md bg-[#0d6efd] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 py-2"
            onClick={onToggle}>
            New file
          </button>
        </div>
        {filesget.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 w-full">
            {filesget.map((file, index) => (
              <div className="bg-white border border-slate-200 gap-2 rounded-xl text-sm"  key={index}>
                <div className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600 flex justify-center">
                  {file.tipo?.startsWith('image/') ? ( 
                    <div className="bg-slate-100 text-slate-600 aspect-w-16 aspect-h-9">
                      <img className="max-w-full max-h-full object-contain" src={`${file.data}`} alt={file.nombre}/>
                    </div>
                  ) : (
                    <a href={`${file.data}`} download={file.nombre}>
                      <img className="max-w-full max-h-full object-contain" src="/descarga.png" alt="" />                      
                    </a>
                  )}
                </div>
                <div className="flex p-3 justify-between">
                  <div className="w-full">
                    <h1 className="font-bold text-gray-500 text-xl text-wrap truncate	">{file.nombre}</h1>
                    <h4 className="font-bold text-gray-900 text-sm text-wrap truncate">{file.projects}</h4>
                  </div>
                  <button 
                    className="flex align-top inline-block text-left min-w-8 relative "
                    onClick={() => handleDropdownToggle(index)}
                  >
                    <img  src="/options.svg" alt="menu" />               
                  {activeDropdown === index && (
                      <div className="absolute mt-4 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                        <div className="py-1">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => openModal(file)}
                          >
                            Edit
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => openModalAlert(file)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                  )}
                  </button>
                  {isOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                      <div className="model rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <h2 className="text-2xl font-bold mb-4">Edit file</h2>
                        <div>
                          <form action="" className="space-y-3" onSubmit={handleSubmit(updatefile)}> 
                            <h4>File ID</h4> 
                            <input 
                              type="text"
                              disabled
                              defaultValue={file._id}
                              className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                              {...register("_id")}
                              />

                            <h4>Nombre</h4>
                            <input 
                              type="text"
                              defaultValue={file.nombre}
                              {...register("nombre")}
                              className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                            />
                            <h4>Proyect</h4>
                            <select 
                              id="project"
                              defaultValue={file.projects}
                              className='rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full'
                              {...register("projects", { required: true })}
                            >
                              <option value="">Select a project</option>
                              {getProject.map((project, index) => (
                                <option key={index} value={`${project?.nombre}`}>{project?.nombre}</option>
                              ))}
                            </select>
                            <div className="space-x-3 flex justify-end">
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
                </div>
              </div>
            ))}
          </div>
        ):(
          <div>
            <p className="p-2">No hay archivos para mostrar</p>
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
    </>
  )
}