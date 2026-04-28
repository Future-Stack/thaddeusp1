import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import Link from 'next/link';

interface RegionCardProps {
    name: string;
    ticketsSold: string;
    poolTotal: string;
    lastDraw: string;
    isActive?: boolean;
    canSelectWinner?: boolean;
    delay: number;
}

const RegionCard: React.FC<RegionCardProps> = ({
    name, ticketsSold, poolTotal, lastDraw, isActive = true, canSelectWinner = false, delay
}) => (
    <AnimationWrapper animationType="fadeUp" delay={delay} className="h-full">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative group overflow-hidden h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#111827]">{name}</h3>
                {isActive && (
                    <span className="bg-[#E7F9F0] text-[#10B981] text-[10px] font-bold px-3 py-1 rounded-full">
                        Active
                    </span>
                )}
            </div>

            <div className="flex-1 space-y-3 mb-6">
                <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-400">Tickets Sold:</span>
                    <span className="text-[#111827] font-bold">{ticketsSold}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-400">Pool Total:</span>
                    <span className="text-[#111827] font-bold">{poolTotal}</span>
                </div>
            </div>

            <div className="space-y-3">
                {canSelectWinner && (
                    <button className="w-full bg-[#111827] text-white py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                        <WinnersIcon />
                        Select Winner Now
                    </button>
                )}
                <Link href="/admin/select-winners" className="w-full block text-center bg-[#F3F4F6] text-[#4B5563] py-2.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">
                    View Details
                </Link>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-center">
                <span className="text-[10px] text-gray-400">Draw Was completed {lastDraw}</span>
            </div>
        </div>
    </AnimationWrapper>
);

const RegionOverview = () => {
    const regions = [
        { name: 'New York', ticketsSold: '$312', poolTotal: '$312', lastDraw: 'April 14, 2026', canSelectWinner: false },
        { name: 'New York', ticketsSold: '$312', poolTotal: '$312', lastDraw: 'April 14, 2026', canSelectWinner: false },
        { name: 'New York', ticketsSold: '$312', poolTotal: '$312', lastDraw: 'April 14, 2026', canSelectWinner: true },
        { name: 'New York', ticketsSold: '$312', poolTotal: '$312', lastDraw: 'April 14, 2026', canSelectWinner: false },
        { name: 'New York', ticketsSold: '$312', poolTotal: '$312', lastDraw: 'April 14, 2026', canSelectWinner: false },
        { name: 'New York', ticketsSold: '$312', poolTotal: '$312', lastDraw: 'April 14, 2026', canSelectWinner: true },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#111827]">Region Overview</h2>
                <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white hover:bg-gray-50 transition-colors">
                        New York
                        <ChevronDownIcon />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regions.map((region, index) => (
                    <RegionCard key={index} {...region} delay={0.6 + index * 0.1} />
                ))}
            </div>
        </div>
    );
};

const WinnersIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
);

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);

export default RegionOverview;
