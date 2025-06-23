import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, deleteItemById, updateItem } from "../managers/itemManager";

export const useCreateItem = (listId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries(["list", `${listId}`]);
        }
    })
}

export const useDeleteItemById = (listId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteItemById,
        onSuccess: () => {
            queryClient.invalidateQueries(["list", `${listId}`]);
        }
    })
}

export const useUpdateItem = (listId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateItem,
        onSuccess: () => {
            queryClient.invalidateQueries(["list", `${listId}`]);
        }
    })
}