"use client"
import AnimationWrapper from '@/components/AnimationWrapper';
import { useGetUsersStats } from '@/hooks/useUser';

const UserStats = () => {
    const { data: statsData, isLoading, isError } = useGetUsersStats();
    const stats = statsData?.data || { totalUsers: 0, totalTickets: 0, totalDraws: 0 };

    const statCards = [
        {
            title: 'Total users',
            value: stats.totalUsers,
            bgColor: 'bg-[#EEF4FF]',
            titleColor: 'text-[#4F46E5]',
            valueColor: 'text-[#1E1B4B]',
            delay: 0.1,
        },
        {
            title: 'Total Tickets',
            value: stats.totalTickets,
            bgColor: 'bg-[#E6F9F1]',
            titleColor: 'text-[#059669]',
            valueColor: 'text-[#064E3B]',
            delay: 0.2,
        },
        {
            title: 'Total Draw',
            value: stats.totalDraws,
            bgColor: 'bg-[#F5F3FF]',
            titleColor: 'text-[#7C3AED]',
            valueColor: 'text-[#4C1D95]',
            delay: 0.3,
        },
    ];

    if (isError) {
        return (
            <div className="text-center py-4 text-red-500 bg-red-50 rounded-xl mb-8 border border-red-100">
                Failed to load statistics
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {isLoading 
                ? [...Array(3)].map((_, index) => (
                    <div key={index} className="bg-gray-50 animate-pulse rounded-2xl p-8 h-full min-h-[140px] flex flex-col justify-between shadow-sm border border-gray-100">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))
                : statCards.map((stat, index) => (
                    <AnimationWrapper
                        key={index}
                        animationType="fadeUp"
                        delay={stat.delay}
                    >
                        <div className={`${stat.bgColor} rounded-2xl p-8 h-full min-h-[140px] flex flex-col justify-between shadow-sm transition-transform hover:scale-[1.02] duration-300`}>
                            <span className={`${stat.titleColor} text-sm font-semibold mb-2`}>
                                {stat.title}
                            </span>
                            <h2 className={`${stat.valueColor} text-4xl font-bold`}>
                                {stat.value.toLocaleString()}
                            </h2>
                        </div>
                    </AnimationWrapper>
                ))
            }
        </div>
    );
};

export default UserStats;
