import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { drawService } from "@/services/draw.service";
import { toast } from "sonner";

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

export const useRunDraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { eventId: string; method: "MANUAL" | "AUTO" }) =>
      drawService.runDraw(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["winners"] });
      queryClient.invalidateQueries({ queryKey: ["draws"] });
      queryClient.invalidateQueries({ queryKey: ["event-stats"] });
      toast.success("Draw completed successfully");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to run draw";
      toast.error(message);
    },
  });
};
