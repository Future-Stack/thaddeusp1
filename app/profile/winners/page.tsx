"use client";

import { useState } from 'react';
import Image from 'next/image';
import AnimationWrapper from '@/components/AnimationWrapper';
import { useGetWinners } from '@/hooks/useDraws';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

interface Winner {
    id: string;
    name: string;
    profileImg: string;
    address: string;
    winDate: string;
    prize: string;
    eventName: string;
    isLastWinner: boolean;
}

const WinnersPage = () => {
    const [page, setPage] = useState(1);
    const limit = 16;

    const { data: winnersData, isLoading, isError, error } = useGetWinners(page, limit);

    const winners: Winner[] = winnersData?.data?.data || [];
    const meta = winnersData?.data?.meta;

    // Find the last winner for the hero section
    const thisWeeksWinner = winners.find(w => w.isLastWinner);

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error loading winners</h2>
                    <p className="text-gray-600">{(error as any)?.message || 'Something went wrong'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen selection:bg-[#FF5100]/10 ">
            {/* Hero Section */}
            <section className="py-9.25 md:px-8 relative overflow-hidden rounded-[10px]"
                style={{
                    background: "linear-gradient(90deg, #FF6900 0%, #F54900 100%)"
                }}
            >
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

                        {isLoading ? (
                            <AnimationWrapper animationType="scaleUp" delay={0.2}>
                                <div className="max-w-2xl mx-auto px-8 py-5.5 border border-white/20 rounded-[10px] bg-white/10">
                                    <Skeleton className="h-8 w-48 mx-auto mb-4 bg-white/20" />
                                    <Skeleton className="h-6 w-32 mx-auto mb-6 bg-white/20" />
                                    <div className="w-full h-px bg-white/50 mb-4 mx-auto"></div>
                                    <Skeleton className="h-6 w-64 mx-auto mb-3 bg-white/20" />
                                    <Skeleton className="h-4 w-40 mx-auto bg-white/20" />
                                </div>
                            </AnimationWrapper>
                        ) : thisWeeksWinner ? (
                            <AnimationWrapper animationType="scaleUp" delay={0.2}>
                                <div className="max-w-2xl mx-auto px-8 py-5.5 text-white border border-white/20 "
                                    style={{
                                        borderRadius: '10px',
                                        background: 'rgba(255, 255, 255, 0.10)'
                                    }}
                                >
                                    <h2 className="text-xl md:text-[30px] font-bold mb-1 leading-none">{thisWeeksWinner.name}</h2>
                                    <p className="text-white text-lg md:text-xl mb-4">{thisWeeksWinner.address}</p>

                                    <div className="w-full h-px bg-white/50 mb-4 mx-auto"></div>

                                    <div className="space-y-3">
                                        <p className="text-xl md:text-[18px] tracking-tight">{thisWeeksWinner.eventName} - Prize: {thisWeeksWinner.prize}</p>
                                        <p className="text-white text-sm">Draw Date: {format(new Date(thisWeeksWinner.winDate), 'MMMM dd, yyyy')}</p>
                                    </div>
                                </div>
                            </AnimationWrapper>
                        ) : (
                            <div className="text-white opacity-60">No winner announced yet this week.</div>
                        )}

                        <AnimationWrapper animationType="fadeUp" delay={0.4} className="mt-14">
                            <button className="bg-white text-[#FF5100] px-12 py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
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
                        {isLoading ? (
                            Array(8).fill(0).map((_, i) => (
                                <div key={i} className="bg-white rounded-[14px] p-4 flex items-center gap-4 border border-gray-100">
                                    <Skeleton className="w-14 h-14 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                </div>
                            ))
                        ) : winners.length > 0 ? (
                            winners.map((winner, i) => (
                                <AnimationWrapper key={winner.id} animationType="fadeUp" delay={i * 0.04}>
                                    <div className="bg-white rounded-[14px] p-4 flex items-center gap-4 group cursor-pointer relative overflow-hidden"
                                        style={{
                                            border: '1px solid rgba(0, 0, 0, 0.10)'
                                        }}
                                    >
                                        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-gray-50 border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-500">
                                            <Image
                                                src={winner.profileImg || '/user.png'}
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
                                                    {format(new Date(winner.winDate), 'MMM dd')}
                                                </span>
                                            </div>
                                            <p className="text-[11px] font-bold text-gray-400 truncate tracking-wide">{winner.address}</p>
                                        </div>
                                    </div>
                                </AnimationWrapper>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                No past winners found.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {meta && meta.totalPages > 1 && (
                        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-gray-50">
                            <p className="text-sm font-bold text-gray-400">
                                Showing <span className="text-[#1A202C]">{(page - 1) * limit + 1}–{Math.min(page * limit, meta.total)}</span> of <span className="text-[#1A202C]">{meta.total}</span> winners
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-8 py-3.5 text-sm font-black text-[#4A5568] bg-[#F7FAFC] border border-gray-100 rounded-2xl hover:bg-gray-100 active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                                    disabled={page === meta.totalPages}
                                    className="px-8 py-3.5 text-sm font-black text-white bg-[#1A202C] rounded-2xl hover:bg-black active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default WinnersPage;