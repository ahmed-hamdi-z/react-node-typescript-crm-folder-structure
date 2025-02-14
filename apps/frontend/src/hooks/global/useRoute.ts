// Types
import { RouteObject } from "@/interfaces/global/routes-object-interfaces";

const useRoute = () => {

  // This function used to create a valid route object.
  const createRoute = (route: RouteObject): RouteObject => route;

  // This function used to create array of routes
  const createRoutes = (routes: RouteObject[]): RouteObject[] => routes;

  // This function to check if user have access to this route.
  const validateRoute = (route: RouteObject, roles: string[], returned: "object" | "boolean" = "boolean"): boolean | RouteObject | null => {
    if (returned === "boolean") {
      return roles.includes(route.role);
    } else if (returned === "object") {
      return roles.includes(route.role) ? route : null;
    }
    return null;
  };
 
  // This function to check if user have access to this routes.
  const validateRoutes = (routes: RouteObject[], roles: string[]): RouteObject[] => {
    const resultArray: RouteObject[] = [];
    routes.forEach((route: RouteObject) => validateRoute(route, roles) && resultArray.push(route));
    return resultArray;
  }

  // This function used to avoid repeat layout condition.
  const layoutChecker = (layout: string, path: string): string => layout === "website" ? `/${path}` : `${layout}/${path}`;

  return {
    createRoute,
    createRoutes,
    validateRoute,
    validateRoutes,
    layoutChecker
  };
}

export default useRoute;