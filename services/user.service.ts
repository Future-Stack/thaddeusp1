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

  getAllUsers: async (page: number = 1, limit: number = 10, searchTerm: string = '') => {
    const response = await apiClient.get('/user/admin/list', {
      params: {
        page,
        limit,
        searchTerm,
      },
    });
    return response.data;
  },

  getUserStats: async () => {
    const response = await apiClient.get('/user/admin/stats');
    return response.data;
  },
};
