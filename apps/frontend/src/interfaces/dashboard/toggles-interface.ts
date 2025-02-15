interface Language {
    code: string;
    name: string;
}

interface TogglesConfig {
    theme: string | "light" | "dark" | "system";
    menu: string | "horizontal" | "vertical" | "collapsible-vertical";
    layout: string | "full" | "boxed-layout";
    rtlClass: string | "ltr" | "rtl";
    animation: string;
    navbar: string | "navbar-sticky" | "navbar-floating" | "navbar-static";
    semidark: boolean;
    locale: string;
    isDarkMode: boolean;
    sidebar: boolean;
    mainLayout: string;
    pageTitle: string;
}

interface TogglesState extends TogglesConfig {
    isDarkMode: boolean;
    languageList: Language[];
}

interface ToggleButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon?: React.ReactNode;
  }

export { Language, TogglesConfig, TogglesState, ToggleButtonProps };