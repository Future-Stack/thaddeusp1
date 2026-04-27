'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { SquarePen } from 'lucide-react'

interface UserInfo {
  fullName: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  zip: string
}

const PersonalInfoCard = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: 'Savannah Nguyen',
    email: 'sarah.mitchell@email.com',
    phone: '(555) 123-4567',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
  })
  const [formData, setFormData] = useState<UserInfo>(userInfo)

  const handleEditClick = () => {
    setFormData(userInfo)
    setIsEditing(true)
  }

  const handleSave = () => {
    setUserInfo(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(userInfo)
    setIsEditing(false)
  }

  const handleChange = (field: keyof UserInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const fullAddress = `${userInfo.street}, ${userInfo.city}, ${userInfo.state} ${userInfo.zip}`

  return (
    <>
      {/* Main Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 h-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-[#1F2937]">Personal Information</h2>
          <button
            onClick={handleEditClick}
            className="block md:hidden   text-black text-sm font-semibold rounded-full hover:bg-orange-600 transition-colors"
          >
            <SquarePen />
          </button>

          <button
            onClick={handleEditClick}
            className="hidden md:block px-1 md:px-5 py-2 bg-[#FF5722] text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition-colors"
          >
            Edit Profile
          </button>
        </div>

        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-100">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-orange-50">
            <Image
              src="/images/profile.jpg"
              alt={userInfo.fullName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#1F2937]">{userInfo.fullName}</h3>
            <p className="text-gray-400 font-medium">{userInfo.email}</p>
            <p className="text-gray-400 text-sm mt-1 italic">Member since March 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-8">
          <div>
            <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
            <p className="font-bold text-[#1F2937]">{userInfo.fullName}</p>
          </div>
          <div className='col-span-2 md:col-auto'>
            <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-1">Email</p>
            <p className="font-bold text-[#1F2937] text-wrap">{userInfo.email}</p>
          </div>
          <div>
            <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
            <p className="font-bold text-[#1F2937] text-lg">{userInfo.phone}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-1">Address</p>
            <p className="font-bold text-[#1F2937] text-wrap">{fullAddress}</p>
          </div>
        </div>
      </div>

      {/* Edit Modal Overlay */}
      {isEditing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={handleCancel}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 animate-fade-in relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCancel}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Header */}
            <h2 className="text-xl font-bold text-[#1F2937] mb-6">Personal Information</h2>

            {/* Profile Preview */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-50 shrink-0">
                <Image
                  src="/images/profile.jpg"
                  alt={formData.fullName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1F2937]">{formData.fullName}</h3>
                <p className="text-gray-400 text-sm">{formData.email}</p>
                <p className="text-gray-400 text-xs mt-0.5 italic">Member since March 2026</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Full Name + Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleChange('street', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>

              {/* City / State / ZIP */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => handleChange('zip', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-[#FF5722] text-white font-semibold rounded-full hover:bg-orange-600 active:scale-95 transition-all"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-8 py-3 bg-gray-100 text-gray-500 font-semibold rounded-full hover:bg-gray-200 active:scale-95 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PersonalInfoCard