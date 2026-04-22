import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';

const HowItWorksNew = () => {
    const steps = [
        {
            number: "1",
            title: "Buy Tickets & Give Back",
            description: "Purchase tickets for $1 each. Every ticket feeds someone in need while giving you a chance to win.",
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
            )
        },
        {
            number: "2",
            title: "Weekly Draw",
            description: "Every Sunday at midnight, we randomly select winners from your city's pool. Everyone who bought helps those in need!",
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
            )
        },
        {
            number: "3",
            title: "Win & Make Impact",
            description: "Winners get a delicious pizza voucher, and everyone who participated helped feed someone in need. Win-win!",
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect width="20" height="5" x="2" y="7" />
                    <line x1="12" x2="12" y1="22" y2="7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7Z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z" />
                </svg>
            )
        }
    ];

    return (
        <section className="py-24 bg-[#FFFBF5]">
            <div className="container mx-auto px-4 max-w-6xl">
                <AnimationWrapper animationType="fadeUp" className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                        How It Works
                    </h2>
                </AnimationWrapper>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {steps.map((step, index) => (
                        <AnimationWrapper
                            key={index}
                            animationType="fadeUp"
                            delay={index * 0.15}
                            className="h-full"
                        >
                            <div className="bg-white p-10 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F5F5F5] flex flex-col items-center text-center h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300">
                                <div className="w-20 h-20 bg-[#FFF0E6] rounded-full flex items-center justify-center mb-8">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#1A1A1A] mb-5">
                                    {step.number}. {step.title}
                                </h3>
                                <p className="text-[#666666] leading-[1.6] text-[15px] md:text-base">
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

export default HowItWorksNew;
