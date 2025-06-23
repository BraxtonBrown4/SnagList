import { useQuery } from "@tanstack/react-query";
import { getAllTags } from "../managers/tagManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTag } from "../managers/tagManager";

export const useGetAllTags = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: () => getAllTags(),
    })
}

export const useCreateTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTag) => createTag(newTag),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
    });
};