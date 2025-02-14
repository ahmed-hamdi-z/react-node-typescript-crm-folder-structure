// Dependencies
import { lazy } from "react";

// Types
import { RouteObject } from "@/interfaces/global/routes-object-interfaces";


// Pages
import Home from "@/pages/website/home";

// const Welcome = lazy(() => import("@/pages/website/Welcome"));

const websiteRoutes: RouteObject[] = [
  {
    path: "",
    layout: "website",
    role: "global",
    category: "",
    key: "",
    element: Home
  }
]

export default websiteRoutes;