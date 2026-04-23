import React from 'react'

const stats = [
  { label: 'Total Tickets', value: '47', color: 'text-blue-500', bgColor: 'bg-blue-50/50' },
  { label: 'Wins', value: '1', color: 'text-green-500', bgColor: 'bg-green-50/50' },
  { label: 'Total Spent', value: '$47', color: 'text-purple-500', bgColor: 'bg-purple-50/50' },
  { label: 'Week Streak', value: '4', color: 'text-orange-500', bgColor: 'bg-orange-50/50' },
]

const StatsCard = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
      <h2 className="text-xl font-bold text-[#1F2937] mb-8">My Stats</h2>
      
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.bgColor} rounded-2xl p-6 flex flex-col items-center justify-center border border-transparent hover:border-gray-100 transition-all cursor-default shadow-sm`}
          >
            <span className={`text-3xl font-black ${stat.color} mb-1 tracking-tight`}>
              {stat.value}
            </span>
            <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsCard
