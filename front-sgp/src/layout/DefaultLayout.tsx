import Sidebar from "../components/Sidebar";

interface DefaultLayoutProps {
  children: React.ReactNode
}

export default function DefaultLayout ({children}: DefaultLayoutProps){
  return (
    <>
      <div className="flex flex-row">
        <section className="boxe basis-1/6 sticky top-0 h-screen max-h-screen overflow-y-auto">
          <Sidebar />
        </section>
        <section className="content basis-full">
          <main>
            { children }
          </main>
        </section>
      </div>
    </>
  )
}