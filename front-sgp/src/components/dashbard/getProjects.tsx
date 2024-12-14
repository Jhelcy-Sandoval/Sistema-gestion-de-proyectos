import useProject from "../../hooks/projectsHook"

export default function GetProjects (){
  const {getProject} = useProject(false, false);

  return(
    <>
      <div className="bg-white p-2 my-2 rounded-xl flex justify-between border hover:border-sky-500">
        <table className="w-full">
          <thead>
            <tr>
              <th className="font-bold text-gray-500 text-xl text-wrap truncate">Proyecto</th>
              <th className="font-bold text-gray-500 text-xl text-wrap truncate">Tareas</th>
              <th className="font-bold text-gray-500 text-xl text-wrap truncate">Avance</th>
              <th className="font-bold text-gray-500 text-xl text-wrap truncate">Pendientes</th>
              <th className="font-bold text-gray-500 text-xl text-wrap truncate">En progreso</th>              
              <th className="font-bold text-gray-500 text-xl text-wrap truncate">Completos</th>
            </tr>
          </thead>
          {getProject && getProject.map((project, index) => (
            <tbody key={index}>
              <tr>
                <td className="font-bold text-gray-500 text-xl text-wrap truncate p-2">{project.nombre}</td>
                <td className="font-bold text-gray-500 text-xl text-wrap truncate p-2 text-center">{project.taks || 0}</td>
                <td className="p-2">
                  <div className="bg-gray-400 rounded-full mx-auto w-28 h-4" >
                    <div className="bg-blue-800 rounded-full h-4 text-center px-1" style={{ width: `${project.promedio}%` }}>{project.promedio}%</div>
                  </div>
                </td>
                <td className="font-bold text-gray-500 text-xl text-wrap truncate p-2 text-center">{project.pendientes || 0}</td>
                <td className="font-bold text-gray-500 text-xl text-wrap truncate p-2 text-center">{project.enprogreso || 0}</td>
                <td className="font-bold text-gray-500 text-xl text-wrap truncate p-2 text-center">{project.completada || 0}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  )
}