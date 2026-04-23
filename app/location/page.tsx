"use client";

import React, { useState } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import Image from 'next/image';

const SelectLocation = () => {
    const [zipCode, setZipCode] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4 relative overflow-hidden font-inter">
            <div className="absolute top-[20%] left-[10%] w-3 h-3 bg-[#FF9D41] rounded-full opacity-40 animate-pulse duration-300" />
            <div className="absolute top-[10%] right-[20%] w-2 h-2 bg-[#FFD45E] rounded-full opacity-30 animate-pulse duration-400" />
            <div className="absolute bottom-[25%] left-[5%] w-4 h-4 bg-[#FFB200] rounded-full opacity-20 animate-pulse duration-500" />
            <div className="absolute bottom-[15%] right-[10%] w-3 h-3 bg-[#FF9D41] rounded-full opacity-40 shadow-[0_0_15px_rgba(255,157,65,0.4)] animate-pulse duration-350" />
            <div className="absolute top-[40%] left-[2%] w-2 h-2 bg-[#FFD45E] rounded-full opacity-25 animate-pulse duration-450" />
            <div className="absolute top-[60%] right-[30%] w-3.5 h-3.5 bg-[#FF7A30] rounded-full opacity-50 shadow-[0_0_20px_rgba(255,122,48,0.3)] animate-pulse duration-300" />
            <div className="absolute bottom-[40%] right-[5%] w-2.5 h-2.5 bg-[#FFD45E] rounded-full opacity-40 animate-pulse duration-380" />

            {/* Floating assets placeholders (matching the card and dice in the image if possible) */}
            <div className="absolute top-[15%] left-[38%] opacity-60 rotate-[-15deg] pointer-events-none scale-75 md:scale-100 ">
                <Image src="/ticket.png" alt="Ticket" width={60} height={40} className="w-auto h-auto animate-bounce-slow duration-1000" />
            </div>

            <div className="absolute bottom-[10%] right-[32%] opacity-40 rotate-15 pointer-events-none scale-75 md:scale-100">
                <Image src="/ludo.gif" alt="Dice" width={50} height={50} className="w-auto h-auto animate-bounce duration-1000" />
            </div>

            <AnimationWrapper animationType="scaleUp" duration={0.8} className="w-full max-w-[540px] relative z-10">
                <div className="bg-white rounded-[15px] shadow-[0_30px_70px_rgba(0,0,0,0.06)] p-8 md:p-12 border border-orange-50/50">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-black text-[#1A202C] mb-3 tracking-tight">
                            Where are you based?
                        </h1>
                        <p className="text-gray-500 font-medium text-sm md:text-secondary">
                            We'll add you to your local weekly draw
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* ZIP Code Section */}
                        <div className="space-y-3">
                            <label className="block text-[15px] font-extrabold text-gray-800 ml-1">
                                Enter ZIP Code
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    placeholder="10001"
                                    className="flex-1 px-5 py-3.5 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-primary/40 transition-all text-gray-700 placeholder:text-gray-400 font-medium"
                                />
                                <button className="px-6 py-3.5 bg-primary text-white font-bold text-[15px] rounded-xl shadow-[0_10px_20px_-5px_rgba(234,115,7,0.4)] hover:bg-primary2 transition-all duration-300 active:scale-95 cursor-pointer shrink-0">
                                    Find My City
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-5 text-gray-400 font-bold tracking-widest">OR</span>
                            </div>
                        </div>

                        {/* City Selection Section */}
                        <div className="space-y-3">
                            <label className="block text-[15px] font-extrabold text-gray-800 ml-1">
                                Select Your City
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-full px-5 py-4 bg-[#F8F9FA] border border-[#FBE9D9] rounded-xl appearance-none focus:outline-none focus:border-primary/40 transition-all text-gray-700 font-medium cursor-pointer"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%234A5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                                        backgroundPosition: 'right 1.25rem center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.25rem'
                                    }}
                                >
                                    <option value="" disabled>Choose a city</option>
                                    <option value="london">London</option>
                                    <option value="new-york">New York</option>
                                    <option value="paris">Paris</option>
                                </select>
                            </div>
                        </div>

                        {/* Final Continue Button */}
                        <div className="pt-2">
                            <button
                                disabled={!zipCode && !selectedCity}
                                className={`w-full py-4 text-white font-bold text-[17px] rounded-2xl transition-all duration-300 shadow-md ${zipCode || selectedCity
                                    ? 'bg-primary shadow-[0_12px_24px_-8px_rgba(234,115,7,0.5)] cursor-pointer hover:bg-primary2 hover:-translate-y-0.5 active:translate-y-0'
                                    : 'bg-[#CBD5E0] cursor-not-allowed opacity-80'
                                    }`}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </AnimationWrapper>
        </div>
    );
};

export default SelectLocation;
