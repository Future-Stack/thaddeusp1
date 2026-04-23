"use client";

import React, { useState } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import CreateEventModal from './CreateEventModal';

const QuickActions = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <>
            <AnimationWrapper animationType="fadeUp" delay={0.4} className="mb-8">
                <div className="bg-[#F8FBFF] rounded-2xl p-6 border border-[#E5EFFF] relative">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-[#111827] mb-1">Quick Actions</h2>
                            <p className="text-gray-500 text-xs">Manage draws and communicate with participants</p>
                        </div>
                        <div className="flex items-center gap-2 bg-[#FFF4E5] px-3 py-1.5 rounded-full border border-[#FFE7C7]">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                            <span className="text-orange-600 text-[10px] font-bold">2 regions ready for draw</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#111827] text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                        >
                            <PlusIcon />
                            Create Events
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[#111827] rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                            <WinnersIcon />
                            Select Winners for All Pending
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[#111827] rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                            <ViewIcon />
                            View All Entries
                        </button>
                    </div>
                </div>
            </AnimationWrapper>

            <CreateEventModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
            />
        </>
    );
};

const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const WinnersIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
);

const ViewIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

export default QuickActions;
