export interface RouteObject {
    path: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element: React.FC<any>;
    layout: "dashboard" | "website",
    role: string;
    category?: string;
    key?: number | string;
  }