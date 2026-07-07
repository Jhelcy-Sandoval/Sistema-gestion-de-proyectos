import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserData from "../hooks/userHooks";

export default function Sidebar() {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const { userget } = useUserData(true, false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/home") setActiveButton("home");
    else if (path === "/my-space") setActiveButton("my-space");
    else if (path === "/projects") setActiveButton("projects");
    else if (path === "/files") setActiveButton("files");
    else if (path === "/user") setActiveButton("user");
  }, [location.pathname]);

  const handleButtonClick = (page: string, buttonName: string): void => {
    setActiveButton(buttonName);
    navigate(page);
  };

  const handleExit = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="w-full flex flex-col p-4 h-full">
        <section className="flex flex-col border-b border-b-gray-400">
          <div className="w-full my-2">
            <button
              className={`p-2 w-full colorFondo text-left hover:rounded-lg focus:rounded-lg flex space-x-2 ${activeButton === "user" ? "outline outline-offset-2 outline-1 rounded-lg" : ""} `}
              onClick={() => handleButtonClick("/user", "user")}
            >
              <div>
                <div className="flex items-center justify-center content-center overflow-hidden relative group aspect-square rounded-full w-12">
                  {userget?.foto?.data ? ( 
                    <img
                      src={`${userget?.foto?.data}`}
                      alt="User profile"
                      className="object-cover rounded-full"
                    />
                    ) : (
                      <img src="/logo.webp" alt="default user image" className="object-cover rounded-full" />
                    )}
                </div>
              </div>
              <div className="flex items-center">
                {typeof userget?.name === "string" ? (
                  <p className="text-wrap truncate text-center">{userget.name}</p>
                ) : (
                  <p>Name</p>
                )}
              </div>
            </button>
          </div>
          <nav className=" w-full flex flex-col justify-end mb-2">
            <button
              className={`p-2 w-full colorFondo text-left my-2 hover:rounded-lg focus:rounded-lg ${activeButton === "home" ? "outline outline-offset-2 outline-1 rounded-lg" : ""}`}
              onClick={() => handleButtonClick("/home", "home")}
            >
              Home
            </button>
            <button
              className={`p-2 w-full colorFondo text-left my-2 hover:rounded-lg focus:rounded-lg ${activeButton === "my-space" ? "outline outline-offset-2 outline-1 rounded-lg" : ""}`}
              onClick={() => handleButtonClick("/my-space", "my-space")}
            >
              My space
            </button>
          </nav>
        </section>
        <section className="flex-grow my-2">
          <nav className=" w-full flex flex-col justify-end">
            <button
              className={`p-2 w-full colorFondo text-left my-2 hover:rounded-lg focus:rounded-lg ${activeButton === "projects" ? "outline outline-offset-2 outline-1 rounded-lg" : ""}`}
              onClick={() => handleButtonClick("/projects", "projects")}
            >
              Projects
            </button>
            <button
              className={`p-2 w-full colorFondo text-left my-2 hover:rounded-lg focus:rounded-lg ${activeButton === "files" ? "outline outline-offset-2 outline-1 rounded-lg" : ""}`}
              onClick={() => handleButtonClick("/files", "files")}
            >
              Files
            </button>
          </nav>
        </section>
        <section className=" flex-grow content-end">
          <nav className="w-full">
            <button
              className={`p-2 w-full colorFondo text-left my-2 hover:rounded-lg focus:rounded-lg grid grid-cols-2 gap-1 ${activeButton === "settings" ? "outline outline-offset-2 outline-1 rounded-lg" : ""}`}
              onClick={handleExit}
            >
              <img
                className="w-10"
                src="/cerrar-sesion.svg"
                alt="cerrar sesion"
              />
              Log out
            </button>
          </nav>
        </section>
      </div>
    </>
  );
}
