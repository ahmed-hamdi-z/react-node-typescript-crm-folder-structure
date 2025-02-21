import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TOGGLES_KEY } from "@/config";
import { TogglesState } from "@/interfaces/dashboard/toggles-interface";
import i18next from "i18next";

const useToggleLocale = () => {
    const queryClient = useQueryClient();

    return useMutation<TogglesState, Error, string>({
        mutationFn: async (locale) => {
            await i18next.changeLanguage(locale);
            const currentToggles: TogglesState = 
                queryClient.getQueryData([TOGGLES_KEY]) || {};

            const updatedToggles = { ...currentToggles, locale };
            localStorage.setItem(TOGGLES_KEY, JSON.stringify(updatedToggles));

            return updatedToggles;
        },
        onSuccess: (updatedToggles) => {
            queryClient.setQueryData([TOGGLES_KEY], updatedToggles);
        },
    });
};

export default useToggleLocale;
