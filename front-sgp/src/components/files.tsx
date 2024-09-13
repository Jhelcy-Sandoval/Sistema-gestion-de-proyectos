import { useEffect, useState } from "react";
import { getFiles } from "../services/filesService";
import { useAuth } from "../context/AuthContext";
interface FileData {
  nombre: string;
  data: string;
  tipo: string;
}

export default function FilesFetch(){
  const [files, setFiles] = useState<FileData[]>([]);
  const {isLogin} = useAuth()

  const fetchFiles = async () => {
    try {
      const data = await getFiles(isLogin); 
      setFiles(data); 
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles(); 
  }, []);

  return (
    <>
      <section>
        <div className="content border p-4">
          <h1>List of Files</h1>
          <div className="flex flex-wrap gap-4 justify-center	w-full">
            {files.map((file, index) => (
              <div className="bg-white border border-slate-200 grid grid-cols-4 gap-2 rounded-xl p-2 text-sm"  key={index}>
                <h1 className="text-center text-slate-200 text-xl font-bold col-span-6">{file.nombre}</h1>
                <div className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600 flex justify-center">
                  {file.tipo?.startsWith('image/') ? ( 
                    <div className="bg-slate-100 text-slate-600 aspect-w-16 aspect-h-9">
                      <img className="max-w-full max-h-full object-contain" src={`${file.data}`} alt={file.nombre}/>
                    </div>
                  ) : (
                    <a href={`${file.data}`} download={file.nombre}>
                      <img className="max-w-full max-h-full object-contain" src="../../public/descarga.png" alt="" />                      
                    </a>
                  )}
                </div>
                <button className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
                  🚒
                </button>
                <button className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
                  🦽
                </button>
                <button className="bg-slate-100 stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:text-white focus:stroke-blue-200 focus:bg-blue-400">
                  🚇
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}