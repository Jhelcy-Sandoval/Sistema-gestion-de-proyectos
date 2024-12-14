import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import useCategorias from '../../hooks/categoriasHook';

export default function GraficoDos (){
  const { getnumTask} = useCategorias();

  const data = 
    getnumTask ? getnumTask.map((proyecto) =>({ 
      categoria: proyecto.categoria , Tareas: proyecto.numTareas
    })):[];

  return (
    <>
      <div className="bg-white border border-slate-200 p-4 rounded-xl text-sm">
        <p className="text-lg p-2 text-gray-600 font-bold text-center">
         Grafica de tareas por categoria
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Tareas" fill="#8884d8" name="Tareas" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </>
  )
}