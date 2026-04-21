import React from 'react'

const AccountSecurityCard = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-[#1F2937] mb-6">Account Security</h2>
      
      <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-[#1F2937]">Password</h3>
          <p className="text-gray-400 text-sm mt-1">Last changed 2 months ago</p>
        </div>
        <button className="px-6 py-2 bg-white text-[#4B5563] text-sm font-bold rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-all">
          Change
        </button>
      </div>
    </div>
  )
}

export default AccountSecurityCard
