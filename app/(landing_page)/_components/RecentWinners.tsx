"use client";

import React from 'react';
import Image from 'next/image';
import AnimationWrapper from '@/components/AnimationWrapper';
import { useGetReviews } from '@/hooks/useReviews';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const WinnerSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#FFFEFB] p-8 md:p-10 rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] flex flex-col relative overflow-hidden">
                <div className="flex items-start gap-5 mb-6">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-200 p-2 shrink-0">
                        <Skeleton className="w-full h-full rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0 py-1 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-3 w-1/3" />
                    </div>
                    <div className="w-10 h-10 shrink-0 ml-auto">
                        <Skeleton className="w-8 h-8 rounded-full ml-auto" />
                    </div>
                </div>
                <div className="space-y-2 mt-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </div>
        ))}
    </div>
);

const RecentWinners = () => {
    const { data, isLoading, isError } = useGetReviews(1, 10);
    const reviews = data?.data?.data || [];
    const displayedReviews = reviews.slice(0, 4);

    return (
        <section className="py-24 bg-[#FFFAF6] relative overflow-hidden">
            {/* Background Decorative Patterns */}
            {/* Top Right Dots */}
            <div className="absolute -top-10 -right-10 pointer-events-none hidden lg:block">
                <Image src="/winner/right.png" alt="ok" width={150} height={310} className='w-full h-auto' />
            </div>

            {/* Bottom Left Ripple */}
            <div className="absolute bottom-0 left-0 w-87.5 h-87.5 pointer-events-none hidden lg:block">
                <div className="absolute ">
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

                {/* Grid Container */}
                <div className="max-w-6xl mx-auto overflow-hidden">
                    <AnimationWrapper animationType="fadeUp" delay={0.2}>
                        {isLoading ? (
                            <WinnerSkeleton />
                        ) : isError ? (
                            <div className="text-center py-20 text-red-500 font-semibold bg-white rounded-3xl shadow-sm">
                                Failed to load recent winners. Please try again later.
                            </div>
                        ) : displayedReviews.length === 0 ? (
                            <div className="text-center py-20 text-gray-500 font-semibold bg-white rounded-3xl shadow-sm">
                                No winners yet. Be the first one!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-16">
                                {displayedReviews.map((winner: any, index: number) => (
                                    <AnimationWrapper key={winner.id || index} animationType="fadeUp" delay={0.1 * (index + 1)}>
                                        <div className="bg-[#FFFEFB] p-8 md:p-10 rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] flex flex-col relative overflow-hidden h-full border border-gray-100/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                                            {/* Top Header: Winner Info & Avatar */}
                                            <div className="flex items-start gap-5 mb-6">
                                                {/* Avatar with Dashed Border */}
                                                <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#FF8A65] p-2 shrink-0 animate-pulse-slow">
                                                    <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-100">
                                                        <Image
                                                            src={winner.user?.profileImg || '/profile.webp'}
                                                            alt={winner.user?.fullName || 'Winner'}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Name, Location, Date */}
                                                <div className="flex-1 min-w-0 py-1">
                                                    <h3 className="text-xl md:text-2xl font-black text-[#0D3B54CC] mb-1 truncate">
                                                        {winner.user?.fullName || 'Anonymous'}
                                                    </h3>
                                                    {/* <p className="text-sm font-semibold text-[#3D6276] mb-1">
                                                        {winner.user?.city ? `${winner.user.city}. Winner` : 'Boston. Winner'}
                                                    </p> */}
                                                    <p className="text-xs text-gray-400">
                                                        ( {format(new Date(winner.createdAt || Date.now()), 'MMMM d, yyyy')} )
                                                    </p>
                                                </div>

                                                {/* Quote Icon */}
                                                <div className="relative w-10 h-10 shrink-0 ml-auto self-start">
                                                    <Image
                                                        src="/winner/quote.png"
                                                        alt="quote"
                                                        width={40}
                                                        height={40}
                                                        className="object-contain opacity-40"
                                                    />
                                                </div>
                                            </div>

                                            {/* Bottom: Testimonial Text */}
                                            <blockquote className="text-[#3D6276] text-base font-normal italic leading-relaxed relative z-10 flex-1">
                                                "{winner.text}"
                                            </blockquote>
                                        </div>
                                    </AnimationWrapper>
                                ))}
                            </div>
                        )}
                    </AnimationWrapper>
                </div>
            </div>

            <style jsx global>{`
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
