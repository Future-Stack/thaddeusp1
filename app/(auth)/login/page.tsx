"use client";

import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';
import { useLogin, useGoogleLogin } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useAppStore } from '@/store/useAppStore';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

import { useSession, signIn } from "next-auth/react";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleLoginInitiated, setIsGoogleLoginInitiated] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();
    const accessToken = useAppStore((state) => state.accessToken);

    const { mutate: login, isPending } = useLogin();
    const { mutate: googleLogin, isPending: isGooglePending } = useGoogleLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        login(data);
    };

    useEffect(() => {
        // 1. If user is already fully authenticated (NextAuth + Backend), redirect to home
        if (status === "authenticated" && session?.user && accessToken) {
            router.push('/');
            return;
        }

        // 2. Only trigger backend sync if:
        // - NextAuth status is strictly "authenticated"
        // - We have a "login_intent" flag in sessionStorage (prevents random auto-login)
        // - We don't have a backend accessToken
        const loginIntent = sessionStorage.getItem('google_login_intent');

        if (status === "authenticated" && session?.user && loginIntent && !accessToken) {
            sessionStorage.removeItem('google_login_intent'); // Clear intent immediately
            setIsGoogleLoginInitiated(true);
            googleLogin({
                email: session.user.email || '',
                name: session.user.name || '',
                profileImg: session.user.image || '',
            });
        }
    }, [status, session, googleLogin, accessToken, router]);

    const handleGoogleLogin = () => {
        sessionStorage.setItem('google_login_intent', 'true');
        signIn('google');
    };

    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
            {/* Loading Overlay for Google Login Synchronization */}
            {(isGooglePending || (status === 'loading' && session)) && (
                <div className="absolute inset-0 z-[100] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                        <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
                        <div className="absolute inset-0 blur-xl bg-orange-500/20 animate-pulse"></div>
                    </div>
                    <p className="text-gray-800 font-bold text-lg animate-pulse">
                        Authenticating with Google...
                    </p>
                    <p className="text-gray-500 text-sm">Please wait while we sync your account.</p>
                </div>
            )}
            {/* Scattered Decorative Dots */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Decorative dots with glow effects */}
                <div className="absolute top-[20%] left-[5%] w-3 h-3 bg-[#FF9D41] rounded-full opacity-50 shadow-[0_0_10px_#FF9D4133] animate-pulse" />
                <div className="absolute top-[35%] left-[2%] w-1.5 h-1.5 bg-[#FFD45E] rounded-full opacity-30 animate-pulse" />
                <div className="absolute top-[30%] left-[25%] w-4 h-4 bg-[#FF7A30] rounded-full opacity-60 shadow-[0_0_15px_#FF7A3044] animate-pulse" />
                <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-[#FFD45E] rounded-full opacity-40 animate-pulse" />
                <div className="absolute top-[18%] right-[8%] w-3 h-3 bg-[#FFD45E] rounded-full opacity-40 animate-pulse" />
                <div className="absolute bottom-[25%] right-[2%] w-4 h-4 bg-[#FFB200] rounded-full opacity-60 animate-pulse" />
            </div>

            {/* Main Content */}
            <AnimationWrapper animationType="scaleUp" duration={0.8} className="w-full max-w-120 relative z-10">
                <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-8 md:p-12 border border-orange-50">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">
                            Welcome to Win a Pizza!
                        </h1>

                        {/* Tabs Toggle */}
                        <div className="bg-[#F1F3F6] p-1.5 rounded-full flex items-center justify-between w-full mx-auto mb-8">
                            <Link href="/register" className="flex-1 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-all text-center">
                                Register
                            </Link>
                            <button className="flex-1 py-3 text-sm font-bold bg-white rounded-full shadow-sm text-gray-800 transition-all">
                                Log In
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">
                                Email
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="john@example.com"
                                className={`w-full px-5 py-3 bg-[#F8F9FA] border ${errors.email ? 'border-red-500' : 'border-orange-100'} rounded-xl focus:outline-none focus:border-orange-400 transition-all text-gray-700 placeholder:text-gray-400`}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-2 ml-1">
                                <label className="text-sm font-bold text-gray-800">
                                    Password
                                </label>
                                <Link href="/forgot-password" id="forgot-password" className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    {...register('password')}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    className={`w-full px-5 py-3 bg-[#F8F9FA] border ${errors.password ? 'border-red-500' : 'border-orange-100'} rounded-xl focus:outline-none focus:border-orange-400 transition-all text-gray-700 placeholder:text-gray-400`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1 ml-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full flex items-center justify-center py-3.5 bg-orange-500 text-white font-bold text-lg rounded-xl shadow-[0_10px_25px_-5px_#EA730766] hover:bg-orange-600 hover:shadow-[0_15px_30px_-5px_#EA730788] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    'Log In'
                                )}
                            </button>
                        </div>

                        {/* Separator */}
                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-4 text-gray-400 font-medium tracking-tight">Or continue with</span>
                            </div>
                        </div>

                        {/* Google Login */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isGooglePending}
                            className="w-full py-3.5 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isGooglePending ? (
                                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    <span className="text-gray-700 font-bold">Google</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </AnimationWrapper>
        </div>
    );
};

export default LoginPage;
