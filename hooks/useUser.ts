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

export const useGetUsers = (page: number = 1, limit: number = 10, searchTerm: string = '') => {
  return useQuery({
    queryKey: ["users", page, limit, searchTerm],
    queryFn: () => userService.getAllUsers(page, limit, searchTerm),
  });
};

export const useGetUsersStats = () => {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: () => userService.getUserStats(),
  });
};
