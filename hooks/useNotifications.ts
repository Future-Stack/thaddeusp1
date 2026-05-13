import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/notification.service";
import { toast } from "sonner";

export const useGetMyNotifications = (page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ["notifications", "my", page, limit],
    queryFn: () => notificationService.getMyNotifications(page, limit),
    // Refresh every minute to keep unread count updated
    refetchInterval: 60000,
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: (response) => {
      if (response?.success || response?.data?.success) {
        queryClient.invalidateQueries({ queryKey: ["notifications", "my"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to mark all as read");
    },
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: (response) => {
      if (response?.success || response?.data?.success) {
        queryClient.invalidateQueries({ queryKey: ["notifications", "my"] });
      }
    },
  });
};
