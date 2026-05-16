"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import * as z from 'zod';
import { useForgotPassword } from '@/hooks/useAuth';
import AnimationWrapper from '@/components/AnimationWrapper';

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
    const router = useRouter();
    const { mutate: forgotPassword, isPending } = useForgotPassword();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = (data: ForgotPasswordValues) => {
        forgotPassword(data, {
            onSuccess: (res) => {
                if (res.data.success) {
                    router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
            {/* Scattered Decorative Dots - Following Image Pattern */}
            {/* Large Orange Dot Left */}
            <div className="absolute top-[20%] left-[5%] w-3 h-3 bg-[#FF9D41] rounded-full opacity-50 shadow-[0_0_10px_#FF9D4133]" />
            {/* Small Yellow Dot Far Left */}
            <div className="absolute top-[35%] left-[2%] w-1.5 h-1.5 bg-[#FFD45E] rounded-full opacity-30" />
            {/* Medium Orange Dot Center Left */}
            <div className="absolute top-[30%] left-[25%] w-4 h-4 bg-[#FF7A30] rounded-full opacity-60 shadow-[0_0_15px_#FF7A3044]" />

            {/* Dots Bottom Left */}
            <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-[#FFD45E] rounded-full opacity-40" />
            <div className="absolute bottom-[40%] left-[12%] w-2.5 h-2.5 bg-[#FF9D41] rounded-full opacity-30" />

            {/* Dots Far Right */}
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

            <AnimationWrapper animationType="fadeUp" className="w-full max-w-md relative z-10">
                <div className="bg-white p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/20 backdrop-blur-xl">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
                            Forgot Password?
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Enter your email to receive a reset OTP
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2.5 ml-1">
                                Email Address
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="john@example.com"
                                className={`w-full px-6 py-4 bg-[#F8F9FA] border ${errors.email ? 'border-red-500' : 'border-[#EEEEEE]'} rounded-xl focus:outline-none focus:border-primary/30 transition-all text-gray-700 placeholder:text-gray-400`}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex items-center gap-4">
                            <Link href="/login"
                                className="w-1/3 py-4 text-center bg-white text-black font-black text-lg rounded-xl border border-black hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex-1 py-4 bg-primary text-white font-black text-lg rounded-xl shadow-[0_10px_25px_-5px_#EA730766] hover:bg-primary2 hover:shadow-[0_15px_30px_-5px_#EA730788] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send OTP'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </AnimationWrapper>
        </div>
    );
};

export default ForgotPasswordPage;
