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
    register: "/auth/register"
  };
  
   const TOGGLES_KEY = "toggles";

   const togglesConfig = () => ({
    theme: "light",
    menu: "vertical",
    layout: "full",
    rtlClass: "ltr",
    animation: "fade",
    navbar: "navbar-static",
    semidark: false,
    locale: "en",
    isDarkMode: false,
    sidebar: true,
    languageList: [
      { code: "en", name: "English" },
      { code: "es", name: "Español" },
    ],
  });

  export { appRoutes, apiRoutes , TOGGLES_KEY, togglesConfig };
  