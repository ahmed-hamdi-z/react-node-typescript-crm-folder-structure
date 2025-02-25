// Dependencies
import React, { FC, lazy } from "react";

// Types
import { RouteObject } from "@/interfaces/global/routes-object-interfaces";

// React Router
import { Routes, Route } from "react-router-dom";

// Hooks
import useRoute from "@/hooks/global/useRoute";

import dashboardRoutes from "@/routes/dashboard";

// Layout
// const DashboardLayout = lazy(() => import("./Layout"));

import { appRoutes } from "@/config/routes-config";

import Home from "@/pages/dashboard";
import Register from "@/pages/auth/register";
import Login from "@/pages/auth/login";

const Dashboard: FC = () => {
  const { validateRoutes } = useRoute();
  const routes = validateRoutes(dashboardRoutes, ["global"]);

  return (
    <Routes>
      <Route path={appRoutes.dashboard.path} element={<Home />}>
        {routes.map((route: RouteObject) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Route>

      <Route path={appRoutes.auth.login} element={<Login />} />
      <Route path={appRoutes.auth.register} element={<Register />} />
    </Routes>
  );
};

export default Dashboard;
