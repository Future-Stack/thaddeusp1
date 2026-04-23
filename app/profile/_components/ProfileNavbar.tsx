'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'

const ProfileNavbar = () => {
  const pathname = usePathname()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '/profile/dashboard' }, // Using /profile as dashboard for now
    { name: 'My Vouchers', href:'/profile/my-vouchers' },
    { name: 'Winners', href: '/profile/winners' },
  ]
const isSettingsActive = pathname.startsWith('/profile/settings')
  return (
    <nav className="bg-[#FDF8F1] py-4">
      <div className="  mx-auto px-4 md:px-25 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-40 h-12">
          <Image
            src="/logo/logo.png"
            alt="WinAPizza!"
            fill
            className="object-contain"
          />
        </Link>

       <div className='flex gap-4 items-center'>
         {/* Navigation Links */}
        <div className="hidden md:flex items-center  gap-4 ">
         <div className='bg-white py-3 px-3  rounded-full shadow-sm border border-orange-50'>
           {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all hover:bg-[#FF5722] hover:text-white  duration-300 ${
                  isActive
                    ? 'bg-[#FF5722] text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
         </div>
          
          <div className='bg-white py-2 rounded-full shadow-sm border border-orange-50'>
          <Link
            href="/profile/settings"
             className={`flex items-center gap-2 px-6 py-2 text-sm font-semibold hover:bg-[#FF5722] hover:text-white ml-2 rounded-full transition-all duration-300 ${
    isSettingsActive
      ? 'bg-[#FF5722] text-white shadow-md'
      : 'text-gray-500 hover:text-gray-900'
  }`}

          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </Link>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 bg-white rounded-full border border-gray-100 shadow-sm relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF5722] rounded-full border border-white"></span>
          </button>
          
          <div className="relative">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200"    onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Image
              src="/images/profile.jpg"
              alt="User"
              fill
              className="object-cover"
            />
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
                      <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <p className="text-[14px] font-semibold text-[#1C274C]">My Account</p>
                        <p className="text-[11px] text-[#8E94A4]">savannah@example.com</p>
                      </div>

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
    </nav>
  )
}

export default ProfileNavbar
