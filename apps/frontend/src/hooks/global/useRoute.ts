// Types
import { RouteObject } from "@/interfaces/global/routes-object-interfaces";

const useRoute = () => {

  // This function used to create a valid route object.
  const createRoute = (route: RouteObject): RouteObject => route;

  // This function used to create array of routes
  const createRoutes = (routes: RouteObject[]): RouteObject[] => routes;

  // This function to check if user have access to this route.
  const validateRoute = (route: RouteObject, roles: string[]): boolean => {
    return !route.role || roles.includes(route.role);
  };

  // This function to check if user have access to this routes.
  const validateRoutes = (routes: RouteObject[], roles: string[]): RouteObject[] => {
    return routes.filter(route => validateRoute(route, roles));
  };

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