
'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className='sticky top-0 left-0 right-0 z-50 bg-white py-4 shadow-sm'>
      <div className="container mx-auto px-4 md:px-0">
        <div className='flex justify-between items-center'>
          <div>
            <Link href="/" className='block w-47.5 h-18.75'>
              <Image
                src="/logo/logo.png"
                alt="WinAPizza!"
                className='w-full h-full   object-cover'
                width={200}
                height={75}
              />
            </Link>
          </div>

          <div className='flex items-center gap-6'>
            <Link
              href="/login"
              className="px-6 py-3 bg-[#FF5722] text-white font-bold rounded-full shadow-md hover:bg-[#F4511E] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 font-inter hidden sm:block"
            >
              Login
            </Link>

            {/* User Profile Component */}
            <div className="relative">
              <div
                className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden  shadow-sm">
                  <Image
                    src="/images/profile.jpg"
                    alt="User Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1C274C] text-[15px] leading-tight">Savannah Nguyen</span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M1 1L5 5L9 1" stroke="#1C274C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[#8E94A4] text-[12px] font-medium">Boston</span>
                </div>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-55 "
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-gray-50 py-2 z-60 overflow-hidden shadow-2xl border-t border-t-gray-400"
                    >
                      {/* <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <p className="text-[14px] font-semibold text-[#1C274C]">My Account</p>
                        <p className="text-[11px] text-[#8E94A4]">savannah@example.com</p>
                      </div> */}

                      <Link href="/profile" className="w-full text-left px-4 py-2 text-[14px] text-[#424B5E] hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Profile Settings
                      </Link>
                   

                      <div className="border-t border-gray-50 mt-1 pt-1">
                        <button className="w-full text-left px-4 py-2 text-[14px] text-red-500 hover:bg-red-50 transition-colors font-medium">
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar