"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';
import { useResetPassword } from '@/hooks/useAuth';

const resetPasswordSchema = z.object({
    otp: z.string().min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const VerifyOTPContent = () => {
 
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    
    const [showPassword, setShowPassword] = useState(false);
    const { mutate: resetPassword, isPending } = useResetPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = (data: ResetPasswordValues) => {
        resetPassword({
            email,
            otp: data.otp,
            newPassword: data.newPassword,
        });
    };

    if (!email) {
        return (
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-red-50">
                <p className="text-red-500 font-bold mb-4">Invalid request. No email provided.</p>
                <Link href="/forgot-password"   className="text-primary hover:underline font-bold">
                    Go back to Forgot Password
                </Link>
            </div>
        );
    }

    return (
        <AnimationWrapper animationType="fadeUp" className="w-full max-w-md relative z-10">
            <div className="bg-white p-10 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/20 backdrop-blur-xl">
                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="inline-flex p-4 bg-orange-50 rounded-3xl mb-6">
                        <ShieldCheck className="w-10 h-10 text-orange-500" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
                        Verify OTP
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Enter the code sent to <br />
                        <span className="text-gray-900 font-bold">{email}</span>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* OTP */}
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2.5 ml-1">
                            OTP Code
                        </label>
                        <input
                            {...register('otp')}
                            type="text"
                            maxLength={6}
                            placeholder="123456"
                            className={`w-full px-6 py-4 bg-[#F8F9FA] border ${errors.otp ? 'border-red-500' : 'border-[#EEEEEE]'} rounded-xl focus:outline-none focus:border-primary/30 transition-all text-center text-2xl font-black tracking-[0.5em] text-gray-900 placeholder:text-gray-300`}
                        />
                        {errors.otp && (
                            <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.otp.message}</p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2.5 ml-1">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                {...register('newPassword')}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="********"
                                className={`w-full px-6 py-4 bg-[#F8F9FA] border ${errors.newPassword ? 'border-red-500' : 'border-[#EEEEEE]'} rounded-xl focus:outline-none focus:border-primary/30 transition-all text-gray-700 placeholder:text-gray-400`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.newPassword.message}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2.5 ml-1">
                            Confirm Password
                        </label>
                        <input
                            {...register('confirmPassword')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            className={`w-full px-6 py-4 bg-[#F8F9FA] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#EEEEEE]'} rounded-xl focus:outline-none focus:border-primary/30 transition-all text-gray-700 placeholder:text-gray-400`}
                        />
                        {errors.confirmPassword && (
                            <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-4 bg-primary text-white font-black text-lg rounded-xl shadow-[0_10px_25px_-5px_#EA730766] hover:bg-primary2 hover:shadow-[0_15px_30px_-5px_#EA730788] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Resetting Password...
                                </>
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </div>

                    <div className="text-center">
                        <Link href="/forgot-password" id="resend-otp" className="text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                            Didn't receive code? Resend
                        </Link>
                    </div>
                </form>
            </div>
        </AnimationWrapper>
    );
};

const VerifyOTPPage = () => {
    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

            <Suspense fallback={
                <div className="bg-white p-10 rounded-4xl shadow-lg flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-gray-500 font-bold">Loading...</p>
                </div>
            }>
                <VerifyOTPContent />
            </Suspense>
        </div>
    );
};

export default VerifyOTPPage;
