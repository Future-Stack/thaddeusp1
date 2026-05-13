import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "@/services/review.service";

export const useGetReviews = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["reviews", page, limit],
    queryFn: () => reviewService.getAllReviews(page, limit),
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { text: string }) => reviewService.createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};
