import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TOGGLES_KEY } from "@/config/toggle-config";
import { TogglesState } from "@/interfaces/dashboard/toggles-interface";

const useToggleMenu = () => {
    const queryClient = useQueryClient();

    return useMutation<TogglesState, Error, "horizontal" | "vertical" | "collapsible-vertical">({
        mutationFn: async (menu) => {
            const currentToggles: TogglesState = 
                queryClient.getQueryData([TOGGLES_KEY]) || {};

            const updatedToggles = { ...currentToggles, menu, sidebar: false };
            localStorage.setItem(TOGGLES_KEY, JSON.stringify(updatedToggles));

            return updatedToggles;
        },
        onSuccess: (updatedToggles) => {
            queryClient.setQueryData([TOGGLES_KEY], updatedToggles);
        },
    });
};

export default useToggleMenu;
