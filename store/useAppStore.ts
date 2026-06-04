import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AppState {
  user: any | null;
  userId: string | null;
  role: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: any | null) => void;
  setUserId: (userId: string | null) => void;
  setRole: (role: string | null) => void;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      userId: null,
      role: null,
      accessToken: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setUserId: (userId) => set({ userId }),
      setRole: (role) => set({ role }),
      setTokens: (tokens) =>
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        }),
      isLoading: true,
      setIsLoading: (isLoading) => set({ isLoading }),
      logout: () =>
        set({
          user: null,
          userId: null,
          role: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : {
          getItem: () => null,
          setItem: () => { },
          removeItem: () => { },
        } as any
      ),
      onRehydrateStorage: () => (state) => {
        state?.setIsLoading(false);
      },
    },
  ),
);
