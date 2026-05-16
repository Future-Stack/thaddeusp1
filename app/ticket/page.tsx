"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from '@/components/AnimationWrapper';
import { useRunningEvent } from '@/hooks/useEvents';
import { useRevenueStats } from '@/hooks/useRevenue';
import { useBuyTickets } from '@/hooks/usePurchase';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import RoleGuard from '@/components/auth/RoleGuard';

const TicketContent = () => {
    const [ticketCount, setTicketCount] = useState(1);

    const { data: runningEventResponse, isLoading: isEventLoading, isError } = useRunningEvent();
    const { data: statsResponse } = useRevenueStats();
    const { mutate: buyTickets, isPending: isPurchasing } = useBuyTickets();

    const event = runningEventResponse?.data;
    const stats = statsResponse?.data;

    const pricePerTicket = event ? Number(event.ticketPrice) : 1.00;

    const handleIncrement = () => setTicketCount(prev => prev + 1);
    const handleDecrement = () => setTicketCount(prev => (prev > 1 ? prev - 1 : 1));

    const handlePurchase = () => {
        if (!event) return;
        buyTickets({
            eventId: event.id,
            quantity: ticketCount
        });
    };

    if (isEventLoading) {
        return (
            <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
                <AnimationWrapper animationType="scaleUp" duration={0.8} className="w-full max-w-137.5 relative z-10">
                    <div className="bg-white rounded-4xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-8 md:p-10 border border-orange-50 space-y-8">
                        <div className="text-center space-y-2">
                            <Skeleton className="h-10 w-3/4 mx-auto" />
                            <Skeleton className="h-4 w-1/2 mx-auto" />
                        </div>
                        <Skeleton className="h-24 w-full rounded-2xl" />
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-24" />
                            <div className="flex gap-3">
                                <Skeleton className="h-12 w-12 rounded-xl" />
                                <Skeleton className="h-14 w-20 rounded-xl" />
                                <Skeleton className="h-12 w-12 rounded-xl" />
                            </div>
                        </div>
                        <Skeleton className="h-40 w-full rounded-2xl" />
                    </div>
                </AnimationWrapper>
            </div>
        );
    }

    if (isError || !event) {
        return (
            <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
                <div className="bg-white rounded-4xl p-10 shadow-lg text-center border border-red-50">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
                    <p className="text-gray-500">No active draw found at the moment. Please check back later.</p>
                    <Link href="/" className='mt-4 bg-black text-white rounded-xl inline-block px-8 py-2'>Back To Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
            {/* Scattered Decorative Dots */}
            <div className="absolute top-[20%] left-[5%] w-3 h-3 bg-[#FF9D41] rounded-full opacity-50 shadow-[0_0_10px_#FF9D4133]" />
            <div className="absolute top-[35%] left-[2%] w-1.5 h-1.5 bg-[#FFD45E] rounded-full opacity-30" />
            <div className="absolute top-[30%] left-[25%] w-4 h-4 bg-[#FF7A30] rounded-full opacity-60 shadow-[0_0_15px_#FF7A3044]" />
            <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-[#FFD45E] rounded-full opacity-40" />
            <div className="absolute bottom-[40%] left-[12%] w-2.5 h-2.5 bg-[#FF9D41] rounded-full opacity-30" />
            <div className="absolute top-[18%] right-[8%] w-3 h-3 bg-[#FFD45E] rounded-full opacity-40 shadow-[0_0_12px_#FFD45E33]" />
            <div className="absolute top-[32%] right-[15%] w-2.5 h-2.5 bg-[#FF9D41] rounded-full opacity-50" />
            <div className="absolute bottom-[25%] right-[2%] w-4 h-4 bg-[#FFB200] rounded-full opacity-60 shadow-[0_0_20px_#FFB20033]" />
            <div className="absolute bottom-[10%] right-[30%] w-3 h-3 bg-[#FFD45E] rounded-full opacity-40" />

            {/* Main Content */}
            <AnimationWrapper animationType="scaleUp" duration={0.8} className="w-full max-w-137.5 relative z-10">
                <div className="bg-white rounded-4xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-8 md:p-10 border border-orange-50">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-[32px] md:text-[38px] font-black text-[#111111] mb-2 tracking-tight">
                            Buy Your Tickets
                        </h1>

                        {stats && stats.totalPrizeCost > 0 && (
                            <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full border border-green-100">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[11px] font-bold text-green-700 uppercase tracking-wider">
                                    ${stats.totalPrizeCost.toLocaleString()} Prizes Distributed!
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Draw Box */}
                    <div className="bg-[#FFF9F2] border border-[#FFE7C8] rounded-2xl p-5 flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-[#111111] font-bold text-lg">{event.name}</h3>
                            <p className="text-gray-500 text-sm">
                                Next draw: {new Date(event.drawDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                            <div className="w-5 h-5 flex items-center justify-center opacity-60">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            </div>
                            <span>
                                {new Date(event.ticketClose) > new Date()
                                    ? `Closes ${new Date(event.ticketClose).toLocaleDateString('en-US', { weekday: 'long' })}`
                                    : "Draw Closed"}
                            </span>
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
                                <rect x="3" y="11" width="4" height="9" rx="1" fill="#3B82F6" />
                                <rect x="10" y="6" width="4" height="14" rx="1" fill="#10B981" />
                                <rect x="17" y="14" width="4" height="6" rx="1" fill="#EF4444" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-[#111111] font-bold text-sm">Current Prize Pool</h4>
                            <p className="text-gray-500 text-xs font-medium mt-0.5">
                                ${Number(event.prizeValue).toLocaleString()} Jackpot!
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="space-y-4">
                        <motion.button
                            whileHover={{ scale: isPurchasing ? 1 : 1.01 }}
                            whileTap={{ scale: isPurchasing ? 1 : 0.99 }}
                            onClick={handlePurchase}
                            disabled={isPurchasing}
                            className="w-full py-5 bg-primary text-white font-black text-xl rounded-2xl shadow-[0_10px_25px_-5px_#EA730766] hover:bg-primary2 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPurchasing ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                "Proceed to Payment"
                            )}
                        </motion.button>
                        <p className="text-center text-gray-400 text-sm font-medium">
                            By purchasing, you agree to our <span className="underline cursor-pointer">Terms & Conditions</span>
                        </p>
                    </div>
                </div>
            </AnimationWrapper>

            {/* Bottom Right Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/50 rounded-full blur-3xl pointer-events-none" />
        </div>
    );
};

const TicketPage = () => {
    return (
        <RoleGuard>
            <TicketContent />
        </RoleGuard>
    );
};

export default TicketPage;
