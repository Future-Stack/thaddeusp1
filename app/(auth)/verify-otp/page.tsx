"use client";

import React, { useState, useRef, useEffect } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';

const VerifyOTPPage = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1);
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 6).split('');
        const newOtp = [...otp];
        pasteData.forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);
        inputRefs.current[Math.min(pasteData.length, 5)]?.focus();
    };

    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
            {/* Scattered Decorative Dots - Following Image Pattern - KEEPING THESE AS REQUESTED */}
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
                    <div className="text-center mb-6">
                        <h1 className="text-[32px] md:text-[42px] font-black text-primary mb-3 tracking-tight">
                            Verify OTP
                        </h1>
                        <p className="text-[#333333] text-xs md:text-sm px-2 font-medium leading-relaxed max-w-[400px] mx-auto">
                            We have sent you a 6 digit OTP code to your provided email:{" "}
                            <span className="font-bold text-black italic">example@email.com</span> please input that code here to proceed.
                        </p>
                    </div>

                    <form className="space-y-8">
                        {/* Timer */}
                        <div className="text-center">
                            <span className="text-[#FF9D41] font-bold text-sm md:text-base">2:59</span>
                        </div>

                        {/* OTP Inputs */}
                        <div className="flex justify-center gap-2 md:gap-3">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => { inputRefs.current[i] = el; }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    onPaste={handlePaste}
                                    className="w-10 h-10 md:w-12 md:h-12 text-center text-lg font-bold border border-[#FFD45E] bg-[#FFFBF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-primary placeholder:text-[#FFD45E]"
                                    placeholder="-"
                                />
                            ))}
                        </div>

                        {/* Resend Link */}
                        <div className="text-center">
                            <button type="button" className="text-[#1A1A1A] font-bold text-sm hover:underline">
                                Resend
                            </button>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-4 pt-4">
                            <button
                                type="button"
                                className="w-full py-4 text-black font-bold text-lg rounded-[20px] border border-[#CCCCCC] shadow-sm hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full py-4 bg-primary text-white font-bold text-lg rounded-[20px] shadow-[0_10px_20px_-5px_rgba(234,115,7,0.4)] hover:bg-primary2 transition-all"
                            >
                                Verify
                            </button>
                        </div>
                    </form>


                </div>
            </AnimationWrapper>
        </div>
    );
};


export default VerifyOTPPage;
