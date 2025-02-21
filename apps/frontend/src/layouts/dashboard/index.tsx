// Dependencies
import React, { FC, lazy } from "react";

// Types
import { RouteObject } from "@/interfaces/global/routes-object-interfaces";

// React Router
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./Layout";

// Hooks
import useRoute from "@/hooks/global/useRoute";

Routes
import dashboardRoutes from "@/routes/dashboard";

// Layout
// const DashboardLayout = lazy(() => import("./Layout"));

import { appRoutes } from "@/config";

const Dashboard: FC = () => {
  const { validateRoutes } = useRoute();
  const routes = validateRoutes(dashboardRoutes, ["global"]);

  return (
    <Routes>
      <Route path={appRoutes.dashboard.path} element={<DashboardLayout />}>
        {
          routes.map((route: RouteObject, key: number) =>
            <Route
              key={key}
              path={route.path}
              element={<route.element />}
            />
          )}
      </Route>
     </Routes>
  )
}

export default Dashboard;