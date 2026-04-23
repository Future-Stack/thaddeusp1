import React from 'react'
import Image from 'next/image'

const PersonalInfoCard = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-[#1F2937]">Personal Information</h2>
        <button className="px-5 py-2 bg-[#FF5722] text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-100">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-orange-50">
          <Image
            src="/images/profile.jpg"
            alt="Savannah Nguyen"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#1F2937]">Savannah Nguyen</h3>
          <p className="text-gray-400 font-medium">sarah.mitchell@email.com</p>
          <p className="text-gray-400 text-sm mt-1 italic">Member since March 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-8">
        <div>
          <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
          <p className="font-bold text-[#1F2937]">Sarah Mitchell</p>
        </div>
        <div>
          <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-1">Email</p>
          <p className="font-bold text-[#1F2937]">sarah.mitchell@email.com</p>
        </div>
        <div>
          <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
          <p className="font-bold text-[#1F2937] text-lg">(555) 123-4567</p>
        </div>
        <div className="col-span-2">
          <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-1">Address</p>
          <p className="font-bold text-[#1F2937]">123 Main Street, New York, NY 10001</p>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoCard
