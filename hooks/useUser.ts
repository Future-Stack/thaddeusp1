import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => userService.updateProfile(formData),
    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: ["me"] });
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const useGetUsers = (
  page: number = 1,
  limit: number = 20,
  searchTerm: string = '',
  sortBy: string = 'createdAt',
  sortOrder: string = 'desc'
) => {
  return useQuery({
    queryKey: ["users", page, limit, searchTerm, sortBy, sortOrder],
    queryFn: () => userService.getAllUsers(),
  });
};

export const useGetUsersStats = () => {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: () => userService.getUserStats(),
  });
};

export const useGetMeStats = () => {
  return useQuery({
    queryKey: ["me-stats"],
    queryFn: () => userService.getMeStats(),
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'active' | 'suspended' }) =>
      userService.updateUserStatus(id, status),
    onSuccess: (response) => {
      if (response?.statusCode === 200 || response?.success || response?.data?.success) {
        toast.success(response.message || "User status updated successfully");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error(response.message || "Failed to update status");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
