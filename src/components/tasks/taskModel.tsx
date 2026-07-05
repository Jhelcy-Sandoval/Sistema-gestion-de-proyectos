import { useAuth } from "../../context/AuthContext";
import { deleteTask } from "../../services/taskService";
import { Task } from "../../types/types";

interface taskProps{
  onToggle: () => void;
  getTask: Task | undefined;
}

export default function TaskModel ({onToggle, getTask}:taskProps) {
  const {isLogin} = useAuth();

  const handleDelete = async() => {
    const taskID = getTask?._id
    try {
      if(typeof taskID === 'string'){
        await deleteTask(taskID, isLogin)
        onToggle()
      }
    } catch (error) {
      console.error("Error fetching files:", error)
    } 
  }
  
  return(
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
            onClick={onToggle}
          >
            Close Modal
          </button>
        </div>
      </div>
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        onClick={onToggle}
      >
        ×
      </button>
    </>
  )
}