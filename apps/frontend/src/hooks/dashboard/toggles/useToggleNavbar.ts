import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TogglesState } from "@/interfaces/dashboard/toggles-interface";

// Storage key for toggles
const TOGGLES_KEY = "toggles";

const useToggleNavbar = () => {
    const queryClient = useQueryClient();

    return useMutation<
        TogglesState, // Mutation return type
        Error, // Error type
        "navbar-sticky" | "navbar-floating" | "navbar-static" // Mutation argument type
    >({
        mutationFn: async (navbar) => {
            // Get current state from cache or fallback to an empty object
            const currentToggles: TogglesState =
                (queryClient.getQueryData([TOGGLES_KEY]) as TogglesState) || {};

            // Update local storage
            const updatedToggles = { ...currentToggles, navbar };
            localStorage.setItem(TOGGLES_KEY, JSON.stringify(updatedToggles));

            return updatedToggles;
        },

        onSuccess: (updatedToggles) => {
            // Update React Query cache
            queryClient.setQueryData([TOGGLES_KEY], updatedToggles);
        },
    });
};

export default useToggleNavbar;
