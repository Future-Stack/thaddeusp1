import React from 'react';
import Image from 'next/image';
import AnimationWrapper from '@/components/AnimationWrapper';

const Hero = () => {
    return (
        <section className="relative pt-40 pb-50 w-full  flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/banner.jpg"
                    alt="People sharing pizza"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-4xl">
                    {/* Badge */}
                    <AnimationWrapper animationType="fadeDown" delay={0.1}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 transition-transform hover:scale-105 cursor-default group">
                            <span className="text-yellow-400 group-hover:rotate-12 transition-transform">🏆</span>
                            <span className="text-white text-sm font-medium tracking-wide font-inter">Make a Difference Today</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 ml-1 animate-pulse" />
                        </div>
                    </AnimationWrapper>

                    {/* Heading */}
                    <AnimationWrapper animationType="fadeRight" delay={0.2}>
                        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight font-inter mb-6">
                            Win Pizza, <br />
                            <span className="text-[#F5C400]">Feed Hope</span>
                        </h1>
                    </AnimationWrapper>

                    {/* Description */}
                    <AnimationWrapper animationType="fadeRight" delay={0.3}>
                        <p className="text-lg md:text-[28px] text-gray-200 mb-10 leading-relaxed font-light font-inter">
                            Every ticket you buy feeds a person in need. Win a delicious pizza while making someone's day brighter. Together, we can end hunger one slice at a time.
                        </p>
                    </AnimationWrapper>

                    {/* CTA Buttons */}
                    <AnimationWrapper animationType="fadeUp" delay={0.4}>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-white text-[#EA7307] font-bold rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                                Buy Tickets & Help Now
                            </button>
                            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300">
                                See Our Impact
                            </button>
                        </div>
                    </AnimationWrapper>
                </div>
            </div>

            {/* Decorative dots with staggered animation */}
            <AnimationWrapper animationType="fade" delay={0.6} duration={1}>
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60" />
            </AnimationWrapper>
            <AnimationWrapper animationType="fade" delay={0.8} duration={1}>
                <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse delay-700 opacity-40" />
            </AnimationWrapper>
            <AnimationWrapper animationType="fade" delay={1} duration={1}>
                <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-bounce opacity-30" />
            </AnimationWrapper>
        </section>
    );
};

export default Hero;

