"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from '@/components/AnimationWrapper';

const PaymentDetailsPage = () => {
    const [ticketCount] = useState(3);
    const pricePerTicket = 1.00;
    const totalAmount = ticketCount * pricePerTicket;

    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
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
            <AnimationWrapper animationType="scaleUp" duration={0.8} className="w-full max-w-[1000px] relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">

                    {/* Left Card: Payment Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 bg-white rounded-[24px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] p-8 md:p-10 border border-orange-50 flex flex-col"
                    >
                        <h2 className="text-[32px] font-black text-primary text-center mb-10 tracking-tight">Payment Details</h2>

                        <div className="space-y-6 grow">
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2.5">Card Number</label>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full h-14 bg-[#F5F7FA] border border-[#E9EDF2] rounded-xl px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary/30 transition-colors"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold text-gray-800 mb-2.5">Expiry Date</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="w-full h-14 bg-[#F5F7FA] border border-[#E9EDF2] rounded-xl px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary/30 transition-colors"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-bold text-gray-800 mb-2.5">CVV</label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        className="w-full h-14 bg-[#F5F7FA] border border-[#E9EDF2] rounded-xl px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary/30 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2.5">Cardholder Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full h-14 bg-[#F5F7FA] border border-[#E9EDF2] rounded-xl px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary/30 transition-colors"
                                />
                            </div>

                            <div className="flex items-center gap-2.5 text-[#10B981] text-sm font-bold pt-2">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 0C4.79086 0 3 1.79086 3 4V6H2C0.89543 6 0 6.89543 0 8V14C0 15.1046 0.89543 16 2 16H12C13.1046 16 14 15.1046 14 14V8C14 6.89543 13.1046 6 12 6H11V4C11 1.79086 9.20914 0 7 0ZM5 4C5 2.89543 5.89543 2 7 2C8.10457 2 9 2.89543 9 4V6H5V4ZM7 10C7.55228 10 8 10.4477 8 11V12C8 12.5523 7.55228 13 7 13C6.44772 13 6 12.5523 6 12V11C6 10.4477 6.44772 10 7 10Z" />
                                    </svg>
                                </div>
                                <span className="tracking-tight">Secured by Stripe</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-5 bg-primary text-white font-black text-xl rounded-2xl shadow-[0_12px_25px_-5px_rgba(234,115,7,0.4)] mt-10 transition-all"
                        >
                            Pay ${totalAmount.toFixed(2)}
                        </motion.button>
                    </motion.div>

                    {/* Right Card: Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 bg-white rounded-[24px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] p-8 md:p-10 border border-orange-50 flex flex-col"
                    >
                        <h2 className="text-2xl font-black text-[#111111] mb-8">Order Summary</h2>

                        <div className="space-y-5 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-[#94A3B8] font-semibold">New York Draw</span>
                                <span className="text-[#111111] font-black">{ticketCount} tickets</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#94A3B8] font-semibold">Price per ticket</span>
                                <span className="text-[#111111] font-black">${pricePerTicket.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-[#F1F5F9] mb-8">
                            <span className="text-[#111111] font-black text-2xl">Total</span>
                            <span className="text-primary font-black text-[28px] tracking-tight">${totalAmount.toFixed(2)}</span>
                        </div>

                        <div className="bg-[#FFF9F2] border border-[#FFE7C8] rounded-2xl p-4 md:p-5 mb-8">
                            <p className="text-[#B45309] text-[15px] font-medium leading-relaxed">
                                <span className="font-black">Draw closes:</span> Sunday, April 20 at 11:59 PM
                            </p>
                        </div>

                        <div className="space-y-4 mb-10 grow">
                            {[
                                'Instant ticket confirmation',
                                'Email notification if you win',
                                '100% secure payment'
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3.5 text-[#64748B] text-[15px] font-medium">
                                    <div className="text-[#64748B]">
                                        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 5.5L4.5 9L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* Payment Icons */}
                        <div className="flex items-center justify-center gap-3 mt-auto">
                            <div className="h-12 px-5 flex items-center justify-center border border-[#F1F5F9] rounded-xl hover:border-orange-100 transition-colors">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Google_Pay_%28GPay%29_Logo_%282020%29.svg" alt="Google Pay" className="h-4" />
                            </div>
                            <div className="h-12 px-5 flex items-center justify-center border border-[#F1F5F9] rounded-xl hover:border-orange-100 transition-colors">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                            </div>
                            <div className="h-12 px-5 flex items-center justify-center border border-[#F1F5F9] rounded-xl hover:border-orange-100 transition-colors">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-7" />
                            </div>
                        </div>
                    </motion.div>
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

export default PaymentDetailsPage;
