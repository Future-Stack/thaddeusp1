"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Loader2, Save, User, Mail, Phone, MapPin, Building, Globe, Hash } from 'lucide-react';
import Image from 'next/image';
import AnimationWrapper from '@/components/AnimationWrapper';
import { useAppStore } from '@/store/useAppStore';
import { useUpdateProfile } from '@/hooks/useUser';
import { useGetMe } from '@/hooks/useAuth';

const AdminProfile = () => {
    const { role } = useAppStore();
    const { data: meData, isLoading: isMeLoading } = useGetMe();
    const user = meData?.user;
    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        profileImg: null as File | null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: String(user.fullName || ''),
                email: String(user.email || ''),
                phone: String(user.phone || ''),
                streetAddress: String(user.streetAddress || ''),
                city: String(user.city || ''),
                state: String(user.state || ''),
                zip: String(user.zip || ''),
                profileImg: null,
            });
            setPreviewUrl(user.profileImg || null);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, profileImg: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('phone', formData.phone);
        data.append('streetAddress', formData.streetAddress);
        data.append('city', formData.city);
        data.append('state', formData.state);
        data.append('zip', formData.zip);
        if (formData.profileImg) {
            data.append('profileImg', formData.profileImg);
        }
        updateProfile(data);
    };

    if (isMeLoading) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[#FF5C00]" />
            </div>
        );
    }

    return (
        <div className="w-full py-6">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-[#111827]">Admin Profile</h1>
                    <p className="text-gray-500">Manage your personal information and account settings</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Card */}
                    <AnimationWrapper animationType="fadeRight" className="lg:col-span-1">
                        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm text-center">
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-orange-50 bg-gray-50">
                                    <Image
                                        src={previewUrl || "/profile.webp"}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 p-2 bg-[#FF5C00] text-white rounded-full shadow-lg hover:bg-[#E65200] transition-all"
                                >
                                    <Camera size={20} />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <h2 className="text-xl font-bold text-[#111827]">{user?.fullName || 'Admin User'}</h2>
                            <p className="text-gray-500 text-sm mb-6 capitalize">{role?.toLowerCase() || 'Administrator'}</p>

                            <div className="pt-6 border-t border-gray-50 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail size={16} className="text-gray-400" />
                                    <span className="truncate">{user?.email}</span>
                                </div>
                                {user?.phone && (
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Phone size={16} className="text-gray-400" />
                                        <span>{user.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </AnimationWrapper>

                    {/* Right Column - Edit Form */}
                    <AnimationWrapper animationType="fadeUp" className="lg:col-span-2">
                        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#111827] flex items-center gap-2">
                                            <User size={16} className="text-gray-400" />
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email (Disabled) */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#111827] flex items-center gap-2">
                                            <Mail size={16} className="text-gray-400" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full bg-gray-100 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-400 cursor-not-allowed"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#111827] flex items-center gap-2">
                                            <Phone size={16} className="text-gray-400" />
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>

                                    {/* Street Address */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#111827] flex items-center gap-2">
                                            <MapPin size={16} className="text-gray-400" />
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            name="streetAddress"
                                            value={formData.streetAddress}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                            placeholder="123 Admin Way"
                                        />
                                    </div>

                                    {/* City */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#111827] flex items-center gap-2">
                                            <Building size={16} className="text-gray-400" />
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                            placeholder="New York"
                                        />
                                    </div>

                                    {/* State */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#111827] flex items-center gap-2">
                                            <Globe size={16} className="text-gray-400" />
                                            State / Province
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                            placeholder="NY"
                                        />
                                    </div>

                                    {/* Zip Code */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#111827] flex items-center gap-2">
                                            <Hash size={16} className="text-gray-400" />
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                            placeholder="10001"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6">
                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="bg-[#111827] text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={20} />}
                                        {isUpdating ? 'Updating...' : 'Update Information'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </AnimationWrapper>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
