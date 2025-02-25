import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TOGGLES_KEY } from "@/config/toggle-config";
import { TogglesState } from "@/interfaces/dashboard/toggles-interface";

const useToggleAnimation = () => {
    const queryClient = useQueryClient();

    return useMutation<TogglesState, Error, string>({
        mutationFn: async (animation) => {
            const currentToggles: TogglesState = 
                queryClient.getQueryData([TOGGLES_KEY]) || {};

            const updatedToggles = { ...currentToggles, animation: animation.trim() };
            localStorage.setItem(TOGGLES_KEY, JSON.stringify(updatedToggles));

            return updatedToggles;
        },
        onSuccess: (updatedToggles) => {
            queryClient.setQueryData([TOGGLES_KEY], updatedToggles);
        },
    });
};

export default useToggleAnimation;
