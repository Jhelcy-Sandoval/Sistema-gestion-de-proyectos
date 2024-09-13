import DefaultLayout from "../layout/DefaultLayout";
import '../App.css'
import useUserData from "../hooks/userHooks";
import UserAboutme from "../components/user";


export default function UserP () {
  const { userget } = useUserData();
  
  return (
    <>
      <DefaultLayout>
        <section className="m-4">
          <div className="flex p-3 bg-gradient-to-r from-blue-900 to-cyan-500 items-center">
            <div className="w-1/6 ">
              <img className="rounded-full" src="../../public/logo.webp" alt="foto user" />
            </div>
            <div className="p-4 ">
              {typeof userget?.userName === 'string' ? (
                <p className="text-5xl">{userget.userName}</p>
              ) : (
                <p className="text-5xl">No valid username available</p>
              )}
            </div>
          </div>
          <div className="my-4 ">
            <h2 className="text-2xl ">Datos generales</h2>
            <UserAboutme/>
          </div>
        </section>
      </DefaultLayout>
    </>
  )
}