'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { SquarePen, Mail, Phone, MapPin, User, Calendar, Loader2, Camera, Map } from 'lucide-react'
import { useGetMe } from '@/hooks/useAuth'
import { useUpdateProfile } from '@/hooks/useUser'
import { useRegions } from '@/hooks/useRegions'
import { Region } from '@/services/region.service'

interface UserInfo {
    fullName: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    zip: string
    profileImg: string
    regionId: string
}

const PersonalInfoCard = () => {
    const [isEditing, setIsEditing] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { data: profileData, isLoading, isError, refetch } = useGetMe()
    const { data: regionsData } = useRegions()
    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile()

    const user = profileData?.user
    const regions = regionsData || []

    const [formData, setFormData] = useState<UserInfo>({
        fullName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        profileImg: '',
        regionId: '',
    })

    const [previewUrl, setPreviewUrl] = useState<string>('')

    // Sync form data when user data is fetched
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || '',
                street: user.streetAddress || '',
                city: user.city || '',
                state: user.state || '',
                zip: user.zip?.toString() || '',
                profileImg: user.profileImg || '',
                regionId: user.regionId || '',
            })
            setPreviewUrl(user.profileImg || '')
        }
    }, [user])

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        const data = new FormData()
        data.append('fullName', formData.fullName)
        data.append('phone', formData.phone)
        data.append('streetAddress', formData.street)
        data.append('city', formData.city)
        data.append('state', formData.state)
        data.append('zip', formData.zip || '')
        data.append('regionId', formData.regionId)

        // We don't need to append profileImg here if it's already updated via instant upload,
        // but it doesn't hurt if the backend handles it.

        updateProfile(data, {
            onSuccess: () => {
                setIsEditing(false)
            }
        })
    }

    const handleCancel = () => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || '',
                street: user.streetAddress || '',
                city: user.city || '',
                state: user.state || '',
                zip: user.zip?.toString() || '',
                profileImg: user.profileImg || '',
                regionId: user.regionId || '',
            })
            setPreviewUrl(user.profileImg || '')
        }
        setIsEditing(false)
    }

    const handleChange = (field: keyof UserInfo, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Local preview
            const objectUrl = URL.createObjectURL(file)
            setPreviewUrl(objectUrl)

            // Instant upload using the same profile update API
            const data = new FormData()
            data.append('profileImg', file)

            updateProfile(data, {
                onSuccess: (res) => {
                    if (res.success) {
                        setFormData(prev => ({ ...prev, profileImg: res.data.profileImg }))
                    }
                }
            })
        }
    }

    if (isLoading) return <PersonalInfoSkeleton />

    if (isError) {
        return (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-red-100 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Failed to load profile</h3>
                    <p className="text-gray-500 text-sm">There was an error fetching your personal information.</p>
                </div>
                <button
                    onClick={() => refetch()}
                    className="px-6 py-2 bg-[#FF5722] text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition-colors"
                >
                    Retry
                </button>
            </div>
        )
    }

    const fullAddress = user?.streetAddress
        ? `${user.streetAddress}, ${user.city || ''}, ${user.state || ''} ${user.zip || ''}`
        : 'Address not provided'

    const userRegion = regions.find(r => r.id === user?.regionId)?.name || 'Not selected'

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'Recently'

    return (
        <>
            {/* Main Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 h-full">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-[#1F2937]">Personal Information</h2>
                    <button
                        onClick={handleEditClick}
                        className="block md:hidden text-black text-sm font-semibold rounded-full hover:bg-gray-100 p-2 transition-colors"
                    >
                        <SquarePen className="w-6 h-6" />
                    </button>

                    <button
                        onClick={handleEditClick}
                        className="hidden md:block px-5 py-2 bg-[#FF5722] text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition-colors"
                    >
                        Edit Profile
                    </button>
                </div>

                <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-100">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-orange-50 bg-gray-100 shadow-inner">
                        {user?.profileImg ? (
                            <Image
                                src={user.profileImg}
                                alt={user.fullName}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <User className="w-10 h-10" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#1F2937]">{user?.fullName || 'Anonymous User'}</h3>
                        <div className="flex flex-col gap-1 mt-1">
                            <div className="flex items-center gap-2 text-gray-400 font-medium">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <Calendar className="w-4 h-4" />
                                <span className="italic">Member since {memberSince}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                    <InfoBox label="Full Name" value={user?.fullName} icon={<User className="w-4 h-4" />} />
                    <InfoBox label="Region / City" value={userRegion} icon={<Map className="w-4 h-4" />} />
                    <InfoBox label="Phone Number" value={user?.phone || 'Not provided'} icon={<Phone className="w-4 h-4" />} />
                    <InfoBox label="Email Address" value={user?.email} icon={<Mail className="w-4 h-4" />} isFullWidthOnMobile />
                    <div className="col-span-1 md:col-span-2">
                        <InfoBox label="Street Address" value={fullAddress} icon={<MapPin className="w-4 h-4" />} />
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
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 animate-fade-in relative max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleCancel}
                            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <h2 className="text-xl font-bold text-[#1F2937] mb-6">Edit Personal Information</h2>

                        {/* Profile Image Edit */}
                        <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-100">
                            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-orange-50 bg-gray-100 shrink-0">
                                    {isUpdating && (
                                        <div className="absolute inset-0 z-10 bg-black/20 flex items-center justify-center">
                                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                                        </div>
                                    )}
                                    {previewUrl ? (
                                        <Image
                                            src={previewUrl}
                                            alt={formData.fullName}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <User className="w-8 h-8" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="text-white w-6 h-6" />
                                    </div>
                                </div>
                                <button className="absolute -bottom-1 -right-1 p-1.5 bg-primary text-white rounded-full shadow-lg border-2 border-white">
                                    <Camera className="w-3.5 h-3.5" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#1F2937]">{formData.fullName || 'Anonymous'}</h3>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-primary text-sm font-semibold hover:underline"
                                >
                                    Change profile picture
                                </button>
                                <p className="text-gray-400 text-xs mt-1">JPG, PNG or GIF. Max 5MB.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Full Name" value={formData.fullName} onChange={(val) => handleChange('fullName', val)} />
                                <div>
                                    <label className="block text-sm font-semibold text-[#1F2937] mb-1.5 ml-1">Region / City</label>
                                    <div className="relative">
                                        <select
                                            value={formData.regionId}
                                            onChange={(e) => handleChange('regionId', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition bg-white appearance-none"
                                        >
                                            <option value="" disabled>Select region</option>
                                            {regions.map((region: Region) => (
                                                <option key={region.id} value={region.id}>{region.name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Email" value={formData.email} onChange={(val) => handleChange('email', val)} disabled />
                                <Input label="Phone Number" value={formData.phone} onChange={(val) => handleChange('phone', val)} type="tel" />
                            </div>
                            <Input label="Street Address" value={formData.street} onChange={(val) => handleChange('street', val)} />
                            <div className="grid grid-cols-3 gap-4">
                                <Input label="City" value={formData.city} onChange={(val) => handleChange('city', val)} />
                                <Input label="State" value={formData.state} onChange={(val) => handleChange('state', val)} />
                                <Input label="ZIP" value={formData.zip} onChange={(val) => handleChange('zip', val)} />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={handleSave}
                                disabled={isUpdating}
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FF5722] text-white font-semibold rounded-full hover:bg-orange-600 active:scale-95 transition-all shadow-lg shadow-orange-100 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isUpdating ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={isUpdating}
                                className="px-8 py-3 bg-gray-100 text-gray-500 font-semibold rounded-full hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50"
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

const InfoBox = ({ label, value, icon, isFullWidthOnMobile = false }: { label: string, value?: string, icon: React.ReactNode, isFullWidthOnMobile?: boolean }) => (
    <div className={isFullWidthOnMobile ? 'col-span-1 md:col-auto' : ''}>
        <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-400">{icon}</span>
            <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">{label}</p>
        </div>
        <p className="font-bold text-[#1F2937] break-words">{value || 'N/A'}</p>
    </div>
)

const Input = ({ label, value, onChange, type = "text", disabled = false }: { label: string, value: string, onChange: (val: string) => void, type?: string, disabled?: boolean }) => (
    <div>
        <label className="block text-sm font-semibold text-[#1F2937] mb-1.5 ml-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ${disabled ? 'bg-gray-50 opacity-70 cursor-not-allowed' : 'bg-white'}`}
        />
    </div>
)

const PersonalInfoSkeleton = () => (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 h-full animate-pulse">
        <div className="flex items-center justify-between mb-8">
            <div className="h-7 w-48 bg-gray-100 rounded-lg"></div>
            <div className="h-9 w-28 bg-gray-200 rounded-full"></div>
        </div>

        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-100">
            <div className="w-24 h-24 rounded-full bg-gray-100"></div>
            <div className="space-y-3">
                <div className="h-8 w-40 bg-gray-200 rounded-lg"></div>
                <div className="h-4 w-48 bg-gray-100 rounded-lg"></div>
                <div className="h-3 w-32 bg-gray-50 rounded-lg"></div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                    <div className="h-3 w-20 bg-gray-50 rounded"></div>
                    <div className="h-5 w-32 bg-gray-100 rounded"></div>
                </div>
            ))}
        </div>
    </div>
)

export default PersonalInfoCard
