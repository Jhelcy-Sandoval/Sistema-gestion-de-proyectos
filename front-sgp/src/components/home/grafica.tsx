import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { Task } from '../../types/types';
import { getTask } from '../../services/taskService';
import { useEffect, useState } from 'react';
import useUserData from '../../hooks/userHooks';

export default function Grafica() {
  const { isLogin } = useAuth();
  const [getTasks, setTasks] = useState<Task[]>([]);
  const { userID } = useUserData(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(isLogin);
        setTasks(response);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTask();
  }, [isLogin, setTasks]);

  // Filtrar tareas de prioridad alta
  const taskAlta = getTasks.filter((task) => task.Prioridad === 'alta' && task.userID === userID);

  // Preparar datos para la gráfica
  const data = taskAlta
    ?.filter((task) => task.Título && task.Progreso !== undefined) // Filtrar datos válidos
    .map((task, index) => ({
      name: `${task.Título}-${index}`, // Generar claves únicas
      uv: 100,
      progreso: task.Progreso,
      amt: 100,
    }));

  return (
    <>
      <div className="bg-white border border-slate-200 p-4 rounded-xl text-sm">
        <p className="text-lg p-2 text-gray-600 font-bold text-center">Gráfica alta prioridad</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="progreso" fill="#8884d8" background={{ fill: '#eee' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
