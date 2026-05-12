import { useQuery } from "@tanstack/react-query";
import { ticketService } from "@/services/ticket.service";

export const useMyTickets = () => {
  return useQuery({
    queryKey: ["my-tickets"],
    queryFn: () => ticketService.getMyTickets(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
