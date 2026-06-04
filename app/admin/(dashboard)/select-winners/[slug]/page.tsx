"use client";

import React, { use } from 'react';
import WinnerSelectionHeader from '../_components/WinnerSelectionHeader';
import RegionStatsCard from '../_components/RegionStatsCard';
import TicketPoolTable from '../_components/TicketPoolTable';
import { useEvent } from '@/hooks/useEvents';
import { Loader2 } from 'lucide-react';

export default function SelectWinnersPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { data: eventData, isLoading } = useEvent(slug);
    const event = eventData?.data;



    if (isLoading) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#FF4D00]" />
                <p className="text-gray-500 font-medium">Loading event details...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <WinnerSelectionHeader />

            <RegionStatsCard
                eventId={slug}
                eventName={event?.name}
                drawDate={event?.drawDate}
                regionName={event?.region?.name || 'Unknown'}
                eventStatus={event?.status}
            />

            <TicketPoolTable eventId={slug} />
        </div>
    );
}
