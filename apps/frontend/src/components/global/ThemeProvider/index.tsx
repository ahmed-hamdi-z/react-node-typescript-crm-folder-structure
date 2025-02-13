import React from 'react';

import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import { 
    toggleThemeAction,
    toggleMenuAction,
    toggleLayoutAction, 
    toggleRTLAction,
    toggleAnimationAction,
    toggleNavbarAction,
    toggleSemidarkAction,
    toggleLocaleAction,
} from '@/redux/dashboard/slicers/toggles-slicers';

import { store } from '@/redux/store';

function ThemeProvider({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: RootState) => state.dashboard.toggles);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleThemeAction(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenuAction(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayoutAction(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTLAction(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimationAction(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbarAction(localStorage.getItem('navbar') || themeConfig.navbar));
        // dispatch(toggleLocaleAction(localStorage.getItem('i18nextLng') || themeConfig.locale));
        dispatch(toggleSemidarkAction(localStorage.getItem('semidark') || themeConfig.semidark));
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar,  themeConfig.semidark]);

    return (
        <div
            className={`${(store.getState().dashboard.toggles.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section antialiased relative font-nunito text-sm font-normal`}
        >
            {children}
        </div>
    );
} 

export default ThemeProvider;
