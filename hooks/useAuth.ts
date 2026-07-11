import { useMutation, useQuery } from "@tanstack/react-query";
import {
  authService,
  LoginPayload,
  SignUpPayload,
} from "@/services/auth.service";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { signOut } from "next-auth/react";

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: SignUpPayload) => authService.signUp(payload),
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success(
          response.data.message || "Registration successful! Please log in.",
        );
        router.push("/login");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Something went wrong during registration";
      toast.error(message);
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const setTokens = useAppStore((state) => state.setTokens);
  const setUserId = useAppStore((state) => state.setUserId);
  const setUser = useAppStore((state) => state.setUser);
  const setRole = useAppStore((state) => state.setRole);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (response) => {
      if (response.data.success) {
        const { tokens } = response.data.result;
        setTokens(tokens);

        // Decode token to get userId (sub)
        try {
          const decoded: any = jwtDecode(tokens.accessToken);
          if (decoded.sub) {
            setUserId(decoded.sub);
          }
        } catch (e) {
          console.error("Failed to decode token:", e);
        }

        toast.success(response.data.result.message || "Login successful");

        // Fetch user profile after login
        authService.getMe().then((profileResponse) => {
          if (profileResponse.data.success) {
            setUser(profileResponse.data.user);
            setRole(profileResponse.data.user.role);
          }
        });

        router.push("/"); // Redirect to home or dashboard
      } else {
        toast.error("Login failed");
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Invalid credentials";
      toast.error(message);
    },
  });
};

export const useGoogleLogin = () => {
  const router = useRouter();
  const setTokens = useAppStore((state) => state.setTokens);
  const setUserId = useAppStore((state) => state.setUserId);
  const setUser = useAppStore((state) => state.setUser);
  const setRole = useAppStore((state) => state.setRole);

  return useMutation({
    mutationFn: (payload: any) => authService.googleLogin(payload),
    onSuccess: (response) => {
      if (response.data.success) {
        const { tokens } = response.data.result;
        setTokens(tokens);

        try {
          const decoded: any = jwtDecode(tokens.accessToken);
          if (decoded.sub) {
            setUserId(decoded.sub);
          }
        } catch (e) {
          console.error("Failed to decode token:", e);
        }

        toast.success(
          response.data.result.message || "Google login successful",
        );

        authService.getMe().then((profileResponse) => {
          if (profileResponse.data.success) {
            setUser(profileResponse.data.user);
            setRole(profileResponse.data.user.role);
          }
        });

        router.push("/");
      } else {
        toast.error("Google login failed");
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Google login failed";
      toast.error(message);
    },
  });
};

export const useAdminLogin = () => {
  const router = useRouter();
  const setTokens = useAppStore((state) => state.setTokens);
  const setUserId = useAppStore((state) => state.setUserId);
  const setUser = useAppStore((state) => state.setUser);
  const setRole = useAppStore((state) => state.setRole);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: async (response) => {
      if (response.data.success) {
        const { tokens } = response.data.result;

        // 1. Set tokens temporarily to fetch profile
        setTokens(tokens);

        try {
          // 2. Fetch full profile to verify role
          const profileResponse = await authService.getMe();

          if (profileResponse.data.success) {
            const user = profileResponse.data.user;

            if (user.role !== "ADMIN") {
              // 3. If not admin, logout and show error
              setTokens({ accessToken: "", refreshToken: "" }); // Clear tokens
              useAppStore.getState().logout();
              toast.error("Access denied. Admin role required.");
              return;
            }

            // 4. If admin, set full user state and redirect
            setUser(user);
            setRole(user.role);

            const decoded: any = jwtDecode(tokens.accessToken);
            if (decoded.sub) {
              setUserId(decoded.sub);
            }

            toast.success("Admin login successful");
            router.push("/admin");
          } else {
            toast.error("Failed to verify admin profile");
          }
        } catch (e) {
          console.error("Admin verification failed:", e);
          useAppStore.getState().logout();
          toast.error("Verification failed. Please try again.");
        }
      } else {
        toast.error("Login failed");
      }
    },
    onError: (error: { message: string }) => {
      const message = error.message || "Invalid admin credentials";
      toast.error(message);
    },
  });
};

export const useGetMe = () => {
  const setUser = useAppStore((state) => state.setUser);
  const setRole = useAppStore((state) => state.setRole);

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await authService.getMe();
      if (response.data.success) {
        setUser(response.data.user);
        setRole(response.data.user.role);
      }
      return response.data;
    },
    enabled: !!useAppStore.getState().accessToken,
  });
};
export const useLogout = () => {
  const logout = useAppStore((state) => state.logout);

  const handleLogout = async () => {
    // 1. Clear store and intent flags
    logout();
    sessionStorage.clear();

    // 2. Clear NextAuth session (clears cookies) and redirect
    await signOut({ callbackUrl: "/login" });

    toast.success("Logged out successfully");
  };

  return { logout: handleLogout };
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: { oldPassword: string; newPassword: string }) =>
      authService.changePassword(payload),
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success(response.data.message || "Password changed successfully");
      } else {
        toast.error(response.data.message || "Failed to change password");
      }
    },
    onError: (error: { message: string }) => {
      const message = error.message || "Something went wrong";
      toast.error(message);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: { email: string }) =>
      authService.forgotPassword(payload),
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success(
          response.data.message || "OTP sent successfully to your email",
        );
      } else {
        toast.error(response.data.message || "Failed to send OTP");
      }
    },
    onError: (error: { message: string }) => {
      const message = error.message || "Something went wrong";
      toast.error(message);
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: {
      email: string;
      otp: string;
      newPassword: string;
    }) => authService.resetPassword(payload),
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success(
          response.data.message || "Password reset successful! Please log in.",
        );
        router.push("/login");
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    },
    onError: (error: { message: string }) => {
      const message = error.message || "Something went wrong";
      toast.error(message);
    },
  });
};
