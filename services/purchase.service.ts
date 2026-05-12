import apiClient from "@/lib/api-client";

export interface BuyTicketDto {
  eventId: string;
  quantity: number;
}

export interface BuyTicketResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: any; // The user didn't provide the exact response data, so using any for now
  message?: string;
}

export const purchaseService = {
  buyTickets: async (data: BuyTicketDto): Promise<BuyTicketResponse> => {
    const response = await apiClient.post('/purchase/buy', data);
    return response.data;
  },
};
