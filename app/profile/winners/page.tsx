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
        <div className="min-h-screen   selection:bg-[#FF5100]/10 ">
            {/* Hero Section */}
            <section className="py-9.25 md:px-8 relative overflow-hidden rounded-[10px]"
                style={{
                    background: "linear-gradient(90deg, #FF6900 0%, #F54900 100%)"
                }}
            >
                {/* Subtle background elements could go here */}
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center">
                        <AnimationWrapper animationType="fadeDown">
                            <div className="text-4xl md:text-5xl mb-4 drop-shadow-lg text-center">
                                <Image src="/party.png" width={60} height={60} alt="party" className='mx-auto' />
                            </div>
                            <h1 className="text-3xl md:text-[32px] font-bold text-white mb-10 tracking-tight leading-tight">
                                This Week's Winner!
                            </h1>
                        </AnimationWrapper>

                        <AnimationWrapper animationType="scaleUp" delay={0.2}>
                            <div className="max-w-2xl mx-auto  px-8  py-5.5 text-white border border-white/20 "
                                style={{
                                    borderRadius: '10px',
                                    background: 'rgba(255, 255, 255, 0.10)'
                                }}
                            >
                                <h2 className="text-xl md:text-[30px] font-bold mb-1 leading-none">Sarah M.</h2>
                                <p className="text-white text-lg md:text-xl mb-4">New York</p>


                                <div className="w-full h-px bg-white/50 mb-4   mx-auto"></div>

                                <div className="space-y-3">
                                    <p className="text-xl md:text-[18px] tracking-tight">1x Large Pizza Voucher - Joe's Pizza NYC</p>
                                    <p className="text-white text-sm    ">Draw Date: April 18, 2026</p>
                                </div>
                            </div>
                        </AnimationWrapper>

                        <AnimationWrapper animationType="fadeUp" delay={0.4} className="mt-14">
                            <button className="bg-white text-[#FF5100] px-12 py-5 rounded-xl font-bold text-lg   transition-all transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                                Enter Next Week's Draw
                            </button>
                        </AnimationWrapper>
                    </div>
                </div>
            </section>

            {/* Past Winners Section */}
            <section className="w-full">
                <div className="mt-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-6">
                        <AnimationWrapper animationType="fadeRight">
                            <h2 className="text-2xl md:text-[32px] font-bold text-[#1A202C] tracking-tight">Past Winners</h2>
                        </AnimationWrapper>

                        <AnimationWrapper animationType="fadeLeft" className="flex items-center gap-4">
                            <span className="text-sm font-bold text-gray-400 whitespace-nowrap">Filter by region:</span>
                            <div className="relative group">
                                <select className="appearance-none bg-[#F7FAFC] border border-gray-100 rounded-2xl px-6 py-3 pr-12 text-sm font-bold text-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#FF5100]/20 w-full md:w-48 cursor-pointer transition-all hover:bg-gray-100">
                                    <option>New York</option>
                                    <option>Los Angeles</option>
                                    <option>Chicago</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform group-hover:translate-y-[-40%]">
                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </AnimationWrapper>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                        {pastWinners.map((winner, i) => (
                            <AnimationWrapper key={i} animationType="fadeUp" delay={i * 0.04}>
                                <div className="bg-white  rounded-[14px] p-4 flex items-center gap-4 group cursor-pointer relative overflow-hidden"
                                    style={{
                                        border: '1px solid rgba(0, 0, 0, 0.10)'
                                    }}
                                >
                                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-gray-50 border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-500">
                                        <Image
                                            src={winner.image}
                                            alt={winner.name}
                                            width={56}
                                            height={56}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-0.5">
                                            <h4 className="font-black text-[#1A202C] truncate text-[15px] group-hover:text-[#FF5100] transition-colors">{winner.name}</h4>
                                            <span className="text-[#6A7282] pt-0.5 text-[12px]">
                                                {winner.date}
                                            </span>
                                        </div>
                                        <p className="text-[11px] font-bold text-gray-400 truncate tracking-wide">{winner.location}</p>
                                    </div>
                                </div>
                            </AnimationWrapper>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-gray-50">
                        <p className="text-sm font-bold text-gray-400">Showing <span className="text-[#1A202C]">1–8</span> of <span className="text-[#1A202C]">84</span> orders</p>
                        <div className="flex gap-4">
                            <button className="px-8 py-3.5 text-sm font-black text-[#4A5568] bg-[#F7FAFC] border border-gray-100 rounded-2xl hover:bg-gray-100 active:scale-95 transition-all shadow-sm">
                                Previous
                            </button>
                            <button className="px-8 py-3.5 text-sm font-black text-white bg-[#1A202C] rounded-2xl hover:bg-black active:scale-95 transition-all shadow-sm">
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