import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBg, iconColor, delay }) => (
    <AnimationWrapper animationType="scaleUp" delay={delay} className="flex-1 min-w-[200px]">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <span className="text-gray-500 text-sm font-medium">{title}</span>
                <div className={`p-2 rounded-full ${iconBg} ${iconColor}`}>
                    {icon}
                </div>
            </div>
            <div className="text-3xl font-bold text-[#111827]">{value}</div>
        </div>
    </AnimationWrapper>
);

const DashboardStats = () => {
    const stats = [
        {
            title: 'Tickets Sold This Week',
            value: '1,247',
            icon: <TicketIcon />,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-500',
        },
        {
            title: 'Total Revenue',
            value: '$1,247',
            icon: <RevenueIcon />,
            iconBg: 'bg-green-50',
            iconColor: 'text-green-500',
        },
        {
            title: 'Active Regions',
            value: '8',
            icon: <RegionIcon />,
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-500',
        },
        {
            title: 'Pending Selections',
            value: '2',
            icon: <PendingIcon />,
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-500',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <StatCard key={stat.title} {...stat} delay={index * 0.1} />
            ))}
        </div>
    );
};

const TicketIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg>
);

const RevenueIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
);

const RegionIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const PendingIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
);

export default DashboardStats;
