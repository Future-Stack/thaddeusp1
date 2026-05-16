import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { settingsService, AdminSettings, UserSettings } from "@/services/settings.service";
import { toast } from "sonner";

export const useGetAdminSettings = () => {
  return useQuery({
    queryKey: ["admin-settings"],
    queryFn: () => settingsService.getAdminSettings(),
  });
};

export const useUpdateAdminSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<AdminSettings>) => settingsService.updateAdminSettings(data),
    onSuccess: (response) => {
      if (response?.data) {
        toast.success("Settings updated successfully");
        queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      } else {
        toast.error(response.message || "Failed to update settings");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const useGetUserSettings = () => {
  return useQuery({
    queryKey: ["user-settings"],
    queryFn: () => settingsService.getUserSettings(),
  });
};

export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserSettings>) => settingsService.updateUserSettings(data),
    onSuccess: (response) => {
      if (response?.data || response?.statusCode === 200) {
        toast.success("Settings updated successfully");
        queryClient.invalidateQueries({ queryKey: ["user-settings"] });
      } else {
        toast.error(response.message || "Failed to update settings");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
