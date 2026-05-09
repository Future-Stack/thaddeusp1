import apiClient from "@/lib/api-client";

export const userService = {
  updateProfile: async (formData: FormData) => {
    const response = await apiClient.patch('/user/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
