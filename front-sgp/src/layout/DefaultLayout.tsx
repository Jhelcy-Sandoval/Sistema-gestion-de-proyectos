import Sidebar from "./Sidebar";

interface DefaultLayoutProps {
  children: React.ReactNode
}

export default function DefaultLayout ({children}: DefaultLayoutProps){
  return (
    <>
      <Sidebar />
      <main>
        { children }
      </main>
    </>
  )
}