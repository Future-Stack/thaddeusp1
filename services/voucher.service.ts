import apiClient from "@/lib/api-client";
import { Event } from "./event.service";
import { Ticket } from "./ticket.service";

export interface Voucher {
  id: string;
  code: string;
  value: string;
  status: "ACTIVE" | "REDEEMED" | "EXPIRED";
  drawId: string;
  ticketId: string;
  userId: string;
  vendorId: string | null;
  expiresAt: string;
  redeemedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  vendor: any | null;
  draw: {
    id: string;
    eventId: string;
    winnerId: string;
    winningTicketId: string;
    method: string;
    totalParticipants: number;
    totalTickets: number;
    drawnAt: string;
    drawnById: string;
    event: Event;
  };
  ticket: Ticket;
}

export interface MyVouchersResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: {
    data: Voucher[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export const voucherService = {
  getMyVouchers: async (page = 1, limit = 10): Promise<MyVouchersResponse> => {
    const response = await apiClient.get('/vouchers/my-vouchers', {
      params: { page, limit },
    });
    return response.data;
  },
};
