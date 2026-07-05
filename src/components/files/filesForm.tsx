import { useForm } from "react-hook-form";
import { fileService, fileToBase64 } from '../../services/filesService';
import useUserData from "../../hooks/userHooks";
import { useAuth } from "../../context/AuthContext";

interface fileProps {
  onTogle: () => void;
  getTaskID: string;
  oneProjectID: string;
}

interface FormValues {
  file: FileList;
  projects: string;
  nombre: string;
  taskID: string;
}

export default function FilesForm ({onTogle, getTaskID, oneProjectID}:fileProps) {
  const {register, handleSubmit, reset} = useForm<FormValues>();
  const { userID } = useUserData(false, false);
  const { isLogin } = useAuth();

  const createfile = handleSubmit(async(data) => {
    try {
      const file = data.file[0];
      if (file) {
        const base64Data = await fileToBase64(file);
        const fileData = {
          nombre: data.nombre,
          tipo: file.type,
          data: base64Data,
          user: userID,
          projectID: oneProjectID,
          taskID: getTaskID, 
        };        
        await fileService(fileData, isLogin);
        onTogle()
        reset()
      }
    } catch (err) {
      console.error("Error during file upload", err);
    }
  })
  return (
    <>  
      <div>
        <h2 className="text-2xl font-bold mb-4">new file</h2>
        <div>
          <form action="" className="space-y-3" onSubmit={createfile}> 
            <h4>Nombre</h4>
            <input 
              type="text"
              {...register("nombre")}
              className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
            />
            <h4>file</h4>
              <input 
                type="file"
                id="file" 
                className=' rounded-md text-gray-600'
                {...register("file", { required: true })}
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
      </div>
    </>
  )
}