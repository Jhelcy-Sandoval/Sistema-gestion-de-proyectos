import { useForm } from "react-hook-form";
import { createNewTask, CreateTaskDTO } from "../../services/taskService";
import { useAuth } from "../../context/AuthContext";
import useUserData from "../../hooks/userHooks";
import useTask from "../../hooks/taskHook";

interface TaskFormProps {
  newTask: boolean;
  onToggle: () => void;
  oneProject: string;
}

interface FormValues {
  title: string;
  description: string;
  status: "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high";

  categoryId: string;

  assignedTo: string;

  estimatedHours: number;

  dueDate: string;
}

export default function TaskForm({ onToggle, oneProject }: TaskFormProps) {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const { isLogin } = useAuth();

  const { userID, usersDevelopers } = useUserData(false, true);
  const { categorias } = useTask(false, false, oneProject);

  const newTask = handleSubmit(async (data) => {
    try {
      const taskData: CreateTaskDTO = {
        title: data.title,
        description: data.description,

        status: data.status,
        priority: data.priority,
        progress: 0,
        projectId: oneProject,
        categoryId: data.categoryId,
        userId: userID,

        assignedTo: data.assignedTo || null,

        estimatedHours: Number(data.estimatedHours),

        dueDate: data.dueDate,
      };

      await createNewTask(taskData, isLogin, oneProject);

      reset();
      onToggle();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  });

  return (
    <section>
      <div className="content p-4 rounded-lg mode border-t-4 h-full">
        <div className="flex justify-between p-3">
          <h1 className="font-bold text-2xl">Form New Task</h1>

          <button onClick={onToggle}>
            <img src="/close-x-svgrepo-com.svg" alt="close" />
          </button>
        </div>

        <div className="bg-[--card-dark] p-3 rounded-lg">
          <form className="space-y-4 flex flex-col" onSubmit={newTask}>
            <div>
              <label>Title</label>

              <input
                {...register("title", {
                  required: true,
                })}
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
              <label>Status</label>

              <select
                {...register("status")}
                className="w-full rounded-md p-2 text-gray-900"
              >
                <option value="todo">To Do</option>

                <option value="in_progress">In Progress</option>

                <option value="review">Review</option>

                <option value="done">Done</option>
              </select>
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
              <label>Assign Developer</label>

              <select
                {...register("assignedTo")}
                className="w-full rounded-md p-2 text-gray-900"
              >
                <option value="">Unassigned</option>

                {usersDevelopers.map((developer) => (
                  <option key={developer._id} value={developer._id}>
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

            <div>
              <label>Category</label>

              <select
                {...register("categoryId", { required: true })}
                className="w-full rounded-md p-2 text-gray-900"
              >
                <option value="">Select category</option>

                {categorias.map((categoria) => (
                  <option key={categoria._id} value={categoria._id}>
                    {categoria.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="rounded-md bg-[--primary] px-3 py-2 font-semibold text-white hover:bg-[--primary-hover]"
            >
              Save Task
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
