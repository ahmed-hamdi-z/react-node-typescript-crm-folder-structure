import { TogglesState } from '@/interfaces/dashboard/toggles-interface';

export const initialTogglesState: TogglesState = {
  theme: (localStorage.getItem('theme') as "light" | "dark" | "system") || 'light',
  menu: (localStorage.getItem('menu') as "horizontal" | "vertical" | "collapsible-vertical") || 'vertical',
  layout: (localStorage.getItem('layout') as "full" | "boxed-layout") || 'full',
  rtlClass: (localStorage.getItem('rtlClass') as "ltr" | "rtl") || 'ltr',
  animation: localStorage.getItem('animation') || '',
  navbar: (localStorage.getItem('navbar') as "navbar-sticky" | "navbar-floating" | "navbar-static") || 'navbar-sticky',
  locale: localStorage.getItem('i18nextLng') || 'en',
  isDarkMode: false,
  sidebar: localStorage.getItem('sidebar') === 'true' || false,
  semidark: localStorage.getItem('semidark') === 'true' || false,
  languageList: [
    { code: 'zh', name: 'Chinese' },
    { code: 'da', name: 'Danish' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'es', name: 'Spanish' },
    { code: 'sv', name: 'Swedish' },
    { code: 'tr', name: 'Turkish' },
  ],
  mainLayout: '',
  pageTitle: ''
};