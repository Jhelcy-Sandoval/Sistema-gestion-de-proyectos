import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthResponseError } from '../types/types';
import { useAuth } from '../context/AuthContext';
import useError from '../hooks/error';
import { createProject, ProjectToBase64 } from '../services/projectsService';
import useUserData from '../hooks/userHooks';

interface FormValues {
  nombre: string,
  objetivo: string,
  alcance: string,
  imgProject:FileList,
  userID: string
}

interface ProjectsFetchProps {
  isActive: boolean;
  onToggle: () => void;
  onProjectUploaded: () => void;
}

export default function ProjectModel ({ onToggle, onProjectUploaded  }: ProjectsFetchProps) {
  const { register, handleSubmit } = useForm<FormValues>();
  const { userID } = useUserData(false);
  const [ localError, setLocalError ] = useState<AuthResponseError | null>(null);
  const [ message, setMessage ] = useState();
  const { isLogin } = useAuth();
  const { error } = useError();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const projectImg = data.imgProject[0]; 
      if (projectImg) {
        const base64Data = await ProjectToBase64(projectImg);
        console.log(base64Data, projectImg);
        const fileData = {
          nombre: data.nombre,
          objetivo: data.objetivo,
          alcance: data.alcance,
          imgProject:{
            nombre: `project image ${data.nombre}`,
            data: base64Data,
            type: projectImg.type            
          },
          userID: userID,
          promedio: 0
        }
        const response = await createProject(fileData, isLogin);
        onToggle();
        setMessage(response.message)
        onProjectUploaded(); 
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
            <h1 className="font-bold text-2xl text-wrap w-full">Form new project</h1>
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
              <h4>Objetive</h4>
              <input 
                type="text"
                id="objetivo" 
                className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("objetivo", { required: true })}
              />
              <h4>Alcance</h4>
              <input 
                type="text"
                id="alcance" 
                className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("alcance", { required: true })}
              />
              <h4>image of project</h4>
              <input 
                type="file"
                id="imgProject" 
                className=' rounded-md text-gray-600'
                {...register("imgProject", { required: true })}
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