import React from 'react'
import PersonalInfoCard from '../_components/PersonalInfoCard'
import StatsCard from '../_components/StatsCard'
import QuickActionsCard from '../_components/QuickActionsCard'
import AccountSecurityCard from '../_components/AccountSecurityCard'
import AnimationWrapper from '@/components/AnimationWrapper'

const ProfilePage = () => {
  return (
    <div className="space-y-8">
      {/* Title Section */}
      <AnimationWrapper animationType="fadeDown">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">My Profile</h1>
          <p className="text-gray-500 mt-1">Here's your lottery dashboard</p>
        </div>
      </AnimationWrapper>

      {/* Profile Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Personal Information */}
        <div className="lg:col-span-5">
          <AnimationWrapper animationType="fadeRight" delay={0.1}>
            <PersonalInfoCard />
          </AnimationWrapper>
        </div>

        {/* Middle Column: My Stats */}
        <div className="lg:col-span-3">
          <AnimationWrapper animationType="fadeUp" delay={0.2}>
            <StatsCard />
          </AnimationWrapper>
        </div>

        {/* Right Column: Quick Actions & Account Security */}
        <div className="lg:col-span-4 space-y-6">
          <AnimationWrapper animationType="fadeLeft" delay={0.3}>
            <QuickActionsCard />
          </AnimationWrapper>
          <AnimationWrapper animationType="fadeLeft" delay={0.4}>
            <AccountSecurityCard />
          </AnimationWrapper>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
