import React from 'react';
import WinnerSelectionHeader from './_components/WinnerSelectionHeader';
import RegionStatsCard from './_components/RegionStatsCard';
import TicketPoolTable from './_components/TicketPoolTable';

export default function SelectWinnersPage() {
    return (
        <div className="w-full">
            <WinnerSelectionHeader />

            <RegionStatsCard
                regionName="New York"
                drawWeek="April 14-20, 2026"
                totalTickets={312}
                poolTotal="$312"
                participants={5}
            />

            <TicketPoolTable />
        </div>
    );
}
