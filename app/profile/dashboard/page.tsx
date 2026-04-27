"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AnimationWrapper from '@/components/AnimationWrapper';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import BuyTicketsModal from './BuyTicketsModal';

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
    <div className="bg-primary2 rounded-2xl p-6 text-white text-center ">
      <p className="text-lg opacity-80 mb-4 font-medium text-left font-inter    tracking-wider">Draw closes in</p>
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
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF9F0]  font-inter selection:bg-orange-200">
      <div className=" ">

        {/* Header */}
        <AnimationWrapper animationType="fadeDown" className="mb-10">
          <h1 className="text-xl md:text-[32px] font-bold text-gray-900 flex items-center gap-3 tracking-tight">
            Hey Sarah <span className="animate-bounce-slow">👋</span>
          </h1>
          <p className="text-gray-500 mt-2 text-[16px]">Here's your lottery dashboard</p>
        </AnimationWrapper>



        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Side (col-span-8) */}
          <div className="lg:col-span-9 space-y-6">

            {/* Success Banner */}
            <AnimationWrapper animationType="fadeUp" delay={0.1} className=" ">
              <div className="bg-[#D1FAE5] border border-[#A7F3D0] rounded-xl md:rounded-4xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_10px_40px_-15px_rgba(16,185,129,0.2)]">
                <div className="flex items-center gap-6">
                  <div className="flex items-center justify-center text-4xl shadow-xl shadow-green-900/5 rotate-3">
                    <Image src="/party.png" width={60} height={60} className='w-full h-full' alt="party" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-[30px] font-bold text-gray-900 tracking-tight">Congratulations! You Won!</h2>
                    <p className="text-[#0A0A0A] text-[18px] mt-1">You have a prize voucher ready to claim</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


              {/* Active Tickets */}
              <AnimationWrapper animationType="fadeUp" delay={0.2} className="bg-white rounded-xl md:rounded-4xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-primary/30 flex flex-col h-full hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-shadow duration-500">
                <h3 className="text-2xl font-bold mb-8 text-gray-900">Active Tickets</h3>
                <Countdown />
                <div className="mt-10 space-y-4 grow">
                  <p className="text-lg font-bold text-gray-400 font-inter  mb-4">Your Tickets</p>
                  {activeTickets.map((tkt, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="bg-[#F8F9FA] border border-primary/20 p-4 rounded-2xl text-[14px] font-bold text-[#0A0A0A] flex items-center justify-between group"
                    >
                      <span>{tkt}</span>
                      <span className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsBuyModalOpen(true)}
                  className="w-full bg-[#F54900] text-white font-black py-5 rounded-2xl mt-10 shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all uppercase tracking-widest text-sm"
                >
                  Buy More Tickets
                </motion.button>
              </AnimationWrapper>

              {/* Region Info */}
              <AnimationWrapper animationType="fadeUp" delay={0.3} className="bg-white rounded-xl md:rounded-4xl p-6 md:p-10  border border-primary/30 flex flex-col h-full  ">
                <h3 className="text-2xl font-bold mb-8 text-gray-900">Region Info</h3>
                <div className="bg-[#EFF6FF] rounded-3xl p-8 mb-10 grow border border-[#BEDBFF]">
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
                      <span className="font-medium text-gray-900">312</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Your tickets</span>
                      <span className="font-medium text-gray-900">3</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Your orders
                      </span>
                      <span className="font-medium text-[#F54900]  text-base">0.96%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F0FDF4] border border-[#DCFCE7] p-5 rounded-2xl text-sm font-semibold text-[#166534] flex items-center gap-3">
                  <p>Prize:<span className="opacity-60 font-medium"> Large Pizza Voucher at Joe's Pizza NYC</span></p>
                </div>
              </AnimationWrapper>

            </div>

            {/* Past Draws */}
            <AnimationWrapper animationType="fadeUp" delay={0.4} className="bg-white rounded-xl  md:rounded-4xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-primary/30">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🏆</span>
                  <h3 className="text-2xl font-bold text-gray-900">Past Draws</h3>
                </div>

              </div>
              <div className="space-y-4">
                {pastDraws.map((draw, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    className="bg-[#F9FAFB] p-6 rounded-3xl flex items-center justify-between border border-transparent hover:border-gray-200 transition-all cursor-default"
                  >
                    <div>
                      <div className="font-black text-gray-900 text-[16px]">{draw.date}</div>
                      <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                        Winner: <span className="font-bold text-gray-700">{draw.winner}</span>
                      </div>
                    </div>
                    <span className="bg-white/80   text-gray-600 text-[11px] px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                      {draw.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </AnimationWrapper>

          </div>

          {/* Right Side (Winner Card - col-span-4) */}
          <div className="lg:col-span-3 ">
            <AnimationWrapper animationType="fadeLeft" delay={0.5} className="sticky min-h-170 top-10 bg-[#FAF9F0] border border-primary/30 rounded-xl md:rounded-[38px">
              <div className="relative h-105 w-full ">
                <Image
                  src="/user.png"
                  alt="Winner"
                  fill
                  className="w-full h-full object-cover relative md:-translate-y-16  "
                />

              </div>

              <div className="px-4 text-center -mt-28 relative z-10"
                style={{
                  borderRadius: "0 0 30px 34px",
                  background: 'rgba(255, 255, 255, 0.20)',
                  backdropFilter: 'blur(22.5px)'
                }}
              >
                <div className="flex items-center justify-center text-4xl  -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                  <Image src="/party.png" width={60} height={60} alt="party" className='mb-2' />
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">This Week's Winner</h3>
                <p className="text-sm text-gray-500 mb-10 font-medium">Congratulations to our lucky pizza winner!</p>

                <div className="bg-[#FFEDD5] rounded-xl py-3  space-y-6   border border-orange-100/50">
                  <div className="space-y-1">
                    <div className="text-[32px] font-bold text-gray-900 tracking-tighter">Sarah M.</div>
                    <div className="text-[16px] text-[#4A5565] flex items-center justify-center gap-2">
                      <MapPin /> New York, NY
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl font-bold text-gray-900 tracking-tight">1× Large Pizza Voucher</div>
                    <div className="text-sm text-gray-500 font-bold">Joe's Pizza NYC</div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>

        </div>
      </div>

      {/* Buy Tickets Modal */}
      <BuyTicketsModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
      />
    </div>
  );
}
