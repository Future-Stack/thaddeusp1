"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AnimationWrapper from '@/components/AnimationWrapper';
import { motion } from 'framer-motion';

// Mock Data
const activeTickets = ["TKT-NY-1247", "TKT-NY-1248", "TKT-NY-1249"];
const pastDraws = [
  { date: "April 13, 2026", winner: "Sarah M.", status: "Not this time" },
  { date: "April 6, 2026", winner: "James K.", status: "Not this time" },
];

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 14,
    minutes: 25,
    seconds: 50
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#F54900] rounded-2xl p-6 text-white text-center shadow-lg shadow-orange-200">
      <p className="text-xs opacity-80 mb-4 font-medium uppercase tracking-wider">Draw closes in</p>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Min', value: timeLeft.minutes },
          { label: 'Sec', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="text-2xl md:text-3xl font-bold leading-none">{item.value}</div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-70 mt-1 font-semibold">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-[#FFF9F0]  font-inter selection:bg-orange-200">
      <div className=" ">
        
        {/* Header */}
        <AnimationWrapper animationType="fadeDown" className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 flex items-center gap-3 tracking-tight">
            Hey Sarah <span className="animate-bounce-slow">👋</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Here's your lottery dashboard</p>
        </AnimationWrapper>

     

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Side (col-span-8) */}
          <div className="lg:col-span-8 space-y-10">
            
               {/* Success Banner */}
        <AnimationWrapper animationType="fadeUp" delay={0.1} className="mb-12">
          <div className="bg-[#D1FAE5] border border-[#A7F3D0] rounded-4xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_10px_40px_-15px_rgba(16,185,129,0.2)]">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-xl shadow-green-900/5 rotate-3">
                🎉
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Congratulations! You Won!</h2>
                <p className="text-gray-600 text-lg mt-1">You have a prize voucher ready to claim</p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-[#059669] font-bold px-8 py-4 rounded-2xl shadow-md flex items-center gap-3 hover:shadow-xl transition-all"
            >
              View & Download Voucher 
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>
        </AnimationWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
              
              {/* Active Tickets */}
              <AnimationWrapper animationType="fadeUp" delay={0.2} className="bg-white rounded-4xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-shadow duration-500">
                <h3 className="text-2xl font-bold mb-8 text-gray-900">Active Tickets</h3>
                <Countdown />
                <div className="mt-10 space-y-4 grow">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Your Tickets</p>
                  {activeTickets.map((tkt, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ x: 5 }}
                      className="bg-[#F8F9FA] border border-gray-50 p-4 rounded-2xl text-base font-bold text-gray-700 flex items-center justify-between group"
                    >
                      <span>{tkt}</span>
                      <span className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#F54900] text-white font-black py-5 rounded-2xl mt-10 shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all uppercase tracking-widest text-sm"
                >
                  Buy More Tickets
                </motion.button>
              </AnimationWrapper>

              {/* Region Info */}
              <AnimationWrapper animationType="fadeUp" delay={0.3} className="bg-white rounded-4xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-shadow duration-500">
                <h3 className="text-2xl font-bold mb-8 text-gray-900">Region Info</h3>
                <div className="bg-[#EFF6FF] rounded-3xl p-8 mb-10 grow border border-blue-50">
                  <div className="flex items-start gap-5 mb-8">
                    <div className="bg-white w-12 h-12 rounded-xl shadow-sm flex items-center justify-center text-2xl rotate-6">
                      🏀
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900">New York Pool</h4>
                      <p className="text-sm text-gray-500 mt-0.5">Your local draw</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Tickets sold this week</span>
                      <span className="font-black text-gray-900">312</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Your tickets</span>
                      <span className="font-black text-gray-900">3</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Your odds</span>
                      <span className="font-black text-[#F54900] bg-orange-50 px-2 py-0.5 rounded-lg text-base">0.96%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F0FDF4] border border-[#DCFCE7] p-5 rounded-2xl text-sm font-semibold text-[#166534] flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p><span className="opacity-60 font-medium">Prize:</span> Large Pizza Voucher at Joe's Pizza NYC</p>
                </div>
              </AnimationWrapper>

            </div>

            {/* Past Draws */}
            <AnimationWrapper animationType="fadeUp" delay={0.4} className="bg-white rounded-4xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🏆</span>
                  <h3 className="text-2xl font-bold text-gray-900">Past Draws</h3>
                </div>
                <button className="text-sm font-bold text-[#F54900] hover:underline transition-all">View all history</button>
              </div>
              <div className="space-y-4">
                {pastDraws.map((draw, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ scale: 1.01 }}
                    className="bg-[#F8F9FA] p-6 rounded-3xl flex items-center justify-between border border-transparent hover:border-gray-200 transition-all cursor-default"
                  >
                    <div>
                      <div className="font-black text-gray-900 text-lg">{draw.date}</div>
                      <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                        Winner: <span className="font-bold text-gray-700">{draw.winner}</span>
                      </div>
                    </div>
                    <span className="bg-white/80 backdrop-blur-sm text-gray-400 text-[11px] font-black uppercase px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                      {draw.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </AnimationWrapper>

          </div>

          {/* Right Side (Winner Card - col-span-4) */}
          <div className="lg:col-span-4">
            <AnimationWrapper animationType="fadeLeft" delay={0.5} className="sticky top-10 bg-white rounded-[48px] overflow-hidden shadow-[0_30px_70px_-20px_rgba(245,73,0,0.15)] border border-gray-50/50">
              <div className="relative h-112.5 w-full overflow-hidden group">
                <Image 
                  src="/user.png" 
                  alt="Winner" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent" />
                <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-[10px] font-black text-white uppercase tracking-widest">
                  Featured Winner
                </div>
              </div>
              
              <div className="p-10 text-center -mt-28 relative z-10">
                <div className="w-20 h-20 bg-white rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-2xl shadow-orange-900/10 mb-6 border border-orange-50 -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                  🎉
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">This Week's Winner</h3>
                <p className="text-sm text-gray-500 mb-10 font-medium">Congratulations to our lucky pizza winner!</p>
                
                <div className="bg-[#FFEDD5] rounded-4xl p-10 space-y-6 shadow-inner border border-orange-100/50">
                  <div className="space-y-1">
                    <div className="text-3xl font-black text-gray-900 tracking-tighter">Sarah M.</div>
                    <div className="text-sm text-gray-500 font-bold flex items-center justify-center gap-2">
                      <span className="text-lg">📍</span> New York, NY
                    </div>
                  </div>
                  <div className="h-px bg-orange-300/20 w-full" />
                  <div className="space-y-1">
                    <div className="text-xl font-black text-gray-900 tracking-tight">1× Large Pizza Voucher</div>
                    <div className="text-sm text-gray-500 font-bold">Joe's Pizza NYC</div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>

        </div>
      </div>
    </div>
  );
}
