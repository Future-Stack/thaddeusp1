"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from '@/components/AnimationWrapper';

const TicketPage = () => {
    const [ticketCount, setTicketCount] = useState(1);
    const pricePerTicket = 1.00;

    const handleIncrement = () => setTicketCount(prev => prev + 1);
    const handleDecrement = () => setTicketCount(prev => (prev > 1 ? prev - 1 : 1));

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
                <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-8 md:p-10 border border-orange-50">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-[32px] md:text-[38px] font-black text-[#111111] mb-2 tracking-tight">
                            Buy Your Tickets
                        </h1>
                        <p className="text-gray-500 font-medium">Don&apos;t miss out—grab your tickets now</p>
                    </div>

                    {/* Draw Box */}
                    <div className="bg-[#FFF9F2] border border-[#FFE7C8] rounded-2xl p-5 flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-[#111111] font-bold text-lg">New York Draw</h3>
                            <p className="text-gray-500 text-sm">Next draw: April 20, 2026</p>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                            <div className="w-5 h-5 flex items-center justify-center opacity-60">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            </div>
                            <span>Closes Sunday 11:59 PM</span>
                        </div>
                    </div>

                    {/* Ticket Selection */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-800 mb-4">Number of Tickets</label>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleDecrement}
                                className="w-12 h-12 flex items-center justify-center bg-[#E9EDF2] rounded-xl text-gray-800 font-black text-2xl hover:bg-gray-200 transition-all active:scale-95"
                            >
                                -
                            </button>
                            <div className="w-20 h-14 flex items-center justify-center border-2 border-[#EEEEEE] rounded-xl text-gray-900 font-bold text-xl">
                                {ticketCount}
                            </div>
                            <button 
                                onClick={handleIncrement}
                                className="w-12 h-12 flex items-center justify-center bg-[#E9EDF2] rounded-xl text-gray-800 font-black text-2xl hover:bg-gray-200 transition-all active:scale-95"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-[#F8FAFC] rounded-2xl p-6 mb-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-semibold">Tickets</span>
                                <span className="text-gray-900 font-bold">{ticketCount}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-[#EEEEEE]">
                                <span className="text-gray-500 font-semibold">Price per ticket</span>
                                <span className="text-gray-900 font-bold">${pricePerTicket.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-gray-900 font-black text-xl">Total</span>
                                <span className="text-primary font-black text-2xl">${(ticketCount * pricePerTicket).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Probability Box */}
                    <div className="bg-[#F0F7FF] border border-[#D9E9FF] rounded-2xl p-4 flex items-center gap-4 mb-8">
                        <div className="bg-white p-2.5 rounded-xl shadow-sm flex items-center justify-center">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="11" width="4" height="9" rx="1" fill="#3B82F6"/>
                                <rect x="10" y="6" width="4" height="14" rx="1" fill="#10B981"/>
                                <rect x="17" y="14" width="4" height="6" rx="1" fill="#EF4444"/>
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-[#111111] font-bold text-sm">Your chances this week</h4>
                            <p className="text-gray-500 text-xs font-medium mt-0.5">1 in 248 (0.40%)</p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="space-y-4">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full py-5 bg-primary text-white font-black text-xl rounded-2xl shadow-[0_10px_25px_-5px_#EA730766] hover:bg-primary2 transition-all duration-300"
                        >
                            Proceed to Payment
                        </motion.button>
                        <p className="text-center text-gray-400 text-sm font-medium">
                            By purchasing, you agree to our <span className="underline cursor-pointer">Terms & Conditions</span>
                        </p>
                    </div>
                </div>
            </AnimationWrapper>

            {/* Bottom Right Decorative Element (Dots) - Preserved */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 grid grid-cols-4 gap-2 opacity-10 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                ))}
            </div>
        </div>
    );
};

export default TicketPage;
