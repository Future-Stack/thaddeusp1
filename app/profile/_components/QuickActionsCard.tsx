import React from 'react'
import Link from 'next/link'

const QuickActionsCard = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-[#1F2937] mb-6">Quick Actions</h2>
      
      <div className="flex flex-col gap-4">
        <Link 
          href="/ticket" 
          className="w-full bg-[#FF5722] text-white py-4 rounded-xl font-bold text-center shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all transform hover:-translate-y-0.5"
        >
          Buy Tickets
        </Link>
        <Link 
          href="/profile/my-vouchers" 
          className="w-full bg-[#00B248] text-white py-4 rounded-xl font-bold text-center shadow-lg shadow-green-100 hover:bg-green-600 transition-all transform hover:-translate-y-0.5"
        >
          My Vouchers
        </Link>
        <Link 
          href="profile/settings" 
          className="w-full bg-[#E5E7EB] text-[#4B5563] py-4 rounded-xl font-bold text-center hover:bg-gray-300 transition-all"
        >
          Settings
        </Link>
      </div>
    </div>
  )
}

export default QuickActionsCard
