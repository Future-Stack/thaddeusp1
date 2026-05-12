"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AnimationWrapper from '@/components/AnimationWrapper';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import BuyTicketsModal from './BuyTicketsModal';
import Link from 'next/link';

// Mock Data


const Countdown = ({ targetDate }: { targetDate?: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!targetDate) return null;

  return (
    <div className="bg-primary2 rounded-2xl p-6 text-white text-center ">
      <p className="text-lg opacity-80 mb-4 font-medium text-left font-inter tracking-wider">Draw closes in</p>
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

import { useMyTickets } from '@/hooks/useTickets';
import { useGetMe } from '@/hooks/useAuth';
import { useGetDraws, useGetWinners } from '@/hooks/useDraws';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Ticket as TicketIcon } from 'lucide-react';

export default function UserDashboard() {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const { data: ticketsResponse, isLoading: isTicketsLoading } = useMyTickets();
  const { data: userResponse, isLoading: isUserLoading } = useGetMe();
  const { data: drawsResponse, isLoading: isDrawsLoading, isError: isDrawsError } = useGetDraws(1, 10);
  const { data: winnersResponse, isLoading: isWinnersLoading } = useGetWinners(1, 10);

  const tickets = ticketsResponse?.data?.data || [];
  const user = userResponse?.user;
  const draws = drawsResponse?.data?.data || [];
  const winners = winnersResponse?.data?.data || [];

  const lastWinner = winners.find((w: any) => w.isLastWinner);

  // Get draw date from the most recent ticket's event
  const nextDrawDate = tickets[0]?.event?.drawDate;

  return (
    <div className="min-h-screen bg-[#FFF9F0] font-inter selection:bg-orange-200">
      <div className=" ">

        {/* Header */}
        <AnimationWrapper animationType="fadeDown" className="mb-10">
          <h1 className="text-xl md:text-[32px] font-bold text-gray-900 flex items-center gap-3 tracking-tight">
            {isUserLoading ? (
              <Skeleton className="h-10 w-48" />
            ) : (
              <>Hey {user?.fullName?.split(' ')[0] || 'User'} <span className="animate-bounce-slow">👋</span></>
            )}
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
                <Link href="/profile/my-vouchers"
                  className="bg-white text-[#059669] font-bold px-8 py-4 rounded-2xl shadow-md flex items-center gap-3 hover:shadow-xl transition-all"
                >
                  View & Download Voucher
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </AnimationWrapper>
            <div className="grid grid-cols-1 gap-6">

              {/* Active Tickets */}
              <AnimationWrapper animationType="fadeUp" delay={0.2} className="bg-white rounded-xl md:rounded-4xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-primary/30 flex flex-col h-full hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-shadow duration-500">
                <h3 className="text-2xl font-bold mb-8 text-gray-900">Active Tickets</h3>

                {isTicketsLoading ? (
                  <Skeleton className="h-40 w-full rounded-2xl" />
                ) : nextDrawDate ? (
                  <Countdown targetDate={nextDrawDate} />
                ) : null}

                <div className="mt-10 space-y-4 grow">
                  <p className="text-lg font-bold text-gray-400 font-inter mb-4">Your Tickets</p>

                  {isTicketsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-[58px] w-full rounded-2xl" />
                      ))}
                    </div>
                  ) : tickets.length > 0 ? (
                    tickets.map((tkt, idx) => (
                      <motion.div
                        key={tkt.id || idx}
                        whileHover={{ x: 5 }}
                        className="bg-[#F8F9FA] border border-primary/20 p-4 rounded-2xl text-[14px] font-bold text-[#0A0A0A] flex items-center justify-between group"
                      >
                        <span>{tkt.ticketNumber}</span>
                        <span className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))
                  ) : (
                    <div className="bg-[#FFF9F2] border border-[#FFE7C8] rounded-2xl p-8 text-center">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-3">
                        <TicketIcon className="w-6 h-6 text-[#F54900] opacity-50" />
                      </div>
                      <p className="text-gray-500 font-medium text-sm">No active tickets found</p>
                      <p className="text-[12px] text-gray-400 mt-1">Get your first ticket to enter the draw!</p>
                    </div>
                  )}
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
            </div>

            {/* Past Draws */}
            <AnimationWrapper animationType="fadeUp" delay={0.4} className="bg-white rounded-xl md:rounded-4xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-primary/30">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🏆</span>
                  <h3 className="text-2xl font-bold text-gray-900">Past Draws</h3>
                </div>
              </div>
              <div className="space-y-4">
                {isDrawsLoading ? (
                  [1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-3xl" />
                  ))
                ) : isDrawsError ? (
                  <div className="text-center py-10 text-red-500 font-semibold">
                    Failed to load past draws.
                  </div>
                ) : draws.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 font-semibold">
                    No past draws found.
                  </div>
                ) : (
                  draws.map((draw: any) => (
                    <motion.div
                      key={draw.id}
                      whileHover={{ scale: 1.01 }}
                      className="bg-[#F9FAFB] p-6 rounded-3xl flex items-center justify-between border border-transparent hover:border-gray-200 transition-all cursor-default"
                    >
                      <div>
                        <div className="font-black text-gray-900 text-[16px]">
                          {format(new Date(draw.drawnAt), 'MMMM d, yyyy')}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                          Winner: <span className="font-bold text-gray-700">{draw.winner?.fullName || 'N/A'}</span>
                        </div>
                      </div>
                      <span className="bg-white/80 text-gray-600 text-[11px] px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                        Drawn
                      </span>
                    </motion.div>
                  ))
                )}
              </div>
            </AnimationWrapper>

          </div>

          {/* Right Side (Winner Card - col-span-4) */}
          <div className="lg:col-span-3 ">
            <AnimationWrapper animationType="fadeLeft" delay={0.5} className="sticky min-h-170 top-10 bg-[#FAF9F0] border border-primary/30 rounded-xl md:rounded-[38px]">
              {isWinnersLoading ? (
                <div className="p-8 space-y-6">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <Skeleton className="h-8 w-48 mx-auto" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                </div>
              ) : lastWinner ? (
                <>
                  <div className="relative h-105 w-full ">
                    <Image
                      src={lastWinner.profileImg || "/user.png"}
                      alt="Winner"
                      fill
                      className="w-full h-full object-cover relative md:-translate-y-16  rounded-t-xl md:rounded-t-[38px]"
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

                    <div className="bg-[#FFEDD5] rounded-xl py-3  space-y-6   border border-orange-100/50 mb-6">
                      <div className="space-y-1">
                        <div className="text-[32px] font-bold text-gray-900 tracking-tighter">{lastWinner.name}</div>
                        <div className="text-[16px] text-[#4A5565] flex items-center justify-center gap-2">
                          <MapPin size={16} /> {lastWinner.address}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xl font-bold text-gray-900 tracking-tight">{lastWinner.eventName}</div>
                        <div className="text-sm text-gray-500 font-bold">Prize: {lastWinner.prize}</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>No featured winner yet.</p>
                </div>
              )}
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
