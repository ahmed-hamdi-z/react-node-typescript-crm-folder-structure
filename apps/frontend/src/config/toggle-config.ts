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

export { TOGGLES_KEY, togglesConfig };  
  