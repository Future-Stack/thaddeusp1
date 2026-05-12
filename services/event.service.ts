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
  prizeValue: number;
  maxTickets: number;
  isAutoDraw: boolean;
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

  delete: async (id: string) => {
    const response = await apiClient.delete(`/events/${id}`);
    return response.data;
  }
};
