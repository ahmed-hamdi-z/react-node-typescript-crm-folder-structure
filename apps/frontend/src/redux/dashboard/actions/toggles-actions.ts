import { PayloadAction } from "@reduxjs/toolkit";
import { TogglesState } from "@/interfaces/dashboard/toggles-interface";
import i18next from "i18next";

// Toggle theme
export const toggleTheme = (state: TogglesState, action: PayloadAction<string |"light" | "dark" | "system" | undefined>) => {
    const payload = action.payload || state.theme;
    localStorage.setItem('theme', payload);
    state.theme = payload;

    // Update isDarkMode based on the selected theme
    if (payload === 'light') {
        state.isDarkMode = false;
    } else if (payload === 'dark') {
        state.isDarkMode = true;
    } else if (payload === 'system') {
        state.isDarkMode = window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
    }

    // Update the DOM
    if (state.isDarkMode) {
        document.querySelector('body')?.classList.add('dark');
    } else {
        document.querySelector('body')?.classList.remove('dark');
    }
};

// Toggle menu
export const toggleMenu = (state: TogglesState, action: PayloadAction<string | "horizontal" | "vertical" | "collapsible-vertical" | undefined>) => {
    const payload = action.payload || state.menu;
    state.sidebar = false; // Reset sidebar state when menu changes
    localStorage.setItem('menu', payload);
    state.menu = payload;
};

// Toggle layout
export const toggleLayout = (state: TogglesState, action: PayloadAction<string | "full" | "boxed-layout" | undefined>) => {
    const payload = action.payload || state.layout;
    localStorage.setItem('layout', payload);
    state.layout = payload;
};

// Toggle RTL
export const toggleRTL = (state: TogglesState, action: PayloadAction<string | "ltr" | "rtl" | undefined>) => {
    const payload = action.payload || state.rtlClass;
    localStorage.setItem('rtlClass', payload);
    state.rtlClass = payload;
    document.querySelector('html')?.setAttribute('dir', payload || 'ltr');
};

// Toggle animation
export const toggleAnimation = (state: TogglesState, action: PayloadAction<string | undefined>) => {
    let payload = action.payload || state.animation; // animate__fadeIn, animate__fadeInDown, etc.
    payload = payload?.trim();
    localStorage.setItem('animation', payload);
    state.animation = payload;
};

// Toggle navbar
export const toggleNavbar = (state: TogglesState, action: PayloadAction<string | "navbar-sticky" | "navbar-floating" | "navbar-static" | undefined>) => {
    const payload = action.payload || state.navbar;
    localStorage.setItem('navbar', payload);
    state.navbar = payload;
};

// Toggle semidark
export const toggleSemidark = (state: TogglesState, action: PayloadAction<boolean | string | undefined>) => {
    const payload = action.payload === true || action.payload === 'true' ? true : false;
    localStorage.setItem('semidark', payload.toString());
    state.semidark = payload;
};

// Toggle locale
export const toggleLocale = (state: TogglesState, action: PayloadAction<string | undefined>) => {
    const payload = action.payload || state.locale;

    // Update i18next language
    i18next.changeLanguage(payload).then(() => {
        console.log(`Language changed to ${payload}`);
    }).catch((err) => {
        console.error("Failed to change language:", err);
    });

    // Update state
    state.locale = payload;
    localStorage.setItem('i18nextLng', payload); // Persist the selected language
};

// Toggle sidebar
export const toggleSidebar = (state: TogglesState) => {
    state.sidebar = !state.sidebar;
};

// Set page title
export const setPageTitle = (state: TogglesState, action: PayloadAction<string>) => {
    document.title = `${action.payload}`;
};