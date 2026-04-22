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
        image: '/winner/winner.png', // Fallback or reusing existing
        quote: "Honestly, I entered the Win a Pizza raffle on a whim, but it turned into something I really look forward to every week. I'm based in Boston, and I love that it's not just about winning a free large pizza (which is awesome on its own), but also about giving back. Knowing that part of the effort helps support local homeless shelters makes it feel ."
    },
    {
        id: 2,
        name: 'Alex Johnson',
        location: 'Chicago, Winner',
        date: 'April 12, 2026',
        image: '/winner/winner.png',
        quote: "I've been playing for a few weeks now, and it's such a fun way to contribute to a good cause. Winning was just the icing on the cake! The process is seamless, and the community impact is real. Highly recommend everyone to give it a shot at least once."
    },
    {
        id: 3,
        name: 'Sarah Williams',
        location: 'Austin, Winner',
        date: 'April 15, 2026',
        image: '/winner/winner.png',
        quote: "What I love most about this platform is the transparency. You know exactly where your dollar goes. And the pizza? Absolutely delicious! It's rare to find such a win-win situation where you can help people and also get a chance to win something great."
    }
];

const RecentWinners = () => {
    return (
        <section className="py-24 bg-[#FFFAF6] relative overflow-hidden">
            {/* Background Decorative Patterns */}
            {/* Top Right Dots */}
            <div className="absolute -top-10 -right-10   pointer-events-none hidden lg:block">
                 <Image src="/winner/right.png" alt="ok" width={150} height={310} className='w-full h-auto'/>
            </div>

            {/* Bottom Left Ripple */}
            <div className="absolute bottom-0 left-0 w-87.5 h-87.5  pointer-events-none hidden lg:block">
                
                <div className="absolute    ">
                            <Image src="/winner/left.png" alt="ok" width={350} height={350} className='w-full h-auto'/>
                    </div>
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
                    <AnimationWrapper animationType="scaleUp" delay={0.1} className="flex justify-center gap-4">
                        <div>
                             <Image src="/winner/headicon.png" alt="headicon" width={274} height={20} className='w-full h-full'/>
                        </div>
                    </AnimationWrapper>
                </div>

                {/* Slider Container */}
                <div className="max-w-6xl mx-auto overflow-hidden ">
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
                                    <div className="bg-[#FFFEFB] py-25 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 relative overflow-hidden">
                                        {/* Left Side: Winner Info */}
                                        <div className="w-full md:w-1/4 text-center md:text-left">
                                            <h3 className="text-2xl lg:text-3xl font-black text-[#0D3B54CC] mb-2">
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
                                            <div className="w-37.5 h-37.5  rounded-full border-2 border-dashed border-[#FF8A65] p-3 animate-pulse-slow">
                                                <div className="w-full h-full rounded-full overflow-hidden relative">
                                                    <Image
                                                        src={winner.image}
                                                        alt={winner.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                          
                                        </div>

                                        {/* Right Side: Quote */}
                                        <div className="flex-1 relative">
                                            <div className="absolute top-0 -left-6 mr-4 opacity-20 pointer-events-none">
                                                 <Image src="/winner/quote.png" alt="qoute" width={40} height={40}/>
                                            </div>
                                            <blockquote className="max-w-125 text-[#3D6276] text-lg lg:text-[16px] font-normal ml-5 italic leading-relaxed relative z-10">
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
