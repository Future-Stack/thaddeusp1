"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimationWrapper from '@/components/AnimationWrapper';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
            {/* Scattered Decorative Dots - Accurate to Image */}
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
            <div className="absolute top-[18%] right-[8%] w-3 h-3 bg-[#FFD45E] rounded-full opacity-40 shadow-[0_0_12px_#FFD45E33]" />
            <div className="absolute top-[32%] right-[15%] w-2.5 h-2.5 bg-[#FF9D41] rounded-full opacity-50" />
            <div className="absolute bottom-[25%] right-[2%] w-4 h-4 bg-[#FFB200] rounded-full opacity-60 shadow-[0_0_20px_#FFB20033]" />
            <div className="absolute bottom-[10%] right-[30%] w-3 h-3 bg-[#FFD45E] rounded-full opacity-40" />

            {/* Grid Pattern Dots (matches bottom right and top left corners) */}
            <div className="absolute top-[-2%] left-[-2%] opacity-[0.03] rotate-12 pointer-events-none">
                <div className="grid grid-cols-6 gap-6">
                    {[...Array(36)].map((_, i) => (
                        <div key={`grid-top-${i}`} className="w-2 h-2 bg-black rounded-full" />
                    ))}
                </div>
            </div>
            
            {/* Main Content */}
            <AnimationWrapper animationType="scaleUp" duration={0.8} className="w-full max-w-[550px] relative z-10">
                <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-8 md:p-12 border border-orange-50">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-[32px] md:text-[38px] font-black text-primary mb-8 tracking-tight">
                            Welcome to Win a Pizza!
                        </h1>

                        {/* Tabs Toggle */}
                        <div className="bg-[#F1F3F6] p-1.5 rounded-full flex items-center justify-between max-w-[400px] mx-auto mb-10">
                            <button className="flex-1 py-3 text-sm font-bold bg-white rounded-full shadow-sm text-gray-800 transition-all">
                                Register
                            </button>
                            <Link href="/login" className="flex-1 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-all text-center">
                                Log In
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2.5 ml-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-6 py-4 bg-[#F8F9FA] border border-[#EEEEEE] rounded-xl focus:outline-none focus:border-primary/30 transition-all text-gray-700 placeholder:text-gray-400"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2.5 ml-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full px-6 py-4 bg-[#F8F9FA] border border-[#EEEEEE] rounded-xl focus:outline-none focus:border-primary/30 transition-all text-gray-700 placeholder:text-gray-400"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2.5 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    className="w-full px-6 py-4 bg-[#F8F9FA] border border-[#EEEEEE] rounded-xl focus:outline-none focus:border-primary/30 transition-all text-gray-700 placeholder:text-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88l-3.29-3.29m7.53 7.53l3.29 3.29M3 3l18 18M10.37 5.06l.23-.01a10 10 0 0 1 9.54 5.64 10 10 0 0 1-5.95 8.9m-5.15-.14a10 10 0 0 1-6.18-8.81 10 10 0 0 1 2.37-5.59M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2.5 ml-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="********"
                                    className="w-full px-6 py-4 bg-[#F8F9FA] border border-[#EEEEEE] rounded-xl focus:outline-none focus:border-primary/30 transition-all text-gray-700 placeholder:text-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88l-3.29-3.29m7.53 7.53l3.29 3.29M3 3l18 18M10.37 5.06l.23-.01a10 10 0 0 1 9.54 5.64 10 10 0 0 1-5.95 8.9m-5.15-.14a10 10 0 0 1-6.18-8.81 10 10 0 0 1 2.37-5.59M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-4.5 bg-primary text-white font-black text-lg rounded-xl shadow-[0_10px_25px_-5px_#EA730766] hover:bg-primary2 hover:shadow-[0_15px_30px_-5px_#EA730788] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                            >
                                Create Account
                            </button>
                        </div>

                        {/* Separator */}
                        <div className="relative py-6">
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
                            className="w-full py-4 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 shadow-sm"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="text-gray-700 font-bold">Google</span>
                        </button>
                    </form>
                </div>
            </AnimationWrapper>

            {/* Bottom Right Decorative Element (Dice) - Using dots instead since I don't have the dice asset */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 grid grid-cols-4 gap-2 opacity-10 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                ))}
            </div>
        </div>
    );
};

export default RegisterPage;
