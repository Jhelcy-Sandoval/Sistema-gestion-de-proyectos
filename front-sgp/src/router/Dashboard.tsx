import DateProject from "../components/dashbard/dateProject";
import EstadoDash from "../components/dashbard/estadosDash";
import GetProjects from "../components/dashbard/getProjects";
import GraphicOne from "../components/dashbard/graficOne";
import DefaultLayout from "../layout/DefaultLayout";

export default function Dashboard () {

  return (
    <>
      <DefaultLayout>
        <section className="m-4">
          <div className="content p-4 m-4 rounded-lg mode border-t-4">
            <div className="flex my-4 justify-between box-border">
              <h1 className="text-2xl">Dashboard</h1>
            </div>
            <div className="bg-white border border-slate-200 p-2 rounded-xl text-sm">
              <div className="border p-2 rounded-lg bg-slate-200">
                <div>
                  <GetProjects/>
                </div>
                <div>
                  <EstadoDash/>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white p-2 rounded-xl border hover:border-sky-500 col-span-2">
                    <div>
                      <h1 className="text-gray-600 font-bold	text-center">Grafica general</h1>
                    </div>
                    <div>
                      <GraphicOne/>
                    </div>
                  </div>  
                  <div className="bg-white p-2 rounded-xl border hover:border-sky-500">
                    <DateProject/>
                  </div>   
                </div>
              </div>
            </div>
          </div>
        </section>
      </DefaultLayout>
    </>
  )
}