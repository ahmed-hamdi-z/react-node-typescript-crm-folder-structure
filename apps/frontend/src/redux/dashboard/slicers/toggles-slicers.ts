import { createSlice } from "@reduxjs/toolkit";
import { initialTogglesState } from "../states/initial-state-toggles";
import {
    toggleTheme,
    toggleMenu,
    toggleLayout,
    toggleRTL,
    toggleAnimation,
    toggleNavbar,
    toggleSemidark,
    toggleLocale,
    toggleSidebar,
    setPageTitle,
} from "../actions/toggles-actions";

// Define the slice
const togglesConfigSlice = createSlice({
    name: 'toggles',
    initialState: initialTogglesState,
    reducers: {
        toggleTheme,
        toggleMenu,
        toggleLayout,
        toggleRTL,
        toggleAnimation,
        toggleNavbar,
        toggleSemidark,
        toggleLocale,
        toggleSidebar,
        setPageTitle,
    },
});

// Export actions
export const {
    toggleTheme: toggleThemeAction,
    toggleMenu: toggleMenuAction,
    toggleLayout: toggleLayoutAction,
    toggleRTL: toggleRTLAction,
    toggleAnimation: toggleAnimationAction,
    toggleNavbar: toggleNavbarAction,
    toggleSemidark: toggleSemidarkAction,
    toggleLocale: toggleLocaleAction,
    toggleSidebar: toggleSidebarAction,
    setPageTitle: setPageTitleAction,
} = togglesConfigSlice.actions;

// Export reducer
export default togglesConfigSlice.reducer;