"use client";

import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';

interface AdminHeaderProps {
    setIsOpen: (isOpen: boolean) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ setIsOpen }) => {
    return (
        <header className="py-4 md:py-6 px-4 md:px-8 flex items-center justify-between bg-[#F4F9FF] border-b border-gray-100 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                {/* Hamburger Menu for Mobile */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                    <MenuIcon />
                </button>

                <AnimationWrapper animationType="fadeDown" delay={0.1}>
                    <h1 className="text-xl md:text-2xl font-bold text-[#111827]">Welcome to Admin Panel</h1>
                </AnimationWrapper>
            </div>
            
            {/* Optional: Add user profile or notifications here if needed */}
        </header>
    );
};

const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

export default AdminHeader;
