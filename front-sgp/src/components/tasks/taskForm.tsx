import { useForm } from "react-hook-form";
import { createCategories } from "../../services/categoriasService";
import { useAuth } from "../../context/AuthContext";
import useUserData from "../../hooks/userHooks";

interface TaskFetchProps {
  isActive: boolean;
  onToggle: () => void;
  oneProject: string
}

export default function TaskForm ({onToggle, oneProject}:TaskFetchProps) {
  const {register, handleSubmit, reset} = useForm()
  const {isLogin} = useAuth();
  const {userID} = useUserData(false);

  const newCategorie = handleSubmit(async(data) => {
    try {      
      const getProjectID = oneProject;
      const dataForm = {
        name: data.name,
        projectID: getProjectID, 
        userID: userID
      }
      console.log(dataForm);
      
      const createCategorie = await createCategories(dataForm, isLogin);
      console.log(createCategorie);
      onToggle();
      reset();
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  })

  return(
    <>
      <section>
        <div  className='content p-4 m-4 rounded-lg mode border-t-4'>
          <div className="flex p-3 justify-between">
            <h1 className="font-bold text-2xl text-wrap w-full">Form new Categorie</h1>
              <button className="flex align-top inline-block text-left w-1/12	" onClick={onToggle}>
                <img src="../../public/close-x-svgrepo-com.svg" alt="close icon" />
              </button>
          </div>
          <div className=" sm:container md:mx-auto justify-center  bg-[#001321] p-2 ">
            <form action="" className="space-y-3 flex flex-col" onSubmit={newCategorie}>
              <h1>Categoria</h1>
              <input className="rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="nombre" 
              {...register("name", { required: true })}
              type="text" />
              <button 
                type="submit"
                className="rounded-md bg-[#0d6efd] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Guardar</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}