import apiClient from "@/lib/api-client";

export interface Ticket {
  id: string;
  ticketNumber: string;
  status: string;
  purchaseDate: string;
  eventId: string;
  userId: string;
  event?: {
    id: string;
    name: string;
    drawDate: string;
    ticketClose: string;
    status?: string; // e.g. 'UPCOMING' | 'COMPLETED'
  };
}

export interface MyTicketsResponse {
  statusCode: number;
  message?: string;
  data: {
    data: Ticket[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export const ticketService = {
  getMyTickets: async (eventId?: string): Promise<MyTicketsResponse> => {
    const params = eventId ? { eventId } : {};
    const response = await apiClient.get('/tickets/my-tickets', { params });
    return response.data;
  },
};
