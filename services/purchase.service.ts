import apiClient from "@/lib/api-client";

export interface BuyTicketDto {
  eventId: string;
  quantity: number;
}

export interface BuyTicketResponseData {
  url: string;
  [key: string]: any;
}

export interface BuyTicketResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: BuyTicketResponseData;
  message?: string;
}

export const purchaseService = {
  buyTickets: async (data: BuyTicketDto): Promise<BuyTicketResponse> => {
    const response = await apiClient.post('/purchase/buy', data);
    return response.data;
  },
};
