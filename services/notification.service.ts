import apiClient from "@/lib/api-client";

export interface Notification {
  id: string;
  userId: string;
  type: 'SYSTEM' | 'WIN' | 'VOUCHER' | 'PROMO';
  title: string;
  message: string;
  isRead: boolean;
  metadata: any;
  createdAt: string;
}

export interface NotificationResponse {
  data: {
    data: Notification[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      unreadCount: number;
    };
  };
}

export const notificationService = {
  getMyNotifications: async (page: number = 1, limit: number = 20): Promise<NotificationResponse> => {
    const response = await apiClient.get('/notifications/my', {
      params: { page, limit }
    });
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await apiClient.patch('/notifications/my/read-all');
    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await apiClient.patch(`/notifications/my/${id}/read`);
    return response.data;
  },
};
