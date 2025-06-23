import { useQuery } from "@tanstack/react-query";
import { getCurrentUserLists } from "../managers/listManager";

export const useCurrentUserListsQuery = () => {
    return useQuery({
        queryKey: ["currentUserLists"],
        queryFn: () => getCurrentUserLists(),
    })
}