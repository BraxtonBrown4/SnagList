import { editUserProfile, getUserProfileById } from "../managers/userProfileManager"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUserProfileById = (id) => {
    return useQuery({
        queryKey: ["profile", id],
        queryFn: () => getUserProfileById(id),
    })
}

export const useEditUserProfile = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editUserProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile", id] });
        }
    })
}