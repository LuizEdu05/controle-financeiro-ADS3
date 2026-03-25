import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingScreen } from "../ui/LoadingScreen";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Carregando sua area segura..." />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
