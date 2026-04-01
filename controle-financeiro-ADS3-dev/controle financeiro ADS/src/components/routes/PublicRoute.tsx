import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingScreen } from "../ui/LoadingScreen";

export function PublicRoute({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Preparando autenticacao..." />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
