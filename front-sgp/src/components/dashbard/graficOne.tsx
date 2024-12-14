import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useProject from '../../hooks/projectsHook';

export default function GraphicOne() {
  const { getProject } = useProject(false, false);

  const sortedProjects = getProject.slice().sort((a, b) => {
    const dateA = new Date(a.fechaCreacion).getTime();
    const dateB = new Date(b.fechaCreacion).getTime();
    return dateB - dateA;
  });

  const data = sortedProjects
    ? sortedProjects.map((project) => ({
        nombre: project.nombre,
        uv: project.promedio,
        pv: 100, 
      }))
    : [];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nombre" label={{ value: "Nombre del Proyecto", position: "insideBottomRight", offset: -5 }} />
        <YAxis label={{ value: "Promedio", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
