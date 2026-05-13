import apiClient from "@/lib/api-client";

export interface CreateEventDto {
  name: string;
  description: string;
  regionId: string;
  drawDate: string;
  ticketOpen: string;
  ticketClose: string;
  ticketPrice: number;
  prizeValue: number;
  maxTickets: number;
  isAutoDraw: boolean;
}

export interface Region {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  regionId: string;
  drawDate: string;
  ticketOpen: string;
  ticketClose: string;
  ticketPrice: number;
  totalParticipants:string;
  prizeValue: number;
  maxTickets: number;
  isAutoDraw: boolean;
  status: "UPCOMING" | "ONGOING" | "CLOSED" | "COMPLETED" | "CANCELLED";
  winner?: string;
  createdAt: string;
  updatedAt: string;
  region: Region;
}

export interface EventsResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: Event[];
}

export interface RunningEventResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: Event;
}

export interface EventStats {
  totalTickets: number;
  poolTotal: number;
  totalParticipants: number;
}

export interface EventStatsResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: EventStats;
}

export interface EventAdminUser {
  userId: string;
  name: string;
  email: string;
  ticketAmount: number;
  totalPaid: number;
  purchasedDate: string;
}

export interface EventAdminUsersResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: {
    data: EventAdminUser[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export const eventService = {
  create: async (data: CreateEventDto) => {
    const response = await apiClient.post('/events', data);
    return response.data;
  },
  
  getAll: async (): Promise<EventsResponse> => {
    const response = await apiClient.get('/events');
    return response.data;
  },

  getRunningEvent: async (): Promise<RunningEventResponse> => {
    const response = await apiClient.get('/events/running');
    return response.data;
  },

  update: async (id: string, data: Partial<CreateEventDto>) => {
    const response = await apiClient.patch(`/events/${id}`, data);
    return response.data;
  },

  getAdminStats: async (id: string): Promise<EventStatsResponse> => {
    const response = await apiClient.get(`/events/${id}/admin/stats`);
    return response.data;
  },

  getAdminUsers: async (id: string, params?: { page?: number; limit?: number; searchTerm?: string }): Promise<EventAdminUsersResponse> => {
    const response = await apiClient.get(`/events/${id}/admin/users`, { params });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/events/${id}`);
    return response.data;
  }
};
