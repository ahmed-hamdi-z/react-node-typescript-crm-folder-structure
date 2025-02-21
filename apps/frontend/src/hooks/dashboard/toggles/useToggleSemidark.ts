import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TogglesState } from "@/interfaces/dashboard/toggles-interface";

const TOGGLES_KEY = "toggles";

const useToggleSemidark = () => {
    const queryClient = useQueryClient();

    return useMutation<
        TogglesState, // Mutation return type
        Error, // Error type
        boolean | string | undefined // Mutation function argument type
    >({
        mutationFn: async (semidark) => {
            const currentToggles: TogglesState =
                (queryClient.getQueryData([TOGGLES_KEY]) as TogglesState) || {};

            // Ensure semidark is a boolean
            const isSemidark = semidark === true || semidark === "true";

            // Update local storage
            const updatedToggles = { ...currentToggles, semidark: isSemidark };
            localStorage.setItem(TOGGLES_KEY, JSON.stringify(updatedToggles));

            return updatedToggles;
        },

        onSuccess: (updatedToggles) => {
            queryClient.setQueryData([TOGGLES_KEY], updatedToggles);
        },
    });
};

export default useToggleSemidark;
