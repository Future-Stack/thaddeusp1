import apiClient from "@/lib/api-client";

export interface DashboardStatsData {
  totalTicketsSold: number;
  totalRevenue: number;
  totalEvents: number;
  activeEvents: number;
  completedEvents: number;
  totalUniqueParticipants: number;
  totalUniqueWinners: number;
  totalUsers: number;
  totalPrizeCost: number;
  netProfit: number;
  revenueToday: number;
  ticketsSoldToday: number;
  averageTicketsPerUser: string;
}

export interface DashboardStatsResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: {
    success: boolean;
    data: DashboardStatsData;
  };
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStatsResponse> => {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  }
};
