import { useForm } from "react-hook-form";
import { Task } from "../../types/types";
import { createSubTask, CreateSubTaskDTO } from "../../services/subTaskService";
import { useAuth } from "../../context/AuthContext";
import useUserData from "../../hooks/userHooks";

interface AddSubTaskProps {
  onToggle: () => void;
  onTask: Task;
}

interface FormValues {
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignedTo: string;
  estimatedHours: number;
  dueDate: string;
}

export default function SubtaskForm({
  onToggle,
  onTask,
}: AddSubTaskProps) {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const { isLogin } = useAuth();
  const { userID, usersDevelopers } = useUserData(false, true);

  const handleAddSubtask = handleSubmit(async (data) => {
    try {
      const subTaskForm: CreateSubTaskDTO = {
        name: data.name,
        description: data.description,

        taskId: onTask._id,
        userId: userID,

        assignedTo: data.assignedTo || null,

        status: "todo",
        priority: data.priority,

        progress: 0,

        estimatedHours: Number(data.estimatedHours) || 0,

        dueDate: data.dueDate || null,
      };

      await createSubTask(subTaskForm, isLogin);

      reset();
      onToggle();
    } catch (error) {
      console.error("Error creating subtask:", error);
    }
  });

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Add Subtask</h2>

      <form
        className="space-y-4"
        onSubmit={handleAddSubtask}
      >
        <div>
          <label>Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full rounded-md p-2 text-gray-900"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            {...register("description")}
            className="w-full rounded-md p-2 text-gray-900"
          />
        </div>

        <div>
          <label>Priority</label>

          <select
            {...register("priority")}
            className="w-full rounded-md p-2 text-gray-900"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label>Assign developer</label>

          <select
            {...register("assignedTo")}
            className="w-full rounded-md p-2 text-gray-900"
          >
            <option value="">Unassigned</option>

            {usersDevelopers.map((developer) => (
              <option
                key={developer._id}
                value={developer._id}
              >
                {developer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Estimated Hours</label>

          <input
            type="number"
            min={0}
            {...register("estimatedHours")}
            className="w-full rounded-md p-2 text-gray-900"
          />
        </div>

        <div>
          <label>Due Date</label>

          <input
            type="date"
            {...register("dueDate")}
            className="w-full rounded-md p-2 text-gray-900"
          />
        </div>

        <div className="flex justify-center gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={onToggle}
          >
            Close
          </button>
        </div>
      </form>

      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        onClick={onToggle}
      >
        ×
      </button>
    </>
  );
}