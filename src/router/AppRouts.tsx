import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "../pages/SignupPage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import Home from "../pages/HomePage";
import Signin from "../pages/LoginPage";
import Projects from "../pages/ProjectsPage";
import Files from "../pages/FilesPage";
import UserP from "../pages/UserPage";
import Forgot from "../pages/ForgotPage";
import ProtectForgot from "./protectForgot";
import PasswordReset from "../pages/PasswordReset";
import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Myspace from "../pages/MyspacePage";

export default function AppRoute() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const onData = (newToken: string | null, email: string | undefined) => {
    setToken(newToken);
    setEmail(email);
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Signin />,
    },
    {
      path: "/forgot",
      element: <Forgot onData={onData} />,
    },
    {
      path: "/register",
      element: <Signup />,
    },
    {
      path: "/reset",
      element: <ProtectForgot token={token} />,
      children: [
        {
          path: "password_reset",
          element: <PasswordReset token={token} email={email} />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          element: <DefaultLayout />,
          children: [
            {
              path: "my-space",
              element: <Myspace />,
            },
            {
              path: "home",
              element: <Home />,
            },
            {
              path: "projects",
              element: <Projects />,
            },
            {
              path: "files",
              element: <Files />,
            },
            {
              path: "user",
              element: <UserP />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
