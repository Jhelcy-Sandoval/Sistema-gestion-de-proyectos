import { useState } from 'react'
import { useAuth } from '../Auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { ApiURL } from '../Auth/constants';
import { AuthResponseError } from '../types/types';

export default function Login() {
  const [ userEmail, setuserEmail ] = useState("");
  const [ userPassword, setuserPassword ] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth()
  const goTo = useNavigate()

  async function handler(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    try {
      const response = await fetch(`${ApiURL}/login`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
            body: JSON.stringify({
              userEmail,
              userPassword,
            })
        })

      if (response.ok) {
        console.log('user created successfull');
        setErrorResponse("")
        goTo("/")
      }else{
        console.log('something went wrong');
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }

    } catch (error) {
      console.log(error);
    }
  }


  if (auth && auth.isAuthenticated) {
    return <Navigate to={'/dashboard'} />
  }

  return (
    <>
      <div className="content md:container md:mx-auto justify-center h-screen flex box-border ">
        <div className="p-6 mt-8 md:w-1/2 flex content-center">
          <div className="sm:mx-auto sm:my-auto sm:w-full sm:max-w-sm ">
            <img className="mx-auto max-w-24 " src="../../public/logo.webp" alt="logo" />
            <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight">
              Iniciar sesión
            </h2>
            <div>
            {!! errorResponse &&
              <p className='block text-sm font-medium leading-6 text-red-400 errorMessage bg-red-100 p-4 mt-3 rounded-md border-l-4 border-red-500'>{errorResponse}</p>
            }
            </div>
            <div className="mt-8">
              <form className="space-y-6" onSubmit={handler}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">Correo electrónico</label>
                  <div className="mt-2">
                    <input 
                      id="userEmail" 
                      name="userEmail" 
                      type="email" 
                      autoComplete="email" 
                      value={userEmail} 
                      onChange={(e) => setuserEmail(e.target.value)}  
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-400">Contraseña</label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-[#0d6efd] hover:text-indigo-500">Olvidé la contraseña?</a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input 
                      id="userPassword" 
                      name="userPassword" 
                      type="password" 
                      autoComplete="current-password" 
                      value={userPassword}  
                      onChange={(e) => setuserPassword(e.target.value)}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <button className="flex w-full justify-center rounded-md bg-[#0d6efd] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Ingresar
                  </button>
                  <p className="mt-10 text-center text-sm text-gray-500">
                    No te has registrado? 
                    <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
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