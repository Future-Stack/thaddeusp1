import apiClient from "@/lib/api-client";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: {
    success: boolean;
    message: string;
    data?: any;
  };
}

export const contactService = {
  submitContactForm: async (payload: ContactPayload): Promise<ContactResponse> => {
    const response = await apiClient.post<ContactResponse>('/contact', payload);
    return response.data;
  },
};
