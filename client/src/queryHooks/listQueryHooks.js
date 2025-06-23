import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteListById, getCurrentUserLists } from "../managers/listManager";

export const useCurrentUserLists = () => {
    return useQuery({
        queryKey: ["currentUserLists"],
        queryFn: () => getCurrentUserLists(),
    })
}

export const useDeleteListById = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteListById,
        onSuccess: () => {
            queryClient.invalidateQueries(["currentUserLists"]);
        }
    })
}