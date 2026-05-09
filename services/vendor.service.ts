import apiClient from "@/lib/api-client";

export interface Region {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Vendor {
  id: string;
  name: string;
  address: string;
  phone: string;
  voucherValue: string | null;
  regionId: string;
  createdAt: string;
  updatedAt: string;
  region: Region;
}

export interface CreateVendorDto {
  name: string;
  address: string;
  phone: string;
  voucherValue: number;
  regionId: string;
}

export interface UpdateVendorDto extends Partial<CreateVendorDto> {}

export interface VendorResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: Vendor[];
}

export const vendorService = {
  getAll: async (): Promise<Vendor[]> => {
    const response = await apiClient.get<VendorResponse>('/vendors');
    return response.data.data;
  },

  getById: async (id: string): Promise<Vendor> => {
    const response = await apiClient.get<{ data: Vendor }>(`/vendors/${id}`);
    return response.data.data;
  },

  create: async (data: CreateVendorDto): Promise<Vendor> => {
    const response = await apiClient.post<{ data: Vendor }>('/vendors', data);
    return response.data.data;
  },

  update: async (id: string, data: UpdateVendorDto): Promise<Vendor> => {
    const response = await apiClient.patch<{ data: Vendor }>(`/vendors/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/vendors/${id}`);
  },
};
