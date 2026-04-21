"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from '@/components/AnimationWrapper';

const PaymentConfirmPage = () => {
    const ticketNumbers = ["TKT-NY-1247", "TKT-NY-1248", "TKT-NY-1249"];

    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 md:p-10 relative overflow-hidden font-inter">
            {/* Scattered Decorative Dots - Preserved as requested */}
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-orange-50/50 flex flex-col items-center"
                >
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-[36px] md:text-[42px] font-black text-[#EA580C] leading-tight mb-3">
                            You&apos;re in the draw!
                        </h1>
                        <p className="text-[#64748B] text-lg md:text-xl font-medium px-4">
                            Your tickets have been confirmed. Good luck!
                        </p>
                    </div>

                    {/* Ticket Numbers Section */}
                    <div className="w-full bg-[#FFF9F1] border border-[#FFEDD5] rounded-[24px] p-6 md:p-8 mb-6">
                        <h3 className="text-[#111111] font-black text-center text-lg mb-6">Your Ticket Numbers</h3>
                        <div className="space-y-3">
                            {ticketNumbers.map((number, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white rounded-xl py-4 flex items-center justify-center shadow-sm border border-orange-100/50"
                                >
                                    <span className="text-[#111111] font-bold tracking-wider">{number}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Next Draw Section */}
                    <div className="w-full bg-[#EFF6FF] border border-[#DBEAFE] rounded-[24px] p-6 md:p-8 mb-10 flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden border border-gray-100 mb-4">
                            <div className="bg-red-500 h-4 w-full flex items-center justify-center gap-1 px-1">
                                <div className="w-1 h-1 bg-white/50 rounded-full" />
                                <div className="w-1 h-1 bg-white/50 rounded-full" />
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <span className="text-[#111111] font-black text-xl">17</span>
                            </div>
                        </div>
                        <h3 className="text-[#111111] font-bold text-xl mb-1">Next Draw</h3>
                        <p className="text-[#64748B] font-medium mb-3">Sunday, April 20, 2026</p>
                        <button className="text-[#3B82F6] font-bold hover:underline flex items-center gap-1">
                            <span>+</span> Add to calendar
                        </button>
                    </div>

                    {/* Checklist */}
                    <div className="w-full space-y-4 mb-10 self-start px-2">
                        {[
                            'Confirmation email sent to your inbox',
                            "We'll notify you if you win",
                            'Winner announced Monday morning'
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-[#64748B] text-[15px] font-medium">
                                <div className="text-[#64748B]/60">
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 7.5L6.5 12.5L16.5 1.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>

                    {/* Dashboard Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-5 bg-[#EA580C] text-white font-black text-xl rounded-2xl shadow-[0_12px_25px_-5px_rgba(234,88,12,0.4)] transition-all"
                    >
                        Go to My Dashboard
                    </motion.button>
                </motion.div>
            </AnimationWrapper>

            {/* Bottom Right Decorative Element (Dots) - Preserved */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 grid grid-cols-4 gap-2 opacity-10 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                ))}
            </div>

            {/* Added Dice decorative element as seen in image */}
            <div className="absolute bottom-4 right-4 opacity-10 rotate-12 w-12 h-12">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M7,9c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S8.1,9,7,9z M17,19c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,19,17,19z M17,9c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,9,17,9z M7,19c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S8.1,19,7,19z M12,13c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,13,12,13z" />
                </svg>
            </div>
        </div>
    );
};

export default PaymentConfirmPage;
