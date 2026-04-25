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
      <div className="container mx-auto   relative z-10">
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
            <p className="max-w-xl text-lg md:text-[20px] text-gray-200 mb-10 leading-relaxed font-light font-inter">
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

      {/* Decorative dots with pulse animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Left Dot */}
        <AnimationWrapper animationType="fade" delay={0.6}>
          <div className="absolute top-[15%] left-[18%] w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
        </AnimationWrapper>

        {/* Middle Center Dot */}
        <AnimationWrapper animationType="fade" delay={0.8}>
          <div className="absolute top-[45%] left-[40%] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse delay-300 opacity-60" />
        </AnimationWrapper>

        {/* Middle Right Dot */}
        <AnimationWrapper animationType="fade" delay={1.0}>
          <div className="absolute top-[60%] right-[35%] w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-500 shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
        </AnimationWrapper>

        {/* Bottom Right Dot */}
        <AnimationWrapper animationType="scaleUp" delay={1.2}>
          <div className="absolute bottom-[20%] right-[15%] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse delay-700 opacity-40" />
        </AnimationWrapper>

        {/* Pizza Slice */}
        <AnimationWrapper animationType="fade" delay={1.4}>
          <div className="absolute top-[65%] right-[8%] w-16 h-16 md:w-20 md:h-20 opacity-80 hover:opacity-100 transition-opacity duration-300 transform rotate-12">
            <Image
              src="/pizza.png"
              alt="Pizza slice"
              width={80}
              height={80}
              className="object-contain animate-bounce-slow  "
            />
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
};

export default Hero;

