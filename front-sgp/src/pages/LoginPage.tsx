import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { AuthContextType, AuthResponseError } from '../types/types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const { register, handleSubmit } = useForm();
  const { signin, isAuthenticated, error } = useAuth() as AuthContextType;
  const [ localError, setLocalError] = useState<AuthResponseError | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signin(values);
    } catch (error) {
      setLocalError({ body: { error: 'Error during signup' }});
      console.error("Error during signup", error);    
    }
  })

  return (
    <>
      <div className="content md:container md:mx-auto justify-center h-screen flex box-border ">
        <div className="p-6 mt-8 md:w-1/2 flex content-center">
          <div className="sm:mx-auto sm:my-auto sm:w-full sm:max-w-sm ">
            <img className="mx-auto max-w-24 " src="/logo.webp" alt="logo" />
            <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight">
              Iniciar sesión
            </h2>
            <div>
              { localError && (
                <p className='block text-sm font-medium leading-6 text-red-400 errorMessage bg-red-100 p-4 mt-3 rounded-md border-l-4 border-red-500'>
                  {localError.body.error}
                </p>)
              } 
              {!!error && 
                <p className="block text-sm font-medium leading-6 text-red-400 errorMessage bg-red-100 p-4 mt-3 rounded-md border-l-4 border-red-500">{error.body.error}</p>
              }
            </div>
            <div className="mt-8">
              <form className="space-y-6"  onSubmit={onSubmit} >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">Correo electrónico</label>
                  <div className="mt-2">
                    <input 
                      id="email" 
                      type="email" 
                      autoComplete="email" 
                      {...register("email", {required: true})}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-400">Contraseña</label>
                    <div className="text-sm">
                      <a href="/forgot" className="font-semibold text-[#0d6efd] hover:text-indigo-500">Olvidé la contraseña?</a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input 
                      id="password" 
                      type="password" 
                      autoComplete="current-password" 
                      {...register("password", {required: true})}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <button className="flex w-full justify-center rounded-md bg-[#0d6efd] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Ingresar
                  </button>
                  <p className="mt-10 text-center text-sm text-gray-500">
                    No te has registrado? 
                    <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                      Registrarse
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>   
      </div>
    </>
  )
}