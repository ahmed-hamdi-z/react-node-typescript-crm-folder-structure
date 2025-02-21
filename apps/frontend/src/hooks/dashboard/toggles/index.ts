import { useQuery } from "@tanstack/react-query";
import { TogglesState } from "@/interfaces/dashboard/toggles-interface";
import { TOGGLES_KEY, togglesConfig } from "@/config";
import useToggleTheme from "./useToggleTheme";
import useToggleMenu from "./useToggleMenu";
import useToggleLayout from "./useToggleLayout";
import useToggleRTL from "./useToggleRTL";
import useToggleAnimation from "./useToggleAnimation";
import useToggleLocale from "./useToggleLocale";
import useSetPageTitle from "./useSetPageTitle";
import useToggleNavbar from "./useToggleNavbar";
import useToggleSidebar from "./useToggleSidebar";
import useToggleSemidark from "./useToggleSemidark";

const getStoredToggles = (): TogglesState => {
  const stored = localStorage.getItem(TOGGLES_KEY);
  return stored ? JSON.parse(stored) : togglesConfig();
};

export const useToggles = () => {
  const { data: toggles = togglesConfig() } = useQuery({
    queryKey: [TOGGLES_KEY],
    queryFn: getStoredToggles,
    staleTime: Infinity,
  });

  return {
    toggles,
    toggleTheme: useToggleTheme(),
    toggleMenu: useToggleMenu(),
    toggleLayout: useToggleLayout(),
    toggleRTL: useToggleRTL(),
    toggleAnimation: useToggleAnimation(),
    toggleLocale: useToggleLocale(),
    toggleSidebar: useToggleSidebar(),
    setPageTitle: useSetPageTitle(),
    toggleNavbar: useToggleNavbar(),
    toggleSemidark: useToggleSemidark(),
  };
};
