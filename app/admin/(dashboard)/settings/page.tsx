"use client";

import React, { useState } from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';

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
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [automatedDraws, setAutomatedDraws] = useState(true);
    const [drawDay, setDrawDay] = useState('Sunday');
    const [drawTime, setDrawTime] = useState('11.59');
    const [maxTickets, setMaxTickets] = useState(100);
    const [minTickets, setMinTickets] = useState(10);

    // Payment Settings State
    const [ticketPrice, setTicketPrice] = useState(1);
    const [currency, setCurrency] = useState('USD');
    const [stripeEnabled, setStripeEnabled] = useState(true);
    const [paypalEnabled, setPaypalEnabled] = useState(false);

    // Prize & Voucher Settings State
    const [defaultVoucherValue, setDefaultVoucherValue] = useState(25);
    const [voucherValidity, setVoucherValidity] = useState(30);
    const [autoSendVouchers, setAutoSendVouchers] = useState(true);
    const [requireVendorConfirmation, setRequireVendorConfirmation] = useState(false);

    // Notification Settings State
    const [emailWinners, setEmailWinners] = useState(true);
    const [emailAllParticipants, setEmailAllParticipants] = useState(true);
    const [smsWinnerNotifications, setSmsWinnerNotifications] = useState(true);
    const [adminDrawAlerts, setAdminDrawAlerts] = useState(true);
    const [lowParticipationAlert, setLowParticipationAlert] = useState(true);
    const [participationThreshold, setParticipationThreshold] = useState(20);
    const [marketingEmails, setMarketingEmails] = useState(true);
    const [drawReminders, setDrawReminders] = useState(true);

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
                                <Toggle enabled={maintenanceMode} setEnabled={setMaintenanceMode} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* Automated Draws */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">Automated Draws</h3>
                                    <p className="text-sm text-gray-500">Automatically run weekly draws without manual intervention</p>
                                </div>
                                <Toggle enabled={automatedDraws} setEnabled={setAutomatedDraws} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* Grid Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {/* Draw Day */}
                                <div className="space-y-3 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                    <label className="text-sm font-bold text-[#111827]">Draw Day</label>
                                    <div className="relative">
                                        <select
                                            value={drawDay}
                                            onChange={(e) => setDrawDay(e.target.value)}
                                            className="w-full appearance-none bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all cursor-pointer"
                                        >
                                            <option>Sunday</option>
                                            <option>Monday</option>
                                            <option>Tuesday</option>
                                            <option>Wednesday</option>
                                            <option>Thursday</option>
                                            <option>Friday</option>
                                            <option>Saturday</option>
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
                                            value={drawTime}
                                            onChange={(e) => setDrawTime(e.target.value)}
                                            className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                        />
                                        <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    </div>
                                </div>

                                {/* Max Tickets Per User */}
                                <div className="space-y-3 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                    <label className="text-sm font-bold text-[#111827]">Max Tickets Per User</label>
                                    <input
                                        type="number"
                                        value={maxTickets}
                                        onChange={(e) => setMaxTickets(Number(e.target.value))}
                                        className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                    />
                                </div>

                                {/* Min Tickets Required for Draw */}
                                <div className="space-y-3 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                    <label className="text-sm font-bold text-[#111827]">Min Tickets Required for Draw</label>
                                    <input
                                        type="number"
                                        value={minTickets}
                                        onChange={(e) => setMinTickets(Number(e.target.value))}
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
                                <Toggle enabled={emailWinners} setEnabled={setEmailWinners} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* Email All Participants */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">Email All Participants</h3>
                                    <p className="text-sm text-gray-500">Send draw results to all participants</p>
                                </div>
                                <Toggle enabled={emailAllParticipants} setEnabled={setEmailAllParticipants} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* SMS Winner Notifications */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">SMS Winner Notifications</h3>
                                    <p className="text-sm text-gray-500">Send instant SMS to winners</p>
                                </div>
                                <Toggle enabled={smsWinnerNotifications} setEnabled={setSmsWinnerNotifications} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* Admin Draw Alerts */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">Admin Draw Alerts</h3>
                                    <p className="text-sm text-gray-500">Notify admins when draws complete</p>
                                </div>
                                <Toggle enabled={adminDrawAlerts} setEnabled={setAdminDrawAlerts} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* Low Participation Alert */}
                            <div className="flex flex-col gap-4 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="flex items-center justify-between w-full">
                                    <div className="space-y-1">
                                        <h3 className="text-[#111827] font-bold text-lg">Low Participation Alert</h3>
                                        <p className="text-sm text-gray-500">Alert when participation is low</p>
                                    </div>
                                    <Toggle enabled={lowParticipationAlert} setEnabled={setLowParticipationAlert} activeColor="bg-[#FF5C00]" />
                                </div>
                                {lowParticipationAlert && (
                                    <div className="space-y-2 max-w-md">
                                        <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">Threshold (tickets)</label>
                                        <input 
                                            type="number" 
                                            value={participationThreshold}
                                            onChange={(e) => setParticipationThreshold(Number(e.target.value))}
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
                                <Toggle enabled={marketingEmails} setEnabled={setMarketingEmails} activeColor="bg-[#00A344]" />
                            </div>

                            {/* Draw Reminders */}
                            <div className="flex items-center justify-between p-6 border border-[#DBEAFE] bg-[#EFF6FF] rounded-[20px] transition-all hover:bg-[#DBEAFE]">
                                <div className="space-y-1">
                                    <h3 className="text-[#1E40AF] font-bold text-lg">Draw Reminders</h3>
                                    <p className="text-sm text-[#1d4ed8]">Remind users 24hrs before draw with last-chance deals from local pizzerias</p>
                                </div>
                                <Toggle enabled={drawReminders} setEnabled={setDrawReminders} activeColor="bg-[#2563EB]" />
                            </div>
                        </div>
                    </div>
                </AnimationWrapper>
                {/* Payment Settings */}
                <AnimationWrapper animationType="fadeUp" delay={0.2}>
                    <div className="bg-white border border-gray-100 rounded-3xl p-4 md:p-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 px-2">
                            <span className="text-xl">💳</span>
                            <h2 className="text-xl font-bold text-[#111827]">Payment Settings</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {/* Ticket Price */}
                                <div className="space-y-3 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                    <label className="text-sm font-bold text-[#111827]">Ticket Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                        <input
                                            type="number"
                                            value={ticketPrice}
                                            onChange={(e) => setTicketPrice(Number(e.target.value))}
                                            className="w-full bg-white border border-gray-100 rounded-xl pl-8 pr-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Currency */}
                                <div className="space-y-3 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                    <label className="text-sm font-bold text-[#111827]">Currency</label>
                                    <input
                                        type="text"
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        placeholder="USD"
                                        className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Stripe Integration */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">Stripe Integration</h3>
                                    <p className="text-sm text-gray-500">Enable Stripe payments</p>
                                </div>
                                <Toggle enabled={stripeEnabled} setEnabled={setStripeEnabled} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* PayPal Integration */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">PayPal Integration</h3>
                                    <p className="text-sm text-gray-500">Enable PayPal payments</p>
                                </div>
                                <Toggle enabled={paypalEnabled} setEnabled={setPaypalEnabled} activeColor="bg-[#FF5C00]" />
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {/* Default Voucher Value */}
                                <div className="space-y-3 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                    <label className="text-sm font-bold text-[#111827]">Default Voucher Value</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                        <input
                                            type="number"
                                            value={defaultVoucherValue}
                                            onChange={(e) => setDefaultVoucherValue(Number(e.target.value))}
                                            className="w-full bg-white border border-gray-100 rounded-xl pl-8 pr-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Voucher Validity */}
                                <div className="space-y-3 p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                    <label className="text-sm font-bold text-[#111827]">Voucher Validity (days)</label>
                                    <input
                                        type="number"
                                        value={voucherValidity}
                                        onChange={(e) => setVoucherValidity(Number(e.target.value))}
                                        className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Auto-Send Vouchers */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">Auto-Send Vouchers</h3>
                                    <p className="text-sm text-gray-500">Automatically send vouchers to winners via email</p>
                                </div>
                                <Toggle enabled={autoSendVouchers} setEnabled={setAutoSendVouchers} activeColor="bg-[#FF5C00]" />
                            </div>

                            {/* Require Vendor Confirmation */}
                            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-[20px] transition-all hover:bg-gray-50/50">
                                <div className="space-y-1">
                                    <h3 className="text-[#111827] font-bold text-lg">Require Vendor Confirmation</h3>
                                    <p className="text-sm text-gray-500">Vendor must confirm voucher before sending</p>
                                </div>
                                <Toggle enabled={requireVendorConfirmation} setEnabled={setRequireVendorConfirmation} activeColor="bg-[#FF5C00]" />
                            </div>
                        </div>
                    </div>
                </AnimationWrapper>

                {/* Save Button */}
                <div className="flex justify-start pt-4">
                    <button className="bg-[#111827] text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;

