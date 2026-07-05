import "../App.css";
import useUserData from "../hooks/userHooks";
import ActiveProjects from "../components/home/activeProjects";
import Grafica from "../components/home/grafica";
import TaskList from "../components/home/taskList";
import GraficoDos from "../components/home/graficoDos";

export default function Home() {
  const { userget } = useUserData(false, false);

  return (
    <section className="m-4">
      <div className="content p-4 m-4 rounded-lg mode border-t-4">
        <div className="flex my-4 justify-between box-border">
          <h1 className="text-2xl">Home</h1>
          {/* <button 
              className="rounded-md bg-[--primary] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 py-2"
              aria-label="Crear nuevo proyecto"
            >
              Tutorial
            </button> */}
        </div>
        <div className="mb-2">
          {typeof userget?.name === "string" ? (
            <div>
              <h1 className="text-lg font-bold">Hola, {userget.name}</h1>
              <p className="font-light">
                Esto es lo que está ocurriendo en tu espacio de trabajo
              </p>
            </div>
          ) : (
            <h1>Bienvenido</h1>
          )}
        </div>
        <div className="bg-[--card] border border-slate-200 p-2 rounded-xl text-sm">
          <div className="border p-2 rounded-lg bg-slate-200 space-y-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <ActiveProjects />
              <Grafica />
            </div>
            <GraficoDos />
            <TaskList />
          </div>
        </div>
      </div>
    </section>
  );
}
