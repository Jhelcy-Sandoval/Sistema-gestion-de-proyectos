import TaskList from "../components/myspace/TaskList";
import ProjectCards from "../components/myspace/ProjectCards";
import Calendar from "../components/myspace/Calendar";
import Activity from "../components/myspace/Activity";
import Workload from "../components/myspace/Workload";
import Productivity from "../components/myspace/Productivity";
import useUserData from "../hooks/userHooks";
import useTask from "../hooks/taskHook";

export default function MySpace() {
  const { userget } = useUserData(false, false);
  const { mytasks } = useTask(false, false, undefined, userget);

  const completedTasks = mytasks.filter((task) => task.status === "done");

  const pendingTasks = mytasks.filter((task) => task.status === "todo");

  const inProgressTasks = mytasks.filter(
    (task) => task.status === "in_progress" || task.status === "review",
  );

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">My Space</h1>

          <p className="text-gray-400 mt-2">
            Bienvenido nuevamente,
            <span className="font-semibold text-white"> {userget?.name}</span>
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        <div className="mode rounded-xl p-5 border-t-4 border-[--info]">
          {userget?.role === "developer" ? (
            <h2 className="text-gray-400">Mis tareas</h2>
          ) : (
            <h2 className="text-gray-400">Tareas de mi equipo</h2>
          )}

          <p className="text-3xl font-bold mt-3">{mytasks.length}</p>
        </div>

        <div className="mode rounded-xl p-5 border-t-4 border-[--success]">
          <h2 className="text-gray-400">Completadas</h2>

          <p className="text-3xl font-bold mt-3">{completedTasks.length}</p>
        </div>

        <div className="mode rounded-xl p-5 border-t-4 border-[--danger]">
          <h2 className="text-gray-400">Pendientes</h2>

          <p className="text-3xl font-bold mt-3">{pendingTasks.length}</p>
        </div>

        <div className="mode rounded-xl p-5 border-t-4 border-[--warning]">
          <h2 className="text-gray-400">En progreso</h2>

          <p className="text-3xl font-bold mt-3">{inProgressTasks.length}</p>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 mode rounded-xl p-4">
          <TaskList mytasks={mytasks} role={userget?.role}/>
        </div>

        <div className="mode rounded-xl p-4">
          <Calendar mytasks={mytasks} role={userget?.role}/>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="mode rounded-xl p-4">
          <ProjectCards role={userget?.role}/>
        </div>

        <div className="mode rounded-xl p-4">
          <Workload mytasks={mytasks} role={userget?.role}/>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="mode rounded-xl p-4">
          <Productivity role={userget?.role}/>
        </div>

        <div className="mode rounded-xl p-4">
          <Activity role={userget?.role}/>
        </div>
      </div>
    </section>
  );
}
