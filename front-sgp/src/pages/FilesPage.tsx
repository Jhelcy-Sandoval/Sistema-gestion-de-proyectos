import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthResponseError } from '../types/types';
import { fileService, fileToBase64 } from '../services/filesService';
import DefaultLayout from '../layout/DefaultLayout'; 
import FilesFetch from '../components/files';

interface FormValues {
  file: FileList;
  nombre: string;
}

export default function Files() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [localError, setLocalError] = useState<AuthResponseError | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const file = data.file[0]; 
      if (file) {
        const base64Data = await fileToBase64(file);
        console.log(base64Data, file);
        const fileData = {
          nombre: data.nombre,
          tipo: file.type,
          data: base64Data,
        };
        const response = await fileService(fileData);
        console.log('Respuesta del servidor:', response);
      }
    } catch (error) {
      setLocalError({ body: { error: 'Error during file upload' } });
      console.error("Error during file upload", error);    
    }
  });

  return (
    <>
      <DefaultLayout>
        <section className=" md:container md:mx-auto justify-center flex box-border bg-[#001321]">
          <div className="mt-8">
            <div>
              {localError && (
                <p className='block text-sm font-medium leading-6 text-red-400 errorMessage bg-red-100 p-4 mt-3 rounded-md border-l-4 border-red-500'>
                  {localError.body.error}
                </p>
              )}
            </div>
            <form className="space-y-6" onSubmit={onSubmit}>
              <input 
                type="text"
                id="nombre" 
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("nombre", { required: true })}
              />
              <input 
                type="file"
                id="file" 
                {...register("file", { required: true })}
              />
              <button 
                className="flex w-full justify-center rounded-md bg-[#0d6efd] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                guardar
              </button>
            </form>
          </div>
        </section>
        <section>
          <FilesFetch/>
        </section>
      </DefaultLayout>
    </>
  );
}
