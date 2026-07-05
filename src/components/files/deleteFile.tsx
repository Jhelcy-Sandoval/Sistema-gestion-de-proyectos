import { useAuth } from "../../context/AuthContext";
import { deleteFile } from "../../services/filesService";

interface DeleteFormProps {
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

export default function DeleteFile ({onTogle, onFile}:DeleteFormProps) {
  const {isLogin} = useAuth();

  const handleDelete = async () => {
    try {
      const fileID = onFile?._id; 
      if(fileID){
        await deleteFile(fileID, isLogin);
        onTogle()
      } else {
        console.log('error file is required');      
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <>
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
          onClick={onTogle}
        >
          Close Modal
        </button>
      </div>
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