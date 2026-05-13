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

  getAllUsers: async (page: number = 1, limit: number = 20, searchTerm: string = '', sortBy: string = 'createdAt', sortOrder: string = 'desc') => {
    const response = await apiClient.get('/admin/users', {
      params: {
        page,
        limit,
        searchTerm,
        sortBy,
        sortOrder,
      },
    });
    return response.data;
  },

  getUserStats: async () => {
    const response = await apiClient.get('/user/admin/stats');
    return response.data;
  },
};
