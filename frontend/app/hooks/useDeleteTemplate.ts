import templateService from "@/services/template.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alert } from "@/lib/alert";

export function useDeleteTemplate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            templateService.delete(id),

        onSuccess: () => {
            alert.success("Template deleted successfully");

            queryClient.invalidateQueries({
                queryKey: ["creator-templates"],
            });
        },

        onError: () => {
            alert.error("Failed to delete template");
        },
    });
}