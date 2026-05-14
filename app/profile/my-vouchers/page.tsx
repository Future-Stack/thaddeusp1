"use client";

import React, { useState } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import { useMyVouchers } from '@/hooks/useVouchers';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, AlertCircle, Ticket } from 'lucide-react';
import type { Voucher } from '@/services/voucher.service';

const ITEMS_PER_PAGE = 6;

function MyVouchers() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: vouchersResponse, isLoading, isError, refetch } = useMyVouchers(currentPage, ITEMS_PER_PAGE);

  const vouchers = vouchersResponse?.data?.data || [];
  const meta = vouchersResponse?.data?.meta;
  const totalPages = meta?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <AnimationWrapper animationType="fadeDown">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#1A202C] tracking-tight">My Vouchers</h1>
            <p className="text-gray-500 mt-2 font-medium">Manage and redeem your won prizes</p>
          </div>
          {!isLoading && vouchers.length > 0 && (
            <div className="bg-orange-50 text-[#FF5100] px-6 py-2.5 rounded-2xl border border-orange-100 text-sm font-bold shadow-sm flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              Total: {meta?.total || 0} Vouchers
            </div>
          )}
        </div>
      </AnimationWrapper>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <VoucherSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="bg-red-50 border border-red-100 rounded-3xl p-12 text-center max-w-2xl mx-auto shadow-2xl shadow-red-100/20 mt-10">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-black text-red-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-700/80 mb-8 font-medium">We couldn't load your vouchers. Please try again.</p>
          <button 
            onClick={() => refetch()}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-2xl font-black transition-all shadow-lg shadow-red-200"
          >
            Try Again
          </button>
        </div>
      ) : vouchers.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-4xl p-16 text-center max-w-3xl mx-auto shadow-2xl shadow-gray-100/50 mt-10">
          <div className="text-6xl mb-8 opacity-20">🎫</div>
          <h2 className="text-2xl md:text-3xl font-black text-[#1A202C] mb-4">No Vouchers Yet</h2>
          <p className="text-gray-500 mb-10 text-lg font-medium">Keep playing to win amazing prizes and see your vouchers here!</p>
          <button className="bg-[#FF5100] hover:bg-[#E64900] text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-orange-200">
            Browse Events
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <AnimatePresence mode="popLayout">
              {vouchers.map((voucher, index) => (
                <AnimationWrapper key={voucher.id} animationType="fadeUp" delay={index * 0.1}>
                  <VoucherCard voucher={voucher} />
                </AnimationWrapper>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12 mb-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-2xl border-2 border-gray-100 bg-white text-gray-500 hover:border-[#FF5100] hover:text-[#FF5100] transition-all disabled:opacity-30 disabled:hover:border-gray-100 disabled:hover:text-gray-500 shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="hidden sm:flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-12 h-12 rounded-2xl font-black transition-all ${
                      currentPage === i + 1
                        ? 'bg-[#FF5100] text-white shadow-lg shadow-orange-200'
                        : 'bg-white border-2 border-gray-100 text-gray-500 hover:border-[#FF5100] hover:text-[#FF5100]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="sm:hidden font-bold text-gray-500">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-2xl border-2 border-gray-100 bg-white text-gray-500 hover:border-[#FF5100] hover:text-[#FF5100] transition-all disabled:opacity-30 disabled:hover:border-gray-100 disabled:hover:text-gray-500 shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const VoucherCard = ({ voucher }: { voucher: Voucher }) => {
  const statusColors = {
    ACTIVE: 'bg-[#10B981]/10 text-[#10B981]',
    REDEEMED: 'bg-blue-50 text-blue-600',
    EXPIRED: 'bg-gray-100 text-gray-400',
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-4xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full group transition-all duration-300"
    >
      {/* Card Top: Prize Info */}
      <div className="bg-[#FF5100] p-7 text-white relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-9xl opacity-10 rotate-12 transition-transform group-hover:rotate-45 duration-500">🎉</div>
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Winning Prize</p>
          <h3 className="text-2xl font-black truncate leading-tight">{voucher.draw?.event?.name || 'Free Prize'}</h3>
          <p className="text-sm font-medium opacity-90 mt-1">${voucher.value} Reward Value</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-7 grow space-y-6">
        <div className="flex items-center justify-between">
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider ${statusColors[voucher.status as keyof typeof statusColors]}`}>
            {voucher.status}
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {voucher.code}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-gray-600">
            <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
               <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Won On</p>
              <p className="text-[15px] font-black text-[#1A202C]">{format(new Date(voucher.draw?.drawnAt || voucher.createdAt), 'MMM dd, yyyy')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-600">
            <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-50 shadow-sm">
               <Clock className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Expires On</p>
              <p className="text-[15px] font-black text-red-500">{format(new Date(voucher.expiresAt), 'MMM dd, yyyy')}</p>
            </div>
          </div>
        </div>

        {/* Dashed Line */}
        <div className="border-b border-dashed border-gray-200 my-2"></div>

        {/* <div className="flex items-center gap-3">
            <button className="flex-1 bg-[#1A202C] text-white py-4 rounded-2xl font-black text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-100 flex items-center justify-center gap-2 group/btn">
            View Details
            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
            <button className="w-14 h-14 bg-orange-50 text-[#FF5100] rounded-2xl flex items-center justify-center hover:bg-orange-100 transition-all border border-orange-100" title="Download Voucher">
                📥
            </button>
        </div> */}
      </div>
    </motion.div>
  );
};

const VoucherSkeleton = () => (
  <div className="bg-white rounded-4xl overflow-hidden shadow-2xl shadow-gray-100/50 border border-gray-100 h-112.5">
    <Skeleton className="h-32 w-full rounded-none" />
    <div className="p-7 space-y-8">
      <div className="flex justify-between">
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="space-y-5">
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="w-10 h-10 rounded-2xl" />
            <div className="space-y-2.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-14 flex-1 rounded-2xl" />
        <Skeleton className="h-14 w-14 rounded-2xl" />
      </div>
    </div>
  </div>
);

export default MyVouchers;
