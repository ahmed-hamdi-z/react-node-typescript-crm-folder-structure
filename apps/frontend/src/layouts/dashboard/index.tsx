// Dependencies
import React, { FC, lazy } from "react";

// Types
// import { RouteObject } from "@/interfaces/hooks/Route";

// React Router
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./Layout";

// Hooks
// import useRoute from "@/hooks/useRoute";

// Routes
// import dashboardRoutes from "@/routes/dashboard";

// Layout
// const DashboardLayout = lazy(() => import("./Layout"));


const Dashboard: FC = () => {
//   const { validateRoutes } = useRoute();
//   const routes = validateRoutes(dashboardRoutes, ["global"]);

  return (<DashboardLayout />
    // <Routes>
    //   <Route path="/dashboard/" element={<DashboardLayout />}>
    //     {
    //       routes.map((route: RouteObject, key: number) =>
    //         <Route
    //           key={key}
    //           path={route.path}
    //           element={<route.element />}
    //         />
    //       )}
    //   </Route>
    // </Routes>
  )
}

export default Dashboard;