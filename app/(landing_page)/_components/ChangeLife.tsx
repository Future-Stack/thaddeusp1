"use client";

import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';

const ChangeLife = () => {
    return (
        <section className="py-12 px-4">
            <div className="container mx-auto">
                <AnimationWrapper animationType="scaleUp" duration={0.8}>
                    <div
                        className="relative overflow-hidden flex flex-col items-center justify-center text-center p-8 md:p-16 rounded-[14px] border border-black/10 min-h-75"
                        style={{
                            backgroundImage: `url("/images/card-bg.jpg")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {/* Gradient Overlay */}
                        <div
                            className="absolute inset-0"
                            style={{
                                // background: 'linear-gradient(0deg, rgba(37, 36, 36, 0.30) 0%, rgba(37, 36, 36, 0.30) 100%), linear-gradient(90deg, #FF6900 0%, #FB2C36 70%)',
                                background: 'linear-gradient(90deg, rgba(255, 105, 0, 0.85) 0%, rgba(251, 44, 54, 0.85) 80%)',
                            }}
                        />




                        <div className="relative z-10">
                            <AnimationWrapper animationType="fadeUp" delay={0.2}>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
                                    Your $1 can change a life
                                </h2>
                            </AnimationWrapper>

                            <AnimationWrapper animationType="fadeUp" delay={0.3}>
                                <p className="text-white/90 text-lg md:text-xl mb-8 drop-shadow-sm">
                                    Join thousands making a difference daily
                                </p>
                            </AnimationWrapper>

                            <AnimationWrapper animationType="fadeUp" delay={0.4}>
                                <button className="bg-white text-[#FB2C36] font-bold px-8 py-3 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    Start Helping Today
                                </button>
                            </AnimationWrapper>
                        </div>
                    </div>
                </AnimationWrapper>
            </div>
        </section>
    );
};

export default ChangeLife;
