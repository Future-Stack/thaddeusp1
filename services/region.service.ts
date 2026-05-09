import apiClient from "@/lib/api-client";

export interface Region {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    _count: {
        users: number;
        vendors: number;
        events: number;
    };
}

export interface RegionsResponse {
    statusCode: number;
    path: string;
    timestamp: string;
    data: Region[];
}

export const regionService = {
    getAll: async (): Promise<Region[]> => {
        const response = await apiClient.get<RegionsResponse>('/regions');
        return response.data.data;
    },
};
