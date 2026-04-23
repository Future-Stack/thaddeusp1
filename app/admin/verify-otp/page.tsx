"use client";

import React, { useState, useEffect } from "react";
import AnimationWrapper from "@/components/AnimationWrapper";
import Link from "next/link";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1221] flex items-center justify-center p-4 relative overflow-hidden font-inter">
      {/* Background Dots */}
      <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-blue-500 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-[15%] right-[8%] w-3 h-3 bg-blue-400 rounded-full opacity-10 animate-pulse" />
      
      <AnimationWrapper animationType="scaleUp" duration={0.8} className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-10 text-center">
          
          <h1 className="text-[28px] font-bold text-[#0B1221] mb-2">Verify OTP</h1>
          <p className="text-[#64748B] text-sm font-medium mb-6 max-w-[340px] mx-auto leading-relaxed">
            We have sent you a 6 digit OTP code to your provided email: <span className="text-[#0B1221] font-bold">example@mail.com</span> please input that code here to proceed.
          </p>

          <div className="text-[20px] font-bold text-[#0B1221] mb-4">2:30</div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-between gap-2 max-w-xs mx-auto">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-12 md:w-14 md:h-14 border border-[#E2E8F0] rounded-xl text-center text-xl font-bold text-[#0B1221] focus:outline-none focus:border-[#0B1221] focus:ring-1 focus:ring-[#0B1221] transition-all bg-white"
                />
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              <Link 
                href="/admin/forgot-password"
                className="flex-1 py-4 bg-white text-[#0B1221] border border-[#E2E8F0] font-bold text-[16px] rounded-xl hover:bg-gray-50 transition-all duration-300 text-center"
              >
                Cancel
              </Link>
              <Link
                href="/admin/reset-password"
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

export default VerifyOTP;
