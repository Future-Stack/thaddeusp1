import axios from "axios";
import { useAppStore } from "@/store/useAppStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ১. রিকোয়েস্ট ইন্টারсеপ্টর (টোকেন যুক্ত করা)
apiClient.interceptors.request.use(
  (config) => {
    const token = useAppStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ২. রেসপন্স ইন্টারсеপ্টর (টোকেন এক্সপায়ার ও রিফ্রেশ হ্যান্ডেলিং)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // টোকেন এক্সpায়ার হলে সার্ভার যদি 401 দেয়
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // অনন্ত লুপ (Infinite Loop) বন্ধ করার ফ্ল্যাগ

      const { refreshToken, setTokens, logout } = useAppStore.getState();

      if (refreshToken) {
        try {
          console.log("Attempting to refresh token...");

          // রিফ্রেশ টোকেন এপিআই কল
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
            { refreshToken },
          );

          // আপনার নতুন রেসপন্স ফরম্যাট অনুযায়ী ডেটা রিড করা:
          // response.data -> { data: { success: true, data: { accessToken, refreshToken } } }
          const tokenData = response.data?.data?.data;

          if (tokenData && tokenData.accessToken) {
            console.log("Token refreshed successfully!");

            // Zustand স্টোরে নতুন টোকেনগুলো সেভ করা
            setTokens({
              accessToken: tokenData.accessToken,
              refreshToken: tokenData.refreshToken || refreshToken,
            });

            // আটকে যাওয়া রিকোয়েস্টের হেডার নতুন এক্সেস টোকেন দিয়ে আপডেট করা
            originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;

            // রিকোয়েস্টটি পুনরায় পাঠানো
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          console.error("Refresh token API failed:", refreshError);
        }
      }

      // যদি রিফ্রেশ টোকেন না থাকে অথবা রিফ্রেশ প্রসেস ফেইল করে
      console.log("Session expired or invalid. Logging out...");
      logout();

      if (typeof window !== "undefined") {
        window.location.replace("/login");
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
