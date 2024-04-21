import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "../Auth/AuthProvider";
import Home from "../pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
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
