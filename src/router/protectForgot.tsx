import { Navigate, Outlet } from "react-router-dom";

interface ProtectForgotProps {
  token: string | null;
}

export default function ProtectForgot({ token }: ProtectForgotProps) {
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
