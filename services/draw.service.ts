import apiClient from "@/lib/api-client";

export const drawService = {
  getAllDraws: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get('/draws', {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },

  getWinners: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get('/draws/winners', {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },
};
