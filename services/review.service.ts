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
};
