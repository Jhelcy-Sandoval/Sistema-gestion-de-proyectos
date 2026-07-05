import "../App.css";
import useUserData from "../hooks/userHooks";
import UserAboutme from "../components/user";
import { useState } from "react";
import { fotoToBase64, updateUser } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

export default function UserP() {
  const { register, handleSubmit } = useForm();
  const { isLogin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { userget, userID } = useUserData(refresh, false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdate = handleSubmit(async (values) => {
    try {
      const getFoto = values.foto[0];
      if (getFoto) {
        const base64Data = await fotoToBase64(getFoto);
        const fotoData = {
          foto: {
            nombre: getFoto.name,
            type: getFoto.type,
            data: base64Data,
          },
        };
        await updateUser(userID, fotoData, isLogin);
      }
      setRefresh(!refresh);
      closeModal();
    } catch (err) {
      console.error("Error during file upload", err);
    }
  });

  return (
    <>
      <section className="m-4">
        <div className="flex p-3 bg-gradient-to-r from-blue-900 to-cyan-500 items-center">
          <button
            className="w-1/6 rounded-full overflow-hidden relative group aspect-square max-w-[150px] max-h-[150px]"
            onClick={openModal}
          >
            {userget?.foto?.data ? (
              <img
                className="w-full h-full object-cover rounded-full transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                src={`${userget?.foto?.data}`}
                alt={`${userget?.foto?.nombre}`}
              />
            ) : (
              <img 
                className="w-full h-full object-cover rounded-full transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                src="/logo.webp"
                alt="Default user avatar"
               />
            )}
            <div className="w-full h-full bg-[--card] rounded-full absolute top-0 left-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-70">
              <img src="/subir-archivo.svg" alt="icono de subir archivo" />
            </div>
          </button>
          <div className="p-4 ">
            {typeof userget?.name === "string" ? (
              <p className="text-5xl">{userget.name}</p>
            ) : (
              <p className="text-5xl">No valid name available</p>
            )}
          </div>
        </div>
        <div className="my-4 ">
          <h2 className="text-2xl ">Datos generales</h2>
          <UserAboutme />
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center">
            <div className="mode rounded-lg shadow-lg max-w-lg w-full p-6 relative z-50">
              <h2 className="text-2xl font-bold text-center pb-3">
                Change the picture?
              </h2>
              <div>
                <h4 className="text-xl"></h4>
                <div className=" flex justify-center">
                  <form onSubmit={handleUpdate} className="space-y-3">
                    <div className="my-2">
                      <input
                        type="file"
                        id="foto"
                        {...register("foto")}
                        className="flex h-10 w-full rounded-md border border-input bg-[--card] px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        type="submit"
                      >
                        Update
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={closeModal}
                      >
                        Close Modal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
