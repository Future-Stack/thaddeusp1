import apiClient from "@/lib/api-client";

export interface SignUpPayload {
  fullName: string;
  email: string;
  password?: string;
  regionId?: string;
}

export interface SignUpResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: {
    success: boolean;
    message: string;
    data: {
      id: string;
      fullName: string;
      email: string;
      role: string;
      regionId: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface LoginResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: {
    success: boolean;
    result: {
      message: string;
      tokens: {
        accessToken: string;
        refreshToken: string;
      };
    };
  };
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface RefreshPayload {
  userId: string;
  refreshToken: string;
}

export interface RefreshResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: {
    success: boolean;
    message: string;
    data: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface GetMeResponse {
  statusCode: number;
  path: string;
  timestamp: string;
  data: {
    success: boolean;
    user: {
      id: string;
      fullName: string;
      email: string;
      phone: string;
      role: string;
      regionId: string;
      profileImg: string;
      streetAddress: string;
      city: string;
      state: string;
      zip: number;
      isVerified: boolean;
      status: string;
      isDeleted: boolean;
      lastLoggedin: string;
      createdAt: string;
      updatedAt: string;
      region: {
        id: string;
        name: string;
      };
    };
  };
}

export interface GoogleLoginPayload {
  email: string;
  name: string;
  profileImg: string;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
  },

  googleLogin: async (payload: GoogleLoginPayload): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/google-login', payload);
    return response.data;
  },

  refreshToken: async (payload: RefreshPayload): Promise<RefreshResponse> => {
    const response = await apiClient.post('/auth/refresh-token', payload);
    return response.data;
  },

  getMe: async (): Promise<GetMeResponse> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  signUp: async (payload: SignUpPayload): Promise<SignUpResponse> => {
    const response = await apiClient.post('/auth/sign-up', payload);
    return response.data;
  },
};
