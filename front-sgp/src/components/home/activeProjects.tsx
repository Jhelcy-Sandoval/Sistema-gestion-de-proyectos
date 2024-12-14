import { useNavigate } from "react-router-dom";
import useProject from "../../hooks/projectsHook"

export default function ActiveProjects (){
  const {getProject} = useProject(false, false);
  const navigate = useNavigate(); 

  return (
    <>
      <div className="bg-white border border-slate-200 p-4 rounded-xl text-sm">
        <h1 className="text-lg p-2 text-gray-600 font-bold">Proyectos activos</h1>
        <div className="grid grid-cols-4 gap-4">
          {getProject && getProject.length > 0 ? (
            getProject
            .filter((project) => project.promedio < 100)
            .map((project, index) => (
              <div key={index} className="cursor-pointer" onClick={() => navigate('/projects')}>
                <div className="w-24">
                  <img src="../../../public/carpeta.svg" alt="" />
                </div>
                  <p className="text-gray-600 font-bold">{project.nombre}</p>
              </div>
            ))
          ):(
            <p>cargando...</p>
          )}
        </div>
      </div>
    </>
  )
}