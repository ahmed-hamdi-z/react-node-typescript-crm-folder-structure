interface Language {
    code: string;
    name: string;
}

interface TogglesConfig {
    theme: "light" | "dark" | "system";
    menu: "horizontal" | "vertical" | "collapsible-vertical";
    layout: "full" | "boxed-layout";
    rtlClass: "ltr" | "rtl";
    animation: string;
    navbar: "navbar-sticky" | "navbar-floating" | "navbar-static";
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