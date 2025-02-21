// Dependencies
// import { lazy } from "react";

// Types
import { RouteObject } from "@/interfaces/global/routes-object-interfaces";

// Pages
import Home from "@/pages/dashboard/home";

const dashboardRoutes: RouteObject[] = [
  {
    path: "",
    layout: "dashboard",
    role: "global",
    category: "",
    key: "",
    element: Home
  },
  
]

export default dashboardRoutes;