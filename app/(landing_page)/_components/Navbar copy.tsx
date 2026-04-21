import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50   bg-white/95 backdrop-blur-sm border-b border-gray-100   shadow-sm">
      <div className="container mx-auto px-6 md:px-12   flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative   ">
          <Image
            src="/logo/logo.png"
            alt="WinAPizza!"
            className='w-full h-auto'
            width={196}
            height={73}

          />
        </Link>

        {/* Login Button */}
        <Link
          href="/login"
          className="px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-[#F54900] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 font-inter"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
