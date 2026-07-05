import { useForm } from "react-hook-form"
import useUserData from "../hooks/userHooks"
import { updateUser } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { AuthResponseError } from "../types/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserAboutme (){
  const {userget, userID} = useUserData(true, false);
  const {register, handleSubmit} = useForm();
  const {isLogin} = useAuth();
 const [ localError, setLocalError] = useState<AuthResponseError | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data:any) => {
    const formData = data;
    try {
      await updateUser(userID, formData, isLogin);
      navigate('/home')
    } catch (error) {
      console.error("Error updating user:", error);
      setLocalError({ body: { error: 'Error updating user' } });
    }
  };  

  return(
    <>
      <div className="mt-4 p-4 rounded-lg mode border-t-4 ">
          <div>
            {localError && (
              <p className='block text-sm font-medium leading-6 text-red-400 errorMessage bg-red-100 p-4 mt-3 rounded-md border-l-4 border-red-500'>
                {localError.body.error}
              </p>
            )}
          </div>
        {typeof userget?.role === 'string' && userget.role === 'admin' ? (
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <h5>Nombre completo</h5>
            <div className="py-2">
              <label className="sr-only" htmlFor="name">Name</label>
              {typeof userget?.name === 'string' ? (
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="name"
                  type="text"
                  id="name"
                  {...register("name")}
                  defaultValue={userget?.name}
                />
              ) : (
                <p>Name</p>
              )}
            </div>
            <div className="py-2">
              <h5>Dirección de correo electrónico </h5>
              <label className="sr-only" htmlFor="email">Email</label>
              {typeof userget?.email === 'string' ? (
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  autoComplete="email"
                  type="email"
                  id="email"
                  {...register("email")}
                  defaultValue={userget?.email}
                />
              ) : (
                <p>Email</p>
              )}
            </div>
            <div>
              <h5>Rol</h5>
              {typeof userget.role === 'string' ? (
                <p className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                  {userget.role}
                </p>
              ) : (
                <p className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">User</p>
              )}
            </div>
            <div className="flex justify-end py-2">
              <button type="submit" className="rounded-md bg-[--primary] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[--primary-hover] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Actualizar
              </button>
            </div>
          </form>
        ) : (
          <>
            <h5>Nombre completo</h5>
            <div className="py-2">
              <label className="sr-only" htmlFor="name">Name</label>
              {typeof userget?.name === 'string' ? (
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  disabled
                  required
                  autoComplete="name"
                  type="text"
                  id="name"
                  defaultValue={userget?.name}
                />
              ) : (
                <p>name</p>
              )}
            </div>
            <div className="py-2">
              <h5>Dirección de correo electrónico </h5>
              <label className="sr-only" htmlFor="email">Email</label>
              {typeof userget?.email === 'string' ? (
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  disabled
                  autoComplete="email"
                  type="email"
                  id="email"
                  defaultValue={userget?.email}
                />
              ) : (
                <p>Email</p>
              )}
            </div>
            <div>
              <h5>Rol</h5>
              {typeof userget?.role === 'string' ? (
                <p className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                  {userget.role}
                </p>
              ) : (
                <p className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">User</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
