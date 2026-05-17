"use client";

import React from "react";
import Image from "next/image";
import AnimationWrapper from "@/components/AnimationWrapper";
import { format } from "date-fns";

const staticReviews = [
  {
    id: 1,
    name: "Amanda R.",
    text: "Honestly, this is one of the coolest ideas I’ve seen online. For just $1, I get a chance to win free pizza AND help feed hungry people at the same time. It feels good knowing something so small can make a difference.",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    date: "2026-05-15",
    profileImg: "/profile.webp",
  },
  {
    id: 2,
    name: "Marcus T.",
    text: "I signed up because who doesn’t love pizza? But the mission behind it is what really got me hooked. It’s fun, affordable, and actually helps people in need. Total win-win.",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    date: "2026-05-14",
    profileImg: "/profile.webp",
  },
  {
    id: 3,
    name: "Jenna L.",
    text: "This site made me smile the second I saw it. The idea of turning pizza giveaways into support for homeless shelters is genius. I’ve already shared it with all my friends.",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    date: "2026-05-12",
    profileImg: "/profile.webp",
  },
  {
    id: 4,
    name: "Chris D.",
    text: "I spend more than a dollar on snacks every day, so paying $1 for a chance to win pizza while helping feed the hungry was an easy choice. Love the concept and the positive energy behind it.",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    date: "2026-05-10",
    profileImg: "/profile.webp",
  },
];

const RecentWinners = () => {
  return (
    <section className="py-24 bg-[#FFFAF6] relative overflow-hidden">
      {/* Background Decorative Patterns */}
      {/* Top Right Dots */}
      <div className="absolute -top-10 -right-10 pointer-events-none hidden lg:block">
        <Image
          src="/winner/right.png"
          alt="ok"
          width={150}
          height={310}
          className="w-full h-auto"
        />
      </div>

      {/* Bottom Left Ripple */}
      <div className="absolute bottom-0 left-0 w-87.5 h-87.5 pointer-events-none hidden lg:block">
        <div className="absolute ">
          <Image
            src="/winner/left.png"
            alt="ok"
            width={350}
            height={350}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Floating Dots in top left */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-[0.05] pointer-events-none hidden lg:block">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#9370DB] rounded-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimationWrapper animationType="fadeUp">
            <h2 className="text-4xl md:text-[42px] font-black text-[#1A202C] mb-6 tracking-tight flex items-center justify-center gap-3">
              Testimonials <span className="text-4xl">🥳</span>
            </h2>
          </AnimationWrapper>

          {/* Ornament (Consistent with other sections) */}
          <AnimationWrapper
            animationType="scaleUp"
            delay={0.1}
            className="flex justify-center gap-4"
          >
            <div>
              <Image
                src="/winner/headicon.png"
                alt="headicon"
                width={274}
                height={20}
                className="w-full h-full"
              />
            </div>
          </AnimationWrapper>
        </div>

        {/* Grid Container */}
        <div className="max-w-6xl mx-auto overflow-hidden">
          <AnimationWrapper animationType="fadeUp" delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-16">
              {staticReviews.map((winner, index) => (
                <AnimationWrapper
                  key={winner.id}
                  animationType="fadeUp"
                  delay={0.1 * (index + 1)}
                >
                  <div className="bg-[#FFFEFB] p-8 md:p-10 rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] flex flex-col relative overflow-hidden h-full border border-gray-100/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                    {/* Top Header: Winner Info & Avatar */}
                    <div className="flex items-start gap-5 mb-6">
                      {/* Avatar with Dashed Border */}
                      <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#FF8A65] p-2 shrink-0 animate-pulse-slow">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-100">
                          <Image
                            src={winner.profileImg}
                            alt={winner.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Name, Location, Date */}
                      <div className="flex-1 min-w-0 py-1">
                        <h3 className="text-xl md:text-2xl font-black text-[#0D3B54CC] mb-1 truncate">
                          {winner.name}
                        </h3>
                        <div className="text-sm mb-1 tracking-widest">
                          {winner.stars}
                        </div>
                        {/* <p className="text-xs text-gray-400">
                          ({ format(new Date(winner.date), "MMMM d, yyyy") })
                        </p> */}
                      </div>

                      {/* Quote Icon */}
                      <div className="relative w-10 h-10 shrink-0 ml-auto self-start">
                        <Image
                          src="/winner/quote.png"
                          alt="quote"
                          width={40}
                          height={40}
                          className="object-contain opacity-40"
                        />
                      </div>
                    </div>

                    {/* Bottom: Testimonial Text */}
                    <blockquote className="text-[#3D6276] text-base font-normal italic leading-relaxed relative z-10 flex-1">
                      "{winner.text}"
                    </blockquote>
                  </div>
                </AnimationWrapper>
              ))}
            </div>
          </AnimationWrapper>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default RecentWinners;
