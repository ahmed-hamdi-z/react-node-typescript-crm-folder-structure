interface Language {
    code: string;
    name: string;
}

interface TogglesState {
    theme?:  "light" | "dark" | "system";
    menu?: "horizontal" | "vertical" | "collapsible-vertical";
    layout?: "full" | "boxed-layout";
    rtlClass?:string | "ltr" | "rtl";
    animation?: string;
    navbar?: "navbar-sticky" | "navbar-floating" | "navbar-static";
    semidark?: boolean;
    locale?: string;
    isDarkMode?: boolean;
    sidebar?: boolean;
    languageList?: { code: string; name: string }[];
}


interface ToggleButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon?: React.ReactNode;
  }

export { Language, TogglesState, ToggleButtonProps };

