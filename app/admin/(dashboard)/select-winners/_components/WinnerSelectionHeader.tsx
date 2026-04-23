"use client";

import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';

const WinnerSelectionHeader = () => {
    return (
        <div className="mb-8">
            <AnimationWrapper animationType="fadeDown" delay={0.1}>
                <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-1">Select Lottery Winners</h1>
            </AnimationWrapper>
            <AnimationWrapper animationType="fadeDown" delay={0.2}>
                <p className="text-gray-500 text-sm">Manage all lottery draws and special events</p>
            </AnimationWrapper>
        </div>
    );
};

export default WinnerSelectionHeader;
