import apiClient from "@/lib/api-client";

export interface RevenueEvent {
  eventId: string;
  eventName: string;
  ticketsSold: number;
  poolTotal: number;
  voucherCost: number;
}

export interface RevenueMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RevenueResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: {
    data: RevenueEvent[];
    meta: RevenueMeta;
  };
}

export interface RevenueStats {
  totalTickets: number;
  grossRevenue: number;
  totalPrizeCost: number;
  netProfit: number;
}

export interface RevenueStatsResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: RevenueStats;
}

export const revenueService = {
  getEvents: async (page = 1, limit = 10): Promise<RevenueResponse> => {
    const response = await apiClient.get('/revenue/events', {
      params: { page, limit }
    });
    return response.data;
  },

  getStats: async (): Promise<RevenueStatsResponse> => {
    const response = await apiClient.get('/revenue/stats');
    return response.data;
  }
};
