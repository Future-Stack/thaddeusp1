"use client";

import React, { useState } from 'react';
import Sidebar from '../_components/Sidebar';
import AdminHeader from '../_components/AdminHeader';
import RoleGuard from '@/components/auth/RoleGuard';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <RoleGuard allowedRole="ADMIN">
            <div className="flex min-h-screen bg-white relative">
                {/* Sidebar - Desktop & Mobile */}
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    <AdminHeader setIsOpen={setIsSidebarOpen} />
                    <main className="flex-1 mt-4 px-4 md:px-8 pb-8">
                        {children}
                    </main>
                </div>
            </div>
        </RoleGuard>
    );
}
