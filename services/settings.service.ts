import apiClient from "@/lib/api-client";

export interface AdminSettings {
  id: string;
  maintenanceMode: boolean;
  automatedDraws: boolean;
  drawDay: string | null;
  drawTime: string | null;
  maxTicketPerUser: number;
  minTicketForDraw: number;
  emailWinners: boolean;
  emailAllParticipants: boolean;
  smsWinnerNotifications: boolean;
  adminDrawAlerts: boolean;
  lowParticipationAlert: boolean;
  lowParticipationThreshold: number;
  marketingEmailsToUsers: boolean;
  drawReminders: boolean;
  autoSendVouchers: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  id: string;
  userId: string;
  drawReminder: boolean;
  winnerAnnouncement: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
  voucherExpiryAlert: boolean;
  showOnWinnersList: boolean;
  createdAt: string;
  updatedAt: string;
}

export const settingsService = {
  getAdminSettings: async () => {
    const response = await apiClient.get('/settings/admin');
    return response.data;
  },

  updateAdminSettings: async (data: Partial<AdminSettings>) => {
    const response = await apiClient.patch('/settings/admin', data);
    return response.data;
  },

  getUserSettings: async () => {
    const response = await apiClient.get('/settings/user');
    return response.data;
  },

  updateUserSettings: async (data: Partial<UserSettings>) => {
    const response = await apiClient.patch('/settings/user', data);
    return response.data;
  },
};
