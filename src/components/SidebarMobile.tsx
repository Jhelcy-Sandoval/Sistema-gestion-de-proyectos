import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserData from "../hooks/userHooks";

import {
  FiHome,
  FiBarChart2,
  FiFolder,
  FiUser,
} from "react-icons/fi";
import { GoProjectRoadmap } from "react-icons/go";

export default function SidebarMobile() {
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

  const handleButtonClick = (page: string, buttonName: string) => {
    setActiveButton(buttonName);
    navigate(page);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 bg-[--card-dark] border-t border-slate-700 flex justify-around items-center z-50 shadow-lg">

      <button
        onClick={() => handleButtonClick("/home", "home")}
        className={`${activeButton === "home" ? "text-blue-500" : "text-gray-300"} transition-colors`}
      >
        <FiHome size={26} />
      </button>

      <button
        onClick={() => handleButtonClick("/my-space", "my-space")}
        className={`${activeButton === "dashboard" ? "text-blue-500" : "text-gray-300"} transition-colors`}
      >
        <FiBarChart2 size={26} />
      </button>

      <button
        onClick={() => handleButtonClick("/projects", "projects")}
        className={`${activeButton === "projects" ? "text-blue-500" : "text-gray-300"} transition-colors`}
      >
        <GoProjectRoadmap size={28} />
      </button>

      <button
        onClick={() => handleButtonClick("/files", "files")}
        className={`${activeButton === "files" ? "text-blue-500" : "text-gray-300"} transition-colors`}
      >
        <FiFolder size={26} />
      </button>

      <button
        onClick={() => handleButtonClick("/user", "user")}
        className={`${activeButton === "user" ? "text-blue-500" : "text-gray-300"} transition-colors`}
      >
        {userget?.foto?.data ? (
          <img
            className="w-9 h-9 rounded-full object-cover border-2 border-current"
            src={`${userget.foto.data}`}
            alt="User"
          />
        ) : (
          <FiUser size={26} />
        )}
      </button>

    </nav>
  );
}