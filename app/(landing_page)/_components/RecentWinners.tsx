"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import AnimationWrapper from '@/components/AnimationWrapper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const winners = [
    {
        id: 1,
        name: 'Megan Clayton',
        location: 'Boston, Winner',
        date: 'April 6, 2026',
        image: '/images/story1.png', // Fallback or reusing existing
        quote: "Honestly, I entered the Win a Pizza raffle on a whim, but it turned into something I really look forward to every week. I'm based in Boston, and I love that it's not just about winning a free large pizza (which is awesome on its own), but also about giving back. Knowing that part of the effort helps support local homeless shelters makes it feel like I'm part of something bigger. Even when I don't win, it still feels like a win. And when I did win once? Best pizza I've had in a while."
    },
    {
        id: 2,
        name: 'Alex Johnson',
        location: 'Chicago, Winner',
        date: 'April 12, 2026',
        image: '/images/story2.png',
        quote: "I've been playing for a few weeks now, and it's such a fun way to contribute to a good cause. Winning was just the icing on the cake! The process is seamless, and the community impact is real. Highly recommend everyone to give it a shot at least once."
    },
    {
        id: 3,
        name: 'Sarah Williams',
        location: 'Austin, Winner',
        date: 'April 15, 2026',
        image: '/images/story3.png',
        quote: "What I love most about this platform is the transparency. You know exactly where your dollar goes. And the pizza? Absolutely delicious! It's rare to find such a win-win situation where you can help people and also get a chance to win something great."
    }
];

const RecentWinners = () => {
    return (
        <section className="py-24 bg-[#FFFAF6] relative overflow-hidden">
            {/* Background Decorative Patterns */}
            {/* Top Right Dots */}
            <div className="absolute -top-10 -right-10 w-64 h-64 opacity-[0.08] pointer-events-none hidden lg:block">
                <div className="grid grid-cols-8 gap-4 p-8">
                    {[...Array(64)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-gray-400 rounded-full" />
                    ))}
                </div>
            </div>

            {/* Bottom Left Ripple */}
            <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] opacity-[0.05] pointer-events-none hidden lg:block">
                <div className="absolute inset-0 border border-gray-400 rounded-full" />
                <div className="absolute inset-8 border border-gray-400 rounded-full" />
                <div className="absolute inset-16 border border-gray-400 rounded-full" />
                <div className="absolute inset-24 border border-gray-400 rounded-full" />
                <div className="absolute inset-0 m-auto w-[60%] h-[60%] border-2 border-dashed border-[#FF8A65] rounded-full animate-spin-slow opacity-20" />
            </div>

            {/* Floating Dots in top left */}
            <div className="absolute top-20 left-10 w-32 h-32 opacity-[0.05] pointer-events-none hidden lg:block">
                <div className="grid grid-cols-4 gap-4">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-[#9370DB] rounded-full" />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <AnimationWrapper animationType="fadeUp">
                        <h2 className="text-4xl md:text-[42px] font-black text-[#1A202C] mb-6 tracking-tight flex items-center justify-center gap-3">
                            Recent Winners <span className="text-4xl">🥳</span>
                        </h2>
                    </AnimationWrapper>

                    {/* Ornament (Consistent with other sections) */}
                    <AnimationWrapper animationType="scaleUp" delay={0.1} className="flex items-center justify-center gap-4">
                        <div className="flex flex-col gap-1.5">
                            <div className="h-[1.5px] w-12 md:w-20 bg-[#FFE5D3]" />
                            <div className="h-[1.5px] w-10 md:w-16 bg-[#FFE5D3]" />
                        </div>
                        <div className="flex items-center -space-x-2">
                            <div className="w-6 h-6 rounded-full border-[3px] border-[#FF8A65] flex items-center justify-center bg-white">
                                <div className="w-1.5 h-1.5 bg-[#FF8A65] rounded-full" />
                            </div>
                            <div className="w-6 h-6 rounded-full border-[3px] border-[#9370DB] flex items-center justify-center bg-white rotate-45">
                                <div className="w-1.5 h-1.5 bg-[#9370DB] rounded-full" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5 items-end">
                            <div className="h-[1.5px] w-12 md:w-20 bg-[#FFE5D3]" />
                            <div className="h-[1.5px] w-10 md:w-16 bg-[#FFE5D3]" />
                        </div>
                    </AnimationWrapper>
                </div>

                {/* Slider Container */}
                <div className="max-w-5xl mx-auto">
                    <AnimationWrapper animationType="fadeUp" delay={0.2}>
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            className="winners-swiper pb-16"
                        >
                            {winners.map((winner) => (
                                <SwiperSlide key={winner.id}>
                                    <div className="bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 relative overflow-hidden">
                                        {/* Left Side: Winner Info */}
                                        <div className="w-full md:w-1/4 text-center md:text-left">
                                            <h3 className="text-2xl lg:text-3xl font-black text-[#2D3748] mb-2">
                                                {winner.name}
                                            </h3>
                                            <p className="text-[#718096] text-lg font-semibold mb-1">
                                                {winner.location}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                ( {winner.date} )
                                            </p>
                                        </div>

                                        {/* Center: Image with Dashed Border */}
                                        <div className="relative shrink-0">
                                            <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full border-2 border-dashed border-[#FF8A65] p-3 animate-pulse-slow">
                                                <div className="w-full h-full rounded-full overflow-hidden relative">
                                                    <Image
                                                        src={winner.image}
                                                        alt={winner.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                            {/* Small decorative circles around image */}
                                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#FFB26B] rounded-full" />
                                            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#9370DB] rounded-full" />
                                        </div>

                                        {/* Right Side: Quote */}
                                        <div className="flex-1 relative">
                                            <div className="absolute -top-10 -left-6 opacity-20 pointer-events-none">
                                                <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.8571 0V20.5714H0V60H34.2857V0H22.8571ZM68.5714 0V20.5714H45.7143V60H80V0H68.5714Z" fill="#718096" />
                                                </svg>
                                            </div>
                                            <blockquote className="text-[#4A5568] text-lg lg:text-xl font-medium italic leading-relaxed relative z-10">
                                                "{winner.quote}"
                                            </blockquote>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </AnimationWrapper>
                </div>
            </div>

            <style jsx global>{`
                .winners-swiper .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: #FF8A65;
                    opacity: 0.3;
                    transition: all 0.3s ease;
                }
                .winners-swiper .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 30px;
                    border-radius: 5px;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default RecentWinners;
