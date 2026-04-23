"use client";

import React from 'react';
import Image from 'next/image';
import AnimationWrapper from '@/components/AnimationWrapper';

// Sample data for past winners
const pastWinners = Array(16).fill({
    name: 'James K.',
    location: 'Los Angeles, CA',
    date: 'April 6, 2026',
    image: '/user.png'
});

const WinnersPage = () => {
    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-20">
            {/* Hero Section */}
            <section className="bg-[#FF5100] pt-12 pb-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <AnimationWrapper animationType="fadeDown">
                            <div className="text-5xl mb-4">🥳</div>
                            <h1 className="text-3xl md:text-[42px] font-black text-white mb-8 tracking-tight">
                                This Week's Winner!
                            </h1>
                        </AnimationWrapper>

                        <AnimationWrapper animationType="scaleUp" delay={0.2}>
                            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-[32px] p-10 md:p-14 text-white border border-white/10 shadow-2xl">
                                <h2 className="text-3xl md:text-[40px] font-black mb-2">Sarah M.</h2>
                                <p className="text-white/80 text-xl font-medium mb-10">New York</p>
                                
                                <div className="space-y-2">
                                    <p className="text-xl md:text-2xl font-bold">1x Large Pizza Voucher - Joe's Pizza NYC</p>
                                    <p className="text-white/60 text-base">Draw Date: April 18, 2026</p>
                                </div>
                            </div>
                        </AnimationWrapper>

                        <AnimationWrapper animationType="fadeUp" delay={0.4} className="mt-12">
                            <button className="bg-white text-[#FF5100] px-10 py-4.5 rounded-2xl font-black text-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-xl">
                                Enter Next Week's Draw
                            </button>
                        </AnimationWrapper>
                    </div>
                </div>
            </section>

            {/* Past Winners Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-6">
                <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                        <AnimationWrapper animationType="fadeRight">
                            <h2 className="text-3xl font-black text-[#1A202C]">Past Winners</h2>
                        </AnimationWrapper>
                        
                        <AnimationWrapper animationType="fadeLeft" className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">Filter by region:</span>
                            <div className="relative">
                                <select className="appearance-none bg-[#F7FAFC] border border-gray-100 rounded-2xl px-6 py-3.5 pr-12 text-sm font-bold text-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#FF5100]/20 w-full md:w-48 cursor-pointer">
                                    <option>New York</option>
                                    <option>Los Angeles</option>
                                    <option>Chicago</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </AnimationWrapper>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {pastWinners.map((winner, i) => (
                            <AnimationWrapper key={i} animationType="fadeUp" delay={i * 0.03}>
                                <div className="bg-white border border-gray-100 rounded-3xl p-5 flex items-center gap-4 hover:shadow-lg hover:border-orange-100 transition-all duration-300 group cursor-pointer">
                                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-orange-50 border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <Image 
                                            src={winner.image} 
                                            alt={winner.name} 
                                            width={56} 
                                            height={56} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-1">
                                            <h4 className="font-black text-[#1A202C] truncate text-base">{winner.name}</h4>
                                            <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap pt-1">
                                                {winner.date}
                                            </span>
                                        </div>
                                        <p className="text-xs font-semibold text-gray-500 truncate mt-0.5">{winner.location}</p>
                                    </div>
                                </div>
                            </AnimationWrapper>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-gray-50">
                        <p className="text-sm font-bold text-gray-400">Showing 1–8 of 84 orders</p>
                        <div className="flex gap-3">
                            <button className="px-6 py-3 text-sm font-black text-[#4A5568] bg-[#F7FAFC] border border-gray-100 rounded-2xl hover:bg-gray-100 transition-colors shadow-sm">
                                Previous
                            </button>
                            <button className="px-6 py-3 text-sm font-black text-white bg-[#1A202C] rounded-2xl hover:bg-black transition-colors shadow-sm">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WinnersPage;
