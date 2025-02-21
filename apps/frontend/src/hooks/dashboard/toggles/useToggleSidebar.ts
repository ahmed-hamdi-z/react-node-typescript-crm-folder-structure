import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TogglesState } from "@/interfaces/dashboard/toggles-interface";

const TOGGLES_KEY = "toggles";

const useToggleSidebar = () => {
    const queryClient = useQueryClient();

    return useMutation<TogglesState, Error, void>({
        mutationFn: async () => {
            // Get current state
            const currentToggles: TogglesState =
                (queryClient.getQueryData([TOGGLES_KEY]) as TogglesState) || {};

            // Toggle sidebar state
            const updatedToggles = { ...currentToggles, sidebar: !currentToggles.sidebar };
            localStorage.setItem(TOGGLES_KEY, JSON.stringify(updatedToggles));

            return updatedToggles;
        },

        onSuccess: (updatedToggles) => {
            queryClient.setQueryData([TOGGLES_KEY], updatedToggles);
        },
    });
};

export default useToggleSidebar;
