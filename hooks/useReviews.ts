import { useQuery } from "@tanstack/react-query";
import { reviewService } from "@/services/review.service";

export const useGetReviews = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["reviews", page, limit],
    queryFn: () => reviewService.getAllReviews(page, limit),
  });
};
