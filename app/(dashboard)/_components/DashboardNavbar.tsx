'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DashboardNavbar = () => {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Dashboard', href: '/profile' }, // Using /profile as dashboard for now
    { name: 'Past Draws', href: '/past-draws' },
    { name: 'Winners', href: '/winners' },
  ]

  return (
    <nav className="bg-[#FDF8F1] py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-40 h-12">
          <Image
            src="/logo/logo.png"
            alt="WinAPizza!"
            fill
            className="object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center bg-white rounded-full p-1 shadow-sm border border-orange-50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#FF5722] text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
          
          <Link
            href="/settings"
            className="flex items-center gap-2 px-6 py-2 text-gray-500 hover:text-gray-900 text-sm font-semibold border-l border-gray-100 ml-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </Link>
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
          
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <Image
              src="/images/profile.jpg"
              alt="User"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNavbar
