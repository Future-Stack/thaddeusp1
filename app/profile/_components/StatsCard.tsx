"use client"
import React from 'react'
import { useGetMeStats } from '@/hooks/useUser'
import { Skeleton } from '@/components/ui/skeleton'

const StatsCard = () => {
  const { data: response, isLoading, isError } = useGetMeStats()
  const statsData = response?.data

  const stats = [
    {
      label: 'Total Tickets',
      value: statsData?.totalTicketsBought ?? 0,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50/50'
    },
    {
      label: 'Wins',
      value: statsData?.totalWins ?? 0,
      color: 'text-green-500',
      bgColor: 'bg-green-50/50'
    },
    {
      label: 'Total Spent',
      value: `$${statsData?.totalSpentMoney ?? 0}`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50/50'
    },
    {
      label: 'Events',
      value: statsData?.participatedEvents ?? 0,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50/50'
    },
  ]

  if (isError) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Failed to load stats</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
      <h2 className="text-xl font-bold text-[#1F2937] mb-8">My Stats</h2>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[106px] w-full rounded-2xl" />
          ))
        ) : (
          stats.map((stat, index) => (
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
          ))
        )}
      </div>
    </div>
  )
}

export default StatsCard
