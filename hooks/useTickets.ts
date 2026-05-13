import { useQuery } from "@tanstack/react-query";
import { ticketService } from "@/services/ticket.service";

export const useMyTickets = () => {
  return useQuery({
    queryKey: ["my-tickets"],
    queryFn: () => ticketService.getMyTickets(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMyTicketsByEvent = (eventId?: string) => {
  return useQuery({
    queryKey: ["my-tickets", eventId],
    queryFn: () => ticketService.getMyTickets(eventId),
    staleTime: 5 * 60 * 1000,
    enabled: !!eventId,
  });
};
