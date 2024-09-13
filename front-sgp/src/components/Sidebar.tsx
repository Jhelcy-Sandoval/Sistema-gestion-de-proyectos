import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserData from "../hooks/userHooks";

export default function Sidebar (){
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const { userget } = useUserData();
  const navigate = useNavigate();
  
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/home') setActiveButton('home');
    else if (path === '/dashboard') setActiveButton('dashboard');
    else if (path === '/proyects') setActiveButton('proyects');
    else if (path === '/files') setActiveButton('files');
    else if (path === '/settings') setActiveButton('settings');
    else if (path === '/user') setActiveButton('user');
  }, [location.pathname]);

  const handleButtonClick = (page: string, buttonName: string): void  => {
    setActiveButton(buttonName);
    navigate(page);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col sidebar p-4">
        <section className="flex flex-col border-b border-b-gray-400 ">
          <div className=" flex w-full my-2 ">
            <div className="">
              <button 
                className={`p-2 w-full colorFondo text-left  hover:rounded-lg focus:rounded-lg flex flex-grow ${activeButton === 'user' ? 'outline outline-offset-2 outline-1 rounded-lg' : ''}`}
                onClick={() => handleButtonClick('/user', 'user')}>
                  <div className="columns-1	lg:columns-2">
                    <div className="w-3/4	py-auto">
                      <img src="../../public/logo.webp" alt="" />
                    </div>
                    {typeof userget?.userName === 'string' ? (
                      <p>{userget.userName}</p>
                    ) : (
                      <p>username </p>
                    )}
                  </div>
              </button>
            </div>
          </div>
          <nav className=" w-full flex flex-col justify-end mb-2">
            <button 
              className={`p-2 w-full colorFondo text-left my-2 hover:rounded-lg focus:rounded-lg ${activeButton === 'home' ? 'outline outline-offset-2 outline-1 rounded-lg' : ''}`}
              onClick={() => handleButtonClick('/home', 'home')}>
              Home
            </button>
            <button 
              className={`p-2 w-full colorFondo text-left my-2 hover:rounded-lg focus:rounded-lg ${activeButton === 'dashboard' ? 'outline outline-offset-2 outline-1 rounded-lg' : ''}`}
              onClick={() => handleButtonClick('/dashboard', 'dashboard')}
            >
              Dashboard
            </button>
          </nav>
        </section>
        <section className="flex-grow my-2">
          <nav className=" w-full flex flex-col justify-end">
            <button 
              className={`p-2 w-full colorFondo text-left my-2 hover:rounded-lg focus:rounded-lg ${activeButton === 'proyects' ? 'outline outline-offset-2 outline-1 rounded-lg' : ''}`}
              onClick={() => handleButtonClick('/proyects', 'proyects')}>
              Proyects
            </button>
            <button 
              className={`p-2 w-full colorFondo text-left my-2 hover:rounded-lg focus:rounded-lg ${activeButton === 'files' ? 'outline outline-offset-2 outline-1 rounded-lg' : ''}`}
              onClick={() => handleButtonClick('/files', 'files')}>
              Files
            </button>
          </nav>
        </section>
        <section className=" flex-grow content-end">
          <nav className="w-full">
            <button 
              className={`p-2 w-full colorFondo text-left my-2 hover:rounded-lg focus:rounded-lg ${activeButton === 'settings' ? 'outline outline-offset-2 outline-1 rounded-lg' : ''}`}
              onClick={() => handleButtonClick('/settings', 'settings')}>
              Settings
            </button>
          </nav>
        </section>
      </div>
    </>
  )
}  