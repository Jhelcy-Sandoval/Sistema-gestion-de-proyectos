import { useForm } from "react-hook-form";
import { SubTask, Task } from "../../types/types";
import { createSubTask } from "../../services/subTaskService";
import { useAuth } from "../../context/AuthContext";

interface addSubTaskProps {
  onToggle: () => void;
  onTask: Task;
}

export default function SubtaskForm ({onToggle, onTask}: addSubTaskProps){
  const {register, handleSubmit} = useForm<SubTask>();
  const {isLogin} = useAuth()

  const handleAddSubtask = handleSubmit(async(data) => {
    try {
      const getTaskID = onTask?._id;
      if (typeof getTaskID === 'string') {
        const subTaskForm = {
          name: data.name,
          hecho: false,
          taskID: getTaskID
        }
        await createSubTask(subTaskForm, isLogin)
      }
      onToggle()
    } catch (error) {
      console.error("Error fetching files:", error);    
    }    
  })

  return (
    <>
      <h2 className="text-2xl font-bold mb-4"> Add sub task</h2>
      <div>
        <form className="space-y-2" onSubmit={handleAddSubtask}>
          <h4 className="text-xl">Name</h4>
          <input 
            type="text" 
            className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
            {...register("name")}/>

          <div className="space-x-3 flex justify-center">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              type="submit"
              > Add
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={onToggle}
            >
              Close Modal
            </button>
          </div>
        </form>                     
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