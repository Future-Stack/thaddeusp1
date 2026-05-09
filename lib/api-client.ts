import axios from 'axios';

import { useAppStore } from '@/store/useAppStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config) => {
    // Get token from Zustand store state directly
    const token = useAppStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const { userId, refreshToken, setTokens, logout } = useAppStore.getState();

      if (userId && refreshToken) {
        try {
          // Use a clean axios call to avoid interceptors loop
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
            userId,
            refreshToken,
          });

          if (response.data.success) {
            const newTokens = response.data.data;
            setTokens(newTokens);

            // Update original request header and retry
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
          logout();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      } else {
        logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(error);
  }
);

export default apiClient;
