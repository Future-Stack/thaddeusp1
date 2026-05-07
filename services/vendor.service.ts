import apiClient from "@/lib/api-client";

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  // add other fields based on your API
}

export const vendorService = {
  getAll: async (): Promise<Vendor[]> => {
    const response = await apiClient.get('/vendors');
    return response.data;
  },

  getById: async (id: string): Promise<Vendor> => {
    const response = await apiClient.get(`/vendors/${id}`);
    return response.data;
  },

  create: async (data: Partial<Vendor>): Promise<Vendor> => {
    const response = await apiClient.post('/vendors', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Vendor>): Promise<Vendor> => {
    const response = await apiClient.patch(`/vendors/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/vendors/${id}`);
  },
};
