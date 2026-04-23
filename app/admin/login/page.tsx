"use client";

import React from "react";
import AnimationWrapper from "@/components/AnimationWrapper";
import Image from "next/image";
import Link from "next/link";

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-[#0B1221] flex items-center justify-center p-4 relative overflow-hidden font-inter">
      {/* Background Dots (Matching style from conversation history) */}
      <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-blue-500 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-[15%] right-[8%] w-3 h-3 bg-blue-400 rounded-full opacity-10 animate-pulse" />
      
      <AnimationWrapper animationType="scaleUp" duration={0.8} className="w-full max-w-120 relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-12 relative">
          
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              <Image 
                src="/auth/lock.png" 
                alt="Admin Access" 
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Titles */}
          <div className="text-center mb-10">
            <h1 className="text-[32px] font-bold text-[#0B1221] mb-1">Admin Access</h1>
            <p className="text-[#64748B] text-sm font-medium">Lucky Slice Management Portal</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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

            <div className="space-y-2 relative">
              <label className="block text-[14px] font-bold text-[#334155] ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="........"
                className="w-full px-5 py-4 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0B1221] focus:ring-1 focus:ring-[#0B1221] transition-all text-[#0B1221] placeholder:text-[#94A3B8] font-medium"
              />
              <div className="text-right mt-2">
                <Link href="/admin/forgot-password"  className="text-[11px] text-red-500 font-bold hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#0B1221] text-white font-bold text-[16px] rounded-xl hover:bg-[#151D2F] transition-all duration-300 active:scale-[0.98] shadow-lg shadow-[#0B1221]/20 mt-4 cursor-pointer"
            >
              Log In to Admin
            </button>
          </form>

          {/* Divider and Footer Text */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-center">
            <p className="text-[#94A3B8] text-[13px] font-medium leading-relaxed">
              Admin access only. Unauthorized access is prohibited.
            </p>
          </div>

          {/* Man with Pizza Asset */}
          <div className="absolute -right-28 bottom-0 w-60 pointer-events-none hidden lg:block">
            <AnimationWrapper animationType="fadeLeft" delay={0.4} duration={0.8}>
                <Image 
                    src="/auth/man.png" 
                    alt="Delivery Man" 
                    width={240} 
                    height={240} 
                    className="w-full h-auto drop-shadow-2xl animate-bounce-slow"
                />
            </AnimationWrapper>
          </div>
        </div>

        {/* Mobile Man Asset */}
        <div className="lg:hidden absolute -bottom-20 -right-4 w-40 pointer-events-none opacity-80">
            <Image 
                src="/auth/man.png" 
                alt="Delivery Man" 
                width={160} 
                height={160} 
                className="w-full h-auto drop-shadow-xl animate-bounce-slow"
            />
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default AdminLogin;
