import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#F3F4F6] py-12 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="relative w-48 h-16">
          <Image
            src="/logo/logo.png"
            alt="Win A Pizza Logo"
            fill
            className="object-contain"
          />
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <Link
            href="/faq"
            className="text-[#6C757D] hover:text-black transition-colors duration-200 text-[15px]"
          >
            FAQ
          </Link>
          <Link
            href="/terms"
            className="text-[#6C757D] hover:text-black transition-colors duration-200 text-[15px]"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/contact"
            className="text-[#6C757D] hover:text-black transition-colors duration-200 text-[15px]"
          >
            Contact Us
          </Link>
        </nav>

        {/* Copyright */}
        <div className="text-[#98A2B3] text-[13px]">
          © {currentYear} Win a Pizza. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
