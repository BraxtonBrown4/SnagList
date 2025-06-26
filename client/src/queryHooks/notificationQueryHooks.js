import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllNotifications, deleteNotification, deleteAllNotifications} from "../managers/notificationManager";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotifications(),
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });
};