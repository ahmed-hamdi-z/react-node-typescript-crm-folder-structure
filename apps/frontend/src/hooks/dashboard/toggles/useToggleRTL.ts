import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TOGGLES_KEY } from "@/config";
import { TogglesState } from "@/interfaces/dashboard/toggles-interface";

const useToggleRTL = () => {
    const queryClient = useQueryClient();

    return useMutation<TogglesState, Error, "ltr" | "rtl">({
        mutationFn: async (rtlClass) => {
            const currentToggles: TogglesState = 
                queryClient.getQueryData([TOGGLES_KEY]) || {};

            const updatedToggles = { ...currentToggles, rtlClass };
            localStorage.setItem(TOGGLES_KEY, JSON.stringify(updatedToggles));
            document.documentElement.setAttribute("dir", rtlClass);

            return updatedToggles;
        },
        onSuccess: (updatedToggles) => {
            queryClient.setQueryData([TOGGLES_KEY], updatedToggles);
        },
    });
};

export default useToggleRTL;
