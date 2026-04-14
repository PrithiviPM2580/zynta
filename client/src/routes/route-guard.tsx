import { useAuth } from "@/hooks/use-auth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RouteGuardProps {
  requireAuth?: boolean;
}

const RouteGuard = ({ requireAuth }: RouteGuardProps) => {
  const { user } = useAuth();

  if (requireAuth && !user) return <Navigate to="/" replace />;

  if (!requireAuth && user) return <Navigate to="/chat" replace />;

  return <Outlet />;
};

export default RouteGuard;
