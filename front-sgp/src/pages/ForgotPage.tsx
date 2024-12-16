import { useForm } from "react-hook-form";
import { verifyEmail } from "../services/forgotService";
import { useEffect, useState } from "react";
import { AuthResponseError } from "../types/types";
import useForgot from "../hooks/forgot";
import { useNavigate } from "react-router-dom";

interface ForgotProps {
  onData: (token: string | null, email: string | undefined) => void;
}

export default function Forgot({ onData }: ForgotProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [localError, setLocalError] = useState<AuthResponseError | null>(null);
  const [token, setToken] = useState(null);
  const {userExist} = useForgot(token);
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (userExist) {
      onData(token, email);
      navigate('/reset/password_reset', { replace: true });
    }
  }, [userExist, token, onData, navigate]);

  const handleForgot = handleSubmit(async (data) => {
    try {
      const formValues = { email: data.email };
      const response = await verifyEmail(formValues);

      if (response.error) {
        console.log(data, response.error.response);
        setLocalError({ body: { error: response.error.data.message } });
      } else {
        setLocalError(null);
        console.log("Correo enviado exitosamente:", response.message);
        setEmail(response.email)
      }

      if(typeof response.token === 'string' ){
        setToken(response.token);
      }

    } catch (error: any) {
      console.log(data, );
      setLocalError({ body: { error: error.response.data.message || "Ocurrió un error inesperado" } });
      console.error("Error al enviar correo:", error);
    }
  });

  return (
    <div className="content md:container md:mx-auto justify-center flex box-border">
      <div className="p-6 mt-8 md:w-1/2 flex content-center">
        <div className="sm:mx-auto sm:my-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto max-w-24" src="/logo.webp" alt="logo" />
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight">
            ¿Has olvidado tu contraseña?
          </h2>
          <div>
            {localError && (
              <p className="block text-sm font-medium leading-6 text-red-400 errorMessage bg-red-100 p-4 mt-3 rounded-md border-l-4 border-red-500">
                {localError.body.error}
              </p>
            )}
          </div>
          <div className="mt-8">
            <form className="space-y-6" onSubmit={handleForgot}>
              <p>
                Ingrese la dirección de correo electrónico verificada de su cuenta
                de usuario y le enviaremos un enlace para restablecer la contraseña.
              </p>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">
                  Correo electrónico
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "El correo electrónico es obligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Por favor, ingrese un correo válido",
                      },
                    })}
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {typeof errors.email?.message === "string" && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#0d6efd] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
  );
}
