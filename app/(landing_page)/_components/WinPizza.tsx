import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import Link from 'next/link';

const WinPizza = () => {
    const steps = [
        {
            number: "1",
            title: " Buy Tickets",
            description: "Purchase tickets for $1 each in your local pool",
            icon: "/pizza/ticket.png",
        },
        {
            number: "2",
            title: " Weekly Draw",
            description: "Every Sunday we select one lucky winner per city",
            icon: "/ludo.gif",
        },
        {
            number: "3",
            title: " Win Pizza!",
            description: "Winners get a large pizza voucher at top local spots",
            icon: "/pizza/winn.png",
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
                        <Link href="/location" className="px-10 py-4 bg-[#FF4D00] text-white font-bold rounded-xl  cursor-pointer hover:scale-110 transition-all duration-300 overflow-hidden"
                            style={{
                                boxShadow: '0 0 39.992px 0 rgba(251, 146, 60, 0.80)'
                            }}
                        >
                            Join Your City's Draw

                        </Link>
                    </AnimationWrapper>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 container mx-auto">
                    {steps.map((step, index) => (
                        <AnimationWrapper
                            key={index}
                            animationType="fadeUp"
                            delay={0.4 + index * 0.1}
                            className="h-full"
                        >
                            <div className="bg-white p-10 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col items-center text-center h-full hover:shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-500 group">
                                <div className="text-6xl mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-out">
                                    <div className="w-24 h-24 flex items-center justify-center rounded-2xl  transition-colors duration-500 overflow-hidden">

                                        <img src={step.icon} alt={step.title} className="  object-contain" />

                                    </div>
                                </div>
                                <h3 className="text-[24px] font-semibold font-inter text-[#1A202C] mb-4 leading-tight">
                                    {step.number}.
                                    {step.title}
                                </h3>
                                <p className="text-[#4A5565] text-lg leading-relaxed font-normal font-inter">
                                    {step.description}
                                </p>
                            </div>
                        </AnimationWrapper>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default WinPizza;
