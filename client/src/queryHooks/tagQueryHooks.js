import { useQuery } from "@tanstack/react-query";
import { getAllTags } from "../managers/tagManager";

export const useGetAllTags = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: () => getAllTags(),
    })
}