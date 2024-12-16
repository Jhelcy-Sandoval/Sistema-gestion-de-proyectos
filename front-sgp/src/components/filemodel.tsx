import { fileService, fileToBase64 } from '../services/filesService';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthResponseError } from '../types/types';
import { useAuth } from '../context/AuthContext';
import useError from '../hooks/error';
import useUserData from '../hooks/userHooks';
import useProject from '../hooks/projectsHook';
import useTask from '../hooks/taskHook';

interface FormValues {
  file: FileList;
  projects: string;
  nombre: string;
  taskID: string;
}

interface FilesFetchProps {
  isActive: boolean;
  onToggle: () => void;
  onFileUploaded: () => void;
  refreshed: boolean;
}

export default function FilesModel({ onToggle, onFileUploaded, refreshed}: FilesFetchProps) {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [localError, setLocalError] = useState<AuthResponseError | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { getProject } = useProject(refreshed, false);
  const [ getProjectID, setProjectID] = useState('');
  const { userID } = useUserData(false);
  const { isLogin } = useAuth();
  const { error } = useError();
  const { tasks } = useTask(getProjectID, false, false);

  const selectedProject = watch("projects"); 

  
  useEffect(() => {
    if (selectedProject) {
      console.log(selectedProject);
      setProjectID(selectedProject)
    } 
  }, [selectedProject, tasks]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const file = data.file[0];
      if (file) {
        const base64Data = await fileToBase64(file);
        const fileData = {
          nombre: data.nombre,
          tipo: file.type,
          data: base64Data,
          user: userID,
          projectID: data.projects,
          taskID: data.taskID, 
        };        
        const response = await fileService(fileData, isLogin);
        setMessage(response.message);
        onFileUploaded();
        onToggle()
      }
    } catch (err) {
      setLocalError({ body: { error: 'Error during file upload' } });
      console.error("Error during file upload", err);
    }
  });


  return (
    <>
      <section className='content p-4 m-4 rounded-lg mode border-t-4'>
        <div className="flex p-3 justify-between">
          <h1 className="font-bold text-2xl text-wrap w-full">Form new file</h1>
          <button className="flex align-top inline-block text-left w-1/12	" onClick={onToggle}>
            <img src="/close-x-svgrepo-com.svg" alt="close icon" />
          </button>
        </div>
        <div className=" sm:container md:mx-auto justify-center  bg-[#001321] p-2">
          <div className="mt-4">
            <div>
              {message && <p className='block text-sm font-medium leading-6 text-green-400 errorMessage bg-green-100 p-4 mt-3 rounded-md border-l-4 border-green-500'>{message}</p>}
              {error && <p>{error.message}</p>}
              {localError && (
                <p className='block text-sm font-medium leading-6 text-red-400 errorMessage bg-red-100 p-4 mt-3 rounded-md border-l-4 border-red-500'>
                  {localError.body.error}
                </p>
              )}
            </div>
            <form className="space-y-3 flex flex-col" onSubmit={onSubmit}>
              <h4>Name</h4>
              <input 
                type="text"
                id="nombre" 
                className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("nombre", { required: true })}
              />
              <h4>Proyect</h4>
              <select 
                id="project"
                className='rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register("projects", { required: true })}
              >
                <option value="">Select a project</option>
                {getProject.map((project, index) => (
                  <option key={index} value={project?._id}>{project?.nombre}</option>
                ))}
              </select>
              {selectedProject && tasks.length > 0 && (
                <>
                  <h4>Task</h4>
                  <select
                    id="task"
                    className='rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    {...register("taskID", { required: true })}
                  >
                    <option value="">Select a task</option>
                    {tasks.map((task, index) => (
                      <option key={index} value={task?._id}>{task?.Título}</option>
                    ))}
                  </select>
                </>
              )}
              <h4>file</h4>
              <input 
                type="file"
                id="file" 
                className=' rounded-md text-gray-600'
                {...register("file", { required: true })}
              />
              <button 
                className="rounded-md bg-[#0d6efd] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                guardar
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}