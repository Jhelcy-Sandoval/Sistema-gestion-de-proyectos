import { useForm } from "react-hook-form";
import { createCategories } from "../../services/categoriasService";
import { useAuth } from "../../context/AuthContext";
import useUserData from "../../hooks/userHooks";

interface CategoryFormProps {
  newCategory: boolean;
  onToggle: () => void;
  oneProject: string;
}

export default function CategoryForm({
  onToggle,
  oneProject,
}: CategoryFormProps) {
  const { register, handleSubmit, reset } = useForm();
  const { isLogin } = useAuth();
  const { userID } = useUserData(false, false);

  const newCategory = handleSubmit(async (data) => {
    try {
      const dataForm = {
        name: data.name,
        projectId: oneProject,
        userId: userID,
      };

      await createCategories(dataForm, isLogin);

      onToggle();
      reset();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  });

  return (
    <section className="h-full">
      <div className="content p-4 rounded-lg mode border-t-4 h-full">
        <div className="flex p-3 justify-between">
          <h1 className="font-bold text-2xl text-wrap w-full">
            Form New Category
          </h1>

          <button
            className="flex align-top inline-block text-left w-1/12"
            onClick={onToggle}
          >
            <img
              src="/close-x-svgrepo-com.svg"
              alt="close icon"
            />
          </button>
        </div>

        <div className="sm:container md:mx-auto justify-center bg-[--background] p-2">
          <form
            className="space-y-3 flex flex-col"
            onSubmit={newCategory}
          >
            <h1>Category</h1>

            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <button
              type="submit"
              className="rounded-md bg-[--primary] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[--primary-hover] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save Category
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}