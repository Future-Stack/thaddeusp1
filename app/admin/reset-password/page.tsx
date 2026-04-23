"use client";

import React from "react";
import AnimationWrapper from "@/components/AnimationWrapper";
import Link from "next/link";

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-[#0B1221] flex items-center justify-center p-4 relative overflow-hidden font-inter">
      {/* Background Dots */}
      <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-blue-500 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-[15%] right-[8%] w-3 h-3 bg-blue-400 rounded-full opacity-10 animate-pulse" />
      
      <AnimationWrapper animationType="scaleUp" duration={0.8} className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-10 text-center">
          
          <h1 className="text-[28px] font-bold text-[#0B1221] mb-2">Reset Password</h1>
          <p className="text-[#64748B] text-sm font-medium mb-8 max-w-[320px] mx-auto leading-relaxed">
            Set a brand new password for your account to ensure security.
          </p>

          <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="block text-[14px] font-bold text-[#334155] ml-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="admin123"
                  className="w-full px-12 py-4 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0B1221] focus:ring-1 focus:ring-[#0B1221] transition-all text-[#0B1221] placeholder:text-[#94A3B8] font-medium"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <UserIcon />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[14px] font-bold text-[#334155] ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="admin123"
                  className="w-full px-12 py-4 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0B1221] focus:ring-1 focus:ring-[#0B1221] transition-all text-[#0B1221] placeholder:text-[#94A3B8] font-medium"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <LockIcon />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Link 
                href="/admin/verify-otp"
                className="flex-1 py-4 bg-white text-[#0B1221] border border-[#E2E8F0] font-bold text-[16px] rounded-xl hover:bg-gray-50 transition-all duration-300 text-center"
              >
                Cancel
              </Link>
              <Link
                href="/admin/login"
                className="flex-1 py-4 bg-[#0B1221] text-white font-bold text-[16px] rounded-xl hover:bg-[#151D2F] transition-all duration-300 shadow-lg shadow-[#0B1221]/20 text-center"
              >
                Verify
              </Link>
            </div>
          </form>
        </div>
      </AnimationWrapper>
    </div>
  );
};

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

export default ResetPassword;
