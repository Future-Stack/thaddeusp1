"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import AnimationWrapper from '@/components/AnimationWrapper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { useGetReviews } from '@/hooks/useReviews';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';




const WinnerSkeleton = () => (
    <div className="bg-[#FFFEFB] py-25 rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 relative overflow-hidden">
        <div className="w-full md:w-1/4 text-center md:text-left">
            <Skeleton className="h-8 w-3/4 mb-2 mx-auto md:mx-0" />
            <Skeleton className="h-4 w-1/3 mx-auto md:mx-0" />
        </div>
        <div className="relative shrink-0">
            <div className="w-37.5 h-37.5 rounded-full border-2 border-dashed border-gray-200 p-3">
                <Skeleton className="w-full h-full rounded-full" />
            </div>
        </div>
        <div className="flex-1 relative">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    </div>
);

const RecentWinners = () => {
    const { data, isLoading, isError } = useGetReviews(1, 10);
    const reviews = data?.data?.data || [];

    return (
        <section className="py-24 bg-[#FFFAF6] relative overflow-hidden">
            {/* Background Decorative Patterns */}
            {/* Top Right Dots */}
            <div className="absolute -top-10 -right-10   pointer-events-none hidden lg:block">
                <Image src="/winner/right.png" alt="ok" width={150} height={310} className='w-full h-auto' />
            </div>

            {/* Bottom Left Ripple */}
            <div className="absolute bottom-0 left-0 w-87.5 h-87.5  pointer-events-none hidden lg:block">

                <div className="absolute    ">
                    <Image src="/winner/left.png" alt="ok" width={350} height={350} className='w-full h-auto' />
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
                            Testimonials <span className="text-4xl">🥳</span>
                        </h2>
                    </AnimationWrapper>

                    {/* Ornament (Consistent with other sections) */}
                    <AnimationWrapper animationType="scaleUp" delay={0.1} className="flex justify-center gap-4">
                        <div>
                            <Image src="/winner/headicon.png" alt="headicon" width={274} height={20} className='w-full h-full' />
                        </div>
                    </AnimationWrapper>
                </div>

                {/* Slider Container */}
                <div className="max-w-6xl mx-auto overflow-hidden ">
                    <AnimationWrapper animationType="fadeUp" delay={0.2}>
                        {isLoading ? (
                            <WinnerSkeleton />
                        ) : isError ? (
                            <div className="text-center py-20 text-red-500 font-semibold bg-white rounded-3xl shadow-sm">
                                Failed to load recent winners. Please try again later.
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-20 text-gray-500 font-semibold bg-white rounded-3xl shadow-sm">
                                No winners yet. Be the first one!
                            </div>
                        ) : (
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                spaceBetween={30}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                className="winners-swiper pb-16"
                            >
                                {reviews.map((winner: any) => (
                                    <SwiperSlide key={winner.id}>
                                        <div className="bg-[#FFFEFB] py-25 rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 relative overflow-hidden">
                                            {/* Left Side: Winner Info */}
                                            <div className="w-full md:w-1/4 text-center md:text-left">
                                                <h3 className="text-2xl lg:text-3xl font-black text-[#0D3B54CC] mb-2">
                                                    {winner.user.fullName}
                                                </h3>
                                                <p className="text-gray-400 text-sm">
                                                    ( {format(new Date(winner.createdAt), 'MMMM d, yyyy')} )
                                                </p>
                                            </div>

                                            {/* Center: Image with Dashed Border */}
                                            <div className="relative shrink-0">
                                                <div className="w-37.5 h-37.5  rounded-full border-2 border-dashed border-[#FF8A65] p-3 animate-pulse-slow">
                                                    <div className="w-full h-full rounded-full overflow-hidden relative">
                                                        <Image
                                                            src={winner.user.profileImg || '/profile.webp'}
                                                            alt={winner.user.fullName}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                            {/* Right Side: Quote */}
                                            <div className="flex-1 relative">
                                                <div className="absolute top-0 -left-6 mr-4 opacity-20 pointer-events-none">
                                                    <Image src="/winner/quote.png" alt="qoute" width={40} height={40} />
                                                </div>
                                                <blockquote className="max-w-125 text-[#3D6276] text-lg lg:text-[16px] font-normal ml-5 italic leading-relaxed relative z-10">
                                                    "{winner.text}"
                                                </blockquote>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
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
