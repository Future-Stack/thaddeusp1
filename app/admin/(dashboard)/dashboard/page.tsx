import React from 'react';
import DashboardStats from './_components/DashboardStats';
import QuickActions from './_components/QuickActions';
import RegionOverview from './_components/RegionOverview';

export default function DashboardPage() {
    return (
        <div className="flex flex-col">
            <DashboardStats />
            <QuickActions />
            <RegionOverview />
        </div>
    );
}
