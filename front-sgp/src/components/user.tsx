import { useForm } from "react-hook-form"
import useUserData from "../hooks/userHooks"
import { updateUser } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { AuthResponseError } from "../types/types";
import { useState } from "react";
import useRole from "../hooks/roleHook";

export default function UserAboutme (){
  const {userget, userID} = useUserData();
  const {register, handleSubmit} = useForm();
  const {isLogin} = useAuth();
  const {getRole, setRole, setHasFetchedRole} = useRole(); 
  const [ localError, setLocalError] = useState<AuthResponseError | null>(null);


  const onSubmit = async (data:any) => {
    const formData = data;
    try {
      await updateUser(userID, formData, isLogin);
      setRole(undefined); 
      setHasFetchedRole(false);
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
        {typeof getRole?.name === 'string' && getRole.name === 'admin' ? (
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <h5>Nombre completo</h5>
            <div className="py-2">
              <label className="sr-only" htmlFor="name">Username</label>
              {typeof userget?.userName === 'string' ? (
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="name"
                  type="text"
                  id="name"
                  {...register("userName")}
                  defaultValue={userget?.userName}
                />
              ) : (
                <p>username</p>
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
            <div className="flex justify-end py-2">
              <button type="submit" className="rounded-md bg-[#0d6efd] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Actualizar
              </button>
            </div>
          </form>
        ) : (
          <>
            <h5>Nombre completo</h5>
            <div className="py-2">
              <label className="sr-only" htmlFor="name">Username</label>
              {typeof userget?.userName === 'string' ? (
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  disabled
                  required
                  autoComplete="name"
                  type="text"
                  id="name"
                  defaultValue={userget?.userName}
                />
              ) : (
                <p>username</p>
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
          </>
        )}
      </div>
    </>
  )
}
