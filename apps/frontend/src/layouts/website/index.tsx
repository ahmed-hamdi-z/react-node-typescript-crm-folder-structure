// Dependencies
import React, { FC, lazy } from "react";

// Types
import { RouteObject } from "@/interfaces/global/routes-object-interfaces";

// React Router
import { Routes, Route } from "react-router-dom";

// Hooks
import useRoute from "@/hooks/global/useRoute";

// Routes
import websiteRoutes from "@/routes/website";

// Layout
import WebsiteLayout from "./Layout";

import { appRoutes } from "@/config/routes-config";
import { RegisterCard } from "@/components/dashboard/Auth/regiser-card";

const Website: FC = () => {
  const { validateRoutes } = useRoute();
  const routes = validateRoutes(websiteRoutes, ["global"]);

  return (
    <Routes>
      <Route path={appRoutes.home} element={<WebsiteLayout />}>
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

export default Website;