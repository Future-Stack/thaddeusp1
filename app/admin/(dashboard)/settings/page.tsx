"use client";

import React, { useState, useEffect } from 'react';
import { Clock, ChevronDown, Loader2 } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';
import { useGetAdminSettings, useUpdateAdminSettings } from '@/hooks/useSettings';

const Toggle = ({ enabled, setEnabled, activeColor = "bg-[#FF5C00]" }: { enabled: boolean, setEnabled: (val: boolean) => void, activeColor?: string }) => {
    return (
        <button
            onClick={() => setEnabled(!enabled)}
            className={`${enabled ? activeColor : 'bg-gray-200'} shrink-0 relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none`}
        >
            <span
                className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm`}
            />
        </button>
    );
};

const Settings = () => {
    const { data: settingsData, isLoading } = useGetAdminSettings();
    const { mutate: updateSettings, isPending: isUpdating } = useUpdateAdminSettings();

    // Combined form state
    const [formData, setFormData] = useState({
        maintenanceMode: false,
        automatedDraws: true,
        drawDay: 'MONDAY',
        drawTime: '18:00',
        maxTicketPerUser: 10,
        minTicketForDraw: 1,
        emailWinners: true,
        emailAllParticipants: true,
        smsWinnerNotifications: false,
        adminDrawAlerts: true,
        lowParticipationAlert: true,
        lowParticipationThreshold: 10,
        marketingEmailsToUsers: true,
        drawReminders: true,
        autoSendVouchers: true,
        // UI only fields (not in API yet)
        ticketPrice: 1,
        currency: 'USD',
        stripeEnabled: true,
        paypalEnabled: false,
        defaultVoucherValue: 25,
        voucherValidity: 30,
        requireVendorConfirmation: false,
    });

    useEffect(() => {
        if (settingsData?.data) {
            const data = settingsData.data;
            setFormData(prev => ({
                ...prev,
                maintenanceMode: data.maintenanceMode ?? prev.maintenanceMode,
                automatedDraws: data.automatedDraws ?? prev.automatedDraws,
                drawDay: data.drawDay ?? prev.drawDay,
                drawTime: data.drawTime ?? prev.drawTime,
                maxTicketPerUser: data.maxTicketPerUser ?? prev.maxTicketPerUser,
                minTicketForDraw: data.minTicketForDraw ?? prev.minTicketForDraw,
                emailWinners: data.emailWinners ?? prev.emailWinners,
                emailAllParticipants: data.emailAllParticipants ?? prev.emailAllParticipants,
                smsWinnerNotifications: data.smsWinnerNotifications ?? prev.smsWinnerNotifications,
                adminDrawAlerts: data.adminDrawAlerts ?? prev.adminDrawAlerts,
                lowParticipationAlert: data.lowParticipationAlert ?? prev.lowParticipationAlert,
                lowParticipationThreshold: data.lowParticipationThreshold ?? prev.lowParticipationThreshold,
                marketingEmailsToUsers: data.marketingEmailsToUsers ?? prev.marketingEmailsToUsers,
                drawReminders: data.drawReminders ?? prev.drawReminders,
                autoSendVouchers: data.autoSendVouchers ?? prev.autoSendVouchers,
            }));
        }
    }, [settingsData]);

    const handleSave = () => {
        // Only send fields that are supported by the API
        const {
            maintenanceMode, automatedDraws, drawDay, drawTime,
            maxTicketPerUser, minTicketForDraw, emailWinners,
            emailAllParticipants, smsWinnerNotifications,
            adminDrawAlerts, lowParticipationAlert,
            lowParticipationThreshold, marketingEmailsToUsers,
            drawReminders, autoSendVouchers
        } = formData;

        updateSettings({
            maintenanceMode, automatedDraws, drawDay, drawTime,
            maxTicketPerUser, minTicketForDraw, emailWinners,
            emailAllParticipants, smsWinnerNotifications,
            adminDrawAlerts, lowParticipationAlert,
            lowParticipationThreshold, marketingEmailsToUsers,
            drawReminders, autoSendVouchers
        });
    };

    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    if (isLoading) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-[#FF5C00]" />
                    <p className="text-gray-500 font-medium">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-6">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-[#111827]">Settings</h1>
                    <p className="text-gray-500">Configure lottery system parameters and maintenance</p>
                </div>

                <AnimationWrapper animationType="fadeUp">
                    <div className="bg-white border border-gray-100 rounded-3xl p-4 md:p-8 shadow-sm">
                        <div className="space-y-4">
                            {/* Maintenance Mode */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#EF4444] font-bold text-lg">Maintenance Mode</h3>
                                    <p className="text-sm text-gray-500">Temporarily disable ticket sales and draws</p>
                                </div>
                                <Toggle enabled={formData.maintenanceMode} setEnabled={(val) => handleChange('maintenanceMode', val)} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* Automated Draws */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">Automated Draws</h3>
                                    <p className="text-sm text-gray-500">Automatically run weekly draws without manual intervention</p>
                                </div>
                                <Toggle enabled={formData.automatedDraws} setEnabled={(val) => handleChange('automatedDraws', val)} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* Grid Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {/* Draw Day */}
                                <div className="space-y-3 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                    <label className="text-sm font-bold text-[#111827]">Draw Day</label>
                                    <div className="relative">
                                        <select
                                            value={formData.drawDay || 'MONDAY'}
                                            onChange={(e) => handleChange('drawDay', e.target.value)}
                                            className="w-full appearance-none bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all cursor-pointer"
                                        >
                                            <option value="SUNDAY">Sunday</option>
                                            <option value="MONDAY">Monday</option>
                                            <option value="TUESDAY">Tuesday</option>
                                            <option value="WEDNESDAY">Wednesday</option>
                                            <option value="THURSDAY">Thursday</option>
                                            <option value="FRIDAY">Friday</option>
                                            <option value="SATURDAY">Saturday</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                    </div>
                                </div>

                                {/* Draw Time */}
                                <div className="space-y-3 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                    <label className="text-sm font-bold text-[#111827]">Draw Time</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.drawTime || ''}
                                            onChange={(e) => handleChange('drawTime', e.target.value)}
                                            className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                            placeholder="11:59"
                                        />
                                        <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    </div>
                                </div>

                                {/* Max Tickets Per User */}
                                <div className="space-y-3 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                    <label className="text-sm font-bold text-[#111827]">Max Tickets Per User</label>
                                    <input
                                        type="number"
                                        value={formData.maxTicketPerUser}
                                        onChange={(e) => handleChange('maxTicketPerUser', Number(e.target.value))}
                                        className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                    />
                                </div>

                                {/* Min Tickets Required for Draw */}
                                <div className="space-y-3 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                    <label className="text-sm font-bold text-[#111827]">Min Tickets Required for Draw</label>
                                    <input
                                        type="number"
                                        value={formData.minTicketForDraw}
                                        onChange={(e) => handleChange('minTicketForDraw', Number(e.target.value))}
                                        className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimationWrapper>

                {/* Notification Settings */}
                <AnimationWrapper animationType="fadeUp" delay={0.1}>
                    <div className="bg-white border border-gray-100 rounded-3xl p-4 md:p-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 px-2">
                            <span className="text-xl">📧</span>
                            <h2 className="text-xl font-bold text-[#111827]">Notification Settings</h2>
                        </div>

                        <div className="space-y-4">
                            {/* Email Winners */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">Email Winners</h3>
                                    <p className="text-sm text-gray-500">Automatically send email to winners with voucher</p>
                                </div>
                                <Toggle enabled={formData.emailWinners} setEnabled={(val) => handleChange('emailWinners', val)} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* Email All Participants */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">Email All Participants</h3>
                                    <p className="text-sm text-gray-500">Send draw results to all participants</p>
                                </div>
                                <Toggle enabled={formData.emailAllParticipants} setEnabled={(val) => handleChange('emailAllParticipants', val)} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* SMS Winner Notifications */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">SMS Winner Notifications</h3>
                                    <p className="text-sm text-gray-500">Send instant SMS to winners</p>
                                </div>
                                <Toggle enabled={formData.smsWinnerNotifications} setEnabled={(val) => handleChange('smsWinnerNotifications', val)} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* Admin Draw Alerts */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">Admin Draw Alerts</h3>
                                    <p className="text-sm text-gray-500">Notify admins when draws complete</p>
                                </div>
                                <Toggle enabled={formData.adminDrawAlerts} setEnabled={(val) => handleChange('adminDrawAlerts', val)} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* Low Participation Alert */}
                            <div className="flex flex-col gap-4 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="flex items-center justify-between w-full">
                                    <div className="space-y-1">
                                        <h3 className="text-[#111827] font-bold text-lg">Low Participation Alert</h3>
                                        <p className="text-sm text-gray-500">Alert when participation is low</p>
                                    </div>
                                    <Toggle enabled={formData.lowParticipationAlert} setEnabled={(val) => handleChange('lowParticipationAlert', val)} activeColor="bg-[#FF5C00]" />
                                </div>
                                {formData.lowParticipationAlert && (
                                    <div className="space-y-2 max-w-md">
                                        <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">Threshold (tickets)</label>
                                        <input
                                            type="number"
                                            value={formData.lowParticipationThreshold}
                                            onChange={(e) => handleChange('lowParticipationThreshold', Number(e.target.value))}
                                            className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Marketing Emails to Users */}
                            <div className="flex items-center justify-between p-4 md:p-6 border border-[#BBF7D0] bg-[#F0FDF4] rounded-[20px] transition-all hover:bg-[#DCFCE7]">
                                <div className="space-y-1">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-2">
                                        <h3 className="text-[#166534] font-bold text-lg">Marketing Emails to Users</h3>
                                        <span className="bg-[#00A344] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                            Revenue Generator
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#15803d]">Send local pizzeria coupons to all participants (win or lose) - create advertising revenue stream</p>
                                </div>
                                <Toggle enabled={formData.marketingEmailsToUsers} setEnabled={(val) => handleChange('marketingEmailsToUsers', val)} activeColor="bg-[#00A344]" />
                            </div>

                            {/* Draw Reminders */}
                            <div className="flex items-center justify-between p-6 border border-[#DBEAFE] bg-[#EFF6FF] rounded-[20px] transition-all hover:bg-[#DBEAFE]">
                                <div className="space-y-1">
                                    <h3 className="text-[#1E40AF] font-bold text-lg">Draw Reminders</h3>
                                    <p className="text-sm text-[#1d4ed8]">Remind users 24hrs before draw with last-chance deals from local pizzerias</p>
                                </div>
                                <Toggle enabled={formData.drawReminders} setEnabled={(val) => handleChange('drawReminders', val)} activeColor="bg-[#2563EB]" />
                            </div>
                        </div>
                    </div>
                </AnimationWrapper>

                {/* Prize & Voucher Settings */}
                <AnimationWrapper animationType="fadeUp" delay={0.3}>
                    <div className="bg-white border border-gray-100 rounded-3xl p-4 md:p-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 px-2">
                            <span className="text-xl">🎁</span>
                            <h2 className="text-xl font-bold text-[#111827]">Prize & Voucher Settings</h2>
                        </div>

                        <div className="space-y-4">

                            {/* Auto-Send Vouchers */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">Auto-Send Vouchers</h3>
                                    <p className="text-sm text-gray-500">Automatically send vouchers to winners via email</p>
                                </div>
                                <Toggle enabled={formData.autoSendVouchers} setEnabled={(val) => handleChange('autoSendVouchers', val)} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* Require Vendor Confirmation */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">Require Vendor Confirmation</h3>
                                    <p className="text-sm text-gray-500">Vendor must confirm voucher before sending</p>
                                </div>
                                <Toggle enabled={formData.requireVendorConfirmation} setEnabled={(val) => handleChange('requireVendorConfirmation', val)} activeColor="bg-[#FF5C00]" />
                            </div>
                        </div>
                    </div>
                </AnimationWrapper>

                {/* Save Button */}
                <div className="flex justify-start pt-4">
                    <button
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="bg-[#111827] text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isUpdating && <Loader2 className="w-5 h-5 animate-spin" />}
                        {isUpdating ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;

