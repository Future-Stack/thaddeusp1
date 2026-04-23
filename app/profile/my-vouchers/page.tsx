"use client";

import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';

function MyVouchers() {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <AnimationWrapper animationType="fadeDown">
        <h1 className="text-2xl md:text-3xl font-black text-[#1A202C] mb-8">My Vouchers</h1>
      </AnimationWrapper>

      <AnimationWrapper animationType="fadeUp" delay={0.2}>
        <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 mb-8">
          {/* Voucher Header */}
          <div className="bg-[#FF5100] p-8 md:p-12 text-center text-white relative">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">Congratulations!</h2>
            <p className="text-lg md:text-xl font-medium opacity-90">You Won a Free Pizza!</p>
          </div>

          <div className="p-6 md:p-10">
            {/* Voucher Body: Restaurant & Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-dashed border-gray-200">
              {/* Left Column: Restaurant Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Restaurant</p>
                  <h3 className="text-xl md:text-2xl font-black text-[#1A202C]">Joe's Pizza NYC</h3>
                </div>
                
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <span className="text-xs">📍</span> Address
                  </p>
                  <p className="text-sm font-semibold text-gray-600 leading-relaxed">
                    7 Carmine St, New York, NY 10014
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Prize Value</p>
                  <p className="text-3xl font-black text-[#10B981]">$25.00</p>
                </div>
              </div>

              {/* Right Column: Voucher Code */}
              <div className="bg-orange-50/30 rounded-[24px] p-6 border border-orange-100 border-dashed">
                <div className="text-center mb-6">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Voucher Code</p>
                  <div className="bg-white border-2 border-orange-200 rounded-xl py-3 px-4 shadow-sm">
                    <span className="text-xl md:text-2xl font-black text-[#FF5100] tracking-wider">LUCKY-NY-2026-001</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-400">Draw Date:</span>
                    <span className="font-black text-[#1A202C]">April 18, 2026</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-400">Expires:</span>
                    <span className="font-black text-red-500">May 18, 2026</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-400">Status:</span>
                    <span className="bg-[#10B981]/10 text-[#10B981] px-2.5 py-0.5 rounded-full font-black text-[10px]">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Redemption Instructions */}
            <div className="mb-8">
              <h4 className="text-lg font-black text-[#1A202C] mb-4">How to Redeem:</h4>
              <ol className="space-y-3">
                {[
                  "Visit Joe's Pizza NYC at the address above during business hours",
                  "Show this voucher code to the cashier",
                  "Choose any large pizza from the menu (worth up to $25)",
                  "Enjoy your free pizza! Valid for dine-in or takeout"
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm font-semibold text-gray-600">
                    <span className="text-[#FF5100] font-black">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Important Notice */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <div className="flex items-start gap-3">
                <span className="text-amber-600 mt-0.5 text-lg">⚠️</span>
                <div>
                  <h5 className="text-sm font-black text-amber-900 mb-2">Important:</h5>
                  <ul className="space-y-1.5">
                    {[
                      "One-time use only",
                      "Cannot be combined with other offers",
                      "No cash value",
                      "Must be redeemed by May 18, 2026"
                    ].map((item, i) => (
                      <li key={i} className="text-xs font-semibold text-amber-800/80 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimationWrapper>

      {/* Action Button */}
      <AnimationWrapper animationType="fadeUp" delay={0.4}>
        <button className="w-full bg-[#FF5100] hover:bg-[#E64900] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-orange-200 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group">
          <span className="transition-transform group-hover:-translate-y-1">📥</span>
          Download / Print Voucher
        </button>
      </AnimationWrapper>
    </div>
  );
}

export default MyVouchers;

