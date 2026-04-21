import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';

const HowItWorks = () => {
    const steps = [
        {
            number: "1",
            title: "Buy Tickets",
            description: "Purchase tickets for $1 each in your local pool",
            icon: "🎟️",
        },
        {
            number: "2",
            title: "Weekly Draw",
            description: "Every Sunday we select one lucky winner per city",
            icon: "🎲",
        },
        {
            number: "3",
            title: "Win Pizza!",
            description: "Winners get a large pizza voucher at top local spots",
            icon: "🍕",
        }
    ];

    return (
        <section className="relative py-24 bg-[#FFFAF6] overflow-hidden">
            {/* Background Decorative Elements - matches the orange dots in the image */}
            <div className="absolute top-40 left-[15%] w-3 h-3 bg-[#FFB088] rounded-full opacity-60 animate-pulse" />
            <div className="absolute top-20 left-[25%] w-4 h-4 bg-[#FFD4B8] rounded-full opacity-40" />
            <div className="absolute bottom-40 right-[10%] w-3 h-3 bg-[#FFB088] rounded-full opacity-40 animate-pulse" />
            <div className="absolute bottom-20 left-[5%] w-5 h-5 bg-[#FFE8D1] rounded-full opacity-30" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <AnimationWrapper animationType="fadeUp" delay={0.1}>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1A202C] mb-4 tracking-tight">
                            Win Free Pizza Every Week
                        </h2>
                    </AnimationWrapper>
                    <AnimationWrapper animationType="fadeUp" delay={0.2}>
                        <p className="text-xl text-gray-500 font-medium mb-10">
                            Join your local lottery for just $1 per ticket
                        </p>
                    </AnimationWrapper>

                    <AnimationWrapper animationType="scaleUp" delay={0.3}>
                        <button className="px-10 py-4 bg-[#FF4D00] text-white font-bold rounded-xl shadow-[0_10px_40px_-10px_rgba(255,77,0,0.5)] hover:shadow-[0_15px_50px_-5px_rgba(255,77,0,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden">
                            <span className="relative z-10 text-lg">Join Your City's Draw</span>
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </AnimationWrapper>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <AnimationWrapper
                            key={index}
                            animationType="fadeUp"
                            delay={0.4 + index * 0.1}
                            className="h-full"
                        >
                            <div className="bg-white p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col items-center text-center h-full hover:shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-500 group">
                                <div className="text-6xl mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-out">
                                    <div className="w-24 h-24 flex items-center justify-center rounded-2xl bg-[#FFF5F0] group-hover:bg-[#FFE8DE] transition-colors duration-500">
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-extrabold text-[#1A202C] mb-4 leading-tight">
                                    <span className="text-[#FF4D00] mr-2">{step.number}.</span>
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                    {step.description}
                                </p>
                            </div>
                        </AnimationWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
