"use client"
import AnimationWrapper from '@/components/AnimationWrapper';
import { useRevenueStats } from '@/hooks/useRevenue';
import { Skeleton } from '@/components/ui/skeleton';

const RevenueStats = () => {
    const { data: response, isLoading, isError } = useRevenueStats();
    const data = response?.data;

    const stats = [
        {
            title: 'Total Tickets',
            value: data ? data.totalTickets.toLocaleString() : '0',
            bgColor: 'bg-[#EEF4FF]',
            titleColor: 'text-[#4F46E5]',
            valueColor: 'text-[#1E1B4B]',
            delay: 0.1,
        },
        {
            title: 'Gross Revenue',
            value: data ? `$${data.grossRevenue.toLocaleString()}` : '$0',
            bgColor: 'bg-[#E6F9F1]',
            titleColor: 'text-[#059669]',
            valueColor: 'text-[#064E3B]',
            delay: 0.2,
        },
        {
            title: 'Net Profit',
            value: data ? `$${data.netProfit.toLocaleString()}` : '$0',
            bgColor: 'bg-[#F5F3FF]',
            titleColor: 'text-[#7C3AED]',
            valueColor: 'text-[#4C1D95]',
            delay: 0.3,
        },
        {
            title: 'Donations (10%)',
            value: data ? `$${(data.grossRevenue * 0.1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00',
            bgColor: 'bg-[#FFF7ED]',
            titleColor: 'text-[#EA580C]',
            valueColor: 'text-[#7C2D12]',
            delay: 0.4,
        },
    ];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-6 h-full min-h-[120px] flex flex-col justify-between border border-gray-100 shadow-sm">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-10 w-24 mt-2" />
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 rounded-2xl p-6 mb-8 border border-red-100 text-center shadow-sm">
                <p className="text-red-500 font-medium">Failed to load revenue statistics. Please refresh the page.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <AnimationWrapper 
                    key={index} 
                    animationType="fadeUp" 
                    delay={stat.delay}
                >
                    <div className={`${stat.bgColor} rounded-2xl p-6 h-full min-h-[120px] flex flex-col justify-between shadow-sm border border-white/50`}>
                        <span className={`${stat.titleColor} text-xs font-bold uppercase tracking-wider mb-2`}>
                            {stat.title}
                        </span>
                        <h2 className={`${stat.valueColor} text-4xl font-extrabold tracking-tight`}>
                            {stat.value}
                        </h2>
                    </div>
                </AnimationWrapper>
            ))}
        </div>
    );
};

export default RevenueStats;
