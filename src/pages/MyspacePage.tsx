import TaskList from "../components/myspace/TaskList";
import ProjectCards from "../components/myspace/ProjectCards";
import Calendar from "../components/myspace/Calendar";
import Activity from "../components/myspace/Activity";
import Workload from "../components/myspace/Workload";
import Productivity from "../components/myspace/Productivity";
import useUserData from "../hooks/userHooks";
import useTask from "../hooks/taskHook";

export default function MySpace() {
  const { userID, userget } = useUserData(false, false);
  const { mytasks } = useTask(false, false);

  const myTasks = mytasks.filter((task) => {
    if (!task.assignedTo) return false;

    if (typeof task.assignedTo === "string") {
      return task.assignedTo === userID;
    }

    return task.assignedTo._id === userID;
  });

  const completedTasks = myTasks.filter(
    (task) => task.status === "done"
  );

  const pendingTasks = myTasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks = myTasks.filter(
    (task) =>
      task.status === "in_progress" ||
      task.status === "review"
  );

  console.log("mis tareas", myTasks)
  console.log("todas las tareas", mytasks)
  console.log("mi id", userID)

  return (
    <section className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            My Space
          </h1>

          <p className="text-gray-400 mt-2">
            Bienvenido nuevamente,
            <span className="font-semibold text-white">
              {" "}
              {userget?.name}
            </span>
          </p>
        </div>

        <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
          + Nueva tarea
        </button>
      </div>

      {/* Resumen */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">

        <div className="mode rounded-xl p-5 border-t-4 border-blue-500">
          <h2 className="text-gray-400">
            Mis tareas
          </h2>

          <p className="text-3xl font-bold mt-3">
            {myTasks.length}
          </p>
        </div>

        <div className="mode rounded-xl p-5 border-t-4 border-green-500">
          <h2 className="text-gray-400">
            Completadas
          </h2>

          <p className="text-3xl font-bold mt-3">
            {completedTasks.length}
          </p>
        </div>

        <div className="mode rounded-xl p-5 border-t-4 border-red-500">
          <h2 className="text-gray-400">
            Pendientes
          </h2>

          <p className="text-3xl font-bold mt-3">
            {pendingTasks.length}
          </p>
        </div>

        <div className="mode rounded-xl p-5 border-t-4 border-yellow-500">
          <h2 className="text-gray-400">
            En progreso
          </h2>

          <p className="text-3xl font-bold mt-3">
            {inProgressTasks.length}
          </p>
        </div>

      </div>

      <div className="grid xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 mode rounded-xl p-4">
          <TaskList mytasks={myTasks}/>
        </div>

        <div className="mode rounded-xl p-4">
          <Calendar mytasks={myTasks}/>
        </div>

      </div>

      <div className="grid xl:grid-cols-2 gap-6">

        <div className="mode rounded-xl p-4">
          <ProjectCards />
        </div>

        <div className="mode rounded-xl p-4">
          <Workload mytasks={myTasks}/>
        </div>

      </div>

      <div className="grid xl:grid-cols-2 gap-6">

        <div className="mode rounded-xl p-4">
          <Productivity />
        </div>

        <div className="mode rounded-xl p-4">
          <Activity />
        </div>

      </div>

    </section>
  );
}