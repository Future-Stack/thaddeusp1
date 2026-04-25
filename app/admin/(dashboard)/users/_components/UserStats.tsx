import AnimationWrapper from '@/components/AnimationWrapper';

const UserStats = () => {
    const stats = [
        {
            title: 'Total users',
            value: '3120',
            bgColor: 'bg-[#EEF4FF]',
            titleColor: 'text-[#4F46E5]',
            valueColor: 'text-[#1E1B4B]',
            delay: 0.1,
        },
        {
            title: 'Total Tickets',
            value: '6120',
            bgColor: 'bg-[#E6F9F1]',
            titleColor: 'text-[#059669]',
            valueColor: 'text-[#064E3B]',
            delay: 0.2,
        },
        {
            title: 'Total Draw',
            value: '5',
            bgColor: 'bg-[#F5F3FF]',
            titleColor: 'text-[#7C3AED]',
            valueColor: 'text-[#4C1D95]',
            delay: 0.3,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
                <AnimationWrapper 
                    key={index} 
                    animationType="fadeUp" 
                    delay={stat.delay}
                >
                    <div className={`${stat.bgColor} rounded-2xl p-8 h-full min-h-[140px] flex flex-col justify-between shadow-sm`}>
                        <span className={`${stat.titleColor} text-sm font-semibold mb-2`}>
                            {stat.title}
                        </span>
                        <h2 className={`${stat.valueColor} text-4xl font-bold`}>
                            {stat.value}
                        </h2>
                    </div>
                </AnimationWrapper>
            ))}
        </div>
    );
};

export default UserStats;
