import apiClient from "@/lib/api-client";

export const reviewService = {
  getAllReviews: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get('/reviews', {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },

  createReview: async (data: { text: string }) => {
    const response = await apiClient.post('/reviews', data);
    return response.data;
  },
};
