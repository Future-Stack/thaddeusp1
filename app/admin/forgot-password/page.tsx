"use client";

import React from "react";
import AnimationWrapper from "@/components/AnimationWrapper";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-[#0B1221] flex items-center justify-center p-4 relative overflow-hidden font-inter">
      {/* Background Dots */}
      <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-blue-500 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-[15%] right-[8%] w-3 h-3 bg-blue-400 rounded-full opacity-10 animate-pulse" />
      
      <AnimationWrapper animationType="scaleUp" duration={0.8} className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-10 text-center">
          
          <h1 className="text-[28px] font-bold text-[#0B1221] mb-2">Forgot Password!</h1>
          <p className="text-[#64748B] text-sm font-medium mb-8 max-w-[320px] mx-auto leading-relaxed">
            Did you forget your password? It's okay, just provide your email address. We'll send you an OTP code.
          </p>

          <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="block text-[14px] font-bold text-[#334155] ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@luckyslice.com"
                className="w-full px-5 py-4 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0B1221] focus:ring-1 focus:ring-[#0B1221] transition-all text-[#0B1221] placeholder:text-[#94A3B8] font-medium"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <Link 
                href="/admin/login"
                className="flex-1 py-4 bg-white text-[#0B1221] border border-[#E2E8F0] font-bold text-[16px] rounded-xl hover:bg-gray-50 transition-all duration-300 text-center"
              >
                Cancel
              </Link>
              <Link
                href="/admin/verify-otp"
                className="flex-1 py-4 bg-[#0B1221] text-white font-bold text-[16px] rounded-xl hover:bg-[#151D2F] transition-all duration-300 shadow-lg shadow-[#0B1221]/20 text-center"
              >
                Send OTP
              </Link>
            </div>
          </form>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default ForgotPassword;
