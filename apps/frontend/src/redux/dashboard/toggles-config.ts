import { TogglesState } from "../../interfaces/dashboard/toggles-interface";

const togglesConfig: TogglesState = {
    locale: 'en', // en, da, de, el, es, fr, hu, it, ja, pl, pt, ru, sv, tr, zh
    theme: 'light', // light, dark, system
    menu: 'vertical', // vertical, collapsible-vertical, horizontal
    layout: 'full', // full, boxed-layout
    rtlClass: 'ltr', // rtl, ltr
    animation: '', // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
    navbar: 'navbar-sticky', // navbar-sticky, navbar-floating, navbar-static
    semidark: false,
    isDarkMode: false,
    languageList: [],
    sidebar: false,
    mainLayout: "",
    pageTitle: ""
};

export default togglesConfig;
