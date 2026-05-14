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

  getAllUsers: async () => {
    const response = await apiClient.get('/user/admin/list');
    return response.data;
  },

  getUserStats: async () => {
    const response = await apiClient.get('/user/admin/stats');
    return response.data;
  },

  getMeStats: async () => {
    const response = await apiClient.get('/user/me/stats');
    return response.data;
  },

  updateUserStatus: async (id: string, status: 'active' | 'suspended') => {
    const response = await apiClient.patch(`/user/admin/${id}/status`, { status });
    return response.data;
  },
};
