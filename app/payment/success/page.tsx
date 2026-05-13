"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Home, Ticket } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';
import Link from 'next/link';

const PaymentSuccessPage = () => {
    const [receiptId, setReceiptId] = React.useState<string>("");

    useEffect(() => {
        setReceiptId(`#ORD-${Math.floor(1000 + Math.random() * 9000)}`);
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
            {/* Decorative Dots - Preserving existing style */}
            <div className="absolute top-[20%] left-[5%] w-3 h-3 bg-[#FF9D41] rounded-full opacity-50 shadow-[0_0_10px_#FF9D4133]" />
            <div className="absolute top-[35%] left-[2%] w-1.5 h-1.5 bg-[#FFD45E] rounded-full opacity-30" />
            <div className="absolute top-[30%] left-[25%] w-4 h-4 bg-[#FF7A30] rounded-full opacity-60 shadow-[0_0_15px_#FF7A3044]" />
            <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-[#FFD45E] rounded-full opacity-40" />
            <div className="absolute bottom-[40%] left-[12%] w-2.5 h-2.5 bg-[#FF9D41] rounded-full opacity-30" />
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

            <AnimationWrapper animationType="scaleUp" duration={0.8} className="w-full max-w-[500px] relative z-10">
                <div className="bg-white rounded-[40px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] p-10 md:p-12 border border-orange-50/50 flex flex-col items-center text-center">

                    {/* Success Icon Animation */}
                    <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1
                        }}
                        className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 relative"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-green-500"
                        >
                            <CheckCircle2 size={56} strokeWidth={2.5} />
                        </motion.div>

                        {/* Pulse effect */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-green-200 rounded-full -z-10"
                        />
                    </motion.div>

                    <h1 className="text-[32px] md:text-[38px] font-black text-[#111111] mb-4 tracking-tight leading-tight">
                        Payment Successful!
                    </h1>
                    <p className="text-gray-500 font-medium text-lg mb-8 px-4">
                        Your order has been confirmed. You&apos;re now officially in the draw!
                    </p>

                    {/* Order Details Preview */}
                    <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[24px] p-6 mb-10">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">Status</span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-black rounded-full uppercase">Confirmed</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600 font-semibold">Payment Method</span>
                            <span className="text-[#111111] font-bold">Online Payment</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-semibold">Receipt</span>
                            <span className="text-[#111111] font-bold">{receiptId || "#ORD-..."}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full space-y-4">
                        <Link href="/profile" className="block w-full">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 bg-primary text-white font-black text-xl rounded-2xl shadow-[0_12px_30px_-5px_rgba(234,115,7,0.4)] hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <Ticket size={24} />
                                <span>View My Tickets</span>
                            </motion.button>
                        </Link>

                        <Link href="/" className="block w-full">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 text-gray-500 font-bold text-lg hover:text-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <Home size={20} />
                                <span>Back to Home</span>
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </AnimationWrapper>

            {/* Background decorative elements */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-100/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-100/30 rounded-full blur-[100px] pointer-events-none" />
        </div>
    );
};

export default PaymentSuccessPage;
