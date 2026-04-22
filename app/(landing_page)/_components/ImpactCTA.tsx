"use client";

import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';

const ImpactCTA = () => {
    return (
        <section className="py-24 px-4 bg-[#FFFAF6] overflow-hidden">
            <div className="container mx-auto">
                <AnimationWrapper animationType="scaleUp" duration={0.8}>
                    <div className="relative   rounded-[48px] p-10 md:p-20 text-center text-white shadow-[0_30px_70px_rgba(255,107,0,0.25)] overflow-hidden"
                        style={{
                            background: 'linear-gradient(90deg, #EA7307 0%, #EA7307 50%, #C59B00 100%)'
                        }}
                    >

                        {/* Decorative Background Elements */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

                        {/* Heading */}
                        <AnimationWrapper animationType="fadeUp" delay={0.2}>
                            <h2 className="text-3xl md:text-[32px] font-black mb-6 leading-[1.1] tracking-tight font-inter">
                                Every Ticket Is a Meal   for Someone in Need
                            </h2>
                        </AnimationWrapper>

                        {/* Description */}
                        <AnimationWrapper animationType="fadeUp" delay={0.3}>
                            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-white/80 font-normal font-inter leading-relaxed">
                                Join our community of compassionate people making a real difference. Win pizza,   spread hope.
                            </p>
                        </AnimationWrapper>

                        {/* CTA Button and Pulse */}
                        <AnimationWrapper animationType="fadeUp" delay={0.4}>
                            <div className="inline-flex flex-col items-center">
                                <button className="group relative bg-white text-[#F54900] font-semibold cursor-pointer px-12 py-5 rounded-2xl text-xl hover:bg-white transform hover:scale-105 active:scale-95  transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.15)] mb-6">
                                     Buy Tickets Now 
                                 
                                </button>
                                <div className="flex items-center gap-3 py-2 px-4     rounded-full text-sm md:text-[14px] font-semibold text-white/90 border border-white/10">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF85] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF85]"></span>
                                    </span>
                                    247 tickets purchased today
                                </div>
                            </div>
                        </AnimationWrapper>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-4 relative">
                            {[
                                { label: "Goes to charity", value: "100%" },
                                { label: "Meals donated", value: "15K+" },
                                { label: "Cities served", value: "8" },
                                { label: "Transparent", value: "100%" }
                            ].map((stat, index) => (
                                <AnimationWrapper
                                    key={index}
                                    animationType="fadeUp"
                                    delay={0.5 + (index * 0.1)}
                                >
                                    <div className="flex flex-col items-center group cursor-default">
                                        <div className="text-4xl md:text-[30px] font-bold mb-2 leading-none tracking-tighter group-hover:scale-110 transition-transform duration-300 font-inter">
                                            {stat.value}
                                        </div>
                                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors duration-300">
                                            {stat.label}
                                        </div>
                                    </div>
                                </AnimationWrapper>
                            ))}
                        </div>
                    </div>
                </AnimationWrapper>
            </div>
        </section>
    );
};

export default ImpactCTA;
