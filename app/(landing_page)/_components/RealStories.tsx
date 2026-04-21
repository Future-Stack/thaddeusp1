"use client";

import React from 'react';
import Image from 'next/image';
import AnimationWrapper from '@/components/AnimationWrapper';

const stories = [
    {
        id: 1,
        type: 'image',
        src: '/images/story1.png',
        className: 'w-48 h-48 md:w-64 md:h-64',
        blobClass: 'rounded-[60%_40%_30%_70%/60%_30%_70%_40%] overflow-hidden border-8 border-[#0D7A80]',
        delay: 0.1,
    },
    {
        id: 2,
        type: 'card',
        title: 'Safe Inc. of Schenectady',
        address: '1344 Albany St',
        position: 'bottom', // card is below the line
        delay: 0.2,
    },
    {
        id: 3,
        type: 'card',
        title: 'Fish Inc.-Dunellen',
        address: '450 New Market Rd',
        position: 'top', // card is above the line
        delay: 0.3,
    },
    {
        id: 4,
        type: 'image',
        src: '/images/story2.png',
        className: 'w-40 h-40 md:w-56 md:h-56',
        blobClass: 'rounded-[30%_70%_70%_30%/50%_40%_60%_50%] overflow-hidden border-8 border-[#FFB26B]',
        delay: 0.4,
    },
    {
        id: 5,
        type: 'image',
        src: '/images/story3.png',
        className: 'w-44 h-44 md:w-60 md:h-60',
        blobClass: 'rounded-[50%_50%_20%_80%/25%_80%_20%_75%] overflow-hidden border-8 border-[#2D3748]',
        delay: 0.5,
    },
    {
        id: 6,
        type: 'card',
        title: 'Star Gospel Mission of Charleston',
        address: '474 Meeting St',
        position: 'bottom',
        delay: 0.6,
    },
    {
        id: 7,
        type: 'card',
        title: 'Pine Street Inn of Boston',
        address: '444 Harrison Ave',
        position: 'top',
        delay: 0.7,
    },
    {
        id: 8,
        type: 'image',
        src: '/images/story4.png',
        className: 'w-40 h-40 md:w-56 md:h-56',
        blobClass: 'rounded-[70%_30%_50%_50%/30%_30%_70%_70%] overflow-hidden border-8 border-[#FF7A59]',
        delay: 0.8,
    }
];

const RealStories = () => {
    return (
        <section className="py-24 bg-[#FFFCF8] relative overflow-hidden min-h-[800px]">
            {/* Background Line */}
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-40 mix-blend-multiply">
                <Image
                    src="/line.png"
                    alt="Decorative line"
                    fill
                    className="object-contain"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <AnimationWrapper animationType="fadeUp">
                        <h2 className="text-4xl md:text-[42px] font-black text-[#1A202C] mb-4 tracking-tight">
                            Real Stories, Real Impact
                        </h2>
                    </AnimationWrapper>
                    <AnimationWrapper animationType="fadeUp" delay={0.1}>
                        <p className="text-gray-500 text-lg font-medium opacity-80">
                            Meet some of the people your tickets have helped
                        </p>
                    </AnimationWrapper>

                    {/* Ornament */}
                    <AnimationWrapper animationType="scaleUp" delay={0.2} className="flex items-center justify-center gap-3 mt-8">
                        <div className="flex flex-col gap-1.5">
                            <div className="h-[1.5px] w-12 md:w-16 bg-[#FFE5D3]" />
                            <div className="h-[1.5px] w-10 md:w-14 bg-[#FFE5D3]" />
                        </div>
                        <div className="flex items-center -space-x-2">
                            <div className="w-5 h-5 rounded-full border-[3px] border-[#FF8A65] flex items-center justify-center bg-white">
                                <div className="w-1 h-1 bg-[#FF8A65] rounded-full" />
                            </div>
                            <div className="w-5 h-5 rounded-full border-[3px] border-[#9370DB] flex items-center justify-center bg-white">
                                <div className="w-1 h-1 bg-[#9370DB] rounded-full" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5 items-end">
                            <div className="h-[1.5px] w-12 md:w-16 bg-[#FFE5D3]" />
                            <div className="h-[1.5px] w-10 md:w-14 bg-[#FFE5D3]" />
                        </div>
                    </AnimationWrapper>
                </div>

                {/* Desktop Layout - Absolute Positioning for Wavy Effect */}
                <div className="relative max-w-7xl mx-auto h-[650px] hidden lg:block">
                    {/* Item 1: Blob Top Left */}
                    <StoryItem item={stories[0]} className="absolute left-[0%] top-[12%]" />

                    {/* Item 2: Card Bottom Left */}
                    <StoryItem item={stories[1]} className="absolute left-[12%] top-[62%]" />

                    {/* Item 3: Card Top Mid-Left */}
                    <StoryItem item={stories[2]} className="absolute left-[28%] top-[8%]" />

                    {/* Item 4: Blob Bottom Mid-Left */}
                    <StoryItem item={stories[3]} className="absolute left-[30%] top-[52%]" />

                    {/* Item 5: Blob Top Mid-Right */}
                    <StoryItem item={stories[4]} className="absolute left-[48%] top-[10%]" />

                    {/* Item 6: Card Bottom Mid-Right */}
                    <StoryItem item={stories[5]} className="absolute left-[46%] top-[65%]" />

                    {/* Item 7: Card Top Right */}
                    <StoryItem item={stories[6]} className="absolute left-[65%] top-[8%]" />

                    {/* Item 8: Blob Bottom Right */}
                    <StoryItem item={stories[7]} className="absolute left-[65%] top-[55%]" />
                </div>

                {/* Mobile/Tablet Layout - Stacked Grid */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-16 px-4 pb-20">
                    {stories.map((item) => (
                        <div key={item.id} className="flex justify-center">
                            <StoryItem item={item} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative Dots Pattern - matches bottom right of image */}
            <div className="absolute bottom-10 right-10 grid grid-cols-5 gap-3 opacity-20 pointer-events-none md:grid">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-[#D1D5DB] rounded-full" />
                ))}
            </div>
        </section>
    );
};





const StoryItem = ({ item, className = "" }: { item: any, className?: string }) => {
    if (item.type === 'image') {
        return (
            <AnimationWrapper
                animationType="scaleUp"
                delay={item.delay}
                className={`${className} flex flex-col items-center group`}
            >
                <div className={`${item.className} ${item.blobClass} shadow-xl relative transition-transform duration-500 group-hover:scale-105`}>
                    <Image
                        src={item.src}
                        alt="Success story"
                        fill
                        className="object-cover"
                    />
                </div>
            </AnimationWrapper>
        );
    }

    return (
        <AnimationWrapper
            animationType="fadeUp"
            delay={item.delay}
            className={`${className} group`}
        >
            <div className={`
                bg-white p-8 rounded-3xl border border-orange-100/50 shadow-[0_10px_30px_rgba(0,0,0,0.04)]
                min-w-[240px] max-w-[280px] relative transition-all duration-300 group-hover:-translate-y-2
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
            `}>
                {/* Secondary Border Effect */}
                <div className="absolute inset-1 rounded-[22px] border border-orange-50/50 pointer-events-none" />

                {/* Center Pointer Arrow */}
                <div className={`
                    absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-white border border-orange-100/50 rotate-45 z-[-1]
                    ${item.position === 'top' ? 'bottom-[-10px]' : 'top-[-10px]'}
                `} />

                <div className="text-center">
                    <h4 className="text-[19px] font-bold text-[#2D3748] mb-1.5 leading-tight">
                        {item.title}
                    </h4>
                    <p className="text-[#A0AEC0] text-[13px] font-semibold uppercase tracking-wider">
                        {item.address}
                    </p>
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default RealStories;
