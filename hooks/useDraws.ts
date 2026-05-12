import { useQuery } from "@tanstack/react-query";
import { drawService } from "@/services/draw.service";

export const useGetDraws = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["draws", page, limit],
    queryFn: () => drawService.getAllDraws(page, limit),
  });
};

export const useGetWinners = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["winners", page, limit],
    queryFn: () => drawService.getWinners(page, limit),
  });
};
