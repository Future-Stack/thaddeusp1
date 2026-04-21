"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimationWrapper from '@/components/AnimationWrapper';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
            {/* Background Decorative Dots - Consistent with design language */}
            
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
                    className="bg-white rounded-[40px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.1)] p-10 md:p-16 border border-orange-50/50 flex flex-col items-center text-center"
                >
                    {/* Big 404 Display */}
                    <div className="relative mb-10">
                        <motion.h1 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                            className="text-[120px] md:text-[150px] font-black text-primary leading-none tracking-tighter"
                        >
                            404
                        </motion.h1>
                        
                        {/* Decorative floating elements */}
                        <motion.div 
                            animate={{ y: [0, -15, 0], x: [0, 5, 0] }} 
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 w-8 h-8 bg-[#FFD45E] rounded-full shadow-lg flex items-center justify-center text-xl"
                        >
                            ❓
                        </motion.div>
                        <motion.div 
                            animate={{ y: [0, 15, 0], x: [0, -5, 0] }} 
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute -bottom-4 -left-8 w-6 h-6 bg-primary/20 rounded-full blur-[2px]" 
                        />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-[#111111] mb-5 leading-tight">
                        Oops! You&apos;ve wandered off.
                    </h2>
                    
                    <p className="text-[#64748B] text-lg font-medium mb-12 leading-relaxed max-w-[320px] mx-auto">
                        The page you are looking for doesn&apos;t exist or has been moved to a different draw.
                    </p>

                    <Link href="/" className="w-full">
                        <motion.button
                            whileHover={{ scale: 1.02, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-5 bg-primary text-white font-black text-xl rounded-2xl shadow-[0_12px_25px_-5px_rgba(234,115,7,0.4)] transition-all flex items-center justify-center gap-3"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6"/>
                            </svg>
                            Back to Home
                        </motion.button>
                    </Link>
                </motion.div>
            </AnimationWrapper>

            {/* Bottom Right Decorative Element (Dots) - Preserved consistency */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 grid grid-cols-4 gap-2 opacity-10 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                ))}
            </div>
        </div>
    );
};

export default NotFound;
