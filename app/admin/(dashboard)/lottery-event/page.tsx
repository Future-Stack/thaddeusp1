"use client";

import React, { useState, useMemo } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import { motion } from 'framer-motion';
import CreateEventModal from '../dashboard/_components/CreateEventModal';
import EditEventModal from './_components/EditEventModal';
import DeleteConfirmModal from './_components/DeleteConfirmModal';
import { useEvents, useDeleteEvent } from '@/hooks/useEvents';
import { Event } from '@/services/event.service';
import { Loader2, Trash2 } from 'lucide-react';

type EventStatus = 'Active' | 'Upcoming' | 'Completed';

const getEventStatus = (event: Event): EventStatus => {
    const now = new Date();
    const drawDate = new Date(event.drawDate);
    const ticketOpen = new Date(event.ticketOpen);

    if (now < ticketOpen) return 'Upcoming';
    if (now > drawDate) return 'Completed';
    return 'Active';
};



const LotteryEventPage = () => {
    const [activeTab, setActiveTab] = useState<'All' | EventStatus>('All');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

    const { data: eventsData, isLoading, isError, refetch } = useEvents();
    const { mutate: deleteEvent, isPending: isDeleting } = useDeleteEvent();
    const events = eventsData?.data || [];

    const filteredEvents = useMemo(() => {
        if (activeTab === 'All') return events;
        return events.filter(event => getEventStatus(event) === activeTab);
    }, [events, activeTab]);

    const tabs = [
        { id: 'All', label: 'All Events', count: events.length },
        { id: 'Active', label: 'Active', count: events.filter(e => getEventStatus(e) === 'Active').length },
        { id: 'Upcoming', label: 'Upcoming', count: events.filter(e => getEventStatus(e) === 'Upcoming').length },
        { id: 'Completed', label: 'Completed', count: events.filter(e => getEventStatus(e) === 'Completed').length },
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
                <div className="flex flex-nowrap gap-8 overflow-x-auto ">
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
                {isLoading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <SkeletonLoader key={i} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="p-12 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-red-500 font-medium mb-4">Failed to load events</p>
                        <button
                            onClick={() => refetch()}
                            className="bg-[#111827] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                        <AnimationWrapper key={event.id} animationType="fadeUp" delay={0.1 * index}>
                            <EventCard
                                event={event}
                                onEdit={(e) => {
                                    setEditingEvent(e);
                                    setIsEditModalOpen(true);
                                }}
                                onDelete={(e) => {
                                    setEventToDelete(e);
                                    setIsDeleteModalOpen(true);
                                }}
                            />
                        </AnimationWrapper>
                    ))
                ) : (
                    <div className="p-12 text-center bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-500">
                        No events found for this category.
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <CreateEventModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />

            {/* Edit Modal */}
            {editingEvent && (
                <EditEventModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    event={editingEvent as any} // Cast for compatibility with old interface
                    onSave={() => {
                        refetch();
                        setIsEditModalOpen(false);
                    }}
                />
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => {
                    if (eventToDelete) {
                        deleteEvent(eventToDelete.id, {
                            onSuccess: () => setIsDeleteModalOpen(false)
                        });
                    }
                }}
                isPending={isDeleting}
                title="Delete Event"
                message={`Are you sure you want to delete "${eventToDelete?.name}"? This action cannot be undone and will remove all associated data.`}
            />
        </div>
    );
};

const SkeletonLoader = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
            <div className="space-y-2">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-100 rounded"></div>
            </div>
            <div className="flex gap-2">
                <div className="h-8 w-20 bg-gray-100 rounded-lg"></div>
                <div className="h-8 w-28 bg-gray-100 rounded-lg"></div>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-50 rounded-xl"></div>
            ))}
        </div>
        <div className="pt-4 border-t border-gray-50 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                    <div className="h-3 w-16 bg-gray-100 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
            ))}
        </div>
    </div>
);

const EventCard = ({ event, onEdit, onDelete }: {
    event: Event;
    onEdit: (event: Event) => void;
    onDelete: (event: Event) => void;
}) => {
    const handleSelectWinner = () => {
        alert(`Selecting winner for ${event.name}...`);
    };

    const status = getEventStatus(event);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="p-6 space-y-6">
                {/* Card Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-[#111827]">{event.name}</h3>
                            <StatusBadge status={status} />
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                            <LocationIcon />
                            <span>{event.region?.name || 'Unknown Location'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onEdit(event)}
                            className="bg-[#F3F4F6] text-[#4B5563] px-5 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                            Edit
                        </button>
                        {status === 'Active' && (
                            <button
                                onClick={handleSelectWinner}
                                className="bg-[#111827] text-white px-5 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                            >
                                Select Winner
                            </button>
                        )}
                        <button
                            onClick={() => onDelete(event)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Event"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatBox
                        label="Draw Date"
                        value={new Date(event.drawDate).toLocaleDateString()}
                        bgColor="bg-[#F0F7FF]"
                        textColor="text-[#2563EB]"
                    />
                    <StatBox
                        label="Tickets Sold"
                        value={`0 / ${event.maxTickets}`} // Mocked as response missing sold count
                        bgColor="bg-[#F0FDF4]"
                        textColor="text-[#16A34A]"
                    />
                    <StatBox
                        label="Revenue"
                        value={`$0.00`} // Mocked as response missing revenue
                        bgColor="bg-[#FAF5FF]"
                        textColor="text-[#7C3AED]"
                    />
                    <StatBox
                        label="Prize Value"
                        value={`$${Number(event.prizeValue).toLocaleString()}`}
                        bgColor="bg-[#FFF7ED]"
                        textColor="text-[#EA580C]"
                    />
                </div>

                {/* Footer Info */}
                <div className="pt-4 border-t border-gray-50 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Sales Open</p>
                        <p className="text-sm font-semibold text-[#111827]">{new Date(event.ticketOpen).toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Sales Close</p>
                        <p className="text-sm font-semibold text-[#111827]">{new Date(event.ticketClose).toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Ticket Price</p>
                        <p className="text-sm font-semibold text-[#111827]">${Number(event.ticketPrice).toFixed(2)}</p>
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
