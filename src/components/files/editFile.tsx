import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { updateFile } from "../../services/filesService";
import { useEffect, useState } from "react";

interface EditeFormProps {
  onTogle: () => void;
  onFile: FileData | undefined;
}

interface FileData {
  nombre: string;
  data: string;
  tipo: string;
  user: string;
  projects: string;
  _id: string;
}

export default function EditeFile ({onTogle, onFile}: EditeFormProps){
  const {register, handleSubmit , reset, setValue } = useForm<FileData>();
  const {isLogin} = useAuth();
  const [file, setFile] = useState<FileData >();

  useEffect(() => {
    const fetchFile = () => {
      if (onFile) {
        setFile(onFile);
        setValue("_id", onFile._id);
        setValue("nombre", onFile.nombre);
      }
    }

    fetchFile()
  }, [onFile, setValue])

  const updatefile = async (data:FileData) => {
    try {
      const fileID = onFile?._id; 
      if (fileID){
        await updateFile(fileID, data, isLogin);
        onTogle();
        reset()
      } else {
        console.log('error file is required');      
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Edit file</h2>
      <div>
        <form action="" className="space-y-3" onSubmit={handleSubmit(updatefile)}> 
          <h4>File ID</h4> 
          <input 
            type="text"
            disabled
            defaultValue={file?._id || ""}
            className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
            {...register("_id")}
            />

          <h4>Nombre</h4>
          <input 
            type="text"
            defaultValue={file?.nombre || ""}
            {...register("nombre")}
            className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
          />
          <div className="space-x-3 flex justify-end">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              type="submit"
              > save
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={onTogle}
            >
              Close Modal
            </button>
          </div>
        </form>
      </div>
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        onClick={onTogle}
      >
        ×
      </button>
    </>
  )
}