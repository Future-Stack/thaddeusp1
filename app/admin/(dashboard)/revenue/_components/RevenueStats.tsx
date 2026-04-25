import AnimationWrapper from '@/components/AnimationWrapper';

const RevenueStats = () => {
    const stats = [
        {
            title: 'Total Tickets',
            value: '832',
            bgColor: 'bg-[#EEF4FF]',
            titleColor: 'text-[#4F46E5]',
            valueColor: 'text-[#1E1B4B]',
            delay: 0.1,
        },
        {
            title: 'Gross Revenue',
            value: '$832',
            bgColor: 'bg-[#E6F9F1]',
            titleColor: 'text-[#059669]',
            valueColor: 'text-[#064E3B]',
            delay: 0.2,
        },
        {
            title: 'Net Profit',
            value: '$682',
            bgColor: 'bg-[#F5F3FF]',
            titleColor: 'text-[#7C3AED]',
            valueColor: 'text-[#4C1D95]',
            delay: 0.3,
        },
        {
            title: 'Donations (10%)',
            value: '$83.20',
            bgColor: 'bg-[#FFF7ED]',
            titleColor: 'text-[#EA580C]',
            valueColor: 'text-[#7C2D12]',
            delay: 0.4,
        },
    ];

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
