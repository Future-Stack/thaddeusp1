"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCcw, HelpCircle, ArrowLeft } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';
import Link from 'next/link';

const PaymentFailedPage = () => {
    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
            {/* Decorative Dots - Using a slightly cooler/redder palette for failure */}
            <div className="absolute top-[20%] left-[5%] w-3 h-3 bg-red-400 rounded-full opacity-30 shadow-[0_0_10px_rgba(248,113,113,0.2)]" />
            <div className="absolute top-[35%] left-[2%] w-1.5 h-1.5 bg-gray-400 rounded-full opacity-20" />
            <div className="absolute top-[30%] left-[25%] w-4 h-4 bg-red-300 rounded-full opacity-20" />
            <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-red-200 rounded-full opacity-20" />
            <div className="absolute bottom-[40%] left-[12%] w-2.5 h-2.5 bg-gray-300 rounded-full opacity-20" />
            <div className="absolute top-[18%] right-[8%] w-3 h-3 bg-gray-300 rounded-full opacity-20 shadow-[0_0_12px_rgba(209,213,219,0.3)]" />
            <div className="absolute top-[32%] right-[15%] w-2.5 h-2.5 bg-red-300 rounded-full opacity-20" />
            <div className="absolute bottom-[25%] right-[2%] w-4 h-4 bg-red-400 rounded-full opacity-30 shadow-[0_0_15px_rgba(248,113,113,0.2)]" />
            <div className="absolute bottom-[10%] right-[30%] w-3 h-3 bg-gray-300 rounded-full opacity-20" />

            {/* Grid Pattern Dots */}
            <div className="absolute top-[-2%] left-[-2%] opacity-[0.03] rotate-12 pointer-events-none">
                <div className="grid grid-cols-6 gap-6">
                    {[...Array(36)].map((_, i) => (
                        <div key={`grid-top-${i}`} className="w-2 h-2 bg-black rounded-full" />
                    ))}
                </div>
            </div>

            <AnimationWrapper animationType="scaleUp" duration={0.8} className="w-full max-w-[500px] relative z-10">
                <div className="bg-white rounded-[40px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] p-10 md:p-12 border border-red-50 flex flex-col items-center text-center">
                    
                    {/* Failed Icon Animation */}
                    <motion.div 
                        initial={{ scale: 0, rotate: 10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1
                        }}
                        className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8"
                    >
                        <motion.div
                            animate={{ 
                                x: [0, -5, 5, -5, 5, 0],
                            }}
                            transition={{ 
                                duration: 0.5,
                                delay: 0.5
                            }}
                            className="text-red-500"
                        >
                            <XCircle size={56} strokeWidth={2.5} />
                        </motion.div>
                    </motion.div>

                    <h1 className="text-[32px] md:text-[38px] font-black text-[#111111] mb-4 tracking-tight leading-tight">
                        Payment Failed
                    </h1>
                    <p className="text-gray-500 font-medium text-lg mb-8 px-4">
                        We couldn&apos;t process your transaction. Don&apos;t worry, no funds were captured from your account.
                    </p>

                    {/* Error Reasons */}
                    <div className="w-full bg-[#FEF2F2] border border-[#FEE2E2] rounded-[24px] p-6 mb-10 text-left">
                        <h4 className="text-red-900 font-bold text-sm mb-3 uppercase tracking-wider">Common reasons:</h4>
                        <ul className="space-y-2">
                            {['Insufficient funds', 'Incorrect card details', 'Transaction declined by bank'].map((reason, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-red-700/70 text-sm font-medium">
                                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                    {reason}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full space-y-4">
                        <Link href="/ticket" className="block w-full">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 bg-[#111111] text-white font-black text-xl rounded-2xl shadow-[0_12px_30px_-5px_rgba(0,0,0,0.3)] hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <RefreshCcw size={24} />
                                <span>Try Again</span>
                            </motion.button>
                        </Link>
                        
                        <button className="w-full py-4 text-gray-500 font-bold text-lg hover:text-gray-800 transition-colors flex items-center justify-center gap-2">
                            <HelpCircle size={20} />
                            <span>Contact Support</span>
                        </button>

                        <Link href="/" className="block w-full pt-2">
                            <div className="text-gray-400 font-bold flex items-center justify-center gap-2 hover:text-gray-600 transition-colors">
                                <ArrowLeft size={18} />
                                <span>Return to Home</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </AnimationWrapper>

            {/* Background decorative elements */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-100/20 rounded-full blur-[100px] pointer-events-none" />
        </div>
    );
};

export default PaymentFailedPage;
