"use client";

import React, { use } from 'react';
import WinnerSelectionHeader from '../_components/WinnerSelectionHeader';
import RegionStatsCard from '../_components/RegionStatsCard';
import TicketPoolTable from '../_components/TicketPoolTable';

export default function SelectWinnersPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    return (
        <div className="w-full">
            <WinnerSelectionHeader />

            <RegionStatsCard
                eventId={slug}
                regionName="New York"
                drawWeek="April 14-20, 2026"
            />

            <TicketPoolTable eventId={slug} />
        </div>
    );
}
