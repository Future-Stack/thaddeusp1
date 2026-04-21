"use client";

import React, { useState } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';

const ResetPasswordPage = () => {
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
            <div className="absolute top-[18%] right-[8%] w-3 h-3 bg-[#FFD45E] rounded-full opacity-40 shadow-[0_0_12px_#FFD45E33]" />
            <div className="absolute top-[32%] right-[15%] w-2.5 h-2.5 bg-[#FF9D41] rounded-full opacity-50" />
            <div className="absolute bottom-[25%] right-[2%] w-4 h-4 bg-[#FFB200] rounded-full opacity-60 shadow-[0_0_20px_#FFB20033]" />
            <div className="absolute bottom-[10%] right-[30%] w-3 h-3 bg-[#FFD45E] rounded-full opacity-40" />

            {/* Grid Pattern Dots */}
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
                            Reset Password
                        </h1>

                    </div>

                    {/* Form */}
                    <form className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2.5 ml-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="admin123"
                                className="w-full px-6 py-4 bg-[#F8F9FA] border border-[#EEEEEE] rounded-xl focus:outline-none focus:border-primary/30 transition-all text-gray-700 placeholder:text-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2.5 ml-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                placeholder="admin123"
                                className="w-full px-6 py-4 bg-[#F8F9FA] border border-[#EEEEEE] rounded-xl focus:outline-none focus:border-primary/30 transition-all text-gray-700 placeholder:text-gray-400"
                            />
                        </div>



                        {/* Submit Button */}
                        <div className="pt-4  ">

                            <button
                                type="submit"
                                className="w-full py-4.5 bg-primary text-white font-black text-lg rounded-xl shadow-[0_10px_25px_-5px_#EA730766] hover:bg-primary2 hover:shadow-[0_15px_30px_-5px_#EA730788] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                            >
                                Reset
                            </button>
                        </div>


                    </form>
                </div>
            </AnimationWrapper>
        </div>
    );
};

export default ResetPasswordPage;
