"use client";

import React, { useState } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import { motion } from 'framer-motion';
import CreateEventModal from '../dashboard/_components/CreateEventModal';

type EventStatus = 'Active' | 'Upcoming' | 'Completed';

interface LotteryEvent {
    id: string;
    title: string;
    status: EventStatus;
    location: string;
    drawDate: string;
    ticketsSold: number;
    totalTickets: number;
    revenue: number;
    prizeValue: number;
    salesOpen: string;
    salesClose: string;
    ticketPrice: number;
    winner?: string;
}

const mockEvents: LotteryEvent[] = [
    {
        id: '1',
        title: 'Spring Pizza Week',
        status: 'Active',
        location: 'New York',
        drawDate: 'May 1, 2026',
        ticketsSold: 87,
        totalTickets: 500,
        revenue: 87.00,
        prizeValue: 25,
        salesOpen: '22/04/2026, 00:00:00',
        salesClose: '30/04/2026, 23:59:00',
        ticketPrice: 1.00
    },
    {
        id: '2',
        title: 'Spring Pizza Week',
        status: 'Upcoming',
        location: 'New York',
        drawDate: 'May 1, 2026',
        ticketsSold: 87,
        totalTickets: 500,
        revenue: 87.00,
        prizeValue: 25,
        salesOpen: '22/04/2026, 00:00:00',
        salesClose: '30/04/2026, 23:59:00',
        ticketPrice: 1.00
    },
    {
        id: '3',
        title: 'Spring Pizza Week',
        status: 'Completed',
        location: 'New York',
        drawDate: 'May 1, 2026',
        ticketsSold: 87,
        totalTickets: 500,
        revenue: 87.00,
        prizeValue: 25,
        salesOpen: '22/04/2026, 00:00:00',
        salesClose: '30/04/2026, 23:59:00',
        ticketPrice: 1.00,
        winner: 'Sarah M. 🎉'
    }
];

const LotteryEventPage = () => {
    const [activeTab, setActiveTab] = useState<'All' | EventStatus>('All');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const filteredEvents = activeTab === 'All'
        ? mockEvents
        : mockEvents.filter(event => event.status === activeTab);

    const tabs = [
        { id: 'All', label: 'All Events', count: mockEvents.length },
        { id: 'Active', label: 'Active', count: mockEvents.filter(e => e.status === 'Active').length },
        { id: 'Upcoming', label: 'Upcoming', count: mockEvents.filter(e => e.status === 'Upcoming').length },
        { id: 'Completed', label: 'Completed', count: mockEvents.filter(e => e.status === 'Completed').length },
    ];

    return (
        <div className="w-full py-6 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <AnimationWrapper animationType="fadeRight">
                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#111827]">Lottery Events</h1>
                        <p className="text-gray-500 text-sm">Manage all lottery draws and special events</p>
                    </div>
                </AnimationWrapper>

                <AnimationWrapper animationType="fadeLeft">
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-[#111827] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
                    >
                        <PlusIcon />
                        <span className="font-semibold text-sm">Create New Event</span>
                    </button>
                </AnimationWrapper>
            </div>

            {/* Tabs Section */}
            <div className="border-b border-gray-200">
                <div className="flex gap-8 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`pb-4 text-sm font-medium transition-all relative min-w-max ${activeTab === tab.id
                                ? 'text-[#FF4D12]'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label} ({tab.count})
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4D12]"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Events List */}
            <div className="space-y-6">
                {filteredEvents.map((event, index) => (
                    <AnimationWrapper key={event.id} animationType="fadeUp" delay={index * 0.1}>
                        <EventCard event={event} />
                    </AnimationWrapper>
                ))}
            </div>

            {/* Modal */}
            <CreateEventModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
            />
        </div>
    );
};

const EventCard = ({ event }: { event: LotteryEvent }) => {
    const handleSelectWinner = () => {
        alert(`Selecting winner for ${event.title}...`);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 space-y-6">
                {/* Card Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-[#111827]">{event.title}</h3>
                            <StatusBadge status={event.status} />
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                            <LocationIcon />
                            <span>{event.location}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="bg-[#2563EB] text-white px-5 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                            Edit
                        </button>
                        {event.status === 'Active' && (
                            <button 
                                onClick={handleSelectWinner}
                                className="bg-[#FF4D12] text-white px-5 py-1.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                            >
                                Select Winner
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatBox
                        label="Draw Date"
                        value={event.drawDate}
                        bgColor="bg-[#F0F7FF]"
                        textColor="text-[#2563EB]"
                    />
                    <StatBox
                        label="Tickets Sold"
                        value={`${event.ticketsSold} / ${event.totalTickets}`}
                        bgColor="bg-[#F0FDF4]"
                        textColor="text-[#16A34A]"
                    />
                    <StatBox
                        label="Revenue"
                        value={`$${event.revenue.toFixed(2)}`}
                        bgColor="bg-[#FAF5FF]"
                        textColor="text-[#7C3AED]"
                    />
                    <StatBox
                        label="Prize Value"
                        value={`$${event.prizeValue}`}
                        bgColor="bg-[#FFF7ED]"
                        textColor="text-[#EA580C]"
                    />
                </div>

                {/* Footer Info */}
                <div className="pt-4 border-t border-gray-50 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Sales Open</p>
                        <p className="text-sm font-semibold text-[#111827]">{event.salesOpen}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Sales Close</p>
                        <p className="text-sm font-semibold text-[#111827]">{event.salesClose}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Ticket Price</p>
                        <p className="text-sm font-semibold text-[#111827]">${event.ticketPrice.toFixed(2)}</p>
                    </div>
                </div>

                {/* Winner Section */}
                {event.winner && (
                    <div className="mt-4 bg-[#FFFBEB] p-4 rounded-xl flex items-center gap-2 border border-[#FEF3C7]">
                        <span className="text-sm font-bold text-[#92400E]">Winner:</span>
                        <span className="text-sm text-[#B45309]">{event.winner}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const StatBox = ({ label, value, bgColor, textColor }: { label: string, value: string, bgColor: string, textColor: string }) => (
    <div className={`${bgColor} rounded-xl p-4 space-y-1`}>
        <p className={`text-xs ${textColor} opacity-80 font-medium`}>{label}</p>
        <p className={`text-lg font-bold ${textColor}`}>{value}</p>
    </div>
);

const StatusBadge = ({ status }: { status: EventStatus }) => {
    const styles = {
        Active: 'bg-[#DCFCE7] text-[#16A34A]',
        Upcoming: 'bg-[#DBEAFE] text-[#2563EB]',
        Completed: 'bg-[#F3F4F6] text-gray-600'
    };
    return (
        <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold ${styles[status]}`}>
            {status}
        </span>
    );
};

// Icons
const PlusIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const LocationIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#FF4D12]"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
);

export default LotteryEventPage;
