"use client";

import React, { useState } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import WinnerModal from './WinnerModal';
import { useEventAdminStats } from '@/hooks/useEvents';
import { Skeleton } from '@/components/ui/skeleton';

interface RegionStatsCardProps {
    eventId: string;
    regionName: string;
    drawWeek: string;
}

const RegionStatsCard: React.FC<RegionStatsCardProps> = ({
    eventId,
    regionName,
    drawWeek,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: statsData, isLoading, isError } = useEventAdminStats(eventId);

    const stats = statsData?.data;

    return (
        <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
                <AnimationWrapper animationType="fadeRight" delay={0.3}>
                    <h2 className="text-xl font-bold text-[#111827]">Event Overview</h2>
                </AnimationWrapper>
            
            </div>

            <AnimationWrapper animationType="fadeUp" delay={0.4}>
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-[#111827] mb-1">{regionName} Pool</h3>
                            <p className="text-gray-400 text-sm">Draw Week: {drawWeek}</p>
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#FF4D00] hover:bg-[#E64500] text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-orange-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading || isError}
                        >
                            Select Winner
                        </button>
                    </div>

                    {isError ? (
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center text-red-500">
                            Failed to load statistics. Please try again later.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Total Tickets */}
                            <div className="bg-[#F0F7FF] rounded-2xl p-6 border border-blue-50">
                                <span className="text-blue-500 text-xs font-bold block mb-2">Total Tickets</span>
                                {isLoading ? (
                                    <Skeleton className="h-9 w-20 bg-blue-100" />
                                ) : (
                                    <span className="text-[#111827] text-3xl font-extrabold">{stats?.totalTickets || 0}</span>
                                )}
                            </div>

                            {/* Pool Total */}
                            <div className="bg-[#F0FFF7] rounded-2xl p-6 border border-green-50">
                                <span className="text-green-500 text-xs font-bold block mb-2">Pool Total</span>
                                {isLoading ? (
                                    <Skeleton className="h-9 w-20 bg-green-100" />
                                ) : (
                                    <span className="text-[#111827] text-3xl font-extrabold">${stats?.poolTotal || 0}</span>
                                )}
                            </div>

                            {/* Participants */}
                            <div className="bg-[#FAF5FF] rounded-2xl p-6 border border-purple-50">
                                <span className="text-purple-500 text-xs font-bold block mb-2">Participants</span>
                                {isLoading ? (
                                    <Skeleton className="h-9 w-20 bg-purple-100" />
                                ) : (
                                    <span className="text-[#111827] text-3xl font-extrabold">{stats?.totalParticipants || 0}</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </AnimationWrapper>

            <WinnerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                regionName={regionName}
                eventId={eventId}
                drawWeek={drawWeek}
            />
        </div>
    );
};

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);

export default RegionStatsCard;

