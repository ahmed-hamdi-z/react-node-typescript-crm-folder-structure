const appRoutes = {
    home: "/",
    dashboard: {
      path:"/dashboard",
    },
    admin: "/admin",
    auth: {
      path: "/auth",
      login: "/auth?ref=login",
      register: "/auth?ref=register",
    },
    createPacakge: "/admin/create-package",
    editPackage: "/admin/edit-package",
  
    createCard: "/admin/create-card",
    editCard: "/admin/edit-card",
  
    profile: "/profile",
  };
  
  const apiRoutes = {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    packages: "/packages",
    cards: "/cards",
    users: {
      path: "/users",
      me: "/users/me",
    },
  };
  
  export { appRoutes, apiRoutes };
  