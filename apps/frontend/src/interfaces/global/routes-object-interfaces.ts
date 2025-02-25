
export interface RouteObject {
  path: string;
  element: React.ComponentType;
  layout?: string;
  role?: string;
  category?: string;
  key?: number;
  children?: RouteObject[];
}