"use client";

import React, { useState } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import WinnerModal from './WinnerModal';

interface RegionStatsCardProps {
    regionName: string;
    drawWeek: string;
    totalTickets: number;
    poolTotal: string;
    participants: number;
}

const RegionStatsCard: React.FC<RegionStatsCardProps> = ({
    regionName,
    drawWeek,
    totalTickets,
    poolTotal,
    participants,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
                <AnimationWrapper animationType="fadeRight" delay={0.3}>
                    <h2 className="text-xl font-bold text-[#111827]">Region Overview</h2>
                </AnimationWrapper>
                <AnimationWrapper animationType="fadeLeft" delay={0.3}>
                    <div className="relative">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white hover:bg-gray-50 transition-colors">
                            {regionName}
                            <ChevronDownIcon />
                        </button>
                    </div>
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
                            className="bg-[#FF4D00] hover:bg-[#E64500] text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-orange-200 active:scale-95"
                        >
                            Select Winner
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total Tickets */}
                        <div className="bg-[#F0F7FF] rounded-2xl p-6 border border-blue-50">
                            <span className="text-blue-500 text-xs font-bold block mb-2">Total Tickets</span>
                            <span className="text-[#111827] text-3xl font-extrabold">{totalTickets}</span>
                        </div>

                        {/* Pool Total */}
                        <div className="bg-[#F0FFF7] rounded-2xl p-6 border border-green-50">
                            <span className="text-green-500 text-xs font-bold block mb-2">Pool Total</span>
                            <span className="text-[#111827] text-3xl font-extrabold">{poolTotal}</span>
                        </div>

                        {/* Participants */}
                        <div className="bg-[#FAF5FF] rounded-2xl p-6 border border-purple-50">
                            <span className="text-purple-500 text-xs font-bold block mb-2">Participants</span>
                            <span className="text-[#111827] text-3xl font-extrabold">{participants}</span>
                        </div>
                    </div>
                </div>
            </AnimationWrapper>

            <WinnerModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                regionName={regionName}
            />
        </div>
    );
};

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);

export default RegionStatsCard;

