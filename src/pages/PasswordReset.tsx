import { useState } from "react";
import { useForm } from "react-hook-form"
import { AuthResponseError } from "../types/types";
import { resetPassword } from "../services/forgotService";

interface ProtectForgotProps {
  token: string | null;
  email: string | undefined 
}


export default function PasswordReset ({ token, email }: ProtectForgotProps) {
  const {register, handleSubmit, formState: { errors }, watch } = useForm()
  const [localError, setLocalError] = useState<AuthResponseError | null>(null);
  const password = watch("password");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleReset = handleSubmit(async (data) => {
    try {
      if (typeof email === "string" && typeof token === "string" && typeof data.password === 'string') {
        const formData = {
          password: data.password
        }
        const response = await resetPassword(email, formData, token);
        if (response.success) {
          setSuccessMessage("¡Contraseña actualizada con éxito!");
          setLocalError(null);
        }
      } else {
        throw new Error("Email o token inválido");
      }
      window.location.reload(); 
    } catch (error: any) {
      setLocalError({
        body: { error: error.response?.data?.message || "Ocurrió un error inesperado" },
      });
      console.error("Error al restablecer contraseña:", error);
    }
  });

  return (
    <>
      <div className="content md:container md:mx-auto justify-center flex box-border">
        <div className="p-6 mt-8 md:w-1/2 flex content-center">
          <div className="sm:mx-auto sm:my-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto max-w-24" src="/logo.webp" alt="logo" />
            <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight">
              Ingresa la contraseña
            </h2>
            <div>
              {localError && (
                <p className="block text-sm font-medium leading-6 text-red-400 errorMessage bg-red-100 p-4 mt-3 rounded-md border-l-4 border-red-500">
                  {localError.body.error}
                </p>
              )}
              {successMessage && (
                <p className="block text-sm font-medium text-green-500 bg-green-100 p-4 mt-3 rounded-md border-l-4 border-green-500">
                  {successMessage}
                </p>
              )}
            </div>
            <div className="mt-8">
              <form className="space-y-6" onSubmit={handleReset}>
                <p>
                  Ingrese la nueva contraseña
                </p>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">
                    Nueva contraseña
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "La contraseña es obligatoria",
                        minLength: {
                          value: 6,
                          message: "La contraseña debe tener al menos 6 caracteres",
                        },
                      })}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {typeof errors.password?.message === 'string' && (
                      <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">
                    Repite la contraseña
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      type="password"
                      {...register("confirmPassword", {
                        required: "Por favor confirma la contraseña",
                        validate: value => value === password || "Las contraseñas no coinciden",
                      })}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {typeof errors.confirmPassword?.message === 'string' && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[--primary] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[--primary-hover] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cambiar contraseña
                  </button>
                  <p className="mt-10 text-center text-sm text-gray-500">
                    ¿Ya tienes cuenta?{" "}
                    <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                      Iniciar sesión
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      hola mundo forgot
    </>
  )
}