// Dependencies
import { RouteObject } from "@/interfaces/global/routes-object-interfaces";

// Pages
import Home from "@/pages/dashboard";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

const dashboardRoutes: RouteObject[] = [
  {
    path: "",
    layout: "dashboard",
    role: "global",
    category: "",
    key: 1,
    element: Home
  },
  {
    path: "register",
    layout: "dashboard",
    role: "global",
    category: "",
    key: 2,
    element: Register
  },
  {
    path: "login",
    layout: "dashboard",
    role: "global",
    category: "",
    key: 2,
    element: Login
  },
]

export default dashboardRoutes;