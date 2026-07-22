import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import { Spinner } from "@heroui/react";
import type { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner className="text-blue-500" size="xl" />;
  }
  if (!user) {
    return <Navigate to={"/auth/login"} state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoute;
