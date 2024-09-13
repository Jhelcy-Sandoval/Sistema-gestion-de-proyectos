import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "../pages/SignupPage";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import Home from "../pages/HomePage";
import Signin from "../pages/LoginPage";
import Proyects from "../pages/ProyectsPage";
import Files from "../pages/FilesPage";
import Settings from "../pages/SettingsPage";
import UserP from "../pages/UserPage";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/proyects",
        element: <Proyects/>
      },
      {
        path: "/files",
        element: <Files/>
      },
      {
        path: "/settings",
        element: <Settings/>
      },
      {
        path: "/user",
        element: <UserP/>
      }
    ],
  },
]);

export default function AppRoute (){
  return(
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}
