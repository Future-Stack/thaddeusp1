"use client";

import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import Link from 'next/link';
import { useRegions } from '@/hooks/useRegions';
import { Region } from '@/services/region.service';

interface RegionCardProps {
    name: string;
    users: number;
    vendors: number;
    events: number;
    updatedAt: string;
    isActive?: boolean;
    canSelectWinner?: boolean;
    delay: number;
}

const RegionCard: React.FC<RegionCardProps> = ({
    name, users, vendors, events, updatedAt, isActive = true, canSelectWinner = false, delay
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
                    <span className="text-gray-400">Users:</span>
                    <span className="text-[#111827] font-bold">{users}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-400">Vendors:</span>
                    <span className="text-[#111827] font-bold">{vendors}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-400">Events:</span>
                    <span className="text-[#111827] font-bold">{events}</span>
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
                <span className="text-[10px] text-gray-400">Updated at {new Date(updatedAt).toLocaleDateString()}</span>
            </div>
        </div>
    </AnimationWrapper>
);

const SkeletonCard = () => (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col animate-pulse">
        <div className="flex justify-between items-center mb-6">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
            <div className="h-5 w-16 bg-gray-100 rounded-full"></div>
        </div>
        <div className="flex-1 space-y-3 mb-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                    <div className="h-3 w-20 bg-gray-100 rounded"></div>
                    <div className="h-3 w-8 bg-gray-200 rounded"></div>
                </div>
            ))}
        </div>
        <div className="space-y-3">
            <div className="h-10 w-full bg-gray-100 rounded-lg"></div>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-center">
            <div className="h-3 w-40 bg-gray-50 rounded"></div>
        </div>
    </div>
);

const RegionOverview = () => {
    const { data, isLoading, isError, error, refetch } = useRegions();

    if (isLoading) {
        return (
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-[#111827]">Region Overview</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-red-500 font-medium mb-4">Error loading regions: {(error as Error).message}</p>
                <button 
                    onClick={() => refetch()}
                    className="px-4 py-2 bg-[#111827] text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    const regions = data?.data || [];

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
                {regions.map((region: Region, index: number) => (
                    <RegionCard 
                        key={region.id} 
                        name={region.name}
                        users={region._count.users}
                        vendors={region._count.vendors}
                        events={region._count.events}
                        updatedAt={region.updatedAt}
                        canSelectWinner={index % 3 === 2} // Mimicking the original logic for demo
                        delay={0.6 + index * 0.1} 
                    />
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
