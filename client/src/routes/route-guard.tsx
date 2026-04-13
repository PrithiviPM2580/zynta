import React from "react";
import { Outlet } from "react-router-dom";

interface RouteGuardProps {
  requireAuth?: boolean;
}

const RouteGuard = ({ requireAuth }: RouteGuardProps) => {
  console.log("RouteGuard: requireAuth =", requireAuth);
  return <Outlet />;
};

export default RouteGuard;
