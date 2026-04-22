"use client";

import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import Image from 'next/image';

const ImpactSection = () => {
    const cards = [
        {
            icon: "/doller/1.png",
            amount: "$1.00",
            description: "Goes to feeding someone in need at local homeless shelters.",
            borderColor: "border-[#FFD6AD]",
            delay: 0.2
        },
        {
            icon: "/doller/2.png",
            amount: "$1.00",
            description: "Funds the weekly pizza prize for lucky winners like you",
            borderColor: "border-[#E9D5FF]",
            delay: 0.3
        },
        {
            icon: "/doller/3.png",
            amount: "$0.00",
            description: "Covers platform costs to keep donations flowing",
            borderColor: "border-[#D1FAE5]",
            delay: 0.4
        }
    ];

    return (
        <section className="py-24 bg-[#FFFAF6] relative overflow-hidden">
            {/* Floating Decorative Elements - Matching background items in the image */}
            <div className="absolute top-24 right-[33%] opacity-20 transform -rotate-12 select-none pointer-events-none hidden lg:block">
                <span className="text-5xl filter grayscale brightness-110 contrast-50 opacity-30">🎲</span>
            </div>
            <div className="absolute top-36 right-[38%] w-3 h-3 bg-yellow-400 rounded-full blur-[0.5px] opacity-80 hidden lg:block" />
            <div className="absolute bottom-[20%] right-[15%] w-3 h-3 bg-orange-200 rounded-full animate-pulse hidden lg:block" />

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <AnimationWrapper animationType="fadeUp">
                        <h2 className="text-3xl md:text-[40px] font-black text-[#1A202C] mb-4 tracking-tight leading-tight">
                            Every Dollar Makes a Difference
                        </h2>
                    </AnimationWrapper>
                    <AnimationWrapper animationType="fadeUp" delay={0.1}>
                        <p className="text-gray-500 text-lg md:text-xl font-medium opacity-80">
                            Here's exactly how your $1 ticket helps our community
                        </p>
                    </AnimationWrapper>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <AnimationWrapper
                            key={index}
                            animationType="fadeUp"
                            delay={card.delay}
                            className="h-full"
                        >
                            <div className={`bg-white p-10 rounded-4xl border-2 ${card.borderColor} flex flex-col items-center text-center h-full shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.05)] transition-all duration-500 group relative`}>
                                <div className="w-20 h-20 bg-[#FFF2E6] rounded-full flex items-center justify-center mb-10 text-4xl group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                    <span className="transform -translate-y-0.5">
                                        <Image src={card.icon} alt="icon" width={50} height={50} className='w-full h-full object-contain' />
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold font-inter text-[#1A202C] mb-8 leading-none">
                                    {card.amount}
                                </h3>
                                <p className="text-[#4A5568] text-base leading-relaxed font-medium max-w-60">
                                    {card.description}
                                </p>
                            </div>
                        </AnimationWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;
