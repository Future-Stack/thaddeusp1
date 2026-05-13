"use client"
import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import { useDashboardStats } from '@/hooks/useDashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { Ticket, DollarSign, LayoutDashboard, Users, AlertCircle } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    delay: number;
    isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBg, iconColor, delay, isLoading }) => (
    <AnimationWrapper animationType="scaleUp" delay={delay} className="flex-1 min-w-[200px]">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
            <div className="flex justify-between items-start mb-4">
                <span className="text-gray-500 text-sm font-medium">{title}</span>
                <div className={`p-2 rounded-full ${iconBg} ${iconColor}`}>
                    {icon}
                </div>
            </div>
            {isLoading ? (
                <Skeleton className="h-9 w-24 bg-gray-100" />
            ) : (
                <div className="text-3xl font-bold text-[#111827]">{value}</div>
            )}
        </div>
    </AnimationWrapper>
);

const DashboardStats = () => {
    const { data: statsData, isLoading, isError, error } = useDashboardStats();
    
    const dashboardStats = statsData?.data?.data;

    const stats = [
        {
            title: 'Total Tickets Sold',
            value: dashboardStats?.totalTicketsSold?.toLocaleString() || '0',
            icon: <Ticket className="w-5 h-5" />,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-500',
        },
        {
            title: 'Total Revenue',
            value: `$${dashboardStats?.totalRevenue?.toLocaleString() || '0'}`,
            icon: <DollarSign className="w-5 h-5" />,
            iconBg: 'bg-green-50',
            iconColor: 'text-green-500',
        },
        {
            title: 'Total Events',
            value: dashboardStats?.totalEvents?.toLocaleString() || '0',
            icon: <LayoutDashboard className="w-5 h-5" />,
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-500',
        },
        {
            title: 'Total Users',
            value: dashboardStats?.totalUsers?.toLocaleString() || '0',
            icon: <Users className="w-5 h-5" />,
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-500',
        },
    ];

    if (isError) {
        return (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-center gap-4 text-red-600 mb-8">
                <AlertCircle className="w-6 h-6" />
                <div>
                    <h3 className="font-bold">Failed to load statistics</h3>
                    <p className="text-sm opacity-80">{(error as any)?.response?.data?.message || (error as any)?.message || 'Something went wrong'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <StatCard 
                    key={stat.title} 
                    {...stat} 
                    delay={index * 0.1} 
                    isLoading={isLoading}
                />
            ))}
        </div>
    );
};

export default DashboardStats;
