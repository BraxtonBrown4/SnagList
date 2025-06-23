import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteListById, getCurrentUserLists, getListById } from "../managers/listManager";

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

export const useGetListById = (listId) => {
    return useQuery({
        queryKey: ["list", listId],
        queryFn: () => getListById(listId),
        enabled: !!listId,
    })
}